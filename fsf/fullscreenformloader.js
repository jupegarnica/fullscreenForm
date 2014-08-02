/**
 * Created with 300G.
 * User: jupegarnica
 * Date: 2014-07-31
 * Time: 03:33 PM
 *
 * FEATURES:
 *
 * Easy config like:
 * <script src="fullscreenformloader.js" id="fsfAutoLoader" data-fsf-target=".checkout"></script>
 * <script src="fullscreenformloader.js" id="fsfAutoLoader" data-fsf-latest="true" data-fsf-target=".checkout" data-fsf-options="{'exclude':['#billing_address_2','#payment_method_paypal', '#payment_method_sermepa' , 'input[type=submit]' ]}"></script>
 *
 * use over https or http
 * the user doesn't need to load any library such as jQuery.
 * totally configurable.
 *
 */
var jQuery = jQuery || undefined;
var debug = true;
(function($) {
    
    var fsfAutoLoader = document.getElementById('fsfAutoLoader');
    window.fsfAutoinit = {
        target: fsfAutoLoader.getAttribute('data-fsf-target'),
        options: (function() {
            try {
                return JSON.parse(fsfAutoLoader.getAttribute('data-fsf-options').split("'").join('"')); //switch quotes if they are in tha bad way
            } catch(e) {
                console.log('Error un data-fsf-options:', e.name, e.message);
            }
        })(),
        latest: (function() {
            try {
                return JSON.parse(fsfAutoLoader.getAttribute('data-fsf-latest'));
            } catch(e) {
                return false;
            }
        })(),
    };
    debug && console.log(window.fsfAutoinit);
    
    
    // find fsf path
    if(!window.fsfAutoinit.latest) {
        var url = document.location.href;
        var path = url.substring(0, url.lastIndexOf("/") + 1);
        var fsfPath;
        fsfPath = fsfAutoLoader.src.split('fullscreenformloader.js')[0].split(path)[1];
    } else {
        fsfPath = 'PATH/TO/PRODUCTION/CDN';
    }

    function _loadjQ() {
        var loader = document.createElement('script');
        loader.type = 'text/javascript';
        loader.async = true;
        loader.id = 'jQLoaded';
        // It can be used over http or https
        loader.src = ('https:' == document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js';
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(loader);
        //Load fsf after jQuery
        if(loader.attachEvent) {
            loader.attachEvent('onload', _loadFullscreenform);
        } else {
            loader.addEventListener('load', _loadFullscreenform, false);
        }
    }

    function _loadFullscreenform() {
        var loader = document.createElement('script');
        loader.type = 'text/javascript';
        loader.async = true;
        loader.id = 'fullscreenformLoaded';
        loader.src = fsfPath + 'fullscreenform.js';
        var x = document.getElementsByTagName('head')[0];
        x.appendChild(loader);
    }
    // Load Css directly
    (function _loadFullscreenformCss() {
        var head = document.getElementsByTagName('head')[0];
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.media = 'screen';
        link.id = 'fullscreenformCssLoaded';
        link.href = fsfPath + 'fullscreenform.css';
        head.appendChild(link);
    })();
    // Autoload jQuery if is not defined  
    if(!$) {
        if(window.attachEvent) {
            window.attachEvent('onload', _loadjQ);
        } else {
            window.addEventListener('load', _loadjQ, false);
        }
    } else {
        if(window.attachEvent) {
            window.attachEvent('onload', _loadFullscreenform);
        } else {
            window.addEventListener('load', _loadFullscreenform, false);
        }
    }
    //it takes the parameters even before the code has been loaded to avoid calling the initializer after window load

    function fullscreenformAutoInit(selector, options) {}
})(jQuery);