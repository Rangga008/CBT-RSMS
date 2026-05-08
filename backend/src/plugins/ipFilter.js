import fp from "fastify-plugin";
import { prisma } from "../lib/db.js";

/**
 * Middleware IP Filter.
 * Mode: "open" = semua diizinkan, "whitelist" = hanya IP terdaftar & aktif.
 * Selalu izinkan IP superadmin dari ENV.
 */
async function ipFilter(fastify) {
	fastify.addHook("onRequest", async (request, reply) => {
		const mode = process.env.IP_FILTER_MODE || "open";
		if (mode === "open") return; // tidak ada filter

		const superAdminIPs = (process.env.IP_SUPERADMIN || "127.0.0.1,::1")
			.split(",")
			.map((ip) => ip.trim());

		const clientIp = request.ip;

		// Selalu izinkan superadmin IP
		if (superAdminIPs.includes(clientIp)) return;

		// Cek whitelist
		const allowed = await prisma.ipWhitelist.findFirst({
			where: { ipAddress: clientIp, isActive: true },
		});

		if (!allowed) {
			// Log akses yang ditolak
			await prisma.ipAccessLog
				.create({
					data: {
						ipAddress: clientIp,
						path: request.url,
						method: request.method,
						statusCode: 403,
					},
				})
				.catch(() => {}); // jangan crash karena log gagal

			return reply.code(403).send({
				success: false,
				message: `Akses dari IP ${clientIp} tidak diizinkan. Hubungi administrator.`,
			});
		}
	});
}

export default fp(ipFilter, { name: "ip-filter" });
