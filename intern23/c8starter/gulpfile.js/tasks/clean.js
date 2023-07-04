const gulp = require('gulp')
const del = require('del')
const config = require('../config')

const clean = (done) => {
  const paths = {
    dest: config.getDest()
  }

  del.sync([paths.dest], {force: true})
  if (done) {
    done()
  }
}
gulp.task('clean', clean)
module.exports = clean
