import { z } from "zod";
import { prisma } from "../lib/db.js";
import { calculateScore } from "../lib/scoring.js";

const examSchema = z.object({
	subject: z.string().min(1).max(100),
	kelas: z.string().min(1).max(200),
	date: z.string().datetime({ offset: true }),
	endDate: z.string().datetime({ offset: true }).optional().nullable(),
	duration: z.number().int().min(1).max(600),
	pin: z.string().max(20).optional().nullable(),
	status: z.enum(["Draft", "Aktif", "Selesai", "Diarsipkan"]).default("Draft"),
	shuffleConfig: z
		.object({
			PG: z.boolean().default(false),
			PG_KOMPLEKS: z.boolean().default(false),
			BS: z.boolean().default(false),
			JODOH: z.boolean().default(false),
			Esai: z.boolean().default(false),
		})
		.optional(),
});

export default async function examsRoutes(fastify) {
	// ─── GET /api/v1/exams ───────────────────────────────────
	fastify.get(
		"/exams",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const { status, kelas, search, page = 1, limit = 20 } = request.query;
			const user = request.user;
			const skip = (Number(page) - 1) * Number(limit);
			const now = new Date();

			// Guru hanya lihat ujian milik kelas yg diajar
			let kelasFilter = kelas ? { contains: kelas } : undefined;
			if (user.role === "Guru" && !kelas) {
				const assignedKelas =
					user.kelas
						?.split(",")
						.map((r) => r.split(":")[1])
						.filter(Boolean) || [];
				kelasFilter = assignedKelas.length ? { in: assignedKelas } : undefined;
			}

			const where = {
				...(status && { status }),
				...(kelasFilter && { kelas: kelasFilter }),
				...(search && { subject: { contains: search, mode: "insensitive" } }),
			};

			// Siswa hanya boleh melihat ujian yang sedang aktif pada rentang waktunya.
			if (user.role === "Siswa") {
				where.status = "Aktif";
				where.date = { lte: now };
				where.OR = [{ endDate: null }, { endDate: { gte: now } }];
			}

			const [exams, total] = await Promise.all([
				prisma.exam.findMany({
					where,
					skip,
					take: Number(limit),
					include: { _count: { select: { questions: true, responses: true } } },
					orderBy: { date: "desc" },
				}),
				prisma.exam.count({ where }),
			]);

			return reply.send({
				success: true,
				data: exams,
				total,
				page: Number(page),
				limit: Number(limit),
			});
		},
	);

	// ─── POST /api/v1/exams ──────────────────────────────────
	fastify.post(
		"/exams",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const parsed = examSchema.safeParse(request.body);
			if (!parsed.success) {
				return reply.code(400).send({
					success: false,
					message: "Data tidak valid.",
					errors: parsed.error.flatten(),
				});
			}

			// Generate exam code
			const count = await prisma.exam.count();
			const examCode = `EXM-${String(count + 1).padStart(3, "0")}`;

			const exam = await prisma.exam.create({
				data: {
					...parsed.data,
					examCode,
					date: new Date(parsed.data.date),
					endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
				},
			});
			return reply.code(201).send({ success: true, data: exam });
		},
	);

	// ─── GET /api/v1/exams/:id ───────────────────────────────
	fastify.get(
		"/exams/:id",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const user = request.user;
			const exam = await prisma.exam.findUnique({
				where: { id: request.params.id },
				include: { _count: { select: { questions: true, responses: true } } },
			});
			if (!exam)
				return reply
					.code(404)
					.send({ success: false, message: "Ujian tidak ditemukan." });

			if (user.role === "Siswa") {
				const now = new Date();
				if (exam.status !== "Aktif") {
					return reply
						.code(400)
						.send({ success: false, message: "Ujian belum aktif." });
				}
				if (now < new Date(exam.date)) {
					return reply
						.code(400)
						.send({ success: false, message: "Ujian belum dimulai." });
				}
				if (exam.endDate && now > new Date(exam.endDate)) {
					return reply
						.code(400)
						.send({ success: false, message: "Waktu ujian telah berakhir." });
				}
			}
			return reply.send({ success: true, data: exam });
		},
	);

	// ─── PATCH /api/v1/exams/:id ─────────────────────────────
	fastify.patch(
		"/exams/:id",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const parsed = examSchema.partial().safeParse(request.body);
			if (!parsed.success) {
				return reply
					.code(400)
					.send({ success: false, message: "Data tidak valid." });
			}
			const data = { ...parsed.data };
			if (data.date) data.date = new Date(data.date);
			if (data.endDate) data.endDate = new Date(data.endDate);

			const exam = await prisma.exam.update({
				where: { id: request.params.id },
				data,
			});
			return reply.send({ success: true, data: exam });
		},
	);

	// ─── DELETE /api/v1/exams/:id ────────────────────────────
	fastify.delete(
		"/exams/:id",
		{ preHandler: fastify.requireRole("Admin") },
		async (request, reply) => {
			await prisma.exam.delete({ where: { id: request.params.id } });
			return reply.send({ success: true });
		},
	);

	// ─── POST /api/v1/exams/validate-pin ─────────────────────
	// Siswa: validasi PIN sebelum mulai ujian
	fastify.post(
		"/exams/validate-pin",
		{ preHandler: fastify.authenticate },
		async (request, reply) => {
			const { pin } = z.object({ pin: z.string().min(1) }).parse(request.body);
			const user = request.user;
			const now = new Date();

			const exam = await prisma.exam.findFirst({
				where: {
					pin,
					kelas: { contains: user.kelas || "" },
				},
				select: {
					id: true,
					examCode: true,
					subject: true,
					duration: true,
					status: true,
					date: true,
					endDate: true,
				},
			});

			if (!exam) {
				return reply.code(400).send({
					success: false,
					message: "PIN salah, kelas tidak sesuai, atau ujian tidak ditemukan.",
				});
			}

			if (exam.status === "Selesai" || exam.status === "Diarsipkan") {
				return reply.send({ success: true, data: exam, viewResultsOnly: true });
			}

			if (exam.status !== "Aktif") {
				return reply.code(400).send({
					success: false,
					message: "Ujian belum diaktifkan oleh guru.",
				});
			}

			if (now < new Date(exam.date)) {
				return reply.code(400).send({
					success: false,
					message: "Ujian belum dimulai. Harap tunggu.",
				});
			}

			if (exam.endDate && now > new Date(exam.endDate)) {
				await prisma.exam.update({
					where: { id: exam.id },
					data: { status: "Selesai" },
				});
				return reply
					.code(400)
					.send({ success: false, message: "Waktu ujian telah berakhir." });
			}

			return reply.send({ success: true, data: exam });
		},
	);

	// ─── POST /api/v1/exams/:id/recalculate ───────────────────
	// Admin/Guru: hitung ulang semua nilai ujian berdasarkan kunci jawaban terkini
	fastify.post(
		"/exams/:id/recalculate",
		{ preHandler: fastify.requireRole("Admin", "Guru") },
		async (request, reply) => {
			const examId = request.params.id;

			const exam = await prisma.exam.findUnique({ where: { id: examId } });
			if (!exam)
				return reply
					.code(404)
					.send({ success: false, message: "Ujian tidak ditemukan." });

			// Ambil semua soal ujian dengan kunci jawaban
			const questions = await prisma.question.findMany({
				where: { examId },
				orderBy: { order: "asc" },
			});

			// Ambil semua response yang sudah dikumpulkan (Submitted/Graded)
			const responses = await prisma.response.findMany({
				where: {
					examId,
					status: { in: ["Submitted", "Graded"] },
				},
			});

			let updated = 0;
			for (const response of responses) {
				const answers = response.answersJson ?? {};
				// Hitung ulang nilai — jika ada esai, pertahankan status Submitted/Graded
				const { score, hasEssay } = calculateScore(questions, answers);
				const newStatus = hasEssay ? response.status : "Graded";

				// Pertahankan essay bonus yang sudah diberikan Admin/Guru
				const essayBonus =
					typeof answers._essayBonus === "number" ? answers._essayBonus : 0;
				const finalScore = Math.min(100, score + essayBonus);

				await prisma.response.update({
					where: { id: response.id },
					data: { score: finalScore, status: newStatus },
				});
				updated++;
			}

			return reply.send({
				success: true,
				message: `${updated} nilai berhasil dihitung ulang.`,
				updated,
			});
		},
	);
}
