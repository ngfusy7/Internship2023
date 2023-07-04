var gulp = require('gulp'),
  data = require('gulp-data'),
  path = require('path'),
  fs = require('fs'),
  _ = require('lodash'),
  mkdirp = require('mkdirp'),
  rename = require('gulp-rename'),
  map = require('map-stream'),
  inquirer = require('inquirer'),
  gutil = require('gulp-util'),
  vinylToString = require('vinyl-contents-tostring'),
  humanize = require('underscore.string/humanize'),
  slugify = require('underscore.string/slugify'),
  titleize = require('underscore.string/titleize'),
  classify = require('underscore.string/classify'),
  trimSpace = require('underscore.string/clean')

var
  gs = gulp.series, // each waiting for the prior to finish.
  gp = gulp.parallel // all being executed at the same time.

var config = require('../config')
var baseDirScript = __dirname,
  rootdir = process.env.PWD,
  pageTemplate = '../templates/_page.html',
  htmlModuleTemplate = '../templates/_module.html',
  scssModuleTemplate = '../templates/_style.scss',
  pageList = '../templates/data/page-list.json',
  globalSetting = '../templates/data/global.json'

var pageModules = []
var isDeleteIfExists = false

const log = console.log
const color = gutil.colors

function checkFileExists (file) {
  return new Promise((resolve, reject) => {
    // log('Check file: ', file);
    fs.stat(file, (err, data) => {
      // resolve(err ? "Not found in " + path : "  => PATH=" + path);
      if (err) {
        // log('File [' + file + '] not found.');
        resolve('')
      } else {
        resolve(file)
      }
    })
  })
}

async function getData (file) {
  try {
    var filepath = await checkFileExists(path.resolve(baseDirScript, file))
    // log('filepath: ', filepath);
    if (filepath.length > 0) {
      try {
        var content = await fs.readFileSync(filepath, 'UTF-8')
        // log('getData', content);
        return JSON.parse(content.toString())
      } catch (ex) {
        // log('err', ex);
        return {}
      }
    } else {
      return {}
    }
  } catch (readerr) {
    return {}
  }
}

function askForInputType (cb) {
  inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Select input method:',
    choices: [{
      name: 'Quickly (Just enter title and we generate the rest for you)',
      value: 1
    },
    {
      name: 'Advanced (Open text editor to enter json array list)',
      value: 2
    },
    {
      name: 'Back',
      value: 3
    }
    ]
  }]).then(result => {
    if (result.type === 1) {
      getUserInput(cb)
    } else if (result.type === 2) {
      inquirer.prompt([{
        type: 'editor',
        name: 'jsonArray',
        message: 'Please write array of files',
        validate: function (text) {
          var arr = getFileFromTempInput(text)
          if (arr.length < 1) {
            return 'Must be at least one file.'
          }

          return true
        }
      }]).then(function (data) {
        // log('data.jsonArray: ', data.jsonArray.length);
        var arr = getFileFromTempInput(data.jsonArray)
        if (arr.length < 1) {
          askForInputType(cb)
        } else {
          mainConfirmFunc(arr, null, null, false, cb)
        }
      })
    } else {
      askForInput(cb)
    }
  })
}

function getFileFromTempInput (str) {
  var arr = []
  if (str.length > 0) {
    try {
      arr = JSON.parse(str)
    } catch (ex) {
      try {
        arr = eval(str)
      } catch (ex2) {

      }
    }
  }

  var newarr = []

  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (typeof (arr[i]) === 'string') {
        arr[i] = {
          title: titleize(humanize(arr[i]))
        }
      }

      if (arr[i].title) {} else if (arr[i].metaDescription) {
        arr[i].title = arr[i].metaDescription
      }

      if (arr[i].metaDescription) {} else if (arr[i].title) {
        arr[i].metaDescription = arr[i].title
      }

      if (arr[i].title) {
        if (arr[i].file) {} else if (arr[i].title.length > 1) {
          arr[i].file = slugify(trimSpace(arr[i].title))
        }
      }
    }

    // validate
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].title && arr[i].title.length > 1 &&
        arr[i].file && arr[i].file.length > 1) {
        newarr.push(arr[i])
      }
    }
  }

  return _.uniqBy(newarr, 'file')
}

