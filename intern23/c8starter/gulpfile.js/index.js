const gulp = require('gulp')
const path = require('path')
const requireDir = require('require-dir')
process.env.PWD = process.env.PWD || path.resolve(process.cwd())
const $ = require('gulp-load-plugins')()
const extractMediaQuery = require('postcss-extract-media-query')

const env = require('./lib/env')
requireDir('./tasks')
// default task is development task for html developer
gulp.task('default', gulp.series(
  // 'checkhooks',
  'clean',
   gulp.parallel('fonts', 'images', 'stylesTailWind', 'assets', 'favicon', 'html', 'splitCss'),
   gulp.parallel('server', 'watch')
))

// build template for html production
gulp.task('build', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('fonts', 'images', 'scripts', 'buildTailWind', 'assets', 'favicon', 'html'),
  'sizereport',
  'splitCss'
))

// run demo
gulp.task('production', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('fonts', 'images', 'scripts', 'styles', 'buildTailWind', 'assets', 'favicon', 'html', 'worker'),
  // 'purgecssOptimize',
  // 'purgecssOptimizeHome',
  'sizereport',
  'splitCss',
  'demo'
))

gulp.task('inline', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('fonts', 'images', 'scripts', 'styles', 'stylesTailWind', 'assets', 'favicon', 'html', 'worker'),
  'sizereport', 'critical-inline', 'demo'
))

// only build img
gulp.task('img', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('images'),
'sizereport'
))

// only build css
gulp.task('css', gulp.series(
  'prebuild', // set production global variable
  gulp.parallel('scripts', 'styles', 'assets', 'html'),
  // 'purgecssOptimize',
  'sizereport'
))

// only build html
gulp.task('html', gulp.series(
  'prebuild', // set production global variable
  gulp.parallel('html'),
  'sizereport'
))

// only build js
gulp.task('js', gulp.series(
  'prebuild', // set production global variable
  'clean',
  gulp.parallel('scripts'),
'sizereport'
))

// build template for backend production
gulp.task('backend:build', gulp.series(
  'prebuild', // set production global variable
  env('backend'), // set backend global variable
  gulp.parallel('fonts', 'images', 'scripts', 'styles', 'assets', 'favicon', 'worker'),
  'purgecssOptimize',
  'sizereport'
))
// buil tailwind
gulp.task('tailwind', gulp.series(
  gulp.parallel('stylesTailWind'),
  'sizereport'
))
// for backend developer
gulp.task('backend', gulp.series(
   // 'checkhooks',
   env('backend'), // set backend global variable
   gulp.parallel('fonts', 'images', 'styles', 'assets', 'favicon', 'worker'),
   // gulp.parallel('php'),
   gulp.parallel('server', 'watch')
))
// for backend developer
gulp.task('backend:php', gulp.series(
  // 'checkhooks',
  env('backend'), // set backend global variable
  gulp.parallel('fonts', 'images', 'styles', 'favicon', 'assets'),
  // gulp.parallel('php'),
  gulp.parallel('server', 'watch')
))

module.exports = gulp.task('default')
