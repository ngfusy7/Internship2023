const gulp = require('gulp')
const path = require('path')
const config = require('../config')
const gbump = require('gulp-bump')

gulp.task('prebuild', function (done) {
  global.production = true
  if (done) { done() }
})

module.exports = gulp.task('prebuild')
