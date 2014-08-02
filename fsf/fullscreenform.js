/**
 * Created with 300G.
 * User: jupegarnica
 * Date: 2014-07-31
 * Time: 04:25 PM
 */
(function($) {
    var debug = true;
    
    function fullscreenformInit(selector, options) {
        options = options || {};
        if(typeof selector === "string") {
            var setting = {
                selector: selector,
                background: 'rgba(30,30,30,0.95)',
                color: '#fff',
                zindex: 9999,
                overlay: '<div class="fsfOverlay"><div class="fsfContainer"></div></div>',
                next: '<a class="fsfNext" href="javascript:fullscreenform.nextNode();">' + 'Next' + '</a>',
                exclude: ['input[type="submit"]'],
                steps: '<span class="fsfstep"></span>'
            }
            for(var prop in setting) {
                setting[prop] = options[prop] || setting[prop];
                debug && options[prop] && console.log('Default setting changed:', prop, options[prop]);
            }
            window.fullscreenform.options = setting;
            start(setting);
        }
    };
    window.fullscreenform = fullscreenformInit;
	
    //start it if a target on autoinit is received
    if (window.fsfAutoinit.target) {
        fullscreenform(window.fsfAutoinit.target , window.fsfAutoinit.options)
    }

    function start(options) {
        var $nodes, $node, $nodesUsed = [],
            $input, inputId, $label, skip, nodeindex = 0,
            $selector = $(options.selector),
            $fsfNext = $(options.next),
            $fsfNextClass = $fsfNext.attr('class');
        if($selector.length === 0) {
            return console.log('A valid selector is needed');
        }
        $selector.wrap(options.overlay).append($fsfNext);
        $nodes = $(options.selector + ' input , ' + options.selector + ' textarea , ' + options.selector + ' select');

        function nextNode() {
            $node = $($nodes[nodeindex])
            debug && console.log($node);
            //skip excluded nodes
            for(var j in options.exclude) {
                if($node.is(options.exclude[j])) {
                    skip = true;
                    break;
                }
            }
            if(skip) {
                skip = false;
                nodeindex += 1;
                setTimeout(nextNode, 0);
                debug && console.log('skipped', nodeindex, $node);
                return;
            }
            $node.addClass('fsfActiveElement fsfInput');
            inputId = $node.attr('id');
            $label = $('[for="' + inputId + '"]').addClass('fsfActiveElement fsfLabel');
            $nodesUsed.push([
                $node,
                $label
            ]);
            //remove previous node
            if($nodesUsed[$nodesUsed.length - 2]) {
                $nodesUsed[$nodesUsed.length - 2].forEach(function(el) {
                    if(el) {
                        el.removeClass('fsfActiveElement fsfInput fsfLabel');
                    }
                });
            }
            nodeindex += 1;
            if(nodeindex) {}
        }

        function reset() {}
        window.fullscreenform.nextNode = nextNode;
    }
    window.fullscreenform.start = start;
})(jQuery);