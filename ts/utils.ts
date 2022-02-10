type Pop<T extends Array<any>> = T extends [...infer Rest, infer r]
  ? Rest
  : never

type a = Pop<[2, 1]>

type Shift<T extends any[]> = T extends [infer R, ...infer Rest] ? Rest : never

type Push<T extends any[], S extends any> = [...T, S]

type b = Shift<[1, 2, 3]>

type g = Push<[], 'a'>

// array
// 构造长度一定（Length）的元组
type GetTuple<Length extends number = 0> = GetTupleHelper<Length>

type GetTupleHelper<
  Length extends number = 0,
  R extends unknown[] = []
> = R['length'] extends Length ? R : GetTupleHelper<Length, [...R, unknown]>

type c = GetTuple<0>

/**
 * @exports
 * 获取模板字符串类型中的字符
 * @see https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-5.html
 * @example
 * type Result = GetChars<'abc'> // 'a' | 'b' | 'c'
 */
type GetChars<S> = GetCharsHelper<S, never>

/**
 * 以 尾递归 tail-recursive 的方式优化 GetChars，不导出为工具类型
 */
type GetCharsHelper<S, Acc> = S extends `${infer Char}${infer Rest}`
  ? GetCharsHelper<Rest, Char | Acc>
  : Acc

type d = GetChars<'abc'>

type Test<S> = S extends `${infer Char}${infer CC}` ? `${CC}${Char}` : 2

type e = Test<'abc'>

type SplitHelper<
  S extends string,
  SplitStr extends string = '',
  T extends string[] = []
> = S extends `${infer Char}${SplitStr}${infer Rest}`
  ? SplitHelper<Rest, SplitStr, Push<T, Char>>
  : S extends string
  ? S extends ''
    ? T
    : Push<T, S>
  : never

/**
 * 拆分字符串变为一个元组
 * @example
 * type Result = Split<'1,2,3', ','> // [1, 2, 3]
 */
type Split<S extends string, SplitStr extends string = ''> = SplitHelper<
  S,
  SplitStr
>

type Result = Split<'1,2,3', ','> // [1, 2, 3]

let ajiang = 1
let ajiang2 = 1 as const
