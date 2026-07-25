import { z } from "zod";
import { prisma } from "../lib/db.js";

export default async function masterDataRoutes(fastify) {
	const adminOnly = { preHandler: fastify.requireRole(["admin"]) };
	const auth = { preHandler: fastify.verifyJWT };

	// GET /api/v1/master-data — kelas + mapel list
	fastify.get("/master-data", auth, async () => {
		const [kelas, mapel] = await Promise.all([
			prisma.kelas.findMany({ orderBy: { nama: "asc" } }),
			prisma.mapel.findMany({ orderBy: { nama: "asc" } }),
		]);
		return { success: true, data: { kelas, mapel } };
	});

	// POST /api/v1/master-data/kelas
	fastify.post("/master-data/kelas", adminOnly, async (request, reply) => {
		const { nama } = z
			.object({ nama: z.string().min(1).max(50) })
			.parse(request.body);
		const existing = await prisma.kelas.findUnique({ where: { nama } });
		if (existing)
			return reply
				.code(409)
				.send({ success: false, message: "Kelas sudah ada." });
		const item = await prisma.kelas.create({ data: { nama } });
		return reply.code(201).send({ success: true, data: item });
	});

	// DELETE /api/v1/master-data/kelas/:id
	fastify.delete(
		"/master-data/kelas/:id",
		adminOnly,
		async (request, reply) => {
			await prisma.kelas
				.delete({ where: { id: request.params.id } })
				.catch(() => null);
			return { success: true };
		},
	);

	// POST /api/v1/master-data/mapel
	fastify.post("/master-data/mapel", adminOnly, async (request, reply) => {
		const { nama } = z
			.object({ nama: z.string().min(1).max(100) })
			.parse(request.body);
		const existing = await prisma.mapel.findUnique({ where: { nama } });
		if (existing)
			return reply
				.code(409)
				.send({ success: false, message: "Mata pelajaran sudah ada." });
		const item = await prisma.mapel.create({ data: { nama } });
		return reply.code(201).send({ success: true, data: item });
	});

	// DELETE /api/v1/master-data/mapel/:id
	fastify.delete(
		"/master-data/mapel/:id",
		adminOnly,
		async (request, reply) => {
			await prisma.mapel
				.delete({ where: { id: request.params.id } })
				.catch(() => null);
			return { success: true };
		},
	);
}
