const gulp = require('gulp')
const path = require('path')
const onError = require('../lib/error')
const critical = require('critical').stream
const config = require('../config')
const util = require('../lib/util')

const criticalInlineTask = () => {
  const paths = {
    src: config.getTaskDest('html'),
    dest: config.getTaskDest('html')
  }
  const options = {
    base: paths.src,
    inline: true,
    width: 2000,
    height: 1200,
    minify: true
  }
  if (util.isBackend()) { // change to true to build for wordpress
    const {theme} = config.getBackendConfig()
    options.pathPrefix = path.join('/', theme)
  }

  return gulp.src(paths.src + '/*.html')
        .pipe(critical(options))
        .on('error', onError)
        .pipe(gulp.dest(paths.dest))
}
gulp.task('critical-inline', criticalInlineTask)
module.exports = criticalInlineTask
