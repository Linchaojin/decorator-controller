### Decorator Controller
####项目简介：
&emsp;&emsp;使用ES7的新特性——修饰器（decorator）实现的一个NodeJS控制层框架。通过递归扫描目标目录，解析注解实现控制层。你可以用一个@RequestMapping注解简单地实现一个请求接口，使用起来就和SpringMVC。告别繁琐又麻烦地app.get和app.post的使用，拒绝像express-controller用下划线写请求接口，用数组写中间件。你可以自由使用注解声明各种接口，你也可以自定义中间件，使用注解的方式，决定哪一个接口使用中间件。<br>&emsp;&emsp;由于当前版本的NodeJS尚未完全实现对ES7的支持，因此，使用时需要配合babel使用transform-decorators-legacy插件进行转码。
####安装
~~~bash
npm i decorator-controller
~~~
####使用
#####安装babel

安装babel相关依赖和ES7修饰器特性转码包 babel-plugin-transform-decorators-legacy
~~~bash
npm i babel-cli --save
npm i babel-core --save
npm i babel-register --save
npm i babel-plugin-transform-decorators-legacy --save
~~~

在项目根目录下面创建一个.babelrc，内容如下：

.babelrc
~~~json
{
  "plugins": [
    "transform-decorators-legacy"
  ]
}
~~~

个人开发可以引入babel-register实现实时转码，内容如下：

babel-app.js
~~~js
/* 由于修饰器属于ES7的特性，ES6要支持的话，需要用babel进行转码 */
require('babel-register')
require('./app')

~~~
引入babel-register后，会对后面require进来的文件进行转码。

app.js
~~~js
const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
// 这里引入decorator-controller
const controller = require('decorator-controller')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// 扫描src目录下的js文件，根据注解创建控制层
controller.scan(path.join(__dirname, './src')).bind(app)

const server = http.createServer(app)
server.listen(process.env.PORT || '3000', function () {
  let host = server.address().address
  let port = server.address().port
  console.log('server listening at http://%s:%s', host, port)
})
~~~

这里实现了一个简单的控制器

UserController.js
~~~js
// 引入各种注解
const { Controller, RequestMapping, RequestMethod } = require('decorator-controller/annotation')

// 声明控制器
@Controller
// 声明控制器请求前缀，可以不写
@RequestMapping('/user')
class UserController {

  // 创建一个get请求  
  @RequestMapping('/getUserName')
  getUserName () {
    return 'username'
  }

  // 创建一个post请求  
  @RequestMapping('/saveUser', RequestMethod.POST)
  saveUser () {
    console.log('saveUser')
    return 'success'
  }
}

module.exports = UserController
~~~

运行babel-app.js文件，即可运行
