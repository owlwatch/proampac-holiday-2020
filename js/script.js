import jQuery from 'jquery';

jQuery(function($) {

    $('.pa-slide_button-next').on('click', function() {
        var $this = $(this);
        var $slide = $this.closest('.pa-slide');
        var $next = $slide.next();
        var windowHeight = $(window).height();

        if($this.hasClass('pa-next') && $next.length) {
            $('html, body').animate({
                scrollTop: (windowHeight * 4 + 2) + 'px'
            }, 2000, function(){
            });
        } else {
            $this.addClass('pa-next');
            $('html, body').animate({
                scrollTop: (windowHeight + 2) + 'px'
            }, 1000);
        }
    });

    $('.pa-slide_button-next_secondary').on('click', function() {
        var windowHeight = $(window).height();

        $('html, body').animate({
            scrollTop: (windowHeight * 4 + 2) + 'px'
        }, 1000);
    });

    $('.pa-slide_button-restart').on('click', function() {
        $(window).scrollTop(0);
    });

    $(window).on('scroll', function() {
        var isTablet = window.matchMedia('(max-width: 992px)').matches;
        var currentTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var scrollPercent = currentTop / windowHeight;
        var $slide = $('.pa-slide').first();
        var $slideTwo = $('.pa-slide').last();
        var $slideTwoContent = $('.pa-slide_content-col2');
        var $slideTwoBackground = $slideTwo.find('.pa-slide_background');
        var $btnRestart = $('.pa-slide_button-restart');
        var $btnNext = $('.pa-slide_button-next');
        var $btnNext2 = $('.pa-slide_button-next_secondary');
        
        $slide.find('.pa-slide_transparency').css('background', 'rgba(255, 255, 255,' + scrollPercent + ')');

        if(currentTop < windowHeight) {
            $btnNext.removeClass('pa-next');
            $slide.find('.pa-slide_content-fade').removeClass('pa-slide_content-fade_in');
            $slide.removeClass('pa-slide_hidden');
            $slideTwo.addClass('pa-slide_hidden');
            $slideTwoContent.removeClass('pa-slide_content-col2_in');
        }
        else if(currentTop >= windowHeight) {
            $slideTwoContent.removeClass('pa-slide_content-col2_in');

            if(currentTop < (windowHeight * 2)) {
                // first slide, second step
                $slide.find('.pa-slide_content-fade').addClass('pa-slide_content-fade_in');
                $slide.removeClass('pa-slide_hidden');
                $slideTwo.addClass('pa-slide_hidden');
            } else if(currentTop < (windowHeight * 3)) {
                // second slide, first step
                $btnRestart.addClass('pa-slide_button-hidden');
                $btnNext2.removeClass('pa-slide_button-hidden');
                $slide.find('.pa-slide_content-fade').removeClass('pa-slide_content-fade_in');
                $slide.addClass('pa-slide_hidden');
                $slideTwo.removeClass('pa-slide_hidden');
                $slideTwoContent.removeClass('pa-slide_content-col2_in');

                var bgPosition = currentTop / (windowHeight * 4) * -100 / 2;

                if(!isTablet) {
                    $slideTwoBackground.css({
                        'background-position': 'center ' + (bgPosition < -50 ? -50 : bgPosition) + 'vh',
                        'transition': 'background-position 0.1s ease-in-out'
                    });
                }
            } else {
                // second slide, second step
                $slideTwoContent.addClass('pa-slide_content-col2_in');
                $btnRestart.removeClass('pa-slide_button-hidden');
                $btnNext2.addClass('pa-slide_button-hidden');
                
                if(!isTablet) {
                    $slideTwoBackground.css({
                        'background-position': 'center -50vh',
                        'transition': 'background-position 0.3s ease-in-out'
                    });
                }
            }

            $btnNext.addClass('pa-next');
        }
    });

});