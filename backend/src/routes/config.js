import { z } from "zod";
import { prisma } from "../lib/db.js";

export default async function configRoutes(fastify) {
	// ─── GET /api/v1/config ───────────────────────────────────
	// Publik: untuk halaman login (nama app, logo, background)
	fastify.get("/config", async (request, reply) => {
		const configs = await prisma.config.findMany();
		const data = Object.fromEntries(configs.map((c) => [c.key, c.value]));

		// Backward compatibility: unify old/new key names.
		if (!data.logo_url && data.app_logo) data.logo_url = data.app_logo;
		if (!data.background_url && data.app_background)
			data.background_url = data.app_background;
		if (!data.app_logo && data.logo_url) data.app_logo = data.logo_url;
		if (!data.app_background && data.background_url)
			data.app_background = data.background_url;

		return reply.send({ success: true, data });
	});

	// ─── PATCH /api/v1/config ─────────────────────────────────
	fastify.patch(
		"/config",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const updates = z.record(z.string()).safeParse(request.body);
			if (!updates.success)
				return reply
					.code(400)
					.send({ success: false, message: "Format tidak valid." });

			const ops = Object.entries(updates.data).map(([key, value]) =>
				prisma.config.upsert({
					where: { key },
					update: { value },
					create: { key, value },
				}),
			);
			await Promise.all(ops);
			return reply.send({ success: true });
		},
	);
}
