const { Controller, RequestMapping, RequestMethod, Upload, UploadMode } = require('../../decorator-controller/annotation')

@Controller
class FileController {
  @RequestMapping('/file/upload', RequestMethod.POST)
  @Upload(UploadMode.ARRAY, 'avatar', 3)
  uploadFile (req) {
    console.log(req.file)
    console.log('uploadFile')
    return 'uploadFile'
  }
}

module.exports = FileController
