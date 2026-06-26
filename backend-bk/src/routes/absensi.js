import { z } from "zod";
import { prisma } from "../lib/db.js";

// SSE clients map: clientId -> { reply, kelas, role }
const sseClients = new Map();
let clientIdCounter = 0;

export function broadcastAbsensi(data) {
	for (const [, client] of sseClients) {
		try {
			client.reply.raw.write(`data: ${JSON.stringify(data)}\n\n`);
		} catch {
			/* ignore */
		}
	}
}

export default async function absensiRoutes(fastify) {
	// ── SSE endpoint for realtime updates ──────────────────────────────────────
	fastify.get(
		"/absensi/stream",
		{ preHandler: fastify.verifyJWT },
		async (request, reply) => {
			reply.raw.writeHead(200, {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache",
				Connection: "keep-alive",
				"Access-Control-Allow-Origin": "*",
			});
			reply.raw.flushHeaders?.();

			const clientId = ++clientIdCounter;
			sseClients.set(clientId, { reply, user: request.user });
			reply.raw.write('data: {"type":"connected"}\n\n');

			// heartbeat
			const hb = setInterval(() => {
				try {
					reply.raw.write(": heartbeat\n\n");
				} catch {
					clearInterval(hb);
				}
			}, 25000);

			request.raw.on("close", () => {
				clearInterval(hb);
				sseClients.delete(clientId);
			});

			await new Promise((resolve) => request.raw.on("close", resolve));
		},
	);

	// ── QR / Single scan ──────────────────────────────────────────────────────
	fastify.post(
		"/absensi/scan",
		{ preHandler: fastify.verifyJWT },
		async (request, reply) => {
			const schema = z.object({ nisn: z.string().min(1).max(30) });
			const parsed = schema.safeParse(request.body);
			if (!parsed.success)
				return reply
					.code(400)
					.send({ success: false, message: "Input tidak valid." });

			const result = await processAbsensi(parsed.data.nisn, request.user);
			if (result.success)
				broadcastAbsensi({ type: "absensi_update", ...result.data });
			return result;
		},
	);

	// ── Lookup siswa (hanya cek data, tidak catat) ────────────────────────────
	fastify.get(
		"/absensi/lookup/:nisn",
		{ preHandler: fastify.verifyJWT },
		async (request, reply) => {
			const siswa = await prisma.siswa.findUnique({
				where: { nisn: request.params.nisn, isActive: true },
				select: { nisn: true, nama: true, kelas: true, fotoUrl: true },
			});
			if (!siswa)
				return reply
					.code(404)
					.send({ success: false, message: "NISN tidak terdaftar." });
			return { success: true, data: siswa };
		},
	);

	// ── Manual input absensi ──────────────────────────────────────────────────
	fastify.post(
		"/absensi/manual",
		{ preHandler: fastify.requireRole(["admin", "bk", "guru"]) },
		async (request, reply) => {
			const schema = z.object({
				tanggal: z.string(),
				siswaNisn: z.string(),
				status: z.enum(["Hadir", "Sakit", "Izin", "Alpa"]),
				catatan: z.string().optional().nullable(),
			});
			const parsed = schema.safeParse(request.body);
			if (!parsed.success)
				return reply
					.code(400)
					.send({ success: false, message: parsed.error.errors[0].message });

			const { tanggal, siswaNisn, status, catatan } = parsed.data;
			const siswa = await prisma.siswa.findUnique({
				where: { nisn: siswaNisn },
			});
			if (!siswa)
				return reply
					.code(404)
					.send({ success: false, message: "Siswa tidak ditemukan." });

			const tanggalDate = new Date(tanggal);
			const record = await prisma.absensi.upsert({
				where: { tanggal_siswaNisn: { tanggal: tanggalDate, siswaNisn } },
				update: { status, catatan, inputBy: request.user.userId },
				create: {
					tanggal: tanggalDate,
					siswaNisn,
					namaSnapshot: siswa.nama,
					kelasSnapshot: siswa.kelas,
					status,
					catatan,
					inputBy: request.user.userId,
				},
			});

			broadcastAbsensi({ type: "absensi_update", ...record });
			return { success: true, data: record };
		},
	);

	// ── Batch manual input ────────────────────────────────────────────────────
	fastify.post(
		"/absensi/batch",
		{ preHandler: fastify.requireRole(["admin", "bk", "guru"]) },
		async (request, reply) => {
			const schema = z.object({
				tanggal: z.string(),
				kelas: z.string().optional(),
				items: z.array(
					z.object({
						nisn: z.string(),
						status: z.enum(["Hadir", "Sakit", "Izin", "Alpa"]),
						catatan: z.string().optional().nullable(),
					}),
				),
			});
			const parsed = schema.safeParse(request.body);
			if (!parsed.success)
				return reply
					.code(400)
					.send({ success: false, message: parsed.error.errors[0].message });

			const { tanggal, items } = parsed.data;
			const tanggalDate = new Date(tanggal);
			const results = [];

			for (const item of items) {
				const siswa = await prisma.siswa.findUnique({
					where: { nisn: item.nisn },
				});
				if (!siswa) continue;
				const record = await prisma.absensi.upsert({
					where: {
						tanggal_siswaNisn: { tanggal: tanggalDate, siswaNisn: item.nisn },
					},
					update: {
						status: item.status,
						catatan: item.catatan,
						inputBy: request.user.userId,
					},
					create: {
						tanggal: tanggalDate,
						siswaNisn: item.nisn,
						namaSnapshot: siswa.nama,
						kelasSnapshot: siswa.kelas,
						status: item.status,
						catatan: item.catatan,
						inputBy: request.user.userId,
					},
				});
				results.push(record);
			}

			broadcastAbsensi({
				type: "batch_update",
				count: results.length,
				tanggal,
			});
			return { success: true, data: results };
		},
	);

	// ── GET absensi harian ────────────────────────────────────────────────────
	fastify.get(
		"/absensi/harian",
		{ preHandler: fastify.verifyJWT },
		async (request) => {
			const { tanggal, kelas, status } = request.query;
			const tanggalDate = tanggal ? new Date(tanggal) : new Date();
			const where = { tanggal: tanggalDate };
			if (kelas) where.kelasSnapshot = { in: kelas.split(",") };
			if (status) where.status = status;

			const list = await prisma.absensi.findMany({
				where,
				orderBy: [{ kelasSnapshot: "asc" }, { namaSnapshot: "asc" }],
			});

			// Hitung statistik
			const stats = await prisma.absensi.groupBy({
				by: ["status"],
				where: {
					tanggal: tanggalDate,
					...(kelas ? { kelasSnapshot: { in: kelas.split(",") } } : {}),
				},
				_count: { status: true },
			});
			const statsMap = { Hadir: 0, Sakit: 0, Izin: 0, Alpa: 0 };
			stats.forEach((s) => {
				statsMap[s.status] = s._count.status;
			});

			return { success: true, data: list, stats: statsMap };
		},
	);

	// ── GET rekap absensi (range) ─────────────────────────────────────────────
	fastify.get(
		"/absensi/rekap",
		{ preHandler: fastify.verifyJWT },
		async (request) => {
			const { dari, sampai, kelas, nisn } = request.query;
			const where = {};
			if (dari && sampai)
				where.tanggal = { gte: new Date(dari), lte: new Date(sampai) };
			if (kelas) where.kelasSnapshot = { in: kelas.split(",") };
			if (nisn) where.siswaNisn = nisn;

			const rekap = await prisma.absensi.groupBy({
				by: ["siswaNisn", "namaSnapshot", "kelasSnapshot", "status"],
				where,
				_count: { status: true },
				orderBy: [{ namaSnapshot: "asc" }],
			});

			// Group per siswa
			const siswaMap = {};
			rekap.forEach((r) => {
				if (!siswaMap[r.siswaNisn]) {
					siswaMap[r.siswaNisn] = {
						nisn: r.siswaNisn,
						nama: r.namaSnapshot,
						kelas: r.kelasSnapshot,
						hadir: 0,
						sakit: 0,
						izin: 0,
						alpa: 0,
					};
				}
				siswaMap[r.siswaNisn][r.status.toLowerCase()] = r._count.status;
			});

			return { success: true, data: Object.values(siswaMap) };
		},
	);

	// ── DELETE absensi record ─────────────────────────────────────────────────
	fastify.delete(
		"/absensi/:id",
		{ preHandler: fastify.requireRole(["admin", "bk"]) },
		async (request, reply) => {
			const deleted = await prisma.absensi
				.delete({ where: { id: request.params.id } })
				.catch(() => null);
			if (!deleted)
				return reply
					.code(404)
					.send({ success: false, message: "Data tidak ditemukan." });
			return { success: true };
		},
	);
}

