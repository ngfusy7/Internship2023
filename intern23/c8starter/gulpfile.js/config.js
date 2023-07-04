const path = require('path')
const fs = require('fs')
const gutil = require('gulp-util')
const pkg = require('../package')
const util = require(__dirname + '/lib/util')
module.exports = {
  paths: require(__dirname + '/config/paths'),
  settings: require(__dirname + '/config/settings'),
  getBackendConfig () {
    if (fs.existsSync(__dirname + '/config/backend.js')) {
      return require(__dirname + '/config/backend')
    }
    return {}
  },
  getPaths () {
    return require(path.join(__dirname, '/config/paths'))
  },
  getBase () {
    return this.paths.root.base
  },
  getSrc () {
    return path.join(this.getBase(), this.paths.root.src)
  },
  getDest () {
    if (util.isBackend()) {
      const {root, theme} = this.getBackendConfig()
      const dest = path.resolve(root, theme)
      gutil.log(gutil.colors.red(`
          Dest ${gutil.colors.cyan(dest)}`))
      if (fs.existsSync(dest)) {
        return dest
      } else {
        gutil.log(gutil.colors.red(`
          Please make sure you config ${gutil.colors.cyan('root, proxy and theme')} correctly
        `))
      }
    }
    return path.join(this.getBase(), this.paths.root.dest)
  },
  getDeploy () {
    return path.join(this.getBase(), this.paths.root.deploy)
  },
  getPathSrc (task) {
    return path.resolve(this.getSrc(), this.paths[task].src)
  },
  getPathDest (task) {
    return path.resolve(this.getDest(), this.paths[task].dest)
  },

  /**
   * include the path and glob pattern, if the task has an exclusive key
   * @param {string} task name
   * @returns string or array
   */
  getTaskSrc (task) {
    if (this.paths[task].exclude) {
      return [
        path.join(this.getPathSrc(task), this.paths[task].pattern),
        '!' + path.join(this.getPathSrc(task), this.paths[task].exclude)
      ]
    } else {
      return path.join(this.getPathSrc(task), this.paths[task].pattern)
    }
  },
  getTaskDest (task) {
    return path.join(this.getDest(), this.paths[task].dest)
  },
  getSettings (task) {
    return this.settings[task]
  }
}
