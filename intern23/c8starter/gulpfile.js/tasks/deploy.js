const gulp = require('gulp')
const path = require('path')
const config = require('../config')
const sftp = require('gulp-sftp')
const changed = require('gulp-changed')

const deploy = () => {
  const paths = {
    src: path.join(config.getDest(), '/**/*.*'),
    dest: config.getDeploy()
  }

  return gulp.src(paths.src)
  .pipe(changed(paths.dest))
  .pipe(gulp.dest(paths.dest))
  .pipe(sftp(config.getSettings('deploy')))
}

gulp.task('deploy', deploy)
module.exports = gulp.task('deploy')
