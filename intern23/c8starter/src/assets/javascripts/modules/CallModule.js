export default class CallModule {
  constructor () {
    this.winW = window.innerWidth
    this.$head = $('head')
  }

  init () {
    if ($('.select-c8').length) {
      window.modules.push(window.pathJS + 'modules/SelectC8.js')
    }

    if ($('.has-popup').length) {
      // this.$head.append(`<link rel="stylesheet" media="screen" href="${window.pathCSS}popup.css">`)
      window.modules.push(window.pathJS + 'modules/Popup.js')
    }

    if ($('.form-ani').length) {
      window.modules.push(window.pathJS + 'modules/FormAnimation.js')
    }
    if ($('.has-slider').length) {
      // this.$head.append(`<link rel="stylesheet" media="screen" href="${window.pathCSS}app-slider.css">`)
      window.modules.push(window.pathJS + 'app-slider.js')
    }

    if ($('.fix-height').length && this.winW > 767) {
      window.modules.push(window.pathJS + 'modules/FixHeight.js')
    }

    window.$script(window.modules)
  }
}
new CallModule().init()
