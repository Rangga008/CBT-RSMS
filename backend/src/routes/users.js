import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

const userCreateSchema = z.object({
	userId: z.string().min(3).max(50),
	nama: z.string().min(1).max(100),
	password: z.string().min(6).max(100),
	role: z.enum(["Admin", "Guru", "Siswa"]),
	kelas: z.string().optional().default("-"),
});

const userUpdateSchema = userCreateSchema.partial().omit({ userId: true });

export default async function usersRoutes(fastify) {
	// ─── GET /api/v1/users ───────────────────────────────────
	fastify.get(
		"/users",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { role, kelas, search, page = 1, limit = 50 } = request.query;
			const skip = (Number(page) - 1) * Number(limit);

			// Guru hanya lihat siswa di kelasnya
			let kelasCondition = kelas
				? { contains: kelas, mode: "insensitive" }
				: undefined;
			if (request.user.role === "Guru" && !kelas) {
				const assignedKelas = (request.user.kelas || "")
					.split(",")
					.map((r) => r.split(":")[1]?.trim())
					.filter(Boolean);
				if (assignedKelas.length > 0) {
					kelasCondition = { in: assignedKelas };
				}
			}

			const where = {
				...(role && { role }),
				// Guru hanya bisa lihat Siswa, bukan sesama Guru/Admin
				...(request.user.role === "Guru" && !role && { role: "Siswa" }),
				...(kelasCondition && { kelas: kelasCondition }),
				...(search && {
					OR: [
						{ userId: { contains: search, mode: "insensitive" } },
						{ nama: { contains: search, mode: "insensitive" } },
					],
				}),
			};

			const [users, total] = await Promise.all([
				prisma.user.findMany({
					where,
					skip,
					take: Number(limit),
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
					orderBy: { createdAt: "desc" },
				}),
				prisma.user.count({ where }),
			]);

			return reply.send({
				success: true,
				data: users,
				total,
				page: Number(page),
				limit: Number(limit),
			});
		},
	);

	// ─── POST /api/v1/users ──────────────────────────────────
	fastify.post(
		"/users",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const parsed = userCreateSchema.safeParse(request.body);
			if (!parsed.success) {
				return reply.code(400).send({
					success: false,
					message: "Data tidak valid.",
					errors: parsed.error.flatten(),
				});
			}
			const { userId, nama, password, role, kelas } = parsed.data;

			const existing = await prisma.user.findFirst({
				where: { userId: { equals: userId, mode: "insensitive" } },
			});
			if (existing) {
				return reply.code(409).send({
					success: false,
					message: `User ID "${userId}" sudah digunakan.`,
				});
			}

			const hashed = await bcrypt.hash(password, 12);
			const user = await prisma.user.create({
				data: {
					userId,
					nama,
					password: hashed,
					displayPassword: password,
					role,
					kelas,
				},
				select: {
					id: true,
					userId: true,
					nama: true,
					role: true,
					kelas: true,
					isActive: true,
					displayPassword: true,
				},
			});

			return reply.code(201).send({ success: true, data: user });
		},
	);

	// ─── GET /api/v1/users/:id ───────────────────────────────
	fastify.get(
		"/users/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const user = await prisma.user.findUnique({
				where: { id: request.params.id },
				select: {
					id: true,
					userId: true,
					nama: true,
					role: true,
					kelas: true,
					isActive: true,
					createdAt: true,
				},
			});
			if (!user)
				return reply
					.code(404)
					.send({ success: false, message: "User tidak ditemukan." });
			return reply.send({ success: true, data: user });
		},
	);

	// ─── PATCH /api/v1/users/:id ─────────────────────────────
	fastify.patch(
		"/users/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const parsed = userUpdateSchema.safeParse(request.body);
			if (!parsed.success) {
				return reply.code(400).send({
					success: false,
					message: "Data tidak valid.",
					errors: parsed.error.flatten(),
				});
			}
			const data = { ...parsed.data };
			if (data.password) {
				data.displayPassword = data.password;
				data.password = await bcrypt.hash(data.password, 12);
			}

			const user = await prisma.user.update({
				where: { id: request.params.id },
				data,
				select: {
					id: true,
					userId: true,
					nama: true,
					role: true,
					kelas: true,
					isActive: true,
					displayPassword: true,
				},
			});
			return reply.send({ success: true, data: user });
		},
	);

	// ─── PATCH /api/v1/users/:id/toggle-status ───────────────
	fastify.patch(
		"/users/:id/toggle-status",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const user = await prisma.user.findUnique({
				where: { id: request.params.id },
				select: { id: true, isActive: true },
			});
			if (!user)
				return reply
					.code(404)
					.send({ success: false, message: "User tidak ditemukan." });
			const updated = await prisma.user.update({
				where: { id: request.params.id },
				data: { isActive: !user.isActive },
				select: { id: true, userId: true, isActive: true },
			});
			return reply.send({ success: true, data: updated });
		},
	);

	// ─── DELETE /api/v1/users/:id ────────────────────────────
	fastify.delete(
		"/users/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			// Jangan hapus diri sendiri
			if (request.params.id === request.user.id) {
				return reply.code(400).send({
					success: false,
					message: "Tidak bisa menghapus akun sendiri.",
				});
			}
			await prisma.user.delete({ where: { id: request.params.id } });
			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/users/bulk ─────────────────────────────
	// Import user massal dari array
	fastify.post(
		"/users/bulk",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const users = z.array(userCreateSchema).safeParse(request.body);
			if (!users.success) {
				return reply
					.code(400)
					.send({ success: false, message: "Format data tidak valid." });
			}

			let created = 0,
				skipped = 0;
			for (const u of users.data) {
				const exists = await prisma.user.findFirst({
					where: { userId: { equals: u.userId, mode: "insensitive" } },
				});
				if (exists) {
					skipped++;
					continue;
				}
				const hashed = await bcrypt.hash(u.password, 12);
				await prisma.user.create({
					data: { ...u, password: hashed, displayPassword: u.password },
				});
				created++;
			}

			return reply.send({
				success: true,
				message: `${created} user dibuat, ${skipped} dilewati (duplikat).`,
			});
		},
	);
}
