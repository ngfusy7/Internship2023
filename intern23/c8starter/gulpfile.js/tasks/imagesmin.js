const gulp = require('gulp')
const browserSync = require('browser-sync')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache')
const changed = require('gulp-changed')
const config = require('../config')

const imagesmin = () => {
  const paths = {
    src: config.getTaskSrc('images'),
    dest: config.getTaskDest('images')
  }

  return gulp.src(paths.src)
  .pipe(cache(imagemin({
    interlaced: true
  })))
  .pipe(changed(paths.dest))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}
gulp.task('imagesmin', imagesmin)
module.exports = imagesmin
