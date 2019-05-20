const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const controller = require('decorator-controller')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
controller.scan(path.join(__dirname, './src')).bind(app)

const server = http.createServer(app)
server.listen(process.env.PORT || '3000', function () {
  let host = server.address().address
  let port = server.address().port
  console.log('server listening at http://%s:%s', host, port)
})
