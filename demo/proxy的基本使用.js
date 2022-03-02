const obj = {
  name: 'cc',
  age: 18
}

const proxyObj = new Proxy(obj, {
  set(target, key, value) {
    console.log(`set--${key}`, target)
    target[key] = value
  },
  get(target, key) {
    console.log(`get-- ${key}`, target)
    return target[key]
  },
  has(target, key) {
    console.log(`has-- ${key}`)
    return false
  },
  deleteProperty(target, key) {
    console.log(`delete -- ${key}`)
    return false
  }
})

console.log(proxyObj.name)
proxyObj.age = 18
console.log('age' in proxyObj)
delete proxyObj.age
