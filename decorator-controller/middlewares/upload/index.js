const multer = require('multer')
module.exports = {
  setDiskStorage: function (options) {
    this.storage = multer.diskStorage(options)
    return this
  },
  init: function (options) {
    if (this.storage) {
      this.multer = multer(Object.assign({ storage: this.storage }, options))
    } else {
      this.multer = multer(options)
    }
  }
}
