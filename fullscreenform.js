/**
 * Created with 300G.
 * User: jupegarnica
 * Date: 2014-07-31
 * Time: 04:25 PM
 */
(function($) {
    var debug = window.fullscreenform.debug;

    function init() {}
    //console.log($('p').text());
    if(window.fullscreenform.options.length != 0) {
        debug && console.log('started before load');
        for(var i in window.fullscreenform.options) {
            var options = window.fullscreenform.options[i];
            fullscreenformStart(options);
        }
    }

    function fullscreenformStart(options) {
        $(options.overlay).appendTo('body').css({
//             'position': 'fixed',
//             'top': '0',
//             'left': '0',
//             'width': $( window ).width(),
//             'height': $( window ).height(),
//             'z-index': options.zindex,
//             'background': options.background
        });
//         var node = $(options.selector)[0][1] ;
//         var $input  = $(node);
//         var inputName = $(node).attr('name');
//         var $label = $('label[for="' + inputName + '"]');
// 		$label.css({
//             'position': 'fixed',
//             'top' : '20px',
//             'left' : '30px',
//             'max-width' : '400px',
//             'z-index' : options.zindex + 1,
//             'background' : 'transparent',
//             'border' : '0',
            
//             'font-size' : '30px',
//             'color' : options.color,
//         });
//         $input.css({
//             'position': 'fixed',
//             'top' : '60px',
//             'left' : '30px',
//             'max-width' : '400px',
//             'z-index' : options.zindex + 1,
//             'background' : 'transparent',
//             'border' : '0',
//             'border-bottom' : 'solid 1px grey',
//             'font-size' : '30px',
//             'color' : options.color,
//         });
    }
    window.fullscreenform.fullscreenformStart = fullscreenformStart;
})(jQuery);