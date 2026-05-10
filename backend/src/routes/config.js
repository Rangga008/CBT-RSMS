import { z } from "zod";
import { prisma } from "../lib/db.js";

export default async function configRoutes(fastify) {
	// ─── GET /api/v1/config ───────────────────────────────────
	// Publik: untuk halaman login (nama app, logo, background)
	fastify.get("/config", async (request, reply) => {
		const configs = await prisma.config.findMany();
		const data = Object.fromEntries(configs.map((c) => [c.key, c.value]));
		const has = (k) => Object.prototype.hasOwnProperty.call(data, k);

		// Backward compatibility: unify old/new key names.
		// Important: only fallback when key is truly missing (undefined),
		// not when user intentionally sets empty string.
		if (!has("logo_url") && has("app_logo")) data.logo_url = data.app_logo;
		if (!has("background_url") && has("app_background"))
			data.background_url = data.app_background;
		if (!has("app_logo") && has("logo_url")) data.app_logo = data.logo_url;
		if (!has("app_background") && has("background_url"))
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

			const payload = { ...updates.data };

			// Keep legacy/new keys in sync so cleared values stay cleared
			// and old seeded keys don't repopulate after refresh.
			if (Object.prototype.hasOwnProperty.call(payload, "background_url")) {
				payload.app_background = payload.background_url;
			}
			if (Object.prototype.hasOwnProperty.call(payload, "logo_url")) {
				payload.app_logo = payload.logo_url;
			}

			const ops = Object.entries(payload).map(([key, value]) =>
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
