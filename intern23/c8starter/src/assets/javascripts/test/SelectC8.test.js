var fs = require('fs')
import selectC8 from '../modules/SelectC8';
let $html
let newSelectC8 = new selectC8()

describe('SelectC8 Unit Testing', () => {
  beforeAll(() => {
    document.documentElement.innerHTML = `
    <body>
      <div class="form-group mb-10 form-select-c8">
      <label for="select-1" id="id-8267775591-label">Please Select</label>
      <select class="select-c8 hidden" id="select-1" data-title="Please Select">
      <option value="India">India</option>
      <option value="Australia">Australia</option>
      <option value="United States">United States</option>
    </select>
    </body>
    `
    $html = $('html')
    new selectC8().init()
  })

  test('Check element SelectC8 exists', (done) => {
    expect($('.select-c8').length).toBeTruthy();
    expect($(newSelectC8.$callSelectC8Option).length).toBeTruthy();
    expect($(newSelectC8.formSelectC8).length).toBeTruthy();
    expect($(newSelectC8.dropdownMenu).length).toBeTruthy();
    expect($('.'+newSelectC8.dropdownSelectC8).length).toBeTruthy();
    done();
  });

  test('Check click on open dropdown', (done) => {
    let dropdownToggle =  $(newSelectC8.dropToggle)
    expect(dropdownToggle.length).toBeTruthy();
    dropdownToggle.trigger('click')

    expect($('.'+newSelectC8.dropdownSelectC8).hasClass(newSelectC8.show)).toBeTruthy();
    expect($(newSelectC8.dropdownMenu).hasClass(newSelectC8.hidden)).toBeFalsy();
    expect($(newSelectC8.dropToggle).attr('aria-expanded')).toBe('true')
    done();
  });

  test('Check click out close dropdown', (done) => {
    // click out
    $('body').trigger('click');

    expect($(newSelectC8.dropdownOpen).hasClass(newSelectC8.show)).toBeFalsy();
    expect($(newSelectC8.dropdownMenu).hasClass(newSelectC8.hidden)).toBeTruthy();
    expect($(newSelectC8.dropToggle).attr('aria-expanded')).toBe('false')
    done();
  });

  test('Check click toggle SelectC8', (done) => {
    let dropdownToggle =  $(newSelectC8.dropToggle)
    expect(dropdownToggle.length).toBeTruthy();
    dropdownToggle.trigger('click')

    expect($('.'+newSelectC8.dropdownSelectC8).hasClass(newSelectC8.show)).toBeTruthy();
    expect($(newSelectC8.dropdownMenu).hasClass(newSelectC8.hidden)).toBeFalsy();
    expect($(newSelectC8.dropToggle).attr('aria-expanded')).toBe('true')

    dropdownToggle.trigger('click')
    expect($(newSelectC8.dropdownOpen).hasClass(newSelectC8.show)).toBeFalsy();
    expect($(newSelectC8.dropdownMenu).hasClass(newSelectC8.hidden)).toBeTruthy();
    expect($(newSelectC8.dropToggle).attr('aria-expanded')).toBe('false')
    done();
  });

});
