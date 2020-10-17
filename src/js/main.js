const App = {
    initGlitch: function() {
        setTimeout(() => document.body.classList.add('render'), 60);
        const navdemos = Array.from(document.querySelectorAll('nav.demos > .demo'));
        const total = navdemos.length;
        const current = navdemos.findIndex(el => el.classList.contains('demo--current'));
        const navigate = (linkEl) => {
            document.body.classList.remove('render');
            document.body.addEventListener('transitionend', () => window.location = linkEl.href);
        };
        navdemos.forEach(link => link.addEventListener('click', (ev) => {
            ev.preventDefault();
            navigate(ev.target);
        }));
        document.addEventListener('keydown', (ev) => {
            const keyCode = ev.keyCode || ev.which;
            let linkEl;
            if ( keyCode === 37 ) {
                linkEl = current > 0 ? navdemos[current-1] : navdemos[total-1];
            }
            else if ( keyCode === 39 ) {
                linkEl = current < total-1 ? navdemos[current+1] : navdemos[0];
            }
            else {
                return false;
            }
            navigate(linkEl);
        });
        imagesLoaded('.glitch__img', { background: true }, () => {
            document.body.classList.remove('loading');
            document.body.classList.add('imgloaded');
        });
    },
    initSVG: function() {
        // ********************
        // *
        // SVG Initializer
        // *
        // ********************
        $('img.svg').each(function(){
            var $img = $(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');
    
            $.get(imgURL, function(data) {
                // Get the SVG tag, ignore the rest
                var $svg = $(data).find('svg');
    
                // Add replaced image's ID to the new SVG
                if(typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                // Add replaced image's classes to the new SVG
                if(typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass+' replaced-svg');
                }
    
                // Remove any invalid XML tags as per http://validator.w3.org
                $svg = $svg.removeAttr('xmlns:a');
    
                // Replace image with new SVG
                $img.replaceWith($svg);
    
            }, 'xml');
        });
    },
    initSliders: function() {
        // ********************
        // *
        // Sliders Initializer
        // *
        // ********************
        $("#reviews-slider").slick({
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            dots:false,
            arrows:false,
            responsive: [
                {
                  breakpoint: 767,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                  }
                },
                {
                    breakpoint: 1199,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 1,
                    }
                },
            ]
        });
    },
    initHandlers: function() {
        // ********************
        // *
        // Handlers Initializer
        // *
        // ********************

        // *
        // Language Switcher
        // *

        $('.lang-switcher').on('click',function() {
            $(this).addClass('lang-switcher--active');
            $('.lang-switcher__list').addClass('lang-switcher__list--visible');
        });

        $(document).on('mouseup', function(e){
            let container = $('.lang-switcher');
            if (!container.is(e.target) && container.has(e.target).length === 0){
              container.removeClass('lang-switcher--active');
              $('.lang-switcher__list').removeClass('lang-switcher__list--visible');
            }
        });

        // *
        // Slider navigation buttons
        // *
        
        $('.js-slider-prev').on('click', function(){
            let slider = $(this).attr('data-slider');
            $(slider).slick("slickPrev");
        });
    
        $('.js-slider-next').on('click', function(){
            let slider = $(this).attr('data-slider');
            $(slider).slick("slickNext");
        });

        // *
        // FAQ Navigation
        // *
        $('.faq-navigation li a').on('click',function() {
            $('.faq-navigation li').removeClass('active');
            $(this).parent().addClass('active');
        });

        // *
        // Rellax.js
        // *
        let rellax = new Rellax('.rellax', {
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });

        // *
        // Toastr Notifications
        // *
        toastr.options.closeDuration = 50000;
        toastr.options.closeButton = true;
        // toastr.closeHtml = '<button class="toast-close-button"></button>';

        // *
        // FAQ
        // *

        $('.faq-navigation a').on('click',function() {
            let target = $(this).attr('data-target');
            console.log(target);
            console.log($(target).offset().top);
            $('html, body').stop().animate({
                scrollTop:  $(`.faq-accordion .card a[href="${target}"]`).offset().top
            }, 1000);
        });

        /**
         *  Burger menu handler
         */
        $('.js-burger').on('click',function(){
            let menu = $(this).attr('data-toggle')
            let status = $(this).attr('data-status');
            if (status =='closed') {
                $(this).addClass('open');
                $(this).attr('data-status','opened');
                $(menu).addClass('hero-section__menu--visible');
            } else {
                $(this).attr('data-status','closed');
                $(this).removeClass('open');
                $(menu).removeClass('hero-section__menu--visible');
            }
        });

        $(document).mouseup(function(e){
            let container = $('.hero-section__menu');
            if (!container.is(e.target) && container.has(e.target).length === 0){
              $('.hero-section__menu').removeClass('hero-section__menu--visible');
              $('.js-burger').attr('data-status','closed').removeClass('open');
            }
        });
        /**
         *  Auth Tabs
         */

        $('.js-auth-tab').on('click',function(){
            let tab = $(this).attr('data-tab');
            let container = $('.auth-box__tabs');
            container.find('.auth-box__tab').removeClass('auth-box__tab--active');
            $(tab).addClass('auth-box__tab--active');

            $('.js-auth-tab').removeClass('active');
            $(this).addClass('active');
        });
        $('.js-open-with-tab').on('click',function(){
            let tab = $(this).attr('data-open-tab');
            let container = $('.auth-box__tabs');
            container.find('.auth-box__tab').removeClass('auth-box__tab--active');
            $(tab).addClass('auth-box__tab--active');

            $('.auth-box__action button').removeClass('active');
            $(`.auth-box__action button[data-tab="${tab}"]`).addClass('active');
        });
        /**
         *  Button for password vision toggle
         */

        $('.show-password').on('click',function(e){
            let input = $(this).prev();
            let input_attr = input.attr('type');
            
            (input_attr == 'password') ? input.attr('type','text') : input.attr('type','password');
            e.preventDefault();
            
        });

    },
    init: function() {
        this.initSVG();
        this.initSliders();
        this.initHandlers();
        this.initGlitch();
        console.log('App has been initialized.');
    }
};

$(document).ready(function () {
    App.init();
});


