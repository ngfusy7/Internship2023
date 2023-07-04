const gulp = require('gulp')
const execa = require('execa')
const minimist = require('minimist')
const gutil = require('gulp-util')
const path = require('path')
const map = require('map-stream')
const vfs = require('vinyl-fs')
var config = require('../config')
var util = require('../lib/util')

const installTask = function (cb) {
  const knownOptions = {
	 string: 'p'
  }
  const options = minimist(process.argv.slice(2), knownOptions)
  const pgkName = options.p
  return execa.shell(`npm install -S ${pgkName}`).then(result => {
    if (result.stderr) {
      gutil.log(gutil.colors.red(result.stderr))
    }
    if (result.stdout && util.isLocalPackage(pgkName)) {
      gutil.log(gutil.colors.green(result.stdout))
      const root = config.getBase()
      const componentPath = `${root}/node_modules/${pgkName}`
      const cpFiles = {
        scss: {
          src: [`${componentPath}/**/*.scss`, `!${componentPath}/node_modules` ],
          dest: path.join(config.getPathSrc('styles'), config.paths.install.styles.dest)
        },
        js: {
          src: [`${componentPath}/*.js`, `!${componentPath}/node_modules`],
          dest: path.join(config.getPathSrc('scripts'), config.paths.install.scripts.dest)
        },
        static: {
          src: `${componentPath}/images/**/*.*`,
          dest: 'src/images'
        }
      }
      const report = (file, cb) => {
        gutil.log(gutil.colors.cyan(`Created: ${file.path}`))
        cb(null, file)
      }
      const componentWithoutPrefix = util.removePrefix(pgkName)
      const rename = (file, cb) => {
        if (file.extname === '.scss') {
          if (file.basename.substring(0, 1) !== '_') { // is not loader file
            file.basename = `_${file.basename}`
          } else { // loader
            file.basename = `${file.stem}_${componentWithoutPrefix}${file.extname}`
          }
        }

        cb(null, file)
      }
      for (let key in cpFiles) {
        vfs.src(cpFiles[key].src)
        .pipe(map(rename))
        .pipe(vfs.dest(cpFiles[key].dest, {overwrite: false}))
        .pipe(map(report))
      }
    }
  }).catch(err => {
    console.log('Error processing ', err)
  })
  if (typeof cb === 'function') { cb() }
}

gulp.task('install', installTask)
module.exports = installTask
