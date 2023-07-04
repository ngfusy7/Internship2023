const Container = {
  '.container': {
    maxWidth: '100%',
    '@screen lg': {
      maxWidth: '1000px'
    },
    '@screen xl': {
      // maxWidth: '1110px'
      maxWidth: '1200px' // new
    },
    '@screen 2xl': {
      // maxWidth: '1390px'
      maxWidth: '1600px' // new
    }
  }
}
module.exports = {
  Container
}
