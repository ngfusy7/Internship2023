const gulp = require('gulp')
const path = require('path')
const browserSync = require('browser-sync')
const frontMatter = require('gulp-front-matter')
const data = require('gulp-data')
const fs = require('fs')
const _ = require('lodash')
const gulpNunjucks = require('../plugins/gulp-nunjucks')
const config = require('../config')
const onError = require('../lib/error')

const getData = function (file) {
  // get global data
  const getGlobalData = function () {
    const dataPath = path.join(config.getPathSrc('html'), config.paths.html.data)
    try {
      return require(path.join(dataPath, 'global'))
    } catch (error) {
      return {}
    }
  }
   // get data for specified page
  const getPageData = function (file) {
    var processingFile = path.basename(file.path, '.html')
    var dataPageJson = path.join(config.getPathSrc('html'), 'data', processingFile.concat('.json'))
    if (fs.existsSync(dataPageJson)) {
      return require(dataPageJson)
    }
    var dataPageJs = path.resolve(config.getPathSrc('html'), 'data', processingFile.concat('.js'))
    if (fs.existsSync(dataPageJs)) {
      return require(dataPageJs)
    }
    return {}
  }

  const globalData = getGlobalData()
  const pageData = getPageData(file)
  const data = _.merge({}, globalData, pageData)
  // for compatibility with old version
  var processingFileName = path.basename(file.path, '.html')
  data[processingFileName] = pageData

  return data
}

const html = () => {
  const paths = {
    src: config.getTaskSrc('html'),
    dest: config.getTaskDest('html')
  }
  const includePaths = [
    config.getPathSrc('html')
  ]

  const options = {
    includePaths: includePaths,
    dataPath: path.join(config.getPathSrc('html'), config.paths.html.data)
  }
  return gulp.src(paths.src)
  .pipe(data(getData))
  .pipe(frontMatter())
  .pipe(gulpNunjucks(options))
  .on('error', onError)
  .pipe(gulp.dest(paths.dest))
  .on('end', browserSync.reload)
}
gulp.task('html', html)
module.exports = html
