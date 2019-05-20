function Clazz () {
  this._clazzAnntotions = {}
  this._methodAnntotions = {}
}

Clazz.prototype = {
  getClazzAnnotations: function () {
    return this._clazzAnntotions
  },
  getClazzAnnotation: function (target) {
    return this._clazzAnntotions[target.prototype.hashcode]
  },
  getMethodAnnotations: function (methodName) {
    return this._methodAnntotions[methodName]
  },
  getMethodAnnotation: function (methodName, target) {
    return this._methodAnntotions[methodName][target.prototype.hashcode]
  },
  getAnnotationsMethodNames: function (target) {
    let methods = []
    let hasTarget = target && target.prototype
    for (let methodName in this._methodAnntotions) {
      if (hasTarget) {
        let obj = this._methodAnntotions[methodName][target.prototype.hashcode]
        if (obj) methods.push(methodName)
      } else {
        methods.push(methodName)
      }
    }
    return methods
  }
}

module.exports = Clazz
