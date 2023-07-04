export default class callBack {
  constructor () {
    this.$html = $('html')
  }
  init (a) {
    return a * 2
   
  }
}

new callBack().init()
