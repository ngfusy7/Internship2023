export default class ADA {
  constructor () {
    this.$html = $('html')
  }
  init () {
    this.skipToCotent()
    this.hiddenFocus()
    this.dectectFocus()
    this.setuptabindex()
    this.initADA()
    this.controlKey()
    this.addAriaHiddenIconMoon()
   }
  skipToCotent () {
    $('.skip-link').on('click', () => {
      $('#main-content h1,#main-content a').eq(0).focus()
    })
  }
  hiddenFocus () {
    $(document).on('mousedown', (e) => {
      $('a,button,input,.checkmark-radio, .custom-tab,div,li, p,*').removeClass('mouse')
      $(e.target).addClass('mouse').parent().addClass('mouse')
      $('.focus-status').removeClass('focus-status')
    })
  }
  dectectFocus () {
    $('.main-menu-ul > li > a').on('focusin', () => {
      $('.hovering').removeClass('hovering')
    })
    $(window).keydown((event) => {
      const $focus = $('a:focus')
      if (event.keyCode === 40 && $focus.parent().hasClass('has-sub')) {
        event.preventDefault()
        $focus.parent().addClass('hovering')
      }
    })
    $('a,button,input,div').on('focusin', (e) => {
      if (!$(e.target).parents('.slick-initialized').length && !$(e.target).parents('.social').length) {
        $('.focus-status').removeClass('focus-status')
      }
      if (!$(e.target).parents('.dropdown-select-c8').length) {
        $('.dropdown-select-c8').each((_i, ele) => {
          $(ele).removeClass('show focus').find('.dropdown-menu').removeClass('show')
        })
      }
    })
  }

  setuptabindex () {
    const $header = $('.header')
    $header.attr('tabindex', '0').focus().removeAttr('tabindex')
  }
  initADA () {
    $('.popup-is-open').removeAttr('tabindex')
  }

  addAriaHiddenIconMoon(){
    $('.icomoon').attr('aria-hidden', true)
  }

  controlKey(){
    $('[role="button"]').keydown((e) => {
      const $el = $(e.currentTarget)
      if (e.keyCode === 32) {
        e.preventDefault()
        if(!$el.hasClass('not-space')){
          $(e.currentTarget).click()
        }
      }
    })
  }
}

new ADA().init()
