const MyPromise = require('./main')

/**
 *
 * @param {*} value 如果是promise的实例，直接返回，如果是thenable对象，执行then方法，都不是就返回一个成功的promise
 * @returns
 */
MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value
  } else if (value !== null && typeof value.then === 'function') {
    return new MyPromise((resolve, reject) => {
      value.then(resolve, reject)
    })
  } else {
    return new MyPromise(resolve => {
      resolve(value)
    })
  }
}

/**
 *
 * @param {*} reason any 返回一个被拒绝的promise
 * @returns
 */
MyPromise.reject = function (reason) {
  return new MyPromise((_, reject) => {
    reject(reason)
  })
}

/**
 *
 * @param {*} onRejected 其实就相当于调用then(undefined, fn)
 * @returns
 */
MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

/**
 *
 * @param {*} onFinallyFn 无论失败或者成功都会执行的函数
 */
MyPromise.prototype.finally = function (onFinallyFn) {
  this.then(
    () => {
      onFinallyFn()
    },
    () => {
      onFinallyFn()
    }
  )
}

// const p3 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('success')
//   }, Math.random() * 2000)
//   setTimeout(() => {
//     reject('fail')
//   }, Math.random() * 3000)
// })

// p3.then(
//   res => console.log(res),
//   err => console.log(err)
// ).finally(() => console.log('compolete'))

const isIterable = obj =>
  obj !== null && typeof obj[Symbol.iterator] === 'function'

/**
 *
 * @param {*} promises 一个可迭代对象
 * @returns 只有全部成功才返回成功的promise，只要有一个失败就返回失败的promise
 */

MyPromise.all = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (isIterable(promises)) {
      const length = promises.length
      const res = []
      let count = 0
      if (length === 0) {
        resolve(res)
        return
      }

      promises.forEach((item, index) => {
        MyPromise.resolve(item).then(
          res => {
            res[index] === value
            count += 1
            count === length && resolve(res)
          },
          e => reject(e)
        )
      })
    } else {
      reject(new TypeError('The param is not iterable object'))
    }
  })
}

// Promise.all('').then(res => console.log(res))

/**
 *
 * @param {*} promises
 * @returns 收集所有的promise结果，无论失败或者成功
 */
MyPromise.allSettled = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (isIterable(promises)) {
      const length = promises.length
      const res = []
      let count = 0
      if (length === 0) {
        resolve(res)
        return
      }

      promises.forEach((item, index) => {
        MyPromise.resolve(item).then(
          res => {
            res[index] = {
              status: 'fulfilled',
              value: res
            }
            count += 1
            count === length && resolve(res)
          },
          err => {
            res[index] = {
              status: 'rejected',
              reason: err
            }
            count += 1
            count === length && resolve(res)
          }
        )
      })
    } else {
      reject(new TypeError('The param is not iterable object'))
    }
  })
}

// const promise1 = MyPromise.reject(3)
// const promise2 = 1
// const promises = [promise1, promise2]

// Promise.allSettled(promises).then(results =>
//   results.forEach(result => console.log(result))
// )

/**
 *
 * @param {*} promises
 * @returns 只要有一个成功就立即返回，否则返回一个失败的
 */
MyPromise.any = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (isIterable(promises)) {
      const length = promises.length
      const res = []
      let count = 0
      if (length === 0) {
        resolve(res)
        return
      }

      promises.forEach((item, index) => {
        MyPromise.resolve(item).then(
          res => {
            resolve(res)
          },
          err => {
            count += 1
            res.push(err)
            count === length && reject(new AggregateError(res))
          }
        )
      })
    } else {
      reject(new TypeError('The param is not iterable object'))
    }
  })
}

/**
 *
 * @param {*} promises
 * @returns 谁先结束谁先出来
 */
MyPromise.race = function (promises) {
  return new MyPromise((resolve, reject) => {
    if (isIterable(promises)) {
      promises.forEach(item => {
        MyPromise.resolve(item).then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      })
    } else {
      reject(new TypeError('The param is not iterable object'))
    }
  })
}
