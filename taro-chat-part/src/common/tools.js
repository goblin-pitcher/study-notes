/*
 通用方法
 */
export function getType(para) {
  return Object.prototype.toString.call(para)
    .replace(/\[object (.+?)\]/, '$1').toLowerCase()
}
export function deepCopy(arg, map) {
  let typeID = ['array', 'object'].indexOf(getType(arg))
  if (typeID < 0) return arg
  let rtn = typeID ? {} : []
  map = map || new WeakMap()
  map.set(arg, rtn)
  Object.keys(arg).map(item => {
    if (map.has(arg[item])) {
      rtn[item] = map.get(arg[item])
    } else {
      rtn[item] = deepCopy(arg[item], map)
    }
  })
  return rtn
}
export function throttle(fn, delay) {
  let timer = null
  return function(...args) {
    if (timer !== null) return
    fn.apply(this, args)
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
    }, delay)
  }
}
export function debounce(fn, delay) {
  let timer = null
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
