/**
 * Sync route — sinkronisasi data siswa & guru dari CBT RSMS ke BK RSMS
 * POST /api/v1/sync/from-cbt  (admin only)
 */
import { prisma } from "../lib/db.js";
import bcrypt from "bcrypt";

export default async function syncRoutes(fastify) {
	// GET /api/v1/sync/status — cek konfigurasi sync
	fastify.get(
		"/sync/status",
		{ preHandler: fastify.requireRole(["admin"]) },
		async () => {
			const cbtUrl = process.env.CBT_API_URL || "http://localhost:3000";
			const hasSyncKey = !!process.env.SYNC_SECRET_KEY;
			return { success: true, data: { cbtUrl, configured: hasSyncKey } };
		},
	);

	// POST /api/v1/sync/from-cbt — lakukan sinkronisasi
	fastify.post(
		"/sync/from-cbt",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			const cbtUrl = (
				process.env.CBT_API_URL || "http://localhost:3000"
			).replace(/\/$/, "");
			const syncKey = process.env.SYNC_SECRET_KEY;

			if (!syncKey) {
				return reply.code(503).send({
					success: false,
					message: "SYNC_SECRET_KEY belum dikonfigurasi di .env BK.",
				});
			}

			// Panggil endpoint internal CBT
			let cbtData;
			try {
				const res = await fetch(`${cbtUrl}/api/v1/internal/sync-data`, {
					headers: { "x-sync-key": syncKey },
					signal: AbortSignal.timeout(10000),
				});
				if (!res.ok) {
					const err = await res.json().catch(() => ({}));
					return reply.code(502).send({
						success: false,
						message: err.message || `CBT server merespons ${res.status}`,
					});
				}
				cbtData = await res.json();
			} catch (e) {
				return reply.code(502).send({
					success: false,
					message: `Tidak dapat terhubung ke CBT RSMS (${cbtUrl}): ${e.message}`,
				});
			}

			const { siswa: cbtSiswa = [], guru: cbtGuru = [] } = cbtData.data;
			let siswaAdded = 0,
				siswaUpdated = 0,
				guruAdded = 0,
				guruUpdated = 0;

			// ── Sinkronisasi Siswa ─────────────────────────────────────────────────
			for (const s of cbtSiswa) {
				if (!s.userId) continue;

				// Upsert ke tabel Siswa (berdasarkan NISN = userId)
				const existing = await prisma.siswa.findUnique({
					where: { nisn: s.userId },
				});
				if (!existing) {
					await prisma.siswa.create({
						data: {
							nisn: s.userId,
							nama: s.nama,
							kelas: s.kelas || "",
							jenisKelamin: "L", // default, bisa diubah manual
						},
					});
					siswaAdded++;
				} else {
					await prisma.siswa.update({
						where: { nisn: s.userId },
						data: { nama: s.nama, kelas: s.kelas || existing.kelas },
					});
					siswaUpdated++;
				}
			}

			// ── Sinkronisasi Guru/Admin → User BK ────────────────────────────────
			for (const g of cbtGuru) {
				if (!g.userId) continue;
				const roleBk = g.role === "Admin" ? "admin" : "guru";
				const existing = await prisma.user.findFirst({
					where: { userId: g.userId },
				});
				if (!existing) {
					const hashed = await bcrypt.hash(g.userId + "_sync", 10);
					await prisma.user.create({
						data: {
							userId: g.userId,
							nama: g.nama,
							password: hashed,
							role: roleBk,
							kelas: g.kelas || null,
						},
					});
					guruAdded++;
				} else {
					await prisma.user.update({
						where: { id: existing.id },
						data: { nama: g.nama, kelas: g.kelas || existing.kelas },
					});
					guruUpdated++;
				}
			}

			return {
				success: true,
				message: `Sinkronisasi selesai!`,
				data: {
					siswa: {
						ditambah: siswaAdded,
						diperbarui: siswaUpdated,
						total: cbtSiswa.length,
					},
					guru: {
						ditambah: guruAdded,
						diperbarui: guruUpdated,
						total: cbtGuru.length,
					},
					syncedAt: new Date().toISOString(),
				},
			};
		},
	);

	// POST /api/v1/sync/from-cbt/master-data — sync master data (kelas & mapel)
	fastify.post(
		"/sync/from-cbt/master-data",
		{ preHandler: fastify.requireRole(["admin"]) },
		async (request, reply) => {
			const cbtUrl = (
				process.env.CBT_API_URL || "http://localhost:3000"
			).replace(/\/$/, "");
			const syncKey = process.env.SYNC_SECRET_KEY;

			if (!syncKey) {
				return reply.code(503).send({
					success: false,
					message: "SYNC_SECRET_KEY belum dikonfigurasi di .env BK.",
				});
			}

			try {
				// Fetch master data from CBT via internal endpoint (protected by sync key)
				const res = await fetch(`${cbtUrl}/api/v1/internal/sync-master-data`, {
					headers: { "x-sync-key": syncKey },
					signal: AbortSignal.timeout(10000),
				});
				if (!res.ok) {
					const err = await res
						.json()
						.catch(() => ({ message: "Unknown error" }));
					return reply.code(502).send({
						success: false,
						message: `CBT API error: ${err.message}`,
					});
				}

				const { data } = await res.json();
				if (!data || !data.kelas || !data.mapel) {
					return reply.code(400).send({
						success: false,
						message: "CBT API returned invalid format for master data.",
					});
				}

				// Sync Kelas
				let kelasAdded = 0,
					kelasUpdated = 0;
				for (const kelas of data.kelas) {
					const existing = await prisma.kelas.findUnique({
						where: { nama: kelas.nama },
					});
					if (existing) {
						kelasUpdated++;
					} else {
						await prisma.kelas.create({
							data: { nama: kelas.nama },
						});
						kelasAdded++;
					}
				}

				// Sync Mapel
				let mapelAdded = 0,
					mapelUpdated = 0;
				for (const mapel of data.mapel) {
					const existing = await prisma.mapel.findUnique({
						where: { nama: mapel.nama },
					});
					if (existing) {
						mapelUpdated++;
					} else {
						await prisma.mapel.create({
							data: { nama: mapel.nama },
						});
						mapelAdded++;
					}
				}

				return {
					success: true,
					data: {
						kelas: {
							ditambah: kelasAdded,
							diperbarui: kelasUpdated,
							total: data.kelas.length,
						},
						mapel: {
							ditambah: mapelAdded,
							diperbarui: mapelUpdated,
							total: data.mapel.length,
						},
						syncedAt: new Date().toISOString(),
					},
				};
			} catch (error) {
				return reply.code(502).send({
					success: false,
					message: `Sync error: ${error.message}`,
				});
			}
		},
	);
}
