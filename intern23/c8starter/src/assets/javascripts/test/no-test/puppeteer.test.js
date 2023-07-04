const puppeteer = require('puppeteer');
jest.setTimeout(10000);
let page
describe('Google', () => {
  beforeAll(async () => {
   
   
    const browser = await puppeteer.launch({
      // headless: false,
      // devtools: true
    });
    page = await browser.newPage();
   
    await page.goto('http://localhost:3000/');
    await page.setViewport( {
      width: 1366,
      height: 768,
      deviceScaleFactor: 1
    } );	
    // await page.waitFor(5000);
    await page.screenshot({
      path: 'screenshot/test1.png',
      fullPage: true
    });
  });

  // it('should be titled "Google"', async () => {
  //   await expect(page.title()).resolves.toMatch('Google');
  //   await expect(page).toMatch('Google')
  // });

  it('click home', async () => {
    await page.click(".btn-click");
    // await expect(page).click('.btn-click')
    await expect(page).toMatch('thien')
    await page.waitFor( 1000 );
    await page.screenshot({
      path: 'screenshot/fullpage1.png',
      fullPage: true
    });
    // await browser.close();
    // setTimeout(async()=>{
    //   await browser.close();
    // }, 10000)
  });

  // it('Show dialog', async () => {
  //   const dialog = await expect(page).toDisplayDialog(async () => {
  //     await expect(page).toClick('.popup-is-open', { text: 'Popup-is-open Image' })
  //   })
  // }); 
 
 
});