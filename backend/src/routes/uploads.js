import path from "path";
import { pipeline } from "node:stream/promises";
import fs from "node:fs";
import crypto from "node:crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(
	__dirname,
	"..",
	"..",
	process.env.UPLOAD_DIR || "uploads",
);

const ALLOWED_MIME = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_SIZE = (parseInt(process.env.MAX_FILE_SIZE_MB) || 5) * 1024 * 1024;

export default async function uploadsRoutes(fastify) {
	// ─── POST /api/v1/uploads/image ──────────────────────────
	fastify.post(
		"/uploads/image",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const data = await request.file();

			if (!data)
				return reply
					.code(400)
					.send({ success: false, message: "Tidak ada file." });
			if (!ALLOWED_MIME.includes(data.mimetype)) {
				return reply
					.code(400)
					.send({
						success: false,
						message: "Hanya file gambar (JPG, PNG, GIF, WebP) yang diizinkan.",
					});
			}

			// Generate nama file unik
			const ext = path.extname(data.filename) || ".jpg";
			const uniqueName = `${Date.now()}-${crypto.randomBytes(8).toString("hex")}${ext}`;
			const filePath = path.join(UPLOAD_DIR, uniqueName);

			// Simpan file dengan ukuran check
			let size = 0;
			const chunks = [];
			for await (const chunk of data.file) {
				size += chunk.length;
				if (size > MAX_SIZE) {
					return reply
						.code(400)
						.send({
							success: false,
							message: `File terlalu besar. Maksimal ${process.env.MAX_FILE_SIZE_MB || 5}MB.`,
						});
				}
				chunks.push(chunk);
			}

			await fs.promises.writeFile(filePath, Buffer.concat(chunks));

			const url = `/uploads/${uniqueName}`;
			return reply.code(201).send({ success: true, url });
		},
	);
}
