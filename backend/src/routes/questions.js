import { z } from "zod";
import { prisma } from "../lib/db.js";

function isValidImageUrl(value) {
	if (!value || typeof value !== "string") return false;
	const trimmed = value.trim();
	if (
		trimmed.startsWith("/uploads/") ||
		trimmed.startsWith("uploads/") ||
		/^https?:\/\//i.test(trimmed)
	)
		return true;

	// Support common relative image paths/extensions
	if (/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i.test(trimmed)) return true;

	try {
		new URL(trimmed);
		return true;
	} catch {
		return false;
	}
}

function buildQuestionCode(examId, index) {
	const examKey = String(examId || "EXAM")
		.replace(/[^a-zA-Z0-9]/g, "")
		.slice(-8)
		.toUpperCase();
	const seq = String(index).padStart(3, "0");
	const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
	return `Q-${examKey}-${seq}-${rand}`;
}

const questionSchema = z.object({
	type: z.enum(["PG", "PG_KOMPLEKS", "BS", "JODOH", "Esai"]),
	content: z.string().min(1),
	imageUrl: z
		.preprocess((v) => {
			if (v === "" || v === null || v === undefined) return null;
			if (typeof v === "string") return v.trim();
			return null;
		}, z.any())
		.pipe(z.string().optional().nullable())
		.transform((v) => {
			if (!v) return null;
			return isValidImageUrl(v) ? v : null;
		}),
	options: z.array(z.any()).default([]),
	correctAnswer: z.any().optional().nullable(),
	isRequired: z.boolean().default(true),
	bobot: z.coerce.number().positive().catch(1).default(1),
	order: z.coerce.number().int().catch(0).default(0),
});

