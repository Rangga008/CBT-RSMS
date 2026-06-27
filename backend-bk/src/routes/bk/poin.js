import { z } from "zod";
import { prisma } from "../../lib/db.js";

export default async function poinRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const auth = { preHandler: fastify.verifyJWT };

	// GET /api/v1/bk/poin — list with filter
	fastify.get("/bk/poin", auth, async (request) => {
		const {
			nisn,
			tipe,
			dari,
			sampai,
			kelas,
			search,
			page = 1,
			limit = 50,
		} = request.query;
		const where = {};
		if (nisn) where.siswaNisn = nisn;
		if (tipe) where.tipe = tipe;
		if (dari && sampai)
			where.tanggal = { gte: new Date(dari), lte: new Date(sampai) };
		if (kelas) where.siswa = { kelas: { in: kelas.split(",") } };
		if (search)
			where.siswa = {
				...(where.siswa || {}),
				OR: [
					{ nama: { contains: search, mode: "insensitive" } },
					{ nisn: { contains: search } },
				],
			};

		const [list, total] = await Promise.all([
			prisma.poinSiswa.findMany({
				where,
				skip: (Number(page) - 1) * Number(limit),
				take: Number(limit),
				orderBy: { tanggal: "desc" },
				include: {
					siswa: { select: { nama: true, kelas: true } },
					jenisPrestasi: { select: { nama: true, kategori: true } },
					jenisPelanggaran: { select: { nama: true, kategori: true } },
				},
			}),
			prisma.poinSiswa.count({ where }),
		]);
		return {
			success: true,
			data: list,
			total,
			page: Number(page),
			limit: Number(limit),
		};
	});

	// GET /api/v1/bk/poin/siswa/:nisn — total poin per siswa
	fastify.get("/bk/poin/siswa/:nisn", auth, async (request, reply) => {
		const { nisn } = request.params;
		const siswa = await prisma.siswa.findUnique({ where: { nisn } });
		if (!siswa)
			return reply
				.code(404)
				.send({ success: false, message: "Siswa tidak ditemukan." });

		const [list, aggPrestasi, aggPelanggaran] = await Promise.all([
			prisma.poinSiswa.findMany({
				where: { siswaNisn: nisn },
				orderBy: { tanggal: "desc" },
				include: {
					jenisPrestasi: { select: { nama: true, kategori: true } },
					jenisPelanggaran: { select: { nama: true, kategori: true } },
				},
			}),
			prisma.poinSiswa.aggregate({
				where: { siswaNisn: nisn, tipe: "PRESTASI" },
				_sum: { poin: true },
			}),
			prisma.poinSiswa.aggregate({
				where: { siswaNisn: nisn, tipe: "PELANGGARAN" },
				_sum: { poin: true },
			}),
		]);

		return {
			success: true,
			data: list,
			total: {
				prestasi: aggPrestasi._sum.poin || 0,
				pelanggaran: aggPelanggaran._sum.poin || 0,
				net: (aggPrestasi._sum.poin || 0) - (aggPelanggaran._sum.poin || 0),
			},
		};
	});

	// POST /api/v1/bk/poin
	fastify.post("/bk/poin", adminBk, async (request, reply) => {
		const schema = z.object({
			siswaNisn: z.string(),
			tipe: z.enum(["PRESTASI", "PELANGGARAN"]),
			jenisPrestasiId: z.string().optional().nullable(),
			jenisPelanggaranId: z.string().optional().nullable(),
			poin: z.number().int().min(1),
			deskripsi: z.string().optional().nullable(),
			tanggal: z.string(),
			tingkat: z.string().optional().nullable(),
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

		const record = await prisma.poinSiswa.create({
			data: {
				...parsed.data,
				tanggal: new Date(parsed.data.tanggal),
				inputBy: request.user.userId,
			},
			include: {
				siswa: { select: { nama: true, kelas: true } },
				jenisPrestasi: true,
				jenisPelanggaran: true,
			},
		});
		return reply.code(201).send({ success: true, data: record });
	});

	// PUT /api/v1/bk/poin/:id
	fastify.put("/bk/poin/:id", adminBk, async (request, reply) => {
		const schema = z.object({
			poin: z.number().int().min(1).optional(),
			deskripsi: z.string().optional().nullable(),
			tanggal: z.string().optional(),
			tingkat: z.string().optional().nullable(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const data = { ...parsed.data };
		if (parsed.data.tanggal) data.tanggal = new Date(parsed.data.tanggal);
		const record = await prisma.poinSiswa
			.update({ where: { id: request.params.id }, data })
			.catch(() => null);
		if (!record)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true, data: record };
	});

	// DELETE /api/v1/bk/poin/:id
	fastify.delete("/bk/poin/:id", adminBk, async (request, reply) => {
		const deleted = await prisma.poinSiswa
			.delete({ where: { id: request.params.id } })
			.catch(() => null);
		if (!deleted)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true };
	});

	// GET /api/v1/bk/poin/ranking — top poin siswa
	fastify.get("/bk/poin/ranking", auth, async (request) => {
		const { tipe, kelas, limit = 20 } = request.query;
		const where = {};
		if (tipe) where.tipe = tipe;
		if (kelas) where.siswa = { kelas: { in: kelas.split(",") } };

		const grouped = await prisma.poinSiswa.groupBy({
			by: ["siswaNisn"],
			where,
			_sum: { poin: true },
			orderBy: { _sum: { poin: "desc" } },
			take: Number(limit),
		});

		const siswaNisnList = grouped.map((g) => g.siswaNisn);
		const siswaList = await prisma.siswa.findMany({
			where: { nisn: { in: siswaNisnList } },
			select: { nisn: true, nama: true, kelas: true },
		});
		const siswaMap = {};
		siswaList.forEach((s) => {
			siswaMap[s.nisn] = s;
		});

		return {
			success: true,
			data: grouped
				.map((g) => ({ ...siswaMap[g.siswaNisn], totalPoin: g._sum.poin || 0 }))
				.filter((d) => d.nisn),
		};
	});
}
