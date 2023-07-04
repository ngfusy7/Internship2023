export default class content_slick {
  constructor () {
    this.$this = $('.mod_content_slick')
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

      prevArrow: '<button class="slick-prev arrows h1 text-primary-100"><span class="icomoon icon-chevron-left"></span><span class="sr-only">Prev slider</span></button>',
      nextArrow: '<button class="slick-next arrows h1 text-primary-100"><span class="icomoon icon-chevron-right"></span><span class="sr-only">Next slider</span></button>',

      responsive: [
        {
          breakpoint: 1200,
          settings: {
            // arrows: false,
            centerMode: true,
            // centerPadding: '40px',
            variableWidth: false,
            slidesToShow: 2
            
          }
        },
        {
          breakpoint: 700,
          settings: {
            // arrows: false,
            centerMode: false       ,
            variableWidth: false,
            // centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    })
  }
}
new content_slick().init()
console.log("Hello Sy PRo VIp")