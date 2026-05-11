# 🔧 Panduan Troubleshooting

Solusi untuk masalah umum saat instalasi atau penggunaan CBT RSMS.

---

## 1️⃣ Instalasi

### ❌ "Node.js tidak ditemukan"

**Penyebab**: Node.js belum terinstall  
**Solusi**:

1. Download Node.js LTS dari: https://nodejs.org
2. Buka file `.msi` yang didownload
3. Klik **Next** sampai selesai (biarkan default)
4. **PENTING**: Centang opsi `Automatically install necessary tools`
5. Tunggu selesai (mungkin butuh download tools tambahan)
6. **Restart komputer**
7. Buka Command Prompt baru dan ketik:

   ```
   node --version
   npm --version
   ```

   Harus menampilkan versi (contoh: v18.14.0)

8. Jalankan ulang installer CBT RSMS

---

### ❌ "PostgreSQL tidak terdeteksi"

**Penyebab**: PostgreSQL belum terinstall atau service tidak berjalan  
**Solusi**:

#### Opsi A: PostgreSQL Belum Terinstall

1. Download PostgreSQL dari: https://www.enterprisedb.com/downloads/postgres-postgresql-installers
2. Pilih **PostgreSQL untuk Windows x86-64** (versi terbaru)
3. Buka file `.exe`, klik **Next**
4. Pada step "Password", ketik password untuk user `postgres`:
   ```
   postgres
   ```
   (Ingat password ini! Dibutuhkan nanti)
5. Port biarkan **5432** (jangan ubah)
6. Locale: **[Default locale]**
7. Pada bagian **Stack Builder**, bisa di-skip (uncheck)
8. Klik **Next** → **Finish**
9. **Restart komputer**
10. Jalankan installer CBT RSMS lagi

#### Opsi B: PostgreSQL Sudah Terinstall Tapi Service Tidak Berjalan

1. Buka **Services** (tekan `Windows + R`, ketik `services.msc`)
2. Cari `postgresql-x64-15` atau `postgresql-x64-16` (versi bisa berbeda)
3. Klik kanan → **Start**
4. Status berubah menjadi **Running**
5. Jalankan installer CBT RSMS lagi

#### Opsi C: Port 5432 Sudah Dipakai

1. Buka Command Prompt sebagai Admin
2. Ketik:
   ```
   netstat -ano | findstr :5432
   ```
3. Jika ada output, ada aplikasi lain yang pakai port ini
4. Uninstall aplikasi tersebut atau ubah port-nya
5. Atau hubungi IT/Admin

---

### ⚠️ "Redis tidak terdeteksi"

**Penyebab**: Redis belum terinstall (tapi opsional)  
**Solusi**: Pilih salah satu:

#### ✅ Opsi 1: Auto-Install (Recommended)

- Saat installer muncul warning, klik tombol **⚡ Auto-install via winget**
- Tunggu selesai
- Restart komputer
- Klik **🔄 Cek Ulang** di installer

#### ✅ Opsi 2: Manual Install (Memurai - Windows Native)

1. Buka: https://www.memurai.com/get-memurai
2. Klik tombol **Download**
3. Buka file `.msi`
4. Klik **Next** sampai selesai (biarkan default)
5. **Restart komputer**
6. Buka Command Prompt, ketik:
   ```
   redis-cli --version
   ```
   Harus menampilkan versi
7. Jalankan installer CBT RSMS lagi

#### ✅ Opsi 3: Skip (Tidak Install)

- Redis adalah optional (untuk cache session)
- CBT RSMS tetap bisa jalan tanpa Redis
- Performa sedikit lebih lambat saat banyak user
- Bisa install nanti kapan saja

---

### ❌ "PM2 tidak ditemukan"

**Penyebab**: Jarang terjadi, PM2 akan diinstall otomatis  
**Solusi**:

1. Buka Command Prompt sebagai **Administrator**
2. Ketik:
   ```
   npm install -g pm2
   ```
