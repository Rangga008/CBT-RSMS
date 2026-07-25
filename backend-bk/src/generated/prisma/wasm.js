
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  nama: 'nama',
  password: 'password',
  role: 'role',
  kelas: 'kelas',
  isActive: 'isActive',
  displayPassword: 'displayPassword',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SessionScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  expiresAt: 'expiresAt',
  ipAddress: 'ipAddress',
  userAgent: 'userAgent',
  createdAt: 'createdAt'
};

exports.Prisma.SiswaScalarFieldEnum = {
  id: 'id',
  nisn: 'nisn',
  nama: 'nama',
  jenisKelamin: 'jenisKelamin',
  tanggalLahir: 'tanggalLahir',
  agama: 'agama',
  namaAyah: 'namaAyah',
  namaIbu: 'namaIbu',
  noHp: 'noHp',
  kelas: 'kelas',
  alamat: 'alamat',
  fotoUrl: 'fotoUrl',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.AbsensiScalarFieldEnum = {
  id: 'id',
  tanggal: 'tanggal',
  siswaNisn: 'siswaNisn',
  namaSnapshot: 'namaSnapshot',
  kelasSnapshot: 'kelasSnapshot',
  jamDatang: 'jamDatang',
  jamPulang: 'jamPulang',
  jamSholat: 'jamSholat',
  status: 'status',
  keterangan: 'keterangan',
  catatan: 'catatan',
  inputBy: 'inputBy',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.HariLiburScalarFieldEnum = {
  id: 'id',
  tanggal: 'tanggal',
  keterangan: 'keterangan',
  createdAt: 'createdAt'
};

exports.Prisma.AppConfigScalarFieldEnum = {
  key: 'key',
  value: 'value',
  updatedAt: 'updatedAt'
};

exports.Prisma.JenisPelanggaranScalarFieldEnum = {
  id: 'id',
  kode: 'kode',
  nama: 'nama',
  kategori: 'kategori',
  poin: 'poin',
  deskripsi: 'deskripsi',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JenisPrestasiScalarFieldEnum = {
  id: 'id',
  kode: 'kode',
  nama: 'nama',
  kategori: 'kategori',
  poin: 'poin',
  deskripsi: 'deskripsi',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JenisKasusScalarFieldEnum = {
  id: 'id',
  kode: 'kode',
  nama: 'nama',
  deskripsi: 'deskripsi',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PoinSiswaScalarFieldEnum = {
  id: 'id',
  siswaNisn: 'siswaNisn',
  tipe: 'tipe',
  jenisPrestasiId: 'jenisPrestasiId',
  jenisPelanggaranId: 'jenisPelanggaranId',
  poin: 'poin',
  deskripsi: 'deskripsi',
  tanggal: 'tanggal',
  tingkat: 'tingkat',
  inputBy: 'inputBy',
  dokumenUrl: 'dokumenUrl',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KasusSiswaScalarFieldEnum = {
  id: 'id',
  nomor: 'nomor',
  siswaNisn: 'siswaNisn',
  jenisKasusId: 'jenisKasusId',
  jenisPelanggaranId: 'jenisPelanggaranId',
  tanggal: 'tanggal',
  deskripsi: 'deskripsi',
  status: 'status',
  penanganan: 'penanganan',
  catatan: 'catatan',
  inputBy: 'inputBy',
  dokumenList: 'dokumenList',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.LaporanKasusScalarFieldEnum = {
  id: 'id',
  kasusId: 'kasusId',
  tanggal: 'tanggal',
  catatan: 'catatan',
  status: 'status',
  inputBy: 'inputBy',
  createdAt: 'createdAt'
};

exports.Prisma.KunjunganRumahScalarFieldEnum = {
  id: 'id',
  nomor: 'nomor',
  siswaNisn: 'siswaNisn',
  tanggal: 'tanggal',
  tujuan: 'tujuan',
  petugasBk: 'petugasBk',
  status: 'status',
  hasilKunjungan: 'hasilKunjungan',
  catatan: 'catatan',
  dokumenList: 'dokumenList',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.KelasScalarFieldEnum = {
  id: 'id',
  nama: 'nama'
};

exports.Prisma.MapelScalarFieldEnum = {
  id: 'id',
  nama: 'nama'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.UserRole = exports.$Enums.UserRole = {
  admin: 'admin',
  bk: 'bk',
  guru: 'guru',
  siswa: 'siswa'
};

exports.StatusAbsensi = exports.$Enums.StatusAbsensi = {
  Hadir: 'Hadir',
  Sakit: 'Sakit',
  Izin: 'Izin',
  Alpa: 'Alpa'
};

exports.KategoriPelanggaran = exports.$Enums.KategoriPelanggaran = {
  ringan: 'ringan',
  sedang: 'sedang',
  berat: 'berat',
  sangat_berat: 'sangat_berat'
};

exports.KategoriPrestasi = exports.$Enums.KategoriPrestasi = {
  akademik: 'akademik',
  non_akademik: 'non_akademik',
  olahraga: 'olahraga',
  seni: 'seni',
  keagamaan: 'keagamaan',
  organisasi: 'organisasi'
};

exports.TipePoin = exports.$Enums.TipePoin = {
  PRESTASI: 'PRESTASI',
  PELANGGARAN: 'PELANGGARAN'
};

exports.StatusKasus = exports.$Enums.StatusKasus = {
  Baru: 'Baru',
  Proses: 'Proses',
  Selesai: 'Selesai',
  Ditutup: 'Ditutup'
};

exports.StatusKunjungan = exports.$Enums.StatusKunjungan = {
  Rencana: 'Rencana',
  Berlangsung: 'Berlangsung',
  Selesai: 'Selesai',
  Dibatalkan: 'Dibatalkan'
};

exports.Prisma.ModelName = {
  User: 'User',
  Session: 'Session',
  Siswa: 'Siswa',
  Absensi: 'Absensi',
  HariLibur: 'HariLibur',
  AppConfig: 'AppConfig',
  JenisPelanggaran: 'JenisPelanggaran',
  JenisPrestasi: 'JenisPrestasi',
  JenisKasus: 'JenisKasus',
  PoinSiswa: 'PoinSiswa',
  KasusSiswa: 'KasusSiswa',
  LaporanKasus: 'LaporanKasus',
  KunjunganRumah: 'KunjunganRumah',
  Kelas: 'Kelas',
  Mapel: 'Mapel'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
