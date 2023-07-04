const maxWidth = {
  none: 'none',
  0: '0',
  xs: '20rem',
  sm: '24rem',
  md: '28rem',
  lg: '32rem',
  xl: '36rem',
  '2xl': '42rem', // 672px
  '3xl': '48rem', // 768px 
  '4xl': '56rem', // 896px
  '5xl': '64rem', // 1024px
  '6xl': '72rem', // 1152px
  '7xl': '80rem', // 1280px
  full: '100%',
  min: 'min-content',
  max: 'max-content',
  prose: '65ch',
}

let max = 1000;
for (let i = 0; i <= max; i++) {
  maxWidth[i] = i * 2 + 'px';
}

module.exports = {
  maxWidth
}
