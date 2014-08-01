/**
 * Created with 300G.
 * User: jupegarnica
 * Date: 2014-07-31
 * Time: 03:33 PM
 *
 * FEATURES:
 *
 * starting before even has been loaded, it's not needed to wait until fullscreenform has been loaded
 * use over https or http
 * the user doesn't need to load any library such a jQuery if needed.
 * totally configurable. not one css, just JS
 *
 */
var jQuery = jQuery || undefined;
var debug = true;
(function($) {
    function _loadjQ() {
        var loader = document.createElement('script');
        loader.type = 'text/javascript';
        loader.async = false;
        loader.id = 'jQLoaded';
        // It can be used over http or https
        loader.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js';
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(loader);
    }

    function _loadFullscreenform() {
        var loader = document.createElement('script');
        loader.type = 'text/javascript';
        loader.async = false;
        loader.id = 'fullscreenformLoaded';
        loader.src = 'fullscreenform.js';
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(loader);
    }
	// Load Css directly
    (function loadFullscreenformCss() {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.media = 'screen';
        link.id = 'fullscreenformCssLoaded';
        link.href = 'fullscreenform.css';
        head.appendChild(link);
        
    })();
    // Autoload jQuery if is not defined  
    if(!$) {
        if(window.attachEvent) {
            window.attachEvent('onload', _loadjQ);
            window.attachEvent('onload', _loadFullscreenform);
        } else {
            window.addEventListener('load', _loadjQ, false);
            window.addEventListener('load', _loadFullscreenform, false);
        }
    } else {
        if(window.attachEvent) {
            window.attachEvent('onload', _loadFullscreenform);
        } else {
            window.addEventListener('load', _loadFullscreenform, false);
        }
    }
	    
    //it takes the parameters even before the code has been loaded to avoid calling the initializer after window load
    function fullscreenform(selector, options) {
        selector = selector;
        options = options || {};
        if(typeof selector === "string") {
            var defaultOptions = {
                selector: selector,
                background: 'rgba(30,30,30,0.95)',
                color: '#fff',
                zindex: 9999,
                overlay: '<div class="fsfOverlay"><div class="fsfContainer"></div></div>',
                next: '<span>' + 'siguiente' + '</span>'
            }
            for(var prop in options) {
                defaultOptions[prop] = options[prop] || defaultOptions[prop];
                debug && console.log(prop, options[prop]);
            }
            window.fullscreenform.options.push(defaultOptions);
            try {
                window.fullscreenform.fullscreenformStart(defaultOptions);
            } catch(e) {}
        }
        return selector || 'A valid selector is needed';
    }
    window.fullscreenform = fullscreenform;
    window.fullscreenform.options = [];
    window.fullscreenform.debug = debug;
    fullscreenform('.checkout');
})(jQuery);