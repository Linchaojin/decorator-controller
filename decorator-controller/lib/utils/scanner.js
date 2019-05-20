const fs = require('fs')
const join = require('path').join
module.exports = {
  scan: function (dirPath) {
    this.modules = []
    this.searchModules(dirPath)
  },
  searchModules: function (dirPath) {
    fs.readdirSync(dirPath).forEach(filenane => {
      let path = join(dirPath, filenane)
      let stat = fs.statSync(path)
      if (stat.isDirectory()) {
        this.searchModules(path)
      } else {
        if (!path.endsWith('.js')) return
        this.modules.push(path)
      }
    })
  }
}
