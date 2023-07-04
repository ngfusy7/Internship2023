export default class CallBackLazy {
  constructor () {
    this.$html = $('html')
  }
  call (elementTmp, element) {
    if ($(element).hasClass('lazy')) {
      const datasrc = element.getAttribute('data-src')
      const $pictureTag = $(element).closest('picture');
      if (elementTmp === 'IMG') {
        if ($pictureTag.length) {
          const $sourcePicture = $pictureTag.find('source');
          $sourcePicture.each((_idx, elm) => {
            $(elm).attr('srcset', $(elm).attr('data-srcset')).removeAttr('data-srcset');
          })
        }
        element.setAttribute('src', datasrc)
      } else {
        $(element).css({
          'background-image': `url('${datasrc}')`
        })
      }
      $(element).addClass('b-loaded').removeClass('lazy').removeAttr('data-src')
      .parents('a').find('.alt-text').remove()
    }
  }
}
