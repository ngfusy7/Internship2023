import CallBackLazy from './CallBackLazy'
const callBack = new CallBackLazy()
export default class LazyLoadImage {
  constructor () {
    this.lazyimage = '.lazy:visible'
  }
  init () {
    this.lazyLoadImage()
    $(window).on('resize orientationchange', () => {
      this.lazyLoadImage()
    })
    $(window).on('beforeprint', () => {
      this.lazyLoadAllPrint()
    })
  }
  lazyLoadImage () {
    if ($(this.lazyimage).length) {
      this.hasSlider()
      this.lazyloadimageCustom()
      this.addSrOnlyImageinLink()
      $(window).on('scroll', () => {
        this.lazyloadimageCustom()
      })
    }

  }
  addSrOnlyImageinLink(){
    $('body').find('.lazy').each((_index, element) => {
      const imageInLink =  $(element).parents('a')
      const alt =  $(element).attr('alt')
      if(imageInLink.length===1 && imageInLink.find('.alt-text').length<1 && alt){
        imageInLink.append(`<span class="sr-only alt-text opacity-0">${alt}</span>`)
      }
    })
  }
  hasSlider (element) {
    const $sliderLazy = $(element).parents('.slider-lazy')
    const $prevActiveLazy = $sliderLazy.find('.slick-current').prev().find('.lazy')
    const $nextActiveLazy = $sliderLazy.find('.slick-current').next().find('.lazy')

    $prevActiveLazy.each((_i, el) => {
      callBack.call(el.tagName, el)
    })

    $nextActiveLazy.each((_i, el) => {
      callBack.call(el.tagName, el)
    })
  }
  lazyloadimageCustom () {
    $(this.lazyimage).each((_index, element) => {
      const elementScroll = $(element).offset().top - window.innerHeight - (window.innerHeight / 3.5)
      const scrollBody = $(window).scrollTop()
      if (elementScroll < scrollBody) {
        const elementTmp = element.tagName
        callBack.call(elementTmp, element)
        if ($(element).parents('.fix-height').length) {
          $(element).on('load', () => {
            setTimeout(() => {
              window.callFixHeight()
            }, 200)
          })
        }
        if ($(element).parents('.slider-lazy').hasClass('slick-initialized')) {
          this.hasSlider(element)
        }
      }
    })
  }
  lazyLoadAllPrint() {
    const $imgLazy = $('img.lazy:visible,img.lazy.show-print')

    let imgLength = 0
    if ($imgLazy.length) {
      $('body').prepend(`<div class="hidden mess-print text-red">Images aren't loaded entirely yet. Please cancel this print and try again.</div>`)
      $imgLazy.each((_index, element) => {
        const $pictureTag = $(element).closest('picture');
        if ($pictureTag.length) {
          const $sourcePicture = $pictureTag.find('source');
          const $imgTag = $pictureTag.find('img');
          const newImage = new Image(100, 200);

          $sourcePicture.each((_idx, elm) => {
            const sourceImage = new Image(100, 200);
            sourceImage.src = $(elm).attr('data-srcset');
            $(elm).attr('srcset', $(elm).attr('data-srcset')).removeAttr('data-srcset');
          })
          newImage.src = $imgTag.attr('data-src');
        }
        $(element).attr('src', $(element).attr('data-src'))
        $(element).addClass('b-loaded').removeClass('lazy').removeClass('lazy-trigger').removeAttr('data-src')

        element.onload = () => {
          imgLength += 1
          if ($imgLazy.length === imgLength) {
            $('.mess-print').remove()
          }
        }
      })
    }
  }
}

new LazyLoadImage().init()
