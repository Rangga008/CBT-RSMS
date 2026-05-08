import { z } from "zod";
import { prisma } from "../lib/db.js";

const ipSchema = z.object({
	ipAddress: z
		.string()
		.ip({ version: "v4" })
		.or(z.string().ip({ version: "v6" }))
		.or(z.string().regex(/^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/)),
	label: z.string().max(100).optional().nullable(),
	targetRole: z.enum(["Admin", "Guru", "Siswa"]).optional().nullable(),
	isActive: z.boolean().default(true),
});

export default async function ipManagementRoutes(fastify) {
	// ─── GET /api/v1/ip-management ───────────────────────────
	fastify.get(
		"/ip-management",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const {
				isActive,
				targetRole,
				search,
				page = 1,
				limit = 50,
			} = request.query;
			const skip = (Number(page) - 1) * Number(limit);

			const where = {
				...(isActive !== undefined && { isActive: isActive === "true" }),
				...(targetRole && { targetRole }),
				...(search && {
					OR: [
						{ ipAddress: { contains: search } },
						{ label: { contains: search, mode: "insensitive" } },
					],
				}),
			};

			const [ips, total] = await Promise.all([
				prisma.ipWhitelist.findMany({
					where,
					skip,
					take: Number(limit),
					orderBy: { createdAt: "desc" },
				}),
				prisma.ipWhitelist.count({ where }),
			]);

			// Sertakan info mode saat ini
			const mode = process.env.IP_FILTER_MODE || "open";
			return reply.send({ success: true, data: ips, total, mode });
		},
	);

	// ─── POST /api/v1/ip-management ──────────────────────────
	fastify.post(
		"/ip-management",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const parsed = ipSchema.safeParse(request.body);
			if (!parsed.success) {
				return reply
					.code(400)
					.send({
						success: false,
						message: "IP address tidak valid.",
						errors: parsed.error.flatten(),
					});
			}

			const existing = await prisma.ipWhitelist.findFirst({
				where: {
					ipAddress: parsed.data.ipAddress,
					targetRole: parsed.data.targetRole ?? null,
				},
			});
			if (existing) {
				return reply
					.code(409)
					.send({
						success: false,
						message: "IP dengan role ini sudah terdaftar.",
					});
			}

			const ip = await prisma.ipWhitelist.create({
				data: { ...parsed.data, createdBy: request.user.id },
			});

			// Log akses sukses
			await prisma.ipAccessLog
				.create({
					data: {
						ipAddress: parsed.data.ipAddress,
						path: "/ip-management",
						method: "POST",
						statusCode: 201,
						userId: request.user.id,
					},
				})
				.catch(() => {});

			return reply.code(201).send({ success: true, data: ip });
		},
	);

	// ─── POST /api/v1/ip-management/bulk ─────────────────────
	fastify.post(
		"/ip-management/bulk",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const items = z.array(ipSchema).safeParse(request.body);
			if (!items.success)
				return reply
					.code(400)
					.send({ success: false, message: "Format tidak valid." });

			let created = 0,
				skipped = 0;
			for (const item of items.data) {
				const exists = await prisma.ipWhitelist.findFirst({
					where: {
						ipAddress: item.ipAddress,
						targetRole: item.targetRole ?? null,
					},
				});
				if (exists) {
					skipped++;
					continue;
				}
				await prisma.ipWhitelist.create({
					data: { ...item, createdBy: request.user.id },
				});
				created++;
			}

			return reply.send({
				success: true,
				message: `${created} IP ditambahkan, ${skipped} dilewati (duplikat).`,
			});
		},
	);

	// ─── PATCH /api/v1/ip-management/:id ─────────────────────
	fastify.patch(
		"/ip-management/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const parsed = ipSchema.partial().safeParse(request.body);
			if (!parsed.success)
				return reply
					.code(400)
					.send({ success: false, message: "Data tidak valid." });
			const ip = await prisma.ipWhitelist.update({
				where: { id: request.params.id },
				data: parsed.data,
			});
			return reply.send({ success: true, data: ip });
		},
	);

	// ─── DELETE /api/v1/ip-management/:id ────────────────────
	fastify.delete(
		"/ip-management/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			await prisma.ipWhitelist.delete({ where: { id: request.params.id } });
			return reply.send({ success: true });
		},
	);

	// ─── GET /api/v1/ip-management/logs ──────────────────────
	fastify.get(
		"/ip-management/logs",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const { ipAddress, page = 1, limit = 100 } = request.query;
			const skip = (Number(page) - 1) * Number(limit);

			const where = {
				...(ipAddress && { ipAddress: { contains: ipAddress } }),
			};
			const [logs, total] = await Promise.all([
				prisma.ipAccessLog.findMany({
					where,
					skip,
					take: Number(limit),
					orderBy: { timestamp: "desc" },
				}),
				prisma.ipAccessLog.count({ where }),
			]);
			return reply.send({ success: true, data: logs, total });
		},
	);

	// ─── GET /api/v1/ip-management/my-ip ─────────────────────
	// Endpoint publik: cek IP saat ini
	fastify.get("/ip-management/my-ip", async (request, reply) => {
		return reply.send({ ip: request.ip });
	});

	// ─── PATCH /api/v1/ip-management/mode ────────────────────
	// Toggle mode filter (butuh restart server untuk berlaku penuh)
	fastify.patch(
		"/ip-management/mode",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const { mode } = z
				.object({ mode: z.enum(["open", "whitelist"]) })
				.parse(request.body);
			// Simpan mode ke konfigurasi database untuk persistensi
			await prisma.config.upsert({
				where: { key: "ip_filter_mode" },
				update: { value: mode },
				create: { key: "ip_filter_mode", value: mode },
			});
			return reply.send({
				success: true,
				message: `Mode filter IP diubah ke "${mode}". Restart server untuk berlaku.`,
			});
		},
	);
}
