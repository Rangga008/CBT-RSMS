import path from "path";
import fs from "node:fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function uploadsRoutes(fastify) {
	const adminBk = { preHandler: fastify.requireRole(["admin"]) };

	// POST /api/v1/uploads/bk-image — upload a branding image (admin only)
	fastify.post("/uploads/bk-image", adminBk, async (request, reply) => {
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
			"image/x-icon",
			"image/svg+xml",
		];
		if (!allowedTypes.includes(data.mimetype)) {
			// Drain the stream to avoid memory leak
			data.file.resume();
			return reply.code(400).send({
				success: false,
				message:
					"Tipe file tidak didukung. Gunakan JPG, PNG, GIF, WebP, ICO, atau SVG.",
			});
		}

		const uploadDir = path.join(__dirname, "../../uploads/bk");
		fs.mkdirSync(uploadDir, { recursive: true });

		const ext = path.extname(data.filename || "").toLowerCase() || ".jpg";
		// Sanitize extension — only allow safe chars
		const safeExt = ext.replace(/[^a-z0-9.]/g, "").slice(0, 10);
		const filename = `branding_${Date.now()}${safeExt}`;
		const filepath = path.join(uploadDir, filename);

		await new Promise((resolve, reject) => {
			const ws = fs.createWriteStream(filepath);
			data.file.pipe(ws);
			ws.on("finish", resolve);
			ws.on("error", reject);
		});

		const url = `/uploads/bk/${filename}`;
		return { success: true, url };
	});
}
