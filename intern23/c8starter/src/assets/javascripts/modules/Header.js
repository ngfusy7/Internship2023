export default class Header {
  constructor () {
    this.$header = '#header'
    this._numberScrol = 0
    this.scrollTop = 0
    this.class = 'pin-header'
  }
  init () {
    if ($(this.$header).length) {
      this.scrollPinHeader()
    }
  }
  scrollPinHeader () {
    this.settingPin()
    $(window).on('scroll resize orientationchange', () => {
      this.settingPin()
    })
  }
  settingPin (scroll=0) {
    this.scrollTop = $(window).scrollTop() + scroll
    if (this.scrollTop > this._numberScrol) {
      $(this.$header).addClass(this.class)
    } else {
      $(this.$header).removeClass(this.class)
    }
  }
}
new Header().init()