const gulp = require('gulp')
const path = require('path')
const gsizereport = require('gulp-sizereport')
const config = require('../config')

const sizereport = () => {
  const paths = {
    src: path.join(config.getDest(), '**/*.{js,css}')
  }

  return gulp.src(paths.src)
  .pipe(gsizereport({
    gzip: true
  }))
}
gulp.task('sizereport', sizereport)

module.exports = sizereport
