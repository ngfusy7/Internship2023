
if (document.getElementsByClassName('slider-lazy').length) {
  // console.log('js', window.pathCSS)
  const head = document.getElementsByTagName('HEAD')[0]
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.media = 'screen'
  link.href = window.pathCSS + 'app-slider.css'
  head.appendChild(link)
}
