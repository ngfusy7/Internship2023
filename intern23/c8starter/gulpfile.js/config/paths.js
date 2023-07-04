const path = require('path')
const pkg = require('../../package')
const BASE = process.env.PWD || process.cwd()
module.exports = {
  root: {
    base: BASE,
    src: 'src',
    dest: 'public',
    deploy: 'deploy'
  },
  html: {
    src: 'html',
    pattern: '*.html',
    dest: './',
    data: 'data'
  },
  fonts: {
    src: 'assets/fonts',
    pattern: '**/*',
    dest: 'assets/fonts'
  },
  images: {
    src: 'assets/images',
    pattern: '**/*',
    dest: 'assets/images'
  },
  styles: {
    src: 'assets/stylesheets',
    pattern: '**/*.scss',
    exclude: '**/_*.scss',
    dest: 'assets/stylesheets',
    output: 'app.css'
  },
  tailwind: {
    src: 'assets/styles',
    pattern: '**/*.scss',
    exclude: '**/_*.scss',
    dest: 'assets/styles',
    output: 'app.css'
  },
  scripts: {
    src: 'assets/javascripts',
    entries: [
      { 'load-module-css': 'load-module-css.js' },
      { 'app-desktop': 'app-desktop.js' },
      { 'app-mobile': 'app-mobile.js' },
      { 'app-slider': 'app-slider.js' },
      { 'app-animation': 'app-animation.js' },
      { 'modules/SelectC8': 'modules/SelectC8.js' },
      { 'modules/Popup': 'modules/Popup.js' },
      { 'modules/FixHeight': 'modules/FixHeight.js' },
      { 'modules/ADA': 'modules/ADA.js' },
      { 'modules/FormAnimation': 'modules/FormAnimation.js' },
      { 'modules/Menu': 'modules/Menu.js' },
      { 'modules/AnimationScrollPage': 'modules/AnimationScrollPage.js' }
      // Add more entry if you need: { 'output-name': 'input-name.js' }
    ],
    pattern: '**/*.js',
    dest: 'assets/javascripts',
    output: '[name].js'
  },
  assets: {
    src: 'assets/static',
    pattern: '**/*.*',
    dest: './assets/'
  },
  favicon: {
    src: 'assets/favicon',
    pattern: '**/*.*',
    dest: './'
  },
  worker: {
    src: 'worker',
    pattern: '**/*.*',
    dest: './assets/'
  },
  install: {
    styles: {
      dest: 'modules'
    },
    scripts: {
      dest: 'modules'
    },
    images: {
      dest: 'images'
    }
  }
}
