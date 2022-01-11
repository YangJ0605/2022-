Function.prototype.mycall = function (context, ...args) {
  let ctx = context || window || global
  ctx.fn = this
  let res = ctx.fn(...args)
  delete ctx.fn
  return res
}

function test(a, b) {
  console.log(this.name, a, b)
}
test.mycall({ name: 'cc' }, [1, 2])
