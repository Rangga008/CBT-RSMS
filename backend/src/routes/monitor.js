import { prisma } from "../lib/db.js";

export default async function monitorRoutes(fastify) {
	// ─── GET /api/v1/monitor ──────────────────────────────────────────
	// Mengembalikan data monitor ujian: kategori siswa berdasarkan status
	// Query params: examId (wajib)
	fastify.get(
		"/monitor",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { examId } = request.query;

			// Tanpa examId → kembalikan daftar ujian yang bisa dimonitor
			if (!examId) {
				const user = request.user;
				let where = { status: { in: ["Aktif", "Selesai"] } };

				if (user.role === "Guru") {
					const assignedKelas = (user.kelas || "")
						.split(",")
						.map((r) => r.split(":")[1])
						.filter(Boolean);
					if (assignedKelas.length > 0) where.kelas = { in: assignedKelas };
				}

				const exams = await prisma.exam.findMany({
					where,
					select: {
						id: true,
						subject: true,
						kelas: true,
						status: true,
						date: true,
					},
					orderBy: { date: "desc" },
					take: 50,
				});
				return reply.send({ success: true, exams });
			}

			// Ambil info ujian
			const exam = await prisma.exam.findUnique({ where: { id: examId } });
			if (!exam)
				return reply
					.code(404)
					.send({ success: false, message: "Ujian tidak ditemukan." });

			// Ambil semua siswa yang kelas-nya sesuai ujian
			const kelasList = (exam.kelas || "")
				.split(",")
				.map((k) => k.trim())
				.filter(Boolean);
			const studentWhere = {
				role: "Siswa",
				isActive: true,
				...(kelasList.length > 0 && { kelas: { in: kelasList } }),
			};
			const students = await prisma.user.findMany({
				where: studentWhere,
				select: { id: true, nama: true, kelas: true },
			});

			// Ambil semua response untuk ujian ini
			const responses = await prisma.response.findMany({
				where: { examId },
				select: {
					id: true,
					userId: true,
					status: true,
					score: true,
					startTime: true,
					submitTime: true,
				},
			});

			// Ambil exam logs (violations)
			const examLogs = await prisma.examLog.findMany({
				where: { examId },
				select: { userId: true, violationCount: true, details: true },
			});

			// Ambil config max_violations
			const configs = await prisma.config.findMany({
				where: { key: "max_violations" },
			});
			const maxViol = parseInt(configs[0]?.value) || 2;

			// Buat map cepat
			const responseByUser = {};
			responses.forEach((r) => {
				responseByUser[r.userId] = r;
			});

			const logByUser = {};
			examLogs.forEach((l) => {
				logByUser[l.userId] = l;
			});

			const belumLogin = [];
			const mengerjakan = [];
			const selesai = [];
			const curang = [];

			const fmt = (d) =>
				d
					? new Date(d).toLocaleTimeString("id-ID", {
							hour: "2-digit",
							minute: "2-digit",
						})
					: null;

			for (const s of students) {
				const resp = responseByUser[s.id];
				const log = logByUser[s.id];
				const violations = log?.violationCount || 0;
				const violDetails = Array.isArray(log?.details)
					? log.details.map((d) => d.reason || d).join("; ")
					: log?.details
						? String(log.details)
						: "";

				const base = {
					userID: s.id,
					nama: s.nama,
					kelas: s.kelas,
					mapel: exam.subject,
					responseId: resp?.id || null,
					score: resp?.score != null ? resp.score : "-",
					startTime: fmt(resp?.startTime),
					submitTime: fmt(resp?.submitTime),
					violations,
					violDetail: violDetails,
				};

				if (!resp) {
					belumLogin.push(base);
				} else if (violations >= maxViol) {
					curang.push(base);
				} else if (resp.status === "InProgress") {
					mengerjakan.push(base);
				} else {
					selesai.push(base);
				}
			}

			const allKelas = [...new Set(students.map((s) => s.kelas))]
				.filter(Boolean)
				.sort();

			return reply.send({
				success: true,
				exam: {
					id: exam.id,
					subject: exam.subject,
					kelas: exam.kelas,
					status: exam.status,
				},
				data: { belumLogin, sudahLogin: [], mengerjakan, selesai, curang },
				meta: {
					dropdownKelas: allKelas,
					dropdownMapel: [exam.subject].filter(Boolean),
					maxViolations: maxViol,
				},
			});
		},
	);
}
