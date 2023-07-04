
var fs = require('fs');
import header from '../modules/Header'
let $header
let newHeader = new header()
describe('Header', () => {
    beforeAll(() => {
        var f = fs.readFileSync('src/html/modules/global/header.html', 'utf-8');
        document.documentElement.innerHTML = f;
        $header = $(newHeader.$header)
        newHeader.scrollPinHeader()
        
    });
    test('exists header', () => {
        expect($header.length).toBeTruthy();
    });

    test('have text Skip to main content', () => {
        expect($header.text()).toContain('Skip to main content');
    });

    test('should have class header default', ()=>{
        expect($header.hasClass('header')).toBeTruthy();
    });

    test('Check class when pin', ()=>{
        newHeader.settingPin(0)
      expect($header.hasClass(newHeader.class)).toBeFalsy();
      newHeader.settingPin(1)
     
      expect($header.hasClass(newHeader.class)).toBeTruthy();
     
    });
    
});