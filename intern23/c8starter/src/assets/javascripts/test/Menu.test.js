var fs = require('fs')
import Menu from '../modules/Menu';

const menu = new Menu()

describe('Menu Unit Testing', () => {

  const addClass = jest.fn();
  const removeClass = jest.fn();
  const hasClass = jest.fn(className => {
    return true;
  });

  const jQuery = jest.fn(() => ({
    addClass,
    removeClass,
    hasClass
  }));

  beforeAll(() => {
    var f = fs.readFileSync('src/html/modules/global/menu.html', 'utf-8');
    document.documentElement.innerHTML = f;
    // console.log($('html').html());
  });

  it('Hover Menu Item Desktop', () => {
    expect($(menu.this).length).toBeTruthy()
  })
  it('openMainMenu', () => {
    expect(3).toBeLessThanOrEqual(3)
    const first = $('.main-menu-ul li').first()
    // expect(first.className).toContain('active')
    expect(first.hasClass('active')).toBeTruthy();
  })
})
