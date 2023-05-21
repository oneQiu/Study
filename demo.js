const obj = new Proxy({ a: 1 }, {
  get(target, p, v) {
    console.log(target, p, v);
    if (p === 'prototype') return null
    return target[p]
  }
})

console.log(obj.prototype)