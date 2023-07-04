const gulp = require('gulp')
const minimist = require('minimist')
const gutil = require('gulp-util')
const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
const _ = require('lodash')
const Buffer = require('buffer').Buffer
const _s = require('underscore.string')
const vinylToString = require('vinyl-contents-tostring')
var config = require('../config')

const modulejsTask = function (done) {
  const knownOptions = {
	 string: 'm'
  }
  const options = minimist(process.argv.slice(2), knownOptions)
  const names = options.m
  gutil.log(gutil.colors.green('Generating js module...'))
  const root = config.getBase()

  _.split(names, ' ').map(name => {
    const className = _s(name).classify().value()
    const moduleName = _s(name).humanize().slugify().value()
    const title = _s(name).humanize().value()
    const paths = {
      src: [`${root}/gulpfile.js/templates/_module.js`],
      dest: path.join(config.getPathSrc('scripts'), 'modules')
    }

    const report = (file, cb) => {
      gutil.log(gutil.colors.cyan(`Created: ${file.path}`))
      cb(null, file)
    }
    const rename = (file, cb) => {
      if (file.basename === '_module.js') {
        file.basename = `${className}.js`
      }
      cb(null, file)
    }
    const tranform = function (file, cb) {
      vinylToString(file)
      .then(contents => {
        var compiled = contents
        .replace(new RegExp('<%= ClassName %>', 'g'), className)
        .replace(new RegExp('<%= ModuleName %>', 'g'), moduleName)
        file.contents = Buffer.from(compiled)
        return file
      }).then(file => {
        cb(null, file)
      })
    }
    return vfs.src(paths.src)
      .pipe(map(rename))
      .pipe(map(tranform))
      .pipe(vfs.dest(paths.dest, {overwrite: true}))
      .pipe(map(report))
  })
  if (done && typeof done === 'function') {
    done.call()
  }
}

gulp.task('module', modulejsTask)
module.exports = modulejsTask
