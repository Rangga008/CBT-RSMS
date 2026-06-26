import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

export default async function usersRoutes(fastify) {
	const adminOnly = { preHandler: fastify.requireRole(["admin"]) };
	const adminBk = { preHandler: fastify.requireRole(["admin", "bk"]) };

	// GET /api/v1/users
	fastify.get("/users", adminOnly, async (request) => {
		const { role, search } = request.query;
		const where = {};
		if (role) where.role = role;
		if (search)
			where.OR = [
				{ nama: { contains: search, mode: "insensitive" } },
				{ userId: { contains: search, mode: "insensitive" } },
			];
		const users = await prisma.user.findMany({
			where,
			orderBy: { nama: "asc" },
			select: {
				id: true,
				userId: true,
				nama: true,
				role: true,
				kelas: true,
				isActive: true,
				displayPassword: true,
				createdAt: true,
			},
		});
		return { success: true, data: users };
	});

	// POST /api/v1/users
	fastify.post("/users", adminOnly, async (request, reply) => {
		const schema = z.object({
			userId: z.string().min(3).max(30),
			nama: z.string().min(2).max(100),
			password: z.string().min(6).max(100),
			role: z.enum(["admin", "bk", "guru"]),
			kelas: z.string().optional(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });
		const { userId, nama, password, role, kelas } = parsed.data;

		const existing = await prisma.user.findFirst({
			where: { userId: { equals: userId, mode: "insensitive" } },
		});
		if (existing)
			return reply
				.code(409)
				.send({ success: false, message: "User ID sudah digunakan." });

		const hashed = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				userId,
				nama,
				password: hashed,
				role,
				kelas,
				displayPassword: password,
			},
			select: {
				id: true,
				userId: true,
				nama: true,
				role: true,
				kelas: true,
				isActive: true,
			},
		});
		return reply.code(201).send({ success: true, data: user });
	});

	// PUT /api/v1/users/:id
	fastify.put("/users/:id", adminOnly, async (request, reply) => {
		const schema = z.object({
			nama: z.string().min(2).max(100).optional(),
			password: z.string().min(6).max(100).optional(),
			role: z.enum(["admin", "bk", "guru"]).optional(),
			kelas: z.string().optional().nullable(),
			isActive: z.boolean().optional(),
		});
		const parsed = schema.safeParse(request.body);
		if (!parsed.success)
			return reply
				.code(400)
				.send({ success: false, message: parsed.error.errors[0].message });

		const updateData = { ...parsed.data };
		if (parsed.data.password) {
			updateData.password = await bcrypt.hash(parsed.data.password, 12);
			updateData.displayPassword = parsed.data.password;
		}
		delete updateData.password;

		const user = await prisma.user
			.update({
				where: { id: request.params.id },
				data: updateData,
				select: {
					id: true,
					userId: true,
					nama: true,
					role: true,
					kelas: true,
					isActive: true,
				},
			})
			.catch(() => null);

		if (!user)
			return reply
				.code(404)
				.send({ success: false, message: "User tidak ditemukan." });
		return { success: true, data: user };
	});

	// DELETE /api/v1/users/:id
	fastify.delete("/users/:id", adminOnly, async (request, reply) => {
		if (request.user.id === request.params.id) {
			return reply
				.code(400)
				.send({
					success: false,
					message: "Tidak bisa menghapus akun sendiri.",
				});
		}
		await prisma.user
			.delete({ where: { id: request.params.id } })
			.catch(() => null);
		return { success: true };
	});
}