3. Tunggu selesai
4. Jalankan ulang installer CBT RSMS

---

## 2️⃣ Server Tidak Jalan

### ❌ Server mati / tidak bisa start

**Solusi**:

1. Buka **Control Panel** CBT RSMS (dari tray atau Start Menu)
2. Lihat bagian **Server Status**
3. Jika **● Berhenti** (merah), klik tombol **▶ Start Server**
4. Tunggu 2-3 detik
5. Scroll ke bawah → **Server Logs**
6. Lihat apakah ada pesan error (biasanya warna merah atau kuning)

**Jika tidak ada error, coba**:

- Klik tombol **🔄 Restart Server**
- Buka browser, refresh halaman

**Jika masih ada error**:

- Baca pesan error dengan teliti
- Cari di troubleshooting ini
- Atau tangkap screenshot → kirim ke admin

---

### ❌ "Tidak bisa buka aplikasi di browser"

**Penyebab**: Server tidak jalan atau port salah  
**Solusi**:

1. **Cek apakah server running**:
   - Buka Control Panel CBT RSMS
   - Status harus **● Berjalan** (hijau)
   - Jika tidak, klik **▶ Start Server**

2. **Cek port yang benar**:
   - Di Control Panel, lihat bagian **Status** → **Port**: (contoh: 3000)
   - Buka browser: `http://localhost:3000`
   - Ganti 3000 dengan port yang ditampilkan

3. **Cek firewall**:
   - Buka **Windows Defender Firewall**
   - Klik **"Allow an app through firewall"**
   - Scroll, cari **Node.js** atau **CBT RSMS**
   - Pastikan **Private** dan **Public** tercentang
   - Klik **OK**

4. **Coba restart browser**:
   - Tutup semua tab browser
   - Buka browser baru
   - Buka `http://localhost:3000` lagi

---

## 3️⃣ Tidak Bisa Akses dari Komputer Lain

### ❌ "Tidak bisa akses http://[IP-SERVER]:3000 dari PC lain"

**Penyebab**: Firewall atau IP salah  
**Solusi**:

#### Step 1: Cek IP Server

1. Buka Control Panel CBT RSMS
2. Lihat bagian **Status** → **Server Address**
3. Contoh: `http://192.168.1.100:3000`
4. Dari PC lain, buka browser dan akses URL tersebut

#### Step 2: Jika Masih Tidak Bisa, Buka Firewall

1. **Buka Windows Defender Firewall**:
   - Tekan `Windows + R`
   - Ketik: `wf.msc`
   - Klik OK

2. **Klik "Inbound Rules"** (kiri atas)

3. **Klik "New Rule"** (kanan atas)

4. Pilih **Port** → **Next**

5. Pilih **TCP** dan ketik port (contoh: **3000**) → **Next**

6. Pilih **Allow the connection** → **Next**

7. Centang **Domain**, **Private**, **Public** → **Next**

8. Beri nama: **CBT RSMS** → **Finish**

9. Dari PC lain, coba akses lagi

#### Step 3: Cek Koneksi Network

- Pastikan PC client dan server ada di **jaringan yang sama**
- Coba ping server:

  ```
  ping 192.168.1.100
  ```

  (ganti IP dengan IP server)

- Jika "Reply from..." → network ok
- Jika "Request timed out" → PC tidak terhubung

---

## 4️⃣ Login & Authentication

### ❌ "Lupa password admin"

**Solusi**: Reset melalui database

1. Buka **pgAdmin** atau Command Prompt sebagai Admin:

   ```
   cd "C:\Program Files\PostgreSQL\15\bin"
   psql -U postgres -d cbt_rsms
   ```

2. Ketik query untuk reset password admin:
   ```sql
   UPDATE "User" SET password = '$2a$10$SaltedHashPasswordHere'
   WHERE username = 'admin';
   ```
   (Ini agak rumit, hubungi admin untuk yang lebih mudah)

