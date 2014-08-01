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
            start(options);
        }
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