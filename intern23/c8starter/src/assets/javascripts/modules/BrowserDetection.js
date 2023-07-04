export default class BrowserDetection {
  constructor () {
    this.$html = $('html')
  }
  browserDetection () {
    const isExplorer = (navigator.userAgent.indexOf('MSIE') || navigator.userAgent.indexOf('rv:15')) > -1
    const isFirefox = navigator.userAgent.indexOf('Firefox') > -1
    const isSafari = navigator.userAgent.indexOf('Safari') > -1
    const isChrome = navigator.userAgent.indexOf('Chrome') > -1
    if (isExplorer || document.documentMode) {
      this.$html.addClass('ie')
    }
    if (isFirefox) {
      this.$html.addClass('firefox')
    }
    if (isChrome && isSafari) {
      this.$html.addClass('chrome')
    }
    if (!isChrome && isSafari) {
      this.$html.addClass('safari')
    }
    if (/Edge/.test(navigator.userAgent)) {
      this.$html.addClass('edge')
    }
  }
}

new BrowserDetection().browserDetection()