**Cara Termudah**: Hubungi admin/IT → minta mereka reset password

---

### ❌ "Tidak bisa login, error 401/403"

**Penyebab**: Credential salah atau user belum dibuat  
**Solusi**:

1. Pastikan menggunakan username yang benar
   - Default: **admin** / **admin123**
   - Besar-kecil huruf penting!

2. Jika tetap tidak bisa:
   - Refresh halaman (Ctrl + F5)
   - Buka Private/Incognito window (bersihkan cache)
   - Coba di browser lain

3. Jika admin tidak ada:
   - Hubungi yang install untuk bikin admin baru

---

## 5️⃣ Database & Data

### ❌ "Database error / corrupted"

**Penyebab**: Proses interrupt atau disk penuh  
**Solusi**:

#### Opsi A: Coba Restart (Teraman)

1. Buka Control Panel
2. Klik **🔄 Restart Server**
3. Tunggu 5 detik
4. Refresh browser

#### Opsi B: Database Reset (HATI-HATI - Hapus semua data!)

```powershell
# Command Prompt as Admin
cd C:\Users\YourName\AppData\Local\Programs\CBT RSMS\backend

# Reset database (⚠️ HAPUS SEMUA DATA)
npx prisma migrate reset

# Jalankan server kembali dari Control Panel
```

#### Opsi C: Hubungi Admin

- Jangan coba-coba jika tidak tahu
- Admin bisa restore dari backup

---

### ❌ "Disk penuh, aplikasi crash"

**Penyebab**: Upload file terlalu banyak atau OS penuh  
**Solusi**:

1. Buka **File Explorer**
2. Klik kanan **C: Drive** → **Properties**
3. Lihat berapa sisa space
4. Jika kurang dari 500 MB:
   - Hapus file/folder yang tidak perlu
   - Atau hubungi IT untuk upgrade disk

---

## 6️⃣ Lainnya

### ❌ "Aplikasi sangat lambat"

**Penyebab**: RAM/CPU penuh atau network lambat  
**Solusi**:

1. **Cek RAM usage**:
   - Buka Task Manager (Ctrl + Shift + Esc)
   - Lihat kolom "Memory"
   - Jika >90%, close aplikasi lain

2. **Cek CPU usage**:
   - Di Task Manager, lihat kolom "CPU"
   - Jika >80%, restart server atau PC

3. **Cek Network**:
   - Test speed: https://speedtest.net
   - Jika <1 Mbps, hubungi ISP/IT

---

### ❌ "Upload gambar error"

**Penyebab**: File terlalu besar atau format salah  
**Solusi**:

1. **Cek ukuran file**:
   - Max size: **5 MB** per file
   - Jika lebih besar, compress dengan:
     - Adobe Lightroom
     - Online: https://tinypng.com

2. **Cek format**:
   - Format support: **JPG, PNG, GIF, WebP**
   - Jangan upload TIFF, BMP, atau format lain

3. **Cek disk space**:
   - Jika disk penuh (lihat di C: Properties)
   - Hapus file lama atau hubungi IT

---

### ❌ "Update/upgrade gagal"

**Penyebab**: Update package error atau conflict  
**Solusi**:

1. Buka Command Prompt sebagai Admin:

   ```
   cd C:\Users\YourName\AppData\Local\Programs\CBT RSMS
   npm cache clean --force
   npm install
   ```

2. Restart server

3. Jika masih gagal, hubungi admin untuk full reinstall

---

## 📞 Tidak Ada Solusi?

**Kumpulkan informasi ini**:

1. Screenshot error message (klik Print Screen)
2. File dari **Control Panel** → **📁 Open App Data** → Cari file `.log`
3. Waktu error terjadi (jam berapa?)
4. Apa yang dilakukan sebelum error?

**Kirim ke**:

- Admin sekolah
- IT support
- Developer (dengan informasi lengkap)

---

**Versi**: 1.0.0  
**Update**: 10 Mei 2026
