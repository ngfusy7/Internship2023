describe('Click button', () => {
  it('should fire a alert', () => {
    const alert = jest.fn();

    document.body.innerHTML = `<div> <span id="username"></span><button id="button"> </button></div>`;
    const $button =  $('#button')
    $button.click(() => {
      alert('click');
    });

    $button.trigger('click')

    expect(alert).toBeCalled();

    // the mock function is called one time
    expect(alert.mock.calls.length).toBe(1);

    // The first argument of the first call to the function was click
    expect(alert.mock.calls[0][0]).toBe('click');
    // console.log(alert.mock)
  });
});
