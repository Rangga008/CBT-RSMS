-- DropForeignKey
ALTER TABLE "exam_logs" DROP CONSTRAINT "exam_logs_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "exam_logs" DROP CONSTRAINT "exam_logs_user_id_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_exam_id_fkey";

-- DropForeignKey
ALTER TABLE "responses" DROP CONSTRAINT "responses_user_id_fkey";

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("exam_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_logs" ADD CONSTRAINT "exam_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exam_logs" ADD CONSTRAINT "exam_logs_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams"("exam_id") ON DELETE CASCADE ON UPDATE CASCADE;
