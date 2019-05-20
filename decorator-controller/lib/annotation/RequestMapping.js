const utils = require('../utils/AnnotationUtil')
const RequestMethod = require('./RequestMethod')
const hashcode = utils.hashcode(__filename)

function RequestMapping (path, method = RequestMethod.GET) {
  return function (target, name, descriptor) {
    utils.addAnnotation(target, name, hashcode, {
      path,
      method
    })
    return descriptor
  }
}

RequestMapping.prototype = {
  hashcode: hashcode
}

module.exports = RequestMapping
