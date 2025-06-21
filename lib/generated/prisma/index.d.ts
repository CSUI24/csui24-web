
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
 * Model Menfess
 * 
 */
export type Menfess = $Result.DefaultSelection<Prisma.$MenfessPayload>
/**
 * Model Reaction
 * 
 */
export type Reaction = $Result.DefaultSelection<Prisma.$ReactionPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Menfesses
 * const menfesses = await prisma.menfess.findMany()
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
   * // Fetch zero or more Menfesses
   * const menfesses = await prisma.menfess.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.menfess`: Exposes CRUD operations for the **Menfess** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Menfesses
    * const menfesses = await prisma.menfess.findMany()
    * ```
    */
  get menfess(): Prisma.MenfessDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reaction`: Exposes CRUD operations for the **Reaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reactions
    * const reactions = await prisma.reaction.findMany()
    * ```
    */
  get reaction(): Prisma.ReactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    Menfess: 'Menfess',
    Reaction: 'Reaction',
    Comment: 'Comment'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "menfess" | "reaction" | "comment"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Menfess: {
        payload: Prisma.$MenfessPayload<ExtArgs>
        fields: Prisma.MenfessFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenfessFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenfessFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>
          }
          findFirst: {
            args: Prisma.MenfessFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenfessFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>
          }
          findMany: {
            args: Prisma.MenfessFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>[]
          }
          create: {
            args: Prisma.MenfessCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>
          }
          createMany: {
            args: Prisma.MenfessCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenfessCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>[]
          }
          delete: {
            args: Prisma.MenfessDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>
          }
          update: {
            args: Prisma.MenfessUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>
          }
          deleteMany: {
            args: Prisma.MenfessDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenfessUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MenfessUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>[]
          }
          upsert: {
            args: Prisma.MenfessUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenfessPayload>
          }
          aggregate: {
            args: Prisma.MenfessAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenfess>
          }
          groupBy: {
            args: Prisma.MenfessGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenfessGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenfessCountArgs<ExtArgs>
            result: $Utils.Optional<MenfessCountAggregateOutputType> | number
          }
        }
      }
      Reaction: {
        payload: Prisma.$ReactionPayload<ExtArgs>
        fields: Prisma.ReactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          findFirst: {
            args: Prisma.ReactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          findMany: {
            args: Prisma.ReactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          create: {
            args: Prisma.ReactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          createMany: {
            args: Prisma.ReactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          delete: {
            args: Prisma.ReactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          update: {
            args: Prisma.ReactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          deleteMany: {
            args: Prisma.ReactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>[]
          }
          upsert: {
            args: Prisma.ReactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReactionPayload>
          }
          aggregate: {
            args: Prisma.ReactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReaction>
          }
          groupBy: {
            args: Prisma.ReactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReactionCountArgs<ExtArgs>
            result: $Utils.Optional<ReactionCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CommentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
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
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    menfess?: MenfessOmit
    reaction?: ReactionOmit
    comment?: CommentOmit
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
    | 'updateManyAndReturn'
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
   * Count Type MenfessCountOutputType
   */

  export type MenfessCountOutputType = {
    reactions: number
    comments: number
  }

  export type MenfessCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reactions?: boolean | MenfessCountOutputTypeCountReactionsArgs
    comments?: boolean | MenfessCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * MenfessCountOutputType without action
   */
  export type MenfessCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenfessCountOutputType
     */
    select?: MenfessCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MenfessCountOutputType without action
   */
  export type MenfessCountOutputTypeCountReactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
  }

  /**
   * MenfessCountOutputType without action
   */
  export type MenfessCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Menfess
   */

  export type AggregateMenfess = {
    _count: MenfessCountAggregateOutputType | null
    _min: MenfessMinAggregateOutputType | null
    _max: MenfessMaxAggregateOutputType | null
  }

  export type MenfessMinAggregateOutputType = {
    id: string | null
    to: string | null
    from: string | null
    message: string | null
    isPosted: boolean | null
    createdAt: Date | null
  }

  export type MenfessMaxAggregateOutputType = {
    id: string | null
    to: string | null
    from: string | null
    message: string | null
    isPosted: boolean | null
    createdAt: Date | null
  }

  export type MenfessCountAggregateOutputType = {
    id: number
    to: number
    from: number
    message: number
    isPosted: number
    createdAt: number
    _all: number
  }


  export type MenfessMinAggregateInputType = {
    id?: true
    to?: true
    from?: true
    message?: true
    isPosted?: true
    createdAt?: true
  }

  export type MenfessMaxAggregateInputType = {
    id?: true
    to?: true
    from?: true
    message?: true
    isPosted?: true
    createdAt?: true
  }

  export type MenfessCountAggregateInputType = {
    id?: true
    to?: true
    from?: true
    message?: true
    isPosted?: true
    createdAt?: true
    _all?: true
  }

  export type MenfessAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menfess to aggregate.
     */
    where?: MenfessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menfesses to fetch.
     */
    orderBy?: MenfessOrderByWithRelationInput | MenfessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenfessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menfesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menfesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Menfesses
    **/
    _count?: true | MenfessCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenfessMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenfessMaxAggregateInputType
  }

  export type GetMenfessAggregateType<T extends MenfessAggregateArgs> = {
        [P in keyof T & keyof AggregateMenfess]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenfess[P]>
      : GetScalarType<T[P], AggregateMenfess[P]>
  }




  export type MenfessGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenfessWhereInput
    orderBy?: MenfessOrderByWithAggregationInput | MenfessOrderByWithAggregationInput[]
    by: MenfessScalarFieldEnum[] | MenfessScalarFieldEnum
    having?: MenfessScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenfessCountAggregateInputType | true
    _min?: MenfessMinAggregateInputType
    _max?: MenfessMaxAggregateInputType
  }

  export type MenfessGroupByOutputType = {
    id: string
    to: string
    from: string
    message: string
    isPosted: boolean
    createdAt: Date
    _count: MenfessCountAggregateOutputType | null
    _min: MenfessMinAggregateOutputType | null
    _max: MenfessMaxAggregateOutputType | null
  }

  type GetMenfessGroupByPayload<T extends MenfessGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenfessGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenfessGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenfessGroupByOutputType[P]>
            : GetScalarType<T[P], MenfessGroupByOutputType[P]>
        }
      >
    >


  export type MenfessSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    to?: boolean
    from?: boolean
    message?: boolean
    isPosted?: boolean
    createdAt?: boolean
    reactions?: boolean | Menfess$reactionsArgs<ExtArgs>
    comments?: boolean | Menfess$commentsArgs<ExtArgs>
    _count?: boolean | MenfessCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["menfess"]>

  export type MenfessSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    to?: boolean
    from?: boolean
    message?: boolean
    isPosted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["menfess"]>

  export type MenfessSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    to?: boolean
    from?: boolean
    message?: boolean
    isPosted?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["menfess"]>

  export type MenfessSelectScalar = {
    id?: boolean
    to?: boolean
    from?: boolean
    message?: boolean
    isPosted?: boolean
    createdAt?: boolean
  }

  export type MenfessOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "to" | "from" | "message" | "isPosted" | "createdAt", ExtArgs["result"]["menfess"]>
  export type MenfessInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reactions?: boolean | Menfess$reactionsArgs<ExtArgs>
    comments?: boolean | Menfess$commentsArgs<ExtArgs>
    _count?: boolean | MenfessCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MenfessIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MenfessIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MenfessPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Menfess"
    objects: {
      reactions: Prisma.$ReactionPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      to: string
      from: string
      message: string
      isPosted: boolean
      createdAt: Date
    }, ExtArgs["result"]["menfess"]>
    composites: {}
  }

  type MenfessGetPayload<S extends boolean | null | undefined | MenfessDefaultArgs> = $Result.GetResult<Prisma.$MenfessPayload, S>

  type MenfessCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MenfessFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MenfessCountAggregateInputType | true
    }

  export interface MenfessDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Menfess'], meta: { name: 'Menfess' } }
    /**
     * Find zero or one Menfess that matches the filter.
     * @param {MenfessFindUniqueArgs} args - Arguments to find a Menfess
     * @example
     * // Get one Menfess
     * const menfess = await prisma.menfess.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenfessFindUniqueArgs>(args: SelectSubset<T, MenfessFindUniqueArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Menfess that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MenfessFindUniqueOrThrowArgs} args - Arguments to find a Menfess
     * @example
     * // Get one Menfess
     * const menfess = await prisma.menfess.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenfessFindUniqueOrThrowArgs>(args: SelectSubset<T, MenfessFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menfess that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessFindFirstArgs} args - Arguments to find a Menfess
     * @example
     * // Get one Menfess
     * const menfess = await prisma.menfess.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenfessFindFirstArgs>(args?: SelectSubset<T, MenfessFindFirstArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Menfess that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessFindFirstOrThrowArgs} args - Arguments to find a Menfess
     * @example
     * // Get one Menfess
     * const menfess = await prisma.menfess.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenfessFindFirstOrThrowArgs>(args?: SelectSubset<T, MenfessFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Menfesses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Menfesses
     * const menfesses = await prisma.menfess.findMany()
     * 
     * // Get first 10 Menfesses
     * const menfesses = await prisma.menfess.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menfessWithIdOnly = await prisma.menfess.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenfessFindManyArgs>(args?: SelectSubset<T, MenfessFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Menfess.
     * @param {MenfessCreateArgs} args - Arguments to create a Menfess.
     * @example
     * // Create one Menfess
     * const Menfess = await prisma.menfess.create({
     *   data: {
     *     // ... data to create a Menfess
     *   }
     * })
     * 
     */
    create<T extends MenfessCreateArgs>(args: SelectSubset<T, MenfessCreateArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Menfesses.
     * @param {MenfessCreateManyArgs} args - Arguments to create many Menfesses.
     * @example
     * // Create many Menfesses
     * const menfess = await prisma.menfess.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenfessCreateManyArgs>(args?: SelectSubset<T, MenfessCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Menfesses and returns the data saved in the database.
     * @param {MenfessCreateManyAndReturnArgs} args - Arguments to create many Menfesses.
     * @example
     * // Create many Menfesses
     * const menfess = await prisma.menfess.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Menfesses and only return the `id`
     * const menfessWithIdOnly = await prisma.menfess.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenfessCreateManyAndReturnArgs>(args?: SelectSubset<T, MenfessCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Menfess.
     * @param {MenfessDeleteArgs} args - Arguments to delete one Menfess.
     * @example
     * // Delete one Menfess
     * const Menfess = await prisma.menfess.delete({
     *   where: {
     *     // ... filter to delete one Menfess
     *   }
     * })
     * 
     */
    delete<T extends MenfessDeleteArgs>(args: SelectSubset<T, MenfessDeleteArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Menfess.
     * @param {MenfessUpdateArgs} args - Arguments to update one Menfess.
     * @example
     * // Update one Menfess
     * const menfess = await prisma.menfess.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenfessUpdateArgs>(args: SelectSubset<T, MenfessUpdateArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Menfesses.
     * @param {MenfessDeleteManyArgs} args - Arguments to filter Menfesses to delete.
     * @example
     * // Delete a few Menfesses
     * const { count } = await prisma.menfess.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenfessDeleteManyArgs>(args?: SelectSubset<T, MenfessDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menfesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Menfesses
     * const menfess = await prisma.menfess.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenfessUpdateManyArgs>(args: SelectSubset<T, MenfessUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Menfesses and returns the data updated in the database.
     * @param {MenfessUpdateManyAndReturnArgs} args - Arguments to update many Menfesses.
     * @example
     * // Update many Menfesses
     * const menfess = await prisma.menfess.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Menfesses and only return the `id`
     * const menfessWithIdOnly = await prisma.menfess.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MenfessUpdateManyAndReturnArgs>(args: SelectSubset<T, MenfessUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Menfess.
     * @param {MenfessUpsertArgs} args - Arguments to update or create a Menfess.
     * @example
     * // Update or create a Menfess
     * const menfess = await prisma.menfess.upsert({
     *   create: {
     *     // ... data to create a Menfess
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Menfess we want to update
     *   }
     * })
     */
    upsert<T extends MenfessUpsertArgs>(args: SelectSubset<T, MenfessUpsertArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Menfesses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessCountArgs} args - Arguments to filter Menfesses to count.
     * @example
     * // Count the number of Menfesses
     * const count = await prisma.menfess.count({
     *   where: {
     *     // ... the filter for the Menfesses we want to count
     *   }
     * })
    **/
    count<T extends MenfessCountArgs>(
      args?: Subset<T, MenfessCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenfessCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Menfess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MenfessAggregateArgs>(args: Subset<T, MenfessAggregateArgs>): Prisma.PrismaPromise<GetMenfessAggregateType<T>>

    /**
     * Group by Menfess.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenfessGroupByArgs} args - Group by arguments.
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
      T extends MenfessGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenfessGroupByArgs['orderBy'] }
        : { orderBy?: MenfessGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MenfessGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenfessGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Menfess model
   */
  readonly fields: MenfessFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Menfess.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenfessClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    reactions<T extends Menfess$reactionsArgs<ExtArgs> = {}>(args?: Subset<T, Menfess$reactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    comments<T extends Menfess$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Menfess$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Menfess model
   */
  interface MenfessFieldRefs {
    readonly id: FieldRef<"Menfess", 'String'>
    readonly to: FieldRef<"Menfess", 'String'>
    readonly from: FieldRef<"Menfess", 'String'>
    readonly message: FieldRef<"Menfess", 'String'>
    readonly isPosted: FieldRef<"Menfess", 'Boolean'>
    readonly createdAt: FieldRef<"Menfess", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Menfess findUnique
   */
  export type MenfessFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * Filter, which Menfess to fetch.
     */
    where: MenfessWhereUniqueInput
  }

  /**
   * Menfess findUniqueOrThrow
   */
  export type MenfessFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * Filter, which Menfess to fetch.
     */
    where: MenfessWhereUniqueInput
  }

  /**
   * Menfess findFirst
   */
  export type MenfessFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * Filter, which Menfess to fetch.
     */
    where?: MenfessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menfesses to fetch.
     */
    orderBy?: MenfessOrderByWithRelationInput | MenfessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menfesses.
     */
    cursor?: MenfessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menfesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menfesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menfesses.
     */
    distinct?: MenfessScalarFieldEnum | MenfessScalarFieldEnum[]
  }

  /**
   * Menfess findFirstOrThrow
   */
  export type MenfessFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * Filter, which Menfess to fetch.
     */
    where?: MenfessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menfesses to fetch.
     */
    orderBy?: MenfessOrderByWithRelationInput | MenfessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Menfesses.
     */
    cursor?: MenfessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menfesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menfesses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Menfesses.
     */
    distinct?: MenfessScalarFieldEnum | MenfessScalarFieldEnum[]
  }

  /**
   * Menfess findMany
   */
  export type MenfessFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * Filter, which Menfesses to fetch.
     */
    where?: MenfessWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Menfesses to fetch.
     */
    orderBy?: MenfessOrderByWithRelationInput | MenfessOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Menfesses.
     */
    cursor?: MenfessWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Menfesses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Menfesses.
     */
    skip?: number
    distinct?: MenfessScalarFieldEnum | MenfessScalarFieldEnum[]
  }

  /**
   * Menfess create
   */
  export type MenfessCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * The data needed to create a Menfess.
     */
    data: XOR<MenfessCreateInput, MenfessUncheckedCreateInput>
  }

  /**
   * Menfess createMany
   */
  export type MenfessCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Menfesses.
     */
    data: MenfessCreateManyInput | MenfessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menfess createManyAndReturn
   */
  export type MenfessCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * The data used to create many Menfesses.
     */
    data: MenfessCreateManyInput | MenfessCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Menfess update
   */
  export type MenfessUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * The data needed to update a Menfess.
     */
    data: XOR<MenfessUpdateInput, MenfessUncheckedUpdateInput>
    /**
     * Choose, which Menfess to update.
     */
    where: MenfessWhereUniqueInput
  }

  /**
   * Menfess updateMany
   */
  export type MenfessUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Menfesses.
     */
    data: XOR<MenfessUpdateManyMutationInput, MenfessUncheckedUpdateManyInput>
    /**
     * Filter which Menfesses to update
     */
    where?: MenfessWhereInput
    /**
     * Limit how many Menfesses to update.
     */
    limit?: number
  }

  /**
   * Menfess updateManyAndReturn
   */
  export type MenfessUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * The data used to update Menfesses.
     */
    data: XOR<MenfessUpdateManyMutationInput, MenfessUncheckedUpdateManyInput>
    /**
     * Filter which Menfesses to update
     */
    where?: MenfessWhereInput
    /**
     * Limit how many Menfesses to update.
     */
    limit?: number
  }

  /**
   * Menfess upsert
   */
  export type MenfessUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * The filter to search for the Menfess to update in case it exists.
     */
    where: MenfessWhereUniqueInput
    /**
     * In case the Menfess found by the `where` argument doesn't exist, create a new Menfess with this data.
     */
    create: XOR<MenfessCreateInput, MenfessUncheckedCreateInput>
    /**
     * In case the Menfess was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenfessUpdateInput, MenfessUncheckedUpdateInput>
  }

  /**
   * Menfess delete
   */
  export type MenfessDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
    /**
     * Filter which Menfess to delete.
     */
    where: MenfessWhereUniqueInput
  }

  /**
   * Menfess deleteMany
   */
  export type MenfessDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Menfesses to delete
     */
    where?: MenfessWhereInput
    /**
     * Limit how many Menfesses to delete.
     */
    limit?: number
  }

  /**
   * Menfess.reactions
   */
  export type Menfess$reactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    cursor?: ReactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Menfess.comments
   */
  export type Menfess$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Menfess without action
   */
  export type MenfessDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Menfess
     */
    select?: MenfessSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Menfess
     */
    omit?: MenfessOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MenfessInclude<ExtArgs> | null
  }


  /**
   * Model Reaction
   */

  export type AggregateReaction = {
    _count: ReactionCountAggregateOutputType | null
    _avg: ReactionAvgAggregateOutputType | null
    _sum: ReactionSumAggregateOutputType | null
    _min: ReactionMinAggregateOutputType | null
    _max: ReactionMaxAggregateOutputType | null
  }

  export type ReactionAvgAggregateOutputType = {
    count: number | null
  }

  export type ReactionSumAggregateOutputType = {
    count: number | null
  }

  export type ReactionMinAggregateOutputType = {
    id: string | null
    menfessId: string | null
    type: string | null
    count: number | null
  }

  export type ReactionMaxAggregateOutputType = {
    id: string | null
    menfessId: string | null
    type: string | null
    count: number | null
  }

  export type ReactionCountAggregateOutputType = {
    id: number
    menfessId: number
    type: number
    count: number
    _all: number
  }


  export type ReactionAvgAggregateInputType = {
    count?: true
  }

  export type ReactionSumAggregateInputType = {
    count?: true
  }

  export type ReactionMinAggregateInputType = {
    id?: true
    menfessId?: true
    type?: true
    count?: true
  }

  export type ReactionMaxAggregateInputType = {
    id?: true
    menfessId?: true
    type?: true
    count?: true
  }

  export type ReactionCountAggregateInputType = {
    id?: true
    menfessId?: true
    type?: true
    count?: true
    _all?: true
  }

  export type ReactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reaction to aggregate.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reactions
    **/
    _count?: true | ReactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReactionMaxAggregateInputType
  }

  export type GetReactionAggregateType<T extends ReactionAggregateArgs> = {
        [P in keyof T & keyof AggregateReaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReaction[P]>
      : GetScalarType<T[P], AggregateReaction[P]>
  }




  export type ReactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReactionWhereInput
    orderBy?: ReactionOrderByWithAggregationInput | ReactionOrderByWithAggregationInput[]
    by: ReactionScalarFieldEnum[] | ReactionScalarFieldEnum
    having?: ReactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReactionCountAggregateInputType | true
    _avg?: ReactionAvgAggregateInputType
    _sum?: ReactionSumAggregateInputType
    _min?: ReactionMinAggregateInputType
    _max?: ReactionMaxAggregateInputType
  }

  export type ReactionGroupByOutputType = {
    id: string
    menfessId: string
    type: string
    count: number
    _count: ReactionCountAggregateOutputType | null
    _avg: ReactionAvgAggregateOutputType | null
    _sum: ReactionSumAggregateOutputType | null
    _min: ReactionMinAggregateOutputType | null
    _max: ReactionMaxAggregateOutputType | null
  }

  type GetReactionGroupByPayload<T extends ReactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReactionGroupByOutputType[P]>
            : GetScalarType<T[P], ReactionGroupByOutputType[P]>
        }
      >
    >


  export type ReactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menfessId?: boolean
    type?: boolean
    count?: boolean
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menfessId?: boolean
    type?: boolean
    count?: boolean
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menfessId?: boolean
    type?: boolean
    count?: boolean
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reaction"]>

  export type ReactionSelectScalar = {
    id?: boolean
    menfessId?: boolean
    type?: boolean
    count?: boolean
  }

  export type ReactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "menfessId" | "type" | "count", ExtArgs["result"]["reaction"]>
  export type ReactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }
  export type ReactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }
  export type ReactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }

  export type $ReactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reaction"
    objects: {
      menfess: Prisma.$MenfessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menfessId: string
      type: string
      count: number
    }, ExtArgs["result"]["reaction"]>
    composites: {}
  }

  type ReactionGetPayload<S extends boolean | null | undefined | ReactionDefaultArgs> = $Result.GetResult<Prisma.$ReactionPayload, S>

  type ReactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReactionCountAggregateInputType | true
    }

  export interface ReactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reaction'], meta: { name: 'Reaction' } }
    /**
     * Find zero or one Reaction that matches the filter.
     * @param {ReactionFindUniqueArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReactionFindUniqueArgs>(args: SelectSubset<T, ReactionFindUniqueArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReactionFindUniqueOrThrowArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReactionFindUniqueOrThrowArgs>(args: SelectSubset<T, ReactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindFirstArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReactionFindFirstArgs>(args?: SelectSubset<T, ReactionFindFirstArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindFirstOrThrowArgs} args - Arguments to find a Reaction
     * @example
     * // Get one Reaction
     * const reaction = await prisma.reaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReactionFindFirstOrThrowArgs>(args?: SelectSubset<T, ReactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reactions
     * const reactions = await prisma.reaction.findMany()
     * 
     * // Get first 10 Reactions
     * const reactions = await prisma.reaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reactionWithIdOnly = await prisma.reaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReactionFindManyArgs>(args?: SelectSubset<T, ReactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reaction.
     * @param {ReactionCreateArgs} args - Arguments to create a Reaction.
     * @example
     * // Create one Reaction
     * const Reaction = await prisma.reaction.create({
     *   data: {
     *     // ... data to create a Reaction
     *   }
     * })
     * 
     */
    create<T extends ReactionCreateArgs>(args: SelectSubset<T, ReactionCreateArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reactions.
     * @param {ReactionCreateManyArgs} args - Arguments to create many Reactions.
     * @example
     * // Create many Reactions
     * const reaction = await prisma.reaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReactionCreateManyArgs>(args?: SelectSubset<T, ReactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reactions and returns the data saved in the database.
     * @param {ReactionCreateManyAndReturnArgs} args - Arguments to create many Reactions.
     * @example
     * // Create many Reactions
     * const reaction = await prisma.reaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reactions and only return the `id`
     * const reactionWithIdOnly = await prisma.reaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReactionCreateManyAndReturnArgs>(args?: SelectSubset<T, ReactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reaction.
     * @param {ReactionDeleteArgs} args - Arguments to delete one Reaction.
     * @example
     * // Delete one Reaction
     * const Reaction = await prisma.reaction.delete({
     *   where: {
     *     // ... filter to delete one Reaction
     *   }
     * })
     * 
     */
    delete<T extends ReactionDeleteArgs>(args: SelectSubset<T, ReactionDeleteArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reaction.
     * @param {ReactionUpdateArgs} args - Arguments to update one Reaction.
     * @example
     * // Update one Reaction
     * const reaction = await prisma.reaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReactionUpdateArgs>(args: SelectSubset<T, ReactionUpdateArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reactions.
     * @param {ReactionDeleteManyArgs} args - Arguments to filter Reactions to delete.
     * @example
     * // Delete a few Reactions
     * const { count } = await prisma.reaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReactionDeleteManyArgs>(args?: SelectSubset<T, ReactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reactions
     * const reaction = await prisma.reaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReactionUpdateManyArgs>(args: SelectSubset<T, ReactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reactions and returns the data updated in the database.
     * @param {ReactionUpdateManyAndReturnArgs} args - Arguments to update many Reactions.
     * @example
     * // Update many Reactions
     * const reaction = await prisma.reaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reactions and only return the `id`
     * const reactionWithIdOnly = await prisma.reaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReactionUpdateManyAndReturnArgs>(args: SelectSubset<T, ReactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reaction.
     * @param {ReactionUpsertArgs} args - Arguments to update or create a Reaction.
     * @example
     * // Update or create a Reaction
     * const reaction = await prisma.reaction.upsert({
     *   create: {
     *     // ... data to create a Reaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reaction we want to update
     *   }
     * })
     */
    upsert<T extends ReactionUpsertArgs>(args: SelectSubset<T, ReactionUpsertArgs<ExtArgs>>): Prisma__ReactionClient<$Result.GetResult<Prisma.$ReactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionCountArgs} args - Arguments to filter Reactions to count.
     * @example
     * // Count the number of Reactions
     * const count = await prisma.reaction.count({
     *   where: {
     *     // ... the filter for the Reactions we want to count
     *   }
     * })
    **/
    count<T extends ReactionCountArgs>(
      args?: Subset<T, ReactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReactionAggregateArgs>(args: Subset<T, ReactionAggregateArgs>): Prisma.PrismaPromise<GetReactionAggregateType<T>>

    /**
     * Group by Reaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReactionGroupByArgs} args - Group by arguments.
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
      T extends ReactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReactionGroupByArgs['orderBy'] }
        : { orderBy?: ReactionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reaction model
   */
  readonly fields: ReactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menfess<T extends MenfessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenfessDefaultArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Reaction model
   */
  interface ReactionFieldRefs {
    readonly id: FieldRef<"Reaction", 'String'>
    readonly menfessId: FieldRef<"Reaction", 'String'>
    readonly type: FieldRef<"Reaction", 'String'>
    readonly count: FieldRef<"Reaction", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Reaction findUnique
   */
  export type ReactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction findUniqueOrThrow
   */
  export type ReactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction findFirst
   */
  export type ReactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction findFirstOrThrow
   */
  export type ReactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reaction to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reactions.
     */
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction findMany
   */
  export type ReactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter, which Reactions to fetch.
     */
    where?: ReactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reactions to fetch.
     */
    orderBy?: ReactionOrderByWithRelationInput | ReactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reactions.
     */
    cursor?: ReactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reactions.
     */
    skip?: number
    distinct?: ReactionScalarFieldEnum | ReactionScalarFieldEnum[]
  }

  /**
   * Reaction create
   */
  export type ReactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Reaction.
     */
    data: XOR<ReactionCreateInput, ReactionUncheckedCreateInput>
  }

  /**
   * Reaction createMany
   */
  export type ReactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reactions.
     */
    data: ReactionCreateManyInput | ReactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reaction createManyAndReturn
   */
  export type ReactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * The data used to create many Reactions.
     */
    data: ReactionCreateManyInput | ReactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reaction update
   */
  export type ReactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Reaction.
     */
    data: XOR<ReactionUpdateInput, ReactionUncheckedUpdateInput>
    /**
     * Choose, which Reaction to update.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction updateMany
   */
  export type ReactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reactions.
     */
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyInput>
    /**
     * Filter which Reactions to update
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to update.
     */
    limit?: number
  }

  /**
   * Reaction updateManyAndReturn
   */
  export type ReactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * The data used to update Reactions.
     */
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyInput>
    /**
     * Filter which Reactions to update
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reaction upsert
   */
  export type ReactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Reaction to update in case it exists.
     */
    where: ReactionWhereUniqueInput
    /**
     * In case the Reaction found by the `where` argument doesn't exist, create a new Reaction with this data.
     */
    create: XOR<ReactionCreateInput, ReactionUncheckedCreateInput>
    /**
     * In case the Reaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReactionUpdateInput, ReactionUncheckedUpdateInput>
  }

  /**
   * Reaction delete
   */
  export type ReactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
    /**
     * Filter which Reaction to delete.
     */
    where: ReactionWhereUniqueInput
  }

  /**
   * Reaction deleteMany
   */
  export type ReactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reactions to delete
     */
    where?: ReactionWhereInput
    /**
     * Limit how many Reactions to delete.
     */
    limit?: number
  }

  /**
   * Reaction without action
   */
  export type ReactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reaction
     */
    select?: ReactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reaction
     */
    omit?: ReactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReactionInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    menfessId: string | null
    author: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    menfessId: string | null
    author: string | null
    content: string | null
    createdAt: Date | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    menfessId: number
    author: number
    content: number
    createdAt: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    menfessId?: true
    author?: true
    content?: true
    createdAt?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    menfessId?: true
    author?: true
    content?: true
    createdAt?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    menfessId?: true
    author?: true
    content?: true
    createdAt?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    menfessId: string
    author: string
    content: string
    createdAt: Date
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menfessId?: boolean
    author?: boolean
    content?: boolean
    createdAt?: boolean
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menfessId?: boolean
    author?: boolean
    content?: boolean
    createdAt?: boolean
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menfessId?: boolean
    author?: boolean
    content?: boolean
    createdAt?: boolean
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>

  export type CommentSelectScalar = {
    id?: boolean
    menfessId?: boolean
    author?: boolean
    content?: boolean
    createdAt?: boolean
  }

  export type CommentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "menfessId" | "author" | "content" | "createdAt", ExtArgs["result"]["comment"]>
  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }
  export type CommentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }
  export type CommentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    menfess?: boolean | MenfessDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      menfess: Prisma.$MenfessPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menfessId: string
      author: string
      content: string
      createdAt: Date
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comments and returns the data saved in the database.
     * @param {CommentCreateManyAndReturnArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommentCreateManyAndReturnArgs>(args?: SelectSubset<T, CommentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments and returns the data updated in the database.
     * @param {CommentUpdateManyAndReturnArgs} args - Arguments to update many Comments.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comments and only return the `id`
     * const commentWithIdOnly = await prisma.comment.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CommentUpdateManyAndReturnArgs>(args: SelectSubset<T, CommentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
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
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    menfess<T extends MenfessDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MenfessDefaultArgs<ExtArgs>>): Prisma__MenfessClient<$Result.GetResult<Prisma.$MenfessPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Comment model
   */
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly menfessId: FieldRef<"Comment", 'String'>
    readonly author: FieldRef<"Comment", 'String'>
    readonly content: FieldRef<"Comment", 'String'>
    readonly createdAt: FieldRef<"Comment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comment createManyAndReturn
   */
  export type CommentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
  }

  /**
   * Comment updateManyAndReturn
   */
  export type CommentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
    /**
     * Limit how many Comments to delete.
     */
    limit?: number
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comment
     */
    omit?: CommentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
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


  export const MenfessScalarFieldEnum: {
    id: 'id',
    to: 'to',
    from: 'from',
    message: 'message',
    isPosted: 'isPosted',
    createdAt: 'createdAt'
  };

  export type MenfessScalarFieldEnum = (typeof MenfessScalarFieldEnum)[keyof typeof MenfessScalarFieldEnum]


  export const ReactionScalarFieldEnum: {
    id: 'id',
    menfessId: 'menfessId',
    type: 'type',
    count: 'count'
  };

  export type ReactionScalarFieldEnum = (typeof ReactionScalarFieldEnum)[keyof typeof ReactionScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    menfessId: 'menfessId',
    author: 'author',
    content: 'content',
    createdAt: 'createdAt'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type MenfessWhereInput = {
    AND?: MenfessWhereInput | MenfessWhereInput[]
    OR?: MenfessWhereInput[]
    NOT?: MenfessWhereInput | MenfessWhereInput[]
    id?: StringFilter<"Menfess"> | string
    to?: StringFilter<"Menfess"> | string
    from?: StringFilter<"Menfess"> | string
    message?: StringFilter<"Menfess"> | string
    isPosted?: BoolFilter<"Menfess"> | boolean
    createdAt?: DateTimeFilter<"Menfess"> | Date | string
    reactions?: ReactionListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type MenfessOrderByWithRelationInput = {
    id?: SortOrder
    to?: SortOrder
    from?: SortOrder
    message?: SortOrder
    isPosted?: SortOrder
    createdAt?: SortOrder
    reactions?: ReactionOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type MenfessWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MenfessWhereInput | MenfessWhereInput[]
    OR?: MenfessWhereInput[]
    NOT?: MenfessWhereInput | MenfessWhereInput[]
    to?: StringFilter<"Menfess"> | string
    from?: StringFilter<"Menfess"> | string
    message?: StringFilter<"Menfess"> | string
    isPosted?: BoolFilter<"Menfess"> | boolean
    createdAt?: DateTimeFilter<"Menfess"> | Date | string
    reactions?: ReactionListRelationFilter
    comments?: CommentListRelationFilter
  }, "id">

  export type MenfessOrderByWithAggregationInput = {
    id?: SortOrder
    to?: SortOrder
    from?: SortOrder
    message?: SortOrder
    isPosted?: SortOrder
    createdAt?: SortOrder
    _count?: MenfessCountOrderByAggregateInput
    _max?: MenfessMaxOrderByAggregateInput
    _min?: MenfessMinOrderByAggregateInput
  }

  export type MenfessScalarWhereWithAggregatesInput = {
    AND?: MenfessScalarWhereWithAggregatesInput | MenfessScalarWhereWithAggregatesInput[]
    OR?: MenfessScalarWhereWithAggregatesInput[]
    NOT?: MenfessScalarWhereWithAggregatesInput | MenfessScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Menfess"> | string
    to?: StringWithAggregatesFilter<"Menfess"> | string
    from?: StringWithAggregatesFilter<"Menfess"> | string
    message?: StringWithAggregatesFilter<"Menfess"> | string
    isPosted?: BoolWithAggregatesFilter<"Menfess"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Menfess"> | Date | string
  }

  export type ReactionWhereInput = {
    AND?: ReactionWhereInput | ReactionWhereInput[]
    OR?: ReactionWhereInput[]
    NOT?: ReactionWhereInput | ReactionWhereInput[]
    id?: StringFilter<"Reaction"> | string
    menfessId?: StringFilter<"Reaction"> | string
    type?: StringFilter<"Reaction"> | string
    count?: IntFilter<"Reaction"> | number
    menfess?: XOR<MenfessScalarRelationFilter, MenfessWhereInput>
  }

  export type ReactionOrderByWithRelationInput = {
    id?: SortOrder
    menfessId?: SortOrder
    type?: SortOrder
    count?: SortOrder
    menfess?: MenfessOrderByWithRelationInput
  }

  export type ReactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    menfessId_type?: ReactionMenfessIdTypeCompoundUniqueInput
    AND?: ReactionWhereInput | ReactionWhereInput[]
    OR?: ReactionWhereInput[]
    NOT?: ReactionWhereInput | ReactionWhereInput[]
    menfessId?: StringFilter<"Reaction"> | string
    type?: StringFilter<"Reaction"> | string
    count?: IntFilter<"Reaction"> | number
    menfess?: XOR<MenfessScalarRelationFilter, MenfessWhereInput>
  }, "id" | "menfessId_type">

  export type ReactionOrderByWithAggregationInput = {
    id?: SortOrder
    menfessId?: SortOrder
    type?: SortOrder
    count?: SortOrder
    _count?: ReactionCountOrderByAggregateInput
    _avg?: ReactionAvgOrderByAggregateInput
    _max?: ReactionMaxOrderByAggregateInput
    _min?: ReactionMinOrderByAggregateInput
    _sum?: ReactionSumOrderByAggregateInput
  }

  export type ReactionScalarWhereWithAggregatesInput = {
    AND?: ReactionScalarWhereWithAggregatesInput | ReactionScalarWhereWithAggregatesInput[]
    OR?: ReactionScalarWhereWithAggregatesInput[]
    NOT?: ReactionScalarWhereWithAggregatesInput | ReactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Reaction"> | string
    menfessId?: StringWithAggregatesFilter<"Reaction"> | string
    type?: StringWithAggregatesFilter<"Reaction"> | string
    count?: IntWithAggregatesFilter<"Reaction"> | number
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    menfessId?: StringFilter<"Comment"> | string
    author?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    menfess?: XOR<MenfessScalarRelationFilter, MenfessWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    menfessId?: SortOrder
    author?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    menfess?: MenfessOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    menfessId?: StringFilter<"Comment"> | string
    author?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
    menfess?: XOR<MenfessScalarRelationFilter, MenfessWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    menfessId?: SortOrder
    author?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    menfessId?: StringWithAggregatesFilter<"Comment"> | string
    author?: StringWithAggregatesFilter<"Comment"> | string
    content?: StringWithAggregatesFilter<"Comment"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Comment"> | Date | string
  }

  export type MenfessCreateInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
    reactions?: ReactionCreateNestedManyWithoutMenfessInput
    comments?: CommentCreateNestedManyWithoutMenfessInput
  }

  export type MenfessUncheckedCreateInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
    reactions?: ReactionUncheckedCreateNestedManyWithoutMenfessInput
    comments?: CommentUncheckedCreateNestedManyWithoutMenfessInput
  }

  export type MenfessUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUpdateManyWithoutMenfessNestedInput
    comments?: CommentUpdateManyWithoutMenfessNestedInput
  }

  export type MenfessUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUncheckedUpdateManyWithoutMenfessNestedInput
    comments?: CommentUncheckedUpdateManyWithoutMenfessNestedInput
  }

  export type MenfessCreateManyInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
  }

  export type MenfessUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenfessUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReactionCreateInput = {
    id?: string
    type: string
    count?: number
    menfess: MenfessCreateNestedOneWithoutReactionsInput
  }

  export type ReactionUncheckedCreateInput = {
    id?: string
    menfessId: string
    type: string
    count?: number
  }

  export type ReactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    menfess?: MenfessUpdateOneRequiredWithoutReactionsNestedInput
  }

  export type ReactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menfessId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type ReactionCreateManyInput = {
    id?: string
    menfessId: string
    type: string
    count?: number
  }

  export type ReactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type ReactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menfessId?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type CommentCreateInput = {
    id?: string
    author?: string
    content: string
    createdAt?: Date | string
    menfess: MenfessCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    menfessId: string
    author?: string
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    menfess?: MenfessUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menfessId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentCreateManyInput = {
    id?: string
    menfessId: string
    author?: string
    content: string
    createdAt?: Date | string
  }

  export type CommentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menfessId?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type ReactionListRelationFilter = {
    every?: ReactionWhereInput
    some?: ReactionWhereInput
    none?: ReactionWhereInput
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type ReactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MenfessCountOrderByAggregateInput = {
    id?: SortOrder
    to?: SortOrder
    from?: SortOrder
    message?: SortOrder
    isPosted?: SortOrder
    createdAt?: SortOrder
  }

  export type MenfessMaxOrderByAggregateInput = {
    id?: SortOrder
    to?: SortOrder
    from?: SortOrder
    message?: SortOrder
    isPosted?: SortOrder
    createdAt?: SortOrder
  }

  export type MenfessMinOrderByAggregateInput = {
    id?: SortOrder
    to?: SortOrder
    from?: SortOrder
    message?: SortOrder
    isPosted?: SortOrder
    createdAt?: SortOrder
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

  export type MenfessScalarRelationFilter = {
    is?: MenfessWhereInput
    isNot?: MenfessWhereInput
  }

  export type ReactionMenfessIdTypeCompoundUniqueInput = {
    menfessId: string
    type: string
  }

  export type ReactionCountOrderByAggregateInput = {
    id?: SortOrder
    menfessId?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type ReactionAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type ReactionMaxOrderByAggregateInput = {
    id?: SortOrder
    menfessId?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type ReactionMinOrderByAggregateInput = {
    id?: SortOrder
    menfessId?: SortOrder
    type?: SortOrder
    count?: SortOrder
  }

  export type ReactionSumOrderByAggregateInput = {
    count?: SortOrder
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

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    menfessId?: SortOrder
    author?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    menfessId?: SortOrder
    author?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    menfessId?: SortOrder
    author?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
  }

  export type ReactionCreateNestedManyWithoutMenfessInput = {
    create?: XOR<ReactionCreateWithoutMenfessInput, ReactionUncheckedCreateWithoutMenfessInput> | ReactionCreateWithoutMenfessInput[] | ReactionUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMenfessInput | ReactionCreateOrConnectWithoutMenfessInput[]
    createMany?: ReactionCreateManyMenfessInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutMenfessInput = {
    create?: XOR<CommentCreateWithoutMenfessInput, CommentUncheckedCreateWithoutMenfessInput> | CommentCreateWithoutMenfessInput[] | CommentUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutMenfessInput | CommentCreateOrConnectWithoutMenfessInput[]
    createMany?: CommentCreateManyMenfessInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type ReactionUncheckedCreateNestedManyWithoutMenfessInput = {
    create?: XOR<ReactionCreateWithoutMenfessInput, ReactionUncheckedCreateWithoutMenfessInput> | ReactionCreateWithoutMenfessInput[] | ReactionUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMenfessInput | ReactionCreateOrConnectWithoutMenfessInput[]
    createMany?: ReactionCreateManyMenfessInputEnvelope
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutMenfessInput = {
    create?: XOR<CommentCreateWithoutMenfessInput, CommentUncheckedCreateWithoutMenfessInput> | CommentCreateWithoutMenfessInput[] | CommentUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutMenfessInput | CommentCreateOrConnectWithoutMenfessInput[]
    createMany?: CommentCreateManyMenfessInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ReactionUpdateManyWithoutMenfessNestedInput = {
    create?: XOR<ReactionCreateWithoutMenfessInput, ReactionUncheckedCreateWithoutMenfessInput> | ReactionCreateWithoutMenfessInput[] | ReactionUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMenfessInput | ReactionCreateOrConnectWithoutMenfessInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutMenfessInput | ReactionUpsertWithWhereUniqueWithoutMenfessInput[]
    createMany?: ReactionCreateManyMenfessInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutMenfessInput | ReactionUpdateWithWhereUniqueWithoutMenfessInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutMenfessInput | ReactionUpdateManyWithWhereWithoutMenfessInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutMenfessNestedInput = {
    create?: XOR<CommentCreateWithoutMenfessInput, CommentUncheckedCreateWithoutMenfessInput> | CommentCreateWithoutMenfessInput[] | CommentUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutMenfessInput | CommentCreateOrConnectWithoutMenfessInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutMenfessInput | CommentUpsertWithWhereUniqueWithoutMenfessInput[]
    createMany?: CommentCreateManyMenfessInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutMenfessInput | CommentUpdateWithWhereUniqueWithoutMenfessInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutMenfessInput | CommentUpdateManyWithWhereWithoutMenfessInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ReactionUncheckedUpdateManyWithoutMenfessNestedInput = {
    create?: XOR<ReactionCreateWithoutMenfessInput, ReactionUncheckedCreateWithoutMenfessInput> | ReactionCreateWithoutMenfessInput[] | ReactionUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: ReactionCreateOrConnectWithoutMenfessInput | ReactionCreateOrConnectWithoutMenfessInput[]
    upsert?: ReactionUpsertWithWhereUniqueWithoutMenfessInput | ReactionUpsertWithWhereUniqueWithoutMenfessInput[]
    createMany?: ReactionCreateManyMenfessInputEnvelope
    set?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    disconnect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    delete?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    connect?: ReactionWhereUniqueInput | ReactionWhereUniqueInput[]
    update?: ReactionUpdateWithWhereUniqueWithoutMenfessInput | ReactionUpdateWithWhereUniqueWithoutMenfessInput[]
    updateMany?: ReactionUpdateManyWithWhereWithoutMenfessInput | ReactionUpdateManyWithWhereWithoutMenfessInput[]
    deleteMany?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutMenfessNestedInput = {
    create?: XOR<CommentCreateWithoutMenfessInput, CommentUncheckedCreateWithoutMenfessInput> | CommentCreateWithoutMenfessInput[] | CommentUncheckedCreateWithoutMenfessInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutMenfessInput | CommentCreateOrConnectWithoutMenfessInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutMenfessInput | CommentUpsertWithWhereUniqueWithoutMenfessInput[]
    createMany?: CommentCreateManyMenfessInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutMenfessInput | CommentUpdateWithWhereUniqueWithoutMenfessInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutMenfessInput | CommentUpdateManyWithWhereWithoutMenfessInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type MenfessCreateNestedOneWithoutReactionsInput = {
    create?: XOR<MenfessCreateWithoutReactionsInput, MenfessUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MenfessCreateOrConnectWithoutReactionsInput
    connect?: MenfessWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MenfessUpdateOneRequiredWithoutReactionsNestedInput = {
    create?: XOR<MenfessCreateWithoutReactionsInput, MenfessUncheckedCreateWithoutReactionsInput>
    connectOrCreate?: MenfessCreateOrConnectWithoutReactionsInput
    upsert?: MenfessUpsertWithoutReactionsInput
    connect?: MenfessWhereUniqueInput
    update?: XOR<XOR<MenfessUpdateToOneWithWhereWithoutReactionsInput, MenfessUpdateWithoutReactionsInput>, MenfessUncheckedUpdateWithoutReactionsInput>
  }

  export type MenfessCreateNestedOneWithoutCommentsInput = {
    create?: XOR<MenfessCreateWithoutCommentsInput, MenfessUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: MenfessCreateOrConnectWithoutCommentsInput
    connect?: MenfessWhereUniqueInput
  }

  export type MenfessUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<MenfessCreateWithoutCommentsInput, MenfessUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: MenfessCreateOrConnectWithoutCommentsInput
    upsert?: MenfessUpsertWithoutCommentsInput
    connect?: MenfessWhereUniqueInput
    update?: XOR<XOR<MenfessUpdateToOneWithWhereWithoutCommentsInput, MenfessUpdateWithoutCommentsInput>, MenfessUncheckedUpdateWithoutCommentsInput>
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

  export type ReactionCreateWithoutMenfessInput = {
    id?: string
    type: string
    count?: number
  }

  export type ReactionUncheckedCreateWithoutMenfessInput = {
    id?: string
    type: string
    count?: number
  }

  export type ReactionCreateOrConnectWithoutMenfessInput = {
    where: ReactionWhereUniqueInput
    create: XOR<ReactionCreateWithoutMenfessInput, ReactionUncheckedCreateWithoutMenfessInput>
  }

  export type ReactionCreateManyMenfessInputEnvelope = {
    data: ReactionCreateManyMenfessInput | ReactionCreateManyMenfessInput[]
    skipDuplicates?: boolean
  }

  export type CommentCreateWithoutMenfessInput = {
    id?: string
    author?: string
    content: string
    createdAt?: Date | string
  }

  export type CommentUncheckedCreateWithoutMenfessInput = {
    id?: string
    author?: string
    content: string
    createdAt?: Date | string
  }

  export type CommentCreateOrConnectWithoutMenfessInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutMenfessInput, CommentUncheckedCreateWithoutMenfessInput>
  }

  export type CommentCreateManyMenfessInputEnvelope = {
    data: CommentCreateManyMenfessInput | CommentCreateManyMenfessInput[]
    skipDuplicates?: boolean
  }

  export type ReactionUpsertWithWhereUniqueWithoutMenfessInput = {
    where: ReactionWhereUniqueInput
    update: XOR<ReactionUpdateWithoutMenfessInput, ReactionUncheckedUpdateWithoutMenfessInput>
    create: XOR<ReactionCreateWithoutMenfessInput, ReactionUncheckedCreateWithoutMenfessInput>
  }

  export type ReactionUpdateWithWhereUniqueWithoutMenfessInput = {
    where: ReactionWhereUniqueInput
    data: XOR<ReactionUpdateWithoutMenfessInput, ReactionUncheckedUpdateWithoutMenfessInput>
  }

  export type ReactionUpdateManyWithWhereWithoutMenfessInput = {
    where: ReactionScalarWhereInput
    data: XOR<ReactionUpdateManyMutationInput, ReactionUncheckedUpdateManyWithoutMenfessInput>
  }

  export type ReactionScalarWhereInput = {
    AND?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
    OR?: ReactionScalarWhereInput[]
    NOT?: ReactionScalarWhereInput | ReactionScalarWhereInput[]
    id?: StringFilter<"Reaction"> | string
    menfessId?: StringFilter<"Reaction"> | string
    type?: StringFilter<"Reaction"> | string
    count?: IntFilter<"Reaction"> | number
  }

  export type CommentUpsertWithWhereUniqueWithoutMenfessInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutMenfessInput, CommentUncheckedUpdateWithoutMenfessInput>
    create: XOR<CommentCreateWithoutMenfessInput, CommentUncheckedCreateWithoutMenfessInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutMenfessInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutMenfessInput, CommentUncheckedUpdateWithoutMenfessInput>
  }

  export type CommentUpdateManyWithWhereWithoutMenfessInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutMenfessInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    menfessId?: StringFilter<"Comment"> | string
    author?: StringFilter<"Comment"> | string
    content?: StringFilter<"Comment"> | string
    createdAt?: DateTimeFilter<"Comment"> | Date | string
  }

  export type MenfessCreateWithoutReactionsInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
    comments?: CommentCreateNestedManyWithoutMenfessInput
  }

  export type MenfessUncheckedCreateWithoutReactionsInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutMenfessInput
  }

  export type MenfessCreateOrConnectWithoutReactionsInput = {
    where: MenfessWhereUniqueInput
    create: XOR<MenfessCreateWithoutReactionsInput, MenfessUncheckedCreateWithoutReactionsInput>
  }

  export type MenfessUpsertWithoutReactionsInput = {
    update: XOR<MenfessUpdateWithoutReactionsInput, MenfessUncheckedUpdateWithoutReactionsInput>
    create: XOR<MenfessCreateWithoutReactionsInput, MenfessUncheckedCreateWithoutReactionsInput>
    where?: MenfessWhereInput
  }

  export type MenfessUpdateToOneWithWhereWithoutReactionsInput = {
    where?: MenfessWhereInput
    data: XOR<MenfessUpdateWithoutReactionsInput, MenfessUncheckedUpdateWithoutReactionsInput>
  }

  export type MenfessUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutMenfessNestedInput
  }

  export type MenfessUncheckedUpdateWithoutReactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutMenfessNestedInput
  }

  export type MenfessCreateWithoutCommentsInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
    reactions?: ReactionCreateNestedManyWithoutMenfessInput
  }

  export type MenfessUncheckedCreateWithoutCommentsInput = {
    id?: string
    to: string
    from: string
    message: string
    isPosted?: boolean
    createdAt?: Date | string
    reactions?: ReactionUncheckedCreateNestedManyWithoutMenfessInput
  }

  export type MenfessCreateOrConnectWithoutCommentsInput = {
    where: MenfessWhereUniqueInput
    create: XOR<MenfessCreateWithoutCommentsInput, MenfessUncheckedCreateWithoutCommentsInput>
  }

  export type MenfessUpsertWithoutCommentsInput = {
    update: XOR<MenfessUpdateWithoutCommentsInput, MenfessUncheckedUpdateWithoutCommentsInput>
    create: XOR<MenfessCreateWithoutCommentsInput, MenfessUncheckedCreateWithoutCommentsInput>
    where?: MenfessWhereInput
  }

  export type MenfessUpdateToOneWithWhereWithoutCommentsInput = {
    where?: MenfessWhereInput
    data: XOR<MenfessUpdateWithoutCommentsInput, MenfessUncheckedUpdateWithoutCommentsInput>
  }

  export type MenfessUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUpdateManyWithoutMenfessNestedInput
  }

  export type MenfessUncheckedUpdateWithoutCommentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
    from?: StringFieldUpdateOperationsInput | string
    message?: StringFieldUpdateOperationsInput | string
    isPosted?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    reactions?: ReactionUncheckedUpdateManyWithoutMenfessNestedInput
  }

  export type ReactionCreateManyMenfessInput = {
    id?: string
    type: string
    count?: number
  }

  export type CommentCreateManyMenfessInput = {
    id?: string
    author?: string
    content: string
    createdAt?: Date | string
  }

  export type ReactionUpdateWithoutMenfessInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type ReactionUncheckedUpdateWithoutMenfessInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type ReactionUncheckedUpdateManyWithoutMenfessInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type CommentUpdateWithoutMenfessInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateWithoutMenfessInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUncheckedUpdateManyWithoutMenfessInput = {
    id?: StringFieldUpdateOperationsInput | string
    author?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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