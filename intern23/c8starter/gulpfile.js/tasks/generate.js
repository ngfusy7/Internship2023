
var config = require('../config')
var path = require('path'),
  fs = require('fs')

var gulp = require('gulp'),
  _ = require('lodash'),
  inquirer = require('inquirer'),
  del = require('del'),
  gutil = require('gulp-util'),
  slugify = require('underscore.string/slugify'),
  titleize = require('underscore.string/titleize'),
  humanize = require('underscore.string/humanize'),
  trimSpace = require('underscore.string/clean')

var getPageList = require('./genhtml').getPageList
var mainConfirm = require('./genhtml').mainConfirm

var
  gs = gulp.series, // each waiting for the prior to finish.
  gp = gulp.parallel // all being executed at the same time.

async function cleanHtmlSrc (cb) {
  try {
    var info = await fs.statSync(path.resolve('./', config.paths.root.src))
  } catch (ex) {
    if (ex.code === 'ENOENT') { console.log('Error get directory info:', path.resolve('./', config.paths.root.src)) }
    return
  }

    // delete all .html page except "index"
  var arrToDelete = [
    path.join(config.paths.root.src, '/html/*.html'),
    '!' + path.join(config.paths.root.src, '/html'),
    '!' + path.join(config.paths.root.src, '/html/index*')
  ]

  return del(arrToDelete).then(function (paths) {
        // console.log('deleted: ', paths);
    if (typeof cb === 'function') { cb() }
  })
}

gulp.task('cleanHtmlSrc', cleanHtmlSrc)

function mainGenerate (cb) {
    // start the magic

    // old: clean before gen
    // return gs('cleanHtmlSrc', getDataFromArgs)(cb);

    // new: not clean
  return gs(getDataFromArgs)(cb)
}

function getDataFromArgs (cb) {
  var pageColl = []
  var moduleColl = []
  var arr = []
  var newarr = []
  var checkarr = []
  var slugstr = ''
  var isDeleteIfExists = false
  var regTrimHtmlExt = new RegExp(/(.*)(\.html)$/)

  var arr_envm = typeof (gutil.env.m) === 'string' ? [gutil.env.m] : gutil.env.m
  var arr_envp = typeof (gutil.env.p) === 'string' ? [gutil.env.p] : gutil.env.p

  _.map(arr_envm, item => {
    arr = getPageList(trimSpace(item))
    newarr = []
    for (var i = 0; i < arr.length; i++) {
      arr[i] = trimSpace(arr[i])
      arr[i] = arr[i].replace(regTrimHtmlExt, '$1')
      arr[i] = trimSpace(arr[i])
      if (arr[i].length > 1) {
        slugstr = slugify(arr[i])
        newarr.push({ file: slugstr, title: titleize(humanize(slugstr)) })
      }
    }

    checkarr = []
    _.map(newarr, module => {
      if (module.file.length > 1) { checkarr.push(module) }
    })

    if (checkarr.length > 0) { checkarr = _.uniqBy(checkarr, 'file') }

    if (checkarr.length > 0) { moduleColl = moduleColl.concat(checkarr) }
  })

  _.map(arr_envp, item => {
    arr = getPageList(trimSpace(item))
    newarr = []

    for (var i = 0; i < arr.length; i++) {
      arr[i] = trimSpace(arr[i])
      arr[i] = arr[i].replace(regTrimHtmlExt, '$1')
      arr[i] = trimSpace(arr[i])

      if (arr[i].length > 1) {
        if (arr[i].toLowerCase() !== 'index' && arr[i].toLowerCase() !== 'index.html') {
          slugstr = slugify(arr[i])
          newarr.push({ title: titleize(humanize(arr[i])), file: slugstr})
        }
      }
    }

    checkarr = []
    _.map(newarr, page => {
      if (page.file.length > 1 && page.title.length > 1) { checkarr.push(page) }
    })

    if (checkarr.length > 0) { checkarr = _.uniqBy(checkarr, 'file') }

    if (checkarr.length > 0) { pageColl = pageColl.concat(checkarr) }
  })

  isDeleteIfExists = gutil.env.f || gutil.env.force

  pageColl = _.uniqBy(pageColl, 'file')
  moduleColl = _.uniqBy(moduleColl, 'file')

    // console.log('page coll', pageColl);
    // console.log('module coll', moduleColl);
    // console.log('isDeleteIfExists', isDeleteIfExists);

  if ((pageColl && pageColl.length > 0) ||
        moduleColl && moduleColl.length > 0) {
    var listLongTitle = []
    var listLongModule = []

    if (pageColl && pageColl.length > 0) {
      pageColl.map(function (item) {
        if (item.file.length > 15) { listLongTitle.push(item.file) }
      })
    }

    if (moduleColl && moduleColl.length > 0) {
      moduleColl.map(function (item) {
        if (item.file.length > 15) { listLongModule.push(item.file) }
      })
    }

    function processRequest (result) {
      if (result.continue === true) { mainConfirm(pageColl, moduleColl, null, isDeleteIfExists, cb) } else {
        console.log('Please try again.')
        if (typeof cb === 'function') { cb() }
      }
    }

        // console.log(listLongTitle, listLongModule);
    if (listLongTitle.length > 0 && listLongModule.length > 0) {
      inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Warning: Long page names in input:\n' +
                JSON.stringify(listLongTitle) + '\nWarning: Long mudule names in input:\n' +
                JSON.stringify(listLongModule) + '\nAre you sure to create these files (just hit "Enter" for NO) ?',
        default: false
      }).then(processRequest)
    } else if (listLongTitle.length > 0) {
      inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Warning: Long page names in input:\n' +
                JSON.stringify(listLongTitle) + '\nAre you sure to create these files (just hit "Enter" for NO) ?',
        default: false
      }).then(processRequest)
    } else if (listLongModule.length > 0) {
      inquirer.prompt({
        type: 'confirm',
        name: 'continue',
        message: 'Warning: Long mudule names in input:\n' +
                JSON.stringify(listLongModule) + '\nAre you sure to create these files (just hit "Enter" for NO) ?',
        default: false
      }).then(processRequest)
    } else {
      mainConfirm(pageColl, moduleColl, null, isDeleteIfExists, cb)
    }
  } else {
    return gs('genHtml')(cb)
  }
}

gulp.task('g', mainGenerate)

module.exports = mainGenerate
