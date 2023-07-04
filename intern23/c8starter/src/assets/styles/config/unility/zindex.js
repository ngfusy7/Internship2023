const Index = {
  '100': 100,
  '200': 200,
  'a-1': '-1',
  'a-2': '-2',
  '9999': 9999,
  'auto': 'auto'
}

let max = 50;
for (let i = 0; i <= max; i++) {
  Index[i] = i * 2;
}

module.exports = {
  Index
}
