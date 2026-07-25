import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/index.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database BK RSMS...");

  // ── App Config defaults ──────────────────────────────────────
  const configs = [
    { key: "jam_masuk_mulai", value: "06:30" },
    { key: "jam_masuk_akhir", value: "07:15" },
    { key: "jam_pulang_mulai", value: "15:00" },
    { key: "jam_pulang_akhir", value: "17:00" },
    { key: "mode_absen", value: "masuk_pulang" },
    { key: "nama_sekolah", value: "RSMS 129" },
    { key: "tahun_ajaran", value: "2025/2026" },
    {
      key: "jadwal_harian",
      value: JSON.stringify({
        1: { masuk_mulai: "06:30", masuk_akhir: "07:15", pulang_mulai: "15:00", pulang_akhir: "17:00", libur: false },
        2: { masuk_mulai: "06:30", masuk_akhir: "07:15", pulang_mulai: "15:00", pulang_akhir: "17:00", libur: false },
        3: { masuk_mulai: "06:30", masuk_akhir: "07:15", pulang_mulai: "15:00", pulang_akhir: "17:00", libur: false },
        4: { masuk_mulai: "06:30", masuk_akhir: "07:15", pulang_mulai: "15:00", pulang_akhir: "17:00", libur: false },
        5: { masuk_mulai: "06:30", masuk_akhir: "07:15", pulang_mulai: "11:00", pulang_akhir: "12:30", libur: false },
        6: { libur: true },
        7: { libur: true },
      }),
    },
  ];

  for (const cfg of configs) {
    await prisma.appConfig.upsert({
      where: { key: cfg.key },
      update: { value: cfg.value },
      create: cfg,
    });
  }

  // ── Admin user ───────────────────────────────────────────────
  const adminPass = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { userId: "ADM-001" },
    update: { password: adminPass, displayPassword: "admin123", role: "admin", isActive: true },
    create: {
      userId: "ADM-001",
      nama: "Administrator",
      password: adminPass,
      role: "admin",
      displayPassword: "admin123",
    },
  });

  // BK user
  const bkPass = await bcrypt.hash("bk123456", 12);
  await prisma.user.upsert({
    where: { userId: "BK-001" },
    update: { password: bkPass, displayPassword: "bk123456", role: "bk", isActive: true },
    create: {
      userId: "BK-001",
      nama: "Guru BK",
      password: bkPass,
      role: "bk",
      displayPassword: "bk123456",
    },
  });

  // ── Jenis Pelanggaran ────────────────────────────────────────
  const pelanggaranList = [
    { kode: "P001", nama: "Terlambat masuk sekolah", kategori: "ringan", poin: 5, deskripsi: "Datang melewati batas jam masuk" },
    { kode: "P002", nama: "Tidak mengerjakan PR", kategori: "ringan", poin: 5, deskripsi: "Tidak mengumpulkan pekerjaan rumah" },
    { kode: "P003", nama: "Seragam tidak lengkap", kategori: "ringan", poin: 10, deskripsi: "Tidak mengenakan seragam sesuai ketentuan" },
    { kode: "P004", nama: "Membuang sampah sembarangan", kategori: "ringan", poin: 5, deskripsi: "Tidak menjaga kebersihan lingkungan" },
    { kode: "P005", nama: "Tidak hadir tanpa keterangan", kategori: "sedang", poin: 15, deskripsi: "Alpa lebih dari 3 hari" },
    { kode: "P006", nama: "Perkelahian", kategori: "berat", poin: 50, deskripsi: "Terlibat perkelahian di lingkungan sekolah" },
    { kode: "P007", nama: "Membawa/menggunakan rokok", kategori: "berat", poin: 50, deskripsi: "Merokok di lingkungan sekolah" },
    { kode: "P008", nama: "Membawa senjata tajam", kategori: "sangat_berat", poin: 100, deskripsi: "Membawa senjata berbahaya" },
    { kode: "P009", nama: "Menggunakan narkoba", kategori: "sangat_berat", poin: 150, deskripsi: "Terbukti menggunakan narkotika" },
    { kode: "P010", nama: "Mencuri", kategori: "berat", poin: 75, deskripsi: "Terbukti mengambil barang milik orang lain" },
  ];

  for (const p of pelanggaranList) {
    await prisma.jenisPelanggaran.upsert({
      where: { kode: p.kode },
      update: {},
      create: { ...p, kategori: p.kategori },
    });
  }

  // ── Jenis Prestasi ───────────────────────────────────────────
  const prestasiList = [
    { kode: "PR001", nama: "Juara 1 tingkat sekolah", kategori: "akademik", poin: 20 },
    { kode: "PR002", nama: "Juara 2 tingkat sekolah", kategori: "akademik", poin: 15 },
    { kode: "PR003", nama: "Juara 3 tingkat sekolah", kategori: "akademik", poin: 10 },
    { kode: "PR004", nama: "Juara 1 tingkat kabupaten/kota", kategori: "akademik", poin: 35 },
    { kode: "PR005", nama: "Juara 1 tingkat provinsi", kategori: "akademik", poin: 50 },
    { kode: "PR006", nama: "Juara 1 tingkat nasional", kategori: "akademik", poin: 75 },
    { kode: "PR007", nama: "Juara olahraga tingkat sekolah", kategori: "olahraga", poin: 20 },
    { kode: "PR008", nama: "Juara olahraga tingkat kabupaten", kategori: "olahraga", poin: 35 },
    { kode: "PR009", nama: "Prestasi seni tingkat sekolah", kategori: "seni", poin: 20 },
    { kode: "PR010", nama: "Hafizh Al-Quran", kategori: "keagamaan", poin: 30 },
    { kode: "PR011", nama: "Aktif organisasi OSIS", kategori: "organisasi", poin: 15 },
    { kode: "PR012", nama: "Nilai rapor terbaik", kategori: "akademik", poin: 25 },
  ];

  for (const p of prestasiList) {
    await prisma.jenisPrestasi.upsert({
      where: { kode: p.kode },
      update: {},
      create: { ...p, kategori: p.kategori },
    });
  }

  // ── Jenis Kasus ──────────────────────────────────────────────
  const kasusTypeList = [
    { kode: "K001", nama: "Kasus Disiplin", deskripsi: "Pelanggaran tata tertib sekolah" },
    { kode: "K002", nama: "Kasus Perundungan (Bullying)", deskripsi: "Intimidasi atau kekerasan antar siswa" },
    { kode: "K003", nama: "Kasus Keluarga", deskripsi: "Masalah yang berkaitan dengan kondisi keluarga siswa" },
    { kode: "K004", nama: "Kasus Akademik", deskripsi: "Masalah nilai, kehadiran, atau prestasi belajar" },
    { kode: "K005", nama: "Kasus Pergaulan", deskripsi: "Masalah pergaulan dan pertemanan" },
    { kode: "K006", nama: "Kasus Narkoba & Rokok", deskripsi: "Keterlibatan dengan zat berbahaya" },
    { kode: "K007", nama: "Kasus Pacaran", deskripsi: "Hubungan percintaan yang tidak sesuai norma" },
    { kode: "K008", nama: "Kasus Ekonomi", deskripsi: "Masalah kondisi ekonomi yang mempengaruhi belajar" },
  ];

  for (const k of kasusTypeList) {
    await prisma.jenisKasus.upsert({
      where: { kode: k.kode },
      update: {},
      create: k,
    });
  }

  console.log("✅ Seeding selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
