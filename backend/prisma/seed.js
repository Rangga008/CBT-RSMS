import { PrismaClient, Role, ExamStatus, QuestionType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	console.log("🌱 Mulai seeding database...");

	// 1. KONFIGURASI APLIKASI
	await prisma.config.createMany({
		data: [
			{ key: "app_name", value: "Ujian Online V.3" },
			{ key: "app_subtitle", value: "Sistem Ujian Terintegrasi" },
			{
				key: "app_logo",
				value:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg/250px-Logo_of_Ministry_of_Education_and_Culture_of_Republic_of_Indonesia.svg.png",
			},
			{
				key: "app_background",
				value: "https://i.ibb.co.com/gMD4CdQ1/Foto-Sekolah.png",
			},
			{ key: "show_exam_result", value: "false" },
		],
		skipDuplicates: true,
	});
	console.log("✅ Konfigurasi selesai");

	// 2. MASTER DATA KELAS
	await prisma.kelas.createMany({
		data: [
			"X-IPA 1",
			"X-IPA 2",
			"X-IPS 1",
			"XI-IPA 1",
			"XI-IPA 2",
			"XI-IPS 1",
			"XII-RPL",
			"XII-TKJ",
			"XII-MM",
		].map((nama) => ({ nama })),
		skipDuplicates: true,
	});
	console.log("✅ Master data kelas selesai");

	// 3. MASTER DATA MAPEL
	await prisma.mapel.createMany({
		data: [
			"Matematika",
			"Bahasa Indonesia",
			"Bahasa Inggris",
			"Fisika",
			"Kimia",
			"Biologi",
			"Sejarah",
			"Geografi",
			"Ekonomi",
			"Pemrograman Dasar",
			"Basis Data",
		].map((nama) => ({ nama })),
		skipDuplicates: true,
	});
	console.log("✅ Master data mapel selesai");

	// 4. USERS DEFAULT
	const hashedAdmin = await bcrypt.hash("admin123", 12);
	const hashedSiswa = await bcrypt.hash("siswa123456", 12);
	const hashedGuru = await bcrypt.hash("guru123", 12);

	const adminUser = await prisma.user.upsert({
		where: { userId: "ADM-001" },
		update: { displayPassword: "admin123" },
		create: {
			userId: "ADM-001",
			nama: "Admin Utama",
			password: hashedAdmin,
			displayPassword: "admin123",
			role: Role.Admin,
			kelas: "-",
			isActive: true,
		},
	});

	await prisma.user.upsert({
		where: { userId: "SIS-001" },
		update: { displayPassword: "siswa123456" },
		create: {
			userId: "SIS-001",
			nama: "Siswa Contoh",
			password: hashedSiswa,
			displayPassword: "siswa123456",
			role: Role.Siswa,
			kelas: "XII-RPL",
			isActive: true,
		},
	});

	await prisma.user.upsert({
		where: { userId: "GUR-001" },
		update: { displayPassword: "guru123" },
		create: {
			userId: "GUR-001",
			nama: "Guru Contoh",
			password: hashedGuru,
			displayPassword: "guru123",
			role: Role.Guru,
			kelas: "Matematika:XII-RPL,Fisika:XI-IPA 1",
			isActive: true,
		},
	});
	console.log("✅ Users default selesai");

	// 5. IP WHITELIST DEFAULT (localhost)
	await prisma.ipWhitelist.createMany({
		data: [
			{
				ipAddress: "127.0.0.1",
				label: "Localhost",
				targetRole: null,
				isActive: true,
				createdBy: adminUser.id,
			},
			{
				ipAddress: "::1",
				label: "Localhost IPv6",
				targetRole: null,
				isActive: true,
				createdBy: adminUser.id,
			},
		],
		skipDuplicates: true,
	});
	console.log("✅ IP Whitelist default selesai");

	// 6. UJIAN DEMO
	const demoExam = await prisma.exam.upsert({
		where: { examCode: "EXM-DEMO-001" },
		update: {},
		create: {
			examCode: "EXM-DEMO-001",
			subject: "Simulasi Ujian AKM & Standar",
			kelas: "XII-RPL",
			date: new Date(),
			endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
			duration: 60,
			pin: "12345",
			status: ExamStatus.Aktif,
			shuffleConfig: { questions: false, options: false },
		},
	});

	// 7. SOAL DEMO
	const questions = [
		{
			questionCode: "Q-001",
			type: QuestionType.PG,
			content: "Berapakah hasil dari 5 x 5?",
			options: ["10", "20", "25", "55", "50"],
			correctAnswer: "25",
			isRequired: true,
			order: 1,
		},
		{
			questionCode: "Q-002",
			type: QuestionType.PG,
			content: "Ibu kota negara Indonesia saat ini adalah?",
			options: ["Bandung", "Surabaya", "Jakarta", "Medan", "Makassar"],
			correctAnswer: "Jakarta",
			isRequired: true,
			order: 2,
		},
		{
			questionCode: "Q-003",
			type: QuestionType.BS,
			order: 3,
			content:
				"Bacalah teks berikut:\n\nPemanasan global adalah peningkatan suhu rata-rata atmosfer, laut, dan daratan Bumi. Salah satu dampak utamanya adalah mencairnya es di kutub.",
			options: [
				"Global warming menyebabkan suhu bumi menurun.",
				"Es di kutub mencair akibat kenaikan suhu rata-rata.",
				"Perubahan iklim tidak berdampak pada cuaca.",
			],
			correctAnswer: { 0: "Salah", 1: "Benar", 2: "Salah" },
			isRequired: true,
		},
		{
			questionCode: "Q-004",
			type: QuestionType.JODOH,
			order: 4,
			content: "Pasangkan Negara berikut dengan Ibu Kotanya:",
			options: [
				{ q: "Jepang", a: "Tokyo" },
				{ q: "Inggris", a: "London" },
				{ q: "Prancis", a: "Paris" },
			],
			correctAnswer: "Auto-Check",
			isRequired: true,
		},
		{
			questionCode: "Q-005",
			type: QuestionType.PG,
			content: "Hewan yang memakan daging disebut?",
			options: [
				"Herbivora",
				"Karnivora",
				"Omnivora",
				"Insektivora",
				"Frugivora",
			],
			correctAnswer: "Karnivora",
			isRequired: true,
			order: 5,
		},
		{
			questionCode: "Q-006",
			type: QuestionType.BS,
			order: 6,
			content: "Tentukan kebenaran dari pernyataan fisika berikut ini:",
			options: [
				"Air mendidih pada suhu 100°C di tekanan standar.",
				"Massa jenis minyak lebih besar daripada air.",
			],
			correctAnswer: { 0: "Benar", 1: "Salah" },
			isRequired: true,
		},
		{
			questionCode: "Q-007",
			type: QuestionType.PG,
			content:
				'Komponen komputer yang berfungsi sebagai "otak" pemroses data adalah?',
			options: ["Monitor", "Mouse", "CPU", "Keyboard", "Speaker"],
			correctAnswer: "CPU",
			isRequired: true,
			order: 7,
		},
		{
			questionCode: "Q-008",
			type: QuestionType.JODOH,
			order: 8,
			content: "Cocokkan operasi matematika berikut dengan hasilnya:",
			options: [
				{ q: "10 + 10", a: "20" },
				{ q: "5 x 2", a: "10" },
				{ q: "100 / 2", a: "50" },
			],
			correctAnswer: "Auto-Check",
			isRequired: true,
		},
		{
			questionCode: "Q-009",
			type: QuestionType.Esai,
			content:
				"Jelaskan pendapat Anda tentang perkembangan kecerdasan buatan (AI) saat ini.",
			options: [],
			correctAnswer: null,
			isRequired: false,
			order: 9,
		},
		{
			questionCode: "Q-010",
			type: QuestionType.Esai,
			content: "Tuliskan cita-cita Anda setelah lulus sekolah.",
			options: [],
			correctAnswer: null,
			isRequired: true,
			order: 10,
		},
	];

	for (const q of questions) {
		await prisma.question.upsert({
			where: { questionCode: q.questionCode },
			update: {},
			create: { ...q, examId: demoExam.id },
		});
	}
	console.log("✅ Soal demo selesai");

	console.log("\n🎉 Seeding selesai!");
	console.log("👤 Login Admin  : ADM-001 / admin123");
	console.log("👤 Login Siswa  : SIS-001 / siswa123456");
	console.log("👤 Login Guru   : GUR-001 / guru123");
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
