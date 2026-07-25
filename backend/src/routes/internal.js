/**
 * Internal sync endpoint — digunakan oleh BK backend untuk sinkronisasi data
 * Dilindungi oleh x-sync-key header (shared secret)
 */
import { prisma } from "../lib/db.js";

export default async function internalRoutes(fastify) {
	fastify.get("/internal/sync-data", async (request, reply) => {
		const syncKey = process.env.SYNC_SECRET_KEY;
		if (!syncKey) {
			return reply.code(503).send({
				success: false,
				message: "SYNC_SECRET_KEY tidak dikonfigurasi di server CBT.",
			});
		}
		if (request.headers["x-sync-key"] !== syncKey) {
			return reply
				.code(403)
				.send({ success: false, message: "Kunci sinkronisasi tidak valid." });
		}

		const [siswaList, guruList] = await Promise.all([
			// Ambil semua siswa dari CBT
			prisma.user.findMany({
				where: { role: "Siswa" },
				select: {
					userId: true,
					nama: true,
					kelas: true,
					displayPassword: true,
				},
				orderBy: { nama: "asc" },
			}),
			// Ambil semua guru & admin dari CBT
			prisma.user.findMany({
				where: { role: { in: ["Guru", "Admin"] } },
				select: { userId: true, nama: true, role: true, kelas: true },
				orderBy: { nama: "asc" },
			}),
		]);

		return {
			success: true,
			data: { siswa: siswaList, guru: guruList },
			meta: {
				totalSiswa: siswaList.length,
				totalGuru: guruList.length,
				syncedAt: new Date().toISOString(),
			},
		};
	});

	// GET /internal/sync-master-data — kelas & mapel untuk BK (protected by x-sync-key)
	fastify.get("/internal/sync-master-data", async (request, reply) => {
		const syncKey = process.env.SYNC_SECRET_KEY;
		if (!syncKey) {
			return reply.code(503).send({
				success: false,
				message: "SYNC_SECRET_KEY tidak dikonfigurasi di server CBT.",
			});
		}
		if (request.headers["x-sync-key"] !== syncKey) {
			return reply.code(403).send({
				success: false,
				message: "Kunci sinkronisasi tidak valid.",
			});
		}

		const [kelas, mapel] = await Promise.all([
			prisma.kelas.findMany({ orderBy: { nama: "asc" } }),
			prisma.mapel.findMany({ orderBy: { nama: "asc" } }),
		]);

		return {
			success: true,
			data: { kelas, mapel },
			meta: {
				totalKelas: kelas.length,
				totalMapel: mapel.length,
				syncedAt: new Date().toISOString(),
			},
		};
	});
}
