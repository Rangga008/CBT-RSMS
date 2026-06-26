import { prisma } from "../lib/db.js";

export default async function configRoutes(fastify) {
	const adminOnly = { preHandler: fastify.requireRole(["admin"]) };
	const auth = { preHandler: fastify.verifyJWT };

	// GET /api/v1/config
	fastify.get("/config", auth, async () => {
		const list = await prisma.appConfig.findMany();
		const cfg = {};
		list.forEach((c) => {
			try {
				cfg[c.key] = JSON.parse(c.value);
			} catch {
				cfg[c.key] = c.value;
			}
		});
		return { success: true, data: cfg };
	});

	// PUT /api/v1/config — save multiple keys at once
	fastify.put("/config", adminOnly, async (request) => {
		const data = request.body;
		const ops = Object.entries(data).map(([key, value]) =>
			prisma.appConfig.upsert({
				where: { key },
				update: {
					value: typeof value === "string" ? value : JSON.stringify(value),
				},
				create: {
					key,
					value: typeof value === "string" ? value : JSON.stringify(value),
				},
			}),
		);
		await Promise.all(ops);
		return { success: true };
	});

	// Hari Libur CRUD
	fastify.get("/config/hari-libur", auth, async () => {
		const list = await prisma.hariLibur.findMany({
			orderBy: { tanggal: "asc" },
		});
		return { success: true, data: list };
	});

	fastify.post("/config/hari-libur", adminOnly, async (request, reply) => {
		const { tanggal, keterangan } = request.body;
		if (!tanggal || !keterangan)
			return reply
				.code(400)
				.send({
					success: false,
					message: "tanggal dan keterangan wajib diisi.",
				});
		const record = await prisma.hariLibur.upsert({
			where: { tanggal: new Date(tanggal) },
			update: { keterangan },
			create: { tanggal: new Date(tanggal), keterangan },
		});
		return reply.code(201).send({ success: true, data: record });
	});

	fastify.delete(
		"/config/hari-libur/:id",
		adminOnly,
		async (request, reply) => {
			await prisma.hariLibur
				.delete({ where: { id: request.params.id } })
				.catch(() => null);
			return { success: true };
		},
	);
}
