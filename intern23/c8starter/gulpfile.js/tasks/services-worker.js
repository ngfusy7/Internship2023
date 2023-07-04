const gulp = require('gulp')
const path = require('path')
const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const config = require('../config')

const worker = () => {
  const paths = {
    src: config.getTaskSrc('worker'),
    dest: config.getTaskDest('worker')
  }

  return gulp.src(paths.src)
  .pipe(changed(paths.dest))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}
gulp.task('worker', worker)
module.exports = worker
