const gulp = require('gulp')
const path = require('path')
const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const config = require('../config')

const favicon = () => {
  const paths = {
    src: config.getTaskSrc('favicon'),
    dest: config.getTaskDest('favicon')
  }

  return gulp.src(paths.src)
  .pipe(changed(paths.dest))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}
gulp.task('favicon', favicon)
module.exports = favicon
