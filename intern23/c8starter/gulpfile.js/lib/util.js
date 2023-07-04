const path = require('path')
const PREFIX = 'fc8-'

module.exports = {
  isProd () {
    return global.production
  },
  isDev () {
    return !global.production
  },
  isBackend () {
    return global.backend
  },
  isContainer () {
    return process.env.NODE_ENV === 'docker'
  },
  isLocalPackage (packageName) {
    return packageName.startsWith(PREFIX)
  },
  removePrefix (packageName) {
    return packageName.replace(PREFIX, '')
  },
  convertPathToUrl (p) {
    return p.replace(/\\/g, '/')
  }
}
