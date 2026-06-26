import { z } from "zod";
import { prisma } from "../../lib/db.js";

const schema = z.object({
	kode: z.string().min(2).max(20).optional(),
	nama: z.string().min(2).max(100),
	kategori: z
		.enum(["ringan", "sedang", "berat", "sangat_berat"])
		.default("ringan"),
	poin: z.number().int().min(1).default(5),
	deskripsi: z.string().optional().nullable(),
	isActive: z.boolean().optional(),
});

export default async function jenisPelanggaranRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const auth = { preHandler: fastify.verifyJWT };

	fastify.get("/bk/jenis-pelanggaran", auth, async (request) => {
		const { active } = request.query;
		const where = active === "false" ? {} : { isActive: true };
		const list = await prisma.jenisPelanggaran.findMany({
			where,
			orderBy: [{ kategori: "asc" }, { nama: "asc" }],
		});
		return { success: true, data: list };
	});

	fastify.post("/bk/jenis-pelanggaran", adminBk, async (request, reply) => {
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const { kode, ...rest } = parsed.data;
		const autoKode = kode || (await generateKode("P", "jenisPelanggaran"));
		const existing = await prisma.jenisPelanggaran.findFirst({
			where: { kode: autoKode },
		});
		if (existing)
			return reply
				.code(409)
				.send({ success: false, message: "Kode sudah digunakan." });
		const record = await prisma.jenisPelanggaran.create({
			data: { kode: autoKode, ...rest },
		});
		return reply.code(201).send({ success: true, data: record });
	});

	fastify.put("/bk/jenis-pelanggaran/:id", adminBk, async (request, reply) => {
		const parsed = schema.partial().safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const record = await prisma.jenisPelanggaran
			.update({ where: { id: request.params.id }, data: parsed.data })
			.catch(() => null);
		if (!record)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true, data: record };
	});

	fastify.delete(
		"/bk/jenis-pelanggaran/:id",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			const deleted = await prisma.jenisPelanggaran
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

async function generateKode(prefix, model) {
	const count = await prisma[model].count();
	return `${prefix}${String(count + 1).padStart(3, "0")}`;
}
