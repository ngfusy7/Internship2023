export default class Special {
  constructor () {
    this.$this = $('.header-special')
  }
  init() {
    if (this.$this.length) {
      this.searchBox();
      this.clickIconMenu1();
      this.clickIconMenu2();
    }
  }
  searchBox() {
  var s = '.search-frame-desktop';
    $('.icon-search-desktop').click(function() {
      $('.right-icon').hide();
      $(s).removeClass('hidden');
      $(s).addClass('flex');
    });

    $('#close-search-box').click(function() {
      $(s).removeClass('flex');
      $(s).addClass('hidden');
      $('.right-icon').show();
    });
    
    $('.icon-search-mobile').click(function() {
      if (!$('.search').hasClass('hidden')) {
        $('.search').addClass('hidden');
        $('.cancel').show();
        $('.search-frame-mobile').show();
      }
      else {
        $('.cancel').hide();
        $('.search').removeClass('hidden');
        $('.search-frame-mobile').hide();
      }
    });
  }

  clickIconMenu1() {
    $('.icon-menu').click(function() {
      $(this).toggleClass('active-menu');
      $('.frame-menu').slideToggle(400);

      if (!$(this).hasClass('active-menu')) {
        $('.menu-level-2.close').removeClass('close');
        $('.menu-level-2.open').addClass('now');
        $('.menu-level-2.open').removeClass('open');
      }
    });
  }
  
  clickIconMenu2() {
    var item_click = [
      '.ABB > li:nth-child(1)',
      '.ABB > li:nth-child(2)',
      '.ABB > li:nth-child(3)',
      '.LROS > li:nth-child(1)',
      '.LROS > li:nth-child(4)'
    ];

    var item_show = [
      '.menu-adjust',
      '.menu-base',
      '.menu-bedding',
      '.menu-learn',
      '.menu-support'
    ];

    for (let i = 0; i < item_click.length; i++) {
      $(item_click[i]).click(function() {
        $(item_show[i]).removeClass('close');
        $(item_show[i]).addClass('open');
      });
    }

    $('.back').click(function() {
      $('.menu-level-2').removeClass('open');
      $('.menu-level-2').removeClass('now');
      $('.menu-level-2').addClass('close');
    });
  }
}
new Special().init()