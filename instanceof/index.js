/**
 * 模拟实现一个instanceof
 */

function myInstanceof(left, right) {
  let leftPrototype = Object.getPrototypeOf(left)
  let rightPrototype = right.prototype
  while (leftPrototype) {
    if (leftPrototype === rightPrototype) return true
    leftPrototype = Object.getPrototypeOf(leftPrototype)
  }
  return false
}

function P() {
  this.name = 'cc'
}

myInstanceof(P, P)
