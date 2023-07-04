
export default class UserAgent {
  constructor () {
    this.$html = $('html')
  }
  init () {
    this.removeNoscript()
  }
  removeNoscript () {
    $('#notify').remove()
  }
}

new UserAgent().init()
