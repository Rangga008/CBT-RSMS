# CBT RSMS Launcher & Installer

Panduan ini untuk distribusi ke komputer lain menggunakan launcher Electron.

## Ringkasan Arsitektur

- Launcher: aplikasi desktop untuk setup + kontrol service.
- Backend: Fastify (`backend/src/app.js`).
- Frontend: dibuild ke `backend/public`.
- Database: PostgreSQL.
- Cache/session: Redis (opsional tapi direkomendasikan).

## Build Installer (Windows)

Jalankan dari root project:

```bash
npm run launcher:build:win
```

Output installer ada di:

- `launcher/dist-electron/*.exe`

## Build Installer (Linux)

Jalankan dari root project:

```bash
npm run launcher:build:linux
```

Output ada di:

- `launcher/dist-electron/*.AppImage`
- `launcher/dist-electron/*.deb`

## Alur Instalasi di Komputer Target

1. Install launcher (`.exe` / `.AppImage` / `.deb`).
2. Jalankan launcher sebagai Administrator (Windows).
3. Ikuti wizard:

- Cek dependency (Node.js, PostgreSQL, Redis).
- Isi konfigurasi DB.
- Pilih IP/port.
- Jalankan instalasi otomatis.

4. Setelah selesai, klik `Buka Control Panel`.
5. Dari dashboard launcher, gunakan `Start/Stop/Restart` untuk server.

## Catatan Penting

- Launcher akan mencoba start/stop service PostgreSQL & Redis secara best effort.
- Jika service name PostgreSQL berbeda di Windows, tetap bisa dijalankan manual lewat `services.msc`.
- PM2 dipakai untuk menjalankan backend production.
- Frontend selalu dibuild ke `backend/public` saat proses install.

## Troubleshooting Singkat

- `Node.js tidak ditemukan`: install Node.js LTS dan restart komputer.
- `Migrasi gagal`: cek kredensial PostgreSQL di step database.
- `Redis tidak terdeteksi`: install Memurai/Redis lalu ulangi cek dependency.
- Aplikasi tidak bisa diakses LAN: pastikan firewall membuka port yang dipakai (default 3000).
