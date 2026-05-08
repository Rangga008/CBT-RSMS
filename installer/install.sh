#!/usr/bin/env bash
# ============================================
# CBT RSMS - Installer Otomatis (Linux/macOS)
# ============================================
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

echo ""
echo -e "${CYAN} ============================================="
echo -e "  CBT RSMS - Installer Otomatis (Linux/macOS)"
echo -e " =============================================${NC}"
echo ""

# --- CEK NODE.JS ---
echo -e "[1/7] Mengecek Node.js..."
if ! command -v node &> /dev/null; then
  echo -e "${RED}[ERROR] Node.js tidak ditemukan!${NC}"
  echo "        Install dengan: curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs"
  exit 1
fi
NODE_VER=$(node --version)
echo -e "${GREEN}       Node.js $NODE_VER ditemukan. OK${NC}"

# Cek versi minimum Node 18
NODE_MAJOR=$(echo "$NODE_VER" | cut -d'.' -f1 | tr -d 'v')
if [ "$NODE_MAJOR" -lt 18 ]; then
  echo -e "${RED}[ERROR] Butuh Node.js >= v18. Versi saat ini: $NODE_VER${NC}"
  exit 1
fi

# --- CEK POSTGRESQL ---
echo -e "[2/7] Mengecek PostgreSQL..."
if ! command -v psql &> /dev/null; then
  echo -e "${YELLOW}[PERINGATAN] PostgreSQL tidak ditemukan.${NC}"
  echo "             Install: sudo apt install postgresql postgresql-contrib"
  echo "             Pastikan DATABASE_URL dikonfigurasi di backend/.env"
else
  PG_VER=$(psql --version)
  echo -e "${GREEN}       $PG_VER ditemukan. OK${NC}"
fi

# --- CEK REDIS ---
echo -e "[3/7] Mengecek Redis..."
if ! command -v redis-cli &> /dev/null; then
  echo -e "${YELLOW}[PERINGATAN] Redis tidak ditemukan.${NC}"
  echo "             Install: sudo apt install redis-server && sudo systemctl enable redis-server"
else
  REDIS_VER=$(redis-cli --version)
  echo -e "${GREEN}       $REDIS_VER ditemukan. OK${NC}"
fi

# --- INSTALL DEPENDENCIES ---
echo ""
echo -e "[4/7] Menginstall dependencies npm..."
cd "$ROOT_DIR"
npm install
npm install --workspace=backend
npm install --workspace=frontend
echo -e "${GREEN}       Dependencies berhasil diinstall. OK${NC}"

# --- GENERATE PRISMA CLIENT ---
echo ""
echo -e "[5/7] Generate Prisma Client..."
cd "$ROOT_DIR/backend"
npx prisma generate
echo -e "${GREEN}       Prisma Client berhasil digenerate. OK${NC}"

# --- SETUP FILE .ENV ---
echo ""
echo -e "[6/7] Menyiapkan file konfigurasi .env..."
cd "$ROOT_DIR/backend"
if [ ! -f ".env" ]; then
  cp ".env.example" ".env"
  echo -e "${GREEN}       File backend/.env berhasil dibuat dari .env.example${NC}"
  echo ""
  echo -e "${YELLOW} =================================================================="
  echo "  PENTING: Edit file backend/.env dan isi konfigurasi:"
  echo "  - DATABASE_URL    (koneksi PostgreSQL)"
  echo "  - REDIS_URL       (koneksi Redis)"
  echo "  - JWT_ACCESS_SECRET   (string acak panjang >= 64 karakter)"
  echo "  - JWT_REFRESH_SECRET  (string acak berbeda >= 64 karakter)"
  echo -e " ==================================================================${NC}"
  echo ""
else
  echo "       backend/.env sudah ada, dilewati."
fi

# --- INSTALL PM2 ---
echo ""
echo -e "[7/7] Menginstall PM2 (Process Manager)..."
if ! command -v pm2 &> /dev/null; then
  npm install -g pm2
  echo -e "${GREEN}       PM2 berhasil diinstall.${NC}"
else
  PM2_VER=$(pm2 --version)
  echo -e "${GREEN}       PM2 v$PM2_VER sudah terinstall. OK${NC}"
fi

# Buat startup script PM2
pm2 startup systemd -u "$USER" --hp "$HOME" > /dev/null 2>&1 || true

# --- BUAT ECOSYSTEM PM2 ---
cat > "$ROOT_DIR/ecosystem.config.cjs" << 'EOF'
module.exports = {
  apps: [
    {
      name: 'cbt-rsms-backend',
      script: './backend/src/app.js',
      node_args: '--experimental-vm-modules',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      env: { NODE_ENV: 'production', PORT: 3000 }
    }
  ]
}
EOF
echo -e "${GREEN}       ecosystem.config.cjs berhasil dibuat.${NC}"

# --- SELESAI ---
echo ""
echo -e "${CYAN} ============================================="
echo -e "  Instalasi Selesai!"
echo -e " =============================================${NC}"
echo ""
echo " Langkah selanjutnya:"
echo " 1. Edit backend/.env dengan konfigurasi database Anda"
echo " 2. Buat database: sudo -u postgres createdb cbt_rsms"
echo "    Atau: createdb cbt_rsms (jika user sudah ada)"
echo " 3. Jalankan migrasi: cd backend && npx prisma migrate dev"
echo " 4. Isi data awal: npm run db:seed --workspace=backend"
echo " 5. Development: npm run dev"
echo "    Production: npm run build && pm2 start ecosystem.config.cjs"
echo ""
echo " Akses: http://localhost:5173 (dev) | http://localhost:3000 (prod)"
echo ""
