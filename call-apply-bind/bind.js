Function.prototype.myBind = function (ctx, ...args) {
  const selfFn = this
  function EmptyFn() {}
  EmptyFn.prototype = selfFn.prototype
  function fn(...arg2s) {
    return fn1.apply(this instanceof EmptyFn ? this : ctx || this, [
      ...args,
      ...arg2s
    ])
  }
  fn.prototype = new emptyFn()
  return fn
}
