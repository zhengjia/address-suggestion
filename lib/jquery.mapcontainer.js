(function($){   
    $.fn.acts_as_map_container = function(){   
        var that = this; 
        return (function(){
            if (GBrowserIsCompatible()) {
                var m = $(that)[0];
                if(m) {		
                    var map = new GMap2(m);
                    var start = new GLatLng(55,55);
                    var zoomLevel = 10;
                    map.setCenter(start, zoomLevel);
                    map.addControl(new GSmallMapControl());
                    return map;
                }
            }                       
        })();          
    } 
})(jQuery);
