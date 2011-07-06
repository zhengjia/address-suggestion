(function($){
    $.fn.acts_as_map_container = function(){
        var that = this;
        return (function(){
		        var m = $(that)[0];
		        if(m) {
		            var start = new google.maps.LatLng(44.98, -93.2636111);
								var myOptions = {
										zoom: 10,
								    center: start,
								    mapTypeId: google.maps.MapTypeId.ROADMAP
								};
								var map = new google.maps.Map(m, myOptions);
		            return map;
		        }
        })();
    }
})(jQuery);
