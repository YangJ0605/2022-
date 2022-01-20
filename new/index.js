/**
 * new 一个构造函数做了哪些事情
 * 1. 创建一个空的对象{}
 * 2. 把该对象的__proto__指向构造函数的prototype
 * 3. 将this指向创建的空对象
 * 4. 如果该构造函数没有返回对象，则返回this
 */

function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype)
  const res = Constructor.apply(obj, args)

  return typeof res === 'object' || typeof res === 'function' ? res || obj : obj
}
