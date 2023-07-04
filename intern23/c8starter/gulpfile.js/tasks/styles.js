const gulp = require('gulp')
const path = require('path')
const gulpif = require('gulp-if')
const browserSync = require('browser-sync')
const postcss = require('gulp-postcss')
const sourcemaps = require('gulp-sourcemaps')
const globImporter = require('node-sass-glob-importer')
const autoprefixer = require('autoprefixer')
const dartSass = require('sass')
const gulpSass = require('gulp-sass')(dartSass)
const cssnano = require('cssnano')
const config = require('../config')
const onError = require('../lib/error.js')

const styles = () => {
  const paths = {
    src: config.getTaskSrc('styles'),
    dest: config.getTaskDest('styles')
  }

  const includePaths = [
    config.getPathSrc('styles'),
    path.join(config.getBase(), 'node_modules')
  ]

  const postcssPlugins = [
    autoprefixer({browsers: ['last 3 versions']})
  ]
  if (global.production) {
    postcssPlugins.push(cssnano({autoprefixer: false, reduceIdents: false, zindex: false}))
  }
  const sassOptions = {
    outputStyle: 'compressed',
    includePaths: includePaths,
    importer: globImporter()
  }
  if (!global.production) {
    sassOptions.sourceComments = true
    // sassOptions.outputStyle = 'nested'
  }

  return gulp.src(paths.src)
  .pipe(gulpif(!global.production, sourcemaps.init()))
  .pipe(gulpSass(sassOptions))
  .on('error', gulpSass.logError)
  .pipe(postcss(postcssPlugins))
  .pipe(gulpif(!global.production, sourcemaps.write()))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}
gulp.task('styles', styles)
module.exports = styles
