const utils = require('../../../utils').annotationUtil
const MiddleWare = require('../../../core').MiddleWare
const multer = require('../index').multer
const Mode = require('./UploadMode')
const hashcode = utils.hashcode(__filename)

function Upload (mode, arg1, args2) {
  return function (target, name, descriptor) {
    utils.addAnnotation(target, name, hashcode, new MiddleWare(null, function (req, res, next) {
      let multerMiddleware = null
      if (mode === Mode.SINGLE || mode === Mode.FIELDS) {
        multerMiddleware = multer[mode](arg1)
      } else if (mode === Mode.ARRAY) {
        multerMiddleware = multer[mode](arg1, args2)
      } else if (mode === Mode.NONE || mode === Mode.ANY) {
        multerMiddleware = multer[mode]()
      } else {
        console.log(`不存在的上传模式： ${mode}`)
        next()
        return
      }
      multerMiddleware(req, res, next)
    }))
    return descriptor
  }
}

Upload.prototype = {
  hashcode: hashcode
}

module.exports = Upload
