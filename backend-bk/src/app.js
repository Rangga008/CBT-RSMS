import "dotenv/config";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyCompress from "@fastify/compress";
import fastifyCookie from "@fastify/cookie";
import fastifyRateLimit from "@fastify/rate-limit";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import fastifyJwt from "@fastify/jwt";
import { prisma, redis } from "./lib/db.js";
import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = Fastify({
	logger: {
		level: process.env.NODE_ENV === "production" ? "warn" : "info",
		transport:
			process.env.NODE_ENV !== "production"
				? { target: "pino-pretty", options: { colorize: true } }
				: undefined,
	},
});

redis.on("error", (err) => app.log.warn("Redis tidak tersedia:", err.message));

// ── Plugins ───────────────────────────────────────────────────────────────────
await app.register(fastifyHelmet, { contentSecurityPolicy: false });

await app.register(fastifyCors, {
	origin: (process.env.FRONTEND_URL || "http://localhost:5174").split(","),
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

await app.register(fastifyCompress);

await app.register(fastifyCookie, { secret: process.env.JWT_ACCESS_SECRET });

await app.register(fastifyJwt, {
	secret: process.env.JWT_ACCESS_SECRET,
	cookie: { cookieName: "bk_access_token", signed: false },
	getToken: (request) => {
		// Query param (for EventSource/SSE which cannot set headers)
		if (request.query?.token) return request.query.token;
		// Authorization header
		const authHeader = request.headers.authorization;
		if (authHeader?.startsWith("Bearer ")) return authHeader.slice(7);
		// Cookie fallback
		return request.cookies.bk_access_token;
	},
});

await app.register(fastifyRateLimit, { max: 300, timeWindow: "1 minute" });

await app.register(fastifyMultipart, {
	limits: {
		fileSize: (parseInt(process.env.MAX_FILE_SIZE_MB) || 10) * 1024 * 1024,
	},
});

// ── Static: Uploads ───────────────────────────────────────────────────────────
const uploadDir = path.join(
	__dirname,
	"..",
	process.env.UPLOAD_DIR || "uploads",
);
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
await app.register(fastifyStatic, {
	root: uploadDir,
	prefix: "/uploads/",
	decorateReply: false,
});

// ── Static: Frontend (served from public/ after build) ───────────────────────
const publicDir = path.join(__dirname, "..", "public");
if (fs.existsSync(publicDir)) {
	await app.register(fastifyStatic, {
		root: publicDir,
		prefix: "/",
		decorateReply: true,
	});
}

// ── Auth Plugin ───────────────────────────────────────────────────────────────
const { default: authPlugin } = await import("./plugins/auth.js");
await app.register(authPlugin);

// ── Routes ────────────────────────────────────────────────────────────────────
const routeFiles = [
	"./routes/auth.js",
	"./routes/users.js",
	"./routes/siswa.js",
	"./routes/absensi.js",
	"./routes/config.js",
	"./routes/bk/jenis-pelanggaran.js",
	"./routes/bk/jenis-prestasi.js",
	"./routes/bk/jenis-kasus.js",
	"./routes/bk/poin.js",
	"./routes/bk/kasus.js",
	"./routes/bk/kunjungan.js",
	"./routes/bk/dashboard.js",
	"./routes/sync.js",
	"./routes/internal.js",
	"./routes/master-data.js",
	"./routes/uploads.js",
];

for (const routeFile of routeFiles) {
	const { default: route } = await import(routeFile);
	await app.register(route, { prefix: "/api/v1" });
}

// ── File Upload Endpoint ──────────────────────────────────────────────────────
app.post(
	"/api/v1/upload",
	{ preHandler: app.verifyJWT },
	async (request, reply) => {
		const data = await request.file();
		if (!data)
			return reply
				.code(400)
				.send({ success: false, message: "Tidak ada file yang diunggah." });

		const allowedTypes = [
			"image/jpeg",
			"image/png",
			"image/gif",
			"image/webp",
			"application/pdf",
		];
		if (!allowedTypes.includes(data.mimetype)) {
			return reply
				.code(400)
				.send({ success: false, message: "Tipe file tidak diizinkan." });
		}

		const ext = path.extname(data.filename).toLowerCase() || ".bin";
		const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
		const subDir = path.join(uploadDir, "bk");
		if (!fs.existsSync(subDir)) fs.mkdirSync(subDir, { recursive: true });

		const filePath = path.join(subDir, fileName);
		await new Promise((resolve, reject) => {
			const ws = fs.createWriteStream(filePath);
			data.file.pipe(ws);
			ws.on("finish", resolve);
			ws.on("error", reject);
		});

		return {
			success: true,
			url: `/uploads/bk/${fileName}`,
			filename: data.filename,
		};
	},
);

// ── SPA fallback ──────────────────────────────────────────────────────────────
if (fs.existsSync(publicDir)) {
	app.setNotFoundHandler((request, reply) => {
		if (request.url.startsWith("/api/")) {
			return reply
				.code(404)
				.send({ success: false, message: "Endpoint tidak ditemukan." });
		}
		reply.sendFile("index.html");
	});
}

// ── Health Check ──────────────────────────────────────────────────────────────
app.get("/health", async () => {
	try {
		await prisma.$queryRaw`SELECT 1`;
		return { status: "ok", service: "bk-rsms", db: "connected" };
	} catch {
		return { status: "degraded", service: "bk-rsms", db: "disconnected" };
	}
});

// ── Start ─────────────────────────────────────────────────────────────────────
const port = parseInt(process.env.PORT || "3001");
const host = process.env.HOST || "0.0.0.0";

try {
	await app.listen({ port, host });
	app.log.info(`🏫 BK RSMS Backend berjalan di http://${host}:${port}`);
} catch (err) {
	app.log.error(err);
	process.exit(1);
}
