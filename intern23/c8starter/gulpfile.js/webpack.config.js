const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const { isDev, isProd, isBackend, convertPathToUrl } = require('./lib/util')
const config = require('./config')
const webpackConfig = () => {
  const { theme } = config.getBackendConfig()
  const scripts = config.paths.scripts

  let entries = config.paths.scripts.entries
  let webpackEntry = {}
  for (let index in entries) {
    if (entries[index]) {
      for (let key in entries[index]) {
        webpackEntry[key] = [path.join(config.getPathSrc('scripts'), entries[index][key])]
      }
    }
  }

  const wpConfig = [
    {
      mode: 'production',
      entry: webpackEntry,
      output: {
        filename: scripts.output,
        publicPath: convertPathToUrl(scripts.dest),
        path: config.getPathDest('scripts')
      },
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          'window.jQuery': 'jquery',
          Popper: ['popper.js', 'default'],
          // In case you imported plugins individually, you must also require them here:
          Util: 'exports-loader?Util!bootstrap/js/src/util',
          Dropdown: 'exports-loader?Dropdown!bootstrap/js/src/dropdown'
        })
      ],
      externals: {
        'settings': 'settings',
        'jquery': 'jQuery'
      },
      resolve: {
        extensions: ['.js', '.json'],
        modules: [
          config.getPathSrc('scripts'),
          path.resolve(config.getBase(), 'node_modules')
        ]
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  require.resolve('@babel/preset-env'),
                ]
              }
            }
          },
          {
            test: /\.css$/i,
            // include: path.resolve(__dirname, 'src'),
            use: ['style-loader', 'css-loader', 'postcss-loader']
          }
        ]
      },
      context: config.getPathSrc('scripts'),
      resolveLoader: {
        modules: [
          'node_modules',
          config.getPathSrc('scripts')
        ]
      },
      optimization: {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            test: /\.js(\?.*)?$/i,
          }),
        ],
      },
    }]
  if (isDev()) {
    let devJs = function (item, i) {
      item.devtool = 'eval-cheap-module-source-map'
      var reload = '?&reload=true'
      for (let key in item.entry) {
        item.entry[key].push('webpack-hot-middleware/client' + reload + '')
      }
      item.plugins.push(new webpack.HotModuleReplacementPlugin())
    }
    wpConfig.map(devJs)
    // document.getElementById('demo').innerHTML = numbers2
  }

  if (isProd()) {
    let ProdJs = function (item, i) {
      item.devtool = 'source-map'
      item.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new UglifyJSPlugin({
        //   sourceMap: false
        // }),
        new webpack.NoEmitOnErrorsPlugin()
      )
    }

    wpConfig.map(ProdJs)
  }
  if (isBackend()) {
    wpConfig[0].output.publicPath = convertPathToUrl(path.join(theme, scripts.dest))
    // wpConfig[1].output.publicPath = convertPathToUrl(path.join(theme, scriptsMb.dest))
  }
  return wpConfig
}

module.exports = webpackConfig
