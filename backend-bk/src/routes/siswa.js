import { z } from "zod";
import { prisma } from "../lib/db.js";
import QRCode from "qrcode";

export default async function siswaRoutes(fastify) {
	const auth = { preHandler: fastify.verifyJWT };
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const adminBkGuru = {
		preHandler: fastify.requireRole(["admin", "bk", "guru"]),
	};

	// GET /api/v1/siswa
	fastify.get("/siswa", { preHandler: fastify.verifyJWT }, async (request) => {
		const { kelas, search, active } = request.query;
		const where = {};
		if (active !== "all") where.isActive = true;
		if (kelas) {
			const kelasList = kelas
				.split(",")
				.map((k) => k.trim())
				.filter(Boolean);
			where.kelas = { in: kelasList };
		}
		if (search)
			where.OR = [
				{ nama: { contains: search, mode: "insensitive" } },
				{ nisn: { contains: search } },
				{ kelas: { contains: search, mode: "insensitive" } },
			];

		const siswaList = await prisma.siswa.findMany({
			where,
			orderBy: [{ kelas: "asc" }, { nama: "asc" }],
			select: {
				id: true,
				nisn: true,
				nama: true,
				jenisKelamin: true,
				tanggalLahir: true,
				agama: true,
				namaAyah: true,
				namaIbu: true,
				noHp: true,
				kelas: true,
				alamat: true,
				fotoUrl: true,
				isActive: true,
			},
		});
		return { success: true, data: siswaList };
	});

	// GET /api/v1/siswa/:nisn
	fastify.get("/siswa/:nisn", auth, async (request, reply) => {
		const siswa = await prisma.siswa.findUnique({
			where: { nisn: request.params.nisn },
		});
		if (!siswa)
			return reply
				.code(404)
				.send({ success: false, message: "Siswa tidak ditemukan." });
		return { success: true, data: siswa };
	});

	// GET /api/v1/siswa/kelas-list — list unique kelas
	fastify.get("/siswa/kelas-list", auth, async () => {
		const list = await prisma.siswa.findMany({
			where: { isActive: true },
			distinct: ["kelas"],
			select: { kelas: true },
			orderBy: { kelas: "asc" },
		});
		return { success: true, data: list.map((s) => s.kelas) };
	});

	// GET /api/v1/siswa/import-template — download CSV template
	fastify.get("/siswa/import-template", auth, async (request, reply) => {
		const headers = [
			"NISN",
			"Nama",
			"Kelas",
			"JenisKelamin",
			"TanggalLahir",
			"Agama",
			"NamaAyah",
			"NamaIbu",
			"NoHP",
			"Alamat",
		];
		const example = [
			"1234567890",
			"Ahmad Budi Santoso",
			"X RPL 1",
			"Laki-laki",
			"2007-05-15",
			"Islam",
			"Budi",
			"Siti",
			"08123456789",
			"Jl. Merdeka No. 1",
		];
		const csvContent = [headers.join(","), example.join(",")].join("\r\n");
		reply
			.header("Content-Type", "text/csv; charset=utf-8")
			.header(
				"Content-Disposition",
				'attachment; filename="template-import-siswa.csv"',
			)
			.send("\uFEFF" + csvContent); // BOM for Excel UTF-8
	});

	// POST /api/v1/siswa/import — bulk upsert by NISN
	fastify.post("/siswa/import", adminBk, async (request, reply) => {
		const itemSchema = z.object({
			nisn: z.string().min(4).max(20),
			nama: z.string().min(2).max(100),
			kelas: z.string().min(1).max(30),
			jenisKelamin: z.enum(["L", "P"]).default("L"),
			tanggalLahir: z.string().optional().nullable(),
			agama: z.string().optional().nullable(),
			namaAyah: z.string().optional().nullable(),
			namaIbu: z.string().optional().nullable(),
			noHp: z.string().optional().nullable(),
			alamat: z.string().optional().nullable(),
		});
		const bodySchema = z.object({ data: z.array(itemSchema).min(1).max(2000) });
		const parsed = bodySchema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });

		let ditambah = 0;
		let diperbarui = 0;
		for (const item of parsed.data.data) {
			const { tanggalLahir, ...rest } = item;
			const existing = await prisma.siswa.findUnique({
				where: { nisn: rest.nisn },
			});
			if (existing) {
				await prisma.siswa.update({
					where: { nisn: rest.nisn },
					data: {
						...rest,
						tanggalLahir: tanggalLahir
							? new Date(tanggalLahir)
							: existing.tanggalLahir,
					},
				});
				diperbarui++;
			} else {
				await prisma.siswa.create({
					data: {
						...rest,
						tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
					},
				});
				ditambah++;
			}
		}
		return {
			success: true,
			data: { ditambah, diperbarui, total: ditambah + diperbarui },
		};
	});
	fastify.post("/siswa", adminBk, async (request, reply) => {
		const schema = z.object({
			nisn: z.string().min(5).max(20),
			nama: z.string().min(2).max(100),
			jenisKelamin: z.enum(["L", "P"]),
			tanggalLahir: z.string().optional().nullable(),
			agama: z.string().optional().nullable(),
			namaAyah: z.string().optional().nullable(),
			namaIbu: z.string().optional().nullable(),
			noHp: z.string().optional().nullable(),
			kelas: z.string().min(1).max(30),
			alamat: z.string().optional().nullable(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });

		const { tanggalLahir, ...rest } = parsed.data;
		const existing = await prisma.siswa.findUnique({
			where: { nisn: rest.nisn },
		});
		if (existing)
			return reply
				.code(409)
				.send({ success: false, message: "NISN sudah terdaftar." });

		const siswa = await prisma.siswa.create({
			data: {
				...rest,
				tanggalLahir: tanggalLahir ? new Date(tanggalLahir) : null,
			},
		});
		return reply.code(201).send({ success: true, data: siswa });
	});

	// PUT /api/v1/siswa/:nisn
	fastify.put("/siswa/:nisn", adminBk, async (request, reply) => {
		const schema = z.object({
			nama: z.string().min(2).max(100).optional(),
			jenisKelamin: z.enum(["L", "P"]).optional(),
			tanggalLahir: z.string().optional().nullable(),
			agama: z.string().optional().nullable(),
			namaAyah: z.string().optional().nullable(),
			namaIbu: z.string().optional().nullable(),
			noHp: z.string().optional().nullable(),
			kelas: z.string().min(1).max(30).optional(),
			alamat: z.string().optional().nullable(),
			isActive: z.boolean().optional(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });

		const { tanggalLahir, ...rest } = parsed.data;
		const data = { ...rest };
		if (tanggalLahir !== undefined)
			data.tanggalLahir = tanggalLahir ? new Date(tanggalLahir) : null;

		const siswa = await prisma.siswa
			.update({ where: { nisn: request.params.nisn }, data })
			.catch(() => null);
		if (!siswa)
			return reply
				.code(404)
				.send({ success: false, message: "Siswa tidak ditemukan." });
		return { success: true, data: siswa };
	});

	// DELETE /api/v1/siswa/:nisn
	fastify.delete(
		"/siswa/:nisn",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			const deleted = await prisma.siswa
				.delete({ where: { nisn: request.params.nisn } })
				.catch(() => null);
			if (!deleted)
				return reply
					.code(404)
					.send({ success: false, message: "Siswa tidak ditemukan." });
			return { success: true };
		},
	);

	// GET /api/v1/siswa/:nisn/summary — ringkasan poin, kasus, absensi
	fastify.get(
		"/siswa/:nisn/summary",
		{ preHandler: fastify.requireRole(["admin", "bk", "guru"]) },
		async (request, reply) => {
			const { nisn } = request.params;
			const siswa = await prisma.siswa.findUnique({ where: { nisn } });
			if (!siswa)
				return reply
					.code(404)
					.send({ success: false, message: "Siswa tidak ditemukan." });

			const [poinPrestasi, poinPelanggaran, kasusAktif, totalAbsensi] =
				await Promise.all([
					prisma.poinSiswa.aggregate({
						where: { siswaNisn: nisn, tipe: "PRESTASI" },
						_sum: { poin: true },
					}),
					prisma.poinSiswa.aggregate({
						where: { siswaNisn: nisn, tipe: "PELANGGARAN" },
						_sum: { poin: true },
					}),
					prisma.kasusSiswa.count({
						where: { siswaNisn: nisn, status: { in: ["Baru", "Proses"] } },
					}),
					prisma.absensi.groupBy({
						by: ["status"],
						where: { siswaNisn: nisn },
						_count: { status: true },
					}),
				]);

			const absensiMap = {};
			totalAbsensi.forEach((a) => {
				absensiMap[a.status] = a._count.status;
			});

			return {
				success: true,
				data: {
					siswa,
					poin: {
						prestasi: poinPrestasi._sum.poin || 0,
						pelanggaran: poinPelanggaran._sum.poin || 0,
						net:
							(poinPrestasi._sum.poin || 0) - (poinPelanggaran._sum.poin || 0),
					},
					kasusAktif,
					absensi: {
						hadir: absensiMap.Hadir || 0,
						sakit: absensiMap.Sakit || 0,
						izin: absensiMap.Izin || 0,
						alpa: absensiMap.Alpa || 0,
					},
				},
			};
		},
	);

	// GET /api/v1/siswa/:nisn/qr-code — generate QR code PNG
	fastify.get("/siswa/:nisn/qr-code", auth, async (request, reply) => {
		const { nisn } = request.params;
		const siswa = await prisma.siswa.findUnique({
			where: { nisn },
			select: { nisn: true, nama: true, kelas: true },
		});
		if (!siswa)
			return reply
				.code(404)
				.send({ success: false, message: "Siswa tidak ditemukan." });
		const qrBuffer = await QRCode.toBuffer(siswa.nisn, {
			type: "png",
			width: 300,
			margin: 2,
			errorCorrectionLevel: "H",
		});
		reply
			.header("Content-Type", "image/png")
			.header("Content-Disposition", `inline; filename="qr-${siswa.nisn}.png"`)
			.send(qrBuffer);
	});
}
