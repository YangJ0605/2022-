const obj = {
  data: [1, 2, 3, { name: 'cc' }]
}

Object.defineProperty(obj, Symbol.iterator, {
  enumerable: false,
  configurable: false,
  writable: false,
  value() {
    let _this = this
    let index = 0
    return {
      next() {
        if (index < _this.data.length) {
          return { value: _this.data[index++], done: false }
        }
        return { value: undefined, done: true }
      }
    }
  }
})
const a = [1]

for (let o of obj) {
  console.log(o)
}
// {data: any[], [key:string]: any}
console.log(...obj)
console.log(a[Symbol.iterator])
