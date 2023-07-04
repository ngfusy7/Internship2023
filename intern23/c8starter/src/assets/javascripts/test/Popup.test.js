var fs = require('fs');
import popup from '../modules/Popup'
let $html
let newPopup = new popup()
// console.error = jest.fn();

describe('Check Popup', () => {
  beforeAll(() => {
    // console.error.mockClear();
    var f = fs.readFileSync('src/html/modules/mod-popup.html', 'utf-8');
    document.documentElement.innerHTML = f;

    $html = $('html')
    // console.log('$html', $html.html())
    // console.log('beforeAll')

  });

  afterEach(() => {
    $('.mod-popup').remove()
    // console.log('afterEach')
  });
  
  afterAll((done) =>{
    done();
    // console.log('afterAll')
  })


  test('Check element Popup exists', () => {
    // console.log(newPopup)
    expect($(newPopup.$openPopup).length).toBeTruthy();
    expect($(newPopup.popinner).length).toBeTruthy();
    expect($(newPopup.$ClosePopup).length).toBeTruthy();
    expect($(newPopup.popcontent).length).toBeTruthy();
    // expect($('.' + newPopup.maskOverlay).length).toBeTruthy();
    // expect($('.' + newPopup.popupContainer).length).toBeTruthy();
    // expect($('.' + newPopup.popupstatic).length).toBeTruthy();
  })

  test('Check click on open content', async () => {
    newPopup.openPopup()
    let contentPopup = $(newPopup.$openPopup + '[data-id="#content-popup"]')
    expect(contentPopup.length).toBeTruthy();
    contentPopup.trigger('click')
    // console.log(alert.mock)
    await new Promise((r) => setTimeout(r, 200));
    expect($(newPopup.$openPopup + '[data-htmlclass="html-popup-content"]').length).toBeTruthy();
    expect($('#content-popup').length).toBeTruthy();
    // expect($(newPopup.$openPopup).hasClass(newPopup.$openPopup)).toBeTruthy();
    expect($(newPopup.$modPop).hasClass(newPopup.popShow)).toBeTruthy();
    expect($('.' + newPopup.popShow).find(newPopup.$ClosePopup).length).toBeTruthy();
    expect($('.' + newPopup.popShow).find(newPopup.popinner).length).toBeTruthy();
    // expect($('.' + newPopup.popShow).find('.' + newPopup.maskOverlay).length).toBeTruthy();
    // expect($('.' + newPopup.popShow).find('.' + newPopup.popupContainer).length).toBeTruthy();
    expect($('.' + newPopup.popShow).find(newPopup.popcontent).length).toBeTruthy();
    expect($html.hasClass('html-popup-content popup-open popup-animation')).toBeTruthy();
  });

  test('Check close on open content', async () => {
    newPopup.openPopup()
    let contentPopup = $(newPopup.$openPopup + '[data-id="#content-popup"]')
    expect(contentPopup.length).toBeTruthy();
    contentPopup.trigger('click')
    await new Promise((r) => setTimeout(r, 200));
    expect($(newPopup.$openPopup + '[data-htmlclass="html-popup-content"]').length).toBeTruthy();
    expect($('#content-popup').length).toBeTruthy();
    expect($('.' + newPopup.popShow).find(newPopup.$ClosePopup).length).toBeTruthy();
    // expect($('.' + newPopup.popShow).find('.' + newPopup.maskOverlay).length).toBeTruthy();
    $('.' + newPopup.popShow).find(newPopup.$ClosePopup).click()
    expect($(newPopup.$modPop).hasClass(newPopup.popShow)).toBeFalsy();

  });

  test('Youtube Video', () => {
    newPopup.openPopup()
    let popupTag = $(newPopup.$openPopup + '[data-popup="video"][href*="youtube.com"]')
    // expect(popupTag.length).toBeTruthy();
    popupTag.trigger('click')

    let contentPopupIframe = $('.mod-popup iframe')
    let src = contentPopupIframe.attr('src')
    // expect(contentPopupIframe.length).toBeTruthy();
    // if (src.indexOf('?v')>= 0){
    //     expect(src).toContain('?v=');
    // }
    
    // expect($('.mod-popup').find('.popup-video').length).toBeTruthy()
    // expect(src).toContain('youtube.com/embed')
    // jest.useFakeTimers()

  })

  test('Vimeo Video', () => {

    let popupTag = $(newPopup.$openPopup + '[data-popup="video"][href*="vimeo.com"]')
    // expect(popupTag.length).toBeTruthy();
    popupTag.trigger('click')

    let contentPopupIframe = $('.mod-popup iframe')
    let src = contentPopupIframe.attr('src')
    // console.log('click html', $())

    // expect(contentPopupIframe.length).toBeTruthy();
    // expect($('.mod-popup').find('.popup-video').length).toBeTruthy()
    // expect(src).toContain('vimeo.com/video')
    // expect(src).toContain('muted=0')


  })
  test('Close Click', () => {

    let popupTag = $(newPopup.$openPopup + '[data-popup="video"][href*="vimeo.com"]')
    // expect(popupTag.length).toBeTruthy();
    popupTag.trigger('click')

    let contentPopupIframe = $('iframe')
    let closeBtn = $(newPopup.$ClosePopup)

    // expect(contentPopupIframe.length).toBeTruthy();
    // expect($('.mod-popup').find('.popup-video').length).toBeTruthy()

    expect(closeBtn.length).toBeTruthy()

    /* Close Popup */
    closeBtn.trigger('click')
    expect($('.mod-popup').find('.popup-video').length).toBeFalsy()
   
  })
})
