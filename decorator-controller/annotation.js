const UploadMode = require('./middlewares/upload/annotation/UploadMode')
const RequestMethod = require('./lib/annotation/RequestMethod')
module.exports = {
  Controller: require('./lib/annotation/Controller'),
  RequestMapping: require('./lib/annotation/RequestMapping'),
  Upload: require('./middlewares/upload/annotation/Upload'),
  RequestMethod: RequestMethod,
  UploadMode: UploadMode
}
