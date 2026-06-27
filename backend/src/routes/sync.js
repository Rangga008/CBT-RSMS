/**
 * Sync route — sinkronisasi data siswa dari BK RSMS ke CBT RSMS
 * POST /api/v1/sync/from-bk  (Admin only)
 */
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

export default async function syncRoutes(fastify) {
	// GET /api/v1/sync/status — cek konfigurasi sync
	fastify.get(
		"/sync/status",
		{ preHandler: fastify.requireRole("Admin") },
		async () => {
			const bkUrl = process.env.BK_API_URL || "http://localhost:3001";
			const hasSyncKey = !!process.env.SYNC_SECRET_KEY;
			return { success: true, data: { bkUrl, configured: hasSyncKey } };
		},
	);

	// POST /api/v1/sync/from-bk — sinkronisasi siswa dari BK ke CBT
	fastify.post(
		"/sync/from-bk",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			const bkUrl = (process.env.BK_API_URL || "http://localhost:3001").replace(
				/\/$/,
				"",
			);
			const syncKey = process.env.SYNC_SECRET_KEY;

			if (!syncKey) {
				return reply.code(503).send({
					success: false,
					message: "SYNC_SECRET_KEY belum dikonfigurasi di .env CBT.",
				});
			}

			// Panggil endpoint internal BK
			let bkData;
			try {
				const res = await fetch(`${bkUrl}/api/v1/internal/sync-data`, {
					headers: { "x-sync-key": syncKey },
					signal: AbortSignal.timeout(10000),
				});
				if (!res.ok) {
					const err = await res.json().catch(() => ({}));
					return reply.code(502).send({
						success: false,
						message: err.message || `BK server merespons ${res.status}`,
					});
				}
				bkData = await res.json();
			} catch (e) {
				return reply.code(502).send({
					success: false,
					message: `Tidak dapat terhubung ke BK RSMS (${bkUrl}): ${e.message}`,
				});
			}

			const { siswa: bkSiswa = [] } = bkData.data;
			let ditambah = 0;
			let diperbarui = 0;

			for (const s of bkSiswa) {
				if (!s.nisn) continue;
				const existing = await prisma.user.findFirst({
					where: { userId: s.nisn, role: "Siswa" },
				});
				if (!existing) {
					const hashed = await bcrypt.hash(s.nisn, 10);
					await prisma.user.create({
						data: {
							userId: s.nisn,
							nama: s.nama,
							password: hashed,
							displayPassword: s.nisn,
							role: "Siswa",
							kelas: s.kelas || "",
						},
					});
					ditambah++;
				} else {
					await prisma.user.update({
						where: { id: existing.id },
						data: {
							nama: s.nama,
							kelas: s.kelas || existing.kelas,
						},
					});
					diperbarui++;
				}
			}

			return {
				success: true,
				message: "Sinkronisasi dari BK selesai!",
				data: {
					ditambah,
					diperbarui,
					total: bkSiswa.length,
					syncedAt: new Date().toISOString(),
				},
			};
		},
	);
}
