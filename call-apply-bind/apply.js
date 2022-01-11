Function.prototype.myApply = function (context, args) {
  let ctx = context || window || global
  ctx.fn = this
  let res
  if (!args) {
    res = ctx.fn(args)
  } else if (typeof args === 'object') {
    res = ctx.fn(...args)
  }
  delete ctx.fn
  return res
}

var foo = {
  name: 'Selina'
}
var name = 'Chirs'
function bar(job, age) {
  console.log(this.name)
  console.log(job, age)
}
bar.myApply(foo, ['programmer', 20])
// Selina programmer 20
bar.myApply(null, ['teacher', 25])
