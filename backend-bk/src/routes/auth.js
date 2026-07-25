import { z } from "zod";
import bcrypt from "bcrypt";
import { prisma } from "../lib/db.js";

const loginSchema = z.object({
	userId: z.string().min(1).max(50),
	password: z.string().min(1).max(100),
});

// Helper: issue JWT + set cookies + save session
async function issueTokens(fastify, reply, user) {
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
	await prisma.session.create({
		data: {
			userId: user.id,
			token: refreshToken,
			expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
		},
	});
	const base = {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
	};
	reply.setCookie("bk_refresh_token", refreshToken, {
		...base,
		maxAge: 7 * 24 * 60 * 60,
	});
	reply.setCookie("bk_access_token", accessToken, { ...base, maxAge: 60 * 15 });
	return {
		success: true,
		token: accessToken,
		user: {
			id: user.id,
			userId: user.userId,
			nama: user.nama,
			role: user.role,
			kelas: user.kelas,
		},
	};
}

export default async function authRoutes(fastify) {
	// ── POST /api/v1/auth/login  (username + password - admin/bk/guru) ──────
	fastify.post(
		"/auth/login",
		{ config: { rateLimit: { max: 20, timeWindow: "1 minute" } } },
		async (request, reply) => {
			const parsed = loginSchema.safeParse(request.body);
			if (!parsed.success)
				return reply
					.code(400)
					.send({ success: false, message: "Input tidak valid." });

			const { userId, password } = parsed.data;
			const user = await prisma.user.findFirst({
				where: { userId: { equals: userId, mode: "insensitive" } },
			});
			if (!user)
				return reply
					.code(401)
					.send({ success: false, message: "User ID atau password salah." });
			if (!user.isActive)
				return reply
					.code(403)
					.send({ success: false, message: "Akun Anda dinonaktifkan." });

			const match = await bcrypt.compare(password, user.password);
			if (!match)
				return reply
					.code(401)
					.send({ success: false, message: "User ID atau password salah." });

			return issueTokens(fastify, reply, user);
		},
	);

	// ── POST /api/v1/auth/login-nisn  (NISN only - untuk siswa absensi) ─────
	fastify.post(
		"/auth/login-nisn",
		{ config: { rateLimit: { max: 30, timeWindow: "1 minute" } } },
		async (request, reply) => {
			const { nisn } = z
				.object({ nisn: z.string().min(4).max(20) })
				.parse(request.body);

			const siswa = await prisma.siswa.findUnique({ where: { nisn } });
			if (!siswa)
				return reply.code(401).send({
					success: false,
					message: "NISN tidak ditemukan. Hubungi Admin BK.",
				});

			// Cari atau buat User record untuk siswa ini (auto-create on first login)
			let user = await prisma.user.findFirst({ where: { userId: nisn } });
			if (!user) {
				const hashed = await bcrypt.hash(nisn, 10);
				user = await prisma.user.create({
					data: {
						userId: nisn,
						nama: siswa.nama,
						password: hashed,
						role: "siswa",
						kelas: siswa.kelas,
					},
				});
			} else if (!user.isActive) {
				return reply
					.code(403)
					.send({ success: false, message: "Akun siswa dinonaktifkan." });
			}

			return issueTokens(fastify, reply, user);
		},
	);

	// ── POST /api/v1/auth/refresh ─────────────────────────────────────────────
	fastify.post("/auth/refresh", async (request, reply) => {
		const token = request.cookies.bk_refresh_token;
		if (!token)
			return reply
				.code(401)
				.send({ success: false, message: "No refresh token." });
		try {
			const payload = fastify.jwt.verify(token);
			if (payload.type !== "refresh") throw new Error();
			const session = await prisma.session.findFirst({
				where: { token, expiresAt: { gt: new Date() } },
				include: { user: true },
			});
			if (!session)
				return reply
					.code(401)
					.send({ success: false, message: "Sesi tidak valid." });

			const accessToken = fastify.jwt.sign(
				{
					id: session.user.id,
					userId: session.user.userId,
					nama: session.user.nama,
					role: session.user.role,
					kelas: session.user.kelas,
				},
				{ expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" },
			);
			reply.setCookie("bk_access_token", accessToken, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				sameSite: "lax",
				path: "/",
				maxAge: 60 * 15,
			});
			return { success: true, token: accessToken };
		} catch {
			return reply
				.code(401)
				.send({ success: false, message: "Refresh token tidak valid." });
		}
	});

	// ── POST /api/v1/auth/logout ──────────────────────────────────────────────
	fastify.post("/auth/logout", async (request, reply) => {
		const token = request.cookies.bk_refresh_token;
		if (token)
			await prisma.session.deleteMany({ where: { token } }).catch(() => {});
		reply.clearCookie("bk_access_token", { path: "/" });
		reply.clearCookie("bk_refresh_token", { path: "/" });
		return { success: true };
	});

	// ── GET /api/v1/auth/me ───────────────────────────────────────────────────
	fastify.get(
		"/auth/me",
		{ preHandler: fastify.verifyJWT },
		async (request) => {
			const user = await prisma.user.findUnique({
				where: { id: request.user.id },
				select: {
					id: true,
					userId: true,
					nama: true,
					role: true,
					kelas: true,
					isActive: true,
				},
			});
			return { success: true, data: user };
		},
	);
}
