import fp from "fastify-plugin";

/**
 * Plugin dekorasi autentikasi & role.
 * Digunakan sebagai preHandler di route yang membutuhkan login.
 */
async function authDecorators(fastify) {
	// Verifikasi JWT
	fastify.decorate("authenticate", async function (request, reply) {
		try {
			await request.jwtVerify();
		} catch (err) {
			reply
				.code(401)
				.send({
					success: false,
					message: "Sesi tidak valid atau kadaluarsa. Silakan login ulang.",
				});
		}
	});

	// Verifikasi role (gunakan: fastify.requireRole('Admin', 'Guru'))
	fastify.decorate("requireRole", function (...roles) {
		return async function (request, reply) {
			try {
				await request.jwtVerify();
			} catch {
				return reply
					.code(401)
					.send({ success: false, message: "Sesi tidak valid." });
			}
			if (!roles.includes(request.user?.role)) {
				return reply
					.code(403)
					.send({
						success: false,
						message: "Akses ditolak. Role tidak mencukupi.",
					});
			}
		};
	});
}

export default fp(authDecorators, { name: "auth-decorators" });
