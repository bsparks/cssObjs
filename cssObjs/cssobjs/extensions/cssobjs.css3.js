(function($, undefined) {

    //CSS3 Extension using cssObjs functions
    //Adds functions that manipulate css values
    /*=============== Private Utility Functions ================*/
    var utils = {};

    /*=============== Use the $.cssObjsAPI to add the Functions ================*/
    $.cssObjsAPI.addFunctions({
        rounded_corners: function(params) {
            return ["border-radius:", params, "-moz-border-radius:", params, "-webkit-border-radius:", params].join(';');
        },
        leafUL: function(params) {
            return ["border-top-left-radius:", params, "-moz-border-radius-topleft:", params, "border-bottom-right-radius:", params, "-moz-border-radius-bottomright:", params].join(';');
        },
        leafUR: function(params) {
            return ["border-top-right-radius:", params, "-moz-border-radius-topright:", params, "border-bottom-left-radius:", params, "-moz-border-radius-bottomleft:", params].join(';');
        },
        tab: function(params) {
            return ["-moz-border-radius-topright:", params, "border-top-right-radius:", params, "-moz-border-radius-topleft:", params, "border-top-left-radius:", params].join(';');
        },
        inner_shadow: function(params) {

            var params = params.split(' ');
            var offTop = params[0];
            var offLeft = params[1];
            var radius = params[2];
            var color = params[3];

            return [["-webkit-box-shadow: inset", offTop, offLeft, radius, color].join(' '), ["-moz-box-shadow: inset", offTop, offLeft, radius, color].join(' '), ["box-shadow: inset", offTop, offLeft, radius, color].join(' ')].join(';');

        },
        box_shadow: function(params) {

            var params = params.split(' ');
            var offTop = params[0];
            var offLeft = params[1];
            var radius = params[2];
            var color = params[3];

            return [["-moz-box-shadow:", offTop, offLeft, radius, color].join(' '), ["-webkit-box-shadow:", offTop, offLeft, radius, color].join(' '), ["box-shadow:", offTop, offLeft, radius, color].join(' '), ["-ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=", radius,
                                     ",Direction=90,Color=\'", color, "\')"].join('')].join(';');
        }
    });


})(jQuery);
