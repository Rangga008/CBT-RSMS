import { prisma } from "../../lib/db.js";

export default async function dashboardRoutes(fastify) {
	const auth = { preHandler: fastify.verifyJWT };

	fastify.get("/bk/dashboard", auth, async () => {
		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const [
			totalSiswa,
			absensiHariIni,
			kasusStats,
			kunjunganStats,
			poinStats,
			siswaAlpaTerbanyak,
			kasusTerbaru,
		] = await Promise.all([
			prisma.siswa.count({ where: { isActive: true } }),
			prisma.absensi.groupBy({
				by: ["status"],
				where: { tanggal: today },
				_count: { status: true },
			}),
			prisma.kasusSiswa.groupBy({ by: ["status"], _count: { status: true } }),
			prisma.kunjunganRumah.groupBy({
				by: ["status"],
				_count: { status: true },
			}),
			Promise.all([
				prisma.poinSiswa.aggregate({
					where: { tipe: "PELANGGARAN" },
					_sum: { poin: true },
				}),
				prisma.poinSiswa.aggregate({
					where: { tipe: "PRESTASI" },
					_sum: { poin: true },
				}),
			]),
			// Top 5 siswa dengan total alpa terbanyak
			prisma.absensi.groupBy({
				by: ["siswaNisn", "namaSnapshot", "kelasSnapshot"],
				where: { status: "Alpa" },
				_count: { status: true },
				orderBy: { _count: { status: "desc" } },
				take: 5,
			}),
			prisma.kasusSiswa.findMany({
				take: 5,
				orderBy: { createdAt: "desc" },
				include: {
					siswa: { select: { nama: true, kelas: true } },
					jenisKasus: { select: { nama: true } },
				},
			}),
		]);

		const absensiMap = { Hadir: 0, Sakit: 0, Izin: 0, Alpa: 0 };
		absensiHariIni.forEach((a) => {
			absensiMap[a.status] = a._count.status;
		});

		const kasusMap = {};
		kasusStats.forEach((k) => {
			kasusMap[k.status] = k._count.status;
		});

		const kunjunganMap = {};
		kunjunganStats.forEach((k) => {
			kunjunganMap[k.status] = k._count.status;
		});

		return {
			success: true,
			data: {
				totalSiswa,
				absensiHariIni: absensiMap,
				kasus: kasusMap,
				kunjungan: kunjunganMap,
				poin: {
					totalPelanggaran: poinStats[0]._sum.poin || 0,
					totalPrestasi: poinStats[1]._sum.poin || 0,
				},
				siswaAlpaTerbanyak: siswaAlpaTerbanyak.map((s) => ({
					nisn: s.siswaNisn,
					nama: s.namaSnapshot,
					kelas: s.kelasSnapshot,
					totalAlpa: s._count.status,
				})),
				kasusTerbaru,
			},
		};
	});
}
