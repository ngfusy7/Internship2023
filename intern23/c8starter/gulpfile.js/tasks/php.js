const gulp = require('gulp')
const execa = require('execa')
const gutil = require('gulp-util')
const path = require('path')
const url = require('url')
const config = require('../config')
const util = require('../lib/util')

const startPHPTask = function (done) {
  const {theme, proxy, root} = config.getBackendConfig()
  const {host, port} = url.parse(proxy)
  gutil.log('Server starting on: ' + gutil.colors.green(host))
  execa.shell(`php -S 0.0.0.0:${port} -t ${root}`).then(result => {
    if (result.stderr) {
      gutil.log(gutil.colors.red(result.stderr))
    }
    if (result.stdout) {
      gutil.log(gutil.colors.green(result.stdout))
    }
  }).catch(err => {
    gutil.log(gutil.colors.red(err.message))
  })
  if (done) {
    done()
  }
}

gulp.task('php', startPHPTask)
module.exports = startPHPTask
