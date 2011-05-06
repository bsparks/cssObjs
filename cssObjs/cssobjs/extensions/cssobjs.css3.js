(function($, undefined) {

    //CSS3 Extension using cssObjs functions
    //Adds functions that manipulate css values
    /*=============== Private Utility Functions ================*/
    var browsers = ["-moz-", "-webkit-", "-ms-", "-o-", ""];

    /*=============== Use the $.cssObjsAPI to add the Functions ================*/
    $.cssObjsAPI.addFunctions({
        rounded_corners: function(params) {
            return ["border-radius:", params, "-moz-border-radius:", params, "-webkit-border-radius:", params].join(';') + ';';
        },
        leafUL: function(params) {
            return ["border-top-left-radius:", params, "-moz-border-radius-topleft:", params, "border-bottom-right-radius:", params, "-moz-border-radius-bottomright:", params].join(';') + ';';
        },
        leafUR: function(params) {
            return ["border-top-right-radius:", params, "-moz-border-radius-topright:", params, "border-bottom-left-radius:", params, "-moz-border-radius-bottomleft:", params].join(';') + ';';
        },
        tab: function(params) {
            return ["-moz-border-radius-topright:", params, "border-top-right-radius:", params, "-moz-border-radius-topleft:", params, "border-top-left-radius:", params].join(';') + ';';
        },
        inner_shadow: function(params) {

            var params = params.split(' '),
                offTop = params[0],
                offLeft = params[1],
                radius = params[2],
                color = params[3];

            return [["-webkit-box-shadow: inset", offTop, offLeft, radius, color].join(' '), ["-moz-box-shadow: inset", offTop, offLeft, radius, color].join(' '), ["box-shadow: inset", offTop, offLeft, radius, color].join(' ')].join(';') + ';';

        },
        box_shadow: function(params) {

            var params = params.split(' '),
                offTop = params[0],
                offLeft = params[1],
                radius = params[2],
                color = params[3];

            return [["-moz-box-shadow:", offTop, offLeft, radius, color].join(' '), ["-webkit-box-shadow:", offTop, offLeft, radius, color].join(' '), ["box-shadow:", offTop, offLeft, radius, color].join(' '), ["-ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=", radius,
                                                                                                                                                                     ",Direction=90,Color=\'", color, "\')"].join('')].join(';') + ';';
        },
        // TODO: IE6-IE9 support
        rotate: function(params) {
            // params should be single angle (default degrees)
            return [["-moz-transform:rotate(", params, "deg)"].join(''), // FF 3.5+
            ["-o-transform:rotate(", params, "deg)"].join(''), // Opera 10.5
            ["-webkit-transform:rotate(", params, "deg)"].join(''), // Safari 3.1+, Chrome
            ["-ms-transform:rotate(", params, "deg)"].join(''), // IE9
            ["transform:rotate(", params, "deg)"].join('')].join(';') + ';';
        },
        // css3 transitions
        transition: function(params) {
            var p = params.split(" "),
                property = p[0],
                duration = p[1],
                timing_function = p[2],
                pStr, dStr, tStr, result, goLong = false;

            // allow properties to be comma delim
            if (property.split(',').length > 1 || duration.split(',').length > 1 || timing_function.split(',').length > 1) {
                goLong = true; // we need to go long hand from now on
            }

            if (goLong) {
                pStr = $.map(browsers, function(b) {
                    return [[b, "transition-property:"].join(''), property].join(' ')
                }).join(';\n') + ';\n';

                dStr = $.map(browsers, function(b) {
                    return [[b, "transition-duration:"].join(''), duration].join(' ')
                }).join(';\n') + ';\n';

                tStr = $.map(browsers, function(b) {
                    return [[b, "transition-timing-function:"].join(''), timing_function].join(' ')
                }).join(';\n') + ';\n';

                result = [pStr, dStr, tStr].join('\n');
            } else {
                result = $.map(browsers, function(b) {
                    return [[b, "transition:"].join(''), property, duration, timing_function].join(' ');
                }).join(';\n') + ';\n';
            }

            return result;
        }
    });


})(jQuery);