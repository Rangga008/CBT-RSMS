import { prisma } from "../lib/db.js";

function isValidImageUrl(value) {
	if (!value || typeof value !== "string") return false;
	const trimmed = value.trim();
	if (trimmed.startsWith("/uploads/")) return true;
	try {
		new URL(trimmed);
		return true;
	} catch {
		return false;
	}
}

export default async function imagesRoutes(fastify) {
	// GET /images — list with pagination + search + category filter
	fastify.get(
		"/images",
		{ preHandler: [fastify.authenticate] },
		async (req, reply) => {
			const { page = 1, limit = 50, search = "", category = "" } = req.query;
			const skip = (Number(page) - 1) * Number(limit);
			const where = {};
			if (search) where.name = { contains: search, mode: "insensitive" };
			if (category)
				where.category = { contains: category, mode: "insensitive" };

			const [data, total] = await Promise.all([
				prisma.image.findMany({
					where,
					orderBy: { createdAt: "desc" },
					skip,
					take: Number(limit),
				}),
				prisma.image.count({ where }),
			]);
			return reply.send({
				success: true,
				data,
				total,
				page: Number(page),
				limit: Number(limit),
			});
		},
	);

	// POST /images — add image URL
	fastify.post(
		"/images",
		{
			preHandler: [fastify.requireRole("Admin", "Guru")],
		},
		async (req, reply) => {
			const { name, url, category = "" } = req.body;
			if (!name || !url)
				return reply
					.code(400)
					.send({ success: false, message: "name dan url wajib diisi." });

			if (!isValidImageUrl(url)) {
				return reply
					.code(400)
					.send({ success: false, message: "URL tidak valid." });
			}

			const existing = await prisma.image.findUnique({ where: { url } });
			if (existing)
				return reply.code(409).send({
					success: false,
					message: "URL gambar sudah ada di perpustakaan.",
				});

			const image = await prisma.image.create({
				data: {
					name: name.trim(),
					url: url.trim(),
					category: category.trim() || null,
				},
			});
			return reply.code(201).send({ success: true, data: image });
		},
	);

	// DELETE /images/:id
	fastify.delete(
		"/images/:id",
		{
			preHandler: [fastify.requireRole("Admin", "Guru")],
		},
		async (req, reply) => {
			const { id } = req.params;
			const img = await prisma.image.findUnique({ where: { id } });
			if (!img)
				return reply
					.code(404)
					.send({ success: false, message: "Gambar tidak ditemukan." });

			await prisma.image.delete({ where: { id } });
			return reply.send({ success: true, message: "Gambar dihapus." });
		},
	);
}
