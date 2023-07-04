export default class ConvertHeight {
  constructor () {
    this.html = $('html')
  }

  convertHeight () {
    let tmp = 0
    return this.each((_index, el) => {
      const element = el
      $(element).height('auto')
      const $itemss = $(element)
      const innerHeights = $itemss.map((_i, ele) => {
        return $(ele).height()
      })
      const maxHeight = Math.max(...innerHeights)
      if (maxHeight > tmp) {
        tmp = maxHeight
      }
      element.height(tmp)
    })
  }
}

$.fn.convertHeight = new ConvertHeight().convertHeight()
