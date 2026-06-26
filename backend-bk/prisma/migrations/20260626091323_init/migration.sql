-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'bk', 'guru', 'siswa');

-- CreateEnum
CREATE TYPE "StatusAbsensi" AS ENUM ('Hadir', 'Sakit', 'Izin', 'Alpa');

-- CreateEnum
CREATE TYPE "KategoriPelanggaran" AS ENUM ('ringan', 'sedang', 'berat', 'sangat_berat');

-- CreateEnum
CREATE TYPE "KategoriPrestasi" AS ENUM ('akademik', 'non_akademik', 'olahraga', 'seni', 'keagamaan', 'organisasi');

-- CreateEnum
CREATE TYPE "TipePoin" AS ENUM ('PRESTASI', 'PELANGGARAN');

-- CreateEnum
CREATE TYPE "StatusKasus" AS ENUM ('Baru', 'Proses', 'Selesai', 'Ditutup');

-- CreateEnum
CREATE TYPE "StatusKunjungan" AS ENUM ('Rencana', 'Berlangsung', 'Selesai', 'Dibatalkan');

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_code" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "kelas" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "display_password" TEXT,
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
CREATE TABLE "siswa" (
    "siswa_id" TEXT NOT NULL,
    "nisn" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL,
    "tanggal_lahir" DATE,
    "agama" TEXT,
    "nama_ayah" TEXT,
    "nama_ibu" TEXT,
    "no_hp" TEXT,
    "kelas" TEXT NOT NULL,
    "alamat" TEXT,
    "foto_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "siswa_pkey" PRIMARY KEY ("siswa_id")
);

-- CreateTable
CREATE TABLE "absensi" (
    "absensi_id" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "siswa_nisn" TEXT NOT NULL,
    "nama_snapshot" TEXT NOT NULL,
    "kelas_snapshot" TEXT NOT NULL,
    "jam_datang" TEXT,
    "jam_pulang" TEXT,
    "jam_sholat" TEXT,
    "status" "StatusAbsensi" NOT NULL DEFAULT 'Hadir',
    "keterangan" TEXT,
    "catatan" TEXT,
    "input_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("absensi_id")
);

