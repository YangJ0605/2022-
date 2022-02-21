type Test<T> = T extends number ? 1 : 2
type Res = Test<1 | 'a'>

type Test2<T> = T extends true ? 1 : 2
type Res2 = Test2<boolean>

type Res3 = Test<any>
type Res4 = Test<never>
// https://mp.weixin.qq.com/s/aYjFtCh2k9KguXowMIfUJQ
export {}
