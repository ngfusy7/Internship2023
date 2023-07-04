const gulp = require('gulp')
const path = require('path')
const gulpStylelint = require('gulp-stylelint')
const config = require('../config')

const stylelint = () => {
  const paths = {
    src: path.resolve(config.getPathSrc('styles'), config.paths.styles.pattern)
  }

  return gulp.src(paths.src)
  .pipe(gulpStylelint({
    reporters: [
      {formatter: 'string', console: true}
    ]
  }))
}
gulp.task('stylelint', stylelint)
module.exports = stylelint
