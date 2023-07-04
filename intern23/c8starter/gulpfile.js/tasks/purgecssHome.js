const gulp = require('gulp')
const purgecss = require('gulp-purgecss')

const purgecssOptimizeHome = () => {
  return gulp
  .src(['public/**/app-home.css', 'public/**/app-home-desktop.css'])
  .pipe(
    purgecss({
      content: ['public/index.html', 'public/**/*.js']
    })
  )
  .pipe(gulp.dest('public/'))
}
gulp.task('purgecssOptimizeHome', purgecssOptimizeHome)
module.exports = purgecssOptimizeHome
