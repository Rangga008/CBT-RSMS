# 🚀 Quick Start Guide

Untuk yang sudah familiar dengan instalasi aplikasi.

## Install (1 Menit)

1. **Double-click** `CBT RSMS Setup 1.0.0.exe`
2. Klik **Izinkan** (UAC)
3. Wizard akan langsung muncul:
   - **Step 1**: Cek dependensi (Node.js, PostgreSQL). Jika kurang, ikuti instruksi atau install manual
   - **Step 2**: Port (default 3000), IP mode (default: Terbuka)
   - **Step 3**: Database (default: localhost, port 5432, user `postgres`)
   - **Step 4**: Pilih IP server (jangan `127.0.0.1` jika ingin akses dari PC lain)
   - **Step 5**: Auto-install dependencies, migrate DB, build, dan start server (10-15 menit)
4. Selesai!

## Start/Stop (Anytime)

**Opsi 1 - Via Tray:**

```
Windows Tray (kanan taskbar)
  → Klik 2x icon CBT RSMS
    → Control Panel
      → Tombol ▶ Start / ⏹ Stop
```

**Opsi 2 - Start Menu:**

```
Start Menu → CBT RSMS → Buka
```

## Access

- **Lokal**: `http://localhost:3000`
- **Network**: `http://192.168.1.100:3000` (ganti IP sesuai step 4 install)

## Login

```
Admin:
  User: admin
  Pass: admin123
  ⚠️ Ubah segera!
```

## Dashboard

```
👤 Master Data
  ├─ Pengguna (tambah guru, siswa, admin)
  ├─ Kelas (buat kelas)
  └─ Mata Pelajaran

📝 Ujian
  ├─ Soal (CRUD soal)
  ├─ Ujian (buat ujian, atur jadwal)
  └─ Konfigurasi (upload logo, background, etc)

🌍 IP Management (jika whitelist mode)

⚙️ Pengaturan Sistem
```

## Troubleshooting

| Error                           | Solusi                                                                           |
| ------------------------------- | -------------------------------------------------------------------------------- |
| "PostgreSQL tidak terdeteksi"   | Install PostgreSQL dari https://www.enterprisedb.com (port 5432, user: postgres) |
| "Node.js tidak ditemukan"       | Install dari https://nodejs.org (LTS), restart PC                                |
| "Redis tidak terdeteksi"        | Download Memurai https://www.memurai.com (opsional) atau skip                    |
| "Tidak bisa akses dari PC lain" | Add Node.js to Windows Firewall exceptions                                       |
| Server crash                    | Buka Control Panel → lihat Server Logs (warna merah)                             |
| Lupa password PostgreSQL        | Lihat INSTALL-GUIDE.md section "Lupa password PostgreSQL"                        |

## Backup Database

```powershell
# Command Prompt as Admin
cd "C:\Program Files\PostgreSQL\15\bin"
pg_dump -U postgres cbt_rsms > backup.sql
```

## Reset Database

```powershell
# Reset DB (hapus semua data!)
cd C:\Users\YourName\AppData\Local\Programs\CBT RSMS\backend
npx prisma migrate reset
```

## Uninstall

Programs and Features → CBT RSMS → Uninstall  
(Database tidak dihapus)

---

**Butuh bantuan lebih lengkap?** Baca `INSTALL-GUIDE.md`
