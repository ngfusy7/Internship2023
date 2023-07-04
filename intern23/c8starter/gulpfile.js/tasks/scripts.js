const gulp = require('gulp')
const webpack = require('webpack')
const gutil = require('gulp-util')

const scripts = (done) => {
  const webpackConfig = require('../webpack.config')()
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      gutil.log(gutil.colors.red(err))
    }
  })
  if (done) {
    done()
  }
}
gulp.task('scripts', scripts)
module.exports = scripts
