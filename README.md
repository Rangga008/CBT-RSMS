# 📚 CBT RSMS - Sistem Ujian Online

**Computer Based Test - Rapid Student Management System**

Aplikasi web untuk manajemen ujian online yang modern, stabil, dan mudah digunakan.

---

## 🎯 Untuk Siapa?

- ✅ **Admin IT / Implementor**: Silakan lanjut ke [INSTALL-GUIDE.md](INSTALL-GUIDE.md)
- ✅ **User Umum (tidak teknis)**: Baca [QUICK-REFERENCE.md](QUICK-REFERENCE.md) (bisa di-print)
- ✅ **Yang sudah mengerti instalasi**: Lihat [QUICK-START.md](QUICK-START.md)
- ✅ **Ada masalah / error**: Baca [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- ✅ **Developer**: Lihat [launcher/README-LAUNCHER.md](launcher/README-LAUNCHER.md)

---

## 📖 Dokumentasi

| Dokumen                                                        | Untuk Siapa                      | Waktu Baca |
| -------------------------------------------------------------- | -------------------------------- | ---------- |
| **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)**                   | User pemula / bisa di-print      | 2 min      |
| **[QUICK-START.md](QUICK-START.md)**                           | Yang sudah tahu install aplikasi | 5 min      |
| **[INSTALL-GUIDE.md](INSTALL-GUIDE.md)**                       | Panduan lengkap instalasi        | 15 min     |
| **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)**                   | Solusi masalah umum              | 10-20 min  |
| **[launcher/README-LAUNCHER.md](launcher/README-LAUNCHER.md)** | Build & distribute installer     | 5 min      |

---

## 🚀 Quick Start (30 Detik)

1. **Download**: `CBT RSMS Setup 1.0.0.exe` (77 MB)
2. **Double-click** → Ikuti wizard (4 step)
3. **Tunggu** ~10-15 menit instalasi
4. **Buka browser**: `http://localhost:3000`
5. **Login**: ADM-001 / admin123

**Selesai! ✅**

---

## 💻 Sistem Requirements

### Hardware

- 4 GB RAM (8 GB recommended)
- 2 GB disk space
- Network connection

### Software

Semua diinstall otomatis oleh installer:

- Node.js (LTS)
- PostgreSQL 15+
- PM2 (process manager)
- (Optional: Redis/Memurai)

### OS

- Windows 10/11 64-bit
- Linux support (AppImage, deb files)

---

## ✨ Fitur Utama

### 👥 User Management

- Admin, Guru, Siswa dengan role berbeda
- Master data kelas dan mata pelajaran
- Manajemen user mudah

### 📝 Ujian Online

- Soal esai dan pilihan ganda
- Editor soal dengan MathJax (rumus matematika)
- Upload gambar ke soal
- Jadwal ujian yang flexible

### 📊 Monitoring Real-time

- Lihat siswa yang sedang ujian
- Monitor progress jawaban
- Response tracking

### 🎨 Branding & Customization

- Upload logo sekolah
- Background login custom
- Theme gelap/terang (dark mode)
- Port & IP configuration

### 🔒 Keamanan

- IP Whitelist mode
- Session management
- Database encryption ready

### 📱 Responsive Design

- Desktop, tablet, mobile friendly
- Touch-optimized controls

---

## 🏗️ Teknologi

### Backend

- **Fastify** (web server ultralight)
- **Prisma** (ORM modern)
- **PostgreSQL** (database)
- **Redis** (session cache, optional)
- **PM2** (process management)

### Frontend

- **Vue 3** (framework UI)
- **Vite** (build tool modern)
- **Tailwind CSS** (styling)
- **MathJax** (mathematical notation)

### Deployment

- **Electron** (desktop app)
- **electron-builder** (packaging)
- Cross-platform (Windows, Linux, macOS)

---

## 📁 Project Structure

