const gulp = require('gulp')
const path = require('path')
const config = require('../config')
const gbump = require('gulp-bump')

const bump = () => {
  const paths = {
    src: path.join(config.getBase(), 'package.json'),
    dest: config.getBase()
  }

  return gulp.src(paths.src)
  .pipe(gbump())
  .pipe(gulp.dest(paths.dest))
}
gulp.task('bump', bump)
module.exports = bump
