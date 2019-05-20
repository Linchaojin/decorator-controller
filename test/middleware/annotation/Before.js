const utils = require('decorator-controller/utils').annotationUtil
const Middleware = require('decorator-controller/core').MiddleWare
const hashcode = utils.hashcode(__filename)

const callback = function (req, res, next, params) {
  console.log(params)
  next()
}

function Before (params) {
  return function (target, name, descriptor) {
    utils.addAnnotation(target, name, hashcode, new Middleware(params, callback))
    return descriptor
  }
}

Before.prototype = {
  hashcode: hashcode
}

module.exports = Before
