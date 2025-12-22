
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model LinkedInPost
 * 
 */
export type LinkedInPost = $Result.DefaultSelection<Prisma.$LinkedInPostPayload>
/**
 * Model LinkedInPostImage
 * 
 */
export type LinkedInPostImage = $Result.DefaultSelection<Prisma.$LinkedInPostImagePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more LinkedInPosts
 * const linkedInPosts = await prisma.linkedInPost.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more LinkedInPosts
   * const linkedInPosts = await prisma.linkedInPost.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * `prisma.linkedInPost`: Exposes CRUD operations for the **LinkedInPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LinkedInPosts
    * const linkedInPosts = await prisma.linkedInPost.findMany()
    * ```
    */
  get linkedInPost(): Prisma.LinkedInPostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.linkedInPostImage`: Exposes CRUD operations for the **LinkedInPostImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LinkedInPostImages
    * const linkedInPostImages = await prisma.linkedInPostImage.findMany()
    * ```
    */
  get linkedInPostImage(): Prisma.LinkedInPostImageDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    LinkedInPost: 'LinkedInPost',
    LinkedInPostImage: 'LinkedInPostImage'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "linkedInPost" | "linkedInPostImage"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      LinkedInPost: {
        payload: Prisma.$LinkedInPostPayload<ExtArgs>
        fields: Prisma.LinkedInPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkedInPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkedInPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>
          }
          findFirst: {
            args: Prisma.LinkedInPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkedInPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>
          }
          findMany: {
            args: Prisma.LinkedInPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>[]
          }
          create: {
            args: Prisma.LinkedInPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>
          }
          createMany: {
            args: Prisma.LinkedInPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkedInPostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>[]
          }
          delete: {
            args: Prisma.LinkedInPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>
          }
          update: {
            args: Prisma.LinkedInPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>
          }
          deleteMany: {
            args: Prisma.LinkedInPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkedInPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkedInPostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>[]
          }
          upsert: {
            args: Prisma.LinkedInPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostPayload>
          }
          aggregate: {
            args: Prisma.LinkedInPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLinkedInPost>
          }
          groupBy: {
            args: Prisma.LinkedInPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkedInPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkedInPostCountArgs<ExtArgs>
            result: $Utils.Optional<LinkedInPostCountAggregateOutputType> | number
          }
        }
      }
      LinkedInPostImage: {
        payload: Prisma.$LinkedInPostImagePayload<ExtArgs>
        fields: Prisma.LinkedInPostImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LinkedInPostImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LinkedInPostImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>
          }
          findFirst: {
            args: Prisma.LinkedInPostImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LinkedInPostImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>
          }
          findMany: {
            args: Prisma.LinkedInPostImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>[]
          }
          create: {
            args: Prisma.LinkedInPostImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>
          }
          createMany: {
            args: Prisma.LinkedInPostImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LinkedInPostImageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>[]
          }
          delete: {
            args: Prisma.LinkedInPostImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>
          }
          update: {
            args: Prisma.LinkedInPostImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>
          }
          deleteMany: {
            args: Prisma.LinkedInPostImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LinkedInPostImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LinkedInPostImageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>[]
          }
          upsert: {
            args: Prisma.LinkedInPostImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LinkedInPostImagePayload>
          }
          aggregate: {
            args: Prisma.LinkedInPostImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLinkedInPostImage>
          }
          groupBy: {
            args: Prisma.LinkedInPostImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<LinkedInPostImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.LinkedInPostImageCountArgs<ExtArgs>
            result: $Utils.Optional<LinkedInPostImageCountAggregateOutputType> | number
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    linkedInPost?: LinkedInPostOmit
    linkedInPostImage?: LinkedInPostImageOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type LinkedInPostCountOutputType
   */

  export type LinkedInPostCountOutputType = {
    images: number
  }

  export type LinkedInPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | LinkedInPostCountOutputTypeCountImagesArgs
  }

  // Custom InputTypes
  /**
   * LinkedInPostCountOutputType without action
   */
  export type LinkedInPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostCountOutputType
     */
    select?: LinkedInPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LinkedInPostCountOutputType without action
   */
  export type LinkedInPostCountOutputTypeCountImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkedInPostImageWhereInput
  }


  /**
   * Models
   */

  /**
   * Model LinkedInPost
   */

  export type AggregateLinkedInPost = {
    _count: LinkedInPostCountAggregateOutputType | null
    _min: LinkedInPostMinAggregateOutputType | null
    _max: LinkedInPostMaxAggregateOutputType | null
  }

  export type LinkedInPostMinAggregateOutputType = {
    id: string | null
    authorUrn: string | null
    text: string | null
    publishedAt: Date | null
    createdAt: Date | null
    lastModifiedAt: Date | null
    linkUrl: string | null
  }

  export type LinkedInPostMaxAggregateOutputType = {
    id: string | null
    authorUrn: string | null
    text: string | null
    publishedAt: Date | null
    createdAt: Date | null
    lastModifiedAt: Date | null
    linkUrl: string | null
  }

  export type LinkedInPostCountAggregateOutputType = {
    id: number
    authorUrn: number
    text: number
    publishedAt: number
    createdAt: number
    lastModifiedAt: number
    linkUrl: number
    raw: number
    _all: number
  }


  export type LinkedInPostMinAggregateInputType = {
    id?: true
    authorUrn?: true
    text?: true
    publishedAt?: true
    createdAt?: true
    lastModifiedAt?: true
    linkUrl?: true
  }

  export type LinkedInPostMaxAggregateInputType = {
    id?: true
    authorUrn?: true
    text?: true
    publishedAt?: true
    createdAt?: true
    lastModifiedAt?: true
    linkUrl?: true
  }

  export type LinkedInPostCountAggregateInputType = {
    id?: true
    authorUrn?: true
    text?: true
    publishedAt?: true
    createdAt?: true
    lastModifiedAt?: true
    linkUrl?: true
    raw?: true
    _all?: true
  }

  export type LinkedInPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkedInPost to aggregate.
     */
    where?: LinkedInPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPosts to fetch.
     */
    orderBy?: LinkedInPostOrderByWithRelationInput | LinkedInPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkedInPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LinkedInPosts
    **/
    _count?: true | LinkedInPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkedInPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkedInPostMaxAggregateInputType
  }

  export type GetLinkedInPostAggregateType<T extends LinkedInPostAggregateArgs> = {
        [P in keyof T & keyof AggregateLinkedInPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLinkedInPost[P]>
      : GetScalarType<T[P], AggregateLinkedInPost[P]>
  }




  export type LinkedInPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkedInPostWhereInput
    orderBy?: LinkedInPostOrderByWithAggregationInput | LinkedInPostOrderByWithAggregationInput[]
    by: LinkedInPostScalarFieldEnum[] | LinkedInPostScalarFieldEnum
    having?: LinkedInPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkedInPostCountAggregateInputType | true
    _min?: LinkedInPostMinAggregateInputType
    _max?: LinkedInPostMaxAggregateInputType
  }

  export type LinkedInPostGroupByOutputType = {
    id: string
    authorUrn: string
    text: string | null
    publishedAt: Date
    createdAt: Date
    lastModifiedAt: Date
    linkUrl: string | null
    raw: JsonValue
    _count: LinkedInPostCountAggregateOutputType | null
    _min: LinkedInPostMinAggregateOutputType | null
    _max: LinkedInPostMaxAggregateOutputType | null
  }

  type GetLinkedInPostGroupByPayload<T extends LinkedInPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkedInPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkedInPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkedInPostGroupByOutputType[P]>
            : GetScalarType<T[P], LinkedInPostGroupByOutputType[P]>
        }
      >
    >


  export type LinkedInPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorUrn?: boolean
    text?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    lastModifiedAt?: boolean
    linkUrl?: boolean
    raw?: boolean
    images?: boolean | LinkedInPost$imagesArgs<ExtArgs>
    _count?: boolean | LinkedInPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkedInPost"]>

  export type LinkedInPostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorUrn?: boolean
    text?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    lastModifiedAt?: boolean
    linkUrl?: boolean
    raw?: boolean
  }, ExtArgs["result"]["linkedInPost"]>

  export type LinkedInPostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    authorUrn?: boolean
    text?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    lastModifiedAt?: boolean
    linkUrl?: boolean
    raw?: boolean
  }, ExtArgs["result"]["linkedInPost"]>

  export type LinkedInPostSelectScalar = {
    id?: boolean
    authorUrn?: boolean
    text?: boolean
    publishedAt?: boolean
    createdAt?: boolean
    lastModifiedAt?: boolean
    linkUrl?: boolean
    raw?: boolean
  }

  export type LinkedInPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "authorUrn" | "text" | "publishedAt" | "createdAt" | "lastModifiedAt" | "linkUrl" | "raw", ExtArgs["result"]["linkedInPost"]>
  export type LinkedInPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    images?: boolean | LinkedInPost$imagesArgs<ExtArgs>
    _count?: boolean | LinkedInPostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LinkedInPostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LinkedInPostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LinkedInPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LinkedInPost"
    objects: {
      images: Prisma.$LinkedInPostImagePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      authorUrn: string
      text: string | null
      publishedAt: Date
      createdAt: Date
      lastModifiedAt: Date
      linkUrl: string | null
      raw: Prisma.JsonValue
    }, ExtArgs["result"]["linkedInPost"]>
    composites: {}
  }

  type LinkedInPostGetPayload<S extends boolean | null | undefined | LinkedInPostDefaultArgs> = $Result.GetResult<Prisma.$LinkedInPostPayload, S>

  type LinkedInPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkedInPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkedInPostCountAggregateInputType | true
    }

  export interface LinkedInPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LinkedInPost'], meta: { name: 'LinkedInPost' } }
    /**
     * Find zero or one LinkedInPost that matches the filter.
     * @param {LinkedInPostFindUniqueArgs} args - Arguments to find a LinkedInPost
     * @example
     * // Get one LinkedInPost
     * const linkedInPost = await prisma.linkedInPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkedInPostFindUniqueArgs>(args: SelectSubset<T, LinkedInPostFindUniqueArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LinkedInPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkedInPostFindUniqueOrThrowArgs} args - Arguments to find a LinkedInPost
     * @example
     * // Get one LinkedInPost
     * const linkedInPost = await prisma.linkedInPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkedInPostFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkedInPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkedInPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostFindFirstArgs} args - Arguments to find a LinkedInPost
     * @example
     * // Get one LinkedInPost
     * const linkedInPost = await prisma.linkedInPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkedInPostFindFirstArgs>(args?: SelectSubset<T, LinkedInPostFindFirstArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkedInPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostFindFirstOrThrowArgs} args - Arguments to find a LinkedInPost
     * @example
     * // Get one LinkedInPost
     * const linkedInPost = await prisma.linkedInPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkedInPostFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkedInPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LinkedInPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LinkedInPosts
     * const linkedInPosts = await prisma.linkedInPost.findMany()
     * 
     * // Get first 10 LinkedInPosts
     * const linkedInPosts = await prisma.linkedInPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkedInPostWithIdOnly = await prisma.linkedInPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LinkedInPostFindManyArgs>(args?: SelectSubset<T, LinkedInPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LinkedInPost.
     * @param {LinkedInPostCreateArgs} args - Arguments to create a LinkedInPost.
     * @example
     * // Create one LinkedInPost
     * const LinkedInPost = await prisma.linkedInPost.create({
     *   data: {
     *     // ... data to create a LinkedInPost
     *   }
     * })
     * 
     */
    create<T extends LinkedInPostCreateArgs>(args: SelectSubset<T, LinkedInPostCreateArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LinkedInPosts.
     * @param {LinkedInPostCreateManyArgs} args - Arguments to create many LinkedInPosts.
     * @example
     * // Create many LinkedInPosts
     * const linkedInPost = await prisma.linkedInPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkedInPostCreateManyArgs>(args?: SelectSubset<T, LinkedInPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LinkedInPosts and returns the data saved in the database.
     * @param {LinkedInPostCreateManyAndReturnArgs} args - Arguments to create many LinkedInPosts.
     * @example
     * // Create many LinkedInPosts
     * const linkedInPost = await prisma.linkedInPost.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LinkedInPosts and only return the `id`
     * const linkedInPostWithIdOnly = await prisma.linkedInPost.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkedInPostCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkedInPostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LinkedInPost.
     * @param {LinkedInPostDeleteArgs} args - Arguments to delete one LinkedInPost.
     * @example
     * // Delete one LinkedInPost
     * const LinkedInPost = await prisma.linkedInPost.delete({
     *   where: {
     *     // ... filter to delete one LinkedInPost
     *   }
     * })
     * 
     */
    delete<T extends LinkedInPostDeleteArgs>(args: SelectSubset<T, LinkedInPostDeleteArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LinkedInPost.
     * @param {LinkedInPostUpdateArgs} args - Arguments to update one LinkedInPost.
     * @example
     * // Update one LinkedInPost
     * const linkedInPost = await prisma.linkedInPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkedInPostUpdateArgs>(args: SelectSubset<T, LinkedInPostUpdateArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LinkedInPosts.
     * @param {LinkedInPostDeleteManyArgs} args - Arguments to filter LinkedInPosts to delete.
     * @example
     * // Delete a few LinkedInPosts
     * const { count } = await prisma.linkedInPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkedInPostDeleteManyArgs>(args?: SelectSubset<T, LinkedInPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkedInPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LinkedInPosts
     * const linkedInPost = await prisma.linkedInPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkedInPostUpdateManyArgs>(args: SelectSubset<T, LinkedInPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkedInPosts and returns the data updated in the database.
     * @param {LinkedInPostUpdateManyAndReturnArgs} args - Arguments to update many LinkedInPosts.
     * @example
     * // Update many LinkedInPosts
     * const linkedInPost = await prisma.linkedInPost.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LinkedInPosts and only return the `id`
     * const linkedInPostWithIdOnly = await prisma.linkedInPost.updateManyAndReturn({
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
    updateManyAndReturn<T extends LinkedInPostUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkedInPostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LinkedInPost.
     * @param {LinkedInPostUpsertArgs} args - Arguments to update or create a LinkedInPost.
     * @example
     * // Update or create a LinkedInPost
     * const linkedInPost = await prisma.linkedInPost.upsert({
     *   create: {
     *     // ... data to create a LinkedInPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LinkedInPost we want to update
     *   }
     * })
     */
    upsert<T extends LinkedInPostUpsertArgs>(args: SelectSubset<T, LinkedInPostUpsertArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LinkedInPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostCountArgs} args - Arguments to filter LinkedInPosts to count.
     * @example
     * // Count the number of LinkedInPosts
     * const count = await prisma.linkedInPost.count({
     *   where: {
     *     // ... the filter for the LinkedInPosts we want to count
     *   }
     * })
    **/
    count<T extends LinkedInPostCountArgs>(
      args?: Subset<T, LinkedInPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkedInPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LinkedInPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LinkedInPostAggregateArgs>(args: Subset<T, LinkedInPostAggregateArgs>): Prisma.PrismaPromise<GetLinkedInPostAggregateType<T>>

    /**
     * Group by LinkedInPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostGroupByArgs} args - Group by arguments.
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
      T extends LinkedInPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkedInPostGroupByArgs['orderBy'] }
        : { orderBy?: LinkedInPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LinkedInPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkedInPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LinkedInPost model
   */
  readonly fields: LinkedInPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LinkedInPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkedInPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    images<T extends LinkedInPost$imagesArgs<ExtArgs> = {}>(args?: Subset<T, LinkedInPost$imagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the LinkedInPost model
   */
  interface LinkedInPostFieldRefs {
    readonly id: FieldRef<"LinkedInPost", 'String'>
    readonly authorUrn: FieldRef<"LinkedInPost", 'String'>
    readonly text: FieldRef<"LinkedInPost", 'String'>
    readonly publishedAt: FieldRef<"LinkedInPost", 'DateTime'>
    readonly createdAt: FieldRef<"LinkedInPost", 'DateTime'>
    readonly lastModifiedAt: FieldRef<"LinkedInPost", 'DateTime'>
    readonly linkUrl: FieldRef<"LinkedInPost", 'String'>
    readonly raw: FieldRef<"LinkedInPost", 'Json'>
  }
    

  // Custom InputTypes
  /**
   * LinkedInPost findUnique
   */
  export type LinkedInPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPost to fetch.
     */
    where: LinkedInPostWhereUniqueInput
  }

  /**
   * LinkedInPost findUniqueOrThrow
   */
  export type LinkedInPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPost to fetch.
     */
    where: LinkedInPostWhereUniqueInput
  }

  /**
   * LinkedInPost findFirst
   */
  export type LinkedInPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPost to fetch.
     */
    where?: LinkedInPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPosts to fetch.
     */
    orderBy?: LinkedInPostOrderByWithRelationInput | LinkedInPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkedInPosts.
     */
    cursor?: LinkedInPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkedInPosts.
     */
    distinct?: LinkedInPostScalarFieldEnum | LinkedInPostScalarFieldEnum[]
  }

  /**
   * LinkedInPost findFirstOrThrow
   */
  export type LinkedInPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPost to fetch.
     */
    where?: LinkedInPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPosts to fetch.
     */
    orderBy?: LinkedInPostOrderByWithRelationInput | LinkedInPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkedInPosts.
     */
    cursor?: LinkedInPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkedInPosts.
     */
    distinct?: LinkedInPostScalarFieldEnum | LinkedInPostScalarFieldEnum[]
  }

  /**
   * LinkedInPost findMany
   */
  export type LinkedInPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPosts to fetch.
     */
    where?: LinkedInPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPosts to fetch.
     */
    orderBy?: LinkedInPostOrderByWithRelationInput | LinkedInPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LinkedInPosts.
     */
    cursor?: LinkedInPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPosts.
     */
    skip?: number
    distinct?: LinkedInPostScalarFieldEnum | LinkedInPostScalarFieldEnum[]
  }

  /**
   * LinkedInPost create
   */
  export type LinkedInPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * The data needed to create a LinkedInPost.
     */
    data: XOR<LinkedInPostCreateInput, LinkedInPostUncheckedCreateInput>
  }

  /**
   * LinkedInPost createMany
   */
  export type LinkedInPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LinkedInPosts.
     */
    data: LinkedInPostCreateManyInput | LinkedInPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LinkedInPost createManyAndReturn
   */
  export type LinkedInPostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * The data used to create many LinkedInPosts.
     */
    data: LinkedInPostCreateManyInput | LinkedInPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LinkedInPost update
   */
  export type LinkedInPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * The data needed to update a LinkedInPost.
     */
    data: XOR<LinkedInPostUpdateInput, LinkedInPostUncheckedUpdateInput>
    /**
     * Choose, which LinkedInPost to update.
     */
    where: LinkedInPostWhereUniqueInput
  }

  /**
   * LinkedInPost updateMany
   */
  export type LinkedInPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LinkedInPosts.
     */
    data: XOR<LinkedInPostUpdateManyMutationInput, LinkedInPostUncheckedUpdateManyInput>
    /**
     * Filter which LinkedInPosts to update
     */
    where?: LinkedInPostWhereInput
    /**
     * Limit how many LinkedInPosts to update.
     */
    limit?: number
  }

  /**
   * LinkedInPost updateManyAndReturn
   */
  export type LinkedInPostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * The data used to update LinkedInPosts.
     */
    data: XOR<LinkedInPostUpdateManyMutationInput, LinkedInPostUncheckedUpdateManyInput>
    /**
     * Filter which LinkedInPosts to update
     */
    where?: LinkedInPostWhereInput
    /**
     * Limit how many LinkedInPosts to update.
     */
    limit?: number
  }

  /**
   * LinkedInPost upsert
   */
  export type LinkedInPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * The filter to search for the LinkedInPost to update in case it exists.
     */
    where: LinkedInPostWhereUniqueInput
    /**
     * In case the LinkedInPost found by the `where` argument doesn't exist, create a new LinkedInPost with this data.
     */
    create: XOR<LinkedInPostCreateInput, LinkedInPostUncheckedCreateInput>
    /**
     * In case the LinkedInPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkedInPostUpdateInput, LinkedInPostUncheckedUpdateInput>
  }

  /**
   * LinkedInPost delete
   */
  export type LinkedInPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
    /**
     * Filter which LinkedInPost to delete.
     */
    where: LinkedInPostWhereUniqueInput
  }

  /**
   * LinkedInPost deleteMany
   */
  export type LinkedInPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkedInPosts to delete
     */
    where?: LinkedInPostWhereInput
    /**
     * Limit how many LinkedInPosts to delete.
     */
    limit?: number
  }

  /**
   * LinkedInPost.images
   */
  export type LinkedInPost$imagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    where?: LinkedInPostImageWhereInput
    orderBy?: LinkedInPostImageOrderByWithRelationInput | LinkedInPostImageOrderByWithRelationInput[]
    cursor?: LinkedInPostImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: LinkedInPostImageScalarFieldEnum | LinkedInPostImageScalarFieldEnum[]
  }

  /**
   * LinkedInPost without action
   */
  export type LinkedInPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPost
     */
    select?: LinkedInPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPost
     */
    omit?: LinkedInPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostInclude<ExtArgs> | null
  }


  /**
   * Model LinkedInPostImage
   */

  export type AggregateLinkedInPostImage = {
    _count: LinkedInPostImageCountAggregateOutputType | null
    _avg: LinkedInPostImageAvgAggregateOutputType | null
    _sum: LinkedInPostImageSumAggregateOutputType | null
    _min: LinkedInPostImageMinAggregateOutputType | null
    _max: LinkedInPostImageMaxAggregateOutputType | null
  }

  export type LinkedInPostImageAvgAggregateOutputType = {
    position: number | null
  }

  export type LinkedInPostImageSumAggregateOutputType = {
    position: number | null
  }

  export type LinkedInPostImageMinAggregateOutputType = {
    id: string | null
    postId: string | null
    imageUrn: string | null
    imageUrl: string | null
    altText: string | null
    position: number | null
  }

  export type LinkedInPostImageMaxAggregateOutputType = {
    id: string | null
    postId: string | null
    imageUrn: string | null
    imageUrl: string | null
    altText: string | null
    position: number | null
  }

  export type LinkedInPostImageCountAggregateOutputType = {
    id: number
    postId: number
    imageUrn: number
    imageUrl: number
    altText: number
    position: number
    _all: number
  }


  export type LinkedInPostImageAvgAggregateInputType = {
    position?: true
  }

  export type LinkedInPostImageSumAggregateInputType = {
    position?: true
  }

  export type LinkedInPostImageMinAggregateInputType = {
    id?: true
    postId?: true
    imageUrn?: true
    imageUrl?: true
    altText?: true
    position?: true
  }

  export type LinkedInPostImageMaxAggregateInputType = {
    id?: true
    postId?: true
    imageUrn?: true
    imageUrl?: true
    altText?: true
    position?: true
  }

  export type LinkedInPostImageCountAggregateInputType = {
    id?: true
    postId?: true
    imageUrn?: true
    imageUrl?: true
    altText?: true
    position?: true
    _all?: true
  }

  export type LinkedInPostImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkedInPostImage to aggregate.
     */
    where?: LinkedInPostImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPostImages to fetch.
     */
    orderBy?: LinkedInPostImageOrderByWithRelationInput | LinkedInPostImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LinkedInPostImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPostImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LinkedInPostImages
    **/
    _count?: true | LinkedInPostImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LinkedInPostImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LinkedInPostImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LinkedInPostImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LinkedInPostImageMaxAggregateInputType
  }

  export type GetLinkedInPostImageAggregateType<T extends LinkedInPostImageAggregateArgs> = {
        [P in keyof T & keyof AggregateLinkedInPostImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLinkedInPostImage[P]>
      : GetScalarType<T[P], AggregateLinkedInPostImage[P]>
  }




  export type LinkedInPostImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LinkedInPostImageWhereInput
    orderBy?: LinkedInPostImageOrderByWithAggregationInput | LinkedInPostImageOrderByWithAggregationInput[]
    by: LinkedInPostImageScalarFieldEnum[] | LinkedInPostImageScalarFieldEnum
    having?: LinkedInPostImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LinkedInPostImageCountAggregateInputType | true
    _avg?: LinkedInPostImageAvgAggregateInputType
    _sum?: LinkedInPostImageSumAggregateInputType
    _min?: LinkedInPostImageMinAggregateInputType
    _max?: LinkedInPostImageMaxAggregateInputType
  }

  export type LinkedInPostImageGroupByOutputType = {
    id: string
    postId: string
    imageUrn: string
    imageUrl: string | null
    altText: string | null
    position: number | null
    _count: LinkedInPostImageCountAggregateOutputType | null
    _avg: LinkedInPostImageAvgAggregateOutputType | null
    _sum: LinkedInPostImageSumAggregateOutputType | null
    _min: LinkedInPostImageMinAggregateOutputType | null
    _max: LinkedInPostImageMaxAggregateOutputType | null
  }

  type GetLinkedInPostImageGroupByPayload<T extends LinkedInPostImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LinkedInPostImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LinkedInPostImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LinkedInPostImageGroupByOutputType[P]>
            : GetScalarType<T[P], LinkedInPostImageGroupByOutputType[P]>
        }
      >
    >


  export type LinkedInPostImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    imageUrn?: boolean
    imageUrl?: boolean
    altText?: boolean
    position?: boolean
    post?: boolean | LinkedInPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkedInPostImage"]>

  export type LinkedInPostImageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    imageUrn?: boolean
    imageUrl?: boolean
    altText?: boolean
    position?: boolean
    post?: boolean | LinkedInPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkedInPostImage"]>

  export type LinkedInPostImageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    postId?: boolean
    imageUrn?: boolean
    imageUrl?: boolean
    altText?: boolean
    position?: boolean
    post?: boolean | LinkedInPostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["linkedInPostImage"]>

  export type LinkedInPostImageSelectScalar = {
    id?: boolean
    postId?: boolean
    imageUrn?: boolean
    imageUrl?: boolean
    altText?: boolean
    position?: boolean
  }

  export type LinkedInPostImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "postId" | "imageUrn" | "imageUrl" | "altText" | "position", ExtArgs["result"]["linkedInPostImage"]>
  export type LinkedInPostImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | LinkedInPostDefaultArgs<ExtArgs>
  }
  export type LinkedInPostImageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | LinkedInPostDefaultArgs<ExtArgs>
  }
  export type LinkedInPostImageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    post?: boolean | LinkedInPostDefaultArgs<ExtArgs>
  }

  export type $LinkedInPostImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "LinkedInPostImage"
    objects: {
      post: Prisma.$LinkedInPostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      postId: string
      imageUrn: string
      imageUrl: string | null
      altText: string | null
      position: number | null
    }, ExtArgs["result"]["linkedInPostImage"]>
    composites: {}
  }

  type LinkedInPostImageGetPayload<S extends boolean | null | undefined | LinkedInPostImageDefaultArgs> = $Result.GetResult<Prisma.$LinkedInPostImagePayload, S>

  type LinkedInPostImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LinkedInPostImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LinkedInPostImageCountAggregateInputType | true
    }

  export interface LinkedInPostImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['LinkedInPostImage'], meta: { name: 'LinkedInPostImage' } }
    /**
     * Find zero or one LinkedInPostImage that matches the filter.
     * @param {LinkedInPostImageFindUniqueArgs} args - Arguments to find a LinkedInPostImage
     * @example
     * // Get one LinkedInPostImage
     * const linkedInPostImage = await prisma.linkedInPostImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LinkedInPostImageFindUniqueArgs>(args: SelectSubset<T, LinkedInPostImageFindUniqueArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one LinkedInPostImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LinkedInPostImageFindUniqueOrThrowArgs} args - Arguments to find a LinkedInPostImage
     * @example
     * // Get one LinkedInPostImage
     * const linkedInPostImage = await prisma.linkedInPostImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LinkedInPostImageFindUniqueOrThrowArgs>(args: SelectSubset<T, LinkedInPostImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkedInPostImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageFindFirstArgs} args - Arguments to find a LinkedInPostImage
     * @example
     * // Get one LinkedInPostImage
     * const linkedInPostImage = await prisma.linkedInPostImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LinkedInPostImageFindFirstArgs>(args?: SelectSubset<T, LinkedInPostImageFindFirstArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first LinkedInPostImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageFindFirstOrThrowArgs} args - Arguments to find a LinkedInPostImage
     * @example
     * // Get one LinkedInPostImage
     * const linkedInPostImage = await prisma.linkedInPostImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LinkedInPostImageFindFirstOrThrowArgs>(args?: SelectSubset<T, LinkedInPostImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more LinkedInPostImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LinkedInPostImages
     * const linkedInPostImages = await prisma.linkedInPostImage.findMany()
     * 
     * // Get first 10 LinkedInPostImages
     * const linkedInPostImages = await prisma.linkedInPostImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const linkedInPostImageWithIdOnly = await prisma.linkedInPostImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LinkedInPostImageFindManyArgs>(args?: SelectSubset<T, LinkedInPostImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a LinkedInPostImage.
     * @param {LinkedInPostImageCreateArgs} args - Arguments to create a LinkedInPostImage.
     * @example
     * // Create one LinkedInPostImage
     * const LinkedInPostImage = await prisma.linkedInPostImage.create({
     *   data: {
     *     // ... data to create a LinkedInPostImage
     *   }
     * })
     * 
     */
    create<T extends LinkedInPostImageCreateArgs>(args: SelectSubset<T, LinkedInPostImageCreateArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many LinkedInPostImages.
     * @param {LinkedInPostImageCreateManyArgs} args - Arguments to create many LinkedInPostImages.
     * @example
     * // Create many LinkedInPostImages
     * const linkedInPostImage = await prisma.linkedInPostImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LinkedInPostImageCreateManyArgs>(args?: SelectSubset<T, LinkedInPostImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many LinkedInPostImages and returns the data saved in the database.
     * @param {LinkedInPostImageCreateManyAndReturnArgs} args - Arguments to create many LinkedInPostImages.
     * @example
     * // Create many LinkedInPostImages
     * const linkedInPostImage = await prisma.linkedInPostImage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many LinkedInPostImages and only return the `id`
     * const linkedInPostImageWithIdOnly = await prisma.linkedInPostImage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LinkedInPostImageCreateManyAndReturnArgs>(args?: SelectSubset<T, LinkedInPostImageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a LinkedInPostImage.
     * @param {LinkedInPostImageDeleteArgs} args - Arguments to delete one LinkedInPostImage.
     * @example
     * // Delete one LinkedInPostImage
     * const LinkedInPostImage = await prisma.linkedInPostImage.delete({
     *   where: {
     *     // ... filter to delete one LinkedInPostImage
     *   }
     * })
     * 
     */
    delete<T extends LinkedInPostImageDeleteArgs>(args: SelectSubset<T, LinkedInPostImageDeleteArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one LinkedInPostImage.
     * @param {LinkedInPostImageUpdateArgs} args - Arguments to update one LinkedInPostImage.
     * @example
     * // Update one LinkedInPostImage
     * const linkedInPostImage = await prisma.linkedInPostImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LinkedInPostImageUpdateArgs>(args: SelectSubset<T, LinkedInPostImageUpdateArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more LinkedInPostImages.
     * @param {LinkedInPostImageDeleteManyArgs} args - Arguments to filter LinkedInPostImages to delete.
     * @example
     * // Delete a few LinkedInPostImages
     * const { count } = await prisma.linkedInPostImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LinkedInPostImageDeleteManyArgs>(args?: SelectSubset<T, LinkedInPostImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkedInPostImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LinkedInPostImages
     * const linkedInPostImage = await prisma.linkedInPostImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LinkedInPostImageUpdateManyArgs>(args: SelectSubset<T, LinkedInPostImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more LinkedInPostImages and returns the data updated in the database.
     * @param {LinkedInPostImageUpdateManyAndReturnArgs} args - Arguments to update many LinkedInPostImages.
     * @example
     * // Update many LinkedInPostImages
     * const linkedInPostImage = await prisma.linkedInPostImage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more LinkedInPostImages and only return the `id`
     * const linkedInPostImageWithIdOnly = await prisma.linkedInPostImage.updateManyAndReturn({
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
    updateManyAndReturn<T extends LinkedInPostImageUpdateManyAndReturnArgs>(args: SelectSubset<T, LinkedInPostImageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one LinkedInPostImage.
     * @param {LinkedInPostImageUpsertArgs} args - Arguments to update or create a LinkedInPostImage.
     * @example
     * // Update or create a LinkedInPostImage
     * const linkedInPostImage = await prisma.linkedInPostImage.upsert({
     *   create: {
     *     // ... data to create a LinkedInPostImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LinkedInPostImage we want to update
     *   }
     * })
     */
    upsert<T extends LinkedInPostImageUpsertArgs>(args: SelectSubset<T, LinkedInPostImageUpsertArgs<ExtArgs>>): Prisma__LinkedInPostImageClient<$Result.GetResult<Prisma.$LinkedInPostImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of LinkedInPostImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageCountArgs} args - Arguments to filter LinkedInPostImages to count.
     * @example
     * // Count the number of LinkedInPostImages
     * const count = await prisma.linkedInPostImage.count({
     *   where: {
     *     // ... the filter for the LinkedInPostImages we want to count
     *   }
     * })
    **/
    count<T extends LinkedInPostImageCountArgs>(
      args?: Subset<T, LinkedInPostImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LinkedInPostImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LinkedInPostImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends LinkedInPostImageAggregateArgs>(args: Subset<T, LinkedInPostImageAggregateArgs>): Prisma.PrismaPromise<GetLinkedInPostImageAggregateType<T>>

    /**
     * Group by LinkedInPostImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LinkedInPostImageGroupByArgs} args - Group by arguments.
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
      T extends LinkedInPostImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LinkedInPostImageGroupByArgs['orderBy'] }
        : { orderBy?: LinkedInPostImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, LinkedInPostImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLinkedInPostImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the LinkedInPostImage model
   */
  readonly fields: LinkedInPostImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for LinkedInPostImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LinkedInPostImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    post<T extends LinkedInPostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LinkedInPostDefaultArgs<ExtArgs>>): Prisma__LinkedInPostClient<$Result.GetResult<Prisma.$LinkedInPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the LinkedInPostImage model
   */
  interface LinkedInPostImageFieldRefs {
    readonly id: FieldRef<"LinkedInPostImage", 'String'>
    readonly postId: FieldRef<"LinkedInPostImage", 'String'>
    readonly imageUrn: FieldRef<"LinkedInPostImage", 'String'>
    readonly imageUrl: FieldRef<"LinkedInPostImage", 'String'>
    readonly altText: FieldRef<"LinkedInPostImage", 'String'>
    readonly position: FieldRef<"LinkedInPostImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * LinkedInPostImage findUnique
   */
  export type LinkedInPostImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPostImage to fetch.
     */
    where: LinkedInPostImageWhereUniqueInput
  }

  /**
   * LinkedInPostImage findUniqueOrThrow
   */
  export type LinkedInPostImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPostImage to fetch.
     */
    where: LinkedInPostImageWhereUniqueInput
  }

  /**
   * LinkedInPostImage findFirst
   */
  export type LinkedInPostImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPostImage to fetch.
     */
    where?: LinkedInPostImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPostImages to fetch.
     */
    orderBy?: LinkedInPostImageOrderByWithRelationInput | LinkedInPostImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkedInPostImages.
     */
    cursor?: LinkedInPostImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPostImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkedInPostImages.
     */
    distinct?: LinkedInPostImageScalarFieldEnum | LinkedInPostImageScalarFieldEnum[]
  }

  /**
   * LinkedInPostImage findFirstOrThrow
   */
  export type LinkedInPostImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPostImage to fetch.
     */
    where?: LinkedInPostImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPostImages to fetch.
     */
    orderBy?: LinkedInPostImageOrderByWithRelationInput | LinkedInPostImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LinkedInPostImages.
     */
    cursor?: LinkedInPostImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPostImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LinkedInPostImages.
     */
    distinct?: LinkedInPostImageScalarFieldEnum | LinkedInPostImageScalarFieldEnum[]
  }

  /**
   * LinkedInPostImage findMany
   */
  export type LinkedInPostImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * Filter, which LinkedInPostImages to fetch.
     */
    where?: LinkedInPostImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LinkedInPostImages to fetch.
     */
    orderBy?: LinkedInPostImageOrderByWithRelationInput | LinkedInPostImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LinkedInPostImages.
     */
    cursor?: LinkedInPostImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LinkedInPostImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LinkedInPostImages.
     */
    skip?: number
    distinct?: LinkedInPostImageScalarFieldEnum | LinkedInPostImageScalarFieldEnum[]
  }

  /**
   * LinkedInPostImage create
   */
  export type LinkedInPostImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * The data needed to create a LinkedInPostImage.
     */
    data: XOR<LinkedInPostImageCreateInput, LinkedInPostImageUncheckedCreateInput>
  }

  /**
   * LinkedInPostImage createMany
   */
  export type LinkedInPostImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many LinkedInPostImages.
     */
    data: LinkedInPostImageCreateManyInput | LinkedInPostImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * LinkedInPostImage createManyAndReturn
   */
  export type LinkedInPostImageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * The data used to create many LinkedInPostImages.
     */
    data: LinkedInPostImageCreateManyInput | LinkedInPostImageCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * LinkedInPostImage update
   */
  export type LinkedInPostImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * The data needed to update a LinkedInPostImage.
     */
    data: XOR<LinkedInPostImageUpdateInput, LinkedInPostImageUncheckedUpdateInput>
    /**
     * Choose, which LinkedInPostImage to update.
     */
    where: LinkedInPostImageWhereUniqueInput
  }

  /**
   * LinkedInPostImage updateMany
   */
  export type LinkedInPostImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update LinkedInPostImages.
     */
    data: XOR<LinkedInPostImageUpdateManyMutationInput, LinkedInPostImageUncheckedUpdateManyInput>
    /**
     * Filter which LinkedInPostImages to update
     */
    where?: LinkedInPostImageWhereInput
    /**
     * Limit how many LinkedInPostImages to update.
     */
    limit?: number
  }

  /**
   * LinkedInPostImage updateManyAndReturn
   */
  export type LinkedInPostImageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * The data used to update LinkedInPostImages.
     */
    data: XOR<LinkedInPostImageUpdateManyMutationInput, LinkedInPostImageUncheckedUpdateManyInput>
    /**
     * Filter which LinkedInPostImages to update
     */
    where?: LinkedInPostImageWhereInput
    /**
     * Limit how many LinkedInPostImages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * LinkedInPostImage upsert
   */
  export type LinkedInPostImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * The filter to search for the LinkedInPostImage to update in case it exists.
     */
    where: LinkedInPostImageWhereUniqueInput
    /**
     * In case the LinkedInPostImage found by the `where` argument doesn't exist, create a new LinkedInPostImage with this data.
     */
    create: XOR<LinkedInPostImageCreateInput, LinkedInPostImageUncheckedCreateInput>
    /**
     * In case the LinkedInPostImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LinkedInPostImageUpdateInput, LinkedInPostImageUncheckedUpdateInput>
  }

  /**
   * LinkedInPostImage delete
   */
  export type LinkedInPostImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
    /**
     * Filter which LinkedInPostImage to delete.
     */
    where: LinkedInPostImageWhereUniqueInput
  }

  /**
   * LinkedInPostImage deleteMany
   */
  export type LinkedInPostImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which LinkedInPostImages to delete
     */
    where?: LinkedInPostImageWhereInput
    /**
     * Limit how many LinkedInPostImages to delete.
     */
    limit?: number
  }

  /**
   * LinkedInPostImage without action
   */
  export type LinkedInPostImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LinkedInPostImage
     */
    select?: LinkedInPostImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the LinkedInPostImage
     */
    omit?: LinkedInPostImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LinkedInPostImageInclude<ExtArgs> | null
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


  export const LinkedInPostScalarFieldEnum: {
    id: 'id',
    authorUrn: 'authorUrn',
    text: 'text',
    publishedAt: 'publishedAt',
    createdAt: 'createdAt',
    lastModifiedAt: 'lastModifiedAt',
    linkUrl: 'linkUrl',
    raw: 'raw'
  };

  export type LinkedInPostScalarFieldEnum = (typeof LinkedInPostScalarFieldEnum)[keyof typeof LinkedInPostScalarFieldEnum]


  export const LinkedInPostImageScalarFieldEnum: {
    id: 'id',
    postId: 'postId',
    imageUrn: 'imageUrn',
    imageUrl: 'imageUrl',
    altText: 'altText',
    position: 'position'
  };

  export type LinkedInPostImageScalarFieldEnum = (typeof LinkedInPostImageScalarFieldEnum)[keyof typeof LinkedInPostImageScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


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


  export type LinkedInPostWhereInput = {
    AND?: LinkedInPostWhereInput | LinkedInPostWhereInput[]
    OR?: LinkedInPostWhereInput[]
    NOT?: LinkedInPostWhereInput | LinkedInPostWhereInput[]
    id?: StringFilter<"LinkedInPost"> | string
    authorUrn?: StringFilter<"LinkedInPost"> | string
    text?: StringNullableFilter<"LinkedInPost"> | string | null
    publishedAt?: DateTimeFilter<"LinkedInPost"> | Date | string
    createdAt?: DateTimeFilter<"LinkedInPost"> | Date | string
    lastModifiedAt?: DateTimeFilter<"LinkedInPost"> | Date | string
    linkUrl?: StringNullableFilter<"LinkedInPost"> | string | null
    raw?: JsonFilter<"LinkedInPost">
    images?: LinkedInPostImageListRelationFilter
  }

  export type LinkedInPostOrderByWithRelationInput = {
    id?: SortOrder
    authorUrn?: SortOrder
    text?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    lastModifiedAt?: SortOrder
    linkUrl?: SortOrderInput | SortOrder
    raw?: SortOrder
    images?: LinkedInPostImageOrderByRelationAggregateInput
  }

  export type LinkedInPostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LinkedInPostWhereInput | LinkedInPostWhereInput[]
    OR?: LinkedInPostWhereInput[]
    NOT?: LinkedInPostWhereInput | LinkedInPostWhereInput[]
    authorUrn?: StringFilter<"LinkedInPost"> | string
    text?: StringNullableFilter<"LinkedInPost"> | string | null
    publishedAt?: DateTimeFilter<"LinkedInPost"> | Date | string
    createdAt?: DateTimeFilter<"LinkedInPost"> | Date | string
    lastModifiedAt?: DateTimeFilter<"LinkedInPost"> | Date | string
    linkUrl?: StringNullableFilter<"LinkedInPost"> | string | null
    raw?: JsonFilter<"LinkedInPost">
    images?: LinkedInPostImageListRelationFilter
  }, "id">

  export type LinkedInPostOrderByWithAggregationInput = {
    id?: SortOrder
    authorUrn?: SortOrder
    text?: SortOrderInput | SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    lastModifiedAt?: SortOrder
    linkUrl?: SortOrderInput | SortOrder
    raw?: SortOrder
    _count?: LinkedInPostCountOrderByAggregateInput
    _max?: LinkedInPostMaxOrderByAggregateInput
    _min?: LinkedInPostMinOrderByAggregateInput
  }

  export type LinkedInPostScalarWhereWithAggregatesInput = {
    AND?: LinkedInPostScalarWhereWithAggregatesInput | LinkedInPostScalarWhereWithAggregatesInput[]
    OR?: LinkedInPostScalarWhereWithAggregatesInput[]
    NOT?: LinkedInPostScalarWhereWithAggregatesInput | LinkedInPostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LinkedInPost"> | string
    authorUrn?: StringWithAggregatesFilter<"LinkedInPost"> | string
    text?: StringNullableWithAggregatesFilter<"LinkedInPost"> | string | null
    publishedAt?: DateTimeWithAggregatesFilter<"LinkedInPost"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"LinkedInPost"> | Date | string
    lastModifiedAt?: DateTimeWithAggregatesFilter<"LinkedInPost"> | Date | string
    linkUrl?: StringNullableWithAggregatesFilter<"LinkedInPost"> | string | null
    raw?: JsonWithAggregatesFilter<"LinkedInPost">
  }

  export type LinkedInPostImageWhereInput = {
    AND?: LinkedInPostImageWhereInput | LinkedInPostImageWhereInput[]
    OR?: LinkedInPostImageWhereInput[]
    NOT?: LinkedInPostImageWhereInput | LinkedInPostImageWhereInput[]
    id?: StringFilter<"LinkedInPostImage"> | string
    postId?: StringFilter<"LinkedInPostImage"> | string
    imageUrn?: StringFilter<"LinkedInPostImage"> | string
    imageUrl?: StringNullableFilter<"LinkedInPostImage"> | string | null
    altText?: StringNullableFilter<"LinkedInPostImage"> | string | null
    position?: IntNullableFilter<"LinkedInPostImage"> | number | null
    post?: XOR<LinkedInPostScalarRelationFilter, LinkedInPostWhereInput>
  }

  export type LinkedInPostImageOrderByWithRelationInput = {
    id?: SortOrder
    postId?: SortOrder
    imageUrn?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    altText?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    post?: LinkedInPostOrderByWithRelationInput
  }

  export type LinkedInPostImageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    postId_imageUrn?: LinkedInPostImagePostIdImageUrnCompoundUniqueInput
    AND?: LinkedInPostImageWhereInput | LinkedInPostImageWhereInput[]
    OR?: LinkedInPostImageWhereInput[]
    NOT?: LinkedInPostImageWhereInput | LinkedInPostImageWhereInput[]
    postId?: StringFilter<"LinkedInPostImage"> | string
    imageUrn?: StringFilter<"LinkedInPostImage"> | string
    imageUrl?: StringNullableFilter<"LinkedInPostImage"> | string | null
    altText?: StringNullableFilter<"LinkedInPostImage"> | string | null
    position?: IntNullableFilter<"LinkedInPostImage"> | number | null
    post?: XOR<LinkedInPostScalarRelationFilter, LinkedInPostWhereInput>
  }, "id" | "postId_imageUrn">

  export type LinkedInPostImageOrderByWithAggregationInput = {
    id?: SortOrder
    postId?: SortOrder
    imageUrn?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    altText?: SortOrderInput | SortOrder
    position?: SortOrderInput | SortOrder
    _count?: LinkedInPostImageCountOrderByAggregateInput
    _avg?: LinkedInPostImageAvgOrderByAggregateInput
    _max?: LinkedInPostImageMaxOrderByAggregateInput
    _min?: LinkedInPostImageMinOrderByAggregateInput
    _sum?: LinkedInPostImageSumOrderByAggregateInput
  }

  export type LinkedInPostImageScalarWhereWithAggregatesInput = {
    AND?: LinkedInPostImageScalarWhereWithAggregatesInput | LinkedInPostImageScalarWhereWithAggregatesInput[]
    OR?: LinkedInPostImageScalarWhereWithAggregatesInput[]
    NOT?: LinkedInPostImageScalarWhereWithAggregatesInput | LinkedInPostImageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"LinkedInPostImage"> | string
    postId?: StringWithAggregatesFilter<"LinkedInPostImage"> | string
    imageUrn?: StringWithAggregatesFilter<"LinkedInPostImage"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"LinkedInPostImage"> | string | null
    altText?: StringNullableWithAggregatesFilter<"LinkedInPostImage"> | string | null
    position?: IntNullableWithAggregatesFilter<"LinkedInPostImage"> | number | null
  }

  export type LinkedInPostCreateInput = {
    id: string
    authorUrn: string
    text?: string | null
    publishedAt: Date | string
    createdAt: Date | string
    lastModifiedAt: Date | string
    linkUrl?: string | null
    raw: JsonNullValueInput | InputJsonValue
    images?: LinkedInPostImageCreateNestedManyWithoutPostInput
  }

  export type LinkedInPostUncheckedCreateInput = {
    id: string
    authorUrn: string
    text?: string | null
    publishedAt: Date | string
    createdAt: Date | string
    lastModifiedAt: Date | string
    linkUrl?: string | null
    raw: JsonNullValueInput | InputJsonValue
    images?: LinkedInPostImageUncheckedCreateNestedManyWithoutPostInput
  }

  export type LinkedInPostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUrn?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastModifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: JsonNullValueInput | InputJsonValue
    images?: LinkedInPostImageUpdateManyWithoutPostNestedInput
  }

  export type LinkedInPostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUrn?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastModifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: JsonNullValueInput | InputJsonValue
    images?: LinkedInPostImageUncheckedUpdateManyWithoutPostNestedInput
  }

  export type LinkedInPostCreateManyInput = {
    id: string
    authorUrn: string
    text?: string | null
    publishedAt: Date | string
    createdAt: Date | string
    lastModifiedAt: Date | string
    linkUrl?: string | null
    raw: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUrn?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastModifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUrn?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastModifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostImageCreateInput = {
    id?: string
    imageUrn: string
    imageUrl?: string | null
    altText?: string | null
    position?: number | null
    post: LinkedInPostCreateNestedOneWithoutImagesInput
  }

  export type LinkedInPostImageUncheckedCreateInput = {
    id?: string
    postId: string
    imageUrn: string
    imageUrl?: string | null
    altText?: string | null
    position?: number | null
  }

  export type LinkedInPostImageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
    post?: LinkedInPostUpdateOneRequiredWithoutImagesNestedInput
  }

  export type LinkedInPostImageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LinkedInPostImageCreateManyInput = {
    id?: string
    postId: string
    imageUrn: string
    imageUrl?: string | null
    altText?: string | null
    position?: number | null
  }

  export type LinkedInPostImageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LinkedInPostImageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
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
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type LinkedInPostImageListRelationFilter = {
    every?: LinkedInPostImageWhereInput
    some?: LinkedInPostImageWhereInput
    none?: LinkedInPostImageWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type LinkedInPostImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LinkedInPostCountOrderByAggregateInput = {
    id?: SortOrder
    authorUrn?: SortOrder
    text?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    lastModifiedAt?: SortOrder
    linkUrl?: SortOrder
    raw?: SortOrder
  }

  export type LinkedInPostMaxOrderByAggregateInput = {
    id?: SortOrder
    authorUrn?: SortOrder
    text?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    lastModifiedAt?: SortOrder
    linkUrl?: SortOrder
  }

  export type LinkedInPostMinOrderByAggregateInput = {
    id?: SortOrder
    authorUrn?: SortOrder
    text?: SortOrder
    publishedAt?: SortOrder
    createdAt?: SortOrder
    lastModifiedAt?: SortOrder
    linkUrl?: SortOrder
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
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type LinkedInPostScalarRelationFilter = {
    is?: LinkedInPostWhereInput
    isNot?: LinkedInPostWhereInput
  }

  export type LinkedInPostImagePostIdImageUrnCompoundUniqueInput = {
    postId: string
    imageUrn: string
  }

  export type LinkedInPostImageCountOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    imageUrn?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrder
    position?: SortOrder
  }

  export type LinkedInPostImageAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type LinkedInPostImageMaxOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    imageUrn?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrder
    position?: SortOrder
  }

  export type LinkedInPostImageMinOrderByAggregateInput = {
    id?: SortOrder
    postId?: SortOrder
    imageUrn?: SortOrder
    imageUrl?: SortOrder
    altText?: SortOrder
    position?: SortOrder
  }

  export type LinkedInPostImageSumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type LinkedInPostImageCreateNestedManyWithoutPostInput = {
    create?: XOR<LinkedInPostImageCreateWithoutPostInput, LinkedInPostImageUncheckedCreateWithoutPostInput> | LinkedInPostImageCreateWithoutPostInput[] | LinkedInPostImageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LinkedInPostImageCreateOrConnectWithoutPostInput | LinkedInPostImageCreateOrConnectWithoutPostInput[]
    createMany?: LinkedInPostImageCreateManyPostInputEnvelope
    connect?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
  }

  export type LinkedInPostImageUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<LinkedInPostImageCreateWithoutPostInput, LinkedInPostImageUncheckedCreateWithoutPostInput> | LinkedInPostImageCreateWithoutPostInput[] | LinkedInPostImageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LinkedInPostImageCreateOrConnectWithoutPostInput | LinkedInPostImageCreateOrConnectWithoutPostInput[]
    createMany?: LinkedInPostImageCreateManyPostInputEnvelope
    connect?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type LinkedInPostImageUpdateManyWithoutPostNestedInput = {
    create?: XOR<LinkedInPostImageCreateWithoutPostInput, LinkedInPostImageUncheckedCreateWithoutPostInput> | LinkedInPostImageCreateWithoutPostInput[] | LinkedInPostImageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LinkedInPostImageCreateOrConnectWithoutPostInput | LinkedInPostImageCreateOrConnectWithoutPostInput[]
    upsert?: LinkedInPostImageUpsertWithWhereUniqueWithoutPostInput | LinkedInPostImageUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: LinkedInPostImageCreateManyPostInputEnvelope
    set?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    disconnect?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    delete?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    connect?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    update?: LinkedInPostImageUpdateWithWhereUniqueWithoutPostInput | LinkedInPostImageUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: LinkedInPostImageUpdateManyWithWhereWithoutPostInput | LinkedInPostImageUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: LinkedInPostImageScalarWhereInput | LinkedInPostImageScalarWhereInput[]
  }

  export type LinkedInPostImageUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<LinkedInPostImageCreateWithoutPostInput, LinkedInPostImageUncheckedCreateWithoutPostInput> | LinkedInPostImageCreateWithoutPostInput[] | LinkedInPostImageUncheckedCreateWithoutPostInput[]
    connectOrCreate?: LinkedInPostImageCreateOrConnectWithoutPostInput | LinkedInPostImageCreateOrConnectWithoutPostInput[]
    upsert?: LinkedInPostImageUpsertWithWhereUniqueWithoutPostInput | LinkedInPostImageUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: LinkedInPostImageCreateManyPostInputEnvelope
    set?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    disconnect?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    delete?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    connect?: LinkedInPostImageWhereUniqueInput | LinkedInPostImageWhereUniqueInput[]
    update?: LinkedInPostImageUpdateWithWhereUniqueWithoutPostInput | LinkedInPostImageUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: LinkedInPostImageUpdateManyWithWhereWithoutPostInput | LinkedInPostImageUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: LinkedInPostImageScalarWhereInput | LinkedInPostImageScalarWhereInput[]
  }

  export type LinkedInPostCreateNestedOneWithoutImagesInput = {
    create?: XOR<LinkedInPostCreateWithoutImagesInput, LinkedInPostUncheckedCreateWithoutImagesInput>
    connectOrCreate?: LinkedInPostCreateOrConnectWithoutImagesInput
    connect?: LinkedInPostWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type LinkedInPostUpdateOneRequiredWithoutImagesNestedInput = {
    create?: XOR<LinkedInPostCreateWithoutImagesInput, LinkedInPostUncheckedCreateWithoutImagesInput>
    connectOrCreate?: LinkedInPostCreateOrConnectWithoutImagesInput
    upsert?: LinkedInPostUpsertWithoutImagesInput
    connect?: LinkedInPostWhereUniqueInput
    update?: XOR<XOR<LinkedInPostUpdateToOneWithWhereWithoutImagesInput, LinkedInPostUpdateWithoutImagesInput>, LinkedInPostUncheckedUpdateWithoutImagesInput>
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
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type LinkedInPostImageCreateWithoutPostInput = {
    id?: string
    imageUrn: string
    imageUrl?: string | null
    altText?: string | null
    position?: number | null
  }

  export type LinkedInPostImageUncheckedCreateWithoutPostInput = {
    id?: string
    imageUrn: string
    imageUrl?: string | null
    altText?: string | null
    position?: number | null
  }

  export type LinkedInPostImageCreateOrConnectWithoutPostInput = {
    where: LinkedInPostImageWhereUniqueInput
    create: XOR<LinkedInPostImageCreateWithoutPostInput, LinkedInPostImageUncheckedCreateWithoutPostInput>
  }

  export type LinkedInPostImageCreateManyPostInputEnvelope = {
    data: LinkedInPostImageCreateManyPostInput | LinkedInPostImageCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type LinkedInPostImageUpsertWithWhereUniqueWithoutPostInput = {
    where: LinkedInPostImageWhereUniqueInput
    update: XOR<LinkedInPostImageUpdateWithoutPostInput, LinkedInPostImageUncheckedUpdateWithoutPostInput>
    create: XOR<LinkedInPostImageCreateWithoutPostInput, LinkedInPostImageUncheckedCreateWithoutPostInput>
  }

  export type LinkedInPostImageUpdateWithWhereUniqueWithoutPostInput = {
    where: LinkedInPostImageWhereUniqueInput
    data: XOR<LinkedInPostImageUpdateWithoutPostInput, LinkedInPostImageUncheckedUpdateWithoutPostInput>
  }

  export type LinkedInPostImageUpdateManyWithWhereWithoutPostInput = {
    where: LinkedInPostImageScalarWhereInput
    data: XOR<LinkedInPostImageUpdateManyMutationInput, LinkedInPostImageUncheckedUpdateManyWithoutPostInput>
  }

  export type LinkedInPostImageScalarWhereInput = {
    AND?: LinkedInPostImageScalarWhereInput | LinkedInPostImageScalarWhereInput[]
    OR?: LinkedInPostImageScalarWhereInput[]
    NOT?: LinkedInPostImageScalarWhereInput | LinkedInPostImageScalarWhereInput[]
    id?: StringFilter<"LinkedInPostImage"> | string
    postId?: StringFilter<"LinkedInPostImage"> | string
    imageUrn?: StringFilter<"LinkedInPostImage"> | string
    imageUrl?: StringNullableFilter<"LinkedInPostImage"> | string | null
    altText?: StringNullableFilter<"LinkedInPostImage"> | string | null
    position?: IntNullableFilter<"LinkedInPostImage"> | number | null
  }

  export type LinkedInPostCreateWithoutImagesInput = {
    id: string
    authorUrn: string
    text?: string | null
    publishedAt: Date | string
    createdAt: Date | string
    lastModifiedAt: Date | string
    linkUrl?: string | null
    raw: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostUncheckedCreateWithoutImagesInput = {
    id: string
    authorUrn: string
    text?: string | null
    publishedAt: Date | string
    createdAt: Date | string
    lastModifiedAt: Date | string
    linkUrl?: string | null
    raw: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostCreateOrConnectWithoutImagesInput = {
    where: LinkedInPostWhereUniqueInput
    create: XOR<LinkedInPostCreateWithoutImagesInput, LinkedInPostUncheckedCreateWithoutImagesInput>
  }

  export type LinkedInPostUpsertWithoutImagesInput = {
    update: XOR<LinkedInPostUpdateWithoutImagesInput, LinkedInPostUncheckedUpdateWithoutImagesInput>
    create: XOR<LinkedInPostCreateWithoutImagesInput, LinkedInPostUncheckedCreateWithoutImagesInput>
    where?: LinkedInPostWhereInput
  }

  export type LinkedInPostUpdateToOneWithWhereWithoutImagesInput = {
    where?: LinkedInPostWhereInput
    data: XOR<LinkedInPostUpdateWithoutImagesInput, LinkedInPostUncheckedUpdateWithoutImagesInput>
  }

  export type LinkedInPostUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUrn?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastModifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostUncheckedUpdateWithoutImagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorUrn?: StringFieldUpdateOperationsInput | string
    text?: NullableStringFieldUpdateOperationsInput | string | null
    publishedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lastModifiedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    linkUrl?: NullableStringFieldUpdateOperationsInput | string | null
    raw?: JsonNullValueInput | InputJsonValue
  }

  export type LinkedInPostImageCreateManyPostInput = {
    id?: string
    imageUrn: string
    imageUrl?: string | null
    altText?: string | null
    position?: number | null
  }

  export type LinkedInPostImageUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LinkedInPostImageUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type LinkedInPostImageUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    imageUrn?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    altText?: NullableStringFieldUpdateOperationsInput | string | null
    position?: NullableIntFieldUpdateOperationsInput | number | null
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