const Controller = require('decorator-controller/annotation').Controller
const RequestMapping = require('decorator-controller/annotation').RequestMapping
const RequestMethod = require('decorator-controller/annotation').RequestMethod

@Controller
class DemoController {
  @RequestMapping('/demo1', RequestMethod.POST)
  demo1 () {
    console.log('test')
    return 'demo1'
  }

  @RequestMapping('/demo2')
  demo2 () {
    console.log('demo2')
    return 'demo2'
  }
}

module.exports = DemoController
