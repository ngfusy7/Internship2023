/**
 *
 * @param {Number} px px unit
 * @param {Number} base base px
 * @returns rem unit
 */
module.exports.rem = (px, base = 16) => {
  return `${px / base}rem`
}

/**
 *
 * @param {Number} fontSize fontSize (px)
 * @param {Number} lineH lineHeight (px)
 * @returns lineHeight ratio
 */
 module.exports.lineHeight = (fontSize, lineH) => {
  return (lineH / fontSize).toFixed(4)
}