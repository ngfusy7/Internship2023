export default class SliderDemo {
  constructor () {
    this.$this = $('.mod-slider')
  }
  init () {
    if (this.$this.length) {
      this.addSlick()
    }
  }
  addSlick () {
    this.$this.find('.slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: true,
      arrows: true,
      // centerMode: true,
      focusOnSelect: true,
      adaptiveHeight: true,
      rows: 0,

      prevArrow: '<button class="slick-prev arrows h1 text-primary-100"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider</span></button>',
      nextArrow: '<button class="slick-next arrows h1 text-primary-100"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider</span></button>',

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            // arrows: false,
            centerMode: true,
            // centerPadding: '40px',
            slidesToShow: 2
          }
        },
        {
          breakpoint: 700,
          settings: {
            // arrows: false,
            centerMode: false,
            // centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    })
  }
}
new SliderDemo().init()