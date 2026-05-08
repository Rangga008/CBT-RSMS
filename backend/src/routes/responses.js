import { z } from "zod";
import { prisma } from "../lib/db.js";
import { calculateScore } from "../lib/scoring.js";

export default async function responsesRoutes(fastify) {
	// ─── POST /api/v1/responses/sync ─────────────────────────
	// Auto-save jawaban siswa (dipanggil berkala dari frontend)
	fastify.post(
		"/responses/sync",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const { examId, answers, violationCount } = z
				.object({
					examId: z.string(),
					answers: z.record(z.any()),
					violationCount: z.number().int().min(0).default(0),
				})
				.parse(request.body);

			const user = request.user;

			const existing = await prisma.response.findFirst({
				where: { userId: user.id, examId },
			});

			if (existing?.status === "Submitted" || existing?.status === "Graded") {
				return reply
					.code(400)
					.send({ success: false, message: "Ujian sudah dikumpulkan." });
			}

			if (existing) {
				await prisma.response.update({
					where: { id: existing.id },
					data: { answersJson: answers },
				});
			} else {
				await prisma.response.create({
					data: {
						userId: user.id,
						examId,
						answersJson: answers,
						startTime: new Date(),
						status: "InProgress",
					},
				});
			}

			// Update violation count di log
			if (violationCount > 0) {
				await prisma.examLog
					.upsert({
						where: { id: `${user.id}_${examId}` },
						update: { violationCount },
						create: {
							id: `${user.id}_${examId}`,
							userId: user.id,
							examId,
							violationCount,
						},
					})
					.catch(() => {
						// id conflict strategy — update only
						prisma.examLog
							.updateMany({
								where: { userId: user.id, examId },
								data: { violationCount },
							})
							.catch(() => {});
					});
			}

			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/responses/submit ───────────────────────
	// Kumpulkan ujian — hitung nilai otomatis
	fastify.post(
		"/responses/submit",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const { examId, answers } = z
				.object({
					examId: z.string(),
					answers: z.record(z.any()),
				})
				.parse(request.body);

			const user = request.user;

			const existing = await prisma.response.findFirst({
				where: { userId: user.id, examId },
			});

			if (existing?.status === "Submitted" || existing?.status === "Graded") {
				return reply
					.code(400)
					.send({ success: false, message: "Ujian sudah dikumpulkan." });
			}

			// Ambil soal dengan kunci untuk scoring
			const questions = await prisma.question.findMany({
				where: { examId },
				orderBy: { order: "asc" },
			});

			const { score, hasEssay, detail } = calculateScore(questions, answers);
			const finalStatus = hasEssay ? "Submitted" : "Graded";

			let response;
			if (existing) {
				response = await prisma.response.update({
					where: { id: existing.id },
					data: {
						answersJson: answers,
						score,
						submitTime: new Date(),
						status: finalStatus,
					},
				});
			} else {
				response = await prisma.response.create({
					data: {
						userId: user.id,
						examId,
						answersJson: answers,
						score,
						startTime: new Date(),
						submitTime: new Date(),
						status: finalStatus,
					},
				});
			}

			return reply.send({
				success: true,
				data: { responseId: response.id, score, hasEssay, detail },
			});
		},
	);

	// ─── GET /api/v1/responses ───────────────────────────────
	// Admin/Guru: semua respons
	fastify.get(
		"/responses",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const {
				examId,
				userId,
				status,
				search,
				page = 1,
				limit = 50,
			} = request.query;
			const skip = (Number(page) - 1) * Number(limit);

			// Guru hanya lihat respons dari kelas yang diajar
			let kelasFilter = undefined;
			if (request.user.role === "Guru") {
				const assignedKelas = (request.user.kelas || "")
					.split(",")
					.map((r) => r.split(":")[1]?.trim())
					.filter(Boolean);
				if (assignedKelas.length > 0) {
					kelasFilter = { in: assignedKelas };
				}
			}

			const userFilter = {};
			if (search) userFilter.nama = { contains: search, mode: "insensitive" };
			if (kelasFilter) userFilter.kelas = kelasFilter;

			const where = {
				...(examId && { examId }),
				...(userId && { userId }),
				...(status && { status }),
				...(Object.keys(userFilter).length > 0 && { user: userFilter }),
			};

			const [responses, total] = await Promise.all([
				prisma.response.findMany({
					where,
					skip,
					take: Number(limit),
					include: {
						user: { select: { userId: true, nama: true, kelas: true } },
						exam: { select: { examCode: true, subject: true, kelas: true } },
					},
					orderBy: { submitTime: "desc" },
				}),
				prisma.response.count({ where }),
			]);

			// Attach violation counts from ExamLog
			const userExamPairs = responses.map((r) => ({
				userId: r.userId,
				examId: r.examId,
			}));
			const logs =
				userExamPairs.length > 0
					? await prisma.examLog.findMany({
							where: { OR: userExamPairs },
							select: { userId: true, examId: true, violationCount: true },
						})
					: [];
			const logMap = {};
			for (const l of logs)
				logMap[`${l.userId}__${l.examId}`] = l.violationCount;
			const data = responses.map((r) => ({
				...r,
				violations: logMap[`${r.userId}__${r.examId}`] ?? 0,
			}));

			return reply.send({ success: true, data, total });
		},
	);

	// ─── GET /api/v1/responses/:id ───────────────────────────
	fastify.get(
		"/responses/:id",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const response = await prisma.response.findUnique({
				where: { id: request.params.id },
				include: {
					user: { select: { userId: true, nama: true, kelas: true } },
					exam: { select: { examCode: true, subject: true, duration: true } },
				},
			});

			if (!response)
				return reply
					.code(404)
					.send({ success: false, message: "Hasil tidak ditemukan." });

			// Siswa hanya bisa lihat milik sendiri
			if (
				request.user.role === "Siswa" &&
				response.userId !== request.user.id
			) {
				return reply
					.code(403)
					.send({ success: false, message: "Akses ditolak." });
			}

			// Sertakan soal untuk detail jawaban
			const questions = await prisma.question.findMany({
				where: { examId: response.examId },
				orderBy: { order: "asc" },
			});

			// Cek konfigurasi show_exam_result
			const configRow = await prisma.config.findUnique({
				where: { key: "show_exam_result" },
			});
			const showResult = configRow?.value !== "false";

			const isAdminOrGuru = ["Admin", "Guru"].includes(request.user.role);
			const data = {
				...response,
				questions: isAdminOrGuru || showResult ? questions : [],
				showResult,
			};
			return reply.send({ success: true, data });
		},
	);

	// ─── PATCH /api/v1/responses/:id/grade-essay ─────────────
	// Manual grading esai oleh Admin/Guru (per-question scoring)
	fastify.patch(
		"/responses/:id/grade-essay",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			// essayScores: { [questionId]: points (number >= 0) }
			const { essayScores } = z
				.object({ essayScores: z.record(z.string(), z.number().min(0)) })
				.parse(request.body);

			const response = await prisma.response.findUnique({
				where: { id: request.params.id },
			});
			if (!response)
				return reply
					.code(404)
					.send({ success: false, message: "Response tidak ditemukan." });

			const questions = await prisma.question.findMany({
				where: { examId: response.examId },
				orderBy: { order: "asc" },
			});

			// Non-essay auto-score earned weight
			const nonEssayQs = questions.filter((q) => q.type !== "Esai");
			const { earnedWeight } = calculateScore(nonEssayQs, response.answersJson);

			// Essay earned: sum per-question, capped at bobot
			const essayQs = questions.filter((q) => q.type === "Esai");
			const essayEarned = essayQs.reduce((sum, q) => {
				const max = typeof q.bobot === "number" ? q.bobot : 1;
				const pts =
					typeof essayScores[q.id] === "number" ? essayScores[q.id] : 0;
				return sum + Math.min(pts, max);
			}, 0);

			// Final score = (non-essay earned + essay earned) / total weight * 100
			const totalWeight = questions.reduce(
				(s, q) => s + (typeof q.bobot === "number" ? q.bobot : 1),
				0,
			);
			const finalScore =
				totalWeight > 0
					? Math.min(
							100,
							Math.round(((earnedWeight + essayEarned) / totalWeight) * 100),
						)
					: 0;

			const updatedAnswers = {
				...(response.answersJson || {}),
				_essayScores: essayScores,
			};

			const updated = await prisma.response.update({
				where: { id: request.params.id },
				data: {
					score: finalScore,
					status: "Graded",
					answersJson: updatedAnswers,
				},
			});

			return reply.send({ success: true, data: updated });
		},
	);

	// ─── POST /api/v1/responses/log-violation ─────────────────
	// Anti-cheat: catat pelanggaran siswa
	fastify.post(
		"/responses/log-violation",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const { examId, count, reason } = z
				.object({
					examId: z.string(),
					count: z.number().int().min(1),
					reason: z.string().max(200),
				})
				.parse(request.body);

			const userId = request.user.id;
			const existing = await prisma.examLog.findFirst({
				where: { userId, examId },
			});
			if (existing) {
				const prevDetails = Array.isArray(existing.details)
					? existing.details
					: [];
				await prisma.examLog.update({
					where: { id: existing.id },
					data: {
						violationCount: count,
						details: [
							...prevDetails,
							{ reason, time: new Date().toISOString() },
						],
						timestamp: new Date(),
					},
				});
			} else {
				await prisma.examLog.create({
					data: {
						userId,
						examId,
						violationCount: count,
						details: [{ reason, time: new Date().toISOString() }],
					},
				});
			}

			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/responses/:id/reset ────────────────────
	// Admin/Guru: reset percobaan siswa (hapus response + exam log)
	fastify.post(
		"/responses/:id/reset",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const response = await prisma.response.findUnique({
				where: { id: request.params.id },
			});
			if (!response)
				return reply
					.code(404)
					.send({ success: false, message: "Response tidak ditemukan." });

			// Hapus ExamLog terkait
			await prisma.examLog.deleteMany({
				where: { userId: response.userId, examId: response.examId },
			});
			// Hapus response (siswa bisa ujian ulang)
			await prisma.response.delete({ where: { id: request.params.id } });

			return reply.send({
				success: true,
				message: "Akses ujian siswa telah direset.",
			});
		},
	);

	// ─── POST /api/v1/responses/:id/unlock ───────────────────
	// Admin/Guru: buka akses siswa yang terblokir (reset violationCount tanpa hapus jawaban)
	fastify.post(
		"/responses/:id/unlock",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const response = await prisma.response.findUnique({
				where: { id: request.params.id },
			});
			if (!response)
				return reply
					.code(404)
					.send({ success: false, message: "Response tidak ditemukan." });

			// Reset violation count supaya siswa bisa lanjut
			await prisma.examLog.updateMany({
				where: { userId: response.userId, examId: response.examId },
				data: { violationCount: 0 },
			});

			// Jika status sudah bukan InProgress, kembalikan ke InProgress
			if (response.status === "InProgress") {
				// already in progress, just violations cleared
			}

			return reply.send({
				success: true,
				message: "Akses siswa telah dibuka. Siswa dapat melanjutkan ujian.",
			});
		},
	);

	// ─── POST /api/v1/responses/bulk-reset ───────────────────
	// Admin/Guru: reset ujian beberapa siswa sekaligus
	fastify.post(
		"/responses/bulk-reset",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { ids } = z
				.object({ ids: z.array(z.string()).min(1) })
				.parse(request.body);

			const responses = await prisma.response.findMany({
				where: { id: { in: ids } },
				select: { id: true, userId: true, examId: true },
			});

			if (responses.length === 0)
				return reply.code(404).send({
					success: false,
					message: "Tidak ada response yang ditemukan.",
				});

			for (const r of responses) {
				await prisma.examLog.deleteMany({
					where: { userId: r.userId, examId: r.examId },
				});
			}
			await prisma.response.deleteMany({ where: { id: { in: ids } } });

			return reply.send({
				success: true,
				message: `${responses.length} data ujian siswa berhasil direset.`,
			});
		},
	);

	// ─── POST /api/v1/responses/:id/recalculate ─────────────
	// Admin/Guru: hitung ulang nilai berdasarkan jawaban tersimpan
	fastify.post(
		"/responses/:id/recalculate",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const response = await prisma.response.findUnique({
				where: { id: request.params.id },
			});
			if (!response)
				return reply
					.code(404)
					.send({ success: false, message: "Response tidak ditemukan." });

			const questions = await prisma.question.findMany({
				where: { examId: response.examId },
				orderBy: { order: "asc" },
			});

			const savedAnswers = response.answersJson || {};
			const savedEssayScores = savedAnswers._essayScores || {};

			// Non-essay auto score
			const nonEssayQs = questions.filter((q) => q.type !== "Esai");
			const { earnedWeight } = calculateScore(nonEssayQs, savedAnswers);

			// Essay earned from saved per-question scores
			const essayQs = questions.filter((q) => q.type === "Esai");
			const essayEarned = essayQs.reduce((sum, q) => {
				const max = typeof q.bobot === "number" ? q.bobot : 1;
				const pts =
					typeof savedEssayScores[q.id] === "number"
						? savedEssayScores[q.id]
						: 0;
				return sum + Math.min(pts, max);
			}, 0);

			const totalWeight = questions.reduce(
				(s, q) => s + (typeof q.bobot === "number" ? q.bobot : 1),
				0,
			);
			const finalScore =
				totalWeight > 0
					? Math.min(
							100,
							Math.round(((earnedWeight + essayEarned) / totalWeight) * 100),
						)
					: 0;

			const hasEssay = essayQs.length > 0;
			const allEssayGraded =
				essayQs.length === 0 ||
				essayQs.every((q) => typeof savedEssayScores[q.id] === "number");
			const newStatus =
				response.status === "Graded" || allEssayGraded ? "Graded" : "Submitted";

			const updated = await prisma.response.update({
				where: { id: request.params.id },
				data: { score: finalScore, status: newStatus },
			});

			return reply.send({ success: true, data: updated, newScore: finalScore });
		},
	);

	// ─── POST /api/v1/responses/bulk-unlock ──────────────────
	// Admin/Guru: buka blokir beberapa siswa curang sekaligus
	fastify.post(
		"/responses/bulk-unlock",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { ids } = z
				.object({ ids: z.array(z.string()).min(1) })
				.parse(request.body);

			const responses = await prisma.response.findMany({
				where: { id: { in: ids } },
				select: { id: true, userId: true, examId: true },
			});

			if (responses.length === 0)
				return reply.code(404).send({
					success: false,
					message: "Tidak ada response yang ditemukan.",
				});

			for (const r of responses) {
				await prisma.examLog.updateMany({
					where: { userId: r.userId, examId: r.examId },
					data: { violationCount: 0 },
				});
			}

			return reply.send({
				success: true,
				message: `${responses.length} siswa berhasil dibuka blokirnya.`,
			});
		},
	);

	// ─── GET /api/v1/responses/my ─────────────────────────────
	// Siswa: riwayat ujian milik sendiri
	fastify.get(
		"/responses/my",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const userId = request.user.id;

			const responses = await prisma.response.findMany({
				where: { userId },
				include: {
					exam: {
						select: {
							examCode: true,
							subject: true,
							kelas: true,
							duration: true,
						},
					},
				},
				orderBy: { submitTime: "desc" },
			});

			// Cek konfigurasi show_exam_result
			const configRow = await prisma.config.findUnique({
				where: { key: "show_exam_result" },
			});
			const showResult = configRow?.value !== "false";

			const data = responses.map((r) => ({
				id: r.id,
				examId: r.examId,
				status: r.status,
				score: showResult ? r.score : null,
				startTime: r.startTime,
				submitTime: r.submitTime,
				exam: r.exam,
			}));

			return reply.send({ success: true, data, showResult });
		},
	);
}
