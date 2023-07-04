const minWidth = {
  0: '0',
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  200: '200px',
}

let max = 1000;
for (let i = 0; i <= max; i++) {
  minWidth[i] = i * 2 + 'px';
}
module.exports = {
  minWidth
}
