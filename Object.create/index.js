Object.mycreate = function (proto, propertiesObject) {
  if (typeof proto !== 'object') {
    throw new TypeError(
      'TypeError: Object prototype may only be an Object or null'
    )
  }
  const F = function () {}
  F.prototype = proto
  const obj = new F()
  if (proto === null) {
    obj.__proto__ = null
  }
  if (propertiesObject) {
    Object.defineProperty(obj, propertiesObject)
  }
  return obj
}
