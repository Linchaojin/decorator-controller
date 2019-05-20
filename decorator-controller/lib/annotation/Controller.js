const utils = require('../utils/AnnotationUtil')
const hashcode = utils.hashcode(__filename)

function Controller (target) {
  utils.addAnnotation(target, null, hashcode, true)
}

Controller.prototype = {
  hashcode: hashcode
}

module.exports = Controller
