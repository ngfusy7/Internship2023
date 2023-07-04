const gutil = require('gulp-util')

module.exports = function onError (error) {
  gutil.log(gutil.colors.red(error.message))
}
