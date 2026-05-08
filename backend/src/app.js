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
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ===== INISIALISASI =====
const app = Fastify({
	logger: {
		level: process.env.NODE_ENV === "production" ? "warn" : "info",
		transport:
			process.env.NODE_ENV !== "production"
				? { target: "pino-pretty", options: { colorize: true } }
				: undefined,
	},
});

redis.on("error", (err) =>
	app.log.warn("Redis tidak tersedia (opsional):", err.message),
);

// ===== PLUGINS =====

// Keamanan
await app.register(fastifyHelmet, {
	contentSecurityPolicy: false, // dikelola manual untuk mendukung TinyMCE & MathJax
});

// CORS
await app.register(fastifyCors, {
	origin: (process.env.FRONTEND_URL || "http://localhost:5173").split(","),
	credentials: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
});

// Compression
await app.register(fastifyCompress);

// Cookie
await app.register(fastifyCookie, {
	secret: process.env.JWT_ACCESS_SECRET,
});

// JWT
await app.register(fastifyJwt, {
	secret: process.env.JWT_ACCESS_SECRET,
	cookie: { cookieName: "access_token", signed: false },
});

// Rate Limiting (global - per endpoint bisa di-override)
await app.register(fastifyRateLimit, {
	max: 200,
	timeWindow: "1 minute",
});

// File Upload
await app.register(fastifyMultipart, {
	limits: {
		fileSize: (parseInt(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024,
	},
});

// Static files (upload folder)
await app.register(fastifyStatic, {
	root: path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads"),
	prefix: "/uploads/",
});

// Serve Vue SPA (production)
await app.register(fastifyStatic, {
	root: path.join(__dirname, "..", "public"),
	prefix: "/",
	decorateReply: false, // jangan timpa decorator dari registrasi pertama
});

// Global error handler — ubah ZodError menjadi 400 bukan 500
app.setErrorHandler((error, request, reply) => {
	if (error.issues || error.name === "ZodError") {
		return reply.code(400).send({
			success: false,
			message: "Validasi gagal.",
			errors: error.issues || [],
		});
	}
	if (error.statusCode) {
		return reply
			.code(error.statusCode)
			.send({ success: false, message: error.message });
	}
	app.log.error(error);
	return reply
		.code(500)
		.send({ success: false, message: "Terjadi kesalahan server." });
});

// SPA Fallback — Vue Router history mode (semua non-API route → index.html)
app.setNotFoundHandler(async (request, reply) => {
	if (request.url.startsWith("/api/") || request.url.startsWith("/uploads/")) {
		return reply
			.code(404)
			.send({ success: false, message: "Endpoint tidak ditemukan." });
	}
	return reply.sendFile("index.html", path.join(__dirname, "..", "public"));
});

// ===== CUSTOM PLUGINS =====
// auth.js mendaftarkan: authenticate, requireRole
// ipFilter.js mendaftarkan: onRequest hook untuk whitelist IP
const { default: authPlugin } = await import("./plugins/auth.js");
const { default: ipFilterPlugin } = await import("./plugins/ipFilter.js");
await app.register(authPlugin);
await app.register(ipFilterPlugin);

// ===== ROUTES =====
// Import routes secara dinamis (akan ditambahkan seiring pengembangan)
const routeFiles = [
	"./routes/auth.js",
	"./routes/users.js",
	"./routes/exams.js",
	"./routes/questions.js",
	"./routes/responses.js",
	"./routes/config.js",
	"./routes/master-data.js",
	"./routes/ip-management.js",
	"./routes/uploads.js",
	"./routes/monitor.js",
	"./routes/images.js",
];

for (const routeFile of routeFiles) {
	try {
		const { default: route } = await import(routeFile);
		await app.register(route, { prefix: "/api/v1" });
	} catch (err) {
		app.log.warn(`Route ${routeFile} belum ada, dilewati.`);
	}
}

// Health check
app.get("/health", async () => ({
	status: "ok",
	timestamp: new Date().toISOString(),
	version: "1.0.0",
}));

// ===== START =====
const PORT = parseInt(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

// Try connecting to Redis (optional - server works without it)
try {
	await redis.connect();
	app.log.info("Redis terhubung");
} catch {
	app.log.warn("Redis tidak tersedia - berjalan tanpa cache (OK)");
}

await app.listen({ port: PORT, host: HOST });
app.log.info(`🚀 CBT RSMS Backend berjalan di http://${HOST}:${PORT}`);
app.log.info(
	`📊 Prisma Studio: jalankan "npm run db:studio" di folder backend`,
);

// Graceful shutdown
const shutdown = async () => {
	await prisma.$disconnect();
	try {
		await redis.quit();
	} catch {}
	await app.close();
	process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
