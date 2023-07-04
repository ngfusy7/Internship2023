export default class CheckDevice {
  constructor () {
    this.$html = $('html')
  }
  checkDevice () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      this.$html.addClass('touch')
    } else {
      this.$html.addClass('no-touch')
    }
  }
}
new CheckDevice().checkDevice()
