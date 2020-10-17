try {
    window.$ = window.jQuery = require('jquery');
    require('bootstrap');
    require('slick-carousel');
    window.toastr = require('toastr');
    window.imagesLoaded = require('imagesloaded');
    window.Rellax = require('rellax');
    

    //require('more-packages-installed-with-npm-install');

} catch (e) {}

require('./main');
