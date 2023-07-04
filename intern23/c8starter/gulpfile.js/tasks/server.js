const gulp = require('gulp')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const bs = require('browser-sync')
const util = require('../lib/util')
const config = require('../config')

const server = (done) => {
  const {root, theme, proxy} = config.getBackendConfig()
  const webpackConfig = require('../webpack.config')()

  const compiler = webpack(webpackConfig)

  const bsConfig = {}

  if (util.isBackend()) {
    bsConfig['proxy'] = {
      target: proxy
    }
  } else {
    const wpdevOptions = {
      stats: 'errors-only',
      publicPath: '/assets/javascripts',
      reload: true
    }

    if (util.isContainer()) {
      wpdevOptions.watchOptions = {
        poll: 1000 // Check for changes every second
      }
    }
    bsConfig['server'] = {
      middleware: [
        webpackDevMiddleware(compiler, wpdevOptions),
        webpackHotMiddleware(compiler)
      ],
      baseDir: config.getDest()
    }
  }
  bs.init(bsConfig)
  // bs.watch(`${config.paths.root.dest}`).on('change', bs.reload)
  if (done) {
    done()
  }
}
gulp.task('server', server)
module.exports = server
