const Advice = require('./advice/respadvice')
const Middleware = require('./core/middleware')
const scanner = require('./utils/scanner')
const Controller = require('./annotation/Controller')
const RequestMapping = require('./annotation/RequestMapping')

function bindFunction (app, msg, fun) {
  let method = msg.method
  let path = msg.path
  app[method](path, function (req, res) {
    fun.apply(this, [req, res])
  })
}

function bindMiddleWare (app, msg, middleware) {
  let method = msg.method
  let path = msg.path
  app[method](path, function (req, res, next) {
    let params = middleware.getParams()
    let fun = middleware.getCallback()
    fun.apply(this, [ req, res, next, params ])
  })
}

function addAroundAdvice (target, methodList) {
  for (let i = 0; i < methodList.length; i++) {
    let methodName = methodList[i]
    const JointPoint = target.prototype[methodName]
    let advice = new Advice()
    const descriptor = function (...values) {
      return advice.Around(this, JointPoint, ...values)
    }
    Reflect.defineProperty(target.prototype, methodName, { value: descriptor })
  }
}

module.exports = {
  scan (path) {
    scanner.scan(path)
    return this
  },
  bind (app) {
    scanner.modules.forEach(path => {
      let Module = require(path)
      let clazz = Module.prototype._clazz
      if (clazz && clazz.getClazzAnnotation(Controller)) {
        let methodList = clazz.getAnnotationsMethodNames(RequestMapping)
        addAroundAdvice(Module, methodList)
        let controller = new Module()
        let meta = clazz.getClazzAnnotation(RequestMapping)
        for (let i = 0; i < methodList.length; i++) {
          let methodName = methodList[i]
          let msg = clazz.getMethodAnnotation(methodName, RequestMapping)
          if (meta) {
            msg.path = meta.path + msg.path
          }
          let middlewaresList = clazz.getMethodAnnotations(methodName)
          for (let key in middlewaresList) {
            let middleware = middlewaresList[key]
            if (middleware instanceof Middleware) {
              bindMiddleWare(app, msg, middleware)
            }
          }
          bindFunction(app, msg, controller[methodName])
        }
      }
    })
  }
}
