const gulp = require('gulp')
const path = require('path')
const through = require('through2')
const config = require('../config')
const {isContainer} = require('../lib/util')

gulp.task('removeDataCached', () => {
  const dataSrc = path.join(config.getPathSrc('html'), 'data', '**', '*.*')
  return gulp.src(dataSrc)
        .pipe(through.obj(function (file, enc, cb) {
          delete require.cache[require.resolve(file.path)]
          cb(null, file)
        }))
})

const watch = () => {
  const paths = {
    html: config.getPathSrc('html'),
    styles: config.getPathSrc('styles'),
    assets: config.getPathSrc('assets'),
    fonts: config.getPathSrc('fonts'),
    images: config.getPathSrc('images'),
    tailwind: config.getPathSrc('tailwind')
  }
  let watchOpts = {}
  if (isContainer()) {
    watchOpts = {
      interval: 1000,
      usePolling: true
    }
  }

  for (var task in paths) {
    gulp.watch(paths[task], watchOpts, gulp.task(task)) // watch path and do the task
  }
  gulp.watch(path.join(config.getPathSrc('html'), 'data'), watchOpts, gulp.series('removeDataCached', 'html'))
}
gulp.task('watch', watch)

module.exports = watch
