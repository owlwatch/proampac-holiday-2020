import '@babel/polyfill';
import $ from 'jquery';
import imagesLoaded from 'imagesloaded';
import Easing from './easing';

let scrollTop = $(window).scrollTop();
let windowHeight = $(window).height();
let windowWidth = $(window).width();
let isScrolling = false;
const $scrollArrow = $('button[data-action="scroll"]');
const $headerBg = $('.header__bg');
const $footerBg = $('.footer__bg');

const animate = {

    '.header__top' : [
        {
            start: 3,
            end: 3.8,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css('opacity', 1-v);
                $(selector).css('transform', 'translate3d(0, '+( v * -300 )+'px, 0)');
                if( v === 1 ){
                    $(selector).hide();
                }
                else {
                    $(selector).show();
                }
            }
        }
    ],

    '.header__bg' : [
        {
            start: 2,
            end: 5,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css({
                    'transform' : 'translateX(-50%) scale('+ (1 + v*0.2) +')'
                });
            }
        },{
            start: 4,
            end: 5.1,
            easing: 'easeOutQuad',
            style: {
                opacity:[1,0]
            }
        }
    ],

    '.header__from-our-family' : [
        {
            start: 0.2,
            end: 1,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css('opacity', v);
                $(selector).css('transform', 'translate3d(0, '+( (1-v) * 50 )+'px, 0)');
                if( v === 0 ){
                    $(selector).hide();
                }
                else {
                    $(selector).show();
                }
            }
        },
        {
            start: 3,
            end: 3.8,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css('opacity', 1-v);
                $(selector).css('transform', 'translate3d(0, '+( v * -300 )+'px, 0)');
                if( v === 1 ){
                    $(selector).hide();
                }
                else {
                    $(selector).show();
                }
            }
        }
    ],

    '.footer' : [
        {
            start: 3,
            end: 6,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css('background-position', '50% '+(v * ( document.documentElement.clientHeight * -0.1 ))+'px' );
            }
        },
    ],

    '.header__top-gradient' : [
        {
            start: 4,
            end: 5,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css({
                    opacity: 1-v
                });
            }
        }
    ],

    '.footer__bg' : [
        {
            start: 4.2,
            end: 5.5,
            easing: 'easeInOutQuad',
            callback: (v, selector) => {
                $(selector).css({
                    position: v?'fixed':'absolute',
                    opacity: v,
                    transform: 'scale('+(1+((1-v)*0.5))+') translate3d(0%, '+((1-v)* document.documentElement.clientHeight * -0.2 )+'px, 0)'
                });
            }
        },
    ],
    
    '.footer__content' : [
        {
            start: 5,
            end: 6,
            easing: 'easeOutQuad',
            callback: (v, selector) => {
                $(selector).css('opacity', v);
                $(selector).css('transform', 'translate3d(0, '+( (1-v) * 50 )+'px, 0)');
            }
        },
    ]
};


function resizeBackgrounds(){
    const image = new Image();
    image.onload = ()=>{
        const windowScale = windowWidth / windowHeight;
        const imageScale = image.width / image.height;
        $headerBg.css({
            height: windowScale > imageScale ? 'auto' : '100%',
            width: windowScale > imageScale ? '100%' : 'auto',
            opacity: 1
        });
    }
    image.src = $headerBg.attr('src');
}

function update(){

    scrollTop = $(window).scrollTop();
    windowHeight = $(window).height();
    windowWidth = $(window).width();

    for( let selector in animate ){
        const animations = animate[selector];
        let done = false;
        animations.forEach( animation => {
            let percent = 0;
            const start = animation.start * windowHeight;
            const end = animation.end * windowHeight;
            if( scrollTop > end ){
                percent = 1;
            }
            else if( scrollTop > start ){
                percent = (scrollTop - start) / ( end - start);
            }
            else {
                if( done ){
                    return;
                }
            }
            const i = Easing[animation.easing]( percent );
            if( animation.style ){
                for( const prop in animation.style ){
                    const fromTo = animation.style[prop];
                    const s = fromTo[1] - fromTo[0];
                    const v = fromTo[0] + s * percent;
                    $(selector).css(prop, v);
                }
            }
            if( animation.callback ){
                animation.callback.apply( this, [percent, selector, animation] );
            }
            done = true;
        });
        
        
    }
}

function init(){
    const $intro = $('.header__top').find('img');
    $intro.each( function(i){
        setTimeout(()=>{
            $(this).addClass('fade-in')
        }, ($intro.length - i) * 450 );
    });
    
    $scrollArrow.addClass('bounce');
    resizeBackgrounds();
    update();
}

imagesLoaded( document.body, init );

function onScroll(){
    $scrollArrow.removeClass('bounce');
    $('footer.actions').addClass('scrolling');
}
function onScrollStop(){
    $scrollArrow.addClass('bounce');
    $('footer.actions').removeClass('scrolling');
}

let scrollTimeout = null;
function detectScrolling(){
    
    onScroll();
    clearTimeout( scrollTimeout );
    scrollTimeout = setTimeout(()=>{
        onScrollStop();
    }, 200);
    if ((window.innerHeight + window.scrollY + 50) >= document.body.offsetHeight) {
        $('[data-action="replay"]').show();
        $('[data-action="scroll"]').hide();
    }else {
        $('[data-action="replay"]').hide();
        $('[data-action="scroll"]').show();
    }
}

$(window).on('scroll', update );
$(window).on('scroll', detectScrolling );
$(window).on('resize', () => { console.log( 'resize' ); update(); resizeBackgrounds();} );

$(document).on('click', '[data-action="replay"]', function(){
    $('html,body').animate({
        scrollTop: 0
    }, 0 );
});

$(document).on('click', '[data-action="scroll"]', function(){
    $('footer.actions').addClass('scrolling');
    $('html,body').animate({
        scrollTop: $(document).height()
    }, 7000, 'linear' );
});
