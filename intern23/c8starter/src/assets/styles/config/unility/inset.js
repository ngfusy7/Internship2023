let max = 101
let p
let inset = {
  auto: 'auto',
  'full': '100%',
  '1/2': '50%',
  '1.5': '3px',
  '-104': '-208px',
  '-124': '-248px',
  '-142': '-284px',
  '-235': '-470px',
  '-327': '-654px',
  '-100-per': '-100%'
}

for (let i = 0; i < max; i++) {
  inset[i] = i * 2 + 'px'
  p = i + 'p'
  inset[p] = i + '%'
}
for (let i = -(max); i < 0; i++) {
  inset[i] = i * 2 + 'px'
  p = i + 'p'
  inset[p] = i + '%'
}

// console.log(inset)
module.exports = {
  inset
}
