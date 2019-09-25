define([
        'jquery',
        'modernizr'
    ],
    function ($) {

        Modernizr.load({
            test: Modernizr.input.placeholder,
            nope: [
                // 'css/placeholder/placeholder_polyfill.css',
                // 'lib/placeholder/placeholder_polyfill.jquery.js',
                'lib/placeholder/placeholders.js'
                // 'lib/placeholder/jquery.placeholders.js'
            ]
        });

});