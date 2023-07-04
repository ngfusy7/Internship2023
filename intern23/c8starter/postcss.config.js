const path = require('path')

module.exports = {
  plugins: {
    'postcss-extract-media-query': {
      output: {
        path: path.join(__dirname, '/public/assets/styles/')
      },
      queries: {
        '(max-width: 1199px)and (min-width: 768px)': 'desktop',
        '(min-width: 768px)and (max-width: 1199px)': 'desktop',
        '(min-width: 768px)': 'desktop',
        '(min-width: 768px)': 'desktop',
        '(min-width: 992px)': 'desktop',
        '(min-width: 1024px)': 'desktop',
        '(min-width: 1200px)': 'desktop',
        '(min-width: 1280px)': 'desktop',
        '(min-width: 1440px)': 'desktop',
        '(min-width: 1600px)': 'desktop',
        '(min-width: 1650px)': 'desktop',
        '(min-width: 1800px)': 'desktop',
        '(min-width: 2000px)': 'desktop',
        '(min-width:768px)': 'desktop',
        '(min-width:992px)': 'desktop',
        '(min-width:1024px)': 'desktop',
        '(min-width:1200px)': 'desktop',
        '(min-width:1280px)': 'desktop',
        '(min-width:1440px)': 'desktop',
        '(min-width:1600px)': 'desktop',
        '(min-width:1650px)': 'desktop',
        '(min-width:1800px)': 'desktop',
        '(min-width:2000px)': 'desktop'
        // '(max-width: 1199px)': 'mobile',
        // '(max-width: 991px)': 'mobile',
        // '(max-width: 767px)': 'mobile',
        // '(max-width: 480px)': 'mobile',
        // '(max-width: 374px)': 'mobile'
      },
      extractAll: false
    },
    "postcss-combine-media-query": {}
  }
}
