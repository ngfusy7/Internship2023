const gulp = require('gulp')
const path = require('path')
const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const config = require('../config')

const assets = () => {
  const paths = {
    src: config.getTaskSrc('assets'),
    dest: config.getTaskDest('assets')
  }

  return gulp.src(paths.src)
  .pipe(changed(paths.dest))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}
gulp.task('assets', assets)
module.exports = assets