// ── Shared scan logic ─────────────────────────────────────────────────────────
async function processAbsensi(nisn, scannerUser) {
	const siswa = await prisma.siswa.findUnique({
		where: { nisn: String(nisn).trim(), isActive: true },
	});
	if (!siswa)
		return { success: false, message: "NISN tidak terdaftar di database." };

	// Kelas restriction for guru role
	if (scannerUser.role === "guru" && scannerUser.kelas) {
		const kelasList = scannerUser.kelas
			.split(",")
			.map((k) => k.trim().toUpperCase());
		if (!kelasList.includes(siswa.kelas.toUpperCase())) {
			return {
				success: false,
				message: `Ditolak! Siswa kelas ${siswa.kelas}. Anda hanya bisa scan kelas ${scannerUser.kelas}.`,
			};
		}
	}

	// Get config
	const configs = await prisma.appConfig.findMany({
		where: {
			key: {
				in: [
					"jam_masuk_mulai",
					"jam_masuk_akhir",
					"jam_pulang_mulai",
					"jam_pulang_akhir",
					"mode_absen",
					"jadwal_harian",
				],
			},
		},
	});
	const cfg = {};
	configs.forEach((c) => {
		try {
			cfg[c.key] = JSON.parse(c.value);
		} catch {
			cfg[c.key] = c.value;
		}
	});

	const now = new Date();
	const todayStr = now.toISOString().split("T")[0];
	const nowTime = now.toTimeString().slice(0, 5);
	const dayIndex = now.getDay() === 0 ? 7 : now.getDay(); // 1=Mon...7=Sun

	// Check jadwal harian
	if (cfg.jadwal_harian) {
		const sched = cfg.jadwal_harian[dayIndex];
		if (!sched || sched.libur) {
			const dayNames = {
				1: "Senin",
				2: "Selasa",
				3: "Rabu",
				4: "Kamis",
				5: "Jumat",
				6: "Sabtu",
				7: "Minggu",
			};
			return {
				success: false,
				message: `Absensi DITUTUP. Hari ini libur: ${dayNames[dayIndex] || ""}`,
			};
		}
		if (sched.masuk_mulai) cfg.jam_masuk_mulai = sched.masuk_mulai;
		if (sched.masuk_akhir) cfg.jam_masuk_akhir = sched.masuk_akhir;
		if (sched.pulang_mulai) cfg.jam_pulang_mulai = sched.pulang_mulai;
		if (sched.pulang_akhir) cfg.jam_pulang_akhir = sched.pulang_akhir;
	}

	// Check hari libur
	const liburToday = await prisma.hariLibur.findFirst({
		where: { tanggal: new Date(todayStr) },
	});
	if (liburToday)
		return {
			success: false,
			message: `Absensi DITUTUP. Hari ini libur: ${liburToday.keterangan}`,
		};

	const tanggalDate = new Date(todayStr);
	const modeAbsen = cfg.mode_absen || "masuk_pulang";
	const existing = await prisma.absensi.findUnique({
		where: { tanggal_siswaNisn: { tanggal: tanggalDate, siswaNisn: nisn } },
	});

	// Handle existing record (pulang/sholat)
	if (existing) {
		if (modeAbsen === "masuk_saja")
			return {
				success: false,
				message: `${siswa.nama} sudah absen masuk hari ini.`,
			};

		if (modeAbsen === "masuk_pulang") {
			if (existing.jamPulang)
				return {
					success: false,
					message: `${siswa.nama} sudah absen pulang hari ini.`,
				};
			if (nowTime > (cfg.jam_pulang_akhir || "17:00"))
				return {
					success: false,
					message: `Batas waktu pulang (${cfg.jam_pulang_akhir}) sudah lewat.`,
				};
			const jamPulang = now.toTimeString().slice(0, 8);
			let keteranganBaru = existing.keterangan;
			if (nowTime < (cfg.jam_pulang_mulai || "15:00"))
				keteranganBaru =
					(existing.keterangan ? existing.keterangan + " & " : "") +
					"Pulang Cepat";
			const updated = await prisma.absensi.update({
				where: { id: existing.id },
				data: { jamPulang, keterangan: keteranganBaru },
			});
			return {
				success: true,
				message: "Absen Pulang Berhasil ✓",
				type: "pulang",
				data: updated,
			};
		}

		if (modeAbsen === "masuk_sholat_pulang") {
			if (existing.jamPulang)
				return {
					success: false,
					message: `${siswa.nama} sudah absen pulang hari ini.`,
				};
			if (!existing.jamSholat) {
				const jamSholat = now.toTimeString().slice(0, 8);
				const updated = await prisma.absensi.update({
					where: { id: existing.id },
					data: { jamSholat },
				});
				return {
					success: true,
					message: "Absen Sholat Berhasil ✓",
					type: "sholat",
					data: updated,
				};
			}
			const jamPulang = now.toTimeString().slice(0, 8);
			const updated = await prisma.absensi.update({
				where: { id: existing.id },
				data: { jamPulang },
			});
			return {
				success: true,
				message: "Absen Pulang Berhasil ✓",
				type: "pulang",
				data: updated,
			};
		}
	}

	// New record (masuk)
	if (nowTime < (cfg.jam_masuk_mulai || "06:30")) {
		return {
			success: false,
			message: `Absensi belum dibuka. Buka mulai jam ${cfg.jam_masuk_mulai || "06:30"}.`,
		};
	}
	const batasAkhir =
		modeAbsen === "masuk_saja" ? cfg.jam_masuk_akhir : cfg.jam_pulang_akhir;
	if (nowTime > (batasAkhir || "17:00")) {
		return {
			success: false,
			message: `Absensi sudah ditutup (${batasAkhir}).`,
		};
	}

	let keterangan = "Tepat Waktu";
	if (nowTime > (cfg.jam_masuk_akhir || "07:15")) {
		const [h1, m1] = (cfg.jam_masuk_akhir || "07:15").split(":").map(Number);
		const [h2, m2] = nowTime.split(":").map(Number);
		const late = h2 * 60 + m2 - (h1 * 60 + m1);
		keterangan = `Terlambat ${late} menit`;
	}

	const jamDatang = now.toTimeString().slice(0, 8);
	const record = await prisma.absensi.create({
		data: {
			tanggal: tanggalDate,
			siswaNisn: nisn,
			namaSnapshot: siswa.nama,
			kelasSnapshot: siswa.kelas,
			jamDatang,
			keterangan,
			status: "Hadir",
			inputBy: scannerUser.userId,
		},
	});
	return {
		success: true,
		message: `Absen Masuk Berhasil ✓ (${keterangan})`,
		type: "datang",
		data: record,
	};
}
