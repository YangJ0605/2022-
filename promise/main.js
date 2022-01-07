const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(fn) {
    this.status = PENDING
    this.result = null
    this.onFulfilledCbs = []
    this.onRejectedCbs = []

    const resolve = result => {
      if (this.status === PENDING) {
        queueMicrotask(() => {
          this.status = FULFILLED
          this.result = result
          this.onFulfilledCbs.forEach(cb => {
            cb(result)
          })
        })
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        queueMicrotask(() => {
          this.status = REJECTED
          this.result = reason
          this.onRejectedCbs.forEach(cb => {
            cb(reason)
          })
        })
      }
    }

    try {
      fn(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.result)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            let x = onRejected(this.result)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }

      if (this.status === PENDING) {
        this.onFulfilledCbs.push(result => {
          try {
            let x = onFulfilled(this.result)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCbs.push(reason => {
          try {
            let x = onRejected(this.result)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })

    return promise2
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 如果返回值是当前promise 需要抛出错误
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'))
  }
  // 如果是promise的实例，需要根据状态进行处理
  if (x instanceof MyPromise) {
    // 如果是pending状态，需要进一步处理
    if (x.status === PENDING) {
      x.then(y => {
        resolvePromise(promise2, y, resolve, reject)
      }, reject)
    } else if (x.status === FULFILLED) {
      // 如果已经是成功的状态，直接resolve它的值
      resolve(x.result)
    } else if (x.status === REJECTED) {
      // 如果已经是失败的状态，直接reject它的原因
      reject(x.result)
    }
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 如果是一个thenable对象或者函数
    // Object.defineProperty
    // 去then的时候可能会报错
    // 例如Object.defineProperty(obj, 'then', {get() {throw 'error'}})
    try {
      var then = x.then
    } catch (e) {
      reject(e)
      return
    }

    if (typeof then === 'function') {
      let called = false
      try {
        then.call(
          x,
          y => {
            if (called) return
            called = true
            resolvePromise(promise2, y, resolve, reject)
          },
          r => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        if (called) return
        called = true

        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

module.exports = MyPromise

MyPromise.deferred = function () {
  let res = {}
  res.promise = new MyPromise((resolve, reject) => {
    res.resolve = resolve
    res.reject = reject
  })
  return res
}

// const p1 = new Promise(r => {
//   setTimeout(() => {
//     // console.log(p1)
//     r(1)
//     // console.log(p1)
//   })
// })

// const p2 = new MyPromise(r => {
//   setTimeout(() => {
//     // console.log(p2)
//     throw 1
//     r(1)
//     console.log(p2)
//   })
// })
// p2.then(
//   r => console.log('r', r),
//   e => console.log('e', e)
// ).then(r => console.log('r2', r))
