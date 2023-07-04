import { ConvertSvg } from '../modules/ConvertSvg'

const time = 2000

describe('should ConvertSvg', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = '<body></body>';
    });

    test('ConvertSvg svg format', async () => {
        $('body').html('<img src="https://stlouiscatclinic.com/wp-content/uploads/sites/4/2021/12/vaccine-v2.svg" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBeTruthy()
        expect($('.replaced-svg').get(0).tagName).toBe('svg')
    });

    test('ConvertSvg png format', async () => {
        $('body').html('<img src="https://www.stackinfra.com/wp-content/uploads/2020/11/image-sta.png" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBe(0)
        expect($('.img-svg').get(0).tagName).toBe('IMG')
    });

    test('ConvertSvg jpg format', async () => {
        $('body').html('<img src="https://stlouiscatclinic.com/wp-content/uploads/sites/4/2021/12/join-our-expert-team.jpg" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBe(0)
        expect($('.img-svg').get(0).tagName).toBe('IMG')
    });

    test('ConvertSvg attribute svg', async () => {
        $('body').html('<img src="https://stlouiscatclinic.com/wp-content/uploads/sites/4/2021/12/vaccine-v2.svg" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        const $img = $('.replaced-svg')
        expect($img.attr('xmlns')).toBe('http://www.w3.org/2000/svg')
        expect($img.attr('width')).toBe('95.198')
        expect($img.attr('height')).toBe('112.719')
        expect($img.attr('viewBox')).toBe('0 0 95.198 112.719')
    });

    test('ConvertSvg id attribute', async () => {
        $('body').html('<img id="id-img" src="https://stlouiscatclinic.com/wp-content/uploads/sites/4/2021/12/vaccine-v2.svg" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        const $img = $('.replaced-svg')
        expect($img.attr('id')).toBe('id-img')
    });

    test('ConvertSvg class attribute', async () => {
        $('body').html('<img src="https://stlouiscatclinic.com/wp-content/uploads/sites/4/2021/12/vaccine-v2.svg" class="class-img img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        const $img = $('.replaced-svg')
        expect($img.attr('class')).toBe('class-img img-svg replaced-svg')
    });

    test('ConvertSvg no viewport attribute', async () => {
        $('body').html('<img src="https://email.carbon8.info/ba/tests/logo-9th_dark-v2.svg" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        const $img = $('.replaced-svg')
        expect($img.attr('viewBox')).toBe('0 0 36 135')
    });

    test('ConvertSvg no src attribute', async () => {
        $('body').html('<img class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBe(0)
        expect($('.img-svg').get(0).tagName).toBe('IMG')
    });

    test('ConvertSvg src attribute is empty', async () => {
        $('body').html('<img src="" class="img-svg" />')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBe(0)
        expect($('.img-svg').get(0).tagName).toBe('IMG')
    });

    test('ConvertSvg no IMG tag', async () => {
        $('body').html('<div src="https://stlouiscatclinic.com/wp-content/uploads/sites/4/2021/12/vaccine-v2.svg" class="img-svg"></div>')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBe(0)
        expect($('.img-svg').get(0).tagName).toBe('DIV')
    });

    test('ConvertSvg no ConvertSvg element', async () => {
        $('body').html('')
        new ConvertSvg().convertSvg()
        await new Promise((r) => setTimeout(r, time));

        expect($('body').find('.replaced-svg').length).toBe(0)
    });
});