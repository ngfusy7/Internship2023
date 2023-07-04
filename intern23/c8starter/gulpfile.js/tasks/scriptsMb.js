const gulp = require('gulp')
const webpack = require('webpack')
const gutil = require('gulp-util')

const scriptsMb = (done) => {
  const webpackConfig = require('../weppack.config.mb')()
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err))
    }
  })
  if (done) {
    done()
  }
}
gulp.task('scriptsMb', scriptsMb)
module.exports = scriptsMb
