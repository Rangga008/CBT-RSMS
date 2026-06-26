import { z } from "zod";
import { prisma } from "../../lib/db.js";

async function genNomor(prefix) {
	const count = await prisma.kasusSiswa.count();
	return `${prefix}-${String(count + 1).padStart(4, "0")}`;
}

export default async function kasusRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const auth = { preHandler: fastify.verifyJWT };

	// GET /api/v1/bk/kasus
	fastify.get("/bk/kasus", auth, async (request) => {
		const {
			nisn,
			status,
			jenisKasusId,
			kelas,
			dari,
			sampai,
			search,
			page = 1,
			limit = 20,
		} = request.query;
		const where = {};
		if (nisn) where.siswaNisn = nisn;
		if (status) where.status = status;
		if (jenisKasusId) where.jenisKasusId = jenisKasusId;
		if (dari && sampai)
			where.tanggal = { gte: new Date(dari), lte: new Date(sampai) };
		if (kelas) where.siswa = { kelas: { in: kelas.split(",") } };
		if (search)
			where.OR = [
				{ nomor: { contains: search, mode: "insensitive" } },
				{ deskripsi: { contains: search, mode: "insensitive" } },
				{ siswa: { nama: { contains: search, mode: "insensitive" } } },
			];

		const [list, total] = await Promise.all([
			prisma.kasusSiswa.findMany({
				where,
				skip: (Number(page) - 1) * Number(limit),
				take: Number(limit),
				orderBy: { createdAt: "desc" },
				include: {
					siswa: { select: { nama: true, kelas: true, fotoUrl: true } },
					jenisKasus: { select: { nama: true } },
					jenisPelanggaran: { select: { nama: true, kategori: true } },
					laporanList: { select: { id: true }, orderBy: { tanggal: "desc" } },
				},
			}),
			prisma.kasusSiswa.count({ where }),
		]);
		return {
			success: true,
			data: list,
			total,
			page: Number(page),
			limit: Number(limit),
		};
	});

	// GET /api/v1/bk/kasus/:id
	fastify.get("/bk/kasus/:id", auth, async (request, reply) => {
		const kasus = await prisma.kasusSiswa.findUnique({
			where: { id: request.params.id },
			include: {
				siswa: true,
				jenisKasus: true,
				jenisPelanggaran: true,
				laporanList: { orderBy: { tanggal: "asc" } },
			},
		});
		if (!kasus)
			return reply
				.code(404)
				.send({ success: false, message: "Kasus tidak ditemukan." });
		return { success: true, data: kasus };
	});

	// POST /api/v1/bk/kasus
	fastify.post("/bk/kasus", adminBk, async (request, reply) => {
		const schema = z.object({
			siswaNisn: z.string(),
			jenisKasusId: z.string().optional().nullable(),
			jenisPelanggaranId: z.string().optional().nullable(),
			tanggal: z.string(),
			deskripsi: z.string().min(5),
			penanganan: z.string().optional().nullable(),
			catatan: z.string().optional().nullable(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });

		const siswa = await prisma.siswa.findUnique({
			where: { nisn: parsed.data.siswaNisn },
		});
		if (!siswa)
			return reply
				.code(404)
				.send({ success: false, message: "Siswa tidak ditemukan." });

		const nomor = await genNomor("KSS");
		const kasus = await prisma.kasusSiswa.create({
			data: {
				...parsed.data,
				nomor,
				tanggal: new Date(parsed.data.tanggal),
				status: "Baru",
				inputBy: request.user.userId,
			},
			include: {
				siswa: { select: { nama: true, kelas: true } },
				jenisKasus: true,
			},
		});

		// Auto-create first laporan
		await prisma.laporanKasus.create({
			data: {
				kasusId: kasus.id,
				tanggal: new Date(parsed.data.tanggal),
				catatan: `Kasus dilaporkan: ${parsed.data.deskripsi}`,
				status: "Baru",
				inputBy: request.user.userId,
			},
		});

		return reply.code(201).send({ success: true, data: kasus });
	});

	// PUT /api/v1/bk/kasus/:id
	fastify.put("/bk/kasus/:id", adminBk, async (request, reply) => {
		const schema = z.object({
			status: z.enum(["Baru", "Proses", "Selesai", "Ditutup"]).optional(),
			penanganan: z.string().optional().nullable(),
			catatan: z.string().optional().nullable(),
			deskripsi: z.string().optional(),
			dokumenList: z
				.array(
					z.object({ nama: z.string(), url: z.string(), tipe: z.string() }),
				)
				.optional()
				.nullable(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const kasus = await prisma.kasusSiswa
			.update({ where: { id: request.params.id }, data: parsed.data })
			.catch(() => null);
		if (!kasus)
			return reply
				.code(404)
				.send({ success: false, message: "Kasus tidak ditemukan." });
		return { success: true, data: kasus };
	});

	// DELETE /api/v1/bk/kasus/:id
	fastify.delete(
		"/bk/kasus/:id",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			await prisma.kasusSiswa
				.delete({ where: { id: request.params.id } })
				.catch(() => null);
			return { success: true };
		},
	);

	// POST /api/v1/bk/kasus/:id/laporan — tambah laporan/update kasus
	fastify.post("/bk/kasus/:id/laporan", adminBk, async (request, reply) => {
		const schema = z.object({
			tanggal: z.string(),
			catatan: z.string().min(3),
			status: z.enum(["Baru", "Proses", "Selesai", "Ditutup"]),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });

		const kasus = await prisma.kasusSiswa.findUnique({
			where: { id: request.params.id },
		});
		if (!kasus)
			return reply
				.code(404)
				.send({ success: false, message: "Kasus tidak ditemukan." });

		const laporan = await prisma.laporanKasus.create({
			data: {
				kasusId: request.params.id,
				tanggal: new Date(parsed.data.tanggal),
				catatan: parsed.data.catatan,
				status: parsed.data.status,
				inputBy: request.user.userId,
			},
		});

		// Update kasus status
		await prisma.kasusSiswa.update({
			where: { id: request.params.id },
			data: { status: parsed.data.status },
		});

		return reply.code(201).send({ success: true, data: laporan });
	});

	// GET /api/v1/bk/kasus/stats — statistik kasus
	fastify.get("/bk/kasus/stats", auth, async () => {
		const [byStatus, byJenis, terbaru] = await Promise.all([
			prisma.kasusSiswa.groupBy({ by: ["status"], _count: { status: true } }),
			prisma.kasusSiswa.groupBy({ by: ["jenisKasusId"], _count: { id: true } }),
			prisma.kasusSiswa.findMany({
				take: 5,
				orderBy: { createdAt: "desc" },
				include: {
					siswa: { select: { nama: true, kelas: true } },
					jenisKasus: true,
				},
			}),
		]);
		const statusMap = {};
		byStatus.forEach((b) => {
			statusMap[b.status] = b._count.status;
		});
		return { success: true, data: { byStatus: statusMap, terbaru } };
	});
}
