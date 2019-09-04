export var extend = function(destination, source) {
  for (var prop in source) {
    if (prop in destination) continue
    destination[prop] = source[prop]
  }
  return destination
};;

export var inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false }
  })
};;

export var round = function(num) {
  return Math.round(num * 100) / 100
};;

export var resolveWidth = function(width, maxWidth) {
  var isRelative = !!~width.toString().indexOf('%')
  width = parseFloat(width)
  if (isRelative) {
    if (width >= 100) return maxWidth
    return (width / 100) * maxWidth
  } else {
    if (width > maxWidth) return maxWidth
    else return width
  }
};;

export var toHex = function(n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
};;

export var asHex = function(ab) {
  var view = new Uint8Array(ab), hex = ''
  for (var i = 0, len = ab.byteLength; i < len; ++i) {
    hex += exports.toHex(view[i])
  }
  return hex
};;

export var toArrayBuffer = function(buffer) {
  var ab = new ArrayBuffer(buffer.length)
  var view = new Uint8Array(ab)
  for (var i = 0; i < buffer.length; ++i) {
      view[i] = buffer[i]
  }
  return ab
};;

export var formatDate = function(date) {
  var str = 'D:'
          + date.getFullYear()
          + ('00' + (date.getMonth() + 1)).slice(-2)
          + ('00' + date.getDate()).slice(-2)
          + ('00' + date.getHours()).slice(-2)
          + ('00' + date.getMinutes()).slice(-2)
          + ('00' + date.getSeconds()).slice(-2)

  var offset = date.getTimezoneOffset()
  var rel = offset === 0 ? 'Z' : (offset > 0 ? '-' : '+')
  offset = Math.abs(offset)
  var hoursOffset = Math.floor(offset / 60)
  var minutesOffset = offset - hoursOffset * 60

  str += rel
      + ('00' + hoursOffset).slice(-2)   + '\''
      + ('00' + minutesOffset).slice(-2) + '\''

  return str
};;

export var fixedFloat = function(n) {
 return parseFloat(n.toFixed(2))
};;