import { z } from "zod";
import { prisma } from "../lib/db.js";

export default async function masterDataRoutes(fastify) {
	// ─── GET /api/v1/master-data ─────────────────────────────
	fastify.get(
		"/master-data",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const [kelas, mapel] = await Promise.all([
				prisma.kelas.findMany({ orderBy: { nama: "asc" } }),
				prisma.mapel.findMany({ orderBy: { nama: "asc" } }),
			]);
			return reply.send({ success: true, data: { kelas, mapel } });
		},
	);

	// ─── POST /api/v1/master-data/kelas ──────────────────────
	fastify.post(
		"/master-data/kelas",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const { nama } = z
				.object({ nama: z.string().min(1).max(50) })
				.parse(request.body);
			const item = await prisma.kelas.create({ data: { nama } });
			return reply.code(201).send({ success: true, data: item });
		},
	);

	// ─── DELETE /api/v1/master-data/kelas/:id ────────────────
	fastify.delete(
		"/master-data/kelas/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			await prisma.kelas.delete({ where: { id: request.params.id } });
			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/master-data/mapel ──────────────────────
	fastify.post(
		"/master-data/mapel",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const { nama } = z
				.object({ nama: z.string().min(1).max(100) })
				.parse(request.body);
			const item = await prisma.mapel.create({ data: { nama } });
			return reply.code(201).send({ success: true, data: item });
		},
	);

	// ─── DELETE /api/v1/master-data/mapel/:id ────────────────
	fastify.delete(
		"/master-data/mapel/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			await prisma.mapel.delete({ where: { id: request.params.id } });
			return reply.send({ success: true });
		},
	);
}
