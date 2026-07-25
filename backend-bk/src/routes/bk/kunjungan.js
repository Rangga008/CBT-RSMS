import { z } from "zod";
import { prisma } from "../../lib/db.js";

async function genNomor() {
	const count = await prisma.kunjunganRumah.count();
	return `KUN-${String(count + 1).padStart(4, "0")}`;
}

// Template dokumen yang biasa dibutuhkan untuk kunjungan rumah BK
export const TEMPLATE_DOKUMEN = [
	{ nama: "Surat Tugas Guru BK", tipe: "surat_tugas", required: true },
	{ nama: "Lembar Kunjungan Rumah", tipe: "lembar_kunjungan", required: true },
	{ nama: "Catatan Hasil Kunjungan", tipe: "catatan_hasil", required: true },
	{
		nama: "Daftar Hadir/Tanda Tangan Orang Tua",
		tipe: "ttd_ortu",
		required: true,
	},
	{ nama: "Foto Dokumentasi", tipe: "foto", required: false },
	{
		nama: "Surat Pernyataan Orang Tua",
		tipe: "pernyataan_ortu",
		required: false,
	},
];

export default async function kunjunganRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const auth = { preHandler: fastify.verifyJWT };

	// GET /api/v1/bk/kunjungan
	fastify.get("/bk/kunjungan", auth, async (request) => {
		const {
			nisn,
			status,
			dari,
			sampai,
			kelas,
			page = 1,
			limit = 20,
		} = request.query;
		const where = {};
		if (nisn) where.siswaNisn = nisn;
		if (status) where.status = status;
		if (dari && sampai)
			where.tanggal = { gte: new Date(dari), lte: new Date(sampai) };
		if (kelas) where.siswa = { kelas: { in: kelas.split(",") } };

		const [list, total] = await Promise.all([
			prisma.kunjunganRumah.findMany({
				where,
				skip: (Number(page) - 1) * Number(limit),
				take: Number(limit),
				orderBy: { tanggal: "desc" },
				include: {
					siswa: {
						select: {
							nama: true,
							kelas: true,
							alamat: true,
							noHp: true,
							namaAyah: true,
							namaIbu: true,
							fotoUrl: true,
						},
					},
				},
			}),
			prisma.kunjunganRumah.count({ where }),
		]);
		return { success: true, data: list, total };
	});

	// GET /api/v1/bk/kunjungan/template-dokumen
	fastify.get("/bk/kunjungan/template-dokumen", auth, async () => {
		return { success: true, data: TEMPLATE_DOKUMEN };
	});

	// GET /api/v1/bk/kunjungan/:id
	fastify.get("/bk/kunjungan/:id", auth, async (request, reply) => {
		const kunjungan = await prisma.kunjunganRumah.findUnique({
			where: { id: request.params.id },
			include: { siswa: true },
		});
		if (!kunjungan)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true, data: kunjungan };
	});

	// POST /api/v1/bk/kunjungan
	fastify.post("/bk/kunjungan", adminBk, async (request, reply) => {
		const schema = z.object({
			siswaNisn: z.string(),
			tanggal: z.string(),
			tujuan: z.string().min(5),
			petugasBk: z.string().optional().nullable(),
			catatan: z.string().optional().nullable(),
			dokumenList: z
				.array(
					z.object({
						nama: z.string(),
						tipe: z.string(),
						required: z.boolean().optional(),
					}),
				)
				.optional()
				.nullable(),
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

		const nomor = await genNomor();
		// Use template dokumen if not provided
		const dokumenList = parsed.data.dokumenList ?? TEMPLATE_DOKUMEN;

		const kunjungan = await prisma.kunjunganRumah.create({
			data: {
				...parsed.data,
				nomor,
				tanggal: new Date(parsed.data.tanggal),
				dokumenList,
				status: "Rencana",
			},
			include: { siswa: { select: { nama: true, kelas: true } } },
		});
		return reply.code(201).send({ success: true, data: kunjungan });
	});

	// PUT /api/v1/bk/kunjungan/:id
	fastify.put("/bk/kunjungan/:id", adminBk, async (request, reply) => {
		const schema = z.object({
			tanggal: z.string().optional(),
			tujuan: z.string().optional(),
			petugasBk: z.string().optional().nullable(),
			status: z
				.enum(["Rencana", "Berlangsung", "Selesai", "Dibatalkan"])
				.optional(),
			hasilKunjungan: z.string().optional().nullable(),
			catatan: z.string().optional().nullable(),
			dokumenList: z.any().optional(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const data = { ...parsed.data };
		if (parsed.data.tanggal) data.tanggal = new Date(parsed.data.tanggal);
		const kunjungan = await prisma.kunjunganRumah
			.update({ where: { id: request.params.id }, data })
			.catch(() => null);
		if (!kunjungan)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true, data: kunjungan };
	});

	// DELETE /api/v1/bk/kunjungan/:id
	fastify.delete(
		"/bk/kunjungan/:id",
		{ preHandler: fastify.requireRole(["admin", "bk"]) },
		async (request, reply) => {
			await prisma.kunjunganRumah
				.delete({ where: { id: request.params.id } })
				.catch(() => null);
			return { success: true };
		},
	);
}
