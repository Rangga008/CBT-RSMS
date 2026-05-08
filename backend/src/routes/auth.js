import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

const loginSchema = z.object({
	userId: z.string().min(1).max(50),
	password: z.string().min(1).max(100),
	pin: z.string().optional(),
});

export default async function authRoutes(fastify) {
	// ─── POST /api/v1/auth/login ─────────────────────────────
	fastify.post(
		"/auth/login",
		{
			config: {
				rateLimit: { max: 20, timeWindow: "1 minute" }, // lebih ketat untuk login
			},
		},
		async (request, reply) => {
			const parsed = loginSchema.safeParse(request.body);
			if (!parsed.success) {
				return reply
					.code(400)
					.send({ success: false, message: "Input tidak valid." });
			}
			const { userId, password } = parsed.data;

			const user = await prisma.user.findFirst({
				where: { userId: { equals: userId, mode: "insensitive" } },
			});

			if (!user) {
				return reply
					.code(401)
					.send({ success: false, message: "User ID atau password salah." });
			}
			if (!user.isActive) {
				return reply
					.code(403)
					.send({ success: false, message: "Akun Anda dinonaktifkan." });
			}

			const passwordMatch = await bcrypt.compare(password, user.password);
			if (!passwordMatch) {
				return reply
					.code(401)
					.send({ success: false, message: "User ID atau password salah." });
			}

			// Buat JWT
			const accessToken = fastify.jwt.sign(
				{
					id: user.id,
					userId: user.userId,
					nama: user.nama,
					role: user.role,
					kelas: user.kelas,
				},
				{ expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" },
			);

			const refreshToken = fastify.jwt.sign(
				{ id: user.id, type: "refresh" },
				{ expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" },
			);

			// Simpan refresh token ke DB
			const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
			await prisma.session.create({
				data: {
					userId: user.id,
					token: refreshToken,
					expiresAt,
					ipAddress: request.ip,
					userAgent: request.headers["user-agent"],
				},
			});

			// Kirim refresh token sebagai HttpOnly cookie
			reply.setCookie("refresh_token", refreshToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/api/v1/auth",
				maxAge: 7 * 24 * 60 * 60,
			});

			return reply.send({
				success: true,
				accessToken,
				user: {
					id: user.id,
					userId: user.userId,
					nama: user.nama,
					role: user.role,
					kelas: user.kelas,
				},
			});
		},
	);

	// ─── POST /api/v1/auth/refresh ───────────────────────────
	fastify.post("/auth/refresh", async (request, reply) => {
		const refreshToken = request.cookies?.refresh_token;
		if (!refreshToken) {
			return reply
				.code(401)
				.send({ success: false, message: "Tidak ada refresh token." });
		}

		let payload;
		try {
			payload = fastify.jwt.verify(refreshToken);
		} catch {
			return reply
				.code(401)
				.send({ success: false, message: "Refresh token tidak valid." });
		}

		const session = await prisma.session.findFirst({
			where: { token: refreshToken, expiresAt: { gte: new Date() } },
			include: { user: true },
		});

		if (!session || !session.user.isActive) {
			return reply
				.code(401)
				.send({
					success: false,
					message: "Sesi tidak ditemukan atau kadaluarsa.",
				});
		}

		const newAccessToken = fastify.jwt.sign(
			{
				id: session.user.id,
				userId: session.user.userId,
				nama: session.user.nama,
				role: session.user.role,
				kelas: session.user.kelas,
			},
			{ expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" },
		);

		return reply.send({ success: true, accessToken: newAccessToken });
	});

	// ─── POST /api/v1/auth/logout ────────────────────────────
	fastify.post(
		"/auth/logout",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const refreshToken = request.cookies?.refresh_token;
			if (refreshToken) {
				await prisma.session
					.deleteMany({ where: { token: refreshToken } })
					.catch(() => {});
			}
			reply.clearCookie("refresh_token", { path: "/api/v1/auth" });
			return reply.send({ success: true });
		},
	);

	// ─── GET /api/v1/auth/me ─────────────────────────────────
	fastify.get(
		"/auth/me",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			return reply.send({ success: true, user: request.user });
		},
	);
}
