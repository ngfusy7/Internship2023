const gulp = require('gulp')
const bs = require('browser-sync').create()
const config = require('../config')

const demo = (done) => {
  bs.init({
    server: {
      baseDir: config.getDest()
    }
  })
  if (done) {
    done()
  }
}
gulp.task('demo', demo)
module.exports = demo
