function MiddleWare (params, fun) {
  this.params = params
  this.callback = fun
}

MiddleWare.prototype = {
  getParams: function () {
    return this.params
  },
  getCallback: function () {
    return this.callback
  }
}

module.exports = MiddleWare