-- CreateTable
CREATE TABLE "hari_libur" (
    "id" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "keterangan" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "hari_libur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_config" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_config_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "jenis_pelanggaran" (
    "jenis_id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kategori" "KategoriPelanggaran" NOT NULL DEFAULT 'ringan',
    "poin" INTEGER NOT NULL DEFAULT 5,
    "deskripsi" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jenis_pelanggaran_pkey" PRIMARY KEY ("jenis_id")
);

-- CreateTable
CREATE TABLE "jenis_prestasi" (
    "jenis_id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kategori" "KategoriPrestasi" NOT NULL DEFAULT 'akademik',
    "poin" INTEGER NOT NULL DEFAULT 10,
    "deskripsi" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jenis_prestasi_pkey" PRIMARY KEY ("jenis_id")
);

-- CreateTable
CREATE TABLE "jenis_kasus" (
    "jenis_id" TEXT NOT NULL,
    "kode" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jenis_kasus_pkey" PRIMARY KEY ("jenis_id")
);

-- CreateTable
CREATE TABLE "poin_siswa" (
    "poin_id" TEXT NOT NULL,
    "siswa_nisn" TEXT NOT NULL,
    "tipe" "TipePoin" NOT NULL,
    "jenis_prestasi_id" TEXT,
    "jenis_pelanggaran_id" TEXT,
    "poin" INTEGER NOT NULL,
    "deskripsi" TEXT,
    "tanggal" DATE NOT NULL,
    "tingkat" TEXT,
    "input_by" TEXT,
    "dokumen_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "poin_siswa_pkey" PRIMARY KEY ("poin_id")
);

-- CreateTable
CREATE TABLE "kasus_siswa" (
    "kasus_id" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "siswa_nisn" TEXT NOT NULL,
    "jenis_kasus_id" TEXT,
    "jenis_pelanggaran_id" TEXT,
    "tanggal" DATE NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "status" "StatusKasus" NOT NULL DEFAULT 'Baru',
    "penanganan" TEXT,
    "catatan" TEXT,
    "input_by" TEXT,
    "dokumen_list" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kasus_siswa_pkey" PRIMARY KEY ("kasus_id")
);

-- CreateTable
CREATE TABLE "laporan_kasus" (
    "laporan_id" TEXT NOT NULL,
    "kasus_id" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "catatan" TEXT NOT NULL,
    "status" "StatusKasus" NOT NULL,
    "input_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "laporan_kasus_pkey" PRIMARY KEY ("laporan_id")
);

-- CreateTable
CREATE TABLE "kunjungan_rumah" (
    "kunjungan_id" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "siswa_nisn" TEXT NOT NULL,
    "tanggal" DATE NOT NULL,
    "tujuan" TEXT NOT NULL,
    "petugas_bk" TEXT,
    "status" "StatusKunjungan" NOT NULL DEFAULT 'Rencana',
    "hasil_kunjungan" TEXT,
    "catatan" TEXT,
    "dokumen_list" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "kunjungan_rumah_pkey" PRIMARY KEY ("kunjungan_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_code_key" ON "users"("user_code");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "siswa_nisn_key" ON "siswa"("nisn");

-- CreateIndex
CREATE INDEX "absensi_tanggal_idx" ON "absensi"("tanggal");

-- CreateIndex
CREATE INDEX "absensi_siswa_nisn_idx" ON "absensi"("siswa_nisn");

-- CreateIndex
CREATE UNIQUE INDEX "absensi_tanggal_siswa_nisn_key" ON "absensi"("tanggal", "siswa_nisn");

-- CreateIndex
CREATE UNIQUE INDEX "hari_libur_tanggal_key" ON "hari_libur"("tanggal");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_pelanggaran_kode_key" ON "jenis_pelanggaran"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_prestasi_kode_key" ON "jenis_prestasi"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "jenis_kasus_kode_key" ON "jenis_kasus"("kode");

-- CreateIndex
CREATE INDEX "poin_siswa_siswa_nisn_idx" ON "poin_siswa"("siswa_nisn");

-- CreateIndex
CREATE INDEX "poin_siswa_tanggal_idx" ON "poin_siswa"("tanggal");

-- CreateIndex
CREATE UNIQUE INDEX "kasus_siswa_nomor_key" ON "kasus_siswa"("nomor");

-- CreateIndex
CREATE INDEX "kasus_siswa_siswa_nisn_idx" ON "kasus_siswa"("siswa_nisn");

-- CreateIndex
CREATE INDEX "kasus_siswa_status_idx" ON "kasus_siswa"("status");

-- CreateIndex
CREATE UNIQUE INDEX "kunjungan_rumah_nomor_key" ON "kunjungan_rumah"("nomor");

-- CreateIndex
CREATE INDEX "kunjungan_rumah_siswa_nisn_idx" ON "kunjungan_rumah"("siswa_nisn");

-- CreateIndex
CREATE INDEX "kunjungan_rumah_tanggal_idx" ON "kunjungan_rumah"("tanggal");

-- AddForeignKey
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_siswa_nisn_fkey" FOREIGN KEY ("siswa_nisn") REFERENCES "siswa"("nisn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poin_siswa" ADD CONSTRAINT "poin_siswa_siswa_nisn_fkey" FOREIGN KEY ("siswa_nisn") REFERENCES "siswa"("nisn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poin_siswa" ADD CONSTRAINT "poin_siswa_jenis_prestasi_id_fkey" FOREIGN KEY ("jenis_prestasi_id") REFERENCES "jenis_prestasi"("jenis_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "poin_siswa" ADD CONSTRAINT "poin_siswa_jenis_pelanggaran_id_fkey" FOREIGN KEY ("jenis_pelanggaran_id") REFERENCES "jenis_pelanggaran"("jenis_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kasus_siswa" ADD CONSTRAINT "kasus_siswa_siswa_nisn_fkey" FOREIGN KEY ("siswa_nisn") REFERENCES "siswa"("nisn") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kasus_siswa" ADD CONSTRAINT "kasus_siswa_jenis_kasus_id_fkey" FOREIGN KEY ("jenis_kasus_id") REFERENCES "jenis_kasus"("jenis_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kasus_siswa" ADD CONSTRAINT "kasus_siswa_jenis_pelanggaran_id_fkey" FOREIGN KEY ("jenis_pelanggaran_id") REFERENCES "jenis_pelanggaran"("jenis_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporan_kasus" ADD CONSTRAINT "laporan_kasus_kasus_id_fkey" FOREIGN KEY ("kasus_id") REFERENCES "kasus_siswa"("kasus_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "kunjungan_rumah" ADD CONSTRAINT "kunjungan_rumah_siswa_nisn_fkey" FOREIGN KEY ("siswa_nisn") REFERENCES "siswa"("nisn") ON DELETE CASCADE ON UPDATE CASCADE;
