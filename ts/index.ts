type A = Exclude<'a' | 'b', 'a'>
type B = Extract<'a' | 'b', 'a'>
type C = Partial<'1' | '2'>
type D = Readonly<{ name?: string }>
type E = Required<{ name?: string }>
type F = Pick<{ name: string; age: number }, 'age'>
type G = Record<string, string>
type H = NonNullable<'1' | 2 | null>
type J = InstanceType<typeof Person>
type K = Parameters<typeof fn>
type L = ReturnType<typeof fn>

function fn(name: string, age: number) {
  return 1
}

class Person {
  constructor(public name: string) {
    this.name = name
  }
}

const j: J = {
  name: ''
}

type MyExclude<T, U> = T extends U ? never : T
type A1 = MyExclude<'a' | 'b', 'a'>

type MyExTract<T, U> = T extends U ? T : never
type B1 = MyExTract<'a' | 'b', 'a'>

type MyPartial<T> = {
  [K in keyof T]?: T[K]
}
type C1 = MyPartial<'1' | '2'>

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K]
}
type D1 = MyReadonly<{ name?: string }>

type MyRequired<T> = {
  [K in keyof T]-?: T[K]
}
type E1 = MyRequired<{ name?: string }>

type MyPick<T, U extends keyof T> = {
  [K in U]: T[K]
}
type F1 = MyPick<{ name: string; age: number }, 'age'>

type MyRecord<T extends string | number | symbol, U> = {
  [K in T]: U
}
type G1 = MyRecord<string, string>

type MyNonNullable<T> = T extends undefined | null ? never : T
type H1 = MyNonNullable<'1' | 2 | null>

type MyInstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : any

type J1 = MyInstanceType<typeof Person>
const j1: J1 = {
  name: ''
}

type MyParameters<T extends (...args: any[]) => any> = T extends (
  ...args: infer R
) => any
  ? R
  : never
type K1 = MyParameters<typeof fn>

type MyReturnType<T extends (...args: any[]) => any> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any
type L1 = MyReturnType<typeof fn>
