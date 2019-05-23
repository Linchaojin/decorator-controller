const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const controller = require('../decorator-controller')
const upload = require('../decorator-controller/middlewares/upload')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
upload.setDiskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D://')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
}).init({ limits: { fileSize: 10 * 1024 * 1024, files: 2 } })
controller.scan(path.join(__dirname, './src')).bind(app)

const server = http.createServer(app)
server.listen(process.env.PORT || '3000', function () {
  let host = server.address().address
  let port = server.address().port
  console.log('server listening at http://%s:%s', host, port)
})
