/**
 * Internal sync endpoint — digunakan oleh CBT backend untuk sinkronisasi data siswa dari BK
 * Dilindungi oleh x-sync-key header (shared secret)
 */
import { prisma } from "../lib/db.js";

export default async function internalRoutes(fastify) {
	fastify.get("/internal/sync-data", async (request, reply) => {
		const syncKey = process.env.SYNC_SECRET_KEY;
		if (!syncKey) {
			return reply.code(503).send({
				success: false,
				message: "SYNC_SECRET_KEY tidak dikonfigurasi di server BK.",
			});
		}
		if (request.headers["x-sync-key"] !== syncKey) {
			return reply
				.code(403)
				.send({ success: false, message: "Kunci sinkronisasi tidak valid." });
		}

		const siswaList = await prisma.siswa.findMany({
			where: { isActive: true },
			select: {
				nisn: true,
				nama: true,
				kelas: true,
				jenisKelamin: true,
			},
			orderBy: { nama: "asc" },
		});

		return {
			success: true,
			data: { siswa: siswaList },
			meta: {
				totalSiswa: siswaList.length,
				syncedAt: new Date().toISOString(),
			},
		};
	});
}
