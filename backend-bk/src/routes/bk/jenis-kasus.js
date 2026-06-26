import { z } from "zod";
import { prisma } from "../../lib/db.js";

const schema = z.object({
	kode: z.string().min(2).max(20).optional(),
	nama: z.string().min(2).max(100),
	deskripsi: z.string().optional().nullable(),
	isActive: z.boolean().optional(),
});

export default async function jenisKasusRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };
	const auth = { preHandler: fastify.verifyJWT };

	fastify.get("/bk/jenis-kasus", auth, async (request) => {
		const where = request.query.active === "false" ? {} : { isActive: true };
		const list = await prisma.jenisKasus.findMany({
			where,
			orderBy: { nama: "asc" },
		});
		return { success: true, data: list };
	});

	fastify.post("/bk/jenis-kasus", adminBk, async (request, reply) => {
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const { kode, ...rest } = parsed.data;
		const autoKode =
			kode ||
			`K${String((await prisma.jenisKasus.count()) + 1).padStart(3, "0")}`;
		const record = await prisma.jenisKasus.create({
			data: { kode: autoKode, ...rest },
		});
		return reply.code(201).send({ success: true, data: record });
	});

	fastify.put("/bk/jenis-kasus/:id", adminBk, async (request, reply) => {
		const parsed = schema.partial().safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const record = await prisma.jenisKasus
			.update({ where: { id: request.params.id }, data: parsed.data })
			.catch(() => null);
		if (!record)
			return reply
				.code(404)
				.send({ success: false, message: "Data tidak ditemukan." });
		return { success: true, data: record };
	});

	fastify.delete(
		"/bk/jenis-kasus/:id",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			const deleted = await prisma.jenisKasus
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
