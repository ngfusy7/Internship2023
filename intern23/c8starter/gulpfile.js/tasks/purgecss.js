const gulp = require('gulp')
const purgecss = require('gulp-purgecss')

const purgecssOptimize = () => {
  return gulp
  .src('public/**/*.css')
  .pipe(
    purgecss({
      content: ['public/*.html', 'public/**/*.js']
    })
  )
  .pipe(gulp.dest('public/'))
}
gulp.task('purgecssOptimize', purgecssOptimize)
module.exports = purgecssOptimize
