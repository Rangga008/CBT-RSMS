-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'Guru', 'Siswa');

-- CreateEnum
CREATE TYPE "ExamStatus" AS ENUM ('Draft', 'Aktif', 'Selesai', 'Diarsipkan');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('PG', 'BS', 'JODOH', 'Esai');

-- CreateEnum
CREATE TYPE "ResponseStatus" AS ENUM ('InProgress', 'Submitted', 'Graded');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_code" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "kelas" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "ip_address" TEXT,
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exams" (
    "exam_id" TEXT NOT NULL,
    "exam_code" TEXT NOT NULL,
    "mata_pelajaran" TEXT NOT NULL,
    "kelas" TEXT NOT NULL,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_selesai" TIMESTAMP(3),
    "duration" INTEGER NOT NULL,
    "pin" TEXT,
    "status" "ExamStatus" NOT NULL DEFAULT 'Draft',
    "shuffle_config" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exams_pkey" PRIMARY KEY ("exam_id")
);

-- CreateTable
CREATE TABLE "questions" (
    "question_id" TEXT NOT NULL,
    "question_code" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "content" TEXT NOT NULL,
    "image_url" TEXT,
    "options" JSONB NOT NULL,
    "correct_answer" JSONB,
    "is_required" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "responses" (
    "response_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "answers_json" JSONB NOT NULL,
    "score" DOUBLE PRECISION,
    "start_time" TIMESTAMP(3),
    "submit_time" TIMESTAMP(3),
    "status" "ResponseStatus" NOT NULL DEFAULT 'InProgress',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);

-- CreateTable
CREATE TABLE "exam_logs" (
    "log_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "exam_id" TEXT NOT NULL,
    "violation_count" INTEGER NOT NULL DEFAULT 0,
    "details" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exam_logs_pkey" PRIMARY KEY ("log_id")
);

-- CreateTable
CREATE TABLE "configs" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "configs_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "kelas" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "kelas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapel" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "mapel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ip_whitelist" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "label" TEXT,
    "target_role" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT,

    CONSTRAINT "ip_whitelist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ip_access_logs" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "status_code" INTEGER NOT NULL,
    "user_id" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ip_access_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_code_key" ON "users"("user_code");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "exams_exam_code_key" ON "exams"("exam_code");

-- CreateIndex
CREATE UNIQUE INDEX "questions_question_code_key" ON "questions"("question_code");

-- CreateIndex
CREATE UNIQUE INDEX "responses_user_id_exam_id_key" ON "responses"("user_id", "exam_id");

-- CreateIndex
CREATE UNIQUE INDEX "kelas_nama_key" ON "kelas"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "mapel_nama_key" ON "mapel"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "ip_whitelist_ip_address_target_role_key" ON "ip_whitelist"("ip_address", "target_role");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("exam_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_logs" ADD CONSTRAINT "exam_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_logs" ADD CONSTRAINT "exam_logs_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE;
