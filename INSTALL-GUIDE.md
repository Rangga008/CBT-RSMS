# 📚 Panduan Instalasi CBT RSMS

**CBT RSMS** adalah sistem ujian online berbasis web yang dibangun dengan teknologi modern. Panduan ini akan membantu Anda menginstal dan menjalankan aplikasi dengan mudah.

---

## 📋 Daftar Isi

1. [Persyaratan Sistem](#persyaratan-sistem)
2. [Instalasi Pertama Kali](#instalasi-pertama-kali)
3. [Menjalankan Aplikasi](#menjalankan-aplikasi)
4. [Akses Aplikasi](#akses-aplikasi)
5. [Menu Control Panel](#menu-control-panel)
6. [Tanya Jawab & Troubleshooting](#tanya-jawab--troubleshooting)

---

## 📦 Persyaratan Sistem

Sebelum menginstal, pastikan komputer Anda memiliki:

### Hardware Minimum

- **Processor**: Intel/AMD dual-core (1.8 GHz atau lebih tinggi)
- **RAM**: 4 GB (rekomendasi 8 GB untuk performa optimal)
- **Hard Drive**: 2 GB ruang kosong (untuk aplikasi + database)
- **Koneksi Internet**: Stabil (untuk setup awal, LAN untuk penggunaan sehari-hari)

### Software yang Diperlukan

✅ **Secara otomatis diinstal oleh installer**:

- Node.js (LTS)
- PostgreSQL (database)
- PM2 (process manager)

⚠️ **Perlu diinstal manual** (jika belum ada):

- Redis / Memurai (untuk session cache — opsional tapi direkomendasikan)

---

## 🚀 Instalasi Pertama Kali

### Langkah 1: Download Installer

Dapatkan file installer dari distributor atau administrator sekolah Anda:

- **Windows**: `CBT RSMS Setup 1.0.0.exe` (sekitar 77 MB)

### Langkah 2: Jalankan Installer

1. **Klik dua kali** file `CBT RSMS Setup 1.0.0.exe`
2. Jika diminta UAC (User Account Control), klik **Izinkan** atau **Yes**
3. Jendela installer akan terbuka dengan wizard setup

### Langkah 3: Wizard Setup (5 Tahap)

#### **Tahap 1: Cek Sistem** ✓

Installer akan memeriksa apakah semua persyaratan sudah ada:

```
✅ Node.js        - v18.0.0 atau lebih tinggi
✅ npm            - v9.0.0 atau lebih tinggi
✅ PostgreSQL     - Terdeteksi
✅ PM2            - Akan diinstall otomatis
⚠️  Redis         - Opsional (bisa install nanti)
```

**Jika ada yang ⚠️ Kuning (Warning)**:

- Baca petunjuk di layar
- Ikuti link untuk download
- Install aplikasi yang kurang
- Klik tombol **🔄 Cek Ulang** setelah selesai

**Jika ada yang ❌ Merah (Error)**:

- Aplikasi **wajib** diinstall terlebih dahulu
- Instruksi lengkap akan ditampilkan
- Lihat bagian [Troubleshooting](#troubleshooting-memperbaiki-masalah) jika ada masalah

Setelah semua hijau ✅, klik tombol **Lanjut →**

---

#### **Tahap 2: Konfigurasi Aplikasi** ⚙️

Pengaturan dasar untuk server:

```
┌─────────────────────────────────┐
│ Port Server: [3000]             │  ← Nomor port aplikasi
│ Mode Filter IP: [Terbuka]       │  ← Akses dari siapa saja
└─────────────────────────────────┘
```

**Penjelasan**:

- **Port Server**: Nomor tempat aplikasi mendengarkan. Biarkan default (3000) jika tidak tahu
- **Mode Filter IP**:
  - 🟢 **Terbuka** = Semua komputer di jaringan bisa akses (cocok untuk lab)
  - 🔒 **Whitelist** = Hanya IP tertentu yang bisa akses (lebih aman)

Klik **Lanjut →** untuk lanjut

---

#### **Tahap 3: Database PostgreSQL** 🗄️

Konfigurasi koneksi ke database:

```
┌──────────────────────────────────┐
│ Host Database: [localhost]       │
│ Port Database: [5432]            │
│ Nama Database: [cbt_rsms]        │
│ Username: [postgres]             │
│ Password: [•••••••]              │
└──────────────────────────────────┘
```

**Penjelasan**:

- **Host Database**: Biasanya `localhost` (di komputer yang sama)
- **Port Database**: Jangan ubah kecuali PostgreSQL diinstall dengan port custom
- **Nama Database**: Nama database untuk CBT RSMS (biarkan default)
- **Username**: User PostgreSQL (biasanya `postgres`)
- **Password**: Password yang Anda buat saat install PostgreSQL

> 💡 **Tips**: Jika lupa password PostgreSQL, lihat bagian [Troubleshooting](#troubleshooting-memperbaiki-masalah)

Klik **Lanjut →** untuk lanjut

---

#### **Tahap 4: Network & Server IP** 🌐

Pilih alamat IP server:

```
IP Tersedia:
○ 192.168.1.100 (Network)
○ 10.0.0.50     (Network)
● 127.0.0.1     (Loopback / Hanya Komputer Ini)
```

**Penjelasan**:

- Pilih IP yang dimulai dengan `192.168` atau `10.0` (IP jaringan lokal)
- Jangan pilih `127.0.0.1` jika ingin akses dari komputer lain
- IP ini akan digunakan untuk login dari siswa/guru di komputer lain

> 💡 **Tips**: Jika ragu, pilih IP yang **bukan** `127.0.0.1`

Klik **Lanjut →** untuk lanjut

---

#### **Tahap 5: Instalasi** ⚙️

Installer akan melakukan pekerjaan berat:

```
📦 Menginstall dependencies...     [████████░░] 50%
🔧 Prisma Client...               [██████████] 100%
💾 Database migration...           [██████████] 100%
🌱 Seed data awal...              [██████████] 100%
🏗️ Build frontend...              [██████████] 100%
▶️ Jalankan server...             [██████████] 100%

✅ INSTALASI SELESAI!
Aplikasi siap diakses
```

**Proses dapat memakan waktu 5-15 menit** (tergantung kecepatan komputer)

Tunggu hingga muncul **✅ INSTALASI SELESAI!**, kemudian klik tombol untuk lanjut

---

## ▶️ Menjalankan Aplikasi

### Cara 1: Dari Start Menu (Termudah)

1. Buka **Windows Start Menu**
2. Cari **"CBT RSMS"**
3. Klik untuk membuka Control Panel

### Cara 2: Dari Tray (Setelah Pertama Kali)

1. Control Panel sudah berjalan di background (di tray bagian kanan taskbar)
2. Cari icon CBT RSMS di tray
3. Klik dua kali untuk buka Control Panel

### Cara 3: Manual (Untuk Developer)

Jika ingin jalankan dari terminal:

```powershell
cd C:\Users\YourName\AppData\Local\Programs\CBT RSMS
# atau jalur instalasi Anda

npm run start
```

---

## 🌐 Akses Aplikasi

Setelah server running, buka browser dan akses:

```
http://localhost:3000
```

atau jika dari komputer lain:

```
http://[IP-SERVER]:3000
```

Contoh:

```
http://192.168.1.100:3000
```

### Login Pertama Kali

**Admin:**

- Username: `admin`
- Password: `admin123`

> ⚠️ **PENTING**: Ubah password admin segera setelah login pertama!

**Guru/Siswa:**

- Akan dibuat admin dalam menu **Master Data > Pengguna**

---

## 🎮 Menu Control Panel

Setelah login, Anda akan melihat Control Panel dengan menu:

### 📊 Dashboard

- Ringkasan statistik ujian
- Siswa yang sedang ujian
- Status sistem

### 👥 Master Data

- **Pengguna**: Tambah guru, siswa, admin
- **Kelas**: Buat kelas baru
- **Mata Pelajaran**: Daftar mata pelajaran

### 📝 Ujian

- **Soal**: Buat soal esai/pilihan ganda
- **Ujian**: Buat ujian baru, atur jadwal
- **Konfigurasi**: Upload logo, background login, dll

### 🖼️ Galeri Gambar

- Upload gambar untuk soal
- Kelola library gambar

### 🌍 IP Management

- Whitelist IP (jika mode IP = Whitelist)
- Kelola akses jaringan

### ⚙️ Pengaturan Sistem

- Konfigurasi aplikasi
- Theme (dark/light mode)
- Backup & maintenance

---

## ❓ Tanya Jawab & Troubleshooting

### Q: Aplikasi tidak bisa dibuka

**A**: Periksa apakah server running

1. Buka Control Panel (klik icon CBT di tray)
2. Lihat status: **● Berjalan** (hijau) atau **● Berhenti** (merah)?
3. Jika **Berhenti**, klik tombol **▶ Start Server**
4. Tunggu 2-3 detik, buka browser ulang

---

### Q: Lupa password PostgreSQL

**A**: Reset password PostgreSQL Windows:

1. Buka **Services** (tekan `Windows + R`, ketik `services.msc`)
2. Cari **postgresql-x64-...** (versi bisa berbeda)
3. Stop service (klik kanan → Stop)
4. Buka Command Prompt sebagai Administrator:
   ```
   cd "C:\Program Files\PostgreSQL\<versi>\bin"
   psql -U postgres -h localhost
   ```
5. Jika berhasil masuk, ganti password:
   ```sql
   ALTER USER postgres WITH PASSWORD 'password-baru';
   ```
6. Jalankan ulang installer CBT RSMS dengan password baru

---

### Q: "PostgreSQL tidak terdeteksi"

**A**: PostgreSQL belum terinstall

1. Download dari: https://www.enterprisedb.com/downloads/postgres-postgresql-installers
2. Pilih versi Windows x86-64
3. Jalankan installer:
   - Set password user `postgres` (jangan lupa!)
   - Port biarkan default: **5432**
   - Stack Builder bisa di-skip
4. Setelah selesai, restart komputer
5. Jalankan ulang installer CBT RSMS

---

### Q: "Redis tidak terdeteksi" (Warning ⚠️)

**A**: Redis opsional, tapi direkomendasikan untuk performa lebih baik

**Opsi 1: Auto-Install (Paling Mudah)**

- Klik tombol **⚡ Auto-install via winget** di installer
- Tunggu selesai

**Opsi 2: Manual Install (Memurai)**

1. Download: https://www.memurai.com/get-memurai
2. Jalankan installer, biarkan default
3. Setelah selesai, restart komputer
4. Jalankan ulang cek dependencies

**Opsi 3: Skip (Tidak Apa-apa)**

- CBT RSMS tetap bisa jalan tanpa Redis
- Session data disimpan di database (sedikit lebih lambat)

---

### Q: "Node.js tidak ditemukan" ❌

**A**: Node.js wajib diinstall!

1. Download dari: https://nodejs.org/en/download (pilih LTS)
2. Jalankan installer, biarkan default
3. Pastikan centang **"Automatically install necessary tools"**
4. **Restart komputer** (penting!)
5. Buka Command Prompt baru, ketik:
   ```
   node --version
   npm --version
   ```
   Kedua perintah harus menampilkan versi
6. Jalankan ulang installer CBT RSMS

---

### Q: "Tidak bisa akses dari komputer lain"

**A**: Mungkin firewall memblokir

1. Buka **Windows Defender Firewall**
2. Klik **"Allow an app through firewall"**
3. Cari **Node.js** atau **CBT RSMS**, pastikan **tercentang**
4. Klik OK
5. Coba akses dari komputer lain:
   ```
   http://[IP-SERVER]:3000
   ```

---

### Q: "Server error 500" / "Aplikasi crash"

**A**: Lihat log error:

1. Buka Control Panel
2. Scroll ke bawah bagian **Server Logs**
3. Cari pesan error (biasanya warna merah)
4. Tangkap screenshot dan kirim ke administrator
5. Coba restart server: klik tombol **🔄 Restart Server**

---

### Q: Ingin shutdown/restart server

**A**: Ada 3 cara:

1. **Dari Control Panel**:
   - Klik tombol **⏹ Stop Server** untuk henti
   - Klik tombol **▶ Start Server** untuk nyalakan ulang

2. **Dari Tray**:
   - Klik kanan icon CBT di tray
   - Pilih **Stop Server** atau **Restart**

3. **Keluar aplikasi**:
   - Klik **Keluar** di menu tray
   - Server akan otomatis berhenti

---

### Q: Perlu backup database

**A**: Backup database PostgreSQL:

1. Buka **pgAdmin** (jika terinstall):
   - Buka browser: `http://localhost:5050`
   - Login dengan credential PostgreSQL

2. Atau gunakan command line:
   ```powershell
   # Di Command Prompt
   cd "C:\Program Files\PostgreSQL\<versi>\bin"
   pg_dump -U postgres cbt_rsms > backup_cbt_rsms.sql
   ```

---

### Q: Ingin uninstall

**A**:

1. Buka **Control Panel** → **Programs and Features**
2. Cari **CBT RSMS**
3. Klik **Uninstall**
4. Ikuti wizard uninstall
5. Database PostgreSQL **tidak akan dihapus** (aman!)

> 💡 Jika ingin hapus database juga, buka pgAdmin atau Command Prompt:
>
> ```sql
> DROP DATABASE cbt_rsms;
> ```

---

## 📞 Butuh Bantuan Lebih Lanjut?

- **Email**: admin@cbt-rsms.local
- **WhatsApp**: Hubungi IT/Admin sekolah
- **Dokumentasi**: Lihat folder `docs/` di dalam instalasi

---

## ✅ Checklist Instalasi Berhasil

Pastikan sudah:

- ✅ Installer berhasil dijalankan tanpa error
- ✅ Semua dependensi terdeteksi (Node.js, PostgreSQL minimal)
- ✅ Database migration selesai
- ✅ Server running (status hijau di Control Panel)
- ✅ Bisa akses aplikasi di browser
- ✅ Bisa login dengan user admin
- ✅ Dashboard menampilkan statistik

**Selamat! 🎉 CBT RSMS siap digunakan!**

---

**Versi**: 1.0.0  
**Tanggal Update**: 10 Mei 2026  
**Platform**: Windows 10/11 (64-bit)
