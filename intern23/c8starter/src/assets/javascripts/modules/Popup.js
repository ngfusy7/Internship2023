/**
* popup-js 2.0 by @thien.ho
* License: MIT
*/

import CallBackLazy from './CallBackLazy'
const callBack = new CallBackLazy()
export default class Popup {
  constructor () {
    this.$html = $('html')
    this.$modPop = '.mod-popup'
    this.$ClosePopup = '.popup-is-close'
    this.$openPopup = '.popup-is-open'
    this.closeContent = '<span class="icomoon icon-close"></span><span class="sr-only">Close Popup</span>'
    this.closeLink = `<button type="button" class="popup-is-close no-underline">
    <span class="icomoon icon-close"></span>
    <span class="sr-only">Close Popup</span>
    </button>`
    this.contentInner = `<div class="popup-inner">
    <h3>The requested content cannot be loaded. <br> Please try again later.</h3>
    </div>`
    this.widthContent = 'container'
    this.widthContentTmp = 'container'
    this.popupstatic = 'popup-static'
    this.popcontent = '.popup-content'
    this.popShow = 'popup-show'
    this.clsPopupShow = `.${this.popShow}`
    this.popinner = '.popup-inner'
    this.noelement = 'no-element'
    this.iframe = ''
    this.slickInit = 'slick-initialized'
    this.tag = 'iframe:visible,a:visible,button:visible,.focus-div:visible,input:visible,.focus-item:visible'
    this.slickCurrent = '.slick-current'
  }

  init () {
    if (this.$html.length) {
      this.openPopup()
      this.clickOutSite()
      this.clickClosePopup()
      this.controlPopup()
    }
  }

