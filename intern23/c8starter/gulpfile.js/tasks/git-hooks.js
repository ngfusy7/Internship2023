const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const gutil = require('gulp-util')
const config = require('../config')
const stylelint = require('./stylelint')
const standard = require('./standard')
const checkhooks = () => {
  try {
    const stats = fs.statSync(path.join(config.getBase(), '.git'))
    const preCommitHookFile = path.join(config.getBase(), '.git', 'hooks', 'pre-commit')
    if (!fs.existsSync(preCommitHookFile)) {
      gutil.log(gutil.colors.yellow(`Please install Husky: ${gutil.colors.bgMagenta('npm install husky -D')} `))
      process.exit(1)
    }
  } catch (e) {

  }
}
const precommit = gulp.series(standard, stylelint)
gulp.task('checkhooks', checkhooks)
gulp.task('precommit', precommit)
module.exports = precommit
