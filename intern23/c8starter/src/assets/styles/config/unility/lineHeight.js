const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
}

let p = 0;
let max = 100;
for (let i = 0; i <= max; i+=0.5) {
  lineHeight[i] = i * 2 + 'px';
  p = i + 'p';
  lineHeight[p] = i * 2 + '%';
}

module.exports = {
  lineHeight
}