```
CBT-RSMS/
├── backend/              (Fastify API server)
│   ├── src/
│   │   ├── app.js       (Main app)
│   │   ├── routes/      (API endpoints)
│   │   ├── plugins/     (Auth, IP filter)
│   │   └── lib/
│   ├── prisma/          (Database schema)
│   └── uploads/         (File storage)
│
├── frontend/            (Vue 3 SPA)
│   ├── src/
│   │   ├── App.vue      (Root component)
│   │   ├── views/       (Pages)
│   │   ├── router/      (Vue Router)
│   │   ├── stores/      (Pinia state)
│   │   └── services/    (API client)
│   └── public/          (Static assets)
│
├── launcher/            (Electron desktop app)
│   ├── src/
│   │   ├── main.js      (Main process)
│   │   ├── preload.js   (IPC bridge)
│   │   └── renderer/    (Control panel UI)
│   └── dist-electron/   (Build output)
│
├── installer/           (Setup scripts)
│   ├── install.bat      (Windows)
│   └── install.sh       (Linux/Mac)
│
├── INSTALL-GUIDE.md     (Panduan instalasi detail)
├── QUICK-START.md       (Start cepat untuk teknis)
├── QUICK-REFERENCE.md   (Cheat sheet user)
├── TROUBLESHOOTING.md   (Solusi masalah)
└── README.md            (File ini)
```

---

## 🔧 Development

### Setup Dev Environment

```bash
# Clone repo
git clone https://github.com/Rangga008/CBT-RSMS.git
cd CBT-RSMS

# Install dependencies
npm install && npm install --workspace=backend && npm install --workspace=frontend

# Setup database
npm run db:migrate --workspace=backend
npm run db:seed --workspace=backend

# Run dev server
npm run dev
```

Frontend akan berjalan di: http://localhost:5173  
Backend akan berjalan di: http://localhost:3000

### Build for Distribution

```bash
# Build Windows installer
npm run launcher:build:win

# Build Linux packages
npm run launcher:build:linux

# Output akan ada di: launcher/dist-electron/
```

---

## 📦 Distribution

Installer siap distribusi ada di:

```
launcher/dist-electron/CBT RSMS Setup 1.0.0.exe
```

**Size**: 76.9 MB  
**Platform**: Windows 10/11 64-bit

Untuk Linux, jalankan `npm run launcher:build:linux` untuk generate `.AppImage` dan `.deb`.

---

## 🤝 Support & Contact

- **Bug Report**: [GitHub Issues](https://github.com/Rangga008/CBT-RSMS/issues)
- **Documentation**: Lihat folder `docs/` atau file `.md` di root
- **Admin Support**: Hubungi administrator sekolah

---

## 📄 Lisensi & Kredit

**CBT RSMS v1.0.0** - Sistem Ujian Online  
Dikembangkan untuk institusi pendidikan di Indonesia

---

## ✅ Checklist Before Distribution

- [ ] Installer executable ada di `launcher/dist-electron/`
- [ ] Ukuran file ~77 MB
- [ ] Bisa jalankan di VM/komputer baru tanpa error
- [ ] Database migration otomatis
- [ ] Frontend built ke backend/public
- [ ] Server bisa distart via PM2
- [ ] Bisa akses dari browser lokal
- [ ] Bisa akses dari komputer lain (LAN)
- [ ] Login dengan admin/admin123 berhasil
- [ ] Dokumentasi sudah diberikan

---

## 🚀 Next Steps

### Untuk Administrator

1. Baca [INSTALL-GUIDE.md](INSTALL-GUIDE.md)
2. Install di komputer sekolah
3. Setup database dan user
4. Bagikan dengan guru/siswa

### Untuk Guru

1. Baca [QUICK-REFERENCE.md](QUICK-REFERENCE.md)
2. Login ke dashboard
3. Buat kelas dan mata pelajaran
4. Upload soal ujian
5. Buat jadwal ujian

### Untuk Siswa

1. Baca [QUICK-REFERENCE.md](QUICK-REFERENCE.md)
2. Login dengan credential dari guru
3. Lihat ujian yang tersedia
4. Ikuti ujian sesuai jadwal

---

**Terakhir Update**: 10 Mei 2026  
**Versi**: 1.0.0  
**Status**: ✅ Production Ready

Semoga aplikasi ini membantu proses ujian di sekolah Anda! 🎓
