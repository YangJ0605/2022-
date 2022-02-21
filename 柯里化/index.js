function curryFn(fn) {
  const argsLength = fn.length
  function curry(...args) {
    if (args.length >= argsLength) {
      return fn(...args)
    } else {
      return function curry2(...args2) {
        return curry(...args, ...args2)
      }
    }
  }

  return curry
}

const sum = (a, b, c) => a + b + c

const currySum = curryFn(sum)

console.log(currySum(1)(2, 3))
console.log(currySum(1)(3)(2))
console.log(currySum(1, 2)(3))
console.log(currySum(1, 2, 3))
