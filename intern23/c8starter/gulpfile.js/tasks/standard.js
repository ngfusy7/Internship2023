const gulp = require('gulp')
const path = require('path')
const execa = require('execa')
const gutil = require('gulp-util')
const gulpstandard = require('gulp-standard')

const config = require('../config')

const standard = () => {
  const paths = {
    src: config.getTaskSrc('scripts')
  }

  return gulp.src(paths.src)
  .pipe(gulpstandard())
  .pipe(gulpstandard.reporter('default', {
    breakOnError: true,
    quiet: true
  }))
}
gulp.task('standard', standard)
module.exports = standard