function getUserInput (cb) {
  inquirer.prompt({
    type: 'input',
    name: 'input',
    message: 'Enter list title of file below:',
    validate: function (value) {
      if (value.length === 0 || trimSpace(value).length === 0) {
        return 'No files in list. Enter again...'
      } else {
        return true
      }
    }
  }).then(function (value) {
    var arr = value.input.length > 0 ? getPageList(trimSpace(value.input)) : []
    var newarr = []
    var regTrimHtmlExt = new RegExp(/(.*)(\.html)$/)
    for (var i = 0; i < arr.length; i++) {
      arr[i] = trimSpace(arr[i])
      arr[i] = arr[i].replace(regTrimHtmlExt, '$1')
      arr[i] = trimSpace(arr[i])
      if (arr[i].length > 1) {
        if (arr[i].toLowerCase() !== 'index' && arr[i].toLowerCase() !== 'index.html') {
          newarr.push({
            title: titleize(humanize(arr[i])),
            file: slugify(arr[i])
          })
        }
      }
    }

    var checkarr = []
    for (var i = 0; i < newarr.length; i++) {
      if (newarr[i].file.length > 1 && newarr[i].title.length > 1) {
        checkarr.push(newarr[i])
      }
    }

    if (checkarr.length > 0) {
      checkarr = _.uniqBy(checkarr, 'file')
    }
    if (checkarr.length === 0) {
      inquirer.prompt({
        type: 'confirm',
        name: 'askAgain',
        message: 'No files in list. Enter again (just hit "Enter" for YES) ?',
        default: true
      }).then(function (result) {
        if (result.askAgain === true) {
          askForInputType(cb)
        } else {
          askForInput(cb)
        }
      })
    } else {
      mainConfirmFunc(checkarr, null, null, false, cb)
    }
  })
}

function getNameWithoutExt (filename) {
  return path.basename(filename, path.extname(filename))
}

async function renderPageModules (filesSetting) {
  filesSetting = filesSetting || []
  if (pageModules && pageModules.length > 0) {
    filesSetting = filesSetting.concat(pageModules)
  }

  filesSetting = _.uniqBy(filesSetting, 'file')

  // log('renderPageModules filesSetting: ', filesSetting);
  if (filesSetting && filesSetting.length > 0) {
    var arr = []
    var pathSettingHtml = path.resolve(baseDirScript, htmlModuleTemplate)
    var pathSettingStyle = path.resolve(baseDirScript, scssModuleTemplate)

    for (var i = 0; i < filesSetting.length; i++) {
      let dataForHtml = {
        dirname: path.join(config.paths.root.src, config.paths.html.src, 'modules'),
        basename: getNameWithoutExt(filesSetting[i].file),
        prefix: '',
        suffix: '',
        extname: '.html'
      }

      let dataForRender1 = {
        cssclass: slugify(filesSetting[i].title),
        title: titleize(humanize(filesSetting[i].title))
      }

      arr.push(
        gulp.src(pathSettingHtml)
        .pipe(rename(dataForHtml))
        .pipe(map(function (file, cb) {
          vinylToString(file)
            .then(contents => {
              var compiled = _.template(contents)
              file.contents = Buffer.from(compiled(dataForRender1))
              return file
            }).then(file => {
              cb(null, file)
            })
        }))
        .pipe(map(function (file, cb) {
          log(color.cyan(`{% include 'modules/${dataForHtml.basename}.html' %}`))
          cb(null, file)
        }))
        .pipe(gulp.dest(rootdir, {
          overwrite: isDeleteIfExists
        }))
      )

      let dataForStyle = {
        dirname: path.join(config.paths.root.src, 'assets/stylesheets', 'modules'),
        basename: getNameWithoutExt(filesSetting[i].file),
        prefix: '_',
        suffix: '',
        extname: '.scss'
      }

      let dataForRender2 = {
        cssclass: slugify(filesSetting[i].title),
        title: titleize(humanize(filesSetting[i].title))
      }

      arr.push(
        gulp.src(pathSettingStyle)
        .pipe(rename(dataForStyle))
        .pipe(map(function (file, cb) {
          vinylToString(file)
            .then(contents => {
              var compiled = _.template(contents)
              file.contents = Buffer.from(compiled(dataForRender2))
              return file
            }).then(file => {
              cb(null, file)
            })
        }))
        /* for print import scss
                          .pipe(map(function(file, cb) {
                              log(color.magenta(`@import 'module/${dataForStyle.basename}.scss';`));
                              cb(null, file);
                          })) */
        .pipe(gulp.dest(rootdir, {
          overwrite: isDeleteIfExists
        }))
      )
    }

    return Promise.all(arr)
    // .pipe(process.stdout);
  } else {
    return Promise.resolve({})
  }
}

async function renderPages (filesSetting) {
  // log('renderPages filesSetting: ', filesSetting);
  if (filesSetting && filesSetting.length > 0) {
    var arr = []
    var pathSetting = path.resolve(baseDirScript, pageTemplate)

    for (var i = 0; i < filesSetting.length; i++) {
      let dataForRename = {
        dirname: path.join(config.paths.root.src, 'html'),
        basename: getNameWithoutExt(filesSetting[i].file),
        prefix: '',
        suffix: '',
        extname: '.html'
      }

      let dataForRender = {
        cssclass: slugify(filesSetting[i].title),
        title: titleize(humanize(filesSetting[i].title))
      }

      arr.push(
        gulp.src(pathSetting)
        .pipe(rename(dataForRename))
        .pipe(map(function (file, cb) {
          vinylToString(file)
            .then(contents => {
              var compiled = _.template(contents)
              file.contents = Buffer.from(compiled(dataForRender))
              return file
            }).then(file => {
              cb(null, file)
            })
        }))
        .pipe(gulp.dest(rootdir, {
          overwrite: isDeleteIfExists
        }))
      )
    }

    return Promise.all(arr)
    // .pipe(process.stdout);
  } else {
    return Promise.resolve({})
  }
}

