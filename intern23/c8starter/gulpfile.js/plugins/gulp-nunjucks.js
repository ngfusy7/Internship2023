const through = require('through2')
const gutil = require('gulp-util')
const assign = require('object-assign')
const path = require('path')
const nunjucks = require('nunjucks')
const CaptureTag = require('nunjucks-capture')
const Buffer = require('buffer').Buffer
const PluginError = gutil.PluginError
// consts
const PLUGIN_NAME = 'gulp-nunjucks'

// plugin level function (dealing with files)
function gulpNunjucks (options) {
  const { includePaths, dataPath } = options

  if (!includePaths) {
    throw new PluginError(PLUGIN_NAME, 'Missing includePaths!')
  }

  nunjucks.configure({ autoescape: false, watch: false, noCache: true })

  var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(includePaths, {noCache: true}))
  env.addExtension('CaptureTag', new CaptureTag())

  env.opts.autoescape = false
  // creating a stream through which each file will pass
  var stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'))
      return cb()
    }

    if (file.isBuffer()) {
      try {
        var data = file.data ? file.data : {}
        var fm = file.frontMatter ? file.frontMatter : {}
        var context = assign({}, data, fm)
        context.require = (dataFile) => {
          try {
            return require(path.resolve(dataPath, dataFile))
          } catch (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, `${dataFile} is not exits in the path ${dataPath}`))
            return {}
          }
        }
        env.renderString(file.contents.toString(), context, (err, result) => {
          if (err) {
            this.emit('error', new PluginError(PLUGIN_NAME, err))
            return cb()
          }
          file.contents = Buffer.from(result)
          // this.push(file)
          cb(null, file)
        })
      } catch (err) {
        this.emit('error', new PluginError(PLUGIN_NAME, err))
        return cb()
      }
    }
  })
  return stream
};
module.exports = gulpNunjucks
