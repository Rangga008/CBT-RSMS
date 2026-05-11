# ⚡ MULAI CEPAT (Print Ini!)

**Panduan 1 halaman untuk instalasi & penggunaan CBT RSMS**

---

## 📥 INSTALASI (5 menit)

### 1. Download

- Dapatkan file: **`CBT RSMS Setup 1.0.0.exe`** (77 MB)
- Simpan di **Desktop** atau folder manapun

### 2. Double-Click & Install

```
CBT RSMS Setup 1.0.0.exe
  ↓
[Klik: Izinkan / Allow]
  ↓
Wizard Setup (5 step)
  ↓
Klik: Lanjut → Lanjut → ... → Finish
```

### 3. Tunggu (10-15 menit)

Log akan menampilkan:

- ✅ npm install
- ✅ Database migrate
- ✅ Build frontend
- ✅ Server started

**JANGAN TUTUP WINDOW!**

### 4. Selesai!

Aplikasi siap digunakan

---

## 🚀 JALANKAN APLIKASI

### Pertama Kali (Setelah Install)

```
Windows Start Menu
  ↓
Cari: "CBT RSMS"
  ↓
Klik: Buka
```

### Lain Kali (Otomatis di Background)

- Klik **2x icon CBT** di tray (kanan taskbar)
- Atau dari **Start Menu** → **CBT RSMS**

---

## 🌐 AKSES APLIKASI

### Dari Komputer Ini

```
Buka Browser (Chrome, Edge, Firefox)
  ↓
Ketik di address bar:
  http://localhost:3000
  ↓
Enter
```

### Dari Komputer Lain (Lab)

```
Buka Browser
  ↓
Ketik:
  http://192.168.1.100:3000
  (ganti IP sesuai yang diinstruksikan saat install)
  ↓
Enter
```

---

## 🔐 LOGIN PERTAMA KALI

| Field    | Isi        |
| -------- | ---------- |
| **User** | `admin`    |
| **Pass** | `admin123` |

⚠️ **UBAH PASSWORD SEGERA SETELAH LOGIN!**

---

## 📊 MENU UTAMA

```
┌─────────────────────────────────────────┐
│ Dashboard                (Ringkasan)     │
├─────────────────────────────────────────┤
│ Master Data                             │
│   ├─ Pengguna (guru, siswa, admin)     │
│   ├─ Kelas                              │
│   └─ Mata Pelajaran                    │
├─────────────────────────────────────────┤
│ Ujian                                   │
│   ├─ Soal (buat soal)                  │
│   ├─ Ujian (buat ujian, atur jadwal)   │
│   └─ Konfigurasi (logo, background)    │
├─────────────────────────────────────────┤
│ Galeri Gambar (upload foto soal)        │
├─────────────────────────────────────────┤
│ IP Management (keamanan jaringan)       │
├─────────────────────────────────────────┤
│ Pengaturan Sistem (backup, settings)    │
└─────────────────────────────────────────┘
```

---

## 🆘 MASALAH CEPAT?

| Masalah                     | Solusi                                                            |
| --------------------------- | ----------------------------------------------------------------- |
| **Tidak bisa buka browser** | Lihat Control Panel: status harus hijau ✓ Klik "Start" jika merah |
| **Server mati**             | Buka Control Panel → tombol **▶ Start Server**                    |
| **Lupa password**           | Hubungi admin untuk reset                                         |
| **Lambat**                  | Restart server (tombol 🔄)                                        |
| **Tidak bisa dari PC lain** | Hubungi IT: perlu firewall exception                              |

**Masalah lain?** Lihat file: **`TROUBLESHOOTING.md`**

---

## 🎮 CONTROL PANEL (Pengaturan Server)

Buka kapan saja:

- **Start Menu** → **CBT RSMS** → Control Panel

Fitur:

- 🟢 **Status Server** (Berjalan/Berhenti)
- ▶️ **Start/Stop Server** (tombol besar)
- 📜 **Server Logs** (lihat error/info)
- ⚙️ **Server Config** (ubah port, IP mode)
- 🌐 **IP Whitelist** (manage IP yang boleh akses)

---

## 📋 CHECKLIST INSTALASI OK

- ✅ Installer berjalan tanpa error
- ✅ Semua step selesai (sampai "Selesai!")
- ✅ Server status: **● Berjalan** (hijau)
- ✅ Bisa akses: `http://localhost:3000`
- ✅ Bisa login (admin / admin123)
- ✅ Dashboard muncul

**Jika semua ✅ → BERHASIL! 🎉**

---

## 💡 PRO TIPS

1. **Backup data rutin**:
   - Hubungi IT untuk backup database setiap minggu

2. **Performa**:
   - Jangan semua siswa ujian bersamaan di hari pertama
   - Mulai dengan 1-2 kelas, monitor performa

3. **Security**:
   - Ubah password admin segera
   - Mode IP: gunakan Whitelist jika ada ujian penting

4. **Update**:
   - Admin akan kabari jika ada update
   - Backup dulu sebelum update

---

## 📞 KONTAK BANTUAN

- **Admin Sekolah**: [Nama Admin]
- **IT Support**: [Email/No HP IT]
- **Developer**: [Email]

---

**Versi 1.0 — 10 Mei 2026**
