const { Controller, RequestMapping, RequestMethod } = require('decorator-controller/annotation')
const Before = require('../middleware/annotation/Before')

@Controller
@RequestMapping('/user')
class UserController {
  @RequestMapping('/getUserName')
  @Before('before')
  getUserName () {
    console.log('username')
    return 'username'
  }

  @RequestMapping('/saveUser', RequestMethod.POST)
  saveUser () {
    console.log('saveUser')
    return 'success'
  }
}

module.exports = UserController
