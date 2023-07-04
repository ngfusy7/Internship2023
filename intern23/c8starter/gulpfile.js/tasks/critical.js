const gulp = require('gulp')
const path = require('path')
const rename = require('gulp-rename')
const onError = require('../lib/error')
const util = require('../lib/util')
const critical = require('critical').stream
const config = require('../config')

const criticalTask = () => {
  const paths = {
    src: config.paths.root.dest,
    dest: config.getTaskDest('styles')
  }

  const options = {
    base: paths.src,
    inline: false,
    width: 1300,
    height: 900,
    minify: true
  }
  if (util.isBackend()) { // change to true to build for wordpress
    const {theme} = config.getBackendConfig()
    options.pathPrefix = path.join('/', theme)
  }

  return gulp.src(path.join(paths.src + '/*.html')) // just home page
        .pipe(critical(options))
        .on('error', onError)
        .pipe(rename({
          extname: '.css',
          prefix: 'page-',
          suffix: '-critical'
        }))
        .pipe(gulp.dest(paths.dest))
}
gulp.task('critical', criticalTask)
module.exports = criticalTask
