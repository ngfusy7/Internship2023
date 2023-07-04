export default class Testimonials {
  constructor () {
    this.$this = $('.mod-testimonials')
  }
  init () {
    if (this.$this.length) {
      this.addSlick()
    }
  }
  addSlick () {
    this.$this.find('.slider').slick({      
      slidesToShow: 3,
      dots: true,
      arrows: true,
      rows: 0,

      variableWidth: true,
      focusOnSelect: true,
      
      dotsClass: 'btn-dots',
      prevArrow: '<button class="btn-prev arrows h1 text-blue-300"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider</span></button>',
      nextArrow: '<button class="btn-next arrows h1 text-blue-300"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider</span></button>',
      
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            variableWidth: false,
          }
        }
      ]
    })
  }
}
new Testimonials().init()