// Fisher-Yates shuffle helper
function shuffleArray(arr) {
	const a = [...arr];
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

export default async function questionsRoutes(fastify) {
	// ─── GET /api/v1/exams/:examId/questions ─────────────────
	// Admin/Guru: soal lengkap dengan kunci
	fastify.get(
		"/exams/:examId/questions",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const questions = await prisma.question.findMany({
				where: { examId: request.params.examId },
				orderBy: { order: "asc" },
			});
			return reply.send({ success: true, data: questions });
		},
	);

	// ─── GET /api/v1/exams/:examId/questions/exam-session ────
	// Siswa: tanpa kunci jawaban, dengan shuffle jika dikonfigurasi
	fastify.get(
		"/exams/:examId/questions/exam-session",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const user = request.user;
			const now = new Date();
			if (user.role === "Admin" || user.role === "Guru") {
				return reply
					.code(403)
					.send({ success: false, message: "Endpoint ini hanya untuk siswa." });
			}

			const exam = await prisma.exam.findUnique({
				where: { id: request.params.examId },
				select: {
					id: true,
					kelas: true,
					status: true,
					date: true,
					endDate: true,
					shuffleConfig: true,
				},
			});

			if (!exam) {
				return reply
					.code(404)
					.send({ success: false, message: "Ujian tidak ditemukan." });
			}

			if (!(exam.kelas || "").includes(user.kelas || "")) {
				return reply.code(403).send({
					success: false,
					message: "Ujian ini bukan untuk kelas Anda.",
				});
			}

			if (exam.status !== "Aktif") {
				return reply.code(400).send({
					success: false,
					message: "Ujian belum aktif atau sudah ditutup.",
				});
			}

			if (now < new Date(exam.date)) {
				return reply.code(400).send({
					success: false,
					message: "Ujian belum dimulai.",
				});
			}

			if (exam.endDate && now > new Date(exam.endDate)) {
				return reply.code(400).send({
					success: false,
					message: "Waktu ujian telah berakhir.",
				});
			}

			// Cek apakah siswa sudah selesai ujian ini
			let existing = await prisma.response.findFirst({
				where: { userId: user.id, examId: request.params.examId },
			});

			if (existing?.status === "Submitted" || existing?.status === "Graded") {
				return reply.code(400).send({
					success: false,
					message: "Anda sudah menyelesaikan ujian ini.",
				});
			}

			// Jika belum ada Response, buat sekarang dengan startTime
			if (!existing) {
				existing = await prisma.response.create({
					data: {
						userId: user.id,
						examId: request.params.examId,
						answersJson: {},
						startTime: new Date(),
						status: "InProgress",
					},
				});
			}

			const shuffleCfg = exam?.shuffleConfig || {};

			const rawQuestions = await prisma.question.findMany({
				where: { examId: request.params.examId },
				orderBy: { order: "asc" },
			});

			// Pisahkan per tipe → shuffle per kelompok jika dikonfigurasi
			const groups = { PG: [], PG_KOMPLEKS: [], BS: [], JODOH: [], Esai: [] };
			for (const q of rawQuestions) {
				if (groups[q.type]) groups[q.type].push(q);
				else groups.Esai.push(q);
			}

			// Shuffle per-type berdasarkan shuffleConfig[type]
			for (const type of Object.keys(groups)) {
				if (shuffleCfg[type]) {
					groups[type] = shuffleArray(groups[type]);
				}
			}

			// Gabungkan dan strip kunci jawaban
			const questions = [
				...groups.PG,
				...groups.PG_KOMPLEKS,
				...groups.BS,
				...groups.JODOH,
				...groups.Esai,
			].map((q) => {
				const { correctAnswer, ...safe } = q;
				// Shuffle opsi PG / PG_KOMPLEKS jika tipe tersebut dikonfigurasi
				if (
					shuffleCfg[q.type] &&
					(q.type === "PG" || q.type === "PG_KOMPLEKS") &&
					Array.isArray(q.options)
				) {
					safe.options = shuffleArray(q.options);
				}
				return safe;
			});

			// Kirim juga savedAnswers + timing info untuk resume
			const savedAnswers = existing?.answersJson || {};
			const serverNow = new Date();

			// Jika ada existing response, kirim startTime untuk recalculate timer
			const timing = {
				serverTimestamp: serverNow.getTime(),
				examStartTime: existing?.startTime?.getTime() || null,
			};

			return reply.send({
				success: true,
				data: { questions, savedAnswers, timing },
			});
		},
	);

	// ─── POST /api/v1/exams/:examId/questions ─────────────────
	fastify.post(
		"/exams/:examId/questions",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const parsed = questionSchema.safeParse(request.body);
			if (!parsed.success) {
				return reply.code(400).send({
					success: false,
					message: "Data tidak valid.",
					errors: parsed.error.flatten(),
				});
			}

			const count = await prisma.question.count({
				where: { examId: request.params.examId },
			});

			let question = null;
			for (let attempt = 0; attempt < 5; attempt++) {
				const questionCode = buildQuestionCode(
					request.params.examId,
					count + 1 + attempt,
				);
				try {
					question = await prisma.question.create({
						data: {
							...parsed.data,
							examId: request.params.examId,
							questionCode,
						},
					});
					break;
				} catch (err) {
					if (!(err?.code === "P2002")) throw err;
				}
			}

			if (!question) {
				return reply.code(409).send({
					success: false,
					message: "Gagal membuat kode soal unik. Silakan coba lagi.",
				});
			}
			return reply.code(201).send({ success: true, data: question });
		},
	);

	// ─── PATCH /api/v1/questions/:id ─────────────────────────
	fastify.get(
		"/questions/:id",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const question = await prisma.question.findUnique({
				where: { id: request.params.id },
			});
			if (!question) {
				return reply
					.code(404)
					.send({ success: false, message: "Soal tidak ditemukan." });
			}
			return reply.send({ success: true, data: question });
		},
	);

	// ─── PATCH /api/v1/questions/:id ─────────────────────────
	fastify.patch(
		"/questions/:id",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const parsed = questionSchema.partial().safeParse(request.body);
			if (!parsed.success) {
				return reply.code(400).send({
					success: false,
					message: "Data tidak valid.",
					errors: parsed.error.flatten(),
				});
			}
			const question = await prisma.question.update({
				where: { id: request.params.id },
				data: parsed.data,
			});
			return reply.send({ success: true, data: question });
		},
	);

	// ─── DELETE /api/v1/questions/bulk ───────────────────────
	fastify.delete(
		"/questions/bulk",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { ids } = z
				.object({ ids: z.array(z.string().min(1)).min(1) })
				.parse(request.body);
			const { count } = await prisma.question.deleteMany({
				where: { id: { in: ids } },
			});
			return reply.send({ success: true, deleted: count });
		},
	);

	// ─── DELETE /api/v1/questions/:id ────────────────────────
	fastify.delete(
		"/questions/:id",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			await prisma.question.delete({ where: { id: request.params.id } });
			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/exams/:examId/questions/bulk ───────────
	fastify.post(
		"/exams/:examId/questions/bulk",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const questions = z.array(questionSchema).safeParse(request.body);
			if (!questions.success) {
				return reply
					.code(400)
					.send({ success: false, message: "Format data tidak valid." });
			}
			let count = await prisma.question.count({
				where: { examId: request.params.examId },
			});
			const data = questions.data.map((q, i) => ({
				...q,
				examId: request.params.examId,
				questionCode: buildQuestionCode(request.params.examId, count + i + 1),
				order: q.order || count + i + 1,
			}));
			await prisma.question.createMany({ data });
			return reply.send({
				success: true,
				count: data.length,
				message: `${data.length} soal berhasil ditambahkan.`,
			});
		},
	);

	// ─── PATCH /api/v1/exams/:examId/questions/reorder ───────
	fastify.patch(
		"/exams/:examId/questions/reorder",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { order } = z
				.object({ order: z.array(z.string()) })
				.parse(request.body);
			await Promise.all(
				order.map((id, idx) =>
					prisma.question.update({ where: { id }, data: { order: idx } }),
				),
			);
			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/questions/copy ─────────────────────────
	// Salin semua soal dari satu ujian ke ujian lain
	fastify.post(
		"/questions/copy",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const { sourceExamId, destinationExamId } = z
				.object({
					sourceExamId: z.string().min(1),
					destinationExamId: z.string().min(1),
				})
				.parse(request.body);

			if (sourceExamId === destinationExamId) {
				return reply.code(400).send({
					success: false,
					message: "Sumber dan tujuan tidak boleh sama.",
				});
			}

			// Validasi exam tujuan ada
			const destExam = await prisma.exam.findUnique({
				where: { id: destinationExamId },
				select: { id: true },
			});
			if (!destExam)
				return reply
					.code(404)
					.send({ success: false, message: "Ujian tujuan tidak ditemukan." });

			const sourceQuestions = await prisma.question.findMany({
				where: { examId: sourceExamId },
				orderBy: { order: "asc" },
			});

			if (!sourceQuestions.length) {
				return reply
					.code(404)
					.send({ success: false, message: "Tidak ada soal di ujian sumber." });
			}

			let destCount = await prisma.question.count({
				where: { examId: destinationExamId },
			});

			const newQuestions = sourceQuestions.map((q, i) => ({
				examId: destinationExamId,
				questionCode: `Q-${String(destCount + i + 1).padStart(3, "0")}`,
				type: q.type,
				content: q.content,
				imageUrl: q.imageUrl,
				options: q.options,
				correctAnswer: q.correctAnswer,
				isRequired: q.isRequired,
				bobot: q.bobot ?? 1,
				order: destCount + i + 1,
			}));

			await prisma.question.createMany({ data: newQuestions });
			return reply.send({
				success: true,
				count: newQuestions.length,
				message: `${newQuestions.length} soal berhasil disalin.`,
			});
		},
	);
}
