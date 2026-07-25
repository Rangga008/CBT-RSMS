
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Siswa
 * 
 */
export type Siswa = $Result.DefaultSelection<Prisma.$SiswaPayload>
/**
 * Model Absensi
 * 
 */
export type Absensi = $Result.DefaultSelection<Prisma.$AbsensiPayload>
/**
 * Model HariLibur
 * 
 */
export type HariLibur = $Result.DefaultSelection<Prisma.$HariLiburPayload>
/**
 * Model AppConfig
 * 
 */
export type AppConfig = $Result.DefaultSelection<Prisma.$AppConfigPayload>
/**
 * Model JenisPelanggaran
 * 
 */
export type JenisPelanggaran = $Result.DefaultSelection<Prisma.$JenisPelanggaranPayload>
/**
 * Model JenisPrestasi
 * 
 */
export type JenisPrestasi = $Result.DefaultSelection<Prisma.$JenisPrestasiPayload>
/**
 * Model JenisKasus
 * 
 */
export type JenisKasus = $Result.DefaultSelection<Prisma.$JenisKasusPayload>
/**
 * Model PoinSiswa
 * 
 */
export type PoinSiswa = $Result.DefaultSelection<Prisma.$PoinSiswaPayload>
/**
 * Model KasusSiswa
 * 
 */
export type KasusSiswa = $Result.DefaultSelection<Prisma.$KasusSiswaPayload>
/**
 * Model LaporanKasus
 * 
 */
export type LaporanKasus = $Result.DefaultSelection<Prisma.$LaporanKasusPayload>
/**
 * Model KunjunganRumah
 * 
 */
export type KunjunganRumah = $Result.DefaultSelection<Prisma.$KunjunganRumahPayload>
/**
 * Model Kelas
 * 
 */
export type Kelas = $Result.DefaultSelection<Prisma.$KelasPayload>
/**
 * Model Mapel
 * 
 */
export type Mapel = $Result.DefaultSelection<Prisma.$MapelPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  admin: 'admin',
  bk: 'bk',
  guru: 'guru',
  siswa: 'siswa'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const StatusAbsensi: {
  Hadir: 'Hadir',
  Sakit: 'Sakit',
  Izin: 'Izin',
  Alpa: 'Alpa'
};

export type StatusAbsensi = (typeof StatusAbsensi)[keyof typeof StatusAbsensi]


export const KategoriPelanggaran: {
  ringan: 'ringan',
  sedang: 'sedang',
  berat: 'berat',
  sangat_berat: 'sangat_berat'
};

export type KategoriPelanggaran = (typeof KategoriPelanggaran)[keyof typeof KategoriPelanggaran]


export const KategoriPrestasi: {
  akademik: 'akademik',
  non_akademik: 'non_akademik',
  olahraga: 'olahraga',
  seni: 'seni',
  keagamaan: 'keagamaan',
  organisasi: 'organisasi'
};

export type KategoriPrestasi = (typeof KategoriPrestasi)[keyof typeof KategoriPrestasi]


export const TipePoin: {
  PRESTASI: 'PRESTASI',
  PELANGGARAN: 'PELANGGARAN'
};

export type TipePoin = (typeof TipePoin)[keyof typeof TipePoin]


export const StatusKasus: {
  Baru: 'Baru',
  Proses: 'Proses',
  Selesai: 'Selesai',
  Ditutup: 'Ditutup'
};

export type StatusKasus = (typeof StatusKasus)[keyof typeof StatusKasus]


export const StatusKunjungan: {
  Rencana: 'Rencana',
  Berlangsung: 'Berlangsung',
  Selesai: 'Selesai',
  Dibatalkan: 'Dibatalkan'
};

export type StatusKunjungan = (typeof StatusKunjungan)[keyof typeof StatusKunjungan]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type StatusAbsensi = $Enums.StatusAbsensi

export const StatusAbsensi: typeof $Enums.StatusAbsensi

export type KategoriPelanggaran = $Enums.KategoriPelanggaran

export const KategoriPelanggaran: typeof $Enums.KategoriPelanggaran

export type KategoriPrestasi = $Enums.KategoriPrestasi

export const KategoriPrestasi: typeof $Enums.KategoriPrestasi

export type TipePoin = $Enums.TipePoin

export const TipePoin: typeof $Enums.TipePoin

export type StatusKasus = $Enums.StatusKasus

export const StatusKasus: typeof $Enums.StatusKasus

export type StatusKunjungan = $Enums.StatusKunjungan

export const StatusKunjungan: typeof $Enums.StatusKunjungan

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs>;

  /**
   * `prisma.siswa`: Exposes CRUD operations for the **Siswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Siswas
    * const siswas = await prisma.siswa.findMany()
    * ```
    */
  get siswa(): Prisma.SiswaDelegate<ExtArgs>;

  /**
   * `prisma.absensi`: Exposes CRUD operations for the **Absensi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Absensis
    * const absensis = await prisma.absensi.findMany()
    * ```
    */
  get absensi(): Prisma.AbsensiDelegate<ExtArgs>;

  /**
   * `prisma.hariLibur`: Exposes CRUD operations for the **HariLibur** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HariLiburs
    * const hariLiburs = await prisma.hariLibur.findMany()
    * ```
    */
  get hariLibur(): Prisma.HariLiburDelegate<ExtArgs>;

  /**
   * `prisma.appConfig`: Exposes CRUD operations for the **AppConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AppConfigs
    * const appConfigs = await prisma.appConfig.findMany()
    * ```
    */
  get appConfig(): Prisma.AppConfigDelegate<ExtArgs>;

  /**
   * `prisma.jenisPelanggaran`: Exposes CRUD operations for the **JenisPelanggaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JenisPelanggarans
    * const jenisPelanggarans = await prisma.jenisPelanggaran.findMany()
    * ```
    */
  get jenisPelanggaran(): Prisma.JenisPelanggaranDelegate<ExtArgs>;

  /**
   * `prisma.jenisPrestasi`: Exposes CRUD operations for the **JenisPrestasi** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JenisPrestasis
    * const jenisPrestasis = await prisma.jenisPrestasi.findMany()
    * ```
    */
  get jenisPrestasi(): Prisma.JenisPrestasiDelegate<ExtArgs>;

  /**
   * `prisma.jenisKasus`: Exposes CRUD operations for the **JenisKasus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JenisKasuses
    * const jenisKasuses = await prisma.jenisKasus.findMany()
    * ```
    */
  get jenisKasus(): Prisma.JenisKasusDelegate<ExtArgs>;

  /**
   * `prisma.poinSiswa`: Exposes CRUD operations for the **PoinSiswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PoinSiswas
    * const poinSiswas = await prisma.poinSiswa.findMany()
    * ```
    */
  get poinSiswa(): Prisma.PoinSiswaDelegate<ExtArgs>;

  /**
   * `prisma.kasusSiswa`: Exposes CRUD operations for the **KasusSiswa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KasusSiswas
    * const kasusSiswas = await prisma.kasusSiswa.findMany()
    * ```
    */
  get kasusSiswa(): Prisma.KasusSiswaDelegate<ExtArgs>;

  /**
   * `prisma.laporanKasus`: Exposes CRUD operations for the **LaporanKasus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LaporanKasuses
    * const laporanKasuses = await prisma.laporanKasus.findMany()
    * ```
    */
  get laporanKasus(): Prisma.LaporanKasusDelegate<ExtArgs>;

  /**
   * `prisma.kunjunganRumah`: Exposes CRUD operations for the **KunjunganRumah** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more KunjunganRumahs
    * const kunjunganRumahs = await prisma.kunjunganRumah.findMany()
    * ```
    */
  get kunjunganRumah(): Prisma.KunjunganRumahDelegate<ExtArgs>;

  /**
   * `prisma.kelas`: Exposes CRUD operations for the **Kelas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Kelas
    * const kelas = await prisma.kelas.findMany()
    * ```
    */
  get kelas(): Prisma.KelasDelegate<ExtArgs>;

  /**
   * `prisma.mapel`: Exposes CRUD operations for the **Mapel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mapels
    * const mapels = await prisma.mapel.findMany()
    * ```
    */
  get mapel(): Prisma.MapelDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "session" | "siswa" | "absensi" | "hariLibur" | "appConfig" | "jenisPelanggaran" | "jenisPrestasi" | "jenisKasus" | "poinSiswa" | "kasusSiswa" | "laporanKasus" | "kunjunganRumah" | "kelas" | "mapel"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Siswa: {
        payload: Prisma.$SiswaPayload<ExtArgs>
        fields: Prisma.SiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          findFirst: {
            args: Prisma.SiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          findMany: {
            args: Prisma.SiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>[]
          }
          create: {
            args: Prisma.SiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          createMany: {
            args: Prisma.SiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SiswaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>[]
          }
          delete: {
            args: Prisma.SiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          update: {
            args: Prisma.SiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          deleteMany: {
            args: Prisma.SiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SiswaPayload>
          }
          aggregate: {
            args: Prisma.SiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSiswa>
          }
          groupBy: {
            args: Prisma.SiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<SiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.SiswaCountArgs<ExtArgs>
            result: $Utils.Optional<SiswaCountAggregateOutputType> | number
          }
        }
      }
      Absensi: {
        payload: Prisma.$AbsensiPayload<ExtArgs>
        fields: Prisma.AbsensiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AbsensiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AbsensiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          findFirst: {
            args: Prisma.AbsensiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AbsensiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          findMany: {
            args: Prisma.AbsensiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>[]
          }
          create: {
            args: Prisma.AbsensiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          createMany: {
            args: Prisma.AbsensiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AbsensiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>[]
          }
          delete: {
            args: Prisma.AbsensiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          update: {
            args: Prisma.AbsensiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          deleteMany: {
            args: Prisma.AbsensiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AbsensiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AbsensiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsensiPayload>
          }
          aggregate: {
            args: Prisma.AbsensiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAbsensi>
          }
          groupBy: {
            args: Prisma.AbsensiGroupByArgs<ExtArgs>
            result: $Utils.Optional<AbsensiGroupByOutputType>[]
          }
          count: {
            args: Prisma.AbsensiCountArgs<ExtArgs>
            result: $Utils.Optional<AbsensiCountAggregateOutputType> | number
          }
        }
      }
      HariLibur: {
        payload: Prisma.$HariLiburPayload<ExtArgs>
        fields: Prisma.HariLiburFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HariLiburFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HariLiburFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>
          }
          findFirst: {
            args: Prisma.HariLiburFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HariLiburFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>
          }
          findMany: {
            args: Prisma.HariLiburFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>[]
          }
          create: {
            args: Prisma.HariLiburCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>
          }
          createMany: {
            args: Prisma.HariLiburCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HariLiburCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>[]
          }
          delete: {
            args: Prisma.HariLiburDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>
          }
          update: {
            args: Prisma.HariLiburUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>
          }
          deleteMany: {
            args: Prisma.HariLiburDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HariLiburUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HariLiburUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HariLiburPayload>
          }
          aggregate: {
            args: Prisma.HariLiburAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHariLibur>
          }
          groupBy: {
            args: Prisma.HariLiburGroupByArgs<ExtArgs>
            result: $Utils.Optional<HariLiburGroupByOutputType>[]
          }
          count: {
            args: Prisma.HariLiburCountArgs<ExtArgs>
            result: $Utils.Optional<HariLiburCountAggregateOutputType> | number
          }
        }
      }
      AppConfig: {
        payload: Prisma.$AppConfigPayload<ExtArgs>
        fields: Prisma.AppConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findFirst: {
            args: Prisma.AppConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          findMany: {
            args: Prisma.AppConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          create: {
            args: Prisma.AppConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          createMany: {
            args: Prisma.AppConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AppConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>[]
          }
          delete: {
            args: Prisma.AppConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          update: {
            args: Prisma.AppConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          deleteMany: {
            args: Prisma.AppConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppConfigPayload>
          }
          aggregate: {
            args: Prisma.AppConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppConfig>
          }
          groupBy: {
            args: Prisma.AppConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppConfigCountArgs<ExtArgs>
            result: $Utils.Optional<AppConfigCountAggregateOutputType> | number
          }
        }
      }
      JenisPelanggaran: {
        payload: Prisma.$JenisPelanggaranPayload<ExtArgs>
        fields: Prisma.JenisPelanggaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JenisPelanggaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JenisPelanggaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>
          }
          findFirst: {
            args: Prisma.JenisPelanggaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JenisPelanggaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>
          }
          findMany: {
            args: Prisma.JenisPelanggaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>[]
          }
          create: {
            args: Prisma.JenisPelanggaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>
          }
          createMany: {
            args: Prisma.JenisPelanggaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JenisPelanggaranCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>[]
          }
          delete: {
            args: Prisma.JenisPelanggaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>
          }
          update: {
            args: Prisma.JenisPelanggaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>
          }
          deleteMany: {
            args: Prisma.JenisPelanggaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JenisPelanggaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JenisPelanggaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPelanggaranPayload>
          }
          aggregate: {
            args: Prisma.JenisPelanggaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJenisPelanggaran>
          }
          groupBy: {
            args: Prisma.JenisPelanggaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<JenisPelanggaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.JenisPelanggaranCountArgs<ExtArgs>
            result: $Utils.Optional<JenisPelanggaranCountAggregateOutputType> | number
          }
        }
      }
      JenisPrestasi: {
        payload: Prisma.$JenisPrestasiPayload<ExtArgs>
        fields: Prisma.JenisPrestasiFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JenisPrestasiFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JenisPrestasiFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>
          }
          findFirst: {
            args: Prisma.JenisPrestasiFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JenisPrestasiFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>
          }
          findMany: {
            args: Prisma.JenisPrestasiFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>[]
          }
          create: {
            args: Prisma.JenisPrestasiCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>
          }
          createMany: {
            args: Prisma.JenisPrestasiCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JenisPrestasiCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>[]
          }
          delete: {
            args: Prisma.JenisPrestasiDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>
          }
          update: {
            args: Prisma.JenisPrestasiUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>
          }
          deleteMany: {
            args: Prisma.JenisPrestasiDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JenisPrestasiUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JenisPrestasiUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisPrestasiPayload>
          }
          aggregate: {
            args: Prisma.JenisPrestasiAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJenisPrestasi>
          }
          groupBy: {
            args: Prisma.JenisPrestasiGroupByArgs<ExtArgs>
            result: $Utils.Optional<JenisPrestasiGroupByOutputType>[]
          }
          count: {
            args: Prisma.JenisPrestasiCountArgs<ExtArgs>
            result: $Utils.Optional<JenisPrestasiCountAggregateOutputType> | number
          }
        }
      }
      JenisKasus: {
        payload: Prisma.$JenisKasusPayload<ExtArgs>
        fields: Prisma.JenisKasusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JenisKasusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JenisKasusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>
          }
          findFirst: {
            args: Prisma.JenisKasusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JenisKasusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>
          }
          findMany: {
            args: Prisma.JenisKasusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>[]
          }
          create: {
            args: Prisma.JenisKasusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>
          }
          createMany: {
            args: Prisma.JenisKasusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.JenisKasusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>[]
          }
          delete: {
            args: Prisma.JenisKasusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>
          }
          update: {
            args: Prisma.JenisKasusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>
          }
          deleteMany: {
            args: Prisma.JenisKasusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.JenisKasusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.JenisKasusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$JenisKasusPayload>
          }
          aggregate: {
            args: Prisma.JenisKasusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateJenisKasus>
          }
          groupBy: {
            args: Prisma.JenisKasusGroupByArgs<ExtArgs>
            result: $Utils.Optional<JenisKasusGroupByOutputType>[]
          }
          count: {
            args: Prisma.JenisKasusCountArgs<ExtArgs>
            result: $Utils.Optional<JenisKasusCountAggregateOutputType> | number
          }
        }
      }
      PoinSiswa: {
        payload: Prisma.$PoinSiswaPayload<ExtArgs>
        fields: Prisma.PoinSiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PoinSiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PoinSiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>
          }
          findFirst: {
            args: Prisma.PoinSiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PoinSiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>
          }
          findMany: {
            args: Prisma.PoinSiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>[]
          }
          create: {
            args: Prisma.PoinSiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>
          }
          createMany: {
            args: Prisma.PoinSiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PoinSiswaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>[]
          }
          delete: {
            args: Prisma.PoinSiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>
          }
          update: {
            args: Prisma.PoinSiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>
          }
          deleteMany: {
            args: Prisma.PoinSiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PoinSiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PoinSiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PoinSiswaPayload>
          }
          aggregate: {
            args: Prisma.PoinSiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoinSiswa>
          }
          groupBy: {
            args: Prisma.PoinSiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoinSiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PoinSiswaCountArgs<ExtArgs>
            result: $Utils.Optional<PoinSiswaCountAggregateOutputType> | number
          }
        }
      }
      KasusSiswa: {
        payload: Prisma.$KasusSiswaPayload<ExtArgs>
        fields: Prisma.KasusSiswaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KasusSiswaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KasusSiswaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>
          }
          findFirst: {
            args: Prisma.KasusSiswaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KasusSiswaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>
          }
          findMany: {
            args: Prisma.KasusSiswaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>[]
          }
          create: {
            args: Prisma.KasusSiswaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>
          }
          createMany: {
            args: Prisma.KasusSiswaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KasusSiswaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>[]
          }
          delete: {
            args: Prisma.KasusSiswaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>
          }
          update: {
            args: Prisma.KasusSiswaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>
          }
          deleteMany: {
            args: Prisma.KasusSiswaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KasusSiswaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KasusSiswaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KasusSiswaPayload>
          }
          aggregate: {
            args: Prisma.KasusSiswaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKasusSiswa>
          }
          groupBy: {
            args: Prisma.KasusSiswaGroupByArgs<ExtArgs>
            result: $Utils.Optional<KasusSiswaGroupByOutputType>[]
          }
          count: {
            args: Prisma.KasusSiswaCountArgs<ExtArgs>
            result: $Utils.Optional<KasusSiswaCountAggregateOutputType> | number
          }
        }
      }
      LaporanKasus: {
        payload: Prisma.$LaporanKasusPayload<ExtArgs>
        fields: Prisma.LaporanKasusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LaporanKasusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LaporanKasusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>
          }
          findFirst: {
            args: Prisma.LaporanKasusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LaporanKasusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>
          }
          findMany: {
            args: Prisma.LaporanKasusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>[]
          }
          create: {
            args: Prisma.LaporanKasusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>
          }
          createMany: {
            args: Prisma.LaporanKasusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LaporanKasusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>[]
          }
          delete: {
            args: Prisma.LaporanKasusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>
          }
          update: {
            args: Prisma.LaporanKasusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>
          }
          deleteMany: {
            args: Prisma.LaporanKasusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LaporanKasusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.LaporanKasusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LaporanKasusPayload>
          }
          aggregate: {
            args: Prisma.LaporanKasusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLaporanKasus>
          }
          groupBy: {
            args: Prisma.LaporanKasusGroupByArgs<ExtArgs>
            result: $Utils.Optional<LaporanKasusGroupByOutputType>[]
          }
          count: {
            args: Prisma.LaporanKasusCountArgs<ExtArgs>
            result: $Utils.Optional<LaporanKasusCountAggregateOutputType> | number
          }
        }
      }
      KunjunganRumah: {
        payload: Prisma.$KunjunganRumahPayload<ExtArgs>
        fields: Prisma.KunjunganRumahFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KunjunganRumahFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KunjunganRumahFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>
          }
          findFirst: {
            args: Prisma.KunjunganRumahFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KunjunganRumahFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>
          }
          findMany: {
            args: Prisma.KunjunganRumahFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>[]
          }
          create: {
            args: Prisma.KunjunganRumahCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>
          }
          createMany: {
            args: Prisma.KunjunganRumahCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KunjunganRumahCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>[]
          }
          delete: {
            args: Prisma.KunjunganRumahDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>
          }
          update: {
            args: Prisma.KunjunganRumahUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>
          }
          deleteMany: {
            args: Prisma.KunjunganRumahDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KunjunganRumahUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KunjunganRumahUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KunjunganRumahPayload>
          }
          aggregate: {
            args: Prisma.KunjunganRumahAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKunjunganRumah>
          }
          groupBy: {
            args: Prisma.KunjunganRumahGroupByArgs<ExtArgs>
            result: $Utils.Optional<KunjunganRumahGroupByOutputType>[]
          }
          count: {
            args: Prisma.KunjunganRumahCountArgs<ExtArgs>
            result: $Utils.Optional<KunjunganRumahCountAggregateOutputType> | number
          }
        }
      }
      Kelas: {
        payload: Prisma.$KelasPayload<ExtArgs>
        fields: Prisma.KelasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.KelasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.KelasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          findFirst: {
            args: Prisma.KelasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.KelasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          findMany: {
            args: Prisma.KelasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>[]
          }
          create: {
            args: Prisma.KelasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          createMany: {
            args: Prisma.KelasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.KelasCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>[]
          }
          delete: {
            args: Prisma.KelasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          update: {
            args: Prisma.KelasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          deleteMany: {
            args: Prisma.KelasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.KelasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.KelasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$KelasPayload>
          }
          aggregate: {
            args: Prisma.KelasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateKelas>
          }
          groupBy: {
            args: Prisma.KelasGroupByArgs<ExtArgs>
            result: $Utils.Optional<KelasGroupByOutputType>[]
          }
          count: {
            args: Prisma.KelasCountArgs<ExtArgs>
            result: $Utils.Optional<KelasCountAggregateOutputType> | number
          }
        }
      }
      Mapel: {
        payload: Prisma.$MapelPayload<ExtArgs>
        fields: Prisma.MapelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MapelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MapelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>
          }
          findFirst: {
            args: Prisma.MapelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MapelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>
          }
          findMany: {
            args: Prisma.MapelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>[]
          }
          create: {
            args: Prisma.MapelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>
          }
          createMany: {
            args: Prisma.MapelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MapelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>[]
          }
          delete: {
            args: Prisma.MapelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>
          }
          update: {
            args: Prisma.MapelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>
          }
          deleteMany: {
            args: Prisma.MapelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MapelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MapelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MapelPayload>
          }
          aggregate: {
            args: Prisma.MapelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMapel>
          }
          groupBy: {
            args: Prisma.MapelGroupByArgs<ExtArgs>
            result: $Utils.Optional<MapelGroupByOutputType>[]
          }
          count: {
            args: Prisma.MapelCountArgs<ExtArgs>
            result: $Utils.Optional<MapelCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type SiswaCountOutputType
   */

  export type SiswaCountOutputType = {
    absensiList: number
    poinList: number
    kasusList: number
    kunjunganList: number
  }

  export type SiswaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    absensiList?: boolean | SiswaCountOutputTypeCountAbsensiListArgs
    poinList?: boolean | SiswaCountOutputTypeCountPoinListArgs
    kasusList?: boolean | SiswaCountOutputTypeCountKasusListArgs
    kunjunganList?: boolean | SiswaCountOutputTypeCountKunjunganListArgs
  }

  // Custom InputTypes
  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SiswaCountOutputType
     */
    select?: SiswaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeCountAbsensiListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsensiWhereInput
  }

  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeCountPoinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoinSiswaWhereInput
  }

  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeCountKasusListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KasusSiswaWhereInput
  }

  /**
   * SiswaCountOutputType without action
   */
  export type SiswaCountOutputTypeCountKunjunganListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KunjunganRumahWhereInput
  }


  /**
   * Count Type JenisPelanggaranCountOutputType
   */

  export type JenisPelanggaranCountOutputType = {
    poinList: number
    kasusList: number
  }

  export type JenisPelanggaranCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poinList?: boolean | JenisPelanggaranCountOutputTypeCountPoinListArgs
    kasusList?: boolean | JenisPelanggaranCountOutputTypeCountKasusListArgs
  }

  // Custom InputTypes
  /**
   * JenisPelanggaranCountOutputType without action
   */
  export type JenisPelanggaranCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaranCountOutputType
     */
    select?: JenisPelanggaranCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JenisPelanggaranCountOutputType without action
   */
  export type JenisPelanggaranCountOutputTypeCountPoinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoinSiswaWhereInput
  }

  /**
   * JenisPelanggaranCountOutputType without action
   */
  export type JenisPelanggaranCountOutputTypeCountKasusListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KasusSiswaWhereInput
  }


  /**
   * Count Type JenisPrestasiCountOutputType
   */

  export type JenisPrestasiCountOutputType = {
    poinList: number
  }

  export type JenisPrestasiCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poinList?: boolean | JenisPrestasiCountOutputTypeCountPoinListArgs
  }

  // Custom InputTypes
  /**
   * JenisPrestasiCountOutputType without action
   */
  export type JenisPrestasiCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasiCountOutputType
     */
    select?: JenisPrestasiCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JenisPrestasiCountOutputType without action
   */
  export type JenisPrestasiCountOutputTypeCountPoinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoinSiswaWhereInput
  }


  /**
   * Count Type JenisKasusCountOutputType
   */

  export type JenisKasusCountOutputType = {
    kasusList: number
  }

  export type JenisKasusCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kasusList?: boolean | JenisKasusCountOutputTypeCountKasusListArgs
  }

  // Custom InputTypes
  /**
   * JenisKasusCountOutputType without action
   */
  export type JenisKasusCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasusCountOutputType
     */
    select?: JenisKasusCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * JenisKasusCountOutputType without action
   */
  export type JenisKasusCountOutputTypeCountKasusListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KasusSiswaWhereInput
  }


  /**
   * Count Type KasusSiswaCountOutputType
   */

  export type KasusSiswaCountOutputType = {
    laporanList: number
  }

  export type KasusSiswaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    laporanList?: boolean | KasusSiswaCountOutputTypeCountLaporanListArgs
  }

  // Custom InputTypes
  /**
   * KasusSiswaCountOutputType without action
   */
  export type KasusSiswaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswaCountOutputType
     */
    select?: KasusSiswaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * KasusSiswaCountOutputType without action
   */
  export type KasusSiswaCountOutputTypeCountLaporanListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaporanKasusWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    userId: string | null
    nama: string | null
    password: string | null
    role: $Enums.UserRole | null
    kelas: string | null
    isActive: boolean | null
    displayPassword: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    nama: string | null
    password: string | null
    role: $Enums.UserRole | null
    kelas: string | null
    isActive: boolean | null
    displayPassword: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    userId: number
    nama: number
    password: number
    role: number
    kelas: number
    isActive: number
    displayPassword: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    userId?: true
    nama?: true
    password?: true
    role?: true
    kelas?: true
    isActive?: true
    displayPassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    userId?: true
    nama?: true
    password?: true
    role?: true
    kelas?: true
    isActive?: true
    displayPassword?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    userId?: true
    nama?: true
    password?: true
    role?: true
    kelas?: true
    isActive?: true
    displayPassword?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    userId: string
    nama: string
    password: string
    role: $Enums.UserRole
    kelas: string | null
    isActive: boolean
    displayPassword: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    nama?: boolean
    password?: boolean
    role?: boolean
    kelas?: boolean
    isActive?: boolean
    displayPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    nama?: boolean
    password?: boolean
    role?: boolean
    kelas?: boolean
    isActive?: boolean
    displayPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    userId?: boolean
    nama?: boolean
    password?: boolean
    role?: boolean
    kelas?: boolean
    isActive?: boolean
    displayPassword?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      nama: string
      password: string
      role: $Enums.UserRole
      kelas: string | null
      isActive: boolean
      displayPassword: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly userId: FieldRef<"User", 'String'>
    readonly nama: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
    readonly kelas: FieldRef<"User", 'String'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly displayPassword: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    token: string | null
    expiresAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    userId: number
    token: number
    expiresAt: number
    ipAddress: number
    userAgent: number
    createdAt: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    userId?: true
    token?: true
    expiresAt?: true
    ipAddress?: true
    userAgent?: true
    createdAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    userId: string
    token: string
    expiresAt: Date
    ipAddress: string | null
    userAgent: string | null
    createdAt: Date
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>

  export type SessionSelectScalar = {
    id?: boolean
    userId?: boolean
    token?: boolean
    expiresAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    createdAt?: boolean
  }

  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type SessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      token: string
      expiresAt: Date
      ipAddress: string | null
      userAgent: string | null
      createdAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Sessions and returns the data saved in the database.
     * @param {SessionCreateManyAndReturnArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Sessions and only return the `id`
     * const sessionWithIdOnly = await prisma.session.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SessionCreateManyAndReturnArgs>(args?: SelectSubset<T, SessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */ 
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'String'>
    readonly userId: FieldRef<"Session", 'String'>
    readonly token: FieldRef<"Session", 'String'>
    readonly expiresAt: FieldRef<"Session", 'DateTime'>
    readonly ipAddress: FieldRef<"Session", 'String'>
    readonly userAgent: FieldRef<"Session", 'String'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session createManyAndReturn
   */
  export type SessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Siswa
   */

  export type AggregateSiswa = {
    _count: SiswaCountAggregateOutputType | null
    _min: SiswaMinAggregateOutputType | null
    _max: SiswaMaxAggregateOutputType | null
  }

  export type SiswaMinAggregateOutputType = {
    id: string | null
    nisn: string | null
    nama: string | null
    jenisKelamin: string | null
    tanggalLahir: Date | null
    agama: string | null
    namaAyah: string | null
    namaIbu: string | null
    noHp: string | null
    kelas: string | null
    alamat: string | null
    fotoUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiswaMaxAggregateOutputType = {
    id: string | null
    nisn: string | null
    nama: string | null
    jenisKelamin: string | null
    tanggalLahir: Date | null
    agama: string | null
    namaAyah: string | null
    namaIbu: string | null
    noHp: string | null
    kelas: string | null
    alamat: string | null
    fotoUrl: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SiswaCountAggregateOutputType = {
    id: number
    nisn: number
    nama: number
    jenisKelamin: number
    tanggalLahir: number
    agama: number
    namaAyah: number
    namaIbu: number
    noHp: number
    kelas: number
    alamat: number
    fotoUrl: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SiswaMinAggregateInputType = {
    id?: true
    nisn?: true
    nama?: true
    jenisKelamin?: true
    tanggalLahir?: true
    agama?: true
    namaAyah?: true
    namaIbu?: true
    noHp?: true
    kelas?: true
    alamat?: true
    fotoUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiswaMaxAggregateInputType = {
    id?: true
    nisn?: true
    nama?: true
    jenisKelamin?: true
    tanggalLahir?: true
    agama?: true
    namaAyah?: true
    namaIbu?: true
    noHp?: true
    kelas?: true
    alamat?: true
    fotoUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SiswaCountAggregateInputType = {
    id?: true
    nisn?: true
    nama?: true
    jenisKelamin?: true
    tanggalLahir?: true
    agama?: true
    namaAyah?: true
    namaIbu?: true
    noHp?: true
    kelas?: true
    alamat?: true
    fotoUrl?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siswa to aggregate.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Siswas
    **/
    _count?: true | SiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SiswaMaxAggregateInputType
  }

  export type GetSiswaAggregateType<T extends SiswaAggregateArgs> = {
        [P in keyof T & keyof AggregateSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSiswa[P]>
      : GetScalarType<T[P], AggregateSiswa[P]>
  }




  export type SiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SiswaWhereInput
    orderBy?: SiswaOrderByWithAggregationInput | SiswaOrderByWithAggregationInput[]
    by: SiswaScalarFieldEnum[] | SiswaScalarFieldEnum
    having?: SiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SiswaCountAggregateInputType | true
    _min?: SiswaMinAggregateInputType
    _max?: SiswaMaxAggregateInputType
  }

  export type SiswaGroupByOutputType = {
    id: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir: Date | null
    agama: string | null
    namaAyah: string | null
    namaIbu: string | null
    noHp: string | null
    kelas: string
    alamat: string | null
    fotoUrl: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: SiswaCountAggregateOutputType | null
    _min: SiswaMinAggregateOutputType | null
    _max: SiswaMaxAggregateOutputType | null
  }

  type GetSiswaGroupByPayload<T extends SiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SiswaGroupByOutputType[P]>
            : GetScalarType<T[P], SiswaGroupByOutputType[P]>
        }
      >
    >


  export type SiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisn?: boolean
    nama?: boolean
    jenisKelamin?: boolean
    tanggalLahir?: boolean
    agama?: boolean
    namaAyah?: boolean
    namaIbu?: boolean
    noHp?: boolean
    kelas?: boolean
    alamat?: boolean
    fotoUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    absensiList?: boolean | Siswa$absensiListArgs<ExtArgs>
    poinList?: boolean | Siswa$poinListArgs<ExtArgs>
    kasusList?: boolean | Siswa$kasusListArgs<ExtArgs>
    kunjunganList?: boolean | Siswa$kunjunganListArgs<ExtArgs>
    _count?: boolean | SiswaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["siswa"]>

  export type SiswaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nisn?: boolean
    nama?: boolean
    jenisKelamin?: boolean
    tanggalLahir?: boolean
    agama?: boolean
    namaAyah?: boolean
    namaIbu?: boolean
    noHp?: boolean
    kelas?: boolean
    alamat?: boolean
    fotoUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["siswa"]>

  export type SiswaSelectScalar = {
    id?: boolean
    nisn?: boolean
    nama?: boolean
    jenisKelamin?: boolean
    tanggalLahir?: boolean
    agama?: boolean
    namaAyah?: boolean
    namaIbu?: boolean
    noHp?: boolean
    kelas?: boolean
    alamat?: boolean
    fotoUrl?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    absensiList?: boolean | Siswa$absensiListArgs<ExtArgs>
    poinList?: boolean | Siswa$poinListArgs<ExtArgs>
    kasusList?: boolean | Siswa$kasusListArgs<ExtArgs>
    kunjunganList?: boolean | Siswa$kunjunganListArgs<ExtArgs>
    _count?: boolean | SiswaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SiswaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Siswa"
    objects: {
      absensiList: Prisma.$AbsensiPayload<ExtArgs>[]
      poinList: Prisma.$PoinSiswaPayload<ExtArgs>[]
      kasusList: Prisma.$KasusSiswaPayload<ExtArgs>[]
      kunjunganList: Prisma.$KunjunganRumahPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nisn: string
      nama: string
      jenisKelamin: string
      tanggalLahir: Date | null
      agama: string | null
      namaAyah: string | null
      namaIbu: string | null
      noHp: string | null
      kelas: string
      alamat: string | null
      fotoUrl: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["siswa"]>
    composites: {}
  }

  type SiswaGetPayload<S extends boolean | null | undefined | SiswaDefaultArgs> = $Result.GetResult<Prisma.$SiswaPayload, S>

  type SiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SiswaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SiswaCountAggregateInputType | true
    }

  export interface SiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Siswa'], meta: { name: 'Siswa' } }
    /**
     * Find zero or one Siswa that matches the filter.
     * @param {SiswaFindUniqueArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SiswaFindUniqueArgs>(args: SelectSubset<T, SiswaFindUniqueArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Siswa that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SiswaFindUniqueOrThrowArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, SiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Siswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindFirstArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SiswaFindFirstArgs>(args?: SelectSubset<T, SiswaFindFirstArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Siswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindFirstOrThrowArgs} args - Arguments to find a Siswa
     * @example
     * // Get one Siswa
     * const siswa = await prisma.siswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, SiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Siswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Siswas
     * const siswas = await prisma.siswa.findMany()
     * 
     * // Get first 10 Siswas
     * const siswas = await prisma.siswa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const siswaWithIdOnly = await prisma.siswa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SiswaFindManyArgs>(args?: SelectSubset<T, SiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Siswa.
     * @param {SiswaCreateArgs} args - Arguments to create a Siswa.
     * @example
     * // Create one Siswa
     * const Siswa = await prisma.siswa.create({
     *   data: {
     *     // ... data to create a Siswa
     *   }
     * })
     * 
     */
    create<T extends SiswaCreateArgs>(args: SelectSubset<T, SiswaCreateArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Siswas.
     * @param {SiswaCreateManyArgs} args - Arguments to create many Siswas.
     * @example
     * // Create many Siswas
     * const siswa = await prisma.siswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SiswaCreateManyArgs>(args?: SelectSubset<T, SiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Siswas and returns the data saved in the database.
     * @param {SiswaCreateManyAndReturnArgs} args - Arguments to create many Siswas.
     * @example
     * // Create many Siswas
     * const siswa = await prisma.siswa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Siswas and only return the `id`
     * const siswaWithIdOnly = await prisma.siswa.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SiswaCreateManyAndReturnArgs>(args?: SelectSubset<T, SiswaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Siswa.
     * @param {SiswaDeleteArgs} args - Arguments to delete one Siswa.
     * @example
     * // Delete one Siswa
     * const Siswa = await prisma.siswa.delete({
     *   where: {
     *     // ... filter to delete one Siswa
     *   }
     * })
     * 
     */
    delete<T extends SiswaDeleteArgs>(args: SelectSubset<T, SiswaDeleteArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Siswa.
     * @param {SiswaUpdateArgs} args - Arguments to update one Siswa.
     * @example
     * // Update one Siswa
     * const siswa = await prisma.siswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SiswaUpdateArgs>(args: SelectSubset<T, SiswaUpdateArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Siswas.
     * @param {SiswaDeleteManyArgs} args - Arguments to filter Siswas to delete.
     * @example
     * // Delete a few Siswas
     * const { count } = await prisma.siswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SiswaDeleteManyArgs>(args?: SelectSubset<T, SiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Siswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Siswas
     * const siswa = await prisma.siswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SiswaUpdateManyArgs>(args: SelectSubset<T, SiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Siswa.
     * @param {SiswaUpsertArgs} args - Arguments to update or create a Siswa.
     * @example
     * // Update or create a Siswa
     * const siswa = await prisma.siswa.upsert({
     *   create: {
     *     // ... data to create a Siswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Siswa we want to update
     *   }
     * })
     */
    upsert<T extends SiswaUpsertArgs>(args: SelectSubset<T, SiswaUpsertArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Siswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaCountArgs} args - Arguments to filter Siswas to count.
     * @example
     * // Count the number of Siswas
     * const count = await prisma.siswa.count({
     *   where: {
     *     // ... the filter for the Siswas we want to count
     *   }
     * })
    **/
    count<T extends SiswaCountArgs>(
      args?: Subset<T, SiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Siswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SiswaAggregateArgs>(args: Subset<T, SiswaAggregateArgs>): Prisma.PrismaPromise<GetSiswaAggregateType<T>>

    /**
     * Group by Siswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SiswaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SiswaGroupByArgs['orderBy'] }
        : { orderBy?: SiswaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Siswa model
   */
  readonly fields: SiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Siswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    absensiList<T extends Siswa$absensiListArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$absensiListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findMany"> | Null>
    poinList<T extends Siswa$poinListArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$poinListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findMany"> | Null>
    kasusList<T extends Siswa$kasusListArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$kasusListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findMany"> | Null>
    kunjunganList<T extends Siswa$kunjunganListArgs<ExtArgs> = {}>(args?: Subset<T, Siswa$kunjunganListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Siswa model
   */ 
  interface SiswaFieldRefs {
    readonly id: FieldRef<"Siswa", 'String'>
    readonly nisn: FieldRef<"Siswa", 'String'>
    readonly nama: FieldRef<"Siswa", 'String'>
    readonly jenisKelamin: FieldRef<"Siswa", 'String'>
    readonly tanggalLahir: FieldRef<"Siswa", 'DateTime'>
    readonly agama: FieldRef<"Siswa", 'String'>
    readonly namaAyah: FieldRef<"Siswa", 'String'>
    readonly namaIbu: FieldRef<"Siswa", 'String'>
    readonly noHp: FieldRef<"Siswa", 'String'>
    readonly kelas: FieldRef<"Siswa", 'String'>
    readonly alamat: FieldRef<"Siswa", 'String'>
    readonly fotoUrl: FieldRef<"Siswa", 'String'>
    readonly isActive: FieldRef<"Siswa", 'Boolean'>
    readonly createdAt: FieldRef<"Siswa", 'DateTime'>
    readonly updatedAt: FieldRef<"Siswa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Siswa findUnique
   */
  export type SiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa findUniqueOrThrow
   */
  export type SiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa findFirst
   */
  export type SiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siswas.
     */
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa findFirstOrThrow
   */
  export type SiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswa to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Siswas.
     */
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa findMany
   */
  export type SiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter, which Siswas to fetch.
     */
    where?: SiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Siswas to fetch.
     */
    orderBy?: SiswaOrderByWithRelationInput | SiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Siswas.
     */
    cursor?: SiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Siswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Siswas.
     */
    skip?: number
    distinct?: SiswaScalarFieldEnum | SiswaScalarFieldEnum[]
  }

  /**
   * Siswa create
   */
  export type SiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a Siswa.
     */
    data: XOR<SiswaCreateInput, SiswaUncheckedCreateInput>
  }

  /**
   * Siswa createMany
   */
  export type SiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Siswas.
     */
    data: SiswaCreateManyInput | SiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Siswa createManyAndReturn
   */
  export type SiswaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Siswas.
     */
    data: SiswaCreateManyInput | SiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Siswa update
   */
  export type SiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a Siswa.
     */
    data: XOR<SiswaUpdateInput, SiswaUncheckedUpdateInput>
    /**
     * Choose, which Siswa to update.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa updateMany
   */
  export type SiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Siswas.
     */
    data: XOR<SiswaUpdateManyMutationInput, SiswaUncheckedUpdateManyInput>
    /**
     * Filter which Siswas to update
     */
    where?: SiswaWhereInput
  }

  /**
   * Siswa upsert
   */
  export type SiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the Siswa to update in case it exists.
     */
    where: SiswaWhereUniqueInput
    /**
     * In case the Siswa found by the `where` argument doesn't exist, create a new Siswa with this data.
     */
    create: XOR<SiswaCreateInput, SiswaUncheckedCreateInput>
    /**
     * In case the Siswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SiswaUpdateInput, SiswaUncheckedUpdateInput>
  }

  /**
   * Siswa delete
   */
  export type SiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
    /**
     * Filter which Siswa to delete.
     */
    where: SiswaWhereUniqueInput
  }

  /**
   * Siswa deleteMany
   */
  export type SiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Siswas to delete
     */
    where?: SiswaWhereInput
  }

  /**
   * Siswa.absensiList
   */
  export type Siswa$absensiListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    where?: AbsensiWhereInput
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    cursor?: AbsensiWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Siswa.poinList
   */
  export type Siswa$poinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    where?: PoinSiswaWhereInput
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    cursor?: PoinSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoinSiswaScalarFieldEnum | PoinSiswaScalarFieldEnum[]
  }

  /**
   * Siswa.kasusList
   */
  export type Siswa$kasusListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    where?: KasusSiswaWhereInput
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    cursor?: KasusSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KasusSiswaScalarFieldEnum | KasusSiswaScalarFieldEnum[]
  }

  /**
   * Siswa.kunjunganList
   */
  export type Siswa$kunjunganListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    where?: KunjunganRumahWhereInput
    orderBy?: KunjunganRumahOrderByWithRelationInput | KunjunganRumahOrderByWithRelationInput[]
    cursor?: KunjunganRumahWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KunjunganRumahScalarFieldEnum | KunjunganRumahScalarFieldEnum[]
  }

  /**
   * Siswa without action
   */
  export type SiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Siswa
     */
    select?: SiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SiswaInclude<ExtArgs> | null
  }


  /**
   * Model Absensi
   */

  export type AggregateAbsensi = {
    _count: AbsensiCountAggregateOutputType | null
    _min: AbsensiMinAggregateOutputType | null
    _max: AbsensiMaxAggregateOutputType | null
  }

  export type AbsensiMinAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    siswaNisn: string | null
    namaSnapshot: string | null
    kelasSnapshot: string | null
    jamDatang: string | null
    jamPulang: string | null
    jamSholat: string | null
    status: $Enums.StatusAbsensi | null
    keterangan: string | null
    catatan: string | null
    inputBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AbsensiMaxAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    siswaNisn: string | null
    namaSnapshot: string | null
    kelasSnapshot: string | null
    jamDatang: string | null
    jamPulang: string | null
    jamSholat: string | null
    status: $Enums.StatusAbsensi | null
    keterangan: string | null
    catatan: string | null
    inputBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AbsensiCountAggregateOutputType = {
    id: number
    tanggal: number
    siswaNisn: number
    namaSnapshot: number
    kelasSnapshot: number
    jamDatang: number
    jamPulang: number
    jamSholat: number
    status: number
    keterangan: number
    catatan: number
    inputBy: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AbsensiMinAggregateInputType = {
    id?: true
    tanggal?: true
    siswaNisn?: true
    namaSnapshot?: true
    kelasSnapshot?: true
    jamDatang?: true
    jamPulang?: true
    jamSholat?: true
    status?: true
    keterangan?: true
    catatan?: true
    inputBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AbsensiMaxAggregateInputType = {
    id?: true
    tanggal?: true
    siswaNisn?: true
    namaSnapshot?: true
    kelasSnapshot?: true
    jamDatang?: true
    jamPulang?: true
    jamSholat?: true
    status?: true
    keterangan?: true
    catatan?: true
    inputBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AbsensiCountAggregateInputType = {
    id?: true
    tanggal?: true
    siswaNisn?: true
    namaSnapshot?: true
    kelasSnapshot?: true
    jamDatang?: true
    jamPulang?: true
    jamSholat?: true
    status?: true
    keterangan?: true
    catatan?: true
    inputBy?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AbsensiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Absensi to aggregate.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Absensis
    **/
    _count?: true | AbsensiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AbsensiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AbsensiMaxAggregateInputType
  }

  export type GetAbsensiAggregateType<T extends AbsensiAggregateArgs> = {
        [P in keyof T & keyof AggregateAbsensi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAbsensi[P]>
      : GetScalarType<T[P], AggregateAbsensi[P]>
  }




  export type AbsensiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsensiWhereInput
    orderBy?: AbsensiOrderByWithAggregationInput | AbsensiOrderByWithAggregationInput[]
    by: AbsensiScalarFieldEnum[] | AbsensiScalarFieldEnum
    having?: AbsensiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AbsensiCountAggregateInputType | true
    _min?: AbsensiMinAggregateInputType
    _max?: AbsensiMaxAggregateInputType
  }

  export type AbsensiGroupByOutputType = {
    id: string
    tanggal: Date
    siswaNisn: string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang: string | null
    jamPulang: string | null
    jamSholat: string | null
    status: $Enums.StatusAbsensi
    keterangan: string | null
    catatan: string | null
    inputBy: string | null
    createdAt: Date
    updatedAt: Date
    _count: AbsensiCountAggregateOutputType | null
    _min: AbsensiMinAggregateOutputType | null
    _max: AbsensiMaxAggregateOutputType | null
  }

  type GetAbsensiGroupByPayload<T extends AbsensiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AbsensiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AbsensiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AbsensiGroupByOutputType[P]>
            : GetScalarType<T[P], AbsensiGroupByOutputType[P]>
        }
      >
    >


  export type AbsensiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    siswaNisn?: boolean
    namaSnapshot?: boolean
    kelasSnapshot?: boolean
    jamDatang?: boolean
    jamPulang?: boolean
    jamSholat?: boolean
    status?: boolean
    keterangan?: boolean
    catatan?: boolean
    inputBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absensi"]>

  export type AbsensiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    siswaNisn?: boolean
    namaSnapshot?: boolean
    kelasSnapshot?: boolean
    jamDatang?: boolean
    jamPulang?: boolean
    jamSholat?: boolean
    status?: boolean
    keterangan?: boolean
    catatan?: boolean
    inputBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["absensi"]>

  export type AbsensiSelectScalar = {
    id?: boolean
    tanggal?: boolean
    siswaNisn?: boolean
    namaSnapshot?: boolean
    kelasSnapshot?: boolean
    jamDatang?: boolean
    jamPulang?: boolean
    jamSholat?: boolean
    status?: boolean
    keterangan?: boolean
    catatan?: boolean
    inputBy?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AbsensiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }
  export type AbsensiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }

  export type $AbsensiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Absensi"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tanggal: Date
      siswaNisn: string
      namaSnapshot: string
      kelasSnapshot: string
      jamDatang: string | null
      jamPulang: string | null
      jamSholat: string | null
      status: $Enums.StatusAbsensi
      keterangan: string | null
      catatan: string | null
      inputBy: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["absensi"]>
    composites: {}
  }

  type AbsensiGetPayload<S extends boolean | null | undefined | AbsensiDefaultArgs> = $Result.GetResult<Prisma.$AbsensiPayload, S>

  type AbsensiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AbsensiFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AbsensiCountAggregateInputType | true
    }

  export interface AbsensiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Absensi'], meta: { name: 'Absensi' } }
    /**
     * Find zero or one Absensi that matches the filter.
     * @param {AbsensiFindUniqueArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AbsensiFindUniqueArgs>(args: SelectSubset<T, AbsensiFindUniqueArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Absensi that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AbsensiFindUniqueOrThrowArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AbsensiFindUniqueOrThrowArgs>(args: SelectSubset<T, AbsensiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Absensi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiFindFirstArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AbsensiFindFirstArgs>(args?: SelectSubset<T, AbsensiFindFirstArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Absensi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiFindFirstOrThrowArgs} args - Arguments to find a Absensi
     * @example
     * // Get one Absensi
     * const absensi = await prisma.absensi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AbsensiFindFirstOrThrowArgs>(args?: SelectSubset<T, AbsensiFindFirstOrThrowArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Absensis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Absensis
     * const absensis = await prisma.absensi.findMany()
     * 
     * // Get first 10 Absensis
     * const absensis = await prisma.absensi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const absensiWithIdOnly = await prisma.absensi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AbsensiFindManyArgs>(args?: SelectSubset<T, AbsensiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Absensi.
     * @param {AbsensiCreateArgs} args - Arguments to create a Absensi.
     * @example
     * // Create one Absensi
     * const Absensi = await prisma.absensi.create({
     *   data: {
     *     // ... data to create a Absensi
     *   }
     * })
     * 
     */
    create<T extends AbsensiCreateArgs>(args: SelectSubset<T, AbsensiCreateArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Absensis.
     * @param {AbsensiCreateManyArgs} args - Arguments to create many Absensis.
     * @example
     * // Create many Absensis
     * const absensi = await prisma.absensi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AbsensiCreateManyArgs>(args?: SelectSubset<T, AbsensiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Absensis and returns the data saved in the database.
     * @param {AbsensiCreateManyAndReturnArgs} args - Arguments to create many Absensis.
     * @example
     * // Create many Absensis
     * const absensi = await prisma.absensi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Absensis and only return the `id`
     * const absensiWithIdOnly = await prisma.absensi.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AbsensiCreateManyAndReturnArgs>(args?: SelectSubset<T, AbsensiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Absensi.
     * @param {AbsensiDeleteArgs} args - Arguments to delete one Absensi.
     * @example
     * // Delete one Absensi
     * const Absensi = await prisma.absensi.delete({
     *   where: {
     *     // ... filter to delete one Absensi
     *   }
     * })
     * 
     */
    delete<T extends AbsensiDeleteArgs>(args: SelectSubset<T, AbsensiDeleteArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Absensi.
     * @param {AbsensiUpdateArgs} args - Arguments to update one Absensi.
     * @example
     * // Update one Absensi
     * const absensi = await prisma.absensi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AbsensiUpdateArgs>(args: SelectSubset<T, AbsensiUpdateArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Absensis.
     * @param {AbsensiDeleteManyArgs} args - Arguments to filter Absensis to delete.
     * @example
     * // Delete a few Absensis
     * const { count } = await prisma.absensi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AbsensiDeleteManyArgs>(args?: SelectSubset<T, AbsensiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Absensis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Absensis
     * const absensi = await prisma.absensi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AbsensiUpdateManyArgs>(args: SelectSubset<T, AbsensiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Absensi.
     * @param {AbsensiUpsertArgs} args - Arguments to update or create a Absensi.
     * @example
     * // Update or create a Absensi
     * const absensi = await prisma.absensi.upsert({
     *   create: {
     *     // ... data to create a Absensi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Absensi we want to update
     *   }
     * })
     */
    upsert<T extends AbsensiUpsertArgs>(args: SelectSubset<T, AbsensiUpsertArgs<ExtArgs>>): Prisma__AbsensiClient<$Result.GetResult<Prisma.$AbsensiPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Absensis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiCountArgs} args - Arguments to filter Absensis to count.
     * @example
     * // Count the number of Absensis
     * const count = await prisma.absensi.count({
     *   where: {
     *     // ... the filter for the Absensis we want to count
     *   }
     * })
    **/
    count<T extends AbsensiCountArgs>(
      args?: Subset<T, AbsensiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AbsensiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Absensi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AbsensiAggregateArgs>(args: Subset<T, AbsensiAggregateArgs>): Prisma.PrismaPromise<GetAbsensiAggregateType<T>>

    /**
     * Group by Absensi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsensiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AbsensiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AbsensiGroupByArgs['orderBy'] }
        : { orderBy?: AbsensiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AbsensiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAbsensiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Absensi model
   */
  readonly fields: AbsensiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Absensi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AbsensiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Absensi model
   */ 
  interface AbsensiFieldRefs {
    readonly id: FieldRef<"Absensi", 'String'>
    readonly tanggal: FieldRef<"Absensi", 'DateTime'>
    readonly siswaNisn: FieldRef<"Absensi", 'String'>
    readonly namaSnapshot: FieldRef<"Absensi", 'String'>
    readonly kelasSnapshot: FieldRef<"Absensi", 'String'>
    readonly jamDatang: FieldRef<"Absensi", 'String'>
    readonly jamPulang: FieldRef<"Absensi", 'String'>
    readonly jamSholat: FieldRef<"Absensi", 'String'>
    readonly status: FieldRef<"Absensi", 'StatusAbsensi'>
    readonly keterangan: FieldRef<"Absensi", 'String'>
    readonly catatan: FieldRef<"Absensi", 'String'>
    readonly inputBy: FieldRef<"Absensi", 'String'>
    readonly createdAt: FieldRef<"Absensi", 'DateTime'>
    readonly updatedAt: FieldRef<"Absensi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Absensi findUnique
   */
  export type AbsensiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi findUniqueOrThrow
   */
  export type AbsensiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi findFirst
   */
  export type AbsensiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Absensis.
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absensis.
     */
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Absensi findFirstOrThrow
   */
  export type AbsensiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensi to fetch.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Absensis.
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absensis.
     */
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Absensi findMany
   */
  export type AbsensiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter, which Absensis to fetch.
     */
    where?: AbsensiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absensis to fetch.
     */
    orderBy?: AbsensiOrderByWithRelationInput | AbsensiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Absensis.
     */
    cursor?: AbsensiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absensis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absensis.
     */
    skip?: number
    distinct?: AbsensiScalarFieldEnum | AbsensiScalarFieldEnum[]
  }

  /**
   * Absensi create
   */
  export type AbsensiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * The data needed to create a Absensi.
     */
    data: XOR<AbsensiCreateInput, AbsensiUncheckedCreateInput>
  }

  /**
   * Absensi createMany
   */
  export type AbsensiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Absensis.
     */
    data: AbsensiCreateManyInput | AbsensiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Absensi createManyAndReturn
   */
  export type AbsensiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Absensis.
     */
    data: AbsensiCreateManyInput | AbsensiCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Absensi update
   */
  export type AbsensiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * The data needed to update a Absensi.
     */
    data: XOR<AbsensiUpdateInput, AbsensiUncheckedUpdateInput>
    /**
     * Choose, which Absensi to update.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi updateMany
   */
  export type AbsensiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Absensis.
     */
    data: XOR<AbsensiUpdateManyMutationInput, AbsensiUncheckedUpdateManyInput>
    /**
     * Filter which Absensis to update
     */
    where?: AbsensiWhereInput
  }

  /**
   * Absensi upsert
   */
  export type AbsensiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * The filter to search for the Absensi to update in case it exists.
     */
    where: AbsensiWhereUniqueInput
    /**
     * In case the Absensi found by the `where` argument doesn't exist, create a new Absensi with this data.
     */
    create: XOR<AbsensiCreateInput, AbsensiUncheckedCreateInput>
    /**
     * In case the Absensi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AbsensiUpdateInput, AbsensiUncheckedUpdateInput>
  }

  /**
   * Absensi delete
   */
  export type AbsensiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
    /**
     * Filter which Absensi to delete.
     */
    where: AbsensiWhereUniqueInput
  }

  /**
   * Absensi deleteMany
   */
  export type AbsensiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Absensis to delete
     */
    where?: AbsensiWhereInput
  }

  /**
   * Absensi without action
   */
  export type AbsensiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absensi
     */
    select?: AbsensiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsensiInclude<ExtArgs> | null
  }


  /**
   * Model HariLibur
   */

  export type AggregateHariLibur = {
    _count: HariLiburCountAggregateOutputType | null
    _min: HariLiburMinAggregateOutputType | null
    _max: HariLiburMaxAggregateOutputType | null
  }

  export type HariLiburMinAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    keterangan: string | null
    createdAt: Date | null
  }

  export type HariLiburMaxAggregateOutputType = {
    id: string | null
    tanggal: Date | null
    keterangan: string | null
    createdAt: Date | null
  }

  export type HariLiburCountAggregateOutputType = {
    id: number
    tanggal: number
    keterangan: number
    createdAt: number
    _all: number
  }


  export type HariLiburMinAggregateInputType = {
    id?: true
    tanggal?: true
    keterangan?: true
    createdAt?: true
  }

  export type HariLiburMaxAggregateInputType = {
    id?: true
    tanggal?: true
    keterangan?: true
    createdAt?: true
  }

  export type HariLiburCountAggregateInputType = {
    id?: true
    tanggal?: true
    keterangan?: true
    createdAt?: true
    _all?: true
  }

  export type HariLiburAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HariLibur to aggregate.
     */
    where?: HariLiburWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HariLiburs to fetch.
     */
    orderBy?: HariLiburOrderByWithRelationInput | HariLiburOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HariLiburWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HariLiburs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HariLiburs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HariLiburs
    **/
    _count?: true | HariLiburCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HariLiburMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HariLiburMaxAggregateInputType
  }

  export type GetHariLiburAggregateType<T extends HariLiburAggregateArgs> = {
        [P in keyof T & keyof AggregateHariLibur]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHariLibur[P]>
      : GetScalarType<T[P], AggregateHariLibur[P]>
  }




  export type HariLiburGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HariLiburWhereInput
    orderBy?: HariLiburOrderByWithAggregationInput | HariLiburOrderByWithAggregationInput[]
    by: HariLiburScalarFieldEnum[] | HariLiburScalarFieldEnum
    having?: HariLiburScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HariLiburCountAggregateInputType | true
    _min?: HariLiburMinAggregateInputType
    _max?: HariLiburMaxAggregateInputType
  }

  export type HariLiburGroupByOutputType = {
    id: string
    tanggal: Date
    keterangan: string
    createdAt: Date
    _count: HariLiburCountAggregateOutputType | null
    _min: HariLiburMinAggregateOutputType | null
    _max: HariLiburMaxAggregateOutputType | null
  }

  type GetHariLiburGroupByPayload<T extends HariLiburGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HariLiburGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HariLiburGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HariLiburGroupByOutputType[P]>
            : GetScalarType<T[P], HariLiburGroupByOutputType[P]>
        }
      >
    >


  export type HariLiburSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    keterangan?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hariLibur"]>

  export type HariLiburSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tanggal?: boolean
    keterangan?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hariLibur"]>

  export type HariLiburSelectScalar = {
    id?: boolean
    tanggal?: boolean
    keterangan?: boolean
    createdAt?: boolean
  }


  export type $HariLiburPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HariLibur"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      tanggal: Date
      keterangan: string
      createdAt: Date
    }, ExtArgs["result"]["hariLibur"]>
    composites: {}
  }

  type HariLiburGetPayload<S extends boolean | null | undefined | HariLiburDefaultArgs> = $Result.GetResult<Prisma.$HariLiburPayload, S>

  type HariLiburCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HariLiburFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HariLiburCountAggregateInputType | true
    }

  export interface HariLiburDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HariLibur'], meta: { name: 'HariLibur' } }
    /**
     * Find zero or one HariLibur that matches the filter.
     * @param {HariLiburFindUniqueArgs} args - Arguments to find a HariLibur
     * @example
     * // Get one HariLibur
     * const hariLibur = await prisma.hariLibur.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HariLiburFindUniqueArgs>(args: SelectSubset<T, HariLiburFindUniqueArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HariLibur that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HariLiburFindUniqueOrThrowArgs} args - Arguments to find a HariLibur
     * @example
     * // Get one HariLibur
     * const hariLibur = await prisma.hariLibur.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HariLiburFindUniqueOrThrowArgs>(args: SelectSubset<T, HariLiburFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HariLibur that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburFindFirstArgs} args - Arguments to find a HariLibur
     * @example
     * // Get one HariLibur
     * const hariLibur = await prisma.hariLibur.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HariLiburFindFirstArgs>(args?: SelectSubset<T, HariLiburFindFirstArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HariLibur that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburFindFirstOrThrowArgs} args - Arguments to find a HariLibur
     * @example
     * // Get one HariLibur
     * const hariLibur = await prisma.hariLibur.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HariLiburFindFirstOrThrowArgs>(args?: SelectSubset<T, HariLiburFindFirstOrThrowArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HariLiburs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HariLiburs
     * const hariLiburs = await prisma.hariLibur.findMany()
     * 
     * // Get first 10 HariLiburs
     * const hariLiburs = await prisma.hariLibur.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hariLiburWithIdOnly = await prisma.hariLibur.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HariLiburFindManyArgs>(args?: SelectSubset<T, HariLiburFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HariLibur.
     * @param {HariLiburCreateArgs} args - Arguments to create a HariLibur.
     * @example
     * // Create one HariLibur
     * const HariLibur = await prisma.hariLibur.create({
     *   data: {
     *     // ... data to create a HariLibur
     *   }
     * })
     * 
     */
    create<T extends HariLiburCreateArgs>(args: SelectSubset<T, HariLiburCreateArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HariLiburs.
     * @param {HariLiburCreateManyArgs} args - Arguments to create many HariLiburs.
     * @example
     * // Create many HariLiburs
     * const hariLibur = await prisma.hariLibur.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HariLiburCreateManyArgs>(args?: SelectSubset<T, HariLiburCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HariLiburs and returns the data saved in the database.
     * @param {HariLiburCreateManyAndReturnArgs} args - Arguments to create many HariLiburs.
     * @example
     * // Create many HariLiburs
     * const hariLibur = await prisma.hariLibur.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HariLiburs and only return the `id`
     * const hariLiburWithIdOnly = await prisma.hariLibur.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HariLiburCreateManyAndReturnArgs>(args?: SelectSubset<T, HariLiburCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HariLibur.
     * @param {HariLiburDeleteArgs} args - Arguments to delete one HariLibur.
     * @example
     * // Delete one HariLibur
     * const HariLibur = await prisma.hariLibur.delete({
     *   where: {
     *     // ... filter to delete one HariLibur
     *   }
     * })
     * 
     */
    delete<T extends HariLiburDeleteArgs>(args: SelectSubset<T, HariLiburDeleteArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HariLibur.
     * @param {HariLiburUpdateArgs} args - Arguments to update one HariLibur.
     * @example
     * // Update one HariLibur
     * const hariLibur = await prisma.hariLibur.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HariLiburUpdateArgs>(args: SelectSubset<T, HariLiburUpdateArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HariLiburs.
     * @param {HariLiburDeleteManyArgs} args - Arguments to filter HariLiburs to delete.
     * @example
     * // Delete a few HariLiburs
     * const { count } = await prisma.hariLibur.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HariLiburDeleteManyArgs>(args?: SelectSubset<T, HariLiburDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HariLiburs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HariLiburs
     * const hariLibur = await prisma.hariLibur.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HariLiburUpdateManyArgs>(args: SelectSubset<T, HariLiburUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HariLibur.
     * @param {HariLiburUpsertArgs} args - Arguments to update or create a HariLibur.
     * @example
     * // Update or create a HariLibur
     * const hariLibur = await prisma.hariLibur.upsert({
     *   create: {
     *     // ... data to create a HariLibur
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HariLibur we want to update
     *   }
     * })
     */
    upsert<T extends HariLiburUpsertArgs>(args: SelectSubset<T, HariLiburUpsertArgs<ExtArgs>>): Prisma__HariLiburClient<$Result.GetResult<Prisma.$HariLiburPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HariLiburs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburCountArgs} args - Arguments to filter HariLiburs to count.
     * @example
     * // Count the number of HariLiburs
     * const count = await prisma.hariLibur.count({
     *   where: {
     *     // ... the filter for the HariLiburs we want to count
     *   }
     * })
    **/
    count<T extends HariLiburCountArgs>(
      args?: Subset<T, HariLiburCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HariLiburCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HariLibur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HariLiburAggregateArgs>(args: Subset<T, HariLiburAggregateArgs>): Prisma.PrismaPromise<GetHariLiburAggregateType<T>>

    /**
     * Group by HariLibur.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HariLiburGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HariLiburGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HariLiburGroupByArgs['orderBy'] }
        : { orderBy?: HariLiburGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HariLiburGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHariLiburGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HariLibur model
   */
  readonly fields: HariLiburFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HariLibur.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HariLiburClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HariLibur model
   */ 
  interface HariLiburFieldRefs {
    readonly id: FieldRef<"HariLibur", 'String'>
    readonly tanggal: FieldRef<"HariLibur", 'DateTime'>
    readonly keterangan: FieldRef<"HariLibur", 'String'>
    readonly createdAt: FieldRef<"HariLibur", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * HariLibur findUnique
   */
  export type HariLiburFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * Filter, which HariLibur to fetch.
     */
    where: HariLiburWhereUniqueInput
  }

  /**
   * HariLibur findUniqueOrThrow
   */
  export type HariLiburFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * Filter, which HariLibur to fetch.
     */
    where: HariLiburWhereUniqueInput
  }

  /**
   * HariLibur findFirst
   */
  export type HariLiburFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * Filter, which HariLibur to fetch.
     */
    where?: HariLiburWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HariLiburs to fetch.
     */
    orderBy?: HariLiburOrderByWithRelationInput | HariLiburOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HariLiburs.
     */
    cursor?: HariLiburWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HariLiburs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HariLiburs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HariLiburs.
     */
    distinct?: HariLiburScalarFieldEnum | HariLiburScalarFieldEnum[]
  }

  /**
   * HariLibur findFirstOrThrow
   */
  export type HariLiburFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * Filter, which HariLibur to fetch.
     */
    where?: HariLiburWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HariLiburs to fetch.
     */
    orderBy?: HariLiburOrderByWithRelationInput | HariLiburOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HariLiburs.
     */
    cursor?: HariLiburWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HariLiburs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HariLiburs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HariLiburs.
     */
    distinct?: HariLiburScalarFieldEnum | HariLiburScalarFieldEnum[]
  }

  /**
   * HariLibur findMany
   */
  export type HariLiburFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * Filter, which HariLiburs to fetch.
     */
    where?: HariLiburWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HariLiburs to fetch.
     */
    orderBy?: HariLiburOrderByWithRelationInput | HariLiburOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HariLiburs.
     */
    cursor?: HariLiburWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HariLiburs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HariLiburs.
     */
    skip?: number
    distinct?: HariLiburScalarFieldEnum | HariLiburScalarFieldEnum[]
  }

  /**
   * HariLibur create
   */
  export type HariLiburCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * The data needed to create a HariLibur.
     */
    data: XOR<HariLiburCreateInput, HariLiburUncheckedCreateInput>
  }

  /**
   * HariLibur createMany
   */
  export type HariLiburCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HariLiburs.
     */
    data: HariLiburCreateManyInput | HariLiburCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HariLibur createManyAndReturn
   */
  export type HariLiburCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HariLiburs.
     */
    data: HariLiburCreateManyInput | HariLiburCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HariLibur update
   */
  export type HariLiburUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * The data needed to update a HariLibur.
     */
    data: XOR<HariLiburUpdateInput, HariLiburUncheckedUpdateInput>
    /**
     * Choose, which HariLibur to update.
     */
    where: HariLiburWhereUniqueInput
  }

  /**
   * HariLibur updateMany
   */
  export type HariLiburUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HariLiburs.
     */
    data: XOR<HariLiburUpdateManyMutationInput, HariLiburUncheckedUpdateManyInput>
    /**
     * Filter which HariLiburs to update
     */
    where?: HariLiburWhereInput
  }

  /**
   * HariLibur upsert
   */
  export type HariLiburUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * The filter to search for the HariLibur to update in case it exists.
     */
    where: HariLiburWhereUniqueInput
    /**
     * In case the HariLibur found by the `where` argument doesn't exist, create a new HariLibur with this data.
     */
    create: XOR<HariLiburCreateInput, HariLiburUncheckedCreateInput>
    /**
     * In case the HariLibur was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HariLiburUpdateInput, HariLiburUncheckedUpdateInput>
  }

  /**
   * HariLibur delete
   */
  export type HariLiburDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
    /**
     * Filter which HariLibur to delete.
     */
    where: HariLiburWhereUniqueInput
  }

  /**
   * HariLibur deleteMany
   */
  export type HariLiburDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HariLiburs to delete
     */
    where?: HariLiburWhereInput
  }

  /**
   * HariLibur without action
   */
  export type HariLiburDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HariLibur
     */
    select?: HariLiburSelect<ExtArgs> | null
  }


  /**
   * Model AppConfig
   */

  export type AggregateAppConfig = {
    _count: AppConfigCountAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  export type AppConfigMinAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AppConfigMaxAggregateOutputType = {
    key: string | null
    value: string | null
    updatedAt: Date | null
  }

  export type AppConfigCountAggregateOutputType = {
    key: number
    value: number
    updatedAt: number
    _all: number
  }


  export type AppConfigMinAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AppConfigMaxAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
  }

  export type AppConfigCountAggregateInputType = {
    key?: true
    value?: true
    updatedAt?: true
    _all?: true
  }

  export type AppConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfig to aggregate.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AppConfigs
    **/
    _count?: true | AppConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppConfigMaxAggregateInputType
  }

  export type GetAppConfigAggregateType<T extends AppConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateAppConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppConfig[P]>
      : GetScalarType<T[P], AggregateAppConfig[P]>
  }




  export type AppConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppConfigWhereInput
    orderBy?: AppConfigOrderByWithAggregationInput | AppConfigOrderByWithAggregationInput[]
    by: AppConfigScalarFieldEnum[] | AppConfigScalarFieldEnum
    having?: AppConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppConfigCountAggregateInputType | true
    _min?: AppConfigMinAggregateInputType
    _max?: AppConfigMaxAggregateInputType
  }

  export type AppConfigGroupByOutputType = {
    key: string
    value: string
    updatedAt: Date
    _count: AppConfigCountAggregateOutputType | null
    _min: AppConfigMinAggregateOutputType | null
    _max: AppConfigMaxAggregateOutputType | null
  }

  type GetAppConfigGroupByPayload<T extends AppConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
            : GetScalarType<T[P], AppConfigGroupByOutputType[P]>
        }
      >
    >


  export type AppConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["appConfig"]>

  export type AppConfigSelectScalar = {
    key?: boolean
    value?: boolean
    updatedAt?: boolean
  }


  export type $AppConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AppConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      value: string
      updatedAt: Date
    }, ExtArgs["result"]["appConfig"]>
    composites: {}
  }

  type AppConfigGetPayload<S extends boolean | null | undefined | AppConfigDefaultArgs> = $Result.GetResult<Prisma.$AppConfigPayload, S>

  type AppConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AppConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AppConfigCountAggregateInputType | true
    }

  export interface AppConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AppConfig'], meta: { name: 'AppConfig' } }
    /**
     * Find zero or one AppConfig that matches the filter.
     * @param {AppConfigFindUniqueArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppConfigFindUniqueArgs>(args: SelectSubset<T, AppConfigFindUniqueArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AppConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AppConfigFindUniqueOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, AppConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AppConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppConfigFindFirstArgs>(args?: SelectSubset<T, AppConfigFindFirstArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AppConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindFirstOrThrowArgs} args - Arguments to find a AppConfig
     * @example
     * // Get one AppConfig
     * const appConfig = await prisma.appConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, AppConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AppConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AppConfigs
     * const appConfigs = await prisma.appConfig.findMany()
     * 
     * // Get first 10 AppConfigs
     * const appConfigs = await prisma.appConfig.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends AppConfigFindManyArgs>(args?: SelectSubset<T, AppConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AppConfig.
     * @param {AppConfigCreateArgs} args - Arguments to create a AppConfig.
     * @example
     * // Create one AppConfig
     * const AppConfig = await prisma.appConfig.create({
     *   data: {
     *     // ... data to create a AppConfig
     *   }
     * })
     * 
     */
    create<T extends AppConfigCreateArgs>(args: SelectSubset<T, AppConfigCreateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AppConfigs.
     * @param {AppConfigCreateManyArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppConfigCreateManyArgs>(args?: SelectSubset<T, AppConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AppConfigs and returns the data saved in the database.
     * @param {AppConfigCreateManyAndReturnArgs} args - Arguments to create many AppConfigs.
     * @example
     * // Create many AppConfigs
     * const appConfig = await prisma.appConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AppConfigs and only return the `key`
     * const appConfigWithKeyOnly = await prisma.appConfig.createManyAndReturn({ 
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AppConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, AppConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AppConfig.
     * @param {AppConfigDeleteArgs} args - Arguments to delete one AppConfig.
     * @example
     * // Delete one AppConfig
     * const AppConfig = await prisma.appConfig.delete({
     *   where: {
     *     // ... filter to delete one AppConfig
     *   }
     * })
     * 
     */
    delete<T extends AppConfigDeleteArgs>(args: SelectSubset<T, AppConfigDeleteArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AppConfig.
     * @param {AppConfigUpdateArgs} args - Arguments to update one AppConfig.
     * @example
     * // Update one AppConfig
     * const appConfig = await prisma.appConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppConfigUpdateArgs>(args: SelectSubset<T, AppConfigUpdateArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AppConfigs.
     * @param {AppConfigDeleteManyArgs} args - Arguments to filter AppConfigs to delete.
     * @example
     * // Delete a few AppConfigs
     * const { count } = await prisma.appConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppConfigDeleteManyArgs>(args?: SelectSubset<T, AppConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AppConfigs
     * const appConfig = await prisma.appConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppConfigUpdateManyArgs>(args: SelectSubset<T, AppConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AppConfig.
     * @param {AppConfigUpsertArgs} args - Arguments to update or create a AppConfig.
     * @example
     * // Update or create a AppConfig
     * const appConfig = await prisma.appConfig.upsert({
     *   create: {
     *     // ... data to create a AppConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AppConfig we want to update
     *   }
     * })
     */
    upsert<T extends AppConfigUpsertArgs>(args: SelectSubset<T, AppConfigUpsertArgs<ExtArgs>>): Prisma__AppConfigClient<$Result.GetResult<Prisma.$AppConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AppConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigCountArgs} args - Arguments to filter AppConfigs to count.
     * @example
     * // Count the number of AppConfigs
     * const count = await prisma.appConfig.count({
     *   where: {
     *     // ... the filter for the AppConfigs we want to count
     *   }
     * })
    **/
    count<T extends AppConfigCountArgs>(
      args?: Subset<T, AppConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppConfigAggregateArgs>(args: Subset<T, AppConfigAggregateArgs>): Prisma.PrismaPromise<GetAppConfigAggregateType<T>>

    /**
     * Group by AppConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppConfigGroupByArgs['orderBy'] }
        : { orderBy?: AppConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AppConfig model
   */
  readonly fields: AppConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AppConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AppConfig model
   */ 
  interface AppConfigFieldRefs {
    readonly key: FieldRef<"AppConfig", 'String'>
    readonly value: FieldRef<"AppConfig", 'String'>
    readonly updatedAt: FieldRef<"AppConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AppConfig findUnique
   */
  export type AppConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findUniqueOrThrow
   */
  export type AppConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig findFirst
   */
  export type AppConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findFirstOrThrow
   */
  export type AppConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfig to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AppConfigs.
     */
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig findMany
   */
  export type AppConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter, which AppConfigs to fetch.
     */
    where?: AppConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AppConfigs to fetch.
     */
    orderBy?: AppConfigOrderByWithRelationInput | AppConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AppConfigs.
     */
    cursor?: AppConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AppConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AppConfigs.
     */
    skip?: number
    distinct?: AppConfigScalarFieldEnum | AppConfigScalarFieldEnum[]
  }

  /**
   * AppConfig create
   */
  export type AppConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a AppConfig.
     */
    data: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
  }

  /**
   * AppConfig createMany
   */
  export type AppConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig createManyAndReturn
   */
  export type AppConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AppConfigs.
     */
    data: AppConfigCreateManyInput | AppConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AppConfig update
   */
  export type AppConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a AppConfig.
     */
    data: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
    /**
     * Choose, which AppConfig to update.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig updateMany
   */
  export type AppConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AppConfigs.
     */
    data: XOR<AppConfigUpdateManyMutationInput, AppConfigUncheckedUpdateManyInput>
    /**
     * Filter which AppConfigs to update
     */
    where?: AppConfigWhereInput
  }

  /**
   * AppConfig upsert
   */
  export type AppConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the AppConfig to update in case it exists.
     */
    where: AppConfigWhereUniqueInput
    /**
     * In case the AppConfig found by the `where` argument doesn't exist, create a new AppConfig with this data.
     */
    create: XOR<AppConfigCreateInput, AppConfigUncheckedCreateInput>
    /**
     * In case the AppConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppConfigUpdateInput, AppConfigUncheckedUpdateInput>
  }

  /**
   * AppConfig delete
   */
  export type AppConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
    /**
     * Filter which AppConfig to delete.
     */
    where: AppConfigWhereUniqueInput
  }

  /**
   * AppConfig deleteMany
   */
  export type AppConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AppConfigs to delete
     */
    where?: AppConfigWhereInput
  }

  /**
   * AppConfig without action
   */
  export type AppConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AppConfig
     */
    select?: AppConfigSelect<ExtArgs> | null
  }


  /**
   * Model JenisPelanggaran
   */

  export type AggregateJenisPelanggaran = {
    _count: JenisPelanggaranCountAggregateOutputType | null
    _avg: JenisPelanggaranAvgAggregateOutputType | null
    _sum: JenisPelanggaranSumAggregateOutputType | null
    _min: JenisPelanggaranMinAggregateOutputType | null
    _max: JenisPelanggaranMaxAggregateOutputType | null
  }

  export type JenisPelanggaranAvgAggregateOutputType = {
    poin: number | null
  }

  export type JenisPelanggaranSumAggregateOutputType = {
    poin: number | null
  }

  export type JenisPelanggaranMinAggregateOutputType = {
    id: string | null
    kode: string | null
    nama: string | null
    kategori: $Enums.KategoriPelanggaran | null
    poin: number | null
    deskripsi: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JenisPelanggaranMaxAggregateOutputType = {
    id: string | null
    kode: string | null
    nama: string | null
    kategori: $Enums.KategoriPelanggaran | null
    poin: number | null
    deskripsi: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JenisPelanggaranCountAggregateOutputType = {
    id: number
    kode: number
    nama: number
    kategori: number
    poin: number
    deskripsi: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JenisPelanggaranAvgAggregateInputType = {
    poin?: true
  }

  export type JenisPelanggaranSumAggregateInputType = {
    poin?: true
  }

  export type JenisPelanggaranMinAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    kategori?: true
    poin?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JenisPelanggaranMaxAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    kategori?: true
    poin?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JenisPelanggaranCountAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    kategori?: true
    poin?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JenisPelanggaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JenisPelanggaran to aggregate.
     */
    where?: JenisPelanggaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPelanggarans to fetch.
     */
    orderBy?: JenisPelanggaranOrderByWithRelationInput | JenisPelanggaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JenisPelanggaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPelanggarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPelanggarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JenisPelanggarans
    **/
    _count?: true | JenisPelanggaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JenisPelanggaranAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JenisPelanggaranSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JenisPelanggaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JenisPelanggaranMaxAggregateInputType
  }

  export type GetJenisPelanggaranAggregateType<T extends JenisPelanggaranAggregateArgs> = {
        [P in keyof T & keyof AggregateJenisPelanggaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJenisPelanggaran[P]>
      : GetScalarType<T[P], AggregateJenisPelanggaran[P]>
  }




  export type JenisPelanggaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JenisPelanggaranWhereInput
    orderBy?: JenisPelanggaranOrderByWithAggregationInput | JenisPelanggaranOrderByWithAggregationInput[]
    by: JenisPelanggaranScalarFieldEnum[] | JenisPelanggaranScalarFieldEnum
    having?: JenisPelanggaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JenisPelanggaranCountAggregateInputType | true
    _avg?: JenisPelanggaranAvgAggregateInputType
    _sum?: JenisPelanggaranSumAggregateInputType
    _min?: JenisPelanggaranMinAggregateInputType
    _max?: JenisPelanggaranMaxAggregateInputType
  }

  export type JenisPelanggaranGroupByOutputType = {
    id: string
    kode: string
    nama: string
    kategori: $Enums.KategoriPelanggaran
    poin: number
    deskripsi: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: JenisPelanggaranCountAggregateOutputType | null
    _avg: JenisPelanggaranAvgAggregateOutputType | null
    _sum: JenisPelanggaranSumAggregateOutputType | null
    _min: JenisPelanggaranMinAggregateOutputType | null
    _max: JenisPelanggaranMaxAggregateOutputType | null
  }

  type GetJenisPelanggaranGroupByPayload<T extends JenisPelanggaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JenisPelanggaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JenisPelanggaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JenisPelanggaranGroupByOutputType[P]>
            : GetScalarType<T[P], JenisPelanggaranGroupByOutputType[P]>
        }
      >
    >


  export type JenisPelanggaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kode?: boolean
    nama?: boolean
    kategori?: boolean
    poin?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    poinList?: boolean | JenisPelanggaran$poinListArgs<ExtArgs>
    kasusList?: boolean | JenisPelanggaran$kasusListArgs<ExtArgs>
    _count?: boolean | JenisPelanggaranCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jenisPelanggaran"]>

  export type JenisPelanggaranSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kode?: boolean
    nama?: boolean
    kategori?: boolean
    poin?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jenisPelanggaran"]>

  export type JenisPelanggaranSelectScalar = {
    id?: boolean
    kode?: boolean
    nama?: boolean
    kategori?: boolean
    poin?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JenisPelanggaranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poinList?: boolean | JenisPelanggaran$poinListArgs<ExtArgs>
    kasusList?: boolean | JenisPelanggaran$kasusListArgs<ExtArgs>
    _count?: boolean | JenisPelanggaranCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JenisPelanggaranIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JenisPelanggaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JenisPelanggaran"
    objects: {
      poinList: Prisma.$PoinSiswaPayload<ExtArgs>[]
      kasusList: Prisma.$KasusSiswaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kode: string
      nama: string
      kategori: $Enums.KategoriPelanggaran
      poin: number
      deskripsi: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jenisPelanggaran"]>
    composites: {}
  }

  type JenisPelanggaranGetPayload<S extends boolean | null | undefined | JenisPelanggaranDefaultArgs> = $Result.GetResult<Prisma.$JenisPelanggaranPayload, S>

  type JenisPelanggaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JenisPelanggaranFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JenisPelanggaranCountAggregateInputType | true
    }

  export interface JenisPelanggaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JenisPelanggaran'], meta: { name: 'JenisPelanggaran' } }
    /**
     * Find zero or one JenisPelanggaran that matches the filter.
     * @param {JenisPelanggaranFindUniqueArgs} args - Arguments to find a JenisPelanggaran
     * @example
     * // Get one JenisPelanggaran
     * const jenisPelanggaran = await prisma.jenisPelanggaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JenisPelanggaranFindUniqueArgs>(args: SelectSubset<T, JenisPelanggaranFindUniqueArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JenisPelanggaran that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JenisPelanggaranFindUniqueOrThrowArgs} args - Arguments to find a JenisPelanggaran
     * @example
     * // Get one JenisPelanggaran
     * const jenisPelanggaran = await prisma.jenisPelanggaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JenisPelanggaranFindUniqueOrThrowArgs>(args: SelectSubset<T, JenisPelanggaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JenisPelanggaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranFindFirstArgs} args - Arguments to find a JenisPelanggaran
     * @example
     * // Get one JenisPelanggaran
     * const jenisPelanggaran = await prisma.jenisPelanggaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JenisPelanggaranFindFirstArgs>(args?: SelectSubset<T, JenisPelanggaranFindFirstArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JenisPelanggaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranFindFirstOrThrowArgs} args - Arguments to find a JenisPelanggaran
     * @example
     * // Get one JenisPelanggaran
     * const jenisPelanggaran = await prisma.jenisPelanggaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JenisPelanggaranFindFirstOrThrowArgs>(args?: SelectSubset<T, JenisPelanggaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JenisPelanggarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JenisPelanggarans
     * const jenisPelanggarans = await prisma.jenisPelanggaran.findMany()
     * 
     * // Get first 10 JenisPelanggarans
     * const jenisPelanggarans = await prisma.jenisPelanggaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jenisPelanggaranWithIdOnly = await prisma.jenisPelanggaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JenisPelanggaranFindManyArgs>(args?: SelectSubset<T, JenisPelanggaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JenisPelanggaran.
     * @param {JenisPelanggaranCreateArgs} args - Arguments to create a JenisPelanggaran.
     * @example
     * // Create one JenisPelanggaran
     * const JenisPelanggaran = await prisma.jenisPelanggaran.create({
     *   data: {
     *     // ... data to create a JenisPelanggaran
     *   }
     * })
     * 
     */
    create<T extends JenisPelanggaranCreateArgs>(args: SelectSubset<T, JenisPelanggaranCreateArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JenisPelanggarans.
     * @param {JenisPelanggaranCreateManyArgs} args - Arguments to create many JenisPelanggarans.
     * @example
     * // Create many JenisPelanggarans
     * const jenisPelanggaran = await prisma.jenisPelanggaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JenisPelanggaranCreateManyArgs>(args?: SelectSubset<T, JenisPelanggaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JenisPelanggarans and returns the data saved in the database.
     * @param {JenisPelanggaranCreateManyAndReturnArgs} args - Arguments to create many JenisPelanggarans.
     * @example
     * // Create many JenisPelanggarans
     * const jenisPelanggaran = await prisma.jenisPelanggaran.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JenisPelanggarans and only return the `id`
     * const jenisPelanggaranWithIdOnly = await prisma.jenisPelanggaran.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JenisPelanggaranCreateManyAndReturnArgs>(args?: SelectSubset<T, JenisPelanggaranCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JenisPelanggaran.
     * @param {JenisPelanggaranDeleteArgs} args - Arguments to delete one JenisPelanggaran.
     * @example
     * // Delete one JenisPelanggaran
     * const JenisPelanggaran = await prisma.jenisPelanggaran.delete({
     *   where: {
     *     // ... filter to delete one JenisPelanggaran
     *   }
     * })
     * 
     */
    delete<T extends JenisPelanggaranDeleteArgs>(args: SelectSubset<T, JenisPelanggaranDeleteArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JenisPelanggaran.
     * @param {JenisPelanggaranUpdateArgs} args - Arguments to update one JenisPelanggaran.
     * @example
     * // Update one JenisPelanggaran
     * const jenisPelanggaran = await prisma.jenisPelanggaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JenisPelanggaranUpdateArgs>(args: SelectSubset<T, JenisPelanggaranUpdateArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JenisPelanggarans.
     * @param {JenisPelanggaranDeleteManyArgs} args - Arguments to filter JenisPelanggarans to delete.
     * @example
     * // Delete a few JenisPelanggarans
     * const { count } = await prisma.jenisPelanggaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JenisPelanggaranDeleteManyArgs>(args?: SelectSubset<T, JenisPelanggaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JenisPelanggarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JenisPelanggarans
     * const jenisPelanggaran = await prisma.jenisPelanggaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JenisPelanggaranUpdateManyArgs>(args: SelectSubset<T, JenisPelanggaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JenisPelanggaran.
     * @param {JenisPelanggaranUpsertArgs} args - Arguments to update or create a JenisPelanggaran.
     * @example
     * // Update or create a JenisPelanggaran
     * const jenisPelanggaran = await prisma.jenisPelanggaran.upsert({
     *   create: {
     *     // ... data to create a JenisPelanggaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JenisPelanggaran we want to update
     *   }
     * })
     */
    upsert<T extends JenisPelanggaranUpsertArgs>(args: SelectSubset<T, JenisPelanggaranUpsertArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JenisPelanggarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranCountArgs} args - Arguments to filter JenisPelanggarans to count.
     * @example
     * // Count the number of JenisPelanggarans
     * const count = await prisma.jenisPelanggaran.count({
     *   where: {
     *     // ... the filter for the JenisPelanggarans we want to count
     *   }
     * })
    **/
    count<T extends JenisPelanggaranCountArgs>(
      args?: Subset<T, JenisPelanggaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JenisPelanggaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JenisPelanggaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JenisPelanggaranAggregateArgs>(args: Subset<T, JenisPelanggaranAggregateArgs>): Prisma.PrismaPromise<GetJenisPelanggaranAggregateType<T>>

    /**
     * Group by JenisPelanggaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPelanggaranGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JenisPelanggaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JenisPelanggaranGroupByArgs['orderBy'] }
        : { orderBy?: JenisPelanggaranGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JenisPelanggaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJenisPelanggaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JenisPelanggaran model
   */
  readonly fields: JenisPelanggaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JenisPelanggaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JenisPelanggaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    poinList<T extends JenisPelanggaran$poinListArgs<ExtArgs> = {}>(args?: Subset<T, JenisPelanggaran$poinListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findMany"> | Null>
    kasusList<T extends JenisPelanggaran$kasusListArgs<ExtArgs> = {}>(args?: Subset<T, JenisPelanggaran$kasusListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JenisPelanggaran model
   */ 
  interface JenisPelanggaranFieldRefs {
    readonly id: FieldRef<"JenisPelanggaran", 'String'>
    readonly kode: FieldRef<"JenisPelanggaran", 'String'>
    readonly nama: FieldRef<"JenisPelanggaran", 'String'>
    readonly kategori: FieldRef<"JenisPelanggaran", 'KategoriPelanggaran'>
    readonly poin: FieldRef<"JenisPelanggaran", 'Int'>
    readonly deskripsi: FieldRef<"JenisPelanggaran", 'String'>
    readonly isActive: FieldRef<"JenisPelanggaran", 'Boolean'>
    readonly createdAt: FieldRef<"JenisPelanggaran", 'DateTime'>
    readonly updatedAt: FieldRef<"JenisPelanggaran", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JenisPelanggaran findUnique
   */
  export type JenisPelanggaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * Filter, which JenisPelanggaran to fetch.
     */
    where: JenisPelanggaranWhereUniqueInput
  }

  /**
   * JenisPelanggaran findUniqueOrThrow
   */
  export type JenisPelanggaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * Filter, which JenisPelanggaran to fetch.
     */
    where: JenisPelanggaranWhereUniqueInput
  }

  /**
   * JenisPelanggaran findFirst
   */
  export type JenisPelanggaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * Filter, which JenisPelanggaran to fetch.
     */
    where?: JenisPelanggaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPelanggarans to fetch.
     */
    orderBy?: JenisPelanggaranOrderByWithRelationInput | JenisPelanggaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JenisPelanggarans.
     */
    cursor?: JenisPelanggaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPelanggarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPelanggarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JenisPelanggarans.
     */
    distinct?: JenisPelanggaranScalarFieldEnum | JenisPelanggaranScalarFieldEnum[]
  }

  /**
   * JenisPelanggaran findFirstOrThrow
   */
  export type JenisPelanggaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * Filter, which JenisPelanggaran to fetch.
     */
    where?: JenisPelanggaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPelanggarans to fetch.
     */
    orderBy?: JenisPelanggaranOrderByWithRelationInput | JenisPelanggaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JenisPelanggarans.
     */
    cursor?: JenisPelanggaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPelanggarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPelanggarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JenisPelanggarans.
     */
    distinct?: JenisPelanggaranScalarFieldEnum | JenisPelanggaranScalarFieldEnum[]
  }

  /**
   * JenisPelanggaran findMany
   */
  export type JenisPelanggaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * Filter, which JenisPelanggarans to fetch.
     */
    where?: JenisPelanggaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPelanggarans to fetch.
     */
    orderBy?: JenisPelanggaranOrderByWithRelationInput | JenisPelanggaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JenisPelanggarans.
     */
    cursor?: JenisPelanggaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPelanggarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPelanggarans.
     */
    skip?: number
    distinct?: JenisPelanggaranScalarFieldEnum | JenisPelanggaranScalarFieldEnum[]
  }

  /**
   * JenisPelanggaran create
   */
  export type JenisPelanggaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * The data needed to create a JenisPelanggaran.
     */
    data: XOR<JenisPelanggaranCreateInput, JenisPelanggaranUncheckedCreateInput>
  }

  /**
   * JenisPelanggaran createMany
   */
  export type JenisPelanggaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JenisPelanggarans.
     */
    data: JenisPelanggaranCreateManyInput | JenisPelanggaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JenisPelanggaran createManyAndReturn
   */
  export type JenisPelanggaranCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JenisPelanggarans.
     */
    data: JenisPelanggaranCreateManyInput | JenisPelanggaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JenisPelanggaran update
   */
  export type JenisPelanggaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * The data needed to update a JenisPelanggaran.
     */
    data: XOR<JenisPelanggaranUpdateInput, JenisPelanggaranUncheckedUpdateInput>
    /**
     * Choose, which JenisPelanggaran to update.
     */
    where: JenisPelanggaranWhereUniqueInput
  }

  /**
   * JenisPelanggaran updateMany
   */
  export type JenisPelanggaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JenisPelanggarans.
     */
    data: XOR<JenisPelanggaranUpdateManyMutationInput, JenisPelanggaranUncheckedUpdateManyInput>
    /**
     * Filter which JenisPelanggarans to update
     */
    where?: JenisPelanggaranWhereInput
  }

  /**
   * JenisPelanggaran upsert
   */
  export type JenisPelanggaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * The filter to search for the JenisPelanggaran to update in case it exists.
     */
    where: JenisPelanggaranWhereUniqueInput
    /**
     * In case the JenisPelanggaran found by the `where` argument doesn't exist, create a new JenisPelanggaran with this data.
     */
    create: XOR<JenisPelanggaranCreateInput, JenisPelanggaranUncheckedCreateInput>
    /**
     * In case the JenisPelanggaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JenisPelanggaranUpdateInput, JenisPelanggaranUncheckedUpdateInput>
  }

  /**
   * JenisPelanggaran delete
   */
  export type JenisPelanggaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    /**
     * Filter which JenisPelanggaran to delete.
     */
    where: JenisPelanggaranWhereUniqueInput
  }

  /**
   * JenisPelanggaran deleteMany
   */
  export type JenisPelanggaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JenisPelanggarans to delete
     */
    where?: JenisPelanggaranWhereInput
  }

  /**
   * JenisPelanggaran.poinList
   */
  export type JenisPelanggaran$poinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    where?: PoinSiswaWhereInput
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    cursor?: PoinSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoinSiswaScalarFieldEnum | PoinSiswaScalarFieldEnum[]
  }

  /**
   * JenisPelanggaran.kasusList
   */
  export type JenisPelanggaran$kasusListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    where?: KasusSiswaWhereInput
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    cursor?: KasusSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KasusSiswaScalarFieldEnum | KasusSiswaScalarFieldEnum[]
  }

  /**
   * JenisPelanggaran without action
   */
  export type JenisPelanggaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
  }


  /**
   * Model JenisPrestasi
   */

  export type AggregateJenisPrestasi = {
    _count: JenisPrestasiCountAggregateOutputType | null
    _avg: JenisPrestasiAvgAggregateOutputType | null
    _sum: JenisPrestasiSumAggregateOutputType | null
    _min: JenisPrestasiMinAggregateOutputType | null
    _max: JenisPrestasiMaxAggregateOutputType | null
  }

  export type JenisPrestasiAvgAggregateOutputType = {
    poin: number | null
  }

  export type JenisPrestasiSumAggregateOutputType = {
    poin: number | null
  }

  export type JenisPrestasiMinAggregateOutputType = {
    id: string | null
    kode: string | null
    nama: string | null
    kategori: $Enums.KategoriPrestasi | null
    poin: number | null
    deskripsi: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JenisPrestasiMaxAggregateOutputType = {
    id: string | null
    kode: string | null
    nama: string | null
    kategori: $Enums.KategoriPrestasi | null
    poin: number | null
    deskripsi: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JenisPrestasiCountAggregateOutputType = {
    id: number
    kode: number
    nama: number
    kategori: number
    poin: number
    deskripsi: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JenisPrestasiAvgAggregateInputType = {
    poin?: true
  }

  export type JenisPrestasiSumAggregateInputType = {
    poin?: true
  }

  export type JenisPrestasiMinAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    kategori?: true
    poin?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JenisPrestasiMaxAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    kategori?: true
    poin?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JenisPrestasiCountAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    kategori?: true
    poin?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JenisPrestasiAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JenisPrestasi to aggregate.
     */
    where?: JenisPrestasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPrestasis to fetch.
     */
    orderBy?: JenisPrestasiOrderByWithRelationInput | JenisPrestasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JenisPrestasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPrestasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPrestasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JenisPrestasis
    **/
    _count?: true | JenisPrestasiCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JenisPrestasiAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JenisPrestasiSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JenisPrestasiMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JenisPrestasiMaxAggregateInputType
  }

  export type GetJenisPrestasiAggregateType<T extends JenisPrestasiAggregateArgs> = {
        [P in keyof T & keyof AggregateJenisPrestasi]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJenisPrestasi[P]>
      : GetScalarType<T[P], AggregateJenisPrestasi[P]>
  }




  export type JenisPrestasiGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JenisPrestasiWhereInput
    orderBy?: JenisPrestasiOrderByWithAggregationInput | JenisPrestasiOrderByWithAggregationInput[]
    by: JenisPrestasiScalarFieldEnum[] | JenisPrestasiScalarFieldEnum
    having?: JenisPrestasiScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JenisPrestasiCountAggregateInputType | true
    _avg?: JenisPrestasiAvgAggregateInputType
    _sum?: JenisPrestasiSumAggregateInputType
    _min?: JenisPrestasiMinAggregateInputType
    _max?: JenisPrestasiMaxAggregateInputType
  }

  export type JenisPrestasiGroupByOutputType = {
    id: string
    kode: string
    nama: string
    kategori: $Enums.KategoriPrestasi
    poin: number
    deskripsi: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: JenisPrestasiCountAggregateOutputType | null
    _avg: JenisPrestasiAvgAggregateOutputType | null
    _sum: JenisPrestasiSumAggregateOutputType | null
    _min: JenisPrestasiMinAggregateOutputType | null
    _max: JenisPrestasiMaxAggregateOutputType | null
  }

  type GetJenisPrestasiGroupByPayload<T extends JenisPrestasiGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JenisPrestasiGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JenisPrestasiGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JenisPrestasiGroupByOutputType[P]>
            : GetScalarType<T[P], JenisPrestasiGroupByOutputType[P]>
        }
      >
    >


  export type JenisPrestasiSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kode?: boolean
    nama?: boolean
    kategori?: boolean
    poin?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    poinList?: boolean | JenisPrestasi$poinListArgs<ExtArgs>
    _count?: boolean | JenisPrestasiCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jenisPrestasi"]>

  export type JenisPrestasiSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kode?: boolean
    nama?: boolean
    kategori?: boolean
    poin?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jenisPrestasi"]>

  export type JenisPrestasiSelectScalar = {
    id?: boolean
    kode?: boolean
    nama?: boolean
    kategori?: boolean
    poin?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JenisPrestasiInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poinList?: boolean | JenisPrestasi$poinListArgs<ExtArgs>
    _count?: boolean | JenisPrestasiCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JenisPrestasiIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JenisPrestasiPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JenisPrestasi"
    objects: {
      poinList: Prisma.$PoinSiswaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kode: string
      nama: string
      kategori: $Enums.KategoriPrestasi
      poin: number
      deskripsi: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jenisPrestasi"]>
    composites: {}
  }

  type JenisPrestasiGetPayload<S extends boolean | null | undefined | JenisPrestasiDefaultArgs> = $Result.GetResult<Prisma.$JenisPrestasiPayload, S>

  type JenisPrestasiCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JenisPrestasiFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JenisPrestasiCountAggregateInputType | true
    }

  export interface JenisPrestasiDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JenisPrestasi'], meta: { name: 'JenisPrestasi' } }
    /**
     * Find zero or one JenisPrestasi that matches the filter.
     * @param {JenisPrestasiFindUniqueArgs} args - Arguments to find a JenisPrestasi
     * @example
     * // Get one JenisPrestasi
     * const jenisPrestasi = await prisma.jenisPrestasi.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JenisPrestasiFindUniqueArgs>(args: SelectSubset<T, JenisPrestasiFindUniqueArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JenisPrestasi that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JenisPrestasiFindUniqueOrThrowArgs} args - Arguments to find a JenisPrestasi
     * @example
     * // Get one JenisPrestasi
     * const jenisPrestasi = await prisma.jenisPrestasi.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JenisPrestasiFindUniqueOrThrowArgs>(args: SelectSubset<T, JenisPrestasiFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JenisPrestasi that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiFindFirstArgs} args - Arguments to find a JenisPrestasi
     * @example
     * // Get one JenisPrestasi
     * const jenisPrestasi = await prisma.jenisPrestasi.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JenisPrestasiFindFirstArgs>(args?: SelectSubset<T, JenisPrestasiFindFirstArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JenisPrestasi that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiFindFirstOrThrowArgs} args - Arguments to find a JenisPrestasi
     * @example
     * // Get one JenisPrestasi
     * const jenisPrestasi = await prisma.jenisPrestasi.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JenisPrestasiFindFirstOrThrowArgs>(args?: SelectSubset<T, JenisPrestasiFindFirstOrThrowArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JenisPrestasis that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JenisPrestasis
     * const jenisPrestasis = await prisma.jenisPrestasi.findMany()
     * 
     * // Get first 10 JenisPrestasis
     * const jenisPrestasis = await prisma.jenisPrestasi.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jenisPrestasiWithIdOnly = await prisma.jenisPrestasi.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JenisPrestasiFindManyArgs>(args?: SelectSubset<T, JenisPrestasiFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JenisPrestasi.
     * @param {JenisPrestasiCreateArgs} args - Arguments to create a JenisPrestasi.
     * @example
     * // Create one JenisPrestasi
     * const JenisPrestasi = await prisma.jenisPrestasi.create({
     *   data: {
     *     // ... data to create a JenisPrestasi
     *   }
     * })
     * 
     */
    create<T extends JenisPrestasiCreateArgs>(args: SelectSubset<T, JenisPrestasiCreateArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JenisPrestasis.
     * @param {JenisPrestasiCreateManyArgs} args - Arguments to create many JenisPrestasis.
     * @example
     * // Create many JenisPrestasis
     * const jenisPrestasi = await prisma.jenisPrestasi.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JenisPrestasiCreateManyArgs>(args?: SelectSubset<T, JenisPrestasiCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JenisPrestasis and returns the data saved in the database.
     * @param {JenisPrestasiCreateManyAndReturnArgs} args - Arguments to create many JenisPrestasis.
     * @example
     * // Create many JenisPrestasis
     * const jenisPrestasi = await prisma.jenisPrestasi.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JenisPrestasis and only return the `id`
     * const jenisPrestasiWithIdOnly = await prisma.jenisPrestasi.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JenisPrestasiCreateManyAndReturnArgs>(args?: SelectSubset<T, JenisPrestasiCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JenisPrestasi.
     * @param {JenisPrestasiDeleteArgs} args - Arguments to delete one JenisPrestasi.
     * @example
     * // Delete one JenisPrestasi
     * const JenisPrestasi = await prisma.jenisPrestasi.delete({
     *   where: {
     *     // ... filter to delete one JenisPrestasi
     *   }
     * })
     * 
     */
    delete<T extends JenisPrestasiDeleteArgs>(args: SelectSubset<T, JenisPrestasiDeleteArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JenisPrestasi.
     * @param {JenisPrestasiUpdateArgs} args - Arguments to update one JenisPrestasi.
     * @example
     * // Update one JenisPrestasi
     * const jenisPrestasi = await prisma.jenisPrestasi.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JenisPrestasiUpdateArgs>(args: SelectSubset<T, JenisPrestasiUpdateArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JenisPrestasis.
     * @param {JenisPrestasiDeleteManyArgs} args - Arguments to filter JenisPrestasis to delete.
     * @example
     * // Delete a few JenisPrestasis
     * const { count } = await prisma.jenisPrestasi.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JenisPrestasiDeleteManyArgs>(args?: SelectSubset<T, JenisPrestasiDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JenisPrestasis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JenisPrestasis
     * const jenisPrestasi = await prisma.jenisPrestasi.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JenisPrestasiUpdateManyArgs>(args: SelectSubset<T, JenisPrestasiUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JenisPrestasi.
     * @param {JenisPrestasiUpsertArgs} args - Arguments to update or create a JenisPrestasi.
     * @example
     * // Update or create a JenisPrestasi
     * const jenisPrestasi = await prisma.jenisPrestasi.upsert({
     *   create: {
     *     // ... data to create a JenisPrestasi
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JenisPrestasi we want to update
     *   }
     * })
     */
    upsert<T extends JenisPrestasiUpsertArgs>(args: SelectSubset<T, JenisPrestasiUpsertArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JenisPrestasis.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiCountArgs} args - Arguments to filter JenisPrestasis to count.
     * @example
     * // Count the number of JenisPrestasis
     * const count = await prisma.jenisPrestasi.count({
     *   where: {
     *     // ... the filter for the JenisPrestasis we want to count
     *   }
     * })
    **/
    count<T extends JenisPrestasiCountArgs>(
      args?: Subset<T, JenisPrestasiCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JenisPrestasiCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JenisPrestasi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JenisPrestasiAggregateArgs>(args: Subset<T, JenisPrestasiAggregateArgs>): Prisma.PrismaPromise<GetJenisPrestasiAggregateType<T>>

    /**
     * Group by JenisPrestasi.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisPrestasiGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JenisPrestasiGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JenisPrestasiGroupByArgs['orderBy'] }
        : { orderBy?: JenisPrestasiGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JenisPrestasiGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJenisPrestasiGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JenisPrestasi model
   */
  readonly fields: JenisPrestasiFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JenisPrestasi.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JenisPrestasiClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    poinList<T extends JenisPrestasi$poinListArgs<ExtArgs> = {}>(args?: Subset<T, JenisPrestasi$poinListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JenisPrestasi model
   */ 
  interface JenisPrestasiFieldRefs {
    readonly id: FieldRef<"JenisPrestasi", 'String'>
    readonly kode: FieldRef<"JenisPrestasi", 'String'>
    readonly nama: FieldRef<"JenisPrestasi", 'String'>
    readonly kategori: FieldRef<"JenisPrestasi", 'KategoriPrestasi'>
    readonly poin: FieldRef<"JenisPrestasi", 'Int'>
    readonly deskripsi: FieldRef<"JenisPrestasi", 'String'>
    readonly isActive: FieldRef<"JenisPrestasi", 'Boolean'>
    readonly createdAt: FieldRef<"JenisPrestasi", 'DateTime'>
    readonly updatedAt: FieldRef<"JenisPrestasi", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JenisPrestasi findUnique
   */
  export type JenisPrestasiFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * Filter, which JenisPrestasi to fetch.
     */
    where: JenisPrestasiWhereUniqueInput
  }

  /**
   * JenisPrestasi findUniqueOrThrow
   */
  export type JenisPrestasiFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * Filter, which JenisPrestasi to fetch.
     */
    where: JenisPrestasiWhereUniqueInput
  }

  /**
   * JenisPrestasi findFirst
   */
  export type JenisPrestasiFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * Filter, which JenisPrestasi to fetch.
     */
    where?: JenisPrestasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPrestasis to fetch.
     */
    orderBy?: JenisPrestasiOrderByWithRelationInput | JenisPrestasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JenisPrestasis.
     */
    cursor?: JenisPrestasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPrestasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPrestasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JenisPrestasis.
     */
    distinct?: JenisPrestasiScalarFieldEnum | JenisPrestasiScalarFieldEnum[]
  }

  /**
   * JenisPrestasi findFirstOrThrow
   */
  export type JenisPrestasiFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * Filter, which JenisPrestasi to fetch.
     */
    where?: JenisPrestasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPrestasis to fetch.
     */
    orderBy?: JenisPrestasiOrderByWithRelationInput | JenisPrestasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JenisPrestasis.
     */
    cursor?: JenisPrestasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPrestasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPrestasis.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JenisPrestasis.
     */
    distinct?: JenisPrestasiScalarFieldEnum | JenisPrestasiScalarFieldEnum[]
  }

  /**
   * JenisPrestasi findMany
   */
  export type JenisPrestasiFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * Filter, which JenisPrestasis to fetch.
     */
    where?: JenisPrestasiWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisPrestasis to fetch.
     */
    orderBy?: JenisPrestasiOrderByWithRelationInput | JenisPrestasiOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JenisPrestasis.
     */
    cursor?: JenisPrestasiWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisPrestasis from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisPrestasis.
     */
    skip?: number
    distinct?: JenisPrestasiScalarFieldEnum | JenisPrestasiScalarFieldEnum[]
  }

  /**
   * JenisPrestasi create
   */
  export type JenisPrestasiCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * The data needed to create a JenisPrestasi.
     */
    data: XOR<JenisPrestasiCreateInput, JenisPrestasiUncheckedCreateInput>
  }

  /**
   * JenisPrestasi createMany
   */
  export type JenisPrestasiCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JenisPrestasis.
     */
    data: JenisPrestasiCreateManyInput | JenisPrestasiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JenisPrestasi createManyAndReturn
   */
  export type JenisPrestasiCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JenisPrestasis.
     */
    data: JenisPrestasiCreateManyInput | JenisPrestasiCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JenisPrestasi update
   */
  export type JenisPrestasiUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * The data needed to update a JenisPrestasi.
     */
    data: XOR<JenisPrestasiUpdateInput, JenisPrestasiUncheckedUpdateInput>
    /**
     * Choose, which JenisPrestasi to update.
     */
    where: JenisPrestasiWhereUniqueInput
  }

  /**
   * JenisPrestasi updateMany
   */
  export type JenisPrestasiUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JenisPrestasis.
     */
    data: XOR<JenisPrestasiUpdateManyMutationInput, JenisPrestasiUncheckedUpdateManyInput>
    /**
     * Filter which JenisPrestasis to update
     */
    where?: JenisPrestasiWhereInput
  }

  /**
   * JenisPrestasi upsert
   */
  export type JenisPrestasiUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * The filter to search for the JenisPrestasi to update in case it exists.
     */
    where: JenisPrestasiWhereUniqueInput
    /**
     * In case the JenisPrestasi found by the `where` argument doesn't exist, create a new JenisPrestasi with this data.
     */
    create: XOR<JenisPrestasiCreateInput, JenisPrestasiUncheckedCreateInput>
    /**
     * In case the JenisPrestasi was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JenisPrestasiUpdateInput, JenisPrestasiUncheckedUpdateInput>
  }

  /**
   * JenisPrestasi delete
   */
  export type JenisPrestasiDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    /**
     * Filter which JenisPrestasi to delete.
     */
    where: JenisPrestasiWhereUniqueInput
  }

  /**
   * JenisPrestasi deleteMany
   */
  export type JenisPrestasiDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JenisPrestasis to delete
     */
    where?: JenisPrestasiWhereInput
  }

  /**
   * JenisPrestasi.poinList
   */
  export type JenisPrestasi$poinListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    where?: PoinSiswaWhereInput
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    cursor?: PoinSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PoinSiswaScalarFieldEnum | PoinSiswaScalarFieldEnum[]
  }

  /**
   * JenisPrestasi without action
   */
  export type JenisPrestasiDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
  }


  /**
   * Model JenisKasus
   */

  export type AggregateJenisKasus = {
    _count: JenisKasusCountAggregateOutputType | null
    _min: JenisKasusMinAggregateOutputType | null
    _max: JenisKasusMaxAggregateOutputType | null
  }

  export type JenisKasusMinAggregateOutputType = {
    id: string | null
    kode: string | null
    nama: string | null
    deskripsi: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JenisKasusMaxAggregateOutputType = {
    id: string | null
    kode: string | null
    nama: string | null
    deskripsi: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type JenisKasusCountAggregateOutputType = {
    id: number
    kode: number
    nama: number
    deskripsi: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type JenisKasusMinAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JenisKasusMaxAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type JenisKasusCountAggregateInputType = {
    id?: true
    kode?: true
    nama?: true
    deskripsi?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type JenisKasusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JenisKasus to aggregate.
     */
    where?: JenisKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisKasuses to fetch.
     */
    orderBy?: JenisKasusOrderByWithRelationInput | JenisKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JenisKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisKasuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JenisKasuses
    **/
    _count?: true | JenisKasusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JenisKasusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JenisKasusMaxAggregateInputType
  }

  export type GetJenisKasusAggregateType<T extends JenisKasusAggregateArgs> = {
        [P in keyof T & keyof AggregateJenisKasus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJenisKasus[P]>
      : GetScalarType<T[P], AggregateJenisKasus[P]>
  }




  export type JenisKasusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JenisKasusWhereInput
    orderBy?: JenisKasusOrderByWithAggregationInput | JenisKasusOrderByWithAggregationInput[]
    by: JenisKasusScalarFieldEnum[] | JenisKasusScalarFieldEnum
    having?: JenisKasusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JenisKasusCountAggregateInputType | true
    _min?: JenisKasusMinAggregateInputType
    _max?: JenisKasusMaxAggregateInputType
  }

  export type JenisKasusGroupByOutputType = {
    id: string
    kode: string
    nama: string
    deskripsi: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: JenisKasusCountAggregateOutputType | null
    _min: JenisKasusMinAggregateOutputType | null
    _max: JenisKasusMaxAggregateOutputType | null
  }

  type GetJenisKasusGroupByPayload<T extends JenisKasusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JenisKasusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JenisKasusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JenisKasusGroupByOutputType[P]>
            : GetScalarType<T[P], JenisKasusGroupByOutputType[P]>
        }
      >
    >


  export type JenisKasusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kode?: boolean
    nama?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    kasusList?: boolean | JenisKasus$kasusListArgs<ExtArgs>
    _count?: boolean | JenisKasusCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["jenisKasus"]>

  export type JenisKasusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kode?: boolean
    nama?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["jenisKasus"]>

  export type JenisKasusSelectScalar = {
    id?: boolean
    kode?: boolean
    nama?: boolean
    deskripsi?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type JenisKasusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kasusList?: boolean | JenisKasus$kasusListArgs<ExtArgs>
    _count?: boolean | JenisKasusCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type JenisKasusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $JenisKasusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JenisKasus"
    objects: {
      kasusList: Prisma.$KasusSiswaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kode: string
      nama: string
      deskripsi: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["jenisKasus"]>
    composites: {}
  }

  type JenisKasusGetPayload<S extends boolean | null | undefined | JenisKasusDefaultArgs> = $Result.GetResult<Prisma.$JenisKasusPayload, S>

  type JenisKasusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JenisKasusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JenisKasusCountAggregateInputType | true
    }

  export interface JenisKasusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JenisKasus'], meta: { name: 'JenisKasus' } }
    /**
     * Find zero or one JenisKasus that matches the filter.
     * @param {JenisKasusFindUniqueArgs} args - Arguments to find a JenisKasus
     * @example
     * // Get one JenisKasus
     * const jenisKasus = await prisma.jenisKasus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends JenisKasusFindUniqueArgs>(args: SelectSubset<T, JenisKasusFindUniqueArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one JenisKasus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {JenisKasusFindUniqueOrThrowArgs} args - Arguments to find a JenisKasus
     * @example
     * // Get one JenisKasus
     * const jenisKasus = await prisma.jenisKasus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends JenisKasusFindUniqueOrThrowArgs>(args: SelectSubset<T, JenisKasusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first JenisKasus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusFindFirstArgs} args - Arguments to find a JenisKasus
     * @example
     * // Get one JenisKasus
     * const jenisKasus = await prisma.jenisKasus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends JenisKasusFindFirstArgs>(args?: SelectSubset<T, JenisKasusFindFirstArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first JenisKasus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusFindFirstOrThrowArgs} args - Arguments to find a JenisKasus
     * @example
     * // Get one JenisKasus
     * const jenisKasus = await prisma.jenisKasus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends JenisKasusFindFirstOrThrowArgs>(args?: SelectSubset<T, JenisKasusFindFirstOrThrowArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more JenisKasuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JenisKasuses
     * const jenisKasuses = await prisma.jenisKasus.findMany()
     * 
     * // Get first 10 JenisKasuses
     * const jenisKasuses = await prisma.jenisKasus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jenisKasusWithIdOnly = await prisma.jenisKasus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends JenisKasusFindManyArgs>(args?: SelectSubset<T, JenisKasusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a JenisKasus.
     * @param {JenisKasusCreateArgs} args - Arguments to create a JenisKasus.
     * @example
     * // Create one JenisKasus
     * const JenisKasus = await prisma.jenisKasus.create({
     *   data: {
     *     // ... data to create a JenisKasus
     *   }
     * })
     * 
     */
    create<T extends JenisKasusCreateArgs>(args: SelectSubset<T, JenisKasusCreateArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many JenisKasuses.
     * @param {JenisKasusCreateManyArgs} args - Arguments to create many JenisKasuses.
     * @example
     * // Create many JenisKasuses
     * const jenisKasus = await prisma.jenisKasus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends JenisKasusCreateManyArgs>(args?: SelectSubset<T, JenisKasusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many JenisKasuses and returns the data saved in the database.
     * @param {JenisKasusCreateManyAndReturnArgs} args - Arguments to create many JenisKasuses.
     * @example
     * // Create many JenisKasuses
     * const jenisKasus = await prisma.jenisKasus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many JenisKasuses and only return the `id`
     * const jenisKasusWithIdOnly = await prisma.jenisKasus.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends JenisKasusCreateManyAndReturnArgs>(args?: SelectSubset<T, JenisKasusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a JenisKasus.
     * @param {JenisKasusDeleteArgs} args - Arguments to delete one JenisKasus.
     * @example
     * // Delete one JenisKasus
     * const JenisKasus = await prisma.jenisKasus.delete({
     *   where: {
     *     // ... filter to delete one JenisKasus
     *   }
     * })
     * 
     */
    delete<T extends JenisKasusDeleteArgs>(args: SelectSubset<T, JenisKasusDeleteArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one JenisKasus.
     * @param {JenisKasusUpdateArgs} args - Arguments to update one JenisKasus.
     * @example
     * // Update one JenisKasus
     * const jenisKasus = await prisma.jenisKasus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends JenisKasusUpdateArgs>(args: SelectSubset<T, JenisKasusUpdateArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more JenisKasuses.
     * @param {JenisKasusDeleteManyArgs} args - Arguments to filter JenisKasuses to delete.
     * @example
     * // Delete a few JenisKasuses
     * const { count } = await prisma.jenisKasus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends JenisKasusDeleteManyArgs>(args?: SelectSubset<T, JenisKasusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JenisKasuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JenisKasuses
     * const jenisKasus = await prisma.jenisKasus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends JenisKasusUpdateManyArgs>(args: SelectSubset<T, JenisKasusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JenisKasus.
     * @param {JenisKasusUpsertArgs} args - Arguments to update or create a JenisKasus.
     * @example
     * // Update or create a JenisKasus
     * const jenisKasus = await prisma.jenisKasus.upsert({
     *   create: {
     *     // ... data to create a JenisKasus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JenisKasus we want to update
     *   }
     * })
     */
    upsert<T extends JenisKasusUpsertArgs>(args: SelectSubset<T, JenisKasusUpsertArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of JenisKasuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusCountArgs} args - Arguments to filter JenisKasuses to count.
     * @example
     * // Count the number of JenisKasuses
     * const count = await prisma.jenisKasus.count({
     *   where: {
     *     // ... the filter for the JenisKasuses we want to count
     *   }
     * })
    **/
    count<T extends JenisKasusCountArgs>(
      args?: Subset<T, JenisKasusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JenisKasusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JenisKasus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends JenisKasusAggregateArgs>(args: Subset<T, JenisKasusAggregateArgs>): Prisma.PrismaPromise<GetJenisKasusAggregateType<T>>

    /**
     * Group by JenisKasus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JenisKasusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends JenisKasusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JenisKasusGroupByArgs['orderBy'] }
        : { orderBy?: JenisKasusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, JenisKasusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJenisKasusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JenisKasus model
   */
  readonly fields: JenisKasusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JenisKasus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JenisKasusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kasusList<T extends JenisKasus$kasusListArgs<ExtArgs> = {}>(args?: Subset<T, JenisKasus$kasusListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the JenisKasus model
   */ 
  interface JenisKasusFieldRefs {
    readonly id: FieldRef<"JenisKasus", 'String'>
    readonly kode: FieldRef<"JenisKasus", 'String'>
    readonly nama: FieldRef<"JenisKasus", 'String'>
    readonly deskripsi: FieldRef<"JenisKasus", 'String'>
    readonly isActive: FieldRef<"JenisKasus", 'Boolean'>
    readonly createdAt: FieldRef<"JenisKasus", 'DateTime'>
    readonly updatedAt: FieldRef<"JenisKasus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * JenisKasus findUnique
   */
  export type JenisKasusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * Filter, which JenisKasus to fetch.
     */
    where: JenisKasusWhereUniqueInput
  }

  /**
   * JenisKasus findUniqueOrThrow
   */
  export type JenisKasusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * Filter, which JenisKasus to fetch.
     */
    where: JenisKasusWhereUniqueInput
  }

  /**
   * JenisKasus findFirst
   */
  export type JenisKasusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * Filter, which JenisKasus to fetch.
     */
    where?: JenisKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisKasuses to fetch.
     */
    orderBy?: JenisKasusOrderByWithRelationInput | JenisKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JenisKasuses.
     */
    cursor?: JenisKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisKasuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JenisKasuses.
     */
    distinct?: JenisKasusScalarFieldEnum | JenisKasusScalarFieldEnum[]
  }

  /**
   * JenisKasus findFirstOrThrow
   */
  export type JenisKasusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * Filter, which JenisKasus to fetch.
     */
    where?: JenisKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisKasuses to fetch.
     */
    orderBy?: JenisKasusOrderByWithRelationInput | JenisKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JenisKasuses.
     */
    cursor?: JenisKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisKasuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JenisKasuses.
     */
    distinct?: JenisKasusScalarFieldEnum | JenisKasusScalarFieldEnum[]
  }

  /**
   * JenisKasus findMany
   */
  export type JenisKasusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * Filter, which JenisKasuses to fetch.
     */
    where?: JenisKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JenisKasuses to fetch.
     */
    orderBy?: JenisKasusOrderByWithRelationInput | JenisKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JenisKasuses.
     */
    cursor?: JenisKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JenisKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JenisKasuses.
     */
    skip?: number
    distinct?: JenisKasusScalarFieldEnum | JenisKasusScalarFieldEnum[]
  }

  /**
   * JenisKasus create
   */
  export type JenisKasusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * The data needed to create a JenisKasus.
     */
    data: XOR<JenisKasusCreateInput, JenisKasusUncheckedCreateInput>
  }

  /**
   * JenisKasus createMany
   */
  export type JenisKasusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JenisKasuses.
     */
    data: JenisKasusCreateManyInput | JenisKasusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JenisKasus createManyAndReturn
   */
  export type JenisKasusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many JenisKasuses.
     */
    data: JenisKasusCreateManyInput | JenisKasusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * JenisKasus update
   */
  export type JenisKasusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * The data needed to update a JenisKasus.
     */
    data: XOR<JenisKasusUpdateInput, JenisKasusUncheckedUpdateInput>
    /**
     * Choose, which JenisKasus to update.
     */
    where: JenisKasusWhereUniqueInput
  }

  /**
   * JenisKasus updateMany
   */
  export type JenisKasusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JenisKasuses.
     */
    data: XOR<JenisKasusUpdateManyMutationInput, JenisKasusUncheckedUpdateManyInput>
    /**
     * Filter which JenisKasuses to update
     */
    where?: JenisKasusWhereInput
  }

  /**
   * JenisKasus upsert
   */
  export type JenisKasusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * The filter to search for the JenisKasus to update in case it exists.
     */
    where: JenisKasusWhereUniqueInput
    /**
     * In case the JenisKasus found by the `where` argument doesn't exist, create a new JenisKasus with this data.
     */
    create: XOR<JenisKasusCreateInput, JenisKasusUncheckedCreateInput>
    /**
     * In case the JenisKasus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JenisKasusUpdateInput, JenisKasusUncheckedUpdateInput>
  }

  /**
   * JenisKasus delete
   */
  export type JenisKasusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    /**
     * Filter which JenisKasus to delete.
     */
    where: JenisKasusWhereUniqueInput
  }

  /**
   * JenisKasus deleteMany
   */
  export type JenisKasusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JenisKasuses to delete
     */
    where?: JenisKasusWhereInput
  }

  /**
   * JenisKasus.kasusList
   */
  export type JenisKasus$kasusListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    where?: KasusSiswaWhereInput
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    cursor?: KasusSiswaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: KasusSiswaScalarFieldEnum | KasusSiswaScalarFieldEnum[]
  }

  /**
   * JenisKasus without action
   */
  export type JenisKasusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
  }


  /**
   * Model PoinSiswa
   */

  export type AggregatePoinSiswa = {
    _count: PoinSiswaCountAggregateOutputType | null
    _avg: PoinSiswaAvgAggregateOutputType | null
    _sum: PoinSiswaSumAggregateOutputType | null
    _min: PoinSiswaMinAggregateOutputType | null
    _max: PoinSiswaMaxAggregateOutputType | null
  }

  export type PoinSiswaAvgAggregateOutputType = {
    poin: number | null
  }

  export type PoinSiswaSumAggregateOutputType = {
    poin: number | null
  }

  export type PoinSiswaMinAggregateOutputType = {
    id: string | null
    siswaNisn: string | null
    tipe: $Enums.TipePoin | null
    jenisPrestasiId: string | null
    jenisPelanggaranId: string | null
    poin: number | null
    deskripsi: string | null
    tanggal: Date | null
    tingkat: string | null
    inputBy: string | null
    dokumenUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoinSiswaMaxAggregateOutputType = {
    id: string | null
    siswaNisn: string | null
    tipe: $Enums.TipePoin | null
    jenisPrestasiId: string | null
    jenisPelanggaranId: string | null
    poin: number | null
    deskripsi: string | null
    tanggal: Date | null
    tingkat: string | null
    inputBy: string | null
    dokumenUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoinSiswaCountAggregateOutputType = {
    id: number
    siswaNisn: number
    tipe: number
    jenisPrestasiId: number
    jenisPelanggaranId: number
    poin: number
    deskripsi: number
    tanggal: number
    tingkat: number
    inputBy: number
    dokumenUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PoinSiswaAvgAggregateInputType = {
    poin?: true
  }

  export type PoinSiswaSumAggregateInputType = {
    poin?: true
  }

  export type PoinSiswaMinAggregateInputType = {
    id?: true
    siswaNisn?: true
    tipe?: true
    jenisPrestasiId?: true
    jenisPelanggaranId?: true
    poin?: true
    deskripsi?: true
    tanggal?: true
    tingkat?: true
    inputBy?: true
    dokumenUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoinSiswaMaxAggregateInputType = {
    id?: true
    siswaNisn?: true
    tipe?: true
    jenisPrestasiId?: true
    jenisPelanggaranId?: true
    poin?: true
    deskripsi?: true
    tanggal?: true
    tingkat?: true
    inputBy?: true
    dokumenUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoinSiswaCountAggregateInputType = {
    id?: true
    siswaNisn?: true
    tipe?: true
    jenisPrestasiId?: true
    jenisPelanggaranId?: true
    poin?: true
    deskripsi?: true
    tanggal?: true
    tingkat?: true
    inputBy?: true
    dokumenUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PoinSiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PoinSiswa to aggregate.
     */
    where?: PoinSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoinSiswas to fetch.
     */
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PoinSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoinSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoinSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PoinSiswas
    **/
    _count?: true | PoinSiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoinSiswaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoinSiswaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoinSiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoinSiswaMaxAggregateInputType
  }

  export type GetPoinSiswaAggregateType<T extends PoinSiswaAggregateArgs> = {
        [P in keyof T & keyof AggregatePoinSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoinSiswa[P]>
      : GetScalarType<T[P], AggregatePoinSiswa[P]>
  }




  export type PoinSiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PoinSiswaWhereInput
    orderBy?: PoinSiswaOrderByWithAggregationInput | PoinSiswaOrderByWithAggregationInput[]
    by: PoinSiswaScalarFieldEnum[] | PoinSiswaScalarFieldEnum
    having?: PoinSiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoinSiswaCountAggregateInputType | true
    _avg?: PoinSiswaAvgAggregateInputType
    _sum?: PoinSiswaSumAggregateInputType
    _min?: PoinSiswaMinAggregateInputType
    _max?: PoinSiswaMaxAggregateInputType
  }

  export type PoinSiswaGroupByOutputType = {
    id: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPrestasiId: string | null
    jenisPelanggaranId: string | null
    poin: number
    deskripsi: string | null
    tanggal: Date
    tingkat: string | null
    inputBy: string | null
    dokumenUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: PoinSiswaCountAggregateOutputType | null
    _avg: PoinSiswaAvgAggregateOutputType | null
    _sum: PoinSiswaSumAggregateOutputType | null
    _min: PoinSiswaMinAggregateOutputType | null
    _max: PoinSiswaMaxAggregateOutputType | null
  }

  type GetPoinSiswaGroupByPayload<T extends PoinSiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoinSiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoinSiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoinSiswaGroupByOutputType[P]>
            : GetScalarType<T[P], PoinSiswaGroupByOutputType[P]>
        }
      >
    >


  export type PoinSiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siswaNisn?: boolean
    tipe?: boolean
    jenisPrestasiId?: boolean
    jenisPelanggaranId?: boolean
    poin?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    tingkat?: boolean
    inputBy?: boolean
    dokumenUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisPrestasi?: boolean | PoinSiswa$jenisPrestasiArgs<ExtArgs>
    jenisPelanggaran?: boolean | PoinSiswa$jenisPelanggaranArgs<ExtArgs>
  }, ExtArgs["result"]["poinSiswa"]>

  export type PoinSiswaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    siswaNisn?: boolean
    tipe?: boolean
    jenisPrestasiId?: boolean
    jenisPelanggaranId?: boolean
    poin?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    tingkat?: boolean
    inputBy?: boolean
    dokumenUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisPrestasi?: boolean | PoinSiswa$jenisPrestasiArgs<ExtArgs>
    jenisPelanggaran?: boolean | PoinSiswa$jenisPelanggaranArgs<ExtArgs>
  }, ExtArgs["result"]["poinSiswa"]>

  export type PoinSiswaSelectScalar = {
    id?: boolean
    siswaNisn?: boolean
    tipe?: boolean
    jenisPrestasiId?: boolean
    jenisPelanggaranId?: boolean
    poin?: boolean
    deskripsi?: boolean
    tanggal?: boolean
    tingkat?: boolean
    inputBy?: boolean
    dokumenUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PoinSiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisPrestasi?: boolean | PoinSiswa$jenisPrestasiArgs<ExtArgs>
    jenisPelanggaran?: boolean | PoinSiswa$jenisPelanggaranArgs<ExtArgs>
  }
  export type PoinSiswaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisPrestasi?: boolean | PoinSiswa$jenisPrestasiArgs<ExtArgs>
    jenisPelanggaran?: boolean | PoinSiswa$jenisPelanggaranArgs<ExtArgs>
  }

  export type $PoinSiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PoinSiswa"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
      jenisPrestasi: Prisma.$JenisPrestasiPayload<ExtArgs> | null
      jenisPelanggaran: Prisma.$JenisPelanggaranPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      siswaNisn: string
      tipe: $Enums.TipePoin
      jenisPrestasiId: string | null
      jenisPelanggaranId: string | null
      poin: number
      deskripsi: string | null
      tanggal: Date
      tingkat: string | null
      inputBy: string | null
      dokumenUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["poinSiswa"]>
    composites: {}
  }

  type PoinSiswaGetPayload<S extends boolean | null | undefined | PoinSiswaDefaultArgs> = $Result.GetResult<Prisma.$PoinSiswaPayload, S>

  type PoinSiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PoinSiswaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PoinSiswaCountAggregateInputType | true
    }

  export interface PoinSiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PoinSiswa'], meta: { name: 'PoinSiswa' } }
    /**
     * Find zero or one PoinSiswa that matches the filter.
     * @param {PoinSiswaFindUniqueArgs} args - Arguments to find a PoinSiswa
     * @example
     * // Get one PoinSiswa
     * const poinSiswa = await prisma.poinSiswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PoinSiswaFindUniqueArgs>(args: SelectSubset<T, PoinSiswaFindUniqueArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one PoinSiswa that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PoinSiswaFindUniqueOrThrowArgs} args - Arguments to find a PoinSiswa
     * @example
     * // Get one PoinSiswa
     * const poinSiswa = await prisma.poinSiswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PoinSiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, PoinSiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first PoinSiswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaFindFirstArgs} args - Arguments to find a PoinSiswa
     * @example
     * // Get one PoinSiswa
     * const poinSiswa = await prisma.poinSiswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PoinSiswaFindFirstArgs>(args?: SelectSubset<T, PoinSiswaFindFirstArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first PoinSiswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaFindFirstOrThrowArgs} args - Arguments to find a PoinSiswa
     * @example
     * // Get one PoinSiswa
     * const poinSiswa = await prisma.poinSiswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PoinSiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, PoinSiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more PoinSiswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PoinSiswas
     * const poinSiswas = await prisma.poinSiswa.findMany()
     * 
     * // Get first 10 PoinSiswas
     * const poinSiswas = await prisma.poinSiswa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poinSiswaWithIdOnly = await prisma.poinSiswa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PoinSiswaFindManyArgs>(args?: SelectSubset<T, PoinSiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a PoinSiswa.
     * @param {PoinSiswaCreateArgs} args - Arguments to create a PoinSiswa.
     * @example
     * // Create one PoinSiswa
     * const PoinSiswa = await prisma.poinSiswa.create({
     *   data: {
     *     // ... data to create a PoinSiswa
     *   }
     * })
     * 
     */
    create<T extends PoinSiswaCreateArgs>(args: SelectSubset<T, PoinSiswaCreateArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many PoinSiswas.
     * @param {PoinSiswaCreateManyArgs} args - Arguments to create many PoinSiswas.
     * @example
     * // Create many PoinSiswas
     * const poinSiswa = await prisma.poinSiswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PoinSiswaCreateManyArgs>(args?: SelectSubset<T, PoinSiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PoinSiswas and returns the data saved in the database.
     * @param {PoinSiswaCreateManyAndReturnArgs} args - Arguments to create many PoinSiswas.
     * @example
     * // Create many PoinSiswas
     * const poinSiswa = await prisma.poinSiswa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PoinSiswas and only return the `id`
     * const poinSiswaWithIdOnly = await prisma.poinSiswa.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PoinSiswaCreateManyAndReturnArgs>(args?: SelectSubset<T, PoinSiswaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a PoinSiswa.
     * @param {PoinSiswaDeleteArgs} args - Arguments to delete one PoinSiswa.
     * @example
     * // Delete one PoinSiswa
     * const PoinSiswa = await prisma.poinSiswa.delete({
     *   where: {
     *     // ... filter to delete one PoinSiswa
     *   }
     * })
     * 
     */
    delete<T extends PoinSiswaDeleteArgs>(args: SelectSubset<T, PoinSiswaDeleteArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one PoinSiswa.
     * @param {PoinSiswaUpdateArgs} args - Arguments to update one PoinSiswa.
     * @example
     * // Update one PoinSiswa
     * const poinSiswa = await prisma.poinSiswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PoinSiswaUpdateArgs>(args: SelectSubset<T, PoinSiswaUpdateArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more PoinSiswas.
     * @param {PoinSiswaDeleteManyArgs} args - Arguments to filter PoinSiswas to delete.
     * @example
     * // Delete a few PoinSiswas
     * const { count } = await prisma.poinSiswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PoinSiswaDeleteManyArgs>(args?: SelectSubset<T, PoinSiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoinSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PoinSiswas
     * const poinSiswa = await prisma.poinSiswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PoinSiswaUpdateManyArgs>(args: SelectSubset<T, PoinSiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PoinSiswa.
     * @param {PoinSiswaUpsertArgs} args - Arguments to update or create a PoinSiswa.
     * @example
     * // Update or create a PoinSiswa
     * const poinSiswa = await prisma.poinSiswa.upsert({
     *   create: {
     *     // ... data to create a PoinSiswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PoinSiswa we want to update
     *   }
     * })
     */
    upsert<T extends PoinSiswaUpsertArgs>(args: SelectSubset<T, PoinSiswaUpsertArgs<ExtArgs>>): Prisma__PoinSiswaClient<$Result.GetResult<Prisma.$PoinSiswaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of PoinSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaCountArgs} args - Arguments to filter PoinSiswas to count.
     * @example
     * // Count the number of PoinSiswas
     * const count = await prisma.poinSiswa.count({
     *   where: {
     *     // ... the filter for the PoinSiswas we want to count
     *   }
     * })
    **/
    count<T extends PoinSiswaCountArgs>(
      args?: Subset<T, PoinSiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoinSiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PoinSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoinSiswaAggregateArgs>(args: Subset<T, PoinSiswaAggregateArgs>): Prisma.PrismaPromise<GetPoinSiswaAggregateType<T>>

    /**
     * Group by PoinSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoinSiswaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PoinSiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PoinSiswaGroupByArgs['orderBy'] }
        : { orderBy?: PoinSiswaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PoinSiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoinSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PoinSiswa model
   */
  readonly fields: PoinSiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PoinSiswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PoinSiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jenisPrestasi<T extends PoinSiswa$jenisPrestasiArgs<ExtArgs> = {}>(args?: Subset<T, PoinSiswa$jenisPrestasiArgs<ExtArgs>>): Prisma__JenisPrestasiClient<$Result.GetResult<Prisma.$JenisPrestasiPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    jenisPelanggaran<T extends PoinSiswa$jenisPelanggaranArgs<ExtArgs> = {}>(args?: Subset<T, PoinSiswa$jenisPelanggaranArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PoinSiswa model
   */ 
  interface PoinSiswaFieldRefs {
    readonly id: FieldRef<"PoinSiswa", 'String'>
    readonly siswaNisn: FieldRef<"PoinSiswa", 'String'>
    readonly tipe: FieldRef<"PoinSiswa", 'TipePoin'>
    readonly jenisPrestasiId: FieldRef<"PoinSiswa", 'String'>
    readonly jenisPelanggaranId: FieldRef<"PoinSiswa", 'String'>
    readonly poin: FieldRef<"PoinSiswa", 'Int'>
    readonly deskripsi: FieldRef<"PoinSiswa", 'String'>
    readonly tanggal: FieldRef<"PoinSiswa", 'DateTime'>
    readonly tingkat: FieldRef<"PoinSiswa", 'String'>
    readonly inputBy: FieldRef<"PoinSiswa", 'String'>
    readonly dokumenUrl: FieldRef<"PoinSiswa", 'String'>
    readonly createdAt: FieldRef<"PoinSiswa", 'DateTime'>
    readonly updatedAt: FieldRef<"PoinSiswa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PoinSiswa findUnique
   */
  export type PoinSiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * Filter, which PoinSiswa to fetch.
     */
    where: PoinSiswaWhereUniqueInput
  }

  /**
   * PoinSiswa findUniqueOrThrow
   */
  export type PoinSiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * Filter, which PoinSiswa to fetch.
     */
    where: PoinSiswaWhereUniqueInput
  }

  /**
   * PoinSiswa findFirst
   */
  export type PoinSiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * Filter, which PoinSiswa to fetch.
     */
    where?: PoinSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoinSiswas to fetch.
     */
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PoinSiswas.
     */
    cursor?: PoinSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoinSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoinSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PoinSiswas.
     */
    distinct?: PoinSiswaScalarFieldEnum | PoinSiswaScalarFieldEnum[]
  }

  /**
   * PoinSiswa findFirstOrThrow
   */
  export type PoinSiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * Filter, which PoinSiswa to fetch.
     */
    where?: PoinSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoinSiswas to fetch.
     */
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PoinSiswas.
     */
    cursor?: PoinSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoinSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoinSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PoinSiswas.
     */
    distinct?: PoinSiswaScalarFieldEnum | PoinSiswaScalarFieldEnum[]
  }

  /**
   * PoinSiswa findMany
   */
  export type PoinSiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * Filter, which PoinSiswas to fetch.
     */
    where?: PoinSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PoinSiswas to fetch.
     */
    orderBy?: PoinSiswaOrderByWithRelationInput | PoinSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PoinSiswas.
     */
    cursor?: PoinSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PoinSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PoinSiswas.
     */
    skip?: number
    distinct?: PoinSiswaScalarFieldEnum | PoinSiswaScalarFieldEnum[]
  }

  /**
   * PoinSiswa create
   */
  export type PoinSiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a PoinSiswa.
     */
    data: XOR<PoinSiswaCreateInput, PoinSiswaUncheckedCreateInput>
  }

  /**
   * PoinSiswa createMany
   */
  export type PoinSiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PoinSiswas.
     */
    data: PoinSiswaCreateManyInput | PoinSiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PoinSiswa createManyAndReturn
   */
  export type PoinSiswaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many PoinSiswas.
     */
    data: PoinSiswaCreateManyInput | PoinSiswaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PoinSiswa update
   */
  export type PoinSiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a PoinSiswa.
     */
    data: XOR<PoinSiswaUpdateInput, PoinSiswaUncheckedUpdateInput>
    /**
     * Choose, which PoinSiswa to update.
     */
    where: PoinSiswaWhereUniqueInput
  }

  /**
   * PoinSiswa updateMany
   */
  export type PoinSiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PoinSiswas.
     */
    data: XOR<PoinSiswaUpdateManyMutationInput, PoinSiswaUncheckedUpdateManyInput>
    /**
     * Filter which PoinSiswas to update
     */
    where?: PoinSiswaWhereInput
  }

  /**
   * PoinSiswa upsert
   */
  export type PoinSiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the PoinSiswa to update in case it exists.
     */
    where: PoinSiswaWhereUniqueInput
    /**
     * In case the PoinSiswa found by the `where` argument doesn't exist, create a new PoinSiswa with this data.
     */
    create: XOR<PoinSiswaCreateInput, PoinSiswaUncheckedCreateInput>
    /**
     * In case the PoinSiswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PoinSiswaUpdateInput, PoinSiswaUncheckedUpdateInput>
  }

  /**
   * PoinSiswa delete
   */
  export type PoinSiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
    /**
     * Filter which PoinSiswa to delete.
     */
    where: PoinSiswaWhereUniqueInput
  }

  /**
   * PoinSiswa deleteMany
   */
  export type PoinSiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PoinSiswas to delete
     */
    where?: PoinSiswaWhereInput
  }

  /**
   * PoinSiswa.jenisPrestasi
   */
  export type PoinSiswa$jenisPrestasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPrestasi
     */
    select?: JenisPrestasiSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPrestasiInclude<ExtArgs> | null
    where?: JenisPrestasiWhereInput
  }

  /**
   * PoinSiswa.jenisPelanggaran
   */
  export type PoinSiswa$jenisPelanggaranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    where?: JenisPelanggaranWhereInput
  }

  /**
   * PoinSiswa without action
   */
  export type PoinSiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PoinSiswa
     */
    select?: PoinSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PoinSiswaInclude<ExtArgs> | null
  }


  /**
   * Model KasusSiswa
   */

  export type AggregateKasusSiswa = {
    _count: KasusSiswaCountAggregateOutputType | null
    _min: KasusSiswaMinAggregateOutputType | null
    _max: KasusSiswaMaxAggregateOutputType | null
  }

  export type KasusSiswaMinAggregateOutputType = {
    id: string | null
    nomor: string | null
    siswaNisn: string | null
    jenisKasusId: string | null
    jenisPelanggaranId: string | null
    tanggal: Date | null
    deskripsi: string | null
    status: $Enums.StatusKasus | null
    penanganan: string | null
    catatan: string | null
    inputBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KasusSiswaMaxAggregateOutputType = {
    id: string | null
    nomor: string | null
    siswaNisn: string | null
    jenisKasusId: string | null
    jenisPelanggaranId: string | null
    tanggal: Date | null
    deskripsi: string | null
    status: $Enums.StatusKasus | null
    penanganan: string | null
    catatan: string | null
    inputBy: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KasusSiswaCountAggregateOutputType = {
    id: number
    nomor: number
    siswaNisn: number
    jenisKasusId: number
    jenisPelanggaranId: number
    tanggal: number
    deskripsi: number
    status: number
    penanganan: number
    catatan: number
    inputBy: number
    dokumenList: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KasusSiswaMinAggregateInputType = {
    id?: true
    nomor?: true
    siswaNisn?: true
    jenisKasusId?: true
    jenisPelanggaranId?: true
    tanggal?: true
    deskripsi?: true
    status?: true
    penanganan?: true
    catatan?: true
    inputBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KasusSiswaMaxAggregateInputType = {
    id?: true
    nomor?: true
    siswaNisn?: true
    jenisKasusId?: true
    jenisPelanggaranId?: true
    tanggal?: true
    deskripsi?: true
    status?: true
    penanganan?: true
    catatan?: true
    inputBy?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KasusSiswaCountAggregateInputType = {
    id?: true
    nomor?: true
    siswaNisn?: true
    jenisKasusId?: true
    jenisPelanggaranId?: true
    tanggal?: true
    deskripsi?: true
    status?: true
    penanganan?: true
    catatan?: true
    inputBy?: true
    dokumenList?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KasusSiswaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KasusSiswa to aggregate.
     */
    where?: KasusSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KasusSiswas to fetch.
     */
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KasusSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KasusSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KasusSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KasusSiswas
    **/
    _count?: true | KasusSiswaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KasusSiswaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KasusSiswaMaxAggregateInputType
  }

  export type GetKasusSiswaAggregateType<T extends KasusSiswaAggregateArgs> = {
        [P in keyof T & keyof AggregateKasusSiswa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKasusSiswa[P]>
      : GetScalarType<T[P], AggregateKasusSiswa[P]>
  }




  export type KasusSiswaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KasusSiswaWhereInput
    orderBy?: KasusSiswaOrderByWithAggregationInput | KasusSiswaOrderByWithAggregationInput[]
    by: KasusSiswaScalarFieldEnum[] | KasusSiswaScalarFieldEnum
    having?: KasusSiswaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KasusSiswaCountAggregateInputType | true
    _min?: KasusSiswaMinAggregateInputType
    _max?: KasusSiswaMaxAggregateInputType
  }

  export type KasusSiswaGroupByOutputType = {
    id: string
    nomor: string
    siswaNisn: string
    jenisKasusId: string | null
    jenisPelanggaranId: string | null
    tanggal: Date
    deskripsi: string
    status: $Enums.StatusKasus
    penanganan: string | null
    catatan: string | null
    inputBy: string | null
    dokumenList: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: KasusSiswaCountAggregateOutputType | null
    _min: KasusSiswaMinAggregateOutputType | null
    _max: KasusSiswaMaxAggregateOutputType | null
  }

  type GetKasusSiswaGroupByPayload<T extends KasusSiswaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KasusSiswaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KasusSiswaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KasusSiswaGroupByOutputType[P]>
            : GetScalarType<T[P], KasusSiswaGroupByOutputType[P]>
        }
      >
    >


  export type KasusSiswaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    siswaNisn?: boolean
    jenisKasusId?: boolean
    jenisPelanggaranId?: boolean
    tanggal?: boolean
    deskripsi?: boolean
    status?: boolean
    penanganan?: boolean
    catatan?: boolean
    inputBy?: boolean
    dokumenList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisKasus?: boolean | KasusSiswa$jenisKasusArgs<ExtArgs>
    jenisPelanggaran?: boolean | KasusSiswa$jenisPelanggaranArgs<ExtArgs>
    laporanList?: boolean | KasusSiswa$laporanListArgs<ExtArgs>
    _count?: boolean | KasusSiswaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kasusSiswa"]>

  export type KasusSiswaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    siswaNisn?: boolean
    jenisKasusId?: boolean
    jenisPelanggaranId?: boolean
    tanggal?: boolean
    deskripsi?: boolean
    status?: boolean
    penanganan?: boolean
    catatan?: boolean
    inputBy?: boolean
    dokumenList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisKasus?: boolean | KasusSiswa$jenisKasusArgs<ExtArgs>
    jenisPelanggaran?: boolean | KasusSiswa$jenisPelanggaranArgs<ExtArgs>
  }, ExtArgs["result"]["kasusSiswa"]>

  export type KasusSiswaSelectScalar = {
    id?: boolean
    nomor?: boolean
    siswaNisn?: boolean
    jenisKasusId?: boolean
    jenisPelanggaranId?: boolean
    tanggal?: boolean
    deskripsi?: boolean
    status?: boolean
    penanganan?: boolean
    catatan?: boolean
    inputBy?: boolean
    dokumenList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KasusSiswaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisKasus?: boolean | KasusSiswa$jenisKasusArgs<ExtArgs>
    jenisPelanggaran?: boolean | KasusSiswa$jenisPelanggaranArgs<ExtArgs>
    laporanList?: boolean | KasusSiswa$laporanListArgs<ExtArgs>
    _count?: boolean | KasusSiswaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type KasusSiswaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
    jenisKasus?: boolean | KasusSiswa$jenisKasusArgs<ExtArgs>
    jenisPelanggaran?: boolean | KasusSiswa$jenisPelanggaranArgs<ExtArgs>
  }

  export type $KasusSiswaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KasusSiswa"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
      jenisKasus: Prisma.$JenisKasusPayload<ExtArgs> | null
      jenisPelanggaran: Prisma.$JenisPelanggaranPayload<ExtArgs> | null
      laporanList: Prisma.$LaporanKasusPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomor: string
      siswaNisn: string
      jenisKasusId: string | null
      jenisPelanggaranId: string | null
      tanggal: Date
      deskripsi: string
      status: $Enums.StatusKasus
      penanganan: string | null
      catatan: string | null
      inputBy: string | null
      dokumenList: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kasusSiswa"]>
    composites: {}
  }

  type KasusSiswaGetPayload<S extends boolean | null | undefined | KasusSiswaDefaultArgs> = $Result.GetResult<Prisma.$KasusSiswaPayload, S>

  type KasusSiswaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KasusSiswaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KasusSiswaCountAggregateInputType | true
    }

  export interface KasusSiswaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KasusSiswa'], meta: { name: 'KasusSiswa' } }
    /**
     * Find zero or one KasusSiswa that matches the filter.
     * @param {KasusSiswaFindUniqueArgs} args - Arguments to find a KasusSiswa
     * @example
     * // Get one KasusSiswa
     * const kasusSiswa = await prisma.kasusSiswa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KasusSiswaFindUniqueArgs>(args: SelectSubset<T, KasusSiswaFindUniqueArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KasusSiswa that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KasusSiswaFindUniqueOrThrowArgs} args - Arguments to find a KasusSiswa
     * @example
     * // Get one KasusSiswa
     * const kasusSiswa = await prisma.kasusSiswa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KasusSiswaFindUniqueOrThrowArgs>(args: SelectSubset<T, KasusSiswaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KasusSiswa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaFindFirstArgs} args - Arguments to find a KasusSiswa
     * @example
     * // Get one KasusSiswa
     * const kasusSiswa = await prisma.kasusSiswa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KasusSiswaFindFirstArgs>(args?: SelectSubset<T, KasusSiswaFindFirstArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KasusSiswa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaFindFirstOrThrowArgs} args - Arguments to find a KasusSiswa
     * @example
     * // Get one KasusSiswa
     * const kasusSiswa = await prisma.kasusSiswa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KasusSiswaFindFirstOrThrowArgs>(args?: SelectSubset<T, KasusSiswaFindFirstOrThrowArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KasusSiswas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KasusSiswas
     * const kasusSiswas = await prisma.kasusSiswa.findMany()
     * 
     * // Get first 10 KasusSiswas
     * const kasusSiswas = await prisma.kasusSiswa.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kasusSiswaWithIdOnly = await prisma.kasusSiswa.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KasusSiswaFindManyArgs>(args?: SelectSubset<T, KasusSiswaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KasusSiswa.
     * @param {KasusSiswaCreateArgs} args - Arguments to create a KasusSiswa.
     * @example
     * // Create one KasusSiswa
     * const KasusSiswa = await prisma.kasusSiswa.create({
     *   data: {
     *     // ... data to create a KasusSiswa
     *   }
     * })
     * 
     */
    create<T extends KasusSiswaCreateArgs>(args: SelectSubset<T, KasusSiswaCreateArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KasusSiswas.
     * @param {KasusSiswaCreateManyArgs} args - Arguments to create many KasusSiswas.
     * @example
     * // Create many KasusSiswas
     * const kasusSiswa = await prisma.kasusSiswa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KasusSiswaCreateManyArgs>(args?: SelectSubset<T, KasusSiswaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KasusSiswas and returns the data saved in the database.
     * @param {KasusSiswaCreateManyAndReturnArgs} args - Arguments to create many KasusSiswas.
     * @example
     * // Create many KasusSiswas
     * const kasusSiswa = await prisma.kasusSiswa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KasusSiswas and only return the `id`
     * const kasusSiswaWithIdOnly = await prisma.kasusSiswa.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KasusSiswaCreateManyAndReturnArgs>(args?: SelectSubset<T, KasusSiswaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KasusSiswa.
     * @param {KasusSiswaDeleteArgs} args - Arguments to delete one KasusSiswa.
     * @example
     * // Delete one KasusSiswa
     * const KasusSiswa = await prisma.kasusSiswa.delete({
     *   where: {
     *     // ... filter to delete one KasusSiswa
     *   }
     * })
     * 
     */
    delete<T extends KasusSiswaDeleteArgs>(args: SelectSubset<T, KasusSiswaDeleteArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KasusSiswa.
     * @param {KasusSiswaUpdateArgs} args - Arguments to update one KasusSiswa.
     * @example
     * // Update one KasusSiswa
     * const kasusSiswa = await prisma.kasusSiswa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KasusSiswaUpdateArgs>(args: SelectSubset<T, KasusSiswaUpdateArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KasusSiswas.
     * @param {KasusSiswaDeleteManyArgs} args - Arguments to filter KasusSiswas to delete.
     * @example
     * // Delete a few KasusSiswas
     * const { count } = await prisma.kasusSiswa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KasusSiswaDeleteManyArgs>(args?: SelectSubset<T, KasusSiswaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KasusSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KasusSiswas
     * const kasusSiswa = await prisma.kasusSiswa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KasusSiswaUpdateManyArgs>(args: SelectSubset<T, KasusSiswaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KasusSiswa.
     * @param {KasusSiswaUpsertArgs} args - Arguments to update or create a KasusSiswa.
     * @example
     * // Update or create a KasusSiswa
     * const kasusSiswa = await prisma.kasusSiswa.upsert({
     *   create: {
     *     // ... data to create a KasusSiswa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KasusSiswa we want to update
     *   }
     * })
     */
    upsert<T extends KasusSiswaUpsertArgs>(args: SelectSubset<T, KasusSiswaUpsertArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KasusSiswas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaCountArgs} args - Arguments to filter KasusSiswas to count.
     * @example
     * // Count the number of KasusSiswas
     * const count = await prisma.kasusSiswa.count({
     *   where: {
     *     // ... the filter for the KasusSiswas we want to count
     *   }
     * })
    **/
    count<T extends KasusSiswaCountArgs>(
      args?: Subset<T, KasusSiswaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KasusSiswaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KasusSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KasusSiswaAggregateArgs>(args: Subset<T, KasusSiswaAggregateArgs>): Prisma.PrismaPromise<GetKasusSiswaAggregateType<T>>

    /**
     * Group by KasusSiswa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KasusSiswaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KasusSiswaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KasusSiswaGroupByArgs['orderBy'] }
        : { orderBy?: KasusSiswaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KasusSiswaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKasusSiswaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KasusSiswa model
   */
  readonly fields: KasusSiswaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KasusSiswa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KasusSiswaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    jenisKasus<T extends KasusSiswa$jenisKasusArgs<ExtArgs> = {}>(args?: Subset<T, KasusSiswa$jenisKasusArgs<ExtArgs>>): Prisma__JenisKasusClient<$Result.GetResult<Prisma.$JenisKasusPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    jenisPelanggaran<T extends KasusSiswa$jenisPelanggaranArgs<ExtArgs> = {}>(args?: Subset<T, KasusSiswa$jenisPelanggaranArgs<ExtArgs>>): Prisma__JenisPelanggaranClient<$Result.GetResult<Prisma.$JenisPelanggaranPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    laporanList<T extends KasusSiswa$laporanListArgs<ExtArgs> = {}>(args?: Subset<T, KasusSiswa$laporanListArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KasusSiswa model
   */ 
  interface KasusSiswaFieldRefs {
    readonly id: FieldRef<"KasusSiswa", 'String'>
    readonly nomor: FieldRef<"KasusSiswa", 'String'>
    readonly siswaNisn: FieldRef<"KasusSiswa", 'String'>
    readonly jenisKasusId: FieldRef<"KasusSiswa", 'String'>
    readonly jenisPelanggaranId: FieldRef<"KasusSiswa", 'String'>
    readonly tanggal: FieldRef<"KasusSiswa", 'DateTime'>
    readonly deskripsi: FieldRef<"KasusSiswa", 'String'>
    readonly status: FieldRef<"KasusSiswa", 'StatusKasus'>
    readonly penanganan: FieldRef<"KasusSiswa", 'String'>
    readonly catatan: FieldRef<"KasusSiswa", 'String'>
    readonly inputBy: FieldRef<"KasusSiswa", 'String'>
    readonly dokumenList: FieldRef<"KasusSiswa", 'Json'>
    readonly createdAt: FieldRef<"KasusSiswa", 'DateTime'>
    readonly updatedAt: FieldRef<"KasusSiswa", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KasusSiswa findUnique
   */
  export type KasusSiswaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * Filter, which KasusSiswa to fetch.
     */
    where: KasusSiswaWhereUniqueInput
  }

  /**
   * KasusSiswa findUniqueOrThrow
   */
  export type KasusSiswaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * Filter, which KasusSiswa to fetch.
     */
    where: KasusSiswaWhereUniqueInput
  }

  /**
   * KasusSiswa findFirst
   */
  export type KasusSiswaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * Filter, which KasusSiswa to fetch.
     */
    where?: KasusSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KasusSiswas to fetch.
     */
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KasusSiswas.
     */
    cursor?: KasusSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KasusSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KasusSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KasusSiswas.
     */
    distinct?: KasusSiswaScalarFieldEnum | KasusSiswaScalarFieldEnum[]
  }

  /**
   * KasusSiswa findFirstOrThrow
   */
  export type KasusSiswaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * Filter, which KasusSiswa to fetch.
     */
    where?: KasusSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KasusSiswas to fetch.
     */
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KasusSiswas.
     */
    cursor?: KasusSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KasusSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KasusSiswas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KasusSiswas.
     */
    distinct?: KasusSiswaScalarFieldEnum | KasusSiswaScalarFieldEnum[]
  }

  /**
   * KasusSiswa findMany
   */
  export type KasusSiswaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * Filter, which KasusSiswas to fetch.
     */
    where?: KasusSiswaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KasusSiswas to fetch.
     */
    orderBy?: KasusSiswaOrderByWithRelationInput | KasusSiswaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KasusSiswas.
     */
    cursor?: KasusSiswaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KasusSiswas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KasusSiswas.
     */
    skip?: number
    distinct?: KasusSiswaScalarFieldEnum | KasusSiswaScalarFieldEnum[]
  }

  /**
   * KasusSiswa create
   */
  export type KasusSiswaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * The data needed to create a KasusSiswa.
     */
    data: XOR<KasusSiswaCreateInput, KasusSiswaUncheckedCreateInput>
  }

  /**
   * KasusSiswa createMany
   */
  export type KasusSiswaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KasusSiswas.
     */
    data: KasusSiswaCreateManyInput | KasusSiswaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KasusSiswa createManyAndReturn
   */
  export type KasusSiswaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KasusSiswas.
     */
    data: KasusSiswaCreateManyInput | KasusSiswaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KasusSiswa update
   */
  export type KasusSiswaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * The data needed to update a KasusSiswa.
     */
    data: XOR<KasusSiswaUpdateInput, KasusSiswaUncheckedUpdateInput>
    /**
     * Choose, which KasusSiswa to update.
     */
    where: KasusSiswaWhereUniqueInput
  }

  /**
   * KasusSiswa updateMany
   */
  export type KasusSiswaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KasusSiswas.
     */
    data: XOR<KasusSiswaUpdateManyMutationInput, KasusSiswaUncheckedUpdateManyInput>
    /**
     * Filter which KasusSiswas to update
     */
    where?: KasusSiswaWhereInput
  }

  /**
   * KasusSiswa upsert
   */
  export type KasusSiswaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * The filter to search for the KasusSiswa to update in case it exists.
     */
    where: KasusSiswaWhereUniqueInput
    /**
     * In case the KasusSiswa found by the `where` argument doesn't exist, create a new KasusSiswa with this data.
     */
    create: XOR<KasusSiswaCreateInput, KasusSiswaUncheckedCreateInput>
    /**
     * In case the KasusSiswa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KasusSiswaUpdateInput, KasusSiswaUncheckedUpdateInput>
  }

  /**
   * KasusSiswa delete
   */
  export type KasusSiswaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
    /**
     * Filter which KasusSiswa to delete.
     */
    where: KasusSiswaWhereUniqueInput
  }

  /**
   * KasusSiswa deleteMany
   */
  export type KasusSiswaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KasusSiswas to delete
     */
    where?: KasusSiswaWhereInput
  }

  /**
   * KasusSiswa.jenisKasus
   */
  export type KasusSiswa$jenisKasusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisKasus
     */
    select?: JenisKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisKasusInclude<ExtArgs> | null
    where?: JenisKasusWhereInput
  }

  /**
   * KasusSiswa.jenisPelanggaran
   */
  export type KasusSiswa$jenisPelanggaranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JenisPelanggaran
     */
    select?: JenisPelanggaranSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: JenisPelanggaranInclude<ExtArgs> | null
    where?: JenisPelanggaranWhereInput
  }

  /**
   * KasusSiswa.laporanList
   */
  export type KasusSiswa$laporanListArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    where?: LaporanKasusWhereInput
    orderBy?: LaporanKasusOrderByWithRelationInput | LaporanKasusOrderByWithRelationInput[]
    cursor?: LaporanKasusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LaporanKasusScalarFieldEnum | LaporanKasusScalarFieldEnum[]
  }

  /**
   * KasusSiswa without action
   */
  export type KasusSiswaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KasusSiswa
     */
    select?: KasusSiswaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KasusSiswaInclude<ExtArgs> | null
  }


  /**
   * Model LaporanKasus
   */

  export type AggregateLaporanKasus = {
    _count: LaporanKasusCountAggregateOutputType | null
    _min: LaporanKasusMinAggregateOutputType | null
    _max: LaporanKasusMaxAggregateOutputType | null
  }

  export type LaporanKasusMinAggregateOutputType = {
    id: string | null
    kasusId: string | null
    tanggal: Date | null
    catatan: string | null
    status: $Enums.StatusKasus | null
    inputBy: string | null
    createdAt: Date | null
  }

  export type LaporanKasusMaxAggregateOutputType = {
    id: string | null
    kasusId: string | null
    tanggal: Date | null
    catatan: string | null
    status: $Enums.StatusKasus | null
    inputBy: string | null
    createdAt: Date | null
  }

  export type LaporanKasusCountAggregateOutputType = {
    id: number
    kasusId: number
    tanggal: number
    catatan: number
    status: number
    inputBy: number
    createdAt: number
    _all: number
  }


  export type LaporanKasusMinAggregateInputType = {
    id?: true
    kasusId?: true
    tanggal?: true
    catatan?: true
    status?: true
    inputBy?: true
    createdAt?: true
  }

  export type LaporanKasusMaxAggregateInputType = {
    id?: true
    kasusId?: true
    tanggal?: true
    catatan?: true
    status?: true
    inputBy?: true
    createdAt?: true
  }

  export type LaporanKasusCountAggregateInputType = {
    id?: true
    kasusId?: true
    tanggal?: true
    catatan?: true
    status?: true
    inputBy?: true
    createdAt?: true
    _all?: true
  }

  export type LaporanKasusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaporanKasus to aggregate.
     */
    where?: LaporanKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaporanKasuses to fetch.
     */
    orderBy?: LaporanKasusOrderByWithRelationInput | LaporanKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LaporanKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaporanKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaporanKasuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LaporanKasuses
    **/
    _count?: true | LaporanKasusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LaporanKasusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LaporanKasusMaxAggregateInputType
  }

  export type GetLaporanKasusAggregateType<T extends LaporanKasusAggregateArgs> = {
        [P in keyof T & keyof AggregateLaporanKasus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLaporanKasus[P]>
      : GetScalarType<T[P], AggregateLaporanKasus[P]>
  }




  export type LaporanKasusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LaporanKasusWhereInput
    orderBy?: LaporanKasusOrderByWithAggregationInput | LaporanKasusOrderByWithAggregationInput[]
    by: LaporanKasusScalarFieldEnum[] | LaporanKasusScalarFieldEnum
    having?: LaporanKasusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LaporanKasusCountAggregateInputType | true
    _min?: LaporanKasusMinAggregateInputType
    _max?: LaporanKasusMaxAggregateInputType
  }

  export type LaporanKasusGroupByOutputType = {
    id: string
    kasusId: string
    tanggal: Date
    catatan: string
    status: $Enums.StatusKasus
    inputBy: string | null
    createdAt: Date
    _count: LaporanKasusCountAggregateOutputType | null
    _min: LaporanKasusMinAggregateOutputType | null
    _max: LaporanKasusMaxAggregateOutputType | null
  }

  type GetLaporanKasusGroupByPayload<T extends LaporanKasusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LaporanKasusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LaporanKasusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LaporanKasusGroupByOutputType[P]>
            : GetScalarType<T[P], LaporanKasusGroupByOutputType[P]>
        }
      >
    >


  export type LaporanKasusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kasusId?: boolean
    tanggal?: boolean
    catatan?: boolean
    status?: boolean
    inputBy?: boolean
    createdAt?: boolean
    kasus?: boolean | KasusSiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laporanKasus"]>

  export type LaporanKasusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    kasusId?: boolean
    tanggal?: boolean
    catatan?: boolean
    status?: boolean
    inputBy?: boolean
    createdAt?: boolean
    kasus?: boolean | KasusSiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["laporanKasus"]>

  export type LaporanKasusSelectScalar = {
    id?: boolean
    kasusId?: boolean
    tanggal?: boolean
    catatan?: boolean
    status?: boolean
    inputBy?: boolean
    createdAt?: boolean
  }

  export type LaporanKasusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kasus?: boolean | KasusSiswaDefaultArgs<ExtArgs>
  }
  export type LaporanKasusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    kasus?: boolean | KasusSiswaDefaultArgs<ExtArgs>
  }

  export type $LaporanKasusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LaporanKasus"
    objects: {
      kasus: Prisma.$KasusSiswaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      kasusId: string
      tanggal: Date
      catatan: string
      status: $Enums.StatusKasus
      inputBy: string | null
      createdAt: Date
    }, ExtArgs["result"]["laporanKasus"]>
    composites: {}
  }

  type LaporanKasusGetPayload<S extends boolean | null | undefined | LaporanKasusDefaultArgs> = $Result.GetResult<Prisma.$LaporanKasusPayload, S>

  type LaporanKasusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<LaporanKasusFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: LaporanKasusCountAggregateInputType | true
    }

  export interface LaporanKasusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LaporanKasus'], meta: { name: 'LaporanKasus' } }
    /**
     * Find zero or one LaporanKasus that matches the filter.
     * @param {LaporanKasusFindUniqueArgs} args - Arguments to find a LaporanKasus
     * @example
     * // Get one LaporanKasus
     * const laporanKasus = await prisma.laporanKasus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LaporanKasusFindUniqueArgs>(args: SelectSubset<T, LaporanKasusFindUniqueArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one LaporanKasus that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {LaporanKasusFindUniqueOrThrowArgs} args - Arguments to find a LaporanKasus
     * @example
     * // Get one LaporanKasus
     * const laporanKasus = await prisma.laporanKasus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LaporanKasusFindUniqueOrThrowArgs>(args: SelectSubset<T, LaporanKasusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first LaporanKasus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusFindFirstArgs} args - Arguments to find a LaporanKasus
     * @example
     * // Get one LaporanKasus
     * const laporanKasus = await prisma.laporanKasus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LaporanKasusFindFirstArgs>(args?: SelectSubset<T, LaporanKasusFindFirstArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first LaporanKasus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusFindFirstOrThrowArgs} args - Arguments to find a LaporanKasus
     * @example
     * // Get one LaporanKasus
     * const laporanKasus = await prisma.laporanKasus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LaporanKasusFindFirstOrThrowArgs>(args?: SelectSubset<T, LaporanKasusFindFirstOrThrowArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more LaporanKasuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LaporanKasuses
     * const laporanKasuses = await prisma.laporanKasus.findMany()
     * 
     * // Get first 10 LaporanKasuses
     * const laporanKasuses = await prisma.laporanKasus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const laporanKasusWithIdOnly = await prisma.laporanKasus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LaporanKasusFindManyArgs>(args?: SelectSubset<T, LaporanKasusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a LaporanKasus.
     * @param {LaporanKasusCreateArgs} args - Arguments to create a LaporanKasus.
     * @example
     * // Create one LaporanKasus
     * const LaporanKasus = await prisma.laporanKasus.create({
     *   data: {
     *     // ... data to create a LaporanKasus
     *   }
     * })
     * 
     */
    create<T extends LaporanKasusCreateArgs>(args: SelectSubset<T, LaporanKasusCreateArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many LaporanKasuses.
     * @param {LaporanKasusCreateManyArgs} args - Arguments to create many LaporanKasuses.
     * @example
     * // Create many LaporanKasuses
     * const laporanKasus = await prisma.laporanKasus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LaporanKasusCreateManyArgs>(args?: SelectSubset<T, LaporanKasusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LaporanKasuses and returns the data saved in the database.
     * @param {LaporanKasusCreateManyAndReturnArgs} args - Arguments to create many LaporanKasuses.
     * @example
     * // Create many LaporanKasuses
     * const laporanKasus = await prisma.laporanKasus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LaporanKasuses and only return the `id`
     * const laporanKasusWithIdOnly = await prisma.laporanKasus.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LaporanKasusCreateManyAndReturnArgs>(args?: SelectSubset<T, LaporanKasusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a LaporanKasus.
     * @param {LaporanKasusDeleteArgs} args - Arguments to delete one LaporanKasus.
     * @example
     * // Delete one LaporanKasus
     * const LaporanKasus = await prisma.laporanKasus.delete({
     *   where: {
     *     // ... filter to delete one LaporanKasus
     *   }
     * })
     * 
     */
    delete<T extends LaporanKasusDeleteArgs>(args: SelectSubset<T, LaporanKasusDeleteArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one LaporanKasus.
     * @param {LaporanKasusUpdateArgs} args - Arguments to update one LaporanKasus.
     * @example
     * // Update one LaporanKasus
     * const laporanKasus = await prisma.laporanKasus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LaporanKasusUpdateArgs>(args: SelectSubset<T, LaporanKasusUpdateArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more LaporanKasuses.
     * @param {LaporanKasusDeleteManyArgs} args - Arguments to filter LaporanKasuses to delete.
     * @example
     * // Delete a few LaporanKasuses
     * const { count } = await prisma.laporanKasus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LaporanKasusDeleteManyArgs>(args?: SelectSubset<T, LaporanKasusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LaporanKasuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LaporanKasuses
     * const laporanKasus = await prisma.laporanKasus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LaporanKasusUpdateManyArgs>(args: SelectSubset<T, LaporanKasusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one LaporanKasus.
     * @param {LaporanKasusUpsertArgs} args - Arguments to update or create a LaporanKasus.
     * @example
     * // Update or create a LaporanKasus
     * const laporanKasus = await prisma.laporanKasus.upsert({
     *   create: {
     *     // ... data to create a LaporanKasus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LaporanKasus we want to update
     *   }
     * })
     */
    upsert<T extends LaporanKasusUpsertArgs>(args: SelectSubset<T, LaporanKasusUpsertArgs<ExtArgs>>): Prisma__LaporanKasusClient<$Result.GetResult<Prisma.$LaporanKasusPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of LaporanKasuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusCountArgs} args - Arguments to filter LaporanKasuses to count.
     * @example
     * // Count the number of LaporanKasuses
     * const count = await prisma.laporanKasus.count({
     *   where: {
     *     // ... the filter for the LaporanKasuses we want to count
     *   }
     * })
    **/
    count<T extends LaporanKasusCountArgs>(
      args?: Subset<T, LaporanKasusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LaporanKasusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LaporanKasus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LaporanKasusAggregateArgs>(args: Subset<T, LaporanKasusAggregateArgs>): Prisma.PrismaPromise<GetLaporanKasusAggregateType<T>>

    /**
     * Group by LaporanKasus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LaporanKasusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LaporanKasusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LaporanKasusGroupByArgs['orderBy'] }
        : { orderBy?: LaporanKasusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LaporanKasusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLaporanKasusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LaporanKasus model
   */
  readonly fields: LaporanKasusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LaporanKasus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LaporanKasusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    kasus<T extends KasusSiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, KasusSiswaDefaultArgs<ExtArgs>>): Prisma__KasusSiswaClient<$Result.GetResult<Prisma.$KasusSiswaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the LaporanKasus model
   */ 
  interface LaporanKasusFieldRefs {
    readonly id: FieldRef<"LaporanKasus", 'String'>
    readonly kasusId: FieldRef<"LaporanKasus", 'String'>
    readonly tanggal: FieldRef<"LaporanKasus", 'DateTime'>
    readonly catatan: FieldRef<"LaporanKasus", 'String'>
    readonly status: FieldRef<"LaporanKasus", 'StatusKasus'>
    readonly inputBy: FieldRef<"LaporanKasus", 'String'>
    readonly createdAt: FieldRef<"LaporanKasus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * LaporanKasus findUnique
   */
  export type LaporanKasusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * Filter, which LaporanKasus to fetch.
     */
    where: LaporanKasusWhereUniqueInput
  }

  /**
   * LaporanKasus findUniqueOrThrow
   */
  export type LaporanKasusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * Filter, which LaporanKasus to fetch.
     */
    where: LaporanKasusWhereUniqueInput
  }

  /**
   * LaporanKasus findFirst
   */
  export type LaporanKasusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * Filter, which LaporanKasus to fetch.
     */
    where?: LaporanKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaporanKasuses to fetch.
     */
    orderBy?: LaporanKasusOrderByWithRelationInput | LaporanKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaporanKasuses.
     */
    cursor?: LaporanKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaporanKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaporanKasuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaporanKasuses.
     */
    distinct?: LaporanKasusScalarFieldEnum | LaporanKasusScalarFieldEnum[]
  }

  /**
   * LaporanKasus findFirstOrThrow
   */
  export type LaporanKasusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * Filter, which LaporanKasus to fetch.
     */
    where?: LaporanKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaporanKasuses to fetch.
     */
    orderBy?: LaporanKasusOrderByWithRelationInput | LaporanKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LaporanKasuses.
     */
    cursor?: LaporanKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaporanKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaporanKasuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LaporanKasuses.
     */
    distinct?: LaporanKasusScalarFieldEnum | LaporanKasusScalarFieldEnum[]
  }

  /**
   * LaporanKasus findMany
   */
  export type LaporanKasusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * Filter, which LaporanKasuses to fetch.
     */
    where?: LaporanKasusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LaporanKasuses to fetch.
     */
    orderBy?: LaporanKasusOrderByWithRelationInput | LaporanKasusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LaporanKasuses.
     */
    cursor?: LaporanKasusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LaporanKasuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LaporanKasuses.
     */
    skip?: number
    distinct?: LaporanKasusScalarFieldEnum | LaporanKasusScalarFieldEnum[]
  }

  /**
   * LaporanKasus create
   */
  export type LaporanKasusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * The data needed to create a LaporanKasus.
     */
    data: XOR<LaporanKasusCreateInput, LaporanKasusUncheckedCreateInput>
  }

  /**
   * LaporanKasus createMany
   */
  export type LaporanKasusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LaporanKasuses.
     */
    data: LaporanKasusCreateManyInput | LaporanKasusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LaporanKasus createManyAndReturn
   */
  export type LaporanKasusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many LaporanKasuses.
     */
    data: LaporanKasusCreateManyInput | LaporanKasusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LaporanKasus update
   */
  export type LaporanKasusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * The data needed to update a LaporanKasus.
     */
    data: XOR<LaporanKasusUpdateInput, LaporanKasusUncheckedUpdateInput>
    /**
     * Choose, which LaporanKasus to update.
     */
    where: LaporanKasusWhereUniqueInput
  }

  /**
   * LaporanKasus updateMany
   */
  export type LaporanKasusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LaporanKasuses.
     */
    data: XOR<LaporanKasusUpdateManyMutationInput, LaporanKasusUncheckedUpdateManyInput>
    /**
     * Filter which LaporanKasuses to update
     */
    where?: LaporanKasusWhereInput
  }

  /**
   * LaporanKasus upsert
   */
  export type LaporanKasusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * The filter to search for the LaporanKasus to update in case it exists.
     */
    where: LaporanKasusWhereUniqueInput
    /**
     * In case the LaporanKasus found by the `where` argument doesn't exist, create a new LaporanKasus with this data.
     */
    create: XOR<LaporanKasusCreateInput, LaporanKasusUncheckedCreateInput>
    /**
     * In case the LaporanKasus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LaporanKasusUpdateInput, LaporanKasusUncheckedUpdateInput>
  }

  /**
   * LaporanKasus delete
   */
  export type LaporanKasusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
    /**
     * Filter which LaporanKasus to delete.
     */
    where: LaporanKasusWhereUniqueInput
  }

  /**
   * LaporanKasus deleteMany
   */
  export type LaporanKasusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LaporanKasuses to delete
     */
    where?: LaporanKasusWhereInput
  }

  /**
   * LaporanKasus without action
   */
  export type LaporanKasusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LaporanKasus
     */
    select?: LaporanKasusSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LaporanKasusInclude<ExtArgs> | null
  }


  /**
   * Model KunjunganRumah
   */

  export type AggregateKunjunganRumah = {
    _count: KunjunganRumahCountAggregateOutputType | null
    _min: KunjunganRumahMinAggregateOutputType | null
    _max: KunjunganRumahMaxAggregateOutputType | null
  }

  export type KunjunganRumahMinAggregateOutputType = {
    id: string | null
    nomor: string | null
    siswaNisn: string | null
    tanggal: Date | null
    tujuan: string | null
    petugasBk: string | null
    status: $Enums.StatusKunjungan | null
    hasilKunjungan: string | null
    catatan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KunjunganRumahMaxAggregateOutputType = {
    id: string | null
    nomor: string | null
    siswaNisn: string | null
    tanggal: Date | null
    tujuan: string | null
    petugasBk: string | null
    status: $Enums.StatusKunjungan | null
    hasilKunjungan: string | null
    catatan: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type KunjunganRumahCountAggregateOutputType = {
    id: number
    nomor: number
    siswaNisn: number
    tanggal: number
    tujuan: number
    petugasBk: number
    status: number
    hasilKunjungan: number
    catatan: number
    dokumenList: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type KunjunganRumahMinAggregateInputType = {
    id?: true
    nomor?: true
    siswaNisn?: true
    tanggal?: true
    tujuan?: true
    petugasBk?: true
    status?: true
    hasilKunjungan?: true
    catatan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KunjunganRumahMaxAggregateInputType = {
    id?: true
    nomor?: true
    siswaNisn?: true
    tanggal?: true
    tujuan?: true
    petugasBk?: true
    status?: true
    hasilKunjungan?: true
    catatan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type KunjunganRumahCountAggregateInputType = {
    id?: true
    nomor?: true
    siswaNisn?: true
    tanggal?: true
    tujuan?: true
    petugasBk?: true
    status?: true
    hasilKunjungan?: true
    catatan?: true
    dokumenList?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type KunjunganRumahAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KunjunganRumah to aggregate.
     */
    where?: KunjunganRumahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KunjunganRumahs to fetch.
     */
    orderBy?: KunjunganRumahOrderByWithRelationInput | KunjunganRumahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KunjunganRumahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KunjunganRumahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KunjunganRumahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned KunjunganRumahs
    **/
    _count?: true | KunjunganRumahCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KunjunganRumahMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KunjunganRumahMaxAggregateInputType
  }

  export type GetKunjunganRumahAggregateType<T extends KunjunganRumahAggregateArgs> = {
        [P in keyof T & keyof AggregateKunjunganRumah]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKunjunganRumah[P]>
      : GetScalarType<T[P], AggregateKunjunganRumah[P]>
  }




  export type KunjunganRumahGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KunjunganRumahWhereInput
    orderBy?: KunjunganRumahOrderByWithAggregationInput | KunjunganRumahOrderByWithAggregationInput[]
    by: KunjunganRumahScalarFieldEnum[] | KunjunganRumahScalarFieldEnum
    having?: KunjunganRumahScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KunjunganRumahCountAggregateInputType | true
    _min?: KunjunganRumahMinAggregateInputType
    _max?: KunjunganRumahMaxAggregateInputType
  }

  export type KunjunganRumahGroupByOutputType = {
    id: string
    nomor: string
    siswaNisn: string
    tanggal: Date
    tujuan: string
    petugasBk: string | null
    status: $Enums.StatusKunjungan
    hasilKunjungan: string | null
    catatan: string | null
    dokumenList: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: KunjunganRumahCountAggregateOutputType | null
    _min: KunjunganRumahMinAggregateOutputType | null
    _max: KunjunganRumahMaxAggregateOutputType | null
  }

  type GetKunjunganRumahGroupByPayload<T extends KunjunganRumahGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KunjunganRumahGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KunjunganRumahGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KunjunganRumahGroupByOutputType[P]>
            : GetScalarType<T[P], KunjunganRumahGroupByOutputType[P]>
        }
      >
    >


  export type KunjunganRumahSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    siswaNisn?: boolean
    tanggal?: boolean
    tujuan?: boolean
    petugasBk?: boolean
    status?: boolean
    hasilKunjungan?: boolean
    catatan?: boolean
    dokumenList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kunjunganRumah"]>

  export type KunjunganRumahSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nomor?: boolean
    siswaNisn?: boolean
    tanggal?: boolean
    tujuan?: boolean
    petugasBk?: boolean
    status?: boolean
    hasilKunjungan?: boolean
    catatan?: boolean
    dokumenList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["kunjunganRumah"]>

  export type KunjunganRumahSelectScalar = {
    id?: boolean
    nomor?: boolean
    siswaNisn?: boolean
    tanggal?: boolean
    tujuan?: boolean
    petugasBk?: boolean
    status?: boolean
    hasilKunjungan?: boolean
    catatan?: boolean
    dokumenList?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type KunjunganRumahInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }
  export type KunjunganRumahIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    siswa?: boolean | SiswaDefaultArgs<ExtArgs>
  }

  export type $KunjunganRumahPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "KunjunganRumah"
    objects: {
      siswa: Prisma.$SiswaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nomor: string
      siswaNisn: string
      tanggal: Date
      tujuan: string
      petugasBk: string | null
      status: $Enums.StatusKunjungan
      hasilKunjungan: string | null
      catatan: string | null
      dokumenList: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["kunjunganRumah"]>
    composites: {}
  }

  type KunjunganRumahGetPayload<S extends boolean | null | undefined | KunjunganRumahDefaultArgs> = $Result.GetResult<Prisma.$KunjunganRumahPayload, S>

  type KunjunganRumahCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KunjunganRumahFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KunjunganRumahCountAggregateInputType | true
    }

  export interface KunjunganRumahDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['KunjunganRumah'], meta: { name: 'KunjunganRumah' } }
    /**
     * Find zero or one KunjunganRumah that matches the filter.
     * @param {KunjunganRumahFindUniqueArgs} args - Arguments to find a KunjunganRumah
     * @example
     * // Get one KunjunganRumah
     * const kunjunganRumah = await prisma.kunjunganRumah.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KunjunganRumahFindUniqueArgs>(args: SelectSubset<T, KunjunganRumahFindUniqueArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one KunjunganRumah that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KunjunganRumahFindUniqueOrThrowArgs} args - Arguments to find a KunjunganRumah
     * @example
     * // Get one KunjunganRumah
     * const kunjunganRumah = await prisma.kunjunganRumah.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KunjunganRumahFindUniqueOrThrowArgs>(args: SelectSubset<T, KunjunganRumahFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first KunjunganRumah that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahFindFirstArgs} args - Arguments to find a KunjunganRumah
     * @example
     * // Get one KunjunganRumah
     * const kunjunganRumah = await prisma.kunjunganRumah.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KunjunganRumahFindFirstArgs>(args?: SelectSubset<T, KunjunganRumahFindFirstArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first KunjunganRumah that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahFindFirstOrThrowArgs} args - Arguments to find a KunjunganRumah
     * @example
     * // Get one KunjunganRumah
     * const kunjunganRumah = await prisma.kunjunganRumah.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KunjunganRumahFindFirstOrThrowArgs>(args?: SelectSubset<T, KunjunganRumahFindFirstOrThrowArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more KunjunganRumahs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all KunjunganRumahs
     * const kunjunganRumahs = await prisma.kunjunganRumah.findMany()
     * 
     * // Get first 10 KunjunganRumahs
     * const kunjunganRumahs = await prisma.kunjunganRumah.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kunjunganRumahWithIdOnly = await prisma.kunjunganRumah.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KunjunganRumahFindManyArgs>(args?: SelectSubset<T, KunjunganRumahFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a KunjunganRumah.
     * @param {KunjunganRumahCreateArgs} args - Arguments to create a KunjunganRumah.
     * @example
     * // Create one KunjunganRumah
     * const KunjunganRumah = await prisma.kunjunganRumah.create({
     *   data: {
     *     // ... data to create a KunjunganRumah
     *   }
     * })
     * 
     */
    create<T extends KunjunganRumahCreateArgs>(args: SelectSubset<T, KunjunganRumahCreateArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many KunjunganRumahs.
     * @param {KunjunganRumahCreateManyArgs} args - Arguments to create many KunjunganRumahs.
     * @example
     * // Create many KunjunganRumahs
     * const kunjunganRumah = await prisma.kunjunganRumah.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KunjunganRumahCreateManyArgs>(args?: SelectSubset<T, KunjunganRumahCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many KunjunganRumahs and returns the data saved in the database.
     * @param {KunjunganRumahCreateManyAndReturnArgs} args - Arguments to create many KunjunganRumahs.
     * @example
     * // Create many KunjunganRumahs
     * const kunjunganRumah = await prisma.kunjunganRumah.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many KunjunganRumahs and only return the `id`
     * const kunjunganRumahWithIdOnly = await prisma.kunjunganRumah.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KunjunganRumahCreateManyAndReturnArgs>(args?: SelectSubset<T, KunjunganRumahCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a KunjunganRumah.
     * @param {KunjunganRumahDeleteArgs} args - Arguments to delete one KunjunganRumah.
     * @example
     * // Delete one KunjunganRumah
     * const KunjunganRumah = await prisma.kunjunganRumah.delete({
     *   where: {
     *     // ... filter to delete one KunjunganRumah
     *   }
     * })
     * 
     */
    delete<T extends KunjunganRumahDeleteArgs>(args: SelectSubset<T, KunjunganRumahDeleteArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one KunjunganRumah.
     * @param {KunjunganRumahUpdateArgs} args - Arguments to update one KunjunganRumah.
     * @example
     * // Update one KunjunganRumah
     * const kunjunganRumah = await prisma.kunjunganRumah.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KunjunganRumahUpdateArgs>(args: SelectSubset<T, KunjunganRumahUpdateArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more KunjunganRumahs.
     * @param {KunjunganRumahDeleteManyArgs} args - Arguments to filter KunjunganRumahs to delete.
     * @example
     * // Delete a few KunjunganRumahs
     * const { count } = await prisma.kunjunganRumah.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KunjunganRumahDeleteManyArgs>(args?: SelectSubset<T, KunjunganRumahDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more KunjunganRumahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many KunjunganRumahs
     * const kunjunganRumah = await prisma.kunjunganRumah.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KunjunganRumahUpdateManyArgs>(args: SelectSubset<T, KunjunganRumahUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one KunjunganRumah.
     * @param {KunjunganRumahUpsertArgs} args - Arguments to update or create a KunjunganRumah.
     * @example
     * // Update or create a KunjunganRumah
     * const kunjunganRumah = await prisma.kunjunganRumah.upsert({
     *   create: {
     *     // ... data to create a KunjunganRumah
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the KunjunganRumah we want to update
     *   }
     * })
     */
    upsert<T extends KunjunganRumahUpsertArgs>(args: SelectSubset<T, KunjunganRumahUpsertArgs<ExtArgs>>): Prisma__KunjunganRumahClient<$Result.GetResult<Prisma.$KunjunganRumahPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of KunjunganRumahs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahCountArgs} args - Arguments to filter KunjunganRumahs to count.
     * @example
     * // Count the number of KunjunganRumahs
     * const count = await prisma.kunjunganRumah.count({
     *   where: {
     *     // ... the filter for the KunjunganRumahs we want to count
     *   }
     * })
    **/
    count<T extends KunjunganRumahCountArgs>(
      args?: Subset<T, KunjunganRumahCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KunjunganRumahCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a KunjunganRumah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KunjunganRumahAggregateArgs>(args: Subset<T, KunjunganRumahAggregateArgs>): Prisma.PrismaPromise<GetKunjunganRumahAggregateType<T>>

    /**
     * Group by KunjunganRumah.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KunjunganRumahGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KunjunganRumahGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KunjunganRumahGroupByArgs['orderBy'] }
        : { orderBy?: KunjunganRumahGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KunjunganRumahGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKunjunganRumahGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the KunjunganRumah model
   */
  readonly fields: KunjunganRumahFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for KunjunganRumah.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KunjunganRumahClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    siswa<T extends SiswaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SiswaDefaultArgs<ExtArgs>>): Prisma__SiswaClient<$Result.GetResult<Prisma.$SiswaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the KunjunganRumah model
   */ 
  interface KunjunganRumahFieldRefs {
    readonly id: FieldRef<"KunjunganRumah", 'String'>
    readonly nomor: FieldRef<"KunjunganRumah", 'String'>
    readonly siswaNisn: FieldRef<"KunjunganRumah", 'String'>
    readonly tanggal: FieldRef<"KunjunganRumah", 'DateTime'>
    readonly tujuan: FieldRef<"KunjunganRumah", 'String'>
    readonly petugasBk: FieldRef<"KunjunganRumah", 'String'>
    readonly status: FieldRef<"KunjunganRumah", 'StatusKunjungan'>
    readonly hasilKunjungan: FieldRef<"KunjunganRumah", 'String'>
    readonly catatan: FieldRef<"KunjunganRumah", 'String'>
    readonly dokumenList: FieldRef<"KunjunganRumah", 'Json'>
    readonly createdAt: FieldRef<"KunjunganRumah", 'DateTime'>
    readonly updatedAt: FieldRef<"KunjunganRumah", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * KunjunganRumah findUnique
   */
  export type KunjunganRumahFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * Filter, which KunjunganRumah to fetch.
     */
    where: KunjunganRumahWhereUniqueInput
  }

  /**
   * KunjunganRumah findUniqueOrThrow
   */
  export type KunjunganRumahFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * Filter, which KunjunganRumah to fetch.
     */
    where: KunjunganRumahWhereUniqueInput
  }

  /**
   * KunjunganRumah findFirst
   */
  export type KunjunganRumahFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * Filter, which KunjunganRumah to fetch.
     */
    where?: KunjunganRumahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KunjunganRumahs to fetch.
     */
    orderBy?: KunjunganRumahOrderByWithRelationInput | KunjunganRumahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KunjunganRumahs.
     */
    cursor?: KunjunganRumahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KunjunganRumahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KunjunganRumahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KunjunganRumahs.
     */
    distinct?: KunjunganRumahScalarFieldEnum | KunjunganRumahScalarFieldEnum[]
  }

  /**
   * KunjunganRumah findFirstOrThrow
   */
  export type KunjunganRumahFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * Filter, which KunjunganRumah to fetch.
     */
    where?: KunjunganRumahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KunjunganRumahs to fetch.
     */
    orderBy?: KunjunganRumahOrderByWithRelationInput | KunjunganRumahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for KunjunganRumahs.
     */
    cursor?: KunjunganRumahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KunjunganRumahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KunjunganRumahs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of KunjunganRumahs.
     */
    distinct?: KunjunganRumahScalarFieldEnum | KunjunganRumahScalarFieldEnum[]
  }

  /**
   * KunjunganRumah findMany
   */
  export type KunjunganRumahFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * Filter, which KunjunganRumahs to fetch.
     */
    where?: KunjunganRumahWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of KunjunganRumahs to fetch.
     */
    orderBy?: KunjunganRumahOrderByWithRelationInput | KunjunganRumahOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing KunjunganRumahs.
     */
    cursor?: KunjunganRumahWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` KunjunganRumahs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` KunjunganRumahs.
     */
    skip?: number
    distinct?: KunjunganRumahScalarFieldEnum | KunjunganRumahScalarFieldEnum[]
  }

  /**
   * KunjunganRumah create
   */
  export type KunjunganRumahCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * The data needed to create a KunjunganRumah.
     */
    data: XOR<KunjunganRumahCreateInput, KunjunganRumahUncheckedCreateInput>
  }

  /**
   * KunjunganRumah createMany
   */
  export type KunjunganRumahCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many KunjunganRumahs.
     */
    data: KunjunganRumahCreateManyInput | KunjunganRumahCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * KunjunganRumah createManyAndReturn
   */
  export type KunjunganRumahCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many KunjunganRumahs.
     */
    data: KunjunganRumahCreateManyInput | KunjunganRumahCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * KunjunganRumah update
   */
  export type KunjunganRumahUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * The data needed to update a KunjunganRumah.
     */
    data: XOR<KunjunganRumahUpdateInput, KunjunganRumahUncheckedUpdateInput>
    /**
     * Choose, which KunjunganRumah to update.
     */
    where: KunjunganRumahWhereUniqueInput
  }

  /**
   * KunjunganRumah updateMany
   */
  export type KunjunganRumahUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update KunjunganRumahs.
     */
    data: XOR<KunjunganRumahUpdateManyMutationInput, KunjunganRumahUncheckedUpdateManyInput>
    /**
     * Filter which KunjunganRumahs to update
     */
    where?: KunjunganRumahWhereInput
  }

  /**
   * KunjunganRumah upsert
   */
  export type KunjunganRumahUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * The filter to search for the KunjunganRumah to update in case it exists.
     */
    where: KunjunganRumahWhereUniqueInput
    /**
     * In case the KunjunganRumah found by the `where` argument doesn't exist, create a new KunjunganRumah with this data.
     */
    create: XOR<KunjunganRumahCreateInput, KunjunganRumahUncheckedCreateInput>
    /**
     * In case the KunjunganRumah was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KunjunganRumahUpdateInput, KunjunganRumahUncheckedUpdateInput>
  }

  /**
   * KunjunganRumah delete
   */
  export type KunjunganRumahDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
    /**
     * Filter which KunjunganRumah to delete.
     */
    where: KunjunganRumahWhereUniqueInput
  }

  /**
   * KunjunganRumah deleteMany
   */
  export type KunjunganRumahDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which KunjunganRumahs to delete
     */
    where?: KunjunganRumahWhereInput
  }

  /**
   * KunjunganRumah without action
   */
  export type KunjunganRumahDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the KunjunganRumah
     */
    select?: KunjunganRumahSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: KunjunganRumahInclude<ExtArgs> | null
  }


  /**
   * Model Kelas
   */

  export type AggregateKelas = {
    _count: KelasCountAggregateOutputType | null
    _min: KelasMinAggregateOutputType | null
    _max: KelasMaxAggregateOutputType | null
  }

  export type KelasMinAggregateOutputType = {
    id: string | null
    nama: string | null
  }

  export type KelasMaxAggregateOutputType = {
    id: string | null
    nama: string | null
  }

  export type KelasCountAggregateOutputType = {
    id: number
    nama: number
    _all: number
  }


  export type KelasMinAggregateInputType = {
    id?: true
    nama?: true
  }

  export type KelasMaxAggregateInputType = {
    id?: true
    nama?: true
  }

  export type KelasCountAggregateInputType = {
    id?: true
    nama?: true
    _all?: true
  }

  export type KelasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kelas to aggregate.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Kelas
    **/
    _count?: true | KelasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: KelasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: KelasMaxAggregateInputType
  }

  export type GetKelasAggregateType<T extends KelasAggregateArgs> = {
        [P in keyof T & keyof AggregateKelas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateKelas[P]>
      : GetScalarType<T[P], AggregateKelas[P]>
  }




  export type KelasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: KelasWhereInput
    orderBy?: KelasOrderByWithAggregationInput | KelasOrderByWithAggregationInput[]
    by: KelasScalarFieldEnum[] | KelasScalarFieldEnum
    having?: KelasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: KelasCountAggregateInputType | true
    _min?: KelasMinAggregateInputType
    _max?: KelasMaxAggregateInputType
  }

  export type KelasGroupByOutputType = {
    id: string
    nama: string
    _count: KelasCountAggregateOutputType | null
    _min: KelasMinAggregateOutputType | null
    _max: KelasMaxAggregateOutputType | null
  }

  type GetKelasGroupByPayload<T extends KelasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<KelasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof KelasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], KelasGroupByOutputType[P]>
            : GetScalarType<T[P], KelasGroupByOutputType[P]>
        }
      >
    >


  export type KelasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
  }, ExtArgs["result"]["kelas"]>

  export type KelasSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
  }, ExtArgs["result"]["kelas"]>

  export type KelasSelectScalar = {
    id?: boolean
    nama?: boolean
  }


  export type $KelasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Kelas"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama: string
    }, ExtArgs["result"]["kelas"]>
    composites: {}
  }

  type KelasGetPayload<S extends boolean | null | undefined | KelasDefaultArgs> = $Result.GetResult<Prisma.$KelasPayload, S>

  type KelasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<KelasFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: KelasCountAggregateInputType | true
    }

  export interface KelasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Kelas'], meta: { name: 'Kelas' } }
    /**
     * Find zero or one Kelas that matches the filter.
     * @param {KelasFindUniqueArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends KelasFindUniqueArgs>(args: SelectSubset<T, KelasFindUniqueArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Kelas that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {KelasFindUniqueOrThrowArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends KelasFindUniqueOrThrowArgs>(args: SelectSubset<T, KelasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Kelas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasFindFirstArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends KelasFindFirstArgs>(args?: SelectSubset<T, KelasFindFirstArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Kelas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasFindFirstOrThrowArgs} args - Arguments to find a Kelas
     * @example
     * // Get one Kelas
     * const kelas = await prisma.kelas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends KelasFindFirstOrThrowArgs>(args?: SelectSubset<T, KelasFindFirstOrThrowArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Kelas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Kelas
     * const kelas = await prisma.kelas.findMany()
     * 
     * // Get first 10 Kelas
     * const kelas = await prisma.kelas.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const kelasWithIdOnly = await prisma.kelas.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends KelasFindManyArgs>(args?: SelectSubset<T, KelasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Kelas.
     * @param {KelasCreateArgs} args - Arguments to create a Kelas.
     * @example
     * // Create one Kelas
     * const Kelas = await prisma.kelas.create({
     *   data: {
     *     // ... data to create a Kelas
     *   }
     * })
     * 
     */
    create<T extends KelasCreateArgs>(args: SelectSubset<T, KelasCreateArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Kelas.
     * @param {KelasCreateManyArgs} args - Arguments to create many Kelas.
     * @example
     * // Create many Kelas
     * const kelas = await prisma.kelas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends KelasCreateManyArgs>(args?: SelectSubset<T, KelasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Kelas and returns the data saved in the database.
     * @param {KelasCreateManyAndReturnArgs} args - Arguments to create many Kelas.
     * @example
     * // Create many Kelas
     * const kelas = await prisma.kelas.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Kelas and only return the `id`
     * const kelasWithIdOnly = await prisma.kelas.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends KelasCreateManyAndReturnArgs>(args?: SelectSubset<T, KelasCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Kelas.
     * @param {KelasDeleteArgs} args - Arguments to delete one Kelas.
     * @example
     * // Delete one Kelas
     * const Kelas = await prisma.kelas.delete({
     *   where: {
     *     // ... filter to delete one Kelas
     *   }
     * })
     * 
     */
    delete<T extends KelasDeleteArgs>(args: SelectSubset<T, KelasDeleteArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Kelas.
     * @param {KelasUpdateArgs} args - Arguments to update one Kelas.
     * @example
     * // Update one Kelas
     * const kelas = await prisma.kelas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends KelasUpdateArgs>(args: SelectSubset<T, KelasUpdateArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Kelas.
     * @param {KelasDeleteManyArgs} args - Arguments to filter Kelas to delete.
     * @example
     * // Delete a few Kelas
     * const { count } = await prisma.kelas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends KelasDeleteManyArgs>(args?: SelectSubset<T, KelasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Kelas
     * const kelas = await prisma.kelas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends KelasUpdateManyArgs>(args: SelectSubset<T, KelasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Kelas.
     * @param {KelasUpsertArgs} args - Arguments to update or create a Kelas.
     * @example
     * // Update or create a Kelas
     * const kelas = await prisma.kelas.upsert({
     *   create: {
     *     // ... data to create a Kelas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Kelas we want to update
     *   }
     * })
     */
    upsert<T extends KelasUpsertArgs>(args: SelectSubset<T, KelasUpsertArgs<ExtArgs>>): Prisma__KelasClient<$Result.GetResult<Prisma.$KelasPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasCountArgs} args - Arguments to filter Kelas to count.
     * @example
     * // Count the number of Kelas
     * const count = await prisma.kelas.count({
     *   where: {
     *     // ... the filter for the Kelas we want to count
     *   }
     * })
    **/
    count<T extends KelasCountArgs>(
      args?: Subset<T, KelasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], KelasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends KelasAggregateArgs>(args: Subset<T, KelasAggregateArgs>): Prisma.PrismaPromise<GetKelasAggregateType<T>>

    /**
     * Group by Kelas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {KelasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends KelasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: KelasGroupByArgs['orderBy'] }
        : { orderBy?: KelasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, KelasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetKelasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Kelas model
   */
  readonly fields: KelasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Kelas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__KelasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Kelas model
   */ 
  interface KelasFieldRefs {
    readonly id: FieldRef<"Kelas", 'String'>
    readonly nama: FieldRef<"Kelas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Kelas findUnique
   */
  export type KelasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas findUniqueOrThrow
   */
  export type KelasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas findFirst
   */
  export type KelasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kelas.
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kelas.
     */
    distinct?: KelasScalarFieldEnum | KelasScalarFieldEnum[]
  }

  /**
   * Kelas findFirstOrThrow
   */
  export type KelasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Kelas.
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Kelas.
     */
    distinct?: KelasScalarFieldEnum | KelasScalarFieldEnum[]
  }

  /**
   * Kelas findMany
   */
  export type KelasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Filter, which Kelas to fetch.
     */
    where?: KelasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Kelas to fetch.
     */
    orderBy?: KelasOrderByWithRelationInput | KelasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Kelas.
     */
    cursor?: KelasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Kelas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Kelas.
     */
    skip?: number
    distinct?: KelasScalarFieldEnum | KelasScalarFieldEnum[]
  }

  /**
   * Kelas create
   */
  export type KelasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * The data needed to create a Kelas.
     */
    data: XOR<KelasCreateInput, KelasUncheckedCreateInput>
  }

  /**
   * Kelas createMany
   */
  export type KelasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Kelas.
     */
    data: KelasCreateManyInput | KelasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kelas createManyAndReturn
   */
  export type KelasCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Kelas.
     */
    data: KelasCreateManyInput | KelasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Kelas update
   */
  export type KelasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * The data needed to update a Kelas.
     */
    data: XOR<KelasUpdateInput, KelasUncheckedUpdateInput>
    /**
     * Choose, which Kelas to update.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas updateMany
   */
  export type KelasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Kelas.
     */
    data: XOR<KelasUpdateManyMutationInput, KelasUncheckedUpdateManyInput>
    /**
     * Filter which Kelas to update
     */
    where?: KelasWhereInput
  }

  /**
   * Kelas upsert
   */
  export type KelasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * The filter to search for the Kelas to update in case it exists.
     */
    where: KelasWhereUniqueInput
    /**
     * In case the Kelas found by the `where` argument doesn't exist, create a new Kelas with this data.
     */
    create: XOR<KelasCreateInput, KelasUncheckedCreateInput>
    /**
     * In case the Kelas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<KelasUpdateInput, KelasUncheckedUpdateInput>
  }

  /**
   * Kelas delete
   */
  export type KelasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
    /**
     * Filter which Kelas to delete.
     */
    where: KelasWhereUniqueInput
  }

  /**
   * Kelas deleteMany
   */
  export type KelasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Kelas to delete
     */
    where?: KelasWhereInput
  }

  /**
   * Kelas without action
   */
  export type KelasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Kelas
     */
    select?: KelasSelect<ExtArgs> | null
  }


  /**
   * Model Mapel
   */

  export type AggregateMapel = {
    _count: MapelCountAggregateOutputType | null
    _min: MapelMinAggregateOutputType | null
    _max: MapelMaxAggregateOutputType | null
  }

  export type MapelMinAggregateOutputType = {
    id: string | null
    nama: string | null
  }

  export type MapelMaxAggregateOutputType = {
    id: string | null
    nama: string | null
  }

  export type MapelCountAggregateOutputType = {
    id: number
    nama: number
    _all: number
  }


  export type MapelMinAggregateInputType = {
    id?: true
    nama?: true
  }

  export type MapelMaxAggregateInputType = {
    id?: true
    nama?: true
  }

  export type MapelCountAggregateInputType = {
    id?: true
    nama?: true
    _all?: true
  }

  export type MapelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mapel to aggregate.
     */
    where?: MapelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mapels to fetch.
     */
    orderBy?: MapelOrderByWithRelationInput | MapelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MapelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mapels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mapels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mapels
    **/
    _count?: true | MapelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MapelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MapelMaxAggregateInputType
  }

  export type GetMapelAggregateType<T extends MapelAggregateArgs> = {
        [P in keyof T & keyof AggregateMapel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMapel[P]>
      : GetScalarType<T[P], AggregateMapel[P]>
  }




  export type MapelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MapelWhereInput
    orderBy?: MapelOrderByWithAggregationInput | MapelOrderByWithAggregationInput[]
    by: MapelScalarFieldEnum[] | MapelScalarFieldEnum
    having?: MapelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MapelCountAggregateInputType | true
    _min?: MapelMinAggregateInputType
    _max?: MapelMaxAggregateInputType
  }

  export type MapelGroupByOutputType = {
    id: string
    nama: string
    _count: MapelCountAggregateOutputType | null
    _min: MapelMinAggregateOutputType | null
    _max: MapelMaxAggregateOutputType | null
  }

  type GetMapelGroupByPayload<T extends MapelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MapelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MapelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MapelGroupByOutputType[P]>
            : GetScalarType<T[P], MapelGroupByOutputType[P]>
        }
      >
    >


  export type MapelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
  }, ExtArgs["result"]["mapel"]>

  export type MapelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nama?: boolean
  }, ExtArgs["result"]["mapel"]>

  export type MapelSelectScalar = {
    id?: boolean
    nama?: boolean
  }


  export type $MapelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mapel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nama: string
    }, ExtArgs["result"]["mapel"]>
    composites: {}
  }

  type MapelGetPayload<S extends boolean | null | undefined | MapelDefaultArgs> = $Result.GetResult<Prisma.$MapelPayload, S>

  type MapelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MapelFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MapelCountAggregateInputType | true
    }

  export interface MapelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mapel'], meta: { name: 'Mapel' } }
    /**
     * Find zero or one Mapel that matches the filter.
     * @param {MapelFindUniqueArgs} args - Arguments to find a Mapel
     * @example
     * // Get one Mapel
     * const mapel = await prisma.mapel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MapelFindUniqueArgs>(args: SelectSubset<T, MapelFindUniqueArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Mapel that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MapelFindUniqueOrThrowArgs} args - Arguments to find a Mapel
     * @example
     * // Get one Mapel
     * const mapel = await prisma.mapel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MapelFindUniqueOrThrowArgs>(args: SelectSubset<T, MapelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Mapel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelFindFirstArgs} args - Arguments to find a Mapel
     * @example
     * // Get one Mapel
     * const mapel = await prisma.mapel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MapelFindFirstArgs>(args?: SelectSubset<T, MapelFindFirstArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Mapel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelFindFirstOrThrowArgs} args - Arguments to find a Mapel
     * @example
     * // Get one Mapel
     * const mapel = await prisma.mapel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MapelFindFirstOrThrowArgs>(args?: SelectSubset<T, MapelFindFirstOrThrowArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Mapels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mapels
     * const mapels = await prisma.mapel.findMany()
     * 
     * // Get first 10 Mapels
     * const mapels = await prisma.mapel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mapelWithIdOnly = await prisma.mapel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MapelFindManyArgs>(args?: SelectSubset<T, MapelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Mapel.
     * @param {MapelCreateArgs} args - Arguments to create a Mapel.
     * @example
     * // Create one Mapel
     * const Mapel = await prisma.mapel.create({
     *   data: {
     *     // ... data to create a Mapel
     *   }
     * })
     * 
     */
    create<T extends MapelCreateArgs>(args: SelectSubset<T, MapelCreateArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Mapels.
     * @param {MapelCreateManyArgs} args - Arguments to create many Mapels.
     * @example
     * // Create many Mapels
     * const mapel = await prisma.mapel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MapelCreateManyArgs>(args?: SelectSubset<T, MapelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mapels and returns the data saved in the database.
     * @param {MapelCreateManyAndReturnArgs} args - Arguments to create many Mapels.
     * @example
     * // Create many Mapels
     * const mapel = await prisma.mapel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mapels and only return the `id`
     * const mapelWithIdOnly = await prisma.mapel.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MapelCreateManyAndReturnArgs>(args?: SelectSubset<T, MapelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Mapel.
     * @param {MapelDeleteArgs} args - Arguments to delete one Mapel.
     * @example
     * // Delete one Mapel
     * const Mapel = await prisma.mapel.delete({
     *   where: {
     *     // ... filter to delete one Mapel
     *   }
     * })
     * 
     */
    delete<T extends MapelDeleteArgs>(args: SelectSubset<T, MapelDeleteArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Mapel.
     * @param {MapelUpdateArgs} args - Arguments to update one Mapel.
     * @example
     * // Update one Mapel
     * const mapel = await prisma.mapel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MapelUpdateArgs>(args: SelectSubset<T, MapelUpdateArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Mapels.
     * @param {MapelDeleteManyArgs} args - Arguments to filter Mapels to delete.
     * @example
     * // Delete a few Mapels
     * const { count } = await prisma.mapel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MapelDeleteManyArgs>(args?: SelectSubset<T, MapelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mapels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mapels
     * const mapel = await prisma.mapel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MapelUpdateManyArgs>(args: SelectSubset<T, MapelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mapel.
     * @param {MapelUpsertArgs} args - Arguments to update or create a Mapel.
     * @example
     * // Update or create a Mapel
     * const mapel = await prisma.mapel.upsert({
     *   create: {
     *     // ... data to create a Mapel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mapel we want to update
     *   }
     * })
     */
    upsert<T extends MapelUpsertArgs>(args: SelectSubset<T, MapelUpsertArgs<ExtArgs>>): Prisma__MapelClient<$Result.GetResult<Prisma.$MapelPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Mapels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelCountArgs} args - Arguments to filter Mapels to count.
     * @example
     * // Count the number of Mapels
     * const count = await prisma.mapel.count({
     *   where: {
     *     // ... the filter for the Mapels we want to count
     *   }
     * })
    **/
    count<T extends MapelCountArgs>(
      args?: Subset<T, MapelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MapelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mapel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MapelAggregateArgs>(args: Subset<T, MapelAggregateArgs>): Prisma.PrismaPromise<GetMapelAggregateType<T>>

    /**
     * Group by Mapel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MapelGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MapelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MapelGroupByArgs['orderBy'] }
        : { orderBy?: MapelGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MapelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMapelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mapel model
   */
  readonly fields: MapelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mapel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MapelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mapel model
   */ 
  interface MapelFieldRefs {
    readonly id: FieldRef<"Mapel", 'String'>
    readonly nama: FieldRef<"Mapel", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Mapel findUnique
   */
  export type MapelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * Filter, which Mapel to fetch.
     */
    where: MapelWhereUniqueInput
  }

  /**
   * Mapel findUniqueOrThrow
   */
  export type MapelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * Filter, which Mapel to fetch.
     */
    where: MapelWhereUniqueInput
  }

  /**
   * Mapel findFirst
   */
  export type MapelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * Filter, which Mapel to fetch.
     */
    where?: MapelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mapels to fetch.
     */
    orderBy?: MapelOrderByWithRelationInput | MapelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mapels.
     */
    cursor?: MapelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mapels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mapels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mapels.
     */
    distinct?: MapelScalarFieldEnum | MapelScalarFieldEnum[]
  }

  /**
   * Mapel findFirstOrThrow
   */
  export type MapelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * Filter, which Mapel to fetch.
     */
    where?: MapelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mapels to fetch.
     */
    orderBy?: MapelOrderByWithRelationInput | MapelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mapels.
     */
    cursor?: MapelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mapels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mapels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mapels.
     */
    distinct?: MapelScalarFieldEnum | MapelScalarFieldEnum[]
  }

  /**
   * Mapel findMany
   */
  export type MapelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * Filter, which Mapels to fetch.
     */
    where?: MapelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mapels to fetch.
     */
    orderBy?: MapelOrderByWithRelationInput | MapelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mapels.
     */
    cursor?: MapelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mapels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mapels.
     */
    skip?: number
    distinct?: MapelScalarFieldEnum | MapelScalarFieldEnum[]
  }

  /**
   * Mapel create
   */
  export type MapelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * The data needed to create a Mapel.
     */
    data: XOR<MapelCreateInput, MapelUncheckedCreateInput>
  }

  /**
   * Mapel createMany
   */
  export type MapelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mapels.
     */
    data: MapelCreateManyInput | MapelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mapel createManyAndReturn
   */
  export type MapelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Mapels.
     */
    data: MapelCreateManyInput | MapelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mapel update
   */
  export type MapelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * The data needed to update a Mapel.
     */
    data: XOR<MapelUpdateInput, MapelUncheckedUpdateInput>
    /**
     * Choose, which Mapel to update.
     */
    where: MapelWhereUniqueInput
  }

  /**
   * Mapel updateMany
   */
  export type MapelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mapels.
     */
    data: XOR<MapelUpdateManyMutationInput, MapelUncheckedUpdateManyInput>
    /**
     * Filter which Mapels to update
     */
    where?: MapelWhereInput
  }

  /**
   * Mapel upsert
   */
  export type MapelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * The filter to search for the Mapel to update in case it exists.
     */
    where: MapelWhereUniqueInput
    /**
     * In case the Mapel found by the `where` argument doesn't exist, create a new Mapel with this data.
     */
    create: XOR<MapelCreateInput, MapelUncheckedCreateInput>
    /**
     * In case the Mapel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MapelUpdateInput, MapelUncheckedUpdateInput>
  }

  /**
   * Mapel delete
   */
  export type MapelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
    /**
     * Filter which Mapel to delete.
     */
    where: MapelWhereUniqueInput
  }

  /**
   * Mapel deleteMany
   */
  export type MapelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mapels to delete
     */
    where?: MapelWhereInput
  }

  /**
   * Mapel without action
   */
  export type MapelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mapel
     */
    select?: MapelSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    token: 'token',
    expiresAt: 'expiresAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    createdAt: 'createdAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SiswaScalarFieldEnum: {
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

  export type SiswaScalarFieldEnum = (typeof SiswaScalarFieldEnum)[keyof typeof SiswaScalarFieldEnum]


  export const AbsensiScalarFieldEnum: {
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

  export type AbsensiScalarFieldEnum = (typeof AbsensiScalarFieldEnum)[keyof typeof AbsensiScalarFieldEnum]


  export const HariLiburScalarFieldEnum: {
    id: 'id',
    tanggal: 'tanggal',
    keterangan: 'keterangan',
    createdAt: 'createdAt'
  };

  export type HariLiburScalarFieldEnum = (typeof HariLiburScalarFieldEnum)[keyof typeof HariLiburScalarFieldEnum]


  export const AppConfigScalarFieldEnum: {
    key: 'key',
    value: 'value',
    updatedAt: 'updatedAt'
  };

  export type AppConfigScalarFieldEnum = (typeof AppConfigScalarFieldEnum)[keyof typeof AppConfigScalarFieldEnum]


  export const JenisPelanggaranScalarFieldEnum: {
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

  export type JenisPelanggaranScalarFieldEnum = (typeof JenisPelanggaranScalarFieldEnum)[keyof typeof JenisPelanggaranScalarFieldEnum]


  export const JenisPrestasiScalarFieldEnum: {
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

  export type JenisPrestasiScalarFieldEnum = (typeof JenisPrestasiScalarFieldEnum)[keyof typeof JenisPrestasiScalarFieldEnum]


  export const JenisKasusScalarFieldEnum: {
    id: 'id',
    kode: 'kode',
    nama: 'nama',
    deskripsi: 'deskripsi',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type JenisKasusScalarFieldEnum = (typeof JenisKasusScalarFieldEnum)[keyof typeof JenisKasusScalarFieldEnum]


  export const PoinSiswaScalarFieldEnum: {
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

  export type PoinSiswaScalarFieldEnum = (typeof PoinSiswaScalarFieldEnum)[keyof typeof PoinSiswaScalarFieldEnum]


  export const KasusSiswaScalarFieldEnum: {
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

  export type KasusSiswaScalarFieldEnum = (typeof KasusSiswaScalarFieldEnum)[keyof typeof KasusSiswaScalarFieldEnum]


  export const LaporanKasusScalarFieldEnum: {
    id: 'id',
    kasusId: 'kasusId',
    tanggal: 'tanggal',
    catatan: 'catatan',
    status: 'status',
    inputBy: 'inputBy',
    createdAt: 'createdAt'
  };

  export type LaporanKasusScalarFieldEnum = (typeof LaporanKasusScalarFieldEnum)[keyof typeof LaporanKasusScalarFieldEnum]


  export const KunjunganRumahScalarFieldEnum: {
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

  export type KunjunganRumahScalarFieldEnum = (typeof KunjunganRumahScalarFieldEnum)[keyof typeof KunjunganRumahScalarFieldEnum]


  export const KelasScalarFieldEnum: {
    id: 'id',
    nama: 'nama'
  };

  export type KelasScalarFieldEnum = (typeof KelasScalarFieldEnum)[keyof typeof KelasScalarFieldEnum]


  export const MapelScalarFieldEnum: {
    id: 'id',
    nama: 'nama'
  };

  export type MapelScalarFieldEnum = (typeof MapelScalarFieldEnum)[keyof typeof MapelScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StatusAbsensi'
   */
  export type EnumStatusAbsensiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAbsensi'>
    


  /**
   * Reference to a field of type 'StatusAbsensi[]'
   */
  export type ListEnumStatusAbsensiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusAbsensi[]'>
    


  /**
   * Reference to a field of type 'KategoriPelanggaran'
   */
  export type EnumKategoriPelanggaranFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KategoriPelanggaran'>
    


  /**
   * Reference to a field of type 'KategoriPelanggaran[]'
   */
  export type ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KategoriPelanggaran[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'KategoriPrestasi'
   */
  export type EnumKategoriPrestasiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KategoriPrestasi'>
    


  /**
   * Reference to a field of type 'KategoriPrestasi[]'
   */
  export type ListEnumKategoriPrestasiFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'KategoriPrestasi[]'>
    


  /**
   * Reference to a field of type 'TipePoin'
   */
  export type EnumTipePoinFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipePoin'>
    


  /**
   * Reference to a field of type 'TipePoin[]'
   */
  export type ListEnumTipePoinFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TipePoin[]'>
    


  /**
   * Reference to a field of type 'StatusKasus'
   */
  export type EnumStatusKasusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKasus'>
    


  /**
   * Reference to a field of type 'StatusKasus[]'
   */
  export type ListEnumStatusKasusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKasus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'StatusKunjungan'
   */
  export type EnumStatusKunjunganFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKunjungan'>
    


  /**
   * Reference to a field of type 'StatusKunjungan[]'
   */
  export type ListEnumStatusKunjunganFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatusKunjungan[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    userId?: StringFilter<"User"> | string
    nama?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    kelas?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    displayPassword?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    role?: SortOrder
    kelas?: SortOrderInput | SortOrder
    isActive?: SortOrder
    displayPassword?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sessions?: SessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    nama?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    kelas?: StringNullableFilter<"User"> | string | null
    isActive?: BoolFilter<"User"> | boolean
    displayPassword?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    sessions?: SessionListRelationFilter
  }, "id" | "userId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    role?: SortOrder
    kelas?: SortOrderInput | SortOrder
    isActive?: SortOrder
    displayPassword?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    userId?: StringWithAggregatesFilter<"User"> | string
    nama?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
    kelas?: StringNullableWithAggregatesFilter<"User"> | string | null
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    displayPassword?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    userId?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Session"> | string
    userId?: StringWithAggregatesFilter<"Session"> | string
    token?: StringWithAggregatesFilter<"Session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"Session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"Session"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type SiswaWhereInput = {
    AND?: SiswaWhereInput | SiswaWhereInput[]
    OR?: SiswaWhereInput[]
    NOT?: SiswaWhereInput | SiswaWhereInput[]
    id?: StringFilter<"Siswa"> | string
    nisn?: StringFilter<"Siswa"> | string
    nama?: StringFilter<"Siswa"> | string
    jenisKelamin?: StringFilter<"Siswa"> | string
    tanggalLahir?: DateTimeNullableFilter<"Siswa"> | Date | string | null
    agama?: StringNullableFilter<"Siswa"> | string | null
    namaAyah?: StringNullableFilter<"Siswa"> | string | null
    namaIbu?: StringNullableFilter<"Siswa"> | string | null
    noHp?: StringNullableFilter<"Siswa"> | string | null
    kelas?: StringFilter<"Siswa"> | string
    alamat?: StringNullableFilter<"Siswa"> | string | null
    fotoUrl?: StringNullableFilter<"Siswa"> | string | null
    isActive?: BoolFilter<"Siswa"> | boolean
    createdAt?: DateTimeFilter<"Siswa"> | Date | string
    updatedAt?: DateTimeFilter<"Siswa"> | Date | string
    absensiList?: AbsensiListRelationFilter
    poinList?: PoinSiswaListRelationFilter
    kasusList?: KasusSiswaListRelationFilter
    kunjunganList?: KunjunganRumahListRelationFilter
  }

  export type SiswaOrderByWithRelationInput = {
    id?: SortOrder
    nisn?: SortOrder
    nama?: SortOrder
    jenisKelamin?: SortOrder
    tanggalLahir?: SortOrderInput | SortOrder
    agama?: SortOrderInput | SortOrder
    namaAyah?: SortOrderInput | SortOrder
    namaIbu?: SortOrderInput | SortOrder
    noHp?: SortOrderInput | SortOrder
    kelas?: SortOrder
    alamat?: SortOrderInput | SortOrder
    fotoUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    absensiList?: AbsensiOrderByRelationAggregateInput
    poinList?: PoinSiswaOrderByRelationAggregateInput
    kasusList?: KasusSiswaOrderByRelationAggregateInput
    kunjunganList?: KunjunganRumahOrderByRelationAggregateInput
  }

  export type SiswaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nisn?: string
    AND?: SiswaWhereInput | SiswaWhereInput[]
    OR?: SiswaWhereInput[]
    NOT?: SiswaWhereInput | SiswaWhereInput[]
    nama?: StringFilter<"Siswa"> | string
    jenisKelamin?: StringFilter<"Siswa"> | string
    tanggalLahir?: DateTimeNullableFilter<"Siswa"> | Date | string | null
    agama?: StringNullableFilter<"Siswa"> | string | null
    namaAyah?: StringNullableFilter<"Siswa"> | string | null
    namaIbu?: StringNullableFilter<"Siswa"> | string | null
    noHp?: StringNullableFilter<"Siswa"> | string | null
    kelas?: StringFilter<"Siswa"> | string
    alamat?: StringNullableFilter<"Siswa"> | string | null
    fotoUrl?: StringNullableFilter<"Siswa"> | string | null
    isActive?: BoolFilter<"Siswa"> | boolean
    createdAt?: DateTimeFilter<"Siswa"> | Date | string
    updatedAt?: DateTimeFilter<"Siswa"> | Date | string
    absensiList?: AbsensiListRelationFilter
    poinList?: PoinSiswaListRelationFilter
    kasusList?: KasusSiswaListRelationFilter
    kunjunganList?: KunjunganRumahListRelationFilter
  }, "id" | "nisn">

  export type SiswaOrderByWithAggregationInput = {
    id?: SortOrder
    nisn?: SortOrder
    nama?: SortOrder
    jenisKelamin?: SortOrder
    tanggalLahir?: SortOrderInput | SortOrder
    agama?: SortOrderInput | SortOrder
    namaAyah?: SortOrderInput | SortOrder
    namaIbu?: SortOrderInput | SortOrder
    noHp?: SortOrderInput | SortOrder
    kelas?: SortOrder
    alamat?: SortOrderInput | SortOrder
    fotoUrl?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SiswaCountOrderByAggregateInput
    _max?: SiswaMaxOrderByAggregateInput
    _min?: SiswaMinOrderByAggregateInput
  }

  export type SiswaScalarWhereWithAggregatesInput = {
    AND?: SiswaScalarWhereWithAggregatesInput | SiswaScalarWhereWithAggregatesInput[]
    OR?: SiswaScalarWhereWithAggregatesInput[]
    NOT?: SiswaScalarWhereWithAggregatesInput | SiswaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Siswa"> | string
    nisn?: StringWithAggregatesFilter<"Siswa"> | string
    nama?: StringWithAggregatesFilter<"Siswa"> | string
    jenisKelamin?: StringWithAggregatesFilter<"Siswa"> | string
    tanggalLahir?: DateTimeNullableWithAggregatesFilter<"Siswa"> | Date | string | null
    agama?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    namaAyah?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    namaIbu?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    noHp?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    kelas?: StringWithAggregatesFilter<"Siswa"> | string
    alamat?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    fotoUrl?: StringNullableWithAggregatesFilter<"Siswa"> | string | null
    isActive?: BoolWithAggregatesFilter<"Siswa"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Siswa"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Siswa"> | Date | string
  }

  export type AbsensiWhereInput = {
    AND?: AbsensiWhereInput | AbsensiWhereInput[]
    OR?: AbsensiWhereInput[]
    NOT?: AbsensiWhereInput | AbsensiWhereInput[]
    id?: StringFilter<"Absensi"> | string
    tanggal?: DateTimeFilter<"Absensi"> | Date | string
    siswaNisn?: StringFilter<"Absensi"> | string
    namaSnapshot?: StringFilter<"Absensi"> | string
    kelasSnapshot?: StringFilter<"Absensi"> | string
    jamDatang?: StringNullableFilter<"Absensi"> | string | null
    jamPulang?: StringNullableFilter<"Absensi"> | string | null
    jamSholat?: StringNullableFilter<"Absensi"> | string | null
    status?: EnumStatusAbsensiFilter<"Absensi"> | $Enums.StatusAbsensi
    keterangan?: StringNullableFilter<"Absensi"> | string | null
    catatan?: StringNullableFilter<"Absensi"> | string | null
    inputBy?: StringNullableFilter<"Absensi"> | string | null
    createdAt?: DateTimeFilter<"Absensi"> | Date | string
    updatedAt?: DateTimeFilter<"Absensi"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
  }

  export type AbsensiOrderByWithRelationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    siswaNisn?: SortOrder
    namaSnapshot?: SortOrder
    kelasSnapshot?: SortOrder
    jamDatang?: SortOrderInput | SortOrder
    jamPulang?: SortOrderInput | SortOrder
    jamSholat?: SortOrderInput | SortOrder
    status?: SortOrder
    keterangan?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    inputBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
  }

  export type AbsensiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tanggal_siswaNisn?: AbsensiTanggalSiswaNisnCompoundUniqueInput
    AND?: AbsensiWhereInput | AbsensiWhereInput[]
    OR?: AbsensiWhereInput[]
    NOT?: AbsensiWhereInput | AbsensiWhereInput[]
    tanggal?: DateTimeFilter<"Absensi"> | Date | string
    siswaNisn?: StringFilter<"Absensi"> | string
    namaSnapshot?: StringFilter<"Absensi"> | string
    kelasSnapshot?: StringFilter<"Absensi"> | string
    jamDatang?: StringNullableFilter<"Absensi"> | string | null
    jamPulang?: StringNullableFilter<"Absensi"> | string | null
    jamSholat?: StringNullableFilter<"Absensi"> | string | null
    status?: EnumStatusAbsensiFilter<"Absensi"> | $Enums.StatusAbsensi
    keterangan?: StringNullableFilter<"Absensi"> | string | null
    catatan?: StringNullableFilter<"Absensi"> | string | null
    inputBy?: StringNullableFilter<"Absensi"> | string | null
    createdAt?: DateTimeFilter<"Absensi"> | Date | string
    updatedAt?: DateTimeFilter<"Absensi"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
  }, "id" | "tanggal_siswaNisn">

  export type AbsensiOrderByWithAggregationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    siswaNisn?: SortOrder
    namaSnapshot?: SortOrder
    kelasSnapshot?: SortOrder
    jamDatang?: SortOrderInput | SortOrder
    jamPulang?: SortOrderInput | SortOrder
    jamSholat?: SortOrderInput | SortOrder
    status?: SortOrder
    keterangan?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    inputBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AbsensiCountOrderByAggregateInput
    _max?: AbsensiMaxOrderByAggregateInput
    _min?: AbsensiMinOrderByAggregateInput
  }

  export type AbsensiScalarWhereWithAggregatesInput = {
    AND?: AbsensiScalarWhereWithAggregatesInput | AbsensiScalarWhereWithAggregatesInput[]
    OR?: AbsensiScalarWhereWithAggregatesInput[]
    NOT?: AbsensiScalarWhereWithAggregatesInput | AbsensiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Absensi"> | string
    tanggal?: DateTimeWithAggregatesFilter<"Absensi"> | Date | string
    siswaNisn?: StringWithAggregatesFilter<"Absensi"> | string
    namaSnapshot?: StringWithAggregatesFilter<"Absensi"> | string
    kelasSnapshot?: StringWithAggregatesFilter<"Absensi"> | string
    jamDatang?: StringNullableWithAggregatesFilter<"Absensi"> | string | null
    jamPulang?: StringNullableWithAggregatesFilter<"Absensi"> | string | null
    jamSholat?: StringNullableWithAggregatesFilter<"Absensi"> | string | null
    status?: EnumStatusAbsensiWithAggregatesFilter<"Absensi"> | $Enums.StatusAbsensi
    keterangan?: StringNullableWithAggregatesFilter<"Absensi"> | string | null
    catatan?: StringNullableWithAggregatesFilter<"Absensi"> | string | null
    inputBy?: StringNullableWithAggregatesFilter<"Absensi"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Absensi"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Absensi"> | Date | string
  }

  export type HariLiburWhereInput = {
    AND?: HariLiburWhereInput | HariLiburWhereInput[]
    OR?: HariLiburWhereInput[]
    NOT?: HariLiburWhereInput | HariLiburWhereInput[]
    id?: StringFilter<"HariLibur"> | string
    tanggal?: DateTimeFilter<"HariLibur"> | Date | string
    keterangan?: StringFilter<"HariLibur"> | string
    createdAt?: DateTimeFilter<"HariLibur"> | Date | string
  }

  export type HariLiburOrderByWithRelationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    keterangan?: SortOrder
    createdAt?: SortOrder
  }

  export type HariLiburWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    tanggal?: Date | string
    AND?: HariLiburWhereInput | HariLiburWhereInput[]
    OR?: HariLiburWhereInput[]
    NOT?: HariLiburWhereInput | HariLiburWhereInput[]
    keterangan?: StringFilter<"HariLibur"> | string
    createdAt?: DateTimeFilter<"HariLibur"> | Date | string
  }, "id" | "tanggal">

  export type HariLiburOrderByWithAggregationInput = {
    id?: SortOrder
    tanggal?: SortOrder
    keterangan?: SortOrder
    createdAt?: SortOrder
    _count?: HariLiburCountOrderByAggregateInput
    _max?: HariLiburMaxOrderByAggregateInput
    _min?: HariLiburMinOrderByAggregateInput
  }

  export type HariLiburScalarWhereWithAggregatesInput = {
    AND?: HariLiburScalarWhereWithAggregatesInput | HariLiburScalarWhereWithAggregatesInput[]
    OR?: HariLiburScalarWhereWithAggregatesInput[]
    NOT?: HariLiburScalarWhereWithAggregatesInput | HariLiburScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"HariLibur"> | string
    tanggal?: DateTimeWithAggregatesFilter<"HariLibur"> | Date | string
    keterangan?: StringWithAggregatesFilter<"HariLibur"> | string
    createdAt?: DateTimeWithAggregatesFilter<"HariLibur"> | Date | string
  }

  export type AppConfigWhereInput = {
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    key?: StringFilter<"AppConfig"> | string
    value?: StringFilter<"AppConfig"> | string
    updatedAt?: DateTimeFilter<"AppConfig"> | Date | string
  }

  export type AppConfigOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppConfigWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: AppConfigWhereInput | AppConfigWhereInput[]
    OR?: AppConfigWhereInput[]
    NOT?: AppConfigWhereInput | AppConfigWhereInput[]
    value?: StringFilter<"AppConfig"> | string
    updatedAt?: DateTimeFilter<"AppConfig"> | Date | string
  }, "key">

  export type AppConfigOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
    _count?: AppConfigCountOrderByAggregateInput
    _max?: AppConfigMaxOrderByAggregateInput
    _min?: AppConfigMinOrderByAggregateInput
  }

  export type AppConfigScalarWhereWithAggregatesInput = {
    AND?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    OR?: AppConfigScalarWhereWithAggregatesInput[]
    NOT?: AppConfigScalarWhereWithAggregatesInput | AppConfigScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"AppConfig"> | string
    value?: StringWithAggregatesFilter<"AppConfig"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"AppConfig"> | Date | string
  }

  export type JenisPelanggaranWhereInput = {
    AND?: JenisPelanggaranWhereInput | JenisPelanggaranWhereInput[]
    OR?: JenisPelanggaranWhereInput[]
    NOT?: JenisPelanggaranWhereInput | JenisPelanggaranWhereInput[]
    id?: StringFilter<"JenisPelanggaran"> | string
    kode?: StringFilter<"JenisPelanggaran"> | string
    nama?: StringFilter<"JenisPelanggaran"> | string
    kategori?: EnumKategoriPelanggaranFilter<"JenisPelanggaran"> | $Enums.KategoriPelanggaran
    poin?: IntFilter<"JenisPelanggaran"> | number
    deskripsi?: StringNullableFilter<"JenisPelanggaran"> | string | null
    isActive?: BoolFilter<"JenisPelanggaran"> | boolean
    createdAt?: DateTimeFilter<"JenisPelanggaran"> | Date | string
    updatedAt?: DateTimeFilter<"JenisPelanggaran"> | Date | string
    poinList?: PoinSiswaListRelationFilter
    kasusList?: KasusSiswaListRelationFilter
  }

  export type JenisPelanggaranOrderByWithRelationInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    poinList?: PoinSiswaOrderByRelationAggregateInput
    kasusList?: KasusSiswaOrderByRelationAggregateInput
  }

  export type JenisPelanggaranWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kode?: string
    AND?: JenisPelanggaranWhereInput | JenisPelanggaranWhereInput[]
    OR?: JenisPelanggaranWhereInput[]
    NOT?: JenisPelanggaranWhereInput | JenisPelanggaranWhereInput[]
    nama?: StringFilter<"JenisPelanggaran"> | string
    kategori?: EnumKategoriPelanggaranFilter<"JenisPelanggaran"> | $Enums.KategoriPelanggaran
    poin?: IntFilter<"JenisPelanggaran"> | number
    deskripsi?: StringNullableFilter<"JenisPelanggaran"> | string | null
    isActive?: BoolFilter<"JenisPelanggaran"> | boolean
    createdAt?: DateTimeFilter<"JenisPelanggaran"> | Date | string
    updatedAt?: DateTimeFilter<"JenisPelanggaran"> | Date | string
    poinList?: PoinSiswaListRelationFilter
    kasusList?: KasusSiswaListRelationFilter
  }, "id" | "kode">

  export type JenisPelanggaranOrderByWithAggregationInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JenisPelanggaranCountOrderByAggregateInput
    _avg?: JenisPelanggaranAvgOrderByAggregateInput
    _max?: JenisPelanggaranMaxOrderByAggregateInput
    _min?: JenisPelanggaranMinOrderByAggregateInput
    _sum?: JenisPelanggaranSumOrderByAggregateInput
  }

  export type JenisPelanggaranScalarWhereWithAggregatesInput = {
    AND?: JenisPelanggaranScalarWhereWithAggregatesInput | JenisPelanggaranScalarWhereWithAggregatesInput[]
    OR?: JenisPelanggaranScalarWhereWithAggregatesInput[]
    NOT?: JenisPelanggaranScalarWhereWithAggregatesInput | JenisPelanggaranScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JenisPelanggaran"> | string
    kode?: StringWithAggregatesFilter<"JenisPelanggaran"> | string
    nama?: StringWithAggregatesFilter<"JenisPelanggaran"> | string
    kategori?: EnumKategoriPelanggaranWithAggregatesFilter<"JenisPelanggaran"> | $Enums.KategoriPelanggaran
    poin?: IntWithAggregatesFilter<"JenisPelanggaran"> | number
    deskripsi?: StringNullableWithAggregatesFilter<"JenisPelanggaran"> | string | null
    isActive?: BoolWithAggregatesFilter<"JenisPelanggaran"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"JenisPelanggaran"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JenisPelanggaran"> | Date | string
  }

  export type JenisPrestasiWhereInput = {
    AND?: JenisPrestasiWhereInput | JenisPrestasiWhereInput[]
    OR?: JenisPrestasiWhereInput[]
    NOT?: JenisPrestasiWhereInput | JenisPrestasiWhereInput[]
    id?: StringFilter<"JenisPrestasi"> | string
    kode?: StringFilter<"JenisPrestasi"> | string
    nama?: StringFilter<"JenisPrestasi"> | string
    kategori?: EnumKategoriPrestasiFilter<"JenisPrestasi"> | $Enums.KategoriPrestasi
    poin?: IntFilter<"JenisPrestasi"> | number
    deskripsi?: StringNullableFilter<"JenisPrestasi"> | string | null
    isActive?: BoolFilter<"JenisPrestasi"> | boolean
    createdAt?: DateTimeFilter<"JenisPrestasi"> | Date | string
    updatedAt?: DateTimeFilter<"JenisPrestasi"> | Date | string
    poinList?: PoinSiswaListRelationFilter
  }

  export type JenisPrestasiOrderByWithRelationInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    poinList?: PoinSiswaOrderByRelationAggregateInput
  }

  export type JenisPrestasiWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kode?: string
    AND?: JenisPrestasiWhereInput | JenisPrestasiWhereInput[]
    OR?: JenisPrestasiWhereInput[]
    NOT?: JenisPrestasiWhereInput | JenisPrestasiWhereInput[]
    nama?: StringFilter<"JenisPrestasi"> | string
    kategori?: EnumKategoriPrestasiFilter<"JenisPrestasi"> | $Enums.KategoriPrestasi
    poin?: IntFilter<"JenisPrestasi"> | number
    deskripsi?: StringNullableFilter<"JenisPrestasi"> | string | null
    isActive?: BoolFilter<"JenisPrestasi"> | boolean
    createdAt?: DateTimeFilter<"JenisPrestasi"> | Date | string
    updatedAt?: DateTimeFilter<"JenisPrestasi"> | Date | string
    poinList?: PoinSiswaListRelationFilter
  }, "id" | "kode">

  export type JenisPrestasiOrderByWithAggregationInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JenisPrestasiCountOrderByAggregateInput
    _avg?: JenisPrestasiAvgOrderByAggregateInput
    _max?: JenisPrestasiMaxOrderByAggregateInput
    _min?: JenisPrestasiMinOrderByAggregateInput
    _sum?: JenisPrestasiSumOrderByAggregateInput
  }

  export type JenisPrestasiScalarWhereWithAggregatesInput = {
    AND?: JenisPrestasiScalarWhereWithAggregatesInput | JenisPrestasiScalarWhereWithAggregatesInput[]
    OR?: JenisPrestasiScalarWhereWithAggregatesInput[]
    NOT?: JenisPrestasiScalarWhereWithAggregatesInput | JenisPrestasiScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JenisPrestasi"> | string
    kode?: StringWithAggregatesFilter<"JenisPrestasi"> | string
    nama?: StringWithAggregatesFilter<"JenisPrestasi"> | string
    kategori?: EnumKategoriPrestasiWithAggregatesFilter<"JenisPrestasi"> | $Enums.KategoriPrestasi
    poin?: IntWithAggregatesFilter<"JenisPrestasi"> | number
    deskripsi?: StringNullableWithAggregatesFilter<"JenisPrestasi"> | string | null
    isActive?: BoolWithAggregatesFilter<"JenisPrestasi"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"JenisPrestasi"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JenisPrestasi"> | Date | string
  }

  export type JenisKasusWhereInput = {
    AND?: JenisKasusWhereInput | JenisKasusWhereInput[]
    OR?: JenisKasusWhereInput[]
    NOT?: JenisKasusWhereInput | JenisKasusWhereInput[]
    id?: StringFilter<"JenisKasus"> | string
    kode?: StringFilter<"JenisKasus"> | string
    nama?: StringFilter<"JenisKasus"> | string
    deskripsi?: StringNullableFilter<"JenisKasus"> | string | null
    isActive?: BoolFilter<"JenisKasus"> | boolean
    createdAt?: DateTimeFilter<"JenisKasus"> | Date | string
    updatedAt?: DateTimeFilter<"JenisKasus"> | Date | string
    kasusList?: KasusSiswaListRelationFilter
  }

  export type JenisKasusOrderByWithRelationInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    kasusList?: KasusSiswaOrderByRelationAggregateInput
  }

  export type JenisKasusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    kode?: string
    AND?: JenisKasusWhereInput | JenisKasusWhereInput[]
    OR?: JenisKasusWhereInput[]
    NOT?: JenisKasusWhereInput | JenisKasusWhereInput[]
    nama?: StringFilter<"JenisKasus"> | string
    deskripsi?: StringNullableFilter<"JenisKasus"> | string | null
    isActive?: BoolFilter<"JenisKasus"> | boolean
    createdAt?: DateTimeFilter<"JenisKasus"> | Date | string
    updatedAt?: DateTimeFilter<"JenisKasus"> | Date | string
    kasusList?: KasusSiswaListRelationFilter
  }, "id" | "kode">

  export type JenisKasusOrderByWithAggregationInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: JenisKasusCountOrderByAggregateInput
    _max?: JenisKasusMaxOrderByAggregateInput
    _min?: JenisKasusMinOrderByAggregateInput
  }

  export type JenisKasusScalarWhereWithAggregatesInput = {
    AND?: JenisKasusScalarWhereWithAggregatesInput | JenisKasusScalarWhereWithAggregatesInput[]
    OR?: JenisKasusScalarWhereWithAggregatesInput[]
    NOT?: JenisKasusScalarWhereWithAggregatesInput | JenisKasusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JenisKasus"> | string
    kode?: StringWithAggregatesFilter<"JenisKasus"> | string
    nama?: StringWithAggregatesFilter<"JenisKasus"> | string
    deskripsi?: StringNullableWithAggregatesFilter<"JenisKasus"> | string | null
    isActive?: BoolWithAggregatesFilter<"JenisKasus"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"JenisKasus"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"JenisKasus"> | Date | string
  }

  export type PoinSiswaWhereInput = {
    AND?: PoinSiswaWhereInput | PoinSiswaWhereInput[]
    OR?: PoinSiswaWhereInput[]
    NOT?: PoinSiswaWhereInput | PoinSiswaWhereInput[]
    id?: StringFilter<"PoinSiswa"> | string
    siswaNisn?: StringFilter<"PoinSiswa"> | string
    tipe?: EnumTipePoinFilter<"PoinSiswa"> | $Enums.TipePoin
    jenisPrestasiId?: StringNullableFilter<"PoinSiswa"> | string | null
    jenisPelanggaranId?: StringNullableFilter<"PoinSiswa"> | string | null
    poin?: IntFilter<"PoinSiswa"> | number
    deskripsi?: StringNullableFilter<"PoinSiswa"> | string | null
    tanggal?: DateTimeFilter<"PoinSiswa"> | Date | string
    tingkat?: StringNullableFilter<"PoinSiswa"> | string | null
    inputBy?: StringNullableFilter<"PoinSiswa"> | string | null
    dokumenUrl?: StringNullableFilter<"PoinSiswa"> | string | null
    createdAt?: DateTimeFilter<"PoinSiswa"> | Date | string
    updatedAt?: DateTimeFilter<"PoinSiswa"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
    jenisPrestasi?: XOR<JenisPrestasiNullableRelationFilter, JenisPrestasiWhereInput> | null
    jenisPelanggaran?: XOR<JenisPelanggaranNullableRelationFilter, JenisPelanggaranWhereInput> | null
  }

  export type PoinSiswaOrderByWithRelationInput = {
    id?: SortOrder
    siswaNisn?: SortOrder
    tipe?: SortOrder
    jenisPrestasiId?: SortOrderInput | SortOrder
    jenisPelanggaranId?: SortOrderInput | SortOrder
    poin?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tanggal?: SortOrder
    tingkat?: SortOrderInput | SortOrder
    inputBy?: SortOrderInput | SortOrder
    dokumenUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
    jenisPrestasi?: JenisPrestasiOrderByWithRelationInput
    jenisPelanggaran?: JenisPelanggaranOrderByWithRelationInput
  }

  export type PoinSiswaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PoinSiswaWhereInput | PoinSiswaWhereInput[]
    OR?: PoinSiswaWhereInput[]
    NOT?: PoinSiswaWhereInput | PoinSiswaWhereInput[]
    siswaNisn?: StringFilter<"PoinSiswa"> | string
    tipe?: EnumTipePoinFilter<"PoinSiswa"> | $Enums.TipePoin
    jenisPrestasiId?: StringNullableFilter<"PoinSiswa"> | string | null
    jenisPelanggaranId?: StringNullableFilter<"PoinSiswa"> | string | null
    poin?: IntFilter<"PoinSiswa"> | number
    deskripsi?: StringNullableFilter<"PoinSiswa"> | string | null
    tanggal?: DateTimeFilter<"PoinSiswa"> | Date | string
    tingkat?: StringNullableFilter<"PoinSiswa"> | string | null
    inputBy?: StringNullableFilter<"PoinSiswa"> | string | null
    dokumenUrl?: StringNullableFilter<"PoinSiswa"> | string | null
    createdAt?: DateTimeFilter<"PoinSiswa"> | Date | string
    updatedAt?: DateTimeFilter<"PoinSiswa"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
    jenisPrestasi?: XOR<JenisPrestasiNullableRelationFilter, JenisPrestasiWhereInput> | null
    jenisPelanggaran?: XOR<JenisPelanggaranNullableRelationFilter, JenisPelanggaranWhereInput> | null
  }, "id">

  export type PoinSiswaOrderByWithAggregationInput = {
    id?: SortOrder
    siswaNisn?: SortOrder
    tipe?: SortOrder
    jenisPrestasiId?: SortOrderInput | SortOrder
    jenisPelanggaranId?: SortOrderInput | SortOrder
    poin?: SortOrder
    deskripsi?: SortOrderInput | SortOrder
    tanggal?: SortOrder
    tingkat?: SortOrderInput | SortOrder
    inputBy?: SortOrderInput | SortOrder
    dokumenUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PoinSiswaCountOrderByAggregateInput
    _avg?: PoinSiswaAvgOrderByAggregateInput
    _max?: PoinSiswaMaxOrderByAggregateInput
    _min?: PoinSiswaMinOrderByAggregateInput
    _sum?: PoinSiswaSumOrderByAggregateInput
  }

  export type PoinSiswaScalarWhereWithAggregatesInput = {
    AND?: PoinSiswaScalarWhereWithAggregatesInput | PoinSiswaScalarWhereWithAggregatesInput[]
    OR?: PoinSiswaScalarWhereWithAggregatesInput[]
    NOT?: PoinSiswaScalarWhereWithAggregatesInput | PoinSiswaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PoinSiswa"> | string
    siswaNisn?: StringWithAggregatesFilter<"PoinSiswa"> | string
    tipe?: EnumTipePoinWithAggregatesFilter<"PoinSiswa"> | $Enums.TipePoin
    jenisPrestasiId?: StringNullableWithAggregatesFilter<"PoinSiswa"> | string | null
    jenisPelanggaranId?: StringNullableWithAggregatesFilter<"PoinSiswa"> | string | null
    poin?: IntWithAggregatesFilter<"PoinSiswa"> | number
    deskripsi?: StringNullableWithAggregatesFilter<"PoinSiswa"> | string | null
    tanggal?: DateTimeWithAggregatesFilter<"PoinSiswa"> | Date | string
    tingkat?: StringNullableWithAggregatesFilter<"PoinSiswa"> | string | null
    inputBy?: StringNullableWithAggregatesFilter<"PoinSiswa"> | string | null
    dokumenUrl?: StringNullableWithAggregatesFilter<"PoinSiswa"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PoinSiswa"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PoinSiswa"> | Date | string
  }

  export type KasusSiswaWhereInput = {
    AND?: KasusSiswaWhereInput | KasusSiswaWhereInput[]
    OR?: KasusSiswaWhereInput[]
    NOT?: KasusSiswaWhereInput | KasusSiswaWhereInput[]
    id?: StringFilter<"KasusSiswa"> | string
    nomor?: StringFilter<"KasusSiswa"> | string
    siswaNisn?: StringFilter<"KasusSiswa"> | string
    jenisKasusId?: StringNullableFilter<"KasusSiswa"> | string | null
    jenisPelanggaranId?: StringNullableFilter<"KasusSiswa"> | string | null
    tanggal?: DateTimeFilter<"KasusSiswa"> | Date | string
    deskripsi?: StringFilter<"KasusSiswa"> | string
    status?: EnumStatusKasusFilter<"KasusSiswa"> | $Enums.StatusKasus
    penanganan?: StringNullableFilter<"KasusSiswa"> | string | null
    catatan?: StringNullableFilter<"KasusSiswa"> | string | null
    inputBy?: StringNullableFilter<"KasusSiswa"> | string | null
    dokumenList?: JsonNullableFilter<"KasusSiswa">
    createdAt?: DateTimeFilter<"KasusSiswa"> | Date | string
    updatedAt?: DateTimeFilter<"KasusSiswa"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
    jenisKasus?: XOR<JenisKasusNullableRelationFilter, JenisKasusWhereInput> | null
    jenisPelanggaran?: XOR<JenisPelanggaranNullableRelationFilter, JenisPelanggaranWhereInput> | null
    laporanList?: LaporanKasusListRelationFilter
  }

  export type KasusSiswaOrderByWithRelationInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    jenisKasusId?: SortOrderInput | SortOrder
    jenisPelanggaranId?: SortOrderInput | SortOrder
    tanggal?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    penanganan?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    inputBy?: SortOrderInput | SortOrder
    dokumenList?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
    jenisKasus?: JenisKasusOrderByWithRelationInput
    jenisPelanggaran?: JenisPelanggaranOrderByWithRelationInput
    laporanList?: LaporanKasusOrderByRelationAggregateInput
  }

  export type KasusSiswaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nomor?: string
    AND?: KasusSiswaWhereInput | KasusSiswaWhereInput[]
    OR?: KasusSiswaWhereInput[]
    NOT?: KasusSiswaWhereInput | KasusSiswaWhereInput[]
    siswaNisn?: StringFilter<"KasusSiswa"> | string
    jenisKasusId?: StringNullableFilter<"KasusSiswa"> | string | null
    jenisPelanggaranId?: StringNullableFilter<"KasusSiswa"> | string | null
    tanggal?: DateTimeFilter<"KasusSiswa"> | Date | string
    deskripsi?: StringFilter<"KasusSiswa"> | string
    status?: EnumStatusKasusFilter<"KasusSiswa"> | $Enums.StatusKasus
    penanganan?: StringNullableFilter<"KasusSiswa"> | string | null
    catatan?: StringNullableFilter<"KasusSiswa"> | string | null
    inputBy?: StringNullableFilter<"KasusSiswa"> | string | null
    dokumenList?: JsonNullableFilter<"KasusSiswa">
    createdAt?: DateTimeFilter<"KasusSiswa"> | Date | string
    updatedAt?: DateTimeFilter<"KasusSiswa"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
    jenisKasus?: XOR<JenisKasusNullableRelationFilter, JenisKasusWhereInput> | null
    jenisPelanggaran?: XOR<JenisPelanggaranNullableRelationFilter, JenisPelanggaranWhereInput> | null
    laporanList?: LaporanKasusListRelationFilter
  }, "id" | "nomor">

  export type KasusSiswaOrderByWithAggregationInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    jenisKasusId?: SortOrderInput | SortOrder
    jenisPelanggaranId?: SortOrderInput | SortOrder
    tanggal?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    penanganan?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    inputBy?: SortOrderInput | SortOrder
    dokumenList?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KasusSiswaCountOrderByAggregateInput
    _max?: KasusSiswaMaxOrderByAggregateInput
    _min?: KasusSiswaMinOrderByAggregateInput
  }

  export type KasusSiswaScalarWhereWithAggregatesInput = {
    AND?: KasusSiswaScalarWhereWithAggregatesInput | KasusSiswaScalarWhereWithAggregatesInput[]
    OR?: KasusSiswaScalarWhereWithAggregatesInput[]
    NOT?: KasusSiswaScalarWhereWithAggregatesInput | KasusSiswaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KasusSiswa"> | string
    nomor?: StringWithAggregatesFilter<"KasusSiswa"> | string
    siswaNisn?: StringWithAggregatesFilter<"KasusSiswa"> | string
    jenisKasusId?: StringNullableWithAggregatesFilter<"KasusSiswa"> | string | null
    jenisPelanggaranId?: StringNullableWithAggregatesFilter<"KasusSiswa"> | string | null
    tanggal?: DateTimeWithAggregatesFilter<"KasusSiswa"> | Date | string
    deskripsi?: StringWithAggregatesFilter<"KasusSiswa"> | string
    status?: EnumStatusKasusWithAggregatesFilter<"KasusSiswa"> | $Enums.StatusKasus
    penanganan?: StringNullableWithAggregatesFilter<"KasusSiswa"> | string | null
    catatan?: StringNullableWithAggregatesFilter<"KasusSiswa"> | string | null
    inputBy?: StringNullableWithAggregatesFilter<"KasusSiswa"> | string | null
    dokumenList?: JsonNullableWithAggregatesFilter<"KasusSiswa">
    createdAt?: DateTimeWithAggregatesFilter<"KasusSiswa"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KasusSiswa"> | Date | string
  }

  export type LaporanKasusWhereInput = {
    AND?: LaporanKasusWhereInput | LaporanKasusWhereInput[]
    OR?: LaporanKasusWhereInput[]
    NOT?: LaporanKasusWhereInput | LaporanKasusWhereInput[]
    id?: StringFilter<"LaporanKasus"> | string
    kasusId?: StringFilter<"LaporanKasus"> | string
    tanggal?: DateTimeFilter<"LaporanKasus"> | Date | string
    catatan?: StringFilter<"LaporanKasus"> | string
    status?: EnumStatusKasusFilter<"LaporanKasus"> | $Enums.StatusKasus
    inputBy?: StringNullableFilter<"LaporanKasus"> | string | null
    createdAt?: DateTimeFilter<"LaporanKasus"> | Date | string
    kasus?: XOR<KasusSiswaRelationFilter, KasusSiswaWhereInput>
  }

  export type LaporanKasusOrderByWithRelationInput = {
    id?: SortOrder
    kasusId?: SortOrder
    tanggal?: SortOrder
    catatan?: SortOrder
    status?: SortOrder
    inputBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    kasus?: KasusSiswaOrderByWithRelationInput
  }

  export type LaporanKasusWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LaporanKasusWhereInput | LaporanKasusWhereInput[]
    OR?: LaporanKasusWhereInput[]
    NOT?: LaporanKasusWhereInput | LaporanKasusWhereInput[]
    kasusId?: StringFilter<"LaporanKasus"> | string
    tanggal?: DateTimeFilter<"LaporanKasus"> | Date | string
    catatan?: StringFilter<"LaporanKasus"> | string
    status?: EnumStatusKasusFilter<"LaporanKasus"> | $Enums.StatusKasus
    inputBy?: StringNullableFilter<"LaporanKasus"> | string | null
    createdAt?: DateTimeFilter<"LaporanKasus"> | Date | string
    kasus?: XOR<KasusSiswaRelationFilter, KasusSiswaWhereInput>
  }, "id">

  export type LaporanKasusOrderByWithAggregationInput = {
    id?: SortOrder
    kasusId?: SortOrder
    tanggal?: SortOrder
    catatan?: SortOrder
    status?: SortOrder
    inputBy?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: LaporanKasusCountOrderByAggregateInput
    _max?: LaporanKasusMaxOrderByAggregateInput
    _min?: LaporanKasusMinOrderByAggregateInput
  }

  export type LaporanKasusScalarWhereWithAggregatesInput = {
    AND?: LaporanKasusScalarWhereWithAggregatesInput | LaporanKasusScalarWhereWithAggregatesInput[]
    OR?: LaporanKasusScalarWhereWithAggregatesInput[]
    NOT?: LaporanKasusScalarWhereWithAggregatesInput | LaporanKasusScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LaporanKasus"> | string
    kasusId?: StringWithAggregatesFilter<"LaporanKasus"> | string
    tanggal?: DateTimeWithAggregatesFilter<"LaporanKasus"> | Date | string
    catatan?: StringWithAggregatesFilter<"LaporanKasus"> | string
    status?: EnumStatusKasusWithAggregatesFilter<"LaporanKasus"> | $Enums.StatusKasus
    inputBy?: StringNullableWithAggregatesFilter<"LaporanKasus"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"LaporanKasus"> | Date | string
  }

  export type KunjunganRumahWhereInput = {
    AND?: KunjunganRumahWhereInput | KunjunganRumahWhereInput[]
    OR?: KunjunganRumahWhereInput[]
    NOT?: KunjunganRumahWhereInput | KunjunganRumahWhereInput[]
    id?: StringFilter<"KunjunganRumah"> | string
    nomor?: StringFilter<"KunjunganRumah"> | string
    siswaNisn?: StringFilter<"KunjunganRumah"> | string
    tanggal?: DateTimeFilter<"KunjunganRumah"> | Date | string
    tujuan?: StringFilter<"KunjunganRumah"> | string
    petugasBk?: StringNullableFilter<"KunjunganRumah"> | string | null
    status?: EnumStatusKunjunganFilter<"KunjunganRumah"> | $Enums.StatusKunjungan
    hasilKunjungan?: StringNullableFilter<"KunjunganRumah"> | string | null
    catatan?: StringNullableFilter<"KunjunganRumah"> | string | null
    dokumenList?: JsonNullableFilter<"KunjunganRumah">
    createdAt?: DateTimeFilter<"KunjunganRumah"> | Date | string
    updatedAt?: DateTimeFilter<"KunjunganRumah"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
  }

  export type KunjunganRumahOrderByWithRelationInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    tanggal?: SortOrder
    tujuan?: SortOrder
    petugasBk?: SortOrderInput | SortOrder
    status?: SortOrder
    hasilKunjungan?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    dokumenList?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    siswa?: SiswaOrderByWithRelationInput
  }

  export type KunjunganRumahWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nomor?: string
    AND?: KunjunganRumahWhereInput | KunjunganRumahWhereInput[]
    OR?: KunjunganRumahWhereInput[]
    NOT?: KunjunganRumahWhereInput | KunjunganRumahWhereInput[]
    siswaNisn?: StringFilter<"KunjunganRumah"> | string
    tanggal?: DateTimeFilter<"KunjunganRumah"> | Date | string
    tujuan?: StringFilter<"KunjunganRumah"> | string
    petugasBk?: StringNullableFilter<"KunjunganRumah"> | string | null
    status?: EnumStatusKunjunganFilter<"KunjunganRumah"> | $Enums.StatusKunjungan
    hasilKunjungan?: StringNullableFilter<"KunjunganRumah"> | string | null
    catatan?: StringNullableFilter<"KunjunganRumah"> | string | null
    dokumenList?: JsonNullableFilter<"KunjunganRumah">
    createdAt?: DateTimeFilter<"KunjunganRumah"> | Date | string
    updatedAt?: DateTimeFilter<"KunjunganRumah"> | Date | string
    siswa?: XOR<SiswaRelationFilter, SiswaWhereInput>
  }, "id" | "nomor">

  export type KunjunganRumahOrderByWithAggregationInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    tanggal?: SortOrder
    tujuan?: SortOrder
    petugasBk?: SortOrderInput | SortOrder
    status?: SortOrder
    hasilKunjungan?: SortOrderInput | SortOrder
    catatan?: SortOrderInput | SortOrder
    dokumenList?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: KunjunganRumahCountOrderByAggregateInput
    _max?: KunjunganRumahMaxOrderByAggregateInput
    _min?: KunjunganRumahMinOrderByAggregateInput
  }

  export type KunjunganRumahScalarWhereWithAggregatesInput = {
    AND?: KunjunganRumahScalarWhereWithAggregatesInput | KunjunganRumahScalarWhereWithAggregatesInput[]
    OR?: KunjunganRumahScalarWhereWithAggregatesInput[]
    NOT?: KunjunganRumahScalarWhereWithAggregatesInput | KunjunganRumahScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"KunjunganRumah"> | string
    nomor?: StringWithAggregatesFilter<"KunjunganRumah"> | string
    siswaNisn?: StringWithAggregatesFilter<"KunjunganRumah"> | string
    tanggal?: DateTimeWithAggregatesFilter<"KunjunganRumah"> | Date | string
    tujuan?: StringWithAggregatesFilter<"KunjunganRumah"> | string
    petugasBk?: StringNullableWithAggregatesFilter<"KunjunganRumah"> | string | null
    status?: EnumStatusKunjunganWithAggregatesFilter<"KunjunganRumah"> | $Enums.StatusKunjungan
    hasilKunjungan?: StringNullableWithAggregatesFilter<"KunjunganRumah"> | string | null
    catatan?: StringNullableWithAggregatesFilter<"KunjunganRumah"> | string | null
    dokumenList?: JsonNullableWithAggregatesFilter<"KunjunganRumah">
    createdAt?: DateTimeWithAggregatesFilter<"KunjunganRumah"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"KunjunganRumah"> | Date | string
  }

  export type KelasWhereInput = {
    AND?: KelasWhereInput | KelasWhereInput[]
    OR?: KelasWhereInput[]
    NOT?: KelasWhereInput | KelasWhereInput[]
    id?: StringFilter<"Kelas"> | string
    nama?: StringFilter<"Kelas"> | string
  }

  export type KelasOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type KelasWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nama?: string
    AND?: KelasWhereInput | KelasWhereInput[]
    OR?: KelasWhereInput[]
    NOT?: KelasWhereInput | KelasWhereInput[]
  }, "id" | "nama">

  export type KelasOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    _count?: KelasCountOrderByAggregateInput
    _max?: KelasMaxOrderByAggregateInput
    _min?: KelasMinOrderByAggregateInput
  }

  export type KelasScalarWhereWithAggregatesInput = {
    AND?: KelasScalarWhereWithAggregatesInput | KelasScalarWhereWithAggregatesInput[]
    OR?: KelasScalarWhereWithAggregatesInput[]
    NOT?: KelasScalarWhereWithAggregatesInput | KelasScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Kelas"> | string
    nama?: StringWithAggregatesFilter<"Kelas"> | string
  }

  export type MapelWhereInput = {
    AND?: MapelWhereInput | MapelWhereInput[]
    OR?: MapelWhereInput[]
    NOT?: MapelWhereInput | MapelWhereInput[]
    id?: StringFilter<"Mapel"> | string
    nama?: StringFilter<"Mapel"> | string
  }

  export type MapelOrderByWithRelationInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type MapelWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    nama?: string
    AND?: MapelWhereInput | MapelWhereInput[]
    OR?: MapelWhereInput[]
    NOT?: MapelWhereInput | MapelWhereInput[]
  }, "id" | "nama">

  export type MapelOrderByWithAggregationInput = {
    id?: SortOrder
    nama?: SortOrder
    _count?: MapelCountOrderByAggregateInput
    _max?: MapelMaxOrderByAggregateInput
    _min?: MapelMinOrderByAggregateInput
  }

  export type MapelScalarWhereWithAggregatesInput = {
    AND?: MapelScalarWhereWithAggregatesInput | MapelScalarWhereWithAggregatesInput[]
    OR?: MapelScalarWhereWithAggregatesInput[]
    NOT?: MapelScalarWhereWithAggregatesInput | MapelScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Mapel"> | string
    nama?: StringWithAggregatesFilter<"Mapel"> | string
  }

  export type UserCreateInput = {
    id?: string
    userId: string
    nama: string
    password: string
    role: $Enums.UserRole
    kelas?: string | null
    isActive?: boolean
    displayPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    userId: string
    nama: string
    password: string
    role: $Enums.UserRole
    kelas?: string | null
    isActive?: boolean
    displayPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    kelas?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    displayPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    kelas?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    displayPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    userId: string
    nama: string
    password: string
    role: $Enums.UserRole
    kelas?: string | null
    isActive?: boolean
    displayPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    kelas?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    displayPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    kelas?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    displayPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateManyInput = {
    id?: string
    userId: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaCreateInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiCreateNestedManyWithoutSiswaInput
    poinList?: PoinSiswaCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiUncheckedCreateNestedManyWithoutSiswaInput
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUpdateManyWithoutSiswaNestedInput
    poinList?: PoinSiswaUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUncheckedUpdateManyWithoutSiswaNestedInput
    poinList?: PoinSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaCreateManyInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SiswaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiCreateInput = {
    id?: string
    tanggal: Date | string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang?: string | null
    jamPulang?: string | null
    jamSholat?: string | null
    status?: $Enums.StatusAbsensi
    keterangan?: string | null
    catatan?: string | null
    inputBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutAbsensiListInput
  }

  export type AbsensiUncheckedCreateInput = {
    id?: string
    tanggal: Date | string
    siswaNisn: string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang?: string | null
    jamPulang?: string | null
    jamSholat?: string | null
    status?: $Enums.StatusAbsensi
    keterangan?: string | null
    catatan?: string | null
    inputBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsensiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutAbsensiListNestedInput
  }

  export type AbsensiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiCreateManyInput = {
    id?: string
    tanggal: Date | string
    siswaNisn: string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang?: string | null
    jamPulang?: string | null
    jamSholat?: string | null
    status?: $Enums.StatusAbsensi
    keterangan?: string | null
    catatan?: string | null
    inputBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsensiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HariLiburCreateInput = {
    id?: string
    tanggal: Date | string
    keterangan: string
    createdAt?: Date | string
  }

  export type HariLiburUncheckedCreateInput = {
    id?: string
    tanggal: Date | string
    keterangan: string
    createdAt?: Date | string
  }

  export type HariLiburUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    keterangan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HariLiburUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    keterangan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HariLiburCreateManyInput = {
    id?: string
    tanggal: Date | string
    keterangan: string
    createdAt?: Date | string
  }

  export type HariLiburUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    keterangan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HariLiburUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    keterangan?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppConfigUncheckedCreateInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppConfigUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigCreateManyInput = {
    key: string
    value: string
    updatedAt?: Date | string
  }

  export type AppConfigUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppConfigUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPelanggaranCreateInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaCreateNestedManyWithoutJenisPelanggaranInput
    kasusList?: KasusSiswaCreateNestedManyWithoutJenisPelanggaranInput
  }

  export type JenisPelanggaranUncheckedCreateInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutJenisPelanggaranInput
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutJenisPelanggaranInput
  }

  export type JenisPelanggaranUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUpdateManyWithoutJenisPelanggaranNestedInput
    kasusList?: KasusSiswaUpdateManyWithoutJenisPelanggaranNestedInput
  }

  export type JenisPelanggaranUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUncheckedUpdateManyWithoutJenisPelanggaranNestedInput
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutJenisPelanggaranNestedInput
  }

  export type JenisPelanggaranCreateManyInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisPelanggaranUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPelanggaranUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPrestasiCreateInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPrestasi
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaCreateNestedManyWithoutJenisPrestasiInput
  }

  export type JenisPrestasiUncheckedCreateInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPrestasi
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutJenisPrestasiInput
  }

  export type JenisPrestasiUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPrestasiFieldUpdateOperationsInput | $Enums.KategoriPrestasi
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUpdateManyWithoutJenisPrestasiNestedInput
  }

  export type JenisPrestasiUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPrestasiFieldUpdateOperationsInput | $Enums.KategoriPrestasi
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUncheckedUpdateManyWithoutJenisPrestasiNestedInput
  }

  export type JenisPrestasiCreateManyInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPrestasi
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisPrestasiUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPrestasiFieldUpdateOperationsInput | $Enums.KategoriPrestasi
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPrestasiUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPrestasiFieldUpdateOperationsInput | $Enums.KategoriPrestasi
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisKasusCreateInput = {
    id?: string
    kode: string
    nama: string
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    kasusList?: KasusSiswaCreateNestedManyWithoutJenisKasusInput
  }

  export type JenisKasusUncheckedCreateInput = {
    id?: string
    kode: string
    nama: string
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutJenisKasusInput
  }

  export type JenisKasusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kasusList?: KasusSiswaUpdateManyWithoutJenisKasusNestedInput
  }

  export type JenisKasusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutJenisKasusNestedInput
  }

  export type JenisKasusCreateManyInput = {
    id?: string
    kode: string
    nama: string
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisKasusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisKasusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaCreateInput = {
    id?: string
    tipe: $Enums.TipePoin
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutPoinListInput
    jenisPrestasi?: JenisPrestasiCreateNestedOneWithoutPoinListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutPoinListInput
  }

  export type PoinSiswaUncheckedCreateInput = {
    id?: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPrestasiId?: string | null
    jenisPelanggaranId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutPoinListNestedInput
    jenisPrestasi?: JenisPrestasiUpdateOneWithoutPoinListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutPoinListNestedInput
  }

  export type PoinSiswaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPrestasiId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaCreateManyInput = {
    id?: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPrestasiId?: string | null
    jenisPelanggaranId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPrestasiId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KasusSiswaCreateInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutKasusListInput
    jenisKasus?: JenisKasusCreateNestedOneWithoutKasusListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutKasusListInput
    laporanList?: LaporanKasusCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaUncheckedCreateInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisKasusId?: string | null
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    laporanList?: LaporanKasusUncheckedCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutKasusListNestedInput
    jenisKasus?: JenisKasusUpdateOneWithoutKasusListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutKasusListNestedInput
    laporanList?: LaporanKasusUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    laporanList?: LaporanKasusUncheckedUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaCreateManyInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisKasusId?: string | null
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KasusSiswaUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KasusSiswaUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaporanKasusCreateInput = {
    id?: string
    tanggal: Date | string
    catatan: string
    status: $Enums.StatusKasus
    inputBy?: string | null
    createdAt?: Date | string
    kasus: KasusSiswaCreateNestedOneWithoutLaporanListInput
  }

  export type LaporanKasusUncheckedCreateInput = {
    id?: string
    kasusId: string
    tanggal: Date | string
    catatan: string
    status: $Enums.StatusKasus
    inputBy?: string | null
    createdAt?: Date | string
  }

  export type LaporanKasusUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kasus?: KasusSiswaUpdateOneRequiredWithoutLaporanListNestedInput
  }

  export type LaporanKasusUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    kasusId?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaporanKasusCreateManyInput = {
    id?: string
    kasusId: string
    tanggal: Date | string
    catatan: string
    status: $Enums.StatusKasus
    inputBy?: string | null
    createdAt?: Date | string
  }

  export type LaporanKasusUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaporanKasusUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    kasusId?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KunjunganRumahCreateInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    tujuan: string
    petugasBk?: string | null
    status?: $Enums.StatusKunjungan
    hasilKunjungan?: string | null
    catatan?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutKunjunganListInput
  }

  export type KunjunganRumahUncheckedCreateInput = {
    id?: string
    nomor: string
    siswaNisn: string
    tanggal: Date | string
    tujuan: string
    petugasBk?: string | null
    status?: $Enums.StatusKunjungan
    hasilKunjungan?: string | null
    catatan?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KunjunganRumahUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutKunjunganListNestedInput
  }

  export type KunjunganRumahUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KunjunganRumahCreateManyInput = {
    id?: string
    nomor: string
    siswaNisn: string
    tanggal: Date | string
    tujuan: string
    petugasBk?: string | null
    status?: $Enums.StatusKunjungan
    hasilKunjungan?: string | null
    catatan?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KunjunganRumahUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KunjunganRumahUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KelasCreateInput = {
    id?: string
    nama: string
  }

  export type KelasUncheckedCreateInput = {
    id?: string
    nama: string
  }

  export type KelasUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type KelasUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type KelasCreateManyInput = {
    id?: string
    nama: string
  }

  export type KelasUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type KelasUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type MapelCreateInput = {
    id?: string
    nama: string
  }

  export type MapelUncheckedCreateInput = {
    id?: string
    nama: string
  }

  export type MapelUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type MapelUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type MapelCreateManyInput = {
    id?: string
    nama: string
  }

  export type MapelUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type MapelUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    role?: SortOrder
    kelas?: SortOrder
    isActive?: SortOrder
    displayPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    role?: SortOrder
    kelas?: SortOrder
    isActive?: SortOrder
    displayPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    nama?: SortOrder
    password?: SortOrder
    role?: SortOrder
    kelas?: SortOrder
    isActive?: SortOrder
    displayPassword?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    token?: SortOrder
    expiresAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AbsensiListRelationFilter = {
    every?: AbsensiWhereInput
    some?: AbsensiWhereInput
    none?: AbsensiWhereInput
  }

  export type PoinSiswaListRelationFilter = {
    every?: PoinSiswaWhereInput
    some?: PoinSiswaWhereInput
    none?: PoinSiswaWhereInput
  }

  export type KasusSiswaListRelationFilter = {
    every?: KasusSiswaWhereInput
    some?: KasusSiswaWhereInput
    none?: KasusSiswaWhereInput
  }

  export type KunjunganRumahListRelationFilter = {
    every?: KunjunganRumahWhereInput
    some?: KunjunganRumahWhereInput
    none?: KunjunganRumahWhereInput
  }

  export type AbsensiOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PoinSiswaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KasusSiswaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KunjunganRumahOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SiswaCountOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    nama?: SortOrder
    jenisKelamin?: SortOrder
    tanggalLahir?: SortOrder
    agama?: SortOrder
    namaAyah?: SortOrder
    namaIbu?: SortOrder
    noHp?: SortOrder
    kelas?: SortOrder
    alamat?: SortOrder
    fotoUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiswaMaxOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    nama?: SortOrder
    jenisKelamin?: SortOrder
    tanggalLahir?: SortOrder
    agama?: SortOrder
    namaAyah?: SortOrder
    namaIbu?: SortOrder
    noHp?: SortOrder
    kelas?: SortOrder
    alamat?: SortOrder
    fotoUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SiswaMinOrderByAggregateInput = {
    id?: SortOrder
    nisn?: SortOrder
    nama?: SortOrder
    jenisKelamin?: SortOrder
    tanggalLahir?: SortOrder
    agama?: SortOrder
    namaAyah?: SortOrder
    namaIbu?: SortOrder
    noHp?: SortOrder
    kelas?: SortOrder
    alamat?: SortOrder
    fotoUrl?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumStatusAbsensiFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAbsensi | EnumStatusAbsensiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAbsensiFilter<$PrismaModel> | $Enums.StatusAbsensi
  }

  export type SiswaRelationFilter = {
    is?: SiswaWhereInput
    isNot?: SiswaWhereInput
  }

  export type AbsensiTanggalSiswaNisnCompoundUniqueInput = {
    tanggal: Date | string
    siswaNisn: string
  }

  export type AbsensiCountOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    siswaNisn?: SortOrder
    namaSnapshot?: SortOrder
    kelasSnapshot?: SortOrder
    jamDatang?: SortOrder
    jamPulang?: SortOrder
    jamSholat?: SortOrder
    status?: SortOrder
    keterangan?: SortOrder
    catatan?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AbsensiMaxOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    siswaNisn?: SortOrder
    namaSnapshot?: SortOrder
    kelasSnapshot?: SortOrder
    jamDatang?: SortOrder
    jamPulang?: SortOrder
    jamSholat?: SortOrder
    status?: SortOrder
    keterangan?: SortOrder
    catatan?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AbsensiMinOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    siswaNisn?: SortOrder
    namaSnapshot?: SortOrder
    kelasSnapshot?: SortOrder
    jamDatang?: SortOrder
    jamPulang?: SortOrder
    jamSholat?: SortOrder
    status?: SortOrder
    keterangan?: SortOrder
    catatan?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatusAbsensiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAbsensi | EnumStatusAbsensiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAbsensiWithAggregatesFilter<$PrismaModel> | $Enums.StatusAbsensi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusAbsensiFilter<$PrismaModel>
    _max?: NestedEnumStatusAbsensiFilter<$PrismaModel>
  }

  export type HariLiburCountOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    keterangan?: SortOrder
    createdAt?: SortOrder
  }

  export type HariLiburMaxOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    keterangan?: SortOrder
    createdAt?: SortOrder
  }

  export type HariLiburMinOrderByAggregateInput = {
    id?: SortOrder
    tanggal?: SortOrder
    keterangan?: SortOrder
    createdAt?: SortOrder
  }

  export type AppConfigCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppConfigMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type AppConfigMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumKategoriPelanggaranFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPelanggaran | EnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPelanggaranFilter<$PrismaModel> | $Enums.KategoriPelanggaran
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type JenisPelanggaranCountOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisPelanggaranAvgOrderByAggregateInput = {
    poin?: SortOrder
  }

  export type JenisPelanggaranMaxOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisPelanggaranMinOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisPelanggaranSumOrderByAggregateInput = {
    poin?: SortOrder
  }

  export type EnumKategoriPelanggaranWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPelanggaran | EnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPelanggaranWithAggregatesFilter<$PrismaModel> | $Enums.KategoriPelanggaran
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKategoriPelanggaranFilter<$PrismaModel>
    _max?: NestedEnumKategoriPelanggaranFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumKategoriPrestasiFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPrestasi | EnumKategoriPrestasiFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPrestasiFilter<$PrismaModel> | $Enums.KategoriPrestasi
  }

  export type JenisPrestasiCountOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisPrestasiAvgOrderByAggregateInput = {
    poin?: SortOrder
  }

  export type JenisPrestasiMaxOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisPrestasiMinOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    kategori?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisPrestasiSumOrderByAggregateInput = {
    poin?: SortOrder
  }

  export type EnumKategoriPrestasiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPrestasi | EnumKategoriPrestasiFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPrestasiWithAggregatesFilter<$PrismaModel> | $Enums.KategoriPrestasi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKategoriPrestasiFilter<$PrismaModel>
    _max?: NestedEnumKategoriPrestasiFilter<$PrismaModel>
  }

  export type JenisKasusCountOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisKasusMaxOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type JenisKasusMinOrderByAggregateInput = {
    id?: SortOrder
    kode?: SortOrder
    nama?: SortOrder
    deskripsi?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTipePoinFilter<$PrismaModel = never> = {
    equals?: $Enums.TipePoin | EnumTipePoinFieldRefInput<$PrismaModel>
    in?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    not?: NestedEnumTipePoinFilter<$PrismaModel> | $Enums.TipePoin
  }

  export type JenisPrestasiNullableRelationFilter = {
    is?: JenisPrestasiWhereInput | null
    isNot?: JenisPrestasiWhereInput | null
  }

  export type JenisPelanggaranNullableRelationFilter = {
    is?: JenisPelanggaranWhereInput | null
    isNot?: JenisPelanggaranWhereInput | null
  }

  export type PoinSiswaCountOrderByAggregateInput = {
    id?: SortOrder
    siswaNisn?: SortOrder
    tipe?: SortOrder
    jenisPrestasiId?: SortOrder
    jenisPelanggaranId?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    tingkat?: SortOrder
    inputBy?: SortOrder
    dokumenUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoinSiswaAvgOrderByAggregateInput = {
    poin?: SortOrder
  }

  export type PoinSiswaMaxOrderByAggregateInput = {
    id?: SortOrder
    siswaNisn?: SortOrder
    tipe?: SortOrder
    jenisPrestasiId?: SortOrder
    jenisPelanggaranId?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    tingkat?: SortOrder
    inputBy?: SortOrder
    dokumenUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoinSiswaMinOrderByAggregateInput = {
    id?: SortOrder
    siswaNisn?: SortOrder
    tipe?: SortOrder
    jenisPrestasiId?: SortOrder
    jenisPelanggaranId?: SortOrder
    poin?: SortOrder
    deskripsi?: SortOrder
    tanggal?: SortOrder
    tingkat?: SortOrder
    inputBy?: SortOrder
    dokumenUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PoinSiswaSumOrderByAggregateInput = {
    poin?: SortOrder
  }

  export type EnumTipePoinWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipePoin | EnumTipePoinFieldRefInput<$PrismaModel>
    in?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    not?: NestedEnumTipePoinWithAggregatesFilter<$PrismaModel> | $Enums.TipePoin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipePoinFilter<$PrismaModel>
    _max?: NestedEnumTipePoinFilter<$PrismaModel>
  }

  export type EnumStatusKasusFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKasus | EnumStatusKasusFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKasusFilter<$PrismaModel> | $Enums.StatusKasus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type JenisKasusNullableRelationFilter = {
    is?: JenisKasusWhereInput | null
    isNot?: JenisKasusWhereInput | null
  }

  export type LaporanKasusListRelationFilter = {
    every?: LaporanKasusWhereInput
    some?: LaporanKasusWhereInput
    none?: LaporanKasusWhereInput
  }

  export type LaporanKasusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type KasusSiswaCountOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    jenisKasusId?: SortOrder
    jenisPelanggaranId?: SortOrder
    tanggal?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    penanganan?: SortOrder
    catatan?: SortOrder
    inputBy?: SortOrder
    dokumenList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KasusSiswaMaxOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    jenisKasusId?: SortOrder
    jenisPelanggaranId?: SortOrder
    tanggal?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    penanganan?: SortOrder
    catatan?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KasusSiswaMinOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    jenisKasusId?: SortOrder
    jenisPelanggaranId?: SortOrder
    tanggal?: SortOrder
    deskripsi?: SortOrder
    status?: SortOrder
    penanganan?: SortOrder
    catatan?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatusKasusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKasus | EnumStatusKasusFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKasusWithAggregatesFilter<$PrismaModel> | $Enums.StatusKasus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKasusFilter<$PrismaModel>
    _max?: NestedEnumStatusKasusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type KasusSiswaRelationFilter = {
    is?: KasusSiswaWhereInput
    isNot?: KasusSiswaWhereInput
  }

  export type LaporanKasusCountOrderByAggregateInput = {
    id?: SortOrder
    kasusId?: SortOrder
    tanggal?: SortOrder
    catatan?: SortOrder
    status?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
  }

  export type LaporanKasusMaxOrderByAggregateInput = {
    id?: SortOrder
    kasusId?: SortOrder
    tanggal?: SortOrder
    catatan?: SortOrder
    status?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
  }

  export type LaporanKasusMinOrderByAggregateInput = {
    id?: SortOrder
    kasusId?: SortOrder
    tanggal?: SortOrder
    catatan?: SortOrder
    status?: SortOrder
    inputBy?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumStatusKunjunganFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKunjungan | EnumStatusKunjunganFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKunjunganFilter<$PrismaModel> | $Enums.StatusKunjungan
  }

  export type KunjunganRumahCountOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    tanggal?: SortOrder
    tujuan?: SortOrder
    petugasBk?: SortOrder
    status?: SortOrder
    hasilKunjungan?: SortOrder
    catatan?: SortOrder
    dokumenList?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KunjunganRumahMaxOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    tanggal?: SortOrder
    tujuan?: SortOrder
    petugasBk?: SortOrder
    status?: SortOrder
    hasilKunjungan?: SortOrder
    catatan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type KunjunganRumahMinOrderByAggregateInput = {
    id?: SortOrder
    nomor?: SortOrder
    siswaNisn?: SortOrder
    tanggal?: SortOrder
    tujuan?: SortOrder
    petugasBk?: SortOrder
    status?: SortOrder
    hasilKunjungan?: SortOrder
    catatan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumStatusKunjunganWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKunjungan | EnumStatusKunjunganFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKunjunganWithAggregatesFilter<$PrismaModel> | $Enums.StatusKunjungan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKunjunganFilter<$PrismaModel>
    _max?: NestedEnumStatusKunjunganFilter<$PrismaModel>
  }

  export type KelasCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type KelasMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type KelasMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type MapelCountOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type MapelMaxOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type MapelMinOrderByAggregateInput = {
    id?: SortOrder
    nama?: SortOrder
  }

  export type SessionCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput> | SessionCreateWithoutUserInput[] | SessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutUserInput | SessionCreateOrConnectWithoutUserInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutUserInput | SessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: SessionCreateManyUserInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutUserInput | SessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutUserInput | SessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type AbsensiCreateNestedManyWithoutSiswaInput = {
    create?: XOR<AbsensiCreateWithoutSiswaInput, AbsensiUncheckedCreateWithoutSiswaInput> | AbsensiCreateWithoutSiswaInput[] | AbsensiUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutSiswaInput | AbsensiCreateOrConnectWithoutSiswaInput[]
    createMany?: AbsensiCreateManySiswaInputEnvelope
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
  }

  export type PoinSiswaCreateNestedManyWithoutSiswaInput = {
    create?: XOR<PoinSiswaCreateWithoutSiswaInput, PoinSiswaUncheckedCreateWithoutSiswaInput> | PoinSiswaCreateWithoutSiswaInput[] | PoinSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutSiswaInput | PoinSiswaCreateOrConnectWithoutSiswaInput[]
    createMany?: PoinSiswaCreateManySiswaInputEnvelope
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
  }

  export type KasusSiswaCreateNestedManyWithoutSiswaInput = {
    create?: XOR<KasusSiswaCreateWithoutSiswaInput, KasusSiswaUncheckedCreateWithoutSiswaInput> | KasusSiswaCreateWithoutSiswaInput[] | KasusSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutSiswaInput | KasusSiswaCreateOrConnectWithoutSiswaInput[]
    createMany?: KasusSiswaCreateManySiswaInputEnvelope
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
  }

  export type KunjunganRumahCreateNestedManyWithoutSiswaInput = {
    create?: XOR<KunjunganRumahCreateWithoutSiswaInput, KunjunganRumahUncheckedCreateWithoutSiswaInput> | KunjunganRumahCreateWithoutSiswaInput[] | KunjunganRumahUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KunjunganRumahCreateOrConnectWithoutSiswaInput | KunjunganRumahCreateOrConnectWithoutSiswaInput[]
    createMany?: KunjunganRumahCreateManySiswaInputEnvelope
    connect?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
  }

  export type AbsensiUncheckedCreateNestedManyWithoutSiswaInput = {
    create?: XOR<AbsensiCreateWithoutSiswaInput, AbsensiUncheckedCreateWithoutSiswaInput> | AbsensiCreateWithoutSiswaInput[] | AbsensiUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutSiswaInput | AbsensiCreateOrConnectWithoutSiswaInput[]
    createMany?: AbsensiCreateManySiswaInputEnvelope
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
  }

  export type PoinSiswaUncheckedCreateNestedManyWithoutSiswaInput = {
    create?: XOR<PoinSiswaCreateWithoutSiswaInput, PoinSiswaUncheckedCreateWithoutSiswaInput> | PoinSiswaCreateWithoutSiswaInput[] | PoinSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutSiswaInput | PoinSiswaCreateOrConnectWithoutSiswaInput[]
    createMany?: PoinSiswaCreateManySiswaInputEnvelope
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
  }

  export type KasusSiswaUncheckedCreateNestedManyWithoutSiswaInput = {
    create?: XOR<KasusSiswaCreateWithoutSiswaInput, KasusSiswaUncheckedCreateWithoutSiswaInput> | KasusSiswaCreateWithoutSiswaInput[] | KasusSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutSiswaInput | KasusSiswaCreateOrConnectWithoutSiswaInput[]
    createMany?: KasusSiswaCreateManySiswaInputEnvelope
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
  }

  export type KunjunganRumahUncheckedCreateNestedManyWithoutSiswaInput = {
    create?: XOR<KunjunganRumahCreateWithoutSiswaInput, KunjunganRumahUncheckedCreateWithoutSiswaInput> | KunjunganRumahCreateWithoutSiswaInput[] | KunjunganRumahUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KunjunganRumahCreateOrConnectWithoutSiswaInput | KunjunganRumahCreateOrConnectWithoutSiswaInput[]
    createMany?: KunjunganRumahCreateManySiswaInputEnvelope
    connect?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type AbsensiUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<AbsensiCreateWithoutSiswaInput, AbsensiUncheckedCreateWithoutSiswaInput> | AbsensiCreateWithoutSiswaInput[] | AbsensiUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutSiswaInput | AbsensiCreateOrConnectWithoutSiswaInput[]
    upsert?: AbsensiUpsertWithWhereUniqueWithoutSiswaInput | AbsensiUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: AbsensiCreateManySiswaInputEnvelope
    set?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    disconnect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    delete?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    update?: AbsensiUpdateWithWhereUniqueWithoutSiswaInput | AbsensiUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: AbsensiUpdateManyWithWhereWithoutSiswaInput | AbsensiUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
  }

  export type PoinSiswaUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<PoinSiswaCreateWithoutSiswaInput, PoinSiswaUncheckedCreateWithoutSiswaInput> | PoinSiswaCreateWithoutSiswaInput[] | PoinSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutSiswaInput | PoinSiswaCreateOrConnectWithoutSiswaInput[]
    upsert?: PoinSiswaUpsertWithWhereUniqueWithoutSiswaInput | PoinSiswaUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: PoinSiswaCreateManySiswaInputEnvelope
    set?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    disconnect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    delete?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    update?: PoinSiswaUpdateWithWhereUniqueWithoutSiswaInput | PoinSiswaUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: PoinSiswaUpdateManyWithWhereWithoutSiswaInput | PoinSiswaUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
  }

  export type KasusSiswaUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutSiswaInput, KasusSiswaUncheckedCreateWithoutSiswaInput> | KasusSiswaCreateWithoutSiswaInput[] | KasusSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutSiswaInput | KasusSiswaCreateOrConnectWithoutSiswaInput[]
    upsert?: KasusSiswaUpsertWithWhereUniqueWithoutSiswaInput | KasusSiswaUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: KasusSiswaCreateManySiswaInputEnvelope
    set?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    disconnect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    delete?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    update?: KasusSiswaUpdateWithWhereUniqueWithoutSiswaInput | KasusSiswaUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: KasusSiswaUpdateManyWithWhereWithoutSiswaInput | KasusSiswaUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
  }

  export type KunjunganRumahUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<KunjunganRumahCreateWithoutSiswaInput, KunjunganRumahUncheckedCreateWithoutSiswaInput> | KunjunganRumahCreateWithoutSiswaInput[] | KunjunganRumahUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KunjunganRumahCreateOrConnectWithoutSiswaInput | KunjunganRumahCreateOrConnectWithoutSiswaInput[]
    upsert?: KunjunganRumahUpsertWithWhereUniqueWithoutSiswaInput | KunjunganRumahUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: KunjunganRumahCreateManySiswaInputEnvelope
    set?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    disconnect?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    delete?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    connect?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    update?: KunjunganRumahUpdateWithWhereUniqueWithoutSiswaInput | KunjunganRumahUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: KunjunganRumahUpdateManyWithWhereWithoutSiswaInput | KunjunganRumahUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: KunjunganRumahScalarWhereInput | KunjunganRumahScalarWhereInput[]
  }

  export type AbsensiUncheckedUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<AbsensiCreateWithoutSiswaInput, AbsensiUncheckedCreateWithoutSiswaInput> | AbsensiCreateWithoutSiswaInput[] | AbsensiUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: AbsensiCreateOrConnectWithoutSiswaInput | AbsensiCreateOrConnectWithoutSiswaInput[]
    upsert?: AbsensiUpsertWithWhereUniqueWithoutSiswaInput | AbsensiUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: AbsensiCreateManySiswaInputEnvelope
    set?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    disconnect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    delete?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    connect?: AbsensiWhereUniqueInput | AbsensiWhereUniqueInput[]
    update?: AbsensiUpdateWithWhereUniqueWithoutSiswaInput | AbsensiUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: AbsensiUpdateManyWithWhereWithoutSiswaInput | AbsensiUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
  }

  export type PoinSiswaUncheckedUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<PoinSiswaCreateWithoutSiswaInput, PoinSiswaUncheckedCreateWithoutSiswaInput> | PoinSiswaCreateWithoutSiswaInput[] | PoinSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutSiswaInput | PoinSiswaCreateOrConnectWithoutSiswaInput[]
    upsert?: PoinSiswaUpsertWithWhereUniqueWithoutSiswaInput | PoinSiswaUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: PoinSiswaCreateManySiswaInputEnvelope
    set?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    disconnect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    delete?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    update?: PoinSiswaUpdateWithWhereUniqueWithoutSiswaInput | PoinSiswaUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: PoinSiswaUpdateManyWithWhereWithoutSiswaInput | PoinSiswaUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
  }

  export type KasusSiswaUncheckedUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutSiswaInput, KasusSiswaUncheckedCreateWithoutSiswaInput> | KasusSiswaCreateWithoutSiswaInput[] | KasusSiswaUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutSiswaInput | KasusSiswaCreateOrConnectWithoutSiswaInput[]
    upsert?: KasusSiswaUpsertWithWhereUniqueWithoutSiswaInput | KasusSiswaUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: KasusSiswaCreateManySiswaInputEnvelope
    set?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    disconnect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    delete?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    update?: KasusSiswaUpdateWithWhereUniqueWithoutSiswaInput | KasusSiswaUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: KasusSiswaUpdateManyWithWhereWithoutSiswaInput | KasusSiswaUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
  }

  export type KunjunganRumahUncheckedUpdateManyWithoutSiswaNestedInput = {
    create?: XOR<KunjunganRumahCreateWithoutSiswaInput, KunjunganRumahUncheckedCreateWithoutSiswaInput> | KunjunganRumahCreateWithoutSiswaInput[] | KunjunganRumahUncheckedCreateWithoutSiswaInput[]
    connectOrCreate?: KunjunganRumahCreateOrConnectWithoutSiswaInput | KunjunganRumahCreateOrConnectWithoutSiswaInput[]
    upsert?: KunjunganRumahUpsertWithWhereUniqueWithoutSiswaInput | KunjunganRumahUpsertWithWhereUniqueWithoutSiswaInput[]
    createMany?: KunjunganRumahCreateManySiswaInputEnvelope
    set?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    disconnect?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    delete?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    connect?: KunjunganRumahWhereUniqueInput | KunjunganRumahWhereUniqueInput[]
    update?: KunjunganRumahUpdateWithWhereUniqueWithoutSiswaInput | KunjunganRumahUpdateWithWhereUniqueWithoutSiswaInput[]
    updateMany?: KunjunganRumahUpdateManyWithWhereWithoutSiswaInput | KunjunganRumahUpdateManyWithWhereWithoutSiswaInput[]
    deleteMany?: KunjunganRumahScalarWhereInput | KunjunganRumahScalarWhereInput[]
  }

  export type SiswaCreateNestedOneWithoutAbsensiListInput = {
    create?: XOR<SiswaCreateWithoutAbsensiListInput, SiswaUncheckedCreateWithoutAbsensiListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutAbsensiListInput
    connect?: SiswaWhereUniqueInput
  }

  export type EnumStatusAbsensiFieldUpdateOperationsInput = {
    set?: $Enums.StatusAbsensi
  }

  export type SiswaUpdateOneRequiredWithoutAbsensiListNestedInput = {
    create?: XOR<SiswaCreateWithoutAbsensiListInput, SiswaUncheckedCreateWithoutAbsensiListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutAbsensiListInput
    upsert?: SiswaUpsertWithoutAbsensiListInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutAbsensiListInput, SiswaUpdateWithoutAbsensiListInput>, SiswaUncheckedUpdateWithoutAbsensiListInput>
  }

  export type PoinSiswaCreateNestedManyWithoutJenisPelanggaranInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPelanggaranInput, PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput> | PoinSiswaCreateWithoutJenisPelanggaranInput[] | PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput | PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    createMany?: PoinSiswaCreateManyJenisPelanggaranInputEnvelope
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
  }

  export type KasusSiswaCreateNestedManyWithoutJenisPelanggaranInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisPelanggaranInput, KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput> | KasusSiswaCreateWithoutJenisPelanggaranInput[] | KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput | KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    createMany?: KasusSiswaCreateManyJenisPelanggaranInputEnvelope
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
  }

  export type PoinSiswaUncheckedCreateNestedManyWithoutJenisPelanggaranInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPelanggaranInput, PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput> | PoinSiswaCreateWithoutJenisPelanggaranInput[] | PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput | PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    createMany?: PoinSiswaCreateManyJenisPelanggaranInputEnvelope
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
  }

  export type KasusSiswaUncheckedCreateNestedManyWithoutJenisPelanggaranInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisPelanggaranInput, KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput> | KasusSiswaCreateWithoutJenisPelanggaranInput[] | KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput | KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    createMany?: KasusSiswaCreateManyJenisPelanggaranInputEnvelope
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
  }

  export type EnumKategoriPelanggaranFieldUpdateOperationsInput = {
    set?: $Enums.KategoriPelanggaran
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PoinSiswaUpdateManyWithoutJenisPelanggaranNestedInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPelanggaranInput, PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput> | PoinSiswaCreateWithoutJenisPelanggaranInput[] | PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput | PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    upsert?: PoinSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput | PoinSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput[]
    createMany?: PoinSiswaCreateManyJenisPelanggaranInputEnvelope
    set?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    disconnect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    delete?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    update?: PoinSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput | PoinSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput[]
    updateMany?: PoinSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput | PoinSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput[]
    deleteMany?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
  }

  export type KasusSiswaUpdateManyWithoutJenisPelanggaranNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisPelanggaranInput, KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput> | KasusSiswaCreateWithoutJenisPelanggaranInput[] | KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput | KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    upsert?: KasusSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput | KasusSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput[]
    createMany?: KasusSiswaCreateManyJenisPelanggaranInputEnvelope
    set?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    disconnect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    delete?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    update?: KasusSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput | KasusSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput[]
    updateMany?: KasusSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput | KasusSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput[]
    deleteMany?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
  }

  export type PoinSiswaUncheckedUpdateManyWithoutJenisPelanggaranNestedInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPelanggaranInput, PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput> | PoinSiswaCreateWithoutJenisPelanggaranInput[] | PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput | PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    upsert?: PoinSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput | PoinSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput[]
    createMany?: PoinSiswaCreateManyJenisPelanggaranInputEnvelope
    set?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    disconnect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    delete?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    update?: PoinSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput | PoinSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput[]
    updateMany?: PoinSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput | PoinSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput[]
    deleteMany?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
  }

  export type KasusSiswaUncheckedUpdateManyWithoutJenisPelanggaranNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisPelanggaranInput, KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput> | KasusSiswaCreateWithoutJenisPelanggaranInput[] | KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput | KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput[]
    upsert?: KasusSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput | KasusSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput[]
    createMany?: KasusSiswaCreateManyJenisPelanggaranInputEnvelope
    set?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    disconnect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    delete?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    update?: KasusSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput | KasusSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput[]
    updateMany?: KasusSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput | KasusSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput[]
    deleteMany?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
  }

  export type PoinSiswaCreateNestedManyWithoutJenisPrestasiInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPrestasiInput, PoinSiswaUncheckedCreateWithoutJenisPrestasiInput> | PoinSiswaCreateWithoutJenisPrestasiInput[] | PoinSiswaUncheckedCreateWithoutJenisPrestasiInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPrestasiInput | PoinSiswaCreateOrConnectWithoutJenisPrestasiInput[]
    createMany?: PoinSiswaCreateManyJenisPrestasiInputEnvelope
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
  }

  export type PoinSiswaUncheckedCreateNestedManyWithoutJenisPrestasiInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPrestasiInput, PoinSiswaUncheckedCreateWithoutJenisPrestasiInput> | PoinSiswaCreateWithoutJenisPrestasiInput[] | PoinSiswaUncheckedCreateWithoutJenisPrestasiInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPrestasiInput | PoinSiswaCreateOrConnectWithoutJenisPrestasiInput[]
    createMany?: PoinSiswaCreateManyJenisPrestasiInputEnvelope
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
  }

  export type EnumKategoriPrestasiFieldUpdateOperationsInput = {
    set?: $Enums.KategoriPrestasi
  }

  export type PoinSiswaUpdateManyWithoutJenisPrestasiNestedInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPrestasiInput, PoinSiswaUncheckedCreateWithoutJenisPrestasiInput> | PoinSiswaCreateWithoutJenisPrestasiInput[] | PoinSiswaUncheckedCreateWithoutJenisPrestasiInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPrestasiInput | PoinSiswaCreateOrConnectWithoutJenisPrestasiInput[]
    upsert?: PoinSiswaUpsertWithWhereUniqueWithoutJenisPrestasiInput | PoinSiswaUpsertWithWhereUniqueWithoutJenisPrestasiInput[]
    createMany?: PoinSiswaCreateManyJenisPrestasiInputEnvelope
    set?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    disconnect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    delete?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    update?: PoinSiswaUpdateWithWhereUniqueWithoutJenisPrestasiInput | PoinSiswaUpdateWithWhereUniqueWithoutJenisPrestasiInput[]
    updateMany?: PoinSiswaUpdateManyWithWhereWithoutJenisPrestasiInput | PoinSiswaUpdateManyWithWhereWithoutJenisPrestasiInput[]
    deleteMany?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
  }

  export type PoinSiswaUncheckedUpdateManyWithoutJenisPrestasiNestedInput = {
    create?: XOR<PoinSiswaCreateWithoutJenisPrestasiInput, PoinSiswaUncheckedCreateWithoutJenisPrestasiInput> | PoinSiswaCreateWithoutJenisPrestasiInput[] | PoinSiswaUncheckedCreateWithoutJenisPrestasiInput[]
    connectOrCreate?: PoinSiswaCreateOrConnectWithoutJenisPrestasiInput | PoinSiswaCreateOrConnectWithoutJenisPrestasiInput[]
    upsert?: PoinSiswaUpsertWithWhereUniqueWithoutJenisPrestasiInput | PoinSiswaUpsertWithWhereUniqueWithoutJenisPrestasiInput[]
    createMany?: PoinSiswaCreateManyJenisPrestasiInputEnvelope
    set?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    disconnect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    delete?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    connect?: PoinSiswaWhereUniqueInput | PoinSiswaWhereUniqueInput[]
    update?: PoinSiswaUpdateWithWhereUniqueWithoutJenisPrestasiInput | PoinSiswaUpdateWithWhereUniqueWithoutJenisPrestasiInput[]
    updateMany?: PoinSiswaUpdateManyWithWhereWithoutJenisPrestasiInput | PoinSiswaUpdateManyWithWhereWithoutJenisPrestasiInput[]
    deleteMany?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
  }

  export type KasusSiswaCreateNestedManyWithoutJenisKasusInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisKasusInput, KasusSiswaUncheckedCreateWithoutJenisKasusInput> | KasusSiswaCreateWithoutJenisKasusInput[] | KasusSiswaUncheckedCreateWithoutJenisKasusInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisKasusInput | KasusSiswaCreateOrConnectWithoutJenisKasusInput[]
    createMany?: KasusSiswaCreateManyJenisKasusInputEnvelope
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
  }

  export type KasusSiswaUncheckedCreateNestedManyWithoutJenisKasusInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisKasusInput, KasusSiswaUncheckedCreateWithoutJenisKasusInput> | KasusSiswaCreateWithoutJenisKasusInput[] | KasusSiswaUncheckedCreateWithoutJenisKasusInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisKasusInput | KasusSiswaCreateOrConnectWithoutJenisKasusInput[]
    createMany?: KasusSiswaCreateManyJenisKasusInputEnvelope
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
  }

  export type KasusSiswaUpdateManyWithoutJenisKasusNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisKasusInput, KasusSiswaUncheckedCreateWithoutJenisKasusInput> | KasusSiswaCreateWithoutJenisKasusInput[] | KasusSiswaUncheckedCreateWithoutJenisKasusInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisKasusInput | KasusSiswaCreateOrConnectWithoutJenisKasusInput[]
    upsert?: KasusSiswaUpsertWithWhereUniqueWithoutJenisKasusInput | KasusSiswaUpsertWithWhereUniqueWithoutJenisKasusInput[]
    createMany?: KasusSiswaCreateManyJenisKasusInputEnvelope
    set?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    disconnect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    delete?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    update?: KasusSiswaUpdateWithWhereUniqueWithoutJenisKasusInput | KasusSiswaUpdateWithWhereUniqueWithoutJenisKasusInput[]
    updateMany?: KasusSiswaUpdateManyWithWhereWithoutJenisKasusInput | KasusSiswaUpdateManyWithWhereWithoutJenisKasusInput[]
    deleteMany?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
  }

  export type KasusSiswaUncheckedUpdateManyWithoutJenisKasusNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutJenisKasusInput, KasusSiswaUncheckedCreateWithoutJenisKasusInput> | KasusSiswaCreateWithoutJenisKasusInput[] | KasusSiswaUncheckedCreateWithoutJenisKasusInput[]
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutJenisKasusInput | KasusSiswaCreateOrConnectWithoutJenisKasusInput[]
    upsert?: KasusSiswaUpsertWithWhereUniqueWithoutJenisKasusInput | KasusSiswaUpsertWithWhereUniqueWithoutJenisKasusInput[]
    createMany?: KasusSiswaCreateManyJenisKasusInputEnvelope
    set?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    disconnect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    delete?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    connect?: KasusSiswaWhereUniqueInput | KasusSiswaWhereUniqueInput[]
    update?: KasusSiswaUpdateWithWhereUniqueWithoutJenisKasusInput | KasusSiswaUpdateWithWhereUniqueWithoutJenisKasusInput[]
    updateMany?: KasusSiswaUpdateManyWithWhereWithoutJenisKasusInput | KasusSiswaUpdateManyWithWhereWithoutJenisKasusInput[]
    deleteMany?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
  }

  export type SiswaCreateNestedOneWithoutPoinListInput = {
    create?: XOR<SiswaCreateWithoutPoinListInput, SiswaUncheckedCreateWithoutPoinListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutPoinListInput
    connect?: SiswaWhereUniqueInput
  }

  export type JenisPrestasiCreateNestedOneWithoutPoinListInput = {
    create?: XOR<JenisPrestasiCreateWithoutPoinListInput, JenisPrestasiUncheckedCreateWithoutPoinListInput>
    connectOrCreate?: JenisPrestasiCreateOrConnectWithoutPoinListInput
    connect?: JenisPrestasiWhereUniqueInput
  }

  export type JenisPelanggaranCreateNestedOneWithoutPoinListInput = {
    create?: XOR<JenisPelanggaranCreateWithoutPoinListInput, JenisPelanggaranUncheckedCreateWithoutPoinListInput>
    connectOrCreate?: JenisPelanggaranCreateOrConnectWithoutPoinListInput
    connect?: JenisPelanggaranWhereUniqueInput
  }

  export type EnumTipePoinFieldUpdateOperationsInput = {
    set?: $Enums.TipePoin
  }

  export type SiswaUpdateOneRequiredWithoutPoinListNestedInput = {
    create?: XOR<SiswaCreateWithoutPoinListInput, SiswaUncheckedCreateWithoutPoinListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutPoinListInput
    upsert?: SiswaUpsertWithoutPoinListInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutPoinListInput, SiswaUpdateWithoutPoinListInput>, SiswaUncheckedUpdateWithoutPoinListInput>
  }

  export type JenisPrestasiUpdateOneWithoutPoinListNestedInput = {
    create?: XOR<JenisPrestasiCreateWithoutPoinListInput, JenisPrestasiUncheckedCreateWithoutPoinListInput>
    connectOrCreate?: JenisPrestasiCreateOrConnectWithoutPoinListInput
    upsert?: JenisPrestasiUpsertWithoutPoinListInput
    disconnect?: JenisPrestasiWhereInput | boolean
    delete?: JenisPrestasiWhereInput | boolean
    connect?: JenisPrestasiWhereUniqueInput
    update?: XOR<XOR<JenisPrestasiUpdateToOneWithWhereWithoutPoinListInput, JenisPrestasiUpdateWithoutPoinListInput>, JenisPrestasiUncheckedUpdateWithoutPoinListInput>
  }

  export type JenisPelanggaranUpdateOneWithoutPoinListNestedInput = {
    create?: XOR<JenisPelanggaranCreateWithoutPoinListInput, JenisPelanggaranUncheckedCreateWithoutPoinListInput>
    connectOrCreate?: JenisPelanggaranCreateOrConnectWithoutPoinListInput
    upsert?: JenisPelanggaranUpsertWithoutPoinListInput
    disconnect?: JenisPelanggaranWhereInput | boolean
    delete?: JenisPelanggaranWhereInput | boolean
    connect?: JenisPelanggaranWhereUniqueInput
    update?: XOR<XOR<JenisPelanggaranUpdateToOneWithWhereWithoutPoinListInput, JenisPelanggaranUpdateWithoutPoinListInput>, JenisPelanggaranUncheckedUpdateWithoutPoinListInput>
  }

  export type SiswaCreateNestedOneWithoutKasusListInput = {
    create?: XOR<SiswaCreateWithoutKasusListInput, SiswaUncheckedCreateWithoutKasusListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutKasusListInput
    connect?: SiswaWhereUniqueInput
  }

  export type JenisKasusCreateNestedOneWithoutKasusListInput = {
    create?: XOR<JenisKasusCreateWithoutKasusListInput, JenisKasusUncheckedCreateWithoutKasusListInput>
    connectOrCreate?: JenisKasusCreateOrConnectWithoutKasusListInput
    connect?: JenisKasusWhereUniqueInput
  }

  export type JenisPelanggaranCreateNestedOneWithoutKasusListInput = {
    create?: XOR<JenisPelanggaranCreateWithoutKasusListInput, JenisPelanggaranUncheckedCreateWithoutKasusListInput>
    connectOrCreate?: JenisPelanggaranCreateOrConnectWithoutKasusListInput
    connect?: JenisPelanggaranWhereUniqueInput
  }

  export type LaporanKasusCreateNestedManyWithoutKasusInput = {
    create?: XOR<LaporanKasusCreateWithoutKasusInput, LaporanKasusUncheckedCreateWithoutKasusInput> | LaporanKasusCreateWithoutKasusInput[] | LaporanKasusUncheckedCreateWithoutKasusInput[]
    connectOrCreate?: LaporanKasusCreateOrConnectWithoutKasusInput | LaporanKasusCreateOrConnectWithoutKasusInput[]
    createMany?: LaporanKasusCreateManyKasusInputEnvelope
    connect?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
  }

  export type LaporanKasusUncheckedCreateNestedManyWithoutKasusInput = {
    create?: XOR<LaporanKasusCreateWithoutKasusInput, LaporanKasusUncheckedCreateWithoutKasusInput> | LaporanKasusCreateWithoutKasusInput[] | LaporanKasusUncheckedCreateWithoutKasusInput[]
    connectOrCreate?: LaporanKasusCreateOrConnectWithoutKasusInput | LaporanKasusCreateOrConnectWithoutKasusInput[]
    createMany?: LaporanKasusCreateManyKasusInputEnvelope
    connect?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
  }

  export type EnumStatusKasusFieldUpdateOperationsInput = {
    set?: $Enums.StatusKasus
  }

  export type SiswaUpdateOneRequiredWithoutKasusListNestedInput = {
    create?: XOR<SiswaCreateWithoutKasusListInput, SiswaUncheckedCreateWithoutKasusListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutKasusListInput
    upsert?: SiswaUpsertWithoutKasusListInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutKasusListInput, SiswaUpdateWithoutKasusListInput>, SiswaUncheckedUpdateWithoutKasusListInput>
  }

  export type JenisKasusUpdateOneWithoutKasusListNestedInput = {
    create?: XOR<JenisKasusCreateWithoutKasusListInput, JenisKasusUncheckedCreateWithoutKasusListInput>
    connectOrCreate?: JenisKasusCreateOrConnectWithoutKasusListInput
    upsert?: JenisKasusUpsertWithoutKasusListInput
    disconnect?: JenisKasusWhereInput | boolean
    delete?: JenisKasusWhereInput | boolean
    connect?: JenisKasusWhereUniqueInput
    update?: XOR<XOR<JenisKasusUpdateToOneWithWhereWithoutKasusListInput, JenisKasusUpdateWithoutKasusListInput>, JenisKasusUncheckedUpdateWithoutKasusListInput>
  }

  export type JenisPelanggaranUpdateOneWithoutKasusListNestedInput = {
    create?: XOR<JenisPelanggaranCreateWithoutKasusListInput, JenisPelanggaranUncheckedCreateWithoutKasusListInput>
    connectOrCreate?: JenisPelanggaranCreateOrConnectWithoutKasusListInput
    upsert?: JenisPelanggaranUpsertWithoutKasusListInput
    disconnect?: JenisPelanggaranWhereInput | boolean
    delete?: JenisPelanggaranWhereInput | boolean
    connect?: JenisPelanggaranWhereUniqueInput
    update?: XOR<XOR<JenisPelanggaranUpdateToOneWithWhereWithoutKasusListInput, JenisPelanggaranUpdateWithoutKasusListInput>, JenisPelanggaranUncheckedUpdateWithoutKasusListInput>
  }

  export type LaporanKasusUpdateManyWithoutKasusNestedInput = {
    create?: XOR<LaporanKasusCreateWithoutKasusInput, LaporanKasusUncheckedCreateWithoutKasusInput> | LaporanKasusCreateWithoutKasusInput[] | LaporanKasusUncheckedCreateWithoutKasusInput[]
    connectOrCreate?: LaporanKasusCreateOrConnectWithoutKasusInput | LaporanKasusCreateOrConnectWithoutKasusInput[]
    upsert?: LaporanKasusUpsertWithWhereUniqueWithoutKasusInput | LaporanKasusUpsertWithWhereUniqueWithoutKasusInput[]
    createMany?: LaporanKasusCreateManyKasusInputEnvelope
    set?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    disconnect?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    delete?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    connect?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    update?: LaporanKasusUpdateWithWhereUniqueWithoutKasusInput | LaporanKasusUpdateWithWhereUniqueWithoutKasusInput[]
    updateMany?: LaporanKasusUpdateManyWithWhereWithoutKasusInput | LaporanKasusUpdateManyWithWhereWithoutKasusInput[]
    deleteMany?: LaporanKasusScalarWhereInput | LaporanKasusScalarWhereInput[]
  }

  export type LaporanKasusUncheckedUpdateManyWithoutKasusNestedInput = {
    create?: XOR<LaporanKasusCreateWithoutKasusInput, LaporanKasusUncheckedCreateWithoutKasusInput> | LaporanKasusCreateWithoutKasusInput[] | LaporanKasusUncheckedCreateWithoutKasusInput[]
    connectOrCreate?: LaporanKasusCreateOrConnectWithoutKasusInput | LaporanKasusCreateOrConnectWithoutKasusInput[]
    upsert?: LaporanKasusUpsertWithWhereUniqueWithoutKasusInput | LaporanKasusUpsertWithWhereUniqueWithoutKasusInput[]
    createMany?: LaporanKasusCreateManyKasusInputEnvelope
    set?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    disconnect?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    delete?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    connect?: LaporanKasusWhereUniqueInput | LaporanKasusWhereUniqueInput[]
    update?: LaporanKasusUpdateWithWhereUniqueWithoutKasusInput | LaporanKasusUpdateWithWhereUniqueWithoutKasusInput[]
    updateMany?: LaporanKasusUpdateManyWithWhereWithoutKasusInput | LaporanKasusUpdateManyWithWhereWithoutKasusInput[]
    deleteMany?: LaporanKasusScalarWhereInput | LaporanKasusScalarWhereInput[]
  }

  export type KasusSiswaCreateNestedOneWithoutLaporanListInput = {
    create?: XOR<KasusSiswaCreateWithoutLaporanListInput, KasusSiswaUncheckedCreateWithoutLaporanListInput>
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutLaporanListInput
    connect?: KasusSiswaWhereUniqueInput
  }

  export type KasusSiswaUpdateOneRequiredWithoutLaporanListNestedInput = {
    create?: XOR<KasusSiswaCreateWithoutLaporanListInput, KasusSiswaUncheckedCreateWithoutLaporanListInput>
    connectOrCreate?: KasusSiswaCreateOrConnectWithoutLaporanListInput
    upsert?: KasusSiswaUpsertWithoutLaporanListInput
    connect?: KasusSiswaWhereUniqueInput
    update?: XOR<XOR<KasusSiswaUpdateToOneWithWhereWithoutLaporanListInput, KasusSiswaUpdateWithoutLaporanListInput>, KasusSiswaUncheckedUpdateWithoutLaporanListInput>
  }

  export type SiswaCreateNestedOneWithoutKunjunganListInput = {
    create?: XOR<SiswaCreateWithoutKunjunganListInput, SiswaUncheckedCreateWithoutKunjunganListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutKunjunganListInput
    connect?: SiswaWhereUniqueInput
  }

  export type EnumStatusKunjunganFieldUpdateOperationsInput = {
    set?: $Enums.StatusKunjungan
  }

  export type SiswaUpdateOneRequiredWithoutKunjunganListNestedInput = {
    create?: XOR<SiswaCreateWithoutKunjunganListInput, SiswaUncheckedCreateWithoutKunjunganListInput>
    connectOrCreate?: SiswaCreateOrConnectWithoutKunjunganListInput
    upsert?: SiswaUpsertWithoutKunjunganListInput
    connect?: SiswaWhereUniqueInput
    update?: XOR<XOR<SiswaUpdateToOneWithWhereWithoutKunjunganListInput, SiswaUpdateWithoutKunjunganListInput>, SiswaUncheckedUpdateWithoutKunjunganListInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusAbsensiFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAbsensi | EnumStatusAbsensiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAbsensiFilter<$PrismaModel> | $Enums.StatusAbsensi
  }

  export type NestedEnumStatusAbsensiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusAbsensi | EnumStatusAbsensiFieldRefInput<$PrismaModel>
    in?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusAbsensi[] | ListEnumStatusAbsensiFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusAbsensiWithAggregatesFilter<$PrismaModel> | $Enums.StatusAbsensi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusAbsensiFilter<$PrismaModel>
    _max?: NestedEnumStatusAbsensiFilter<$PrismaModel>
  }

  export type NestedEnumKategoriPelanggaranFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPelanggaran | EnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPelanggaranFilter<$PrismaModel> | $Enums.KategoriPelanggaran
  }

  export type NestedEnumKategoriPelanggaranWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPelanggaran | EnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPelanggaran[] | ListEnumKategoriPelanggaranFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPelanggaranWithAggregatesFilter<$PrismaModel> | $Enums.KategoriPelanggaran
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKategoriPelanggaranFilter<$PrismaModel>
    _max?: NestedEnumKategoriPelanggaranFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumKategoriPrestasiFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPrestasi | EnumKategoriPrestasiFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPrestasiFilter<$PrismaModel> | $Enums.KategoriPrestasi
  }

  export type NestedEnumKategoriPrestasiWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.KategoriPrestasi | EnumKategoriPrestasiFieldRefInput<$PrismaModel>
    in?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    notIn?: $Enums.KategoriPrestasi[] | ListEnumKategoriPrestasiFieldRefInput<$PrismaModel>
    not?: NestedEnumKategoriPrestasiWithAggregatesFilter<$PrismaModel> | $Enums.KategoriPrestasi
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumKategoriPrestasiFilter<$PrismaModel>
    _max?: NestedEnumKategoriPrestasiFilter<$PrismaModel>
  }

  export type NestedEnumTipePoinFilter<$PrismaModel = never> = {
    equals?: $Enums.TipePoin | EnumTipePoinFieldRefInput<$PrismaModel>
    in?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    not?: NestedEnumTipePoinFilter<$PrismaModel> | $Enums.TipePoin
  }

  export type NestedEnumTipePoinWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TipePoin | EnumTipePoinFieldRefInput<$PrismaModel>
    in?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    notIn?: $Enums.TipePoin[] | ListEnumTipePoinFieldRefInput<$PrismaModel>
    not?: NestedEnumTipePoinWithAggregatesFilter<$PrismaModel> | $Enums.TipePoin
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTipePoinFilter<$PrismaModel>
    _max?: NestedEnumTipePoinFilter<$PrismaModel>
  }

  export type NestedEnumStatusKasusFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKasus | EnumStatusKasusFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKasusFilter<$PrismaModel> | $Enums.StatusKasus
  }

  export type NestedEnumStatusKasusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKasus | EnumStatusKasusFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKasus[] | ListEnumStatusKasusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKasusWithAggregatesFilter<$PrismaModel> | $Enums.StatusKasus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKasusFilter<$PrismaModel>
    _max?: NestedEnumStatusKasusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumStatusKunjunganFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKunjungan | EnumStatusKunjunganFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKunjunganFilter<$PrismaModel> | $Enums.StatusKunjungan
  }

  export type NestedEnumStatusKunjunganWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StatusKunjungan | EnumStatusKunjunganFieldRefInput<$PrismaModel>
    in?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    notIn?: $Enums.StatusKunjungan[] | ListEnumStatusKunjunganFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusKunjunganWithAggregatesFilter<$PrismaModel> | $Enums.StatusKunjungan
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusKunjunganFilter<$PrismaModel>
    _max?: NestedEnumStatusKunjunganFilter<$PrismaModel>
  }

  export type SessionCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SessionUncheckedCreateWithoutUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutUserInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionCreateManyUserInputEnvelope = {
    data: SessionCreateManyUserInput | SessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type SessionUpsertWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
    create: XOR<SessionCreateWithoutUserInput, SessionUncheckedCreateWithoutUserInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutUserInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutUserInput, SessionUncheckedUpdateWithoutUserInput>
  }

  export type SessionUpdateManyWithWhereWithoutUserInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutUserInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: StringFilter<"Session"> | string
    userId?: StringFilter<"Session"> | string
    token?: StringFilter<"Session"> | string
    expiresAt?: DateTimeFilter<"Session"> | Date | string
    ipAddress?: StringNullableFilter<"Session"> | string | null
    userAgent?: StringNullableFilter<"Session"> | string | null
    createdAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutSessionsInput = {
    id?: string
    userId: string
    nama: string
    password: string
    role: $Enums.UserRole
    kelas?: string | null
    isActive?: boolean
    displayPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: string
    userId: string
    nama: string
    password: string
    role: $Enums.UserRole
    kelas?: string | null
    isActive?: boolean
    displayPassword?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    kelas?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    displayPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    kelas?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    displayPassword?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiCreateWithoutSiswaInput = {
    id?: string
    tanggal: Date | string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang?: string | null
    jamPulang?: string | null
    jamSholat?: string | null
    status?: $Enums.StatusAbsensi
    keterangan?: string | null
    catatan?: string | null
    inputBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsensiUncheckedCreateWithoutSiswaInput = {
    id?: string
    tanggal: Date | string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang?: string | null
    jamPulang?: string | null
    jamSholat?: string | null
    status?: $Enums.StatusAbsensi
    keterangan?: string | null
    catatan?: string | null
    inputBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsensiCreateOrConnectWithoutSiswaInput = {
    where: AbsensiWhereUniqueInput
    create: XOR<AbsensiCreateWithoutSiswaInput, AbsensiUncheckedCreateWithoutSiswaInput>
  }

  export type AbsensiCreateManySiswaInputEnvelope = {
    data: AbsensiCreateManySiswaInput | AbsensiCreateManySiswaInput[]
    skipDuplicates?: boolean
  }

  export type PoinSiswaCreateWithoutSiswaInput = {
    id?: string
    tipe: $Enums.TipePoin
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    jenisPrestasi?: JenisPrestasiCreateNestedOneWithoutPoinListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutPoinListInput
  }

  export type PoinSiswaUncheckedCreateWithoutSiswaInput = {
    id?: string
    tipe: $Enums.TipePoin
    jenisPrestasiId?: string | null
    jenisPelanggaranId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaCreateOrConnectWithoutSiswaInput = {
    where: PoinSiswaWhereUniqueInput
    create: XOR<PoinSiswaCreateWithoutSiswaInput, PoinSiswaUncheckedCreateWithoutSiswaInput>
  }

  export type PoinSiswaCreateManySiswaInputEnvelope = {
    data: PoinSiswaCreateManySiswaInput | PoinSiswaCreateManySiswaInput[]
    skipDuplicates?: boolean
  }

  export type KasusSiswaCreateWithoutSiswaInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    jenisKasus?: JenisKasusCreateNestedOneWithoutKasusListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutKasusListInput
    laporanList?: LaporanKasusCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaUncheckedCreateWithoutSiswaInput = {
    id?: string
    nomor: string
    jenisKasusId?: string | null
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    laporanList?: LaporanKasusUncheckedCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaCreateOrConnectWithoutSiswaInput = {
    where: KasusSiswaWhereUniqueInput
    create: XOR<KasusSiswaCreateWithoutSiswaInput, KasusSiswaUncheckedCreateWithoutSiswaInput>
  }

  export type KasusSiswaCreateManySiswaInputEnvelope = {
    data: KasusSiswaCreateManySiswaInput | KasusSiswaCreateManySiswaInput[]
    skipDuplicates?: boolean
  }

  export type KunjunganRumahCreateWithoutSiswaInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    tujuan: string
    petugasBk?: string | null
    status?: $Enums.StatusKunjungan
    hasilKunjungan?: string | null
    catatan?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KunjunganRumahUncheckedCreateWithoutSiswaInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    tujuan: string
    petugasBk?: string | null
    status?: $Enums.StatusKunjungan
    hasilKunjungan?: string | null
    catatan?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KunjunganRumahCreateOrConnectWithoutSiswaInput = {
    where: KunjunganRumahWhereUniqueInput
    create: XOR<KunjunganRumahCreateWithoutSiswaInput, KunjunganRumahUncheckedCreateWithoutSiswaInput>
  }

  export type KunjunganRumahCreateManySiswaInputEnvelope = {
    data: KunjunganRumahCreateManySiswaInput | KunjunganRumahCreateManySiswaInput[]
    skipDuplicates?: boolean
  }

  export type AbsensiUpsertWithWhereUniqueWithoutSiswaInput = {
    where: AbsensiWhereUniqueInput
    update: XOR<AbsensiUpdateWithoutSiswaInput, AbsensiUncheckedUpdateWithoutSiswaInput>
    create: XOR<AbsensiCreateWithoutSiswaInput, AbsensiUncheckedCreateWithoutSiswaInput>
  }

  export type AbsensiUpdateWithWhereUniqueWithoutSiswaInput = {
    where: AbsensiWhereUniqueInput
    data: XOR<AbsensiUpdateWithoutSiswaInput, AbsensiUncheckedUpdateWithoutSiswaInput>
  }

  export type AbsensiUpdateManyWithWhereWithoutSiswaInput = {
    where: AbsensiScalarWhereInput
    data: XOR<AbsensiUpdateManyMutationInput, AbsensiUncheckedUpdateManyWithoutSiswaInput>
  }

  export type AbsensiScalarWhereInput = {
    AND?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
    OR?: AbsensiScalarWhereInput[]
    NOT?: AbsensiScalarWhereInput | AbsensiScalarWhereInput[]
    id?: StringFilter<"Absensi"> | string
    tanggal?: DateTimeFilter<"Absensi"> | Date | string
    siswaNisn?: StringFilter<"Absensi"> | string
    namaSnapshot?: StringFilter<"Absensi"> | string
    kelasSnapshot?: StringFilter<"Absensi"> | string
    jamDatang?: StringNullableFilter<"Absensi"> | string | null
    jamPulang?: StringNullableFilter<"Absensi"> | string | null
    jamSholat?: StringNullableFilter<"Absensi"> | string | null
    status?: EnumStatusAbsensiFilter<"Absensi"> | $Enums.StatusAbsensi
    keterangan?: StringNullableFilter<"Absensi"> | string | null
    catatan?: StringNullableFilter<"Absensi"> | string | null
    inputBy?: StringNullableFilter<"Absensi"> | string | null
    createdAt?: DateTimeFilter<"Absensi"> | Date | string
    updatedAt?: DateTimeFilter<"Absensi"> | Date | string
  }

  export type PoinSiswaUpsertWithWhereUniqueWithoutSiswaInput = {
    where: PoinSiswaWhereUniqueInput
    update: XOR<PoinSiswaUpdateWithoutSiswaInput, PoinSiswaUncheckedUpdateWithoutSiswaInput>
    create: XOR<PoinSiswaCreateWithoutSiswaInput, PoinSiswaUncheckedCreateWithoutSiswaInput>
  }

  export type PoinSiswaUpdateWithWhereUniqueWithoutSiswaInput = {
    where: PoinSiswaWhereUniqueInput
    data: XOR<PoinSiswaUpdateWithoutSiswaInput, PoinSiswaUncheckedUpdateWithoutSiswaInput>
  }

  export type PoinSiswaUpdateManyWithWhereWithoutSiswaInput = {
    where: PoinSiswaScalarWhereInput
    data: XOR<PoinSiswaUpdateManyMutationInput, PoinSiswaUncheckedUpdateManyWithoutSiswaInput>
  }

  export type PoinSiswaScalarWhereInput = {
    AND?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
    OR?: PoinSiswaScalarWhereInput[]
    NOT?: PoinSiswaScalarWhereInput | PoinSiswaScalarWhereInput[]
    id?: StringFilter<"PoinSiswa"> | string
    siswaNisn?: StringFilter<"PoinSiswa"> | string
    tipe?: EnumTipePoinFilter<"PoinSiswa"> | $Enums.TipePoin
    jenisPrestasiId?: StringNullableFilter<"PoinSiswa"> | string | null
    jenisPelanggaranId?: StringNullableFilter<"PoinSiswa"> | string | null
    poin?: IntFilter<"PoinSiswa"> | number
    deskripsi?: StringNullableFilter<"PoinSiswa"> | string | null
    tanggal?: DateTimeFilter<"PoinSiswa"> | Date | string
    tingkat?: StringNullableFilter<"PoinSiswa"> | string | null
    inputBy?: StringNullableFilter<"PoinSiswa"> | string | null
    dokumenUrl?: StringNullableFilter<"PoinSiswa"> | string | null
    createdAt?: DateTimeFilter<"PoinSiswa"> | Date | string
    updatedAt?: DateTimeFilter<"PoinSiswa"> | Date | string
  }

  export type KasusSiswaUpsertWithWhereUniqueWithoutSiswaInput = {
    where: KasusSiswaWhereUniqueInput
    update: XOR<KasusSiswaUpdateWithoutSiswaInput, KasusSiswaUncheckedUpdateWithoutSiswaInput>
    create: XOR<KasusSiswaCreateWithoutSiswaInput, KasusSiswaUncheckedCreateWithoutSiswaInput>
  }

  export type KasusSiswaUpdateWithWhereUniqueWithoutSiswaInput = {
    where: KasusSiswaWhereUniqueInput
    data: XOR<KasusSiswaUpdateWithoutSiswaInput, KasusSiswaUncheckedUpdateWithoutSiswaInput>
  }

  export type KasusSiswaUpdateManyWithWhereWithoutSiswaInput = {
    where: KasusSiswaScalarWhereInput
    data: XOR<KasusSiswaUpdateManyMutationInput, KasusSiswaUncheckedUpdateManyWithoutSiswaInput>
  }

  export type KasusSiswaScalarWhereInput = {
    AND?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
    OR?: KasusSiswaScalarWhereInput[]
    NOT?: KasusSiswaScalarWhereInput | KasusSiswaScalarWhereInput[]
    id?: StringFilter<"KasusSiswa"> | string
    nomor?: StringFilter<"KasusSiswa"> | string
    siswaNisn?: StringFilter<"KasusSiswa"> | string
    jenisKasusId?: StringNullableFilter<"KasusSiswa"> | string | null
    jenisPelanggaranId?: StringNullableFilter<"KasusSiswa"> | string | null
    tanggal?: DateTimeFilter<"KasusSiswa"> | Date | string
    deskripsi?: StringFilter<"KasusSiswa"> | string
    status?: EnumStatusKasusFilter<"KasusSiswa"> | $Enums.StatusKasus
    penanganan?: StringNullableFilter<"KasusSiswa"> | string | null
    catatan?: StringNullableFilter<"KasusSiswa"> | string | null
    inputBy?: StringNullableFilter<"KasusSiswa"> | string | null
    dokumenList?: JsonNullableFilter<"KasusSiswa">
    createdAt?: DateTimeFilter<"KasusSiswa"> | Date | string
    updatedAt?: DateTimeFilter<"KasusSiswa"> | Date | string
  }

  export type KunjunganRumahUpsertWithWhereUniqueWithoutSiswaInput = {
    where: KunjunganRumahWhereUniqueInput
    update: XOR<KunjunganRumahUpdateWithoutSiswaInput, KunjunganRumahUncheckedUpdateWithoutSiswaInput>
    create: XOR<KunjunganRumahCreateWithoutSiswaInput, KunjunganRumahUncheckedCreateWithoutSiswaInput>
  }

  export type KunjunganRumahUpdateWithWhereUniqueWithoutSiswaInput = {
    where: KunjunganRumahWhereUniqueInput
    data: XOR<KunjunganRumahUpdateWithoutSiswaInput, KunjunganRumahUncheckedUpdateWithoutSiswaInput>
  }

  export type KunjunganRumahUpdateManyWithWhereWithoutSiswaInput = {
    where: KunjunganRumahScalarWhereInput
    data: XOR<KunjunganRumahUpdateManyMutationInput, KunjunganRumahUncheckedUpdateManyWithoutSiswaInput>
  }

  export type KunjunganRumahScalarWhereInput = {
    AND?: KunjunganRumahScalarWhereInput | KunjunganRumahScalarWhereInput[]
    OR?: KunjunganRumahScalarWhereInput[]
    NOT?: KunjunganRumahScalarWhereInput | KunjunganRumahScalarWhereInput[]
    id?: StringFilter<"KunjunganRumah"> | string
    nomor?: StringFilter<"KunjunganRumah"> | string
    siswaNisn?: StringFilter<"KunjunganRumah"> | string
    tanggal?: DateTimeFilter<"KunjunganRumah"> | Date | string
    tujuan?: StringFilter<"KunjunganRumah"> | string
    petugasBk?: StringNullableFilter<"KunjunganRumah"> | string | null
    status?: EnumStatusKunjunganFilter<"KunjunganRumah"> | $Enums.StatusKunjungan
    hasilKunjungan?: StringNullableFilter<"KunjunganRumah"> | string | null
    catatan?: StringNullableFilter<"KunjunganRumah"> | string | null
    dokumenList?: JsonNullableFilter<"KunjunganRumah">
    createdAt?: DateTimeFilter<"KunjunganRumah"> | Date | string
    updatedAt?: DateTimeFilter<"KunjunganRumah"> | Date | string
  }

  export type SiswaCreateWithoutAbsensiListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutAbsensiListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutAbsensiListInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutAbsensiListInput, SiswaUncheckedCreateWithoutAbsensiListInput>
  }

  export type SiswaUpsertWithoutAbsensiListInput = {
    update: XOR<SiswaUpdateWithoutAbsensiListInput, SiswaUncheckedUpdateWithoutAbsensiListInput>
    create: XOR<SiswaCreateWithoutAbsensiListInput, SiswaUncheckedCreateWithoutAbsensiListInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutAbsensiListInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutAbsensiListInput, SiswaUncheckedUpdateWithoutAbsensiListInput>
  }

  export type SiswaUpdateWithoutAbsensiListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutAbsensiListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type PoinSiswaCreateWithoutJenisPelanggaranInput = {
    id?: string
    tipe: $Enums.TipePoin
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutPoinListInput
    jenisPrestasi?: JenisPrestasiCreateNestedOneWithoutPoinListInput
  }

  export type PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput = {
    id?: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPrestasiId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaCreateOrConnectWithoutJenisPelanggaranInput = {
    where: PoinSiswaWhereUniqueInput
    create: XOR<PoinSiswaCreateWithoutJenisPelanggaranInput, PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput>
  }

  export type PoinSiswaCreateManyJenisPelanggaranInputEnvelope = {
    data: PoinSiswaCreateManyJenisPelanggaranInput | PoinSiswaCreateManyJenisPelanggaranInput[]
    skipDuplicates?: boolean
  }

  export type KasusSiswaCreateWithoutJenisPelanggaranInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutKasusListInput
    jenisKasus?: JenisKasusCreateNestedOneWithoutKasusListInput
    laporanList?: LaporanKasusCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisKasusId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    laporanList?: LaporanKasusUncheckedCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaCreateOrConnectWithoutJenisPelanggaranInput = {
    where: KasusSiswaWhereUniqueInput
    create: XOR<KasusSiswaCreateWithoutJenisPelanggaranInput, KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput>
  }

  export type KasusSiswaCreateManyJenisPelanggaranInputEnvelope = {
    data: KasusSiswaCreateManyJenisPelanggaranInput | KasusSiswaCreateManyJenisPelanggaranInput[]
    skipDuplicates?: boolean
  }

  export type PoinSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput = {
    where: PoinSiswaWhereUniqueInput
    update: XOR<PoinSiswaUpdateWithoutJenisPelanggaranInput, PoinSiswaUncheckedUpdateWithoutJenisPelanggaranInput>
    create: XOR<PoinSiswaCreateWithoutJenisPelanggaranInput, PoinSiswaUncheckedCreateWithoutJenisPelanggaranInput>
  }

  export type PoinSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput = {
    where: PoinSiswaWhereUniqueInput
    data: XOR<PoinSiswaUpdateWithoutJenisPelanggaranInput, PoinSiswaUncheckedUpdateWithoutJenisPelanggaranInput>
  }

  export type PoinSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput = {
    where: PoinSiswaScalarWhereInput
    data: XOR<PoinSiswaUpdateManyMutationInput, PoinSiswaUncheckedUpdateManyWithoutJenisPelanggaranInput>
  }

  export type KasusSiswaUpsertWithWhereUniqueWithoutJenisPelanggaranInput = {
    where: KasusSiswaWhereUniqueInput
    update: XOR<KasusSiswaUpdateWithoutJenisPelanggaranInput, KasusSiswaUncheckedUpdateWithoutJenisPelanggaranInput>
    create: XOR<KasusSiswaCreateWithoutJenisPelanggaranInput, KasusSiswaUncheckedCreateWithoutJenisPelanggaranInput>
  }

  export type KasusSiswaUpdateWithWhereUniqueWithoutJenisPelanggaranInput = {
    where: KasusSiswaWhereUniqueInput
    data: XOR<KasusSiswaUpdateWithoutJenisPelanggaranInput, KasusSiswaUncheckedUpdateWithoutJenisPelanggaranInput>
  }

  export type KasusSiswaUpdateManyWithWhereWithoutJenisPelanggaranInput = {
    where: KasusSiswaScalarWhereInput
    data: XOR<KasusSiswaUpdateManyMutationInput, KasusSiswaUncheckedUpdateManyWithoutJenisPelanggaranInput>
  }

  export type PoinSiswaCreateWithoutJenisPrestasiInput = {
    id?: string
    tipe: $Enums.TipePoin
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutPoinListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutPoinListInput
  }

  export type PoinSiswaUncheckedCreateWithoutJenisPrestasiInput = {
    id?: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPelanggaranId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaCreateOrConnectWithoutJenisPrestasiInput = {
    where: PoinSiswaWhereUniqueInput
    create: XOR<PoinSiswaCreateWithoutJenisPrestasiInput, PoinSiswaUncheckedCreateWithoutJenisPrestasiInput>
  }

  export type PoinSiswaCreateManyJenisPrestasiInputEnvelope = {
    data: PoinSiswaCreateManyJenisPrestasiInput | PoinSiswaCreateManyJenisPrestasiInput[]
    skipDuplicates?: boolean
  }

  export type PoinSiswaUpsertWithWhereUniqueWithoutJenisPrestasiInput = {
    where: PoinSiswaWhereUniqueInput
    update: XOR<PoinSiswaUpdateWithoutJenisPrestasiInput, PoinSiswaUncheckedUpdateWithoutJenisPrestasiInput>
    create: XOR<PoinSiswaCreateWithoutJenisPrestasiInput, PoinSiswaUncheckedCreateWithoutJenisPrestasiInput>
  }

  export type PoinSiswaUpdateWithWhereUniqueWithoutJenisPrestasiInput = {
    where: PoinSiswaWhereUniqueInput
    data: XOR<PoinSiswaUpdateWithoutJenisPrestasiInput, PoinSiswaUncheckedUpdateWithoutJenisPrestasiInput>
  }

  export type PoinSiswaUpdateManyWithWhereWithoutJenisPrestasiInput = {
    where: PoinSiswaScalarWhereInput
    data: XOR<PoinSiswaUpdateManyMutationInput, PoinSiswaUncheckedUpdateManyWithoutJenisPrestasiInput>
  }

  export type KasusSiswaCreateWithoutJenisKasusInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutKasusListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutKasusListInput
    laporanList?: LaporanKasusCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaUncheckedCreateWithoutJenisKasusInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    laporanList?: LaporanKasusUncheckedCreateNestedManyWithoutKasusInput
  }

  export type KasusSiswaCreateOrConnectWithoutJenisKasusInput = {
    where: KasusSiswaWhereUniqueInput
    create: XOR<KasusSiswaCreateWithoutJenisKasusInput, KasusSiswaUncheckedCreateWithoutJenisKasusInput>
  }

  export type KasusSiswaCreateManyJenisKasusInputEnvelope = {
    data: KasusSiswaCreateManyJenisKasusInput | KasusSiswaCreateManyJenisKasusInput[]
    skipDuplicates?: boolean
  }

  export type KasusSiswaUpsertWithWhereUniqueWithoutJenisKasusInput = {
    where: KasusSiswaWhereUniqueInput
    update: XOR<KasusSiswaUpdateWithoutJenisKasusInput, KasusSiswaUncheckedUpdateWithoutJenisKasusInput>
    create: XOR<KasusSiswaCreateWithoutJenisKasusInput, KasusSiswaUncheckedCreateWithoutJenisKasusInput>
  }

  export type KasusSiswaUpdateWithWhereUniqueWithoutJenisKasusInput = {
    where: KasusSiswaWhereUniqueInput
    data: XOR<KasusSiswaUpdateWithoutJenisKasusInput, KasusSiswaUncheckedUpdateWithoutJenisKasusInput>
  }

  export type KasusSiswaUpdateManyWithWhereWithoutJenisKasusInput = {
    where: KasusSiswaScalarWhereInput
    data: XOR<KasusSiswaUpdateManyMutationInput, KasusSiswaUncheckedUpdateManyWithoutJenisKasusInput>
  }

  export type SiswaCreateWithoutPoinListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutPoinListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiUncheckedCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutPoinListInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutPoinListInput, SiswaUncheckedCreateWithoutPoinListInput>
  }

  export type JenisPrestasiCreateWithoutPoinListInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPrestasi
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisPrestasiUncheckedCreateWithoutPoinListInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPrestasi
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisPrestasiCreateOrConnectWithoutPoinListInput = {
    where: JenisPrestasiWhereUniqueInput
    create: XOR<JenisPrestasiCreateWithoutPoinListInput, JenisPrestasiUncheckedCreateWithoutPoinListInput>
  }

  export type JenisPelanggaranCreateWithoutPoinListInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    kasusList?: KasusSiswaCreateNestedManyWithoutJenisPelanggaranInput
  }

  export type JenisPelanggaranUncheckedCreateWithoutPoinListInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutJenisPelanggaranInput
  }

  export type JenisPelanggaranCreateOrConnectWithoutPoinListInput = {
    where: JenisPelanggaranWhereUniqueInput
    create: XOR<JenisPelanggaranCreateWithoutPoinListInput, JenisPelanggaranUncheckedCreateWithoutPoinListInput>
  }

  export type SiswaUpsertWithoutPoinListInput = {
    update: XOR<SiswaUpdateWithoutPoinListInput, SiswaUncheckedUpdateWithoutPoinListInput>
    create: XOR<SiswaCreateWithoutPoinListInput, SiswaUncheckedCreateWithoutPoinListInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutPoinListInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutPoinListInput, SiswaUncheckedUpdateWithoutPoinListInput>
  }

  export type SiswaUpdateWithoutPoinListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutPoinListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUncheckedUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type JenisPrestasiUpsertWithoutPoinListInput = {
    update: XOR<JenisPrestasiUpdateWithoutPoinListInput, JenisPrestasiUncheckedUpdateWithoutPoinListInput>
    create: XOR<JenisPrestasiCreateWithoutPoinListInput, JenisPrestasiUncheckedCreateWithoutPoinListInput>
    where?: JenisPrestasiWhereInput
  }

  export type JenisPrestasiUpdateToOneWithWhereWithoutPoinListInput = {
    where?: JenisPrestasiWhereInput
    data: XOR<JenisPrestasiUpdateWithoutPoinListInput, JenisPrestasiUncheckedUpdateWithoutPoinListInput>
  }

  export type JenisPrestasiUpdateWithoutPoinListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPrestasiFieldUpdateOperationsInput | $Enums.KategoriPrestasi
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPrestasiUncheckedUpdateWithoutPoinListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPrestasiFieldUpdateOperationsInput | $Enums.KategoriPrestasi
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPelanggaranUpsertWithoutPoinListInput = {
    update: XOR<JenisPelanggaranUpdateWithoutPoinListInput, JenisPelanggaranUncheckedUpdateWithoutPoinListInput>
    create: XOR<JenisPelanggaranCreateWithoutPoinListInput, JenisPelanggaranUncheckedCreateWithoutPoinListInput>
    where?: JenisPelanggaranWhereInput
  }

  export type JenisPelanggaranUpdateToOneWithWhereWithoutPoinListInput = {
    where?: JenisPelanggaranWhereInput
    data: XOR<JenisPelanggaranUpdateWithoutPoinListInput, JenisPelanggaranUncheckedUpdateWithoutPoinListInput>
  }

  export type JenisPelanggaranUpdateWithoutPoinListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kasusList?: KasusSiswaUpdateManyWithoutJenisPelanggaranNestedInput
  }

  export type JenisPelanggaranUncheckedUpdateWithoutPoinListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutJenisPelanggaranNestedInput
  }

  export type SiswaCreateWithoutKasusListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiCreateNestedManyWithoutSiswaInput
    poinList?: PoinSiswaCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutKasusListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiUncheckedCreateNestedManyWithoutSiswaInput
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kunjunganList?: KunjunganRumahUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutKasusListInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutKasusListInput, SiswaUncheckedCreateWithoutKasusListInput>
  }

  export type JenisKasusCreateWithoutKasusListInput = {
    id?: string
    kode: string
    nama: string
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisKasusUncheckedCreateWithoutKasusListInput = {
    id?: string
    kode: string
    nama: string
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type JenisKasusCreateOrConnectWithoutKasusListInput = {
    where: JenisKasusWhereUniqueInput
    create: XOR<JenisKasusCreateWithoutKasusListInput, JenisKasusUncheckedCreateWithoutKasusListInput>
  }

  export type JenisPelanggaranCreateWithoutKasusListInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaCreateNestedManyWithoutJenisPelanggaranInput
  }

  export type JenisPelanggaranUncheckedCreateWithoutKasusListInput = {
    id?: string
    kode: string
    nama: string
    kategori?: $Enums.KategoriPelanggaran
    poin?: number
    deskripsi?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutJenisPelanggaranInput
  }

  export type JenisPelanggaranCreateOrConnectWithoutKasusListInput = {
    where: JenisPelanggaranWhereUniqueInput
    create: XOR<JenisPelanggaranCreateWithoutKasusListInput, JenisPelanggaranUncheckedCreateWithoutKasusListInput>
  }

  export type LaporanKasusCreateWithoutKasusInput = {
    id?: string
    tanggal: Date | string
    catatan: string
    status: $Enums.StatusKasus
    inputBy?: string | null
    createdAt?: Date | string
  }

  export type LaporanKasusUncheckedCreateWithoutKasusInput = {
    id?: string
    tanggal: Date | string
    catatan: string
    status: $Enums.StatusKasus
    inputBy?: string | null
    createdAt?: Date | string
  }

  export type LaporanKasusCreateOrConnectWithoutKasusInput = {
    where: LaporanKasusWhereUniqueInput
    create: XOR<LaporanKasusCreateWithoutKasusInput, LaporanKasusUncheckedCreateWithoutKasusInput>
  }

  export type LaporanKasusCreateManyKasusInputEnvelope = {
    data: LaporanKasusCreateManyKasusInput | LaporanKasusCreateManyKasusInput[]
    skipDuplicates?: boolean
  }

  export type SiswaUpsertWithoutKasusListInput = {
    update: XOR<SiswaUpdateWithoutKasusListInput, SiswaUncheckedUpdateWithoutKasusListInput>
    create: XOR<SiswaCreateWithoutKasusListInput, SiswaUncheckedCreateWithoutKasusListInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutKasusListInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutKasusListInput, SiswaUncheckedUpdateWithoutKasusListInput>
  }

  export type SiswaUpdateWithoutKasusListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUpdateManyWithoutSiswaNestedInput
    poinList?: PoinSiswaUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutKasusListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUncheckedUpdateManyWithoutSiswaNestedInput
    poinList?: PoinSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kunjunganList?: KunjunganRumahUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type JenisKasusUpsertWithoutKasusListInput = {
    update: XOR<JenisKasusUpdateWithoutKasusListInput, JenisKasusUncheckedUpdateWithoutKasusListInput>
    create: XOR<JenisKasusCreateWithoutKasusListInput, JenisKasusUncheckedCreateWithoutKasusListInput>
    where?: JenisKasusWhereInput
  }

  export type JenisKasusUpdateToOneWithWhereWithoutKasusListInput = {
    where?: JenisKasusWhereInput
    data: XOR<JenisKasusUpdateWithoutKasusListInput, JenisKasusUncheckedUpdateWithoutKasusListInput>
  }

  export type JenisKasusUpdateWithoutKasusListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisKasusUncheckedUpdateWithoutKasusListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type JenisPelanggaranUpsertWithoutKasusListInput = {
    update: XOR<JenisPelanggaranUpdateWithoutKasusListInput, JenisPelanggaranUncheckedUpdateWithoutKasusListInput>
    create: XOR<JenisPelanggaranCreateWithoutKasusListInput, JenisPelanggaranUncheckedCreateWithoutKasusListInput>
    where?: JenisPelanggaranWhereInput
  }

  export type JenisPelanggaranUpdateToOneWithWhereWithoutKasusListInput = {
    where?: JenisPelanggaranWhereInput
    data: XOR<JenisPelanggaranUpdateWithoutKasusListInput, JenisPelanggaranUncheckedUpdateWithoutKasusListInput>
  }

  export type JenisPelanggaranUpdateWithoutKasusListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUpdateManyWithoutJenisPelanggaranNestedInput
  }

  export type JenisPelanggaranUncheckedUpdateWithoutKasusListInput = {
    id?: StringFieldUpdateOperationsInput | string
    kode?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    kategori?: EnumKategoriPelanggaranFieldUpdateOperationsInput | $Enums.KategoriPelanggaran
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poinList?: PoinSiswaUncheckedUpdateManyWithoutJenisPelanggaranNestedInput
  }

  export type LaporanKasusUpsertWithWhereUniqueWithoutKasusInput = {
    where: LaporanKasusWhereUniqueInput
    update: XOR<LaporanKasusUpdateWithoutKasusInput, LaporanKasusUncheckedUpdateWithoutKasusInput>
    create: XOR<LaporanKasusCreateWithoutKasusInput, LaporanKasusUncheckedCreateWithoutKasusInput>
  }

  export type LaporanKasusUpdateWithWhereUniqueWithoutKasusInput = {
    where: LaporanKasusWhereUniqueInput
    data: XOR<LaporanKasusUpdateWithoutKasusInput, LaporanKasusUncheckedUpdateWithoutKasusInput>
  }

  export type LaporanKasusUpdateManyWithWhereWithoutKasusInput = {
    where: LaporanKasusScalarWhereInput
    data: XOR<LaporanKasusUpdateManyMutationInput, LaporanKasusUncheckedUpdateManyWithoutKasusInput>
  }

  export type LaporanKasusScalarWhereInput = {
    AND?: LaporanKasusScalarWhereInput | LaporanKasusScalarWhereInput[]
    OR?: LaporanKasusScalarWhereInput[]
    NOT?: LaporanKasusScalarWhereInput | LaporanKasusScalarWhereInput[]
    id?: StringFilter<"LaporanKasus"> | string
    kasusId?: StringFilter<"LaporanKasus"> | string
    tanggal?: DateTimeFilter<"LaporanKasus"> | Date | string
    catatan?: StringFilter<"LaporanKasus"> | string
    status?: EnumStatusKasusFilter<"LaporanKasus"> | $Enums.StatusKasus
    inputBy?: StringNullableFilter<"LaporanKasus"> | string | null
    createdAt?: DateTimeFilter<"LaporanKasus"> | Date | string
  }

  export type KasusSiswaCreateWithoutLaporanListInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    siswa: SiswaCreateNestedOneWithoutKasusListInput
    jenisKasus?: JenisKasusCreateNestedOneWithoutKasusListInput
    jenisPelanggaran?: JenisPelanggaranCreateNestedOneWithoutKasusListInput
  }

  export type KasusSiswaUncheckedCreateWithoutLaporanListInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisKasusId?: string | null
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KasusSiswaCreateOrConnectWithoutLaporanListInput = {
    where: KasusSiswaWhereUniqueInput
    create: XOR<KasusSiswaCreateWithoutLaporanListInput, KasusSiswaUncheckedCreateWithoutLaporanListInput>
  }

  export type KasusSiswaUpsertWithoutLaporanListInput = {
    update: XOR<KasusSiswaUpdateWithoutLaporanListInput, KasusSiswaUncheckedUpdateWithoutLaporanListInput>
    create: XOR<KasusSiswaCreateWithoutLaporanListInput, KasusSiswaUncheckedCreateWithoutLaporanListInput>
    where?: KasusSiswaWhereInput
  }

  export type KasusSiswaUpdateToOneWithWhereWithoutLaporanListInput = {
    where?: KasusSiswaWhereInput
    data: XOR<KasusSiswaUpdateWithoutLaporanListInput, KasusSiswaUncheckedUpdateWithoutLaporanListInput>
  }

  export type KasusSiswaUpdateWithoutLaporanListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutKasusListNestedInput
    jenisKasus?: JenisKasusUpdateOneWithoutKasusListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutKasusListNestedInput
  }

  export type KasusSiswaUncheckedUpdateWithoutLaporanListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SiswaCreateWithoutKunjunganListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiCreateNestedManyWithoutSiswaInput
    poinList?: PoinSiswaCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaCreateNestedManyWithoutSiswaInput
  }

  export type SiswaUncheckedCreateWithoutKunjunganListInput = {
    id?: string
    nisn: string
    nama: string
    jenisKelamin: string
    tanggalLahir?: Date | string | null
    agama?: string | null
    namaAyah?: string | null
    namaIbu?: string | null
    noHp?: string | null
    kelas: string
    alamat?: string | null
    fotoUrl?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    absensiList?: AbsensiUncheckedCreateNestedManyWithoutSiswaInput
    poinList?: PoinSiswaUncheckedCreateNestedManyWithoutSiswaInput
    kasusList?: KasusSiswaUncheckedCreateNestedManyWithoutSiswaInput
  }

  export type SiswaCreateOrConnectWithoutKunjunganListInput = {
    where: SiswaWhereUniqueInput
    create: XOR<SiswaCreateWithoutKunjunganListInput, SiswaUncheckedCreateWithoutKunjunganListInput>
  }

  export type SiswaUpsertWithoutKunjunganListInput = {
    update: XOR<SiswaUpdateWithoutKunjunganListInput, SiswaUncheckedUpdateWithoutKunjunganListInput>
    create: XOR<SiswaCreateWithoutKunjunganListInput, SiswaUncheckedCreateWithoutKunjunganListInput>
    where?: SiswaWhereInput
  }

  export type SiswaUpdateToOneWithWhereWithoutKunjunganListInput = {
    where?: SiswaWhereInput
    data: XOR<SiswaUpdateWithoutKunjunganListInput, SiswaUncheckedUpdateWithoutKunjunganListInput>
  }

  export type SiswaUpdateWithoutKunjunganListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUpdateManyWithoutSiswaNestedInput
    poinList?: PoinSiswaUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUpdateManyWithoutSiswaNestedInput
  }

  export type SiswaUncheckedUpdateWithoutKunjunganListInput = {
    id?: StringFieldUpdateOperationsInput | string
    nisn?: StringFieldUpdateOperationsInput | string
    nama?: StringFieldUpdateOperationsInput | string
    jenisKelamin?: StringFieldUpdateOperationsInput | string
    tanggalLahir?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    agama?: NullableStringFieldUpdateOperationsInput | string | null
    namaAyah?: NullableStringFieldUpdateOperationsInput | string | null
    namaIbu?: NullableStringFieldUpdateOperationsInput | string | null
    noHp?: NullableStringFieldUpdateOperationsInput | string | null
    kelas?: StringFieldUpdateOperationsInput | string
    alamat?: NullableStringFieldUpdateOperationsInput | string | null
    fotoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absensiList?: AbsensiUncheckedUpdateManyWithoutSiswaNestedInput
    poinList?: PoinSiswaUncheckedUpdateManyWithoutSiswaNestedInput
    kasusList?: KasusSiswaUncheckedUpdateManyWithoutSiswaNestedInput
  }

  export type SessionCreateManyUserInput = {
    id?: string
    token: string
    expiresAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    createdAt?: Date | string
  }

  export type SessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiCreateManySiswaInput = {
    id?: string
    tanggal: Date | string
    namaSnapshot: string
    kelasSnapshot: string
    jamDatang?: string | null
    jamPulang?: string | null
    jamSholat?: string | null
    status?: $Enums.StatusAbsensi
    keterangan?: string | null
    catatan?: string | null
    inputBy?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaCreateManySiswaInput = {
    id?: string
    tipe: $Enums.TipePoin
    jenisPrestasiId?: string | null
    jenisPelanggaranId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KasusSiswaCreateManySiswaInput = {
    id?: string
    nomor: string
    jenisKasusId?: string | null
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KunjunganRumahCreateManySiswaInput = {
    id?: string
    nomor: string
    tanggal: Date | string
    tujuan: string
    petugasBk?: string | null
    status?: $Enums.StatusKunjungan
    hasilKunjungan?: string | null
    catatan?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsensiUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsensiUncheckedUpdateManyWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    namaSnapshot?: StringFieldUpdateOperationsInput | string
    kelasSnapshot?: StringFieldUpdateOperationsInput | string
    jamDatang?: NullableStringFieldUpdateOperationsInput | string | null
    jamPulang?: NullableStringFieldUpdateOperationsInput | string | null
    jamSholat?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusAbsensiFieldUpdateOperationsInput | $Enums.StatusAbsensi
    keterangan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisPrestasi?: JenisPrestasiUpdateOneWithoutPoinListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutPoinListNestedInput
  }

  export type PoinSiswaUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPrestasiId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaUncheckedUpdateManyWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPrestasiId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KasusSiswaUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    jenisKasus?: JenisKasusUpdateOneWithoutKasusListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutKasusListNestedInput
    laporanList?: LaporanKasusUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    laporanList?: LaporanKasusUncheckedUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateManyWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KunjunganRumahUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KunjunganRumahUncheckedUpdateWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KunjunganRumahUncheckedUpdateManyWithoutSiswaInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tujuan?: StringFieldUpdateOperationsInput | string
    petugasBk?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumStatusKunjunganFieldUpdateOperationsInput | $Enums.StatusKunjungan
    hasilKunjungan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaCreateManyJenisPelanggaranInput = {
    id?: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPrestasiId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KasusSiswaCreateManyJenisPelanggaranInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisKasusId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaUpdateWithoutJenisPelanggaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutPoinListNestedInput
    jenisPrestasi?: JenisPrestasiUpdateOneWithoutPoinListNestedInput
  }

  export type PoinSiswaUncheckedUpdateWithoutJenisPelanggaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPrestasiId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaUncheckedUpdateManyWithoutJenisPelanggaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPrestasiId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KasusSiswaUpdateWithoutJenisPelanggaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutKasusListNestedInput
    jenisKasus?: JenisKasusUpdateOneWithoutKasusListNestedInput
    laporanList?: LaporanKasusUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateWithoutJenisPelanggaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    laporanList?: LaporanKasusUncheckedUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateManyWithoutJenisPelanggaranInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisKasusId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaCreateManyJenisPrestasiInput = {
    id?: string
    siswaNisn: string
    tipe: $Enums.TipePoin
    jenisPelanggaranId?: string | null
    poin: number
    deskripsi?: string | null
    tanggal: Date | string
    tingkat?: string | null
    inputBy?: string | null
    dokumenUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PoinSiswaUpdateWithoutJenisPrestasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutPoinListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutPoinListNestedInput
  }

  export type PoinSiswaUncheckedUpdateWithoutJenisPrestasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PoinSiswaUncheckedUpdateManyWithoutJenisPrestasiInput = {
    id?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    tipe?: EnumTipePoinFieldUpdateOperationsInput | $Enums.TipePoin
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    poin?: IntFieldUpdateOperationsInput | number
    deskripsi?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    tingkat?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type KasusSiswaCreateManyJenisKasusInput = {
    id?: string
    nomor: string
    siswaNisn: string
    jenisPelanggaranId?: string | null
    tanggal: Date | string
    deskripsi: string
    status?: $Enums.StatusKasus
    penanganan?: string | null
    catatan?: string | null
    inputBy?: string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type KasusSiswaUpdateWithoutJenisKasusInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    siswa?: SiswaUpdateOneRequiredWithoutKasusListNestedInput
    jenisPelanggaran?: JenisPelanggaranUpdateOneWithoutKasusListNestedInput
    laporanList?: LaporanKasusUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateWithoutJenisKasusInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    laporanList?: LaporanKasusUncheckedUpdateManyWithoutKasusNestedInput
  }

  export type KasusSiswaUncheckedUpdateManyWithoutJenisKasusInput = {
    id?: StringFieldUpdateOperationsInput | string
    nomor?: StringFieldUpdateOperationsInput | string
    siswaNisn?: StringFieldUpdateOperationsInput | string
    jenisPelanggaranId?: NullableStringFieldUpdateOperationsInput | string | null
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    deskripsi?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    penanganan?: NullableStringFieldUpdateOperationsInput | string | null
    catatan?: NullableStringFieldUpdateOperationsInput | string | null
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    dokumenList?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaporanKasusCreateManyKasusInput = {
    id?: string
    tanggal: Date | string
    catatan: string
    status: $Enums.StatusKasus
    inputBy?: string | null
    createdAt?: Date | string
  }

  export type LaporanKasusUpdateWithoutKasusInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaporanKasusUncheckedUpdateWithoutKasusInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LaporanKasusUncheckedUpdateManyWithoutKasusInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggal?: DateTimeFieldUpdateOperationsInput | Date | string
    catatan?: StringFieldUpdateOperationsInput | string
    status?: EnumStatusKasusFieldUpdateOperationsInput | $Enums.StatusKasus
    inputBy?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiswaCountOutputTypeDefaultArgs instead
     */
    export type SiswaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiswaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JenisPelanggaranCountOutputTypeDefaultArgs instead
     */
    export type JenisPelanggaranCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JenisPelanggaranCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JenisPrestasiCountOutputTypeDefaultArgs instead
     */
    export type JenisPrestasiCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JenisPrestasiCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JenisKasusCountOutputTypeDefaultArgs instead
     */
    export type JenisKasusCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JenisKasusCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KasusSiswaCountOutputTypeDefaultArgs instead
     */
    export type KasusSiswaCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KasusSiswaCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SessionDefaultArgs instead
     */
    export type SessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SessionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SiswaDefaultArgs instead
     */
    export type SiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SiswaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AbsensiDefaultArgs instead
     */
    export type AbsensiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AbsensiDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HariLiburDefaultArgs instead
     */
    export type HariLiburArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HariLiburDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AppConfigDefaultArgs instead
     */
    export type AppConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AppConfigDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JenisPelanggaranDefaultArgs instead
     */
    export type JenisPelanggaranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JenisPelanggaranDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JenisPrestasiDefaultArgs instead
     */
    export type JenisPrestasiArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JenisPrestasiDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JenisKasusDefaultArgs instead
     */
    export type JenisKasusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JenisKasusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PoinSiswaDefaultArgs instead
     */
    export type PoinSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PoinSiswaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KasusSiswaDefaultArgs instead
     */
    export type KasusSiswaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KasusSiswaDefaultArgs<ExtArgs>
    /**
     * @deprecated Use LaporanKasusDefaultArgs instead
     */
    export type LaporanKasusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = LaporanKasusDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KunjunganRumahDefaultArgs instead
     */
    export type KunjunganRumahArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KunjunganRumahDefaultArgs<ExtArgs>
    /**
     * @deprecated Use KelasDefaultArgs instead
     */
    export type KelasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = KelasDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MapelDefaultArgs instead
     */
    export type MapelArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MapelDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}