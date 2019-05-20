const Clazz = require('../core/clazz')
const crypto = require('crypto')

module.exports = {
  addAnnotation: function (target, methodName, annotation, msg) {
    if (methodName) {
      this.addMethodAnnotation(target, methodName, annotation, msg)
    } else {
      this.addClassAnnotation(target, annotation, msg)
    }
  },
  addMethodAnnotation: function (target, methodName, annotation, msg) {
    if (!target._clazz) {
      target._clazz = new Clazz()
    }
    if (!target._clazz._methodAnntotions[methodName]) {
      target._clazz._methodAnntotions[methodName] = {}
    }
    target._clazz._methodAnntotions[methodName][annotation] = msg
  },
  addClassAnnotation: function (target, annotation, msg) {
    if (!target.prototype._clazz) {
      target.prototype._clazz = new Clazz()
    }
    target.prototype._clazz._clazzAnntotions[annotation] = msg
  },
  hashcode: function (str) {
    let hash = crypto.createHash('sha1')
    hash.update(str)
    return hash.digest('hex')
  }
}
