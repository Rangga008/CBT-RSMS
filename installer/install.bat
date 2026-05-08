@echo off
SETLOCAL ENABLEDELAYEDEXPANSION
title CBT RSMS - Installer
color 0A

echo.
echo  =========================================
echo   CBT RSMS - Installer Otomatis (Windows)
echo  =========================================
echo.

:: --- CEK NODE.JS ---
echo [1/7] Mengecek Node.js...
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Node.js tidak ditemukan!
  echo         Unduh di: https://nodejs.org (gunakan versi LTS ^>= 18)
  pause & exit /b 1
)
FOR /F "tokens=*" %%i IN ('node --version') DO SET NODE_VER=%%i
echo        Node.js %NODE_VER% ditemukan. OK

:: --- CEK NPM ---
npm --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo [ERROR] npm tidak ditemukan. Pastikan Node.js terinstall dengan benar.
  pause & exit /b 1
)

:: --- CEK POSTGRESQL ---
echo [2/7] Mengecek PostgreSQL...
psql --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo [PERINGATAN] psql tidak ada di PATH.
  echo              Pastikan PostgreSQL sudah diinstall dan konfigurasi DATABASE_URL di backend\.env
  echo              Download: https://www.postgresql.org/download/windows/
  echo.
) ELSE (
  FOR /F "tokens=*" %%i IN ('psql --version') DO SET PG_VER=%%i
  echo        %PG_VER% ditemukan. OK
)

:: --- CEK REDIS ---
echo [3/7] Mengecek Redis...
redis-cli --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  echo [PERINGATAN] Redis tidak ditemukan di PATH.
  echo              Download Redis for Windows: https://github.com/microsoftarchive/redis/releases
  echo              Atau gunakan WSL2 dengan: sudo apt install redis-server
  echo.
) ELSE (
  FOR /F "tokens=*" %%i IN ('redis-cli --version') DO SET REDIS_VER=%%i
  echo        %REDIS_VER% ditemukan. OK
)

:: --- INSTALL DEPENDENCIES ---
echo.
echo [4/7] Menginstall dependencies npm...
cd /d "%~dp0"
call npm install
IF %ERRORLEVEL% NEQ 0 (echo [ERROR] npm install gagal & pause & exit /b 1)

call npm install --workspace=backend
IF %ERRORLEVEL% NEQ 0 (echo [ERROR] npm install backend gagal & pause & exit /b 1)

call npm install --workspace=frontend
IF %ERRORLEVEL% NEQ 0 (echo [ERROR] npm install frontend gagal & pause & exit /b 1)
echo        Dependencies berhasil diinstall. OK

:: --- GENERATE PRISMA CLIENT ---
echo.
echo [5/7] Generate Prisma Client...
cd /d "%~dp0backend"
call npx prisma generate
IF %ERRORLEVEL% NEQ 0 (echo [ERROR] Prisma generate gagal & pause & exit /b 1)
echo        Prisma Client berhasil digenerate. OK

:: --- SETUP FILE .ENV ---
echo.
echo [6/7] Menyiapkan file konfigurasi .env...
cd /d "%~dp0backend"
IF NOT EXIST ".env" (
  copy ".env.example" ".env"
  echo        File backend\.env berhasil dibuat dari .env.example
  echo.
  echo  =====================================================================
  echo   PENTING: Edit file backend\.env dan isi konfigurasi berikut:
  echo   - DATABASE_URL   ^(koneksi PostgreSQL^)
  echo   - REDIS_URL      ^(koneksi Redis^)
  echo   - JWT_ACCESS_SECRET   ^(string acak panjang^)
  echo   - JWT_REFRESH_SECRET  ^(string acak berbeda^)
  echo  =====================================================================
  echo.
) ELSE (
  echo        backend\.env sudah ada, dilewati.
)

:: --- INSTALL PM2 ---
echo.
echo [7/7] Menginstall PM2 (Process Manager)...
pm2 --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
  call npm install -g pm2
  echo        PM2 berhasil diinstall.
) ELSE (
  FOR /F "tokens=*" %%i IN ('pm2 --version') DO SET PM2_VER=%%i
  echo        PM2 %PM2_VER% sudah terinstall. OK
)

:: --- SELESAI ---
echo.
echo  =========================================
echo   Instalasi Selesai!
echo  =========================================
echo.
echo  Langkah selanjutnya:
echo  1. Edit backend\.env dengan konfigurasi database Anda
echo  2. Buat database PostgreSQL: createdb cbt_rsms
echo  3. Jalankan migrasi: cd backend ^& npx prisma migrate dev
echo  4. Isi data awal: cd backend ^& npm run db:seed
echo  5. Jalankan aplikasi: npm run dev (development)
echo     Atau: npm run start:pm2 (production dengan PM2)
echo.
echo  Akses aplikasi di: http://localhost:5173 (dev) atau http://localhost:3000 (prod)
echo.
pause
