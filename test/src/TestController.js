const { Controller, RequestMapping, RequestMethod } = require('../../decorator-controller/annotation')
@Controller
class TestController {
  @RequestMapping('/test1')
  demo1 () {
    console.log('test1')
    return 'test1'
  }

  @RequestMapping('/test2', RequestMethod.POST)
  demo2 () {
    console.log('test1')
    return 'test1'
  }
}

module.exports = TestController