  /**
   * Function
   */
  renderPopup () {
    const html = `<div class="mod-popup ${this.popShow}">
    <div class="popup-container inset-0 absolute">
    <div class="popup-content ${this.widthContent}" aria-modal="true" role="dialog">
    <div class="mask-pop-overlay"></div>
    </div>
    </div>
    </div>`
    $(document.body).append(html)
  }
  loadLazyOnLoad () {
    const $hasLazy = $('.popup-inner .lazy')
    if ($hasLazy.length) {
      $hasLazy.each((_index, el) => {
        const element = el
        const elementTmp = $(element)[0].tagName
        callBack.call(elementTmp, element)
      })
    }
  }
  convertToEmbed (url) {
    const urlYoutube = 'https://www.youtube.com/embed/'
    if (url.toLowerCase().indexOf('youtube.com') !== -1 && url.toLowerCase().indexOf('youtube.com/embed') === -1) {
      const tempV = url.split('?v=')[1]
      const v = tempV.split('&')[0]
      return `${urlYoutube + v}?autoplay=1&rel=0&showinfo=0`
    }
    if (url.toLowerCase().indexOf('vimeo.com') !== -1 && url.toLowerCase().indexOf('player.vimeo.com/video') === -1) {
      const parts = url.split('/')
      const v2 = parts.pop()
      return `https://player.vimeo.com/video/${v2}?autoplay=1&muted=0`
    }
    if (url.toLowerCase().indexOf('youtu.be') !== -1) {
      const parts2 = url.split('/')
      const v3 = parts2.pop()
      return `${urlYoutube + v3}?autoplay=1&rel=0&showinfo=0`
    }

    return url
  }
  addMutedVideo (url) {
    if (url.toLowerCase().indexOf('youtube.com') === -1) {
      if (url.toLowerCase().indexOf('?') === -1) {
        return url + '?muted=0'
      } else {
        return url + '&muted=0'
      }
    }
    return url
  }
  popupVideo (ele) {
    let srcVideo = $(ele).attr('data-href')
    const labelContent = $(ele).attr('data-label')
    console.log('labelContent: ', labelContent)
    srcVideo = this.convertToEmbed(srcVideo)
    srcVideo = this.addMutedVideo(srcVideo)
    this.iframe = `<div class="popup-inner popup-video ">
              <div class="embed-responsive relative embed-responsive-16by9">
                <iframe title="Video lightbox" class="embed-responsive-item absolute inset-0 w-full h-full" src="${srcVideo}" frameborder="0"></iframe>
              </div>
              <div tabindex="0" class="ada-back"></div>
            </div>`
    this.renderPopup()
    const $popupContent = $(this.$modPop).find(this.popcontent)
    $popupContent.append(this.iframe)
    $popupContent.find(this.popinner).append(this.closeLink)
  }
  popupContent (tmpContent) {
    let cloneTmp = ''
    cloneTmp = $(tmpContent).find(this.popinner).clone()
    this.renderPopup()
    const $popupContent = $(this.$modPop).find(this.popcontent)
    if ($(tmpContent).length) {
      $popupContent.append(cloneTmp)
    } else {
      $popupContent.addClass(this.noelement).append(this.contentInner)
    }
    $popupContent.find(this.popinner).append(this.closeLink)
  }
  openPopup() {
    this.$html.on('click', this.$openPopup, (e) => {
      // cal lazy img into popup
      const ele = e.currentTarget
      const htmlClass = $(ele).data('htmlclass')
      const tmpContent = $(ele).data('id')
      const tmpPopup = $(ele).data('popup')
      const tmpWidthContent = $(tmpContent).data('content')
      const labelledby = $(ele).data('label')
      $(ele).addClass('is-click')
      this.loadLazyOnLoad()
      if ($(tmpContent).hasClass('mod-popup-static')) {
        $(tmpContent).addClass(this.popupstatic)
      } else {
        if (typeof tmpWidthContent !== 'undefined') {
          this.widthContent = tmpWidthContent
        }
        if (tmpPopup === 'video') {
          this.popupVideo(ele)
        } else {
          this.popupContent(tmpContent)
        }

      }

      if ($(tmpContent).hasClass(this.popupstatic)) {
        $(tmpContent).addClass(this.popShow)
      } else {
        $(this.$modPop).addClass(this.popShow).find(this.popcontent).attr('aria-labelledby', labelledby)
      }
      this.$html.addClass(htmlClass).addClass('popup-open')
      setTimeout(() => {
        this.$html.addClass('popup-animation')
        if ($(`.${this.popShow}`).find(this.slickInit).length) {
          $(`.${this.popShow}`).find('.slick-current').find('iframe,a,button,.focus-div,.focus-item').eq(0).focus()
        } else {
          $(`.${this.popShow}`).find('iframe,a,button,.focus-div,.focus-item').eq(0).focus()
        }
      }, 100)
      // callBack()
      return false
    })
  }
  closePopup () {
    const classHtml = this.$html.find('.is-click').data('htmlclass')
    this.$html.removeClass('popup-open popup-animation ' + classHtml)
    if (this.$html.find('.' + this.popShow).hasClass(this.popupstatic)) {
      this.$html.find('.' + this.popupstatic).removeClass(this.popShow)
    } else {
      $(this.$modPop).remove()
    }
    // console.log(this.$html.find('.is-click'))
    this.$html.find('.is-click').focus()
    this.$html.find('.is-click').removeClass('is-click')
    this.widthContent = this.widthContentTmp

  }
  clickClosePopup () {
    this.$html.on('click', this.$ClosePopup, () => {
      this.closePopup()
    })
  }
  clickOutSite () {
    this.$html.on('click', '.mask-pop-overlay', () => {
      this.closePopup()
    })
    $(window).keydown((e) => {
      if ((e.keyCode === 27 && $(this.clsPopupShow).length) || (e.keyCode === 13 && $(e.target).hasClass('popup-is-close'))) {
        e.preventDefault()
        this.closePopup()
      }
    })
  }
  controlPopup() {
    $(document).keydown((event) => {
      const keyCode = event.keyCode
      if (keyCode === 9 && $(this.clsPopupShow).length) {
        if (event.shiftKey) {
          this.focusPopupKeyupShift(event)
        } else {
          this.focusPopupKeydown(event)
        }
      }
    })
    $(document).keyup((event) => {
      const keyCode = event.keyCode
      if (keyCode === 9 && !event.shiftKey && $(this.clsPopupShow).length) {
        this.focusPopupKeyup()
      }
    })
  }
  focusPopupKeyup() {
    if ($('.ada-back:focus').length) {
      if ($(this.clsPopupShow).find(this.slickint).length) {
        $(this.clsPopupShow).find('.slick-next').focus()
      } else {
        if($(this.clsPopupShow).find(this.$ClosePopup).is(':visible')){
          $(this.clsPopupShow).find(this.$ClosePopup).eq(0).focus()
        }else{
          $(this.clsPopupShow).find(this.tag).eq(0).focus()
        }
      }
    }
  }
  focusPopupKeyupShiftHasSlick(event) {
    if ($(this.clsPopupShow).find(this.slickint).length) {
      if ($(this.clsPopupShow).find(this.slickCurrent).find(this.tag).eq(0).is(':focus')) {
        event.preventDefault()
        $(this.clsPopupShow).find(this.$ClosePopup).focus()
        return false
      }
      if ($(this.clsPopupShow).find('.slick-prev:focus').length) {
        event.preventDefault()
        $(this.clsPopupShow).find('.slick-next').focus()
        return false
      }
      if ($(this.clsPopupShow).find(this.nextFocus).length) {
        $(this.clsPopupShow).find(this.slickCurrent).find('.ada-back').focus()
      }
    }
    return true
  }
  focusPopupKeyupShift(event) {
    if(this.focusPopupKeyupShiftHasSlick(event)){
      if ($(this.clsPopupShow).find(this.tag).eq(0).is(':focus')) {
        event.preventDefault()
        $(this.clsPopupShow).find(this.$ClosePopup).focus()
        return false
      }
      if ($(`${this.$ClosePopup}:focus`).length) {
        if ($(this.clsPopupShow).find(this.slickint).length) {
          event.preventDefault()
          $(this.clsPopupShow).find('.slick-prev').focus()
        } else {
          $(this.clsPopupShow).find('.ada-back').focus()
        }
      }
    }
    return true
  }
  focusPopupKeydown(event) {
    if ($(this.clsPopupShow).find(`${this.$ClosePopup}:focus`).length) {
      event.preventDefault()
      if ($(this.clsPopupShow).find(this.slickint).length) {
        $(this.clsPopupShow).find(this.slickCurrent).find(this.tag).eq(0).focus()
      } else {
        $(this.clsPopupShow).find(this.tag).eq(0).focus()
      }
      return false
    }
    if ($(this.clsPopupShow).find(this.nextFocus).length) {
      event.preventDefault()
      $(this.clsPopupShow).find('.slick-prev').focus()
    } else {
      if ($(this.clsPopupShow).find('.slick-prev:focus').length) {
        event.preventDefault()
        $(this.clsPopupShow).find(this.$ClosePopup).eq(0).focus()
      }
    }
    return true
  }
}

new Popup().init()
