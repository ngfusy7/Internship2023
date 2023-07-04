const gulp = require('gulp')

const addHtaccess = () => {
  return gulp
  .src('src/.htaccess')
  .pipe(gulp.dest('public/'))
}
gulp.task('addHtaccess', addHtaccess)
module.exports = addHtaccess
