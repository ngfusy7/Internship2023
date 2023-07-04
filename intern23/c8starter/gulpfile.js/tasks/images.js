const gulp = require('gulp')
const browserSync = require('browser-sync')
const changed = require('gulp-changed')
const config = require('../config')

const images = () => {
  const paths = {
    src: config.getTaskSrc('images'),
    dest: config.getTaskDest('images')
  }

  return gulp.src(paths.src)
  .pipe(changed(paths.dest))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}
gulp.task('images', images)
module.exports = images
