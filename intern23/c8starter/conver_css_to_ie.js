var postcss = require('postcss')
var cssvariables = require('postcss-css-variables')
const config = require('./gulpfile.js/config.js')
console.log('Path css: ', config.getTaskDest('tailwind'))

var fs = require('fs')
const pathCSS = config.getTaskDest('tailwind')
const start = async () => {
  fs.readdir(pathCSS, (err, files) => {
    for (const file of files) {
      fs.readFile(`${pathCSS}/${file}`, 'utf8', async (err, css) => {
        if (err) { console.log(err) } else {
          var output = postcss([cssvariables({
            // preserve: true
          })]).process(css).css
          fs.writeFile(`${pathCSS}/${file}`, output, function (err) {
            if (err) return console.log(err)
          })
        }
      })
    }
  })
}
start()
