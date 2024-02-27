const obj = {
  name: 'cc',
  age: 18
}

// Reflect 与proxy的捕获器是一一对应的
const proxyObj = new Proxy(obj, {
  set(target, key, value) {
    console.log(`set--${key}`, target)
    return Reflect.set(target, key, value)
  },
  get(target, key) {
    console.log(`get-- ${key}`, target)
    return Reflect.get(target, key)
  },
  has(target, key) {
    console.log(`has-- ${key}`)
    return Reflect.has(target, key)
  },
  deleteProperty(target, key) {
    console.log(`delete -- ${key}`)
    return Reflect.deleteProperty(target, key)
  }
})

console.log(proxyObj.name)
proxyObj.age = 18
console.log('age' in proxyObj)
delete proxyObj.age
