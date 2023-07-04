export default class TurnYourBedroom {
  constructor () {
    this.$this = $('.mod-turn-your-bedroom')
  }
  init () {
    if (this.$this.length) {
      this.addSlick()
    }
  }
  addSlick () {
    this.$this.find('.slider').slick({
      dots: true,
      arrows: true,
      rows: 0,
      slidesToShow: 2,

      focusOnSelect: true,
      variableWidth: true,
      
      dotsClass: 'btn-dots',
      prevArrow: '<button class="btn-prev arrows h1 text-primary-100"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider</span></button>',
      nextArrow: '<button class="btn-next arrows h1 text-primary-100"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider</span></button>',

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            variableWidth: false,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            variableWidth: false
          }
        }
      ]
    })
  }
}
new TurnYourBedroom().init()