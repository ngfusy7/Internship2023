
const path = require('path')
const gulp = require('gulp')
const $ = require('gulp-load-plugins')()
const browserSync = require('browser-sync')
const extractMediaQuery = require('postcss-extract-media-query')
const ver = process.platform
console.log('ver: ',ver)
var styles = 'public/assets/styles/'
if(ver==='win32'){
  styles = './'
}
const splitCss = () => {
  // console.log($.postcss(), '__dirname')
  return gulp.src(
    path.join('public/assets/styles/*.css')
    )
  .pipe($.postcss())
  .pipe(gulp.dest(path.join(styles)))
  // .pipe(browserSync.stream())
}
gulp.task('splitCss', splitCss)
module.exports = splitCss
