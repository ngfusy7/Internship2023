const maxHeight = {
  '0': '0',
  '0.5': '1px',
  '200': '400px',
  full: '100%',
  screen: '100vh',
  initial: 'initial',
  'none': 'none',
  '2k': '2000px',
  '1080': '1080px',
}

let max = 1000;
for (let i = 0; i <= max; i++) {
  maxHeight[i] = i * 2 + 'px';
}

module.exports = {
  maxHeight
}