async function checkFileData (cb) {
  var dataSetting = await getData(pageList)
  if (dataSetting.length > 0) {
    dataSetting = _.uniqBy(dataSetting, 'file')
  }

  if (dataSetting.length > 0) {
    // log('dataSetting', dataSetting);
    mainConfirmFunc(dataSetting, null, null, false, cb)
  } else {
    inquirer.prompt({
      type: 'confirm',
      name: 'askAgain',
      message: 'No files in list.\nY (Yes): Modify file [' + path.resolve(baseDirScript, pageList) + '] again then hit enter to reload file list.' +
        '\nN (No): Cancel.\n',
      default: true
    }).then(function (result) {
      if (result.askAgain === true) {
        checkFileData()
      } else {
        askForInput(cb)
      }
    })
  }
}

function askForInput (cb) {
  inquirer.prompt([{
    type: 'list',
    name: 'files',
    message: 'Select files list below',
    choices: [{
      name: 'Direct input separate list of pages',
      value: 1
    },
    {
      name: 'Files list in ' + path.resolve(baseDirScript, pageList),
      value: 2
    },
    {
      name: 'Exit',
      value: 3
    }
    ]
  }]).then(answer => {
    if (answer.files === 1) {
      askForInputType(cb)
    } else if (answer.files === 2) {
      checkFileData(cb)
    } else if (typeof cb === 'function') {
      cb()
    }
  })
}

function mainConfirmFunc (arrPages, additionModules, oldarr, deleteIfExists, cb) {
  isDeleteIfExists = deleteIfExists
  if (additionModules && additionModules.length > 0) {
    pageModules = pageModules.concat(additionModules)
  }

  var temparrPages = []
  var temparrModules = []
  if (arrPages && arrPages.length > 0) {
    temparrPages = JSON.parse(JSON.stringify(arrPages))
    for (var i = 0; i < temparrPages.length; i++) {
      if (temparrPages[i].file.toLowerCase().indexOf('.html') < 0) {
        temparrPages[i].file += '.html'
      }
    }
  }

  if (additionModules && additionModules.length > 0) {
    temparrModules = JSON.parse(JSON.stringify(additionModules))
    for (var i = 0; i < temparrModules.length; i++) {
      if (temparrModules[i].file.toLowerCase().indexOf('.html') < 0) {
        temparrModules[i].file += '.html'
      }
    }
  }

  var msg = []
  if (temparrPages && temparrPages.length > 0) {
    msg.push('Your list of pages is:\n' + JSON.stringify(temparrPages.map(function (item) {
      return ' - ' + item.title + ' (' + item.file + ')'
    }), null, 2))
  }
  if (temparrModules && temparrModules.length > 0) {
    msg.push('Your list of modules is:\n' + JSON.stringify(temparrModules.map(function (item) {
      return ' - ' + item.title + ' (' + item.file + ')'
    }), null, 2))
  }

  inquirer.prompt({
    type: 'confirm',
    name: 'checkready',
    message: msg.join('\n ') +
      '\nAre you want to create these files ?' +
      '\nY (Yes): All (just hit "Enter" for YES)' + '\nN (No): Retry.\n',
    default: true
  }).then(function (result) {
    if (result.checkready === true) {
      // log('Start the magic.', arrPages);
      mainProcess(arrPages, cb)
    } else {
      askForInput(cb)
    }
  })
}

async function createDirRecursive (fullPath) {
  return new Promise((resolve, reject) => {
    mkdirp(fullPath, function (err) {
      if (err) {
        console.error('Can not create dir: ' + fullPath)
        resolve()
      } else {
        resolve()
      }
    })
  })
}

async function mainProcess (arr, cb) {
  await renderPages(arr)
  await renderPageModules()

  if (typeof cb === 'function') {
    cb()
  }
}

function timeout (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

var getPageList = function (str) {
  str = str.replace(/[^a-zA-Z0-9, .\-]/g, '')
  var separators = [' ', ',']
  // log(separators.join('|'));
  var tokens = str.split(new RegExp(separators.join('|'), 'g'))
  // log(tokens);
  return tokens
}

gulp.task('genHtml', askForInput)

module.exports = {
  getPageList: getPageList,
  genHtml: askForInput,
  mainConfirm: mainConfirmFunc
}
