// JWT Auth plugin - decorates request with verifyJWT, requireRole helpers
import fp from "fastify-plugin";

async function authPlugin(fastify) {
	// Verifies token from cookie or Authorization header
	fastify.decorate("verifyJWT", async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch {
			return reply
				.code(401)
				.send({
					success: false,
					message: "Token tidak valid atau sudah habis masa berlakunya.",
				});
		}
	});

	// Require specific roles (array or string)
	fastify.decorate("requireRole", (roles) => async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch {
			return reply.code(401).send({ success: false, message: "Unauthorized." });
		}
		const allowed = Array.isArray(roles) ? roles : [roles];
		if (!allowed.includes(request.user.role)) {
			return reply
				.code(403)
				.send({
					success: false,
					message: "Akses ditolak. Hak akses tidak mencukupi.",
				});
		}
	});
}

export default fp(authPlugin);
