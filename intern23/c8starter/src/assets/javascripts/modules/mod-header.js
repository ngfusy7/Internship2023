 //2:48 23/6 
 $(document).ready(function() {
    if (!$('#header-ergo').length) return;
    $('.icon-bar').click(function() {
        $(this).toggleClass('active');
        $('.bg-under').slideToggle(450);
        
        if ($('.box-search').addClass('flex')) {
            $('.box-search').removeClass('flex');
            $('.box-search').addClass('hidden');
            $('button:nth-child(1) > span:nth-child(2)').hide();
            $('button:nth-child(1) > span:nth-child(1)').show();
        }

        if (!$(this).hasClass('active')) {
            $('.sub-main-menu').removeClass('close');
            if ($('.sub-main-menu').hasClass('open')) {
                $('.sub-main-menu.open').addClass('reset');
                $('.sub-main-menu.open').removeClass('open');
            }
        }

        var list_li = [
            '.box-main-menu > .my-account > li:nth-child(1)',
            '.box-main-menu > .my-account > li:nth-child(2)',
            '.box-main-menu > .my-account > li:nth-child(3)',
            '.box-main-menu > .main-menu-ul > li:nth-child(1)',
            '.box-main-menu > .main-menu-ul > li:nth-child(4)'
        ];

        var sub_li = [
            '.sub-ajust',
            '.sub-access',
            '.sub-bedding',
            '.sub-learn',
            '.sub-support',
        ];

        for (let i = 0; i < list_li.length; i++) {
            $(list_li[i]).click(function() {
                console.log(`Da click ${list_li[i]}`);
                $(sub_li[i]).removeClass('close reset');
                $(sub_li[i]).addClass('open');
                console.log(`Da mo menu ${sub_li[i]}`);
            });
        }
        
        var exit = $('.sub-main-menu > .menu-arrow');
        $(exit).click(function() {
            $('.sub-main-menu').removeClass('close reset');
            $('.sub-main-menu').addClass('close');
        });

        $('.our-brands').click(function() {
            console.log('Da click !');
            if ($('.flex-sub-menu-bottom').hasClass('hidden')) {
                $('.flex-sub-menu-bottom').removeClass('hidden');
                $('.flex-sub-menu-bottom').addClass('flex');
                $('.our-brands > span').css('transform', 'rotate(180deg)');
            }
            else {
                $('.flex-sub-menu-bottom').removeClass('flex');
                $('.flex-sub-menu-bottom').addClass('hidden');
                $('.our-brands > span').css('transform', 'rotate(0deg)');
            }
        });
    }); 

    $('button:nth-child(1) > span:nth-child(1)').click(function() {
        $('button:nth-child(1) > span:nth-child(1)').hide();
        $('button:nth-child(1) > span:nth-child(2)').show();
        $('.box-search').addClass('flex');
        $('.box-search').removeClass('hidden');

        if ($('.icon-bar').hasClass('active')) {
            $('.icon-bar').toggleClass('active');
            $('.bg-under').slideToggle(450);
        }
    });
    
    $('button:nth-child(1) > span:nth-child(2)').click(function() {
        $('.box-search').removeClass('flex');
        $('.box-search').addClass('hidden');
        $('button:nth-child(1) > span:nth-child(2)').hide();
        $('button:nth-child(1) > span:nth-child(1)').show();
    });
});