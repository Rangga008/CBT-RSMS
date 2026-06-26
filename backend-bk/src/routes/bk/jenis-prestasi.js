import { z } from "zod";
import { prisma } from "../../lib/db.js";

const schema = z.object({
	kode: z.string().min(2).max(20).optional(),
	nama: z.string().min(2).max(100),
	kategori: z
		.enum([
			"akademik",
			"non_akademik",
			"olahraga",
			"seni",
			"keagamaan",
			"organisasi",
		])
		.default("akademik"),
	poin: z.number().int().min(1).default(10),
	deskripsi: z.string().optional().nullable(),
	isActive: z.boolean().optional(),
});

export default async function jenisPrestasiRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const auth = { preHandler: fastify.verifyJWT };

	fastify.get("/bk/jenis-prestasi", auth, async (request) => {
		const { active } = request.query;
		const where = active === "false" ? {} : { isActive: true };
		const list = await prisma.jenisPrestasi.findMany({
			where,
			orderBy: [{ kategori: "asc" }, { nama: "asc" }],
		});
		return { success: true, data: list };
	});

	fastify.post("/bk/jenis-prestasi", adminBk, async (request, reply) => {
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const { kode, ...rest } = parsed.data;
		const autoKode =
			kode ||
			`PR${String((await prisma.jenisPrestasi.count()) + 1).padStart(3, "0")}`;
		const existing = await prisma.jenisPrestasi.findFirst({
			where: { kode: autoKode },
		});
		if (existing)
			return reply
				.code(409)
				.send({ success: false, message: "Kode sudah digunakan." });
		const record = await prisma.jenisPrestasi.create({
			data: { kode: autoKode, ...rest },
		});
		return reply.code(201).send({ success: true, data: record });
	});

	fastify.put("/bk/jenis-prestasi/:id", adminBk, async (request, reply) => {
		const parsed = schema.partial().safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const record = await prisma.jenisPrestasi
			.update({ where: { id: request.params.id }, data: parsed.data })
			.catch(() => null);
		if (!record)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true, data: record };
	});

	fastify.delete(
		"/bk/jenis-prestasi/:id",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			const deleted = await prisma.jenisPrestasi
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
