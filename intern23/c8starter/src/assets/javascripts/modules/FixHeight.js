import 'jquery-match-height'
export default class FixHeight {
  constructor () {
    this.$fixHeight = $('.fix-height')
  }
  callFixHeight () {
    if (this.$fixHeight.length) {
      const $items = this.$fixHeight.find('.height-item').css('height', '')
      const $items2 = this.$fixHeight.find('.item-3column h3:first-child').css('height', '')
      $items.matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      })
      $items2.matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
      })
    }
  }
}
new FixHeight().callFixHeight()
