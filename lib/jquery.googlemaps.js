(function($){

    var Address = {}
    Address.timeout_id = 0;    
    
    $.fn.acts_as_address = function(user_defined_options){
        Address.options = $.extend({
            suggestion: '#suggestion',
            delay: 500,
            address: $(this)
        },user_defined_options||{}); 
        
        Address.options.suggestion = $(Address.options.suggestion);
        Address.options.mark = null;
       
        Address.delay_on_change = function (e) {
            window.clearTimeout( Address.timeout_id );
            Address.timeout_id = window.setTimeout(Address.get_address_data, Address.options.delay );
        }
        
        Address.get_address_data = function(){
            var address_value = Address.options.address.val();
            Address.geocode(address_value, function(data) {
                if(data) {
                    Address.options.suggestion.html("");
                    $.each(data,function(int_index,value){
                        append_element = "<tr><td>" + value.address + "</td><td><button class='jquery-googlemaps-button' data-longitude='" + value.longitude + "' data-latitude='" + value.latitude + "'>Select</button></td></tr>";
                        Address.options.suggestion.append(append_element);
                    }); //end each
                }
                else {
                    alert('ERROR! Unable to geocode address');
                }
            }); //end geocode
        } //end of getAddressData
        
        
        Address.geocode = function(address, callback) {
            jQuery.ajax({
                dataType: 'jsonp',
                url: 'http://maps.google.com/maps/geo?output=json&oe=utf8&sensor=false' + '&key=' + Address.options.api_key + '&q=' + address,
                cache: false,
                success: function(data){
                    if(data.Status.code==200) {
                        var result = [];
                        $.each(data.Placemark, function(int_index,value) { 
                            var result_element={};
                            result_element.address = value.address;
                            result_element.longitude = value.Point.coordinates[0];
                            result_element.latitude = value.Point.coordinates[1];
                            result[int_index] = result_element;
                        });
                        callback(result);
                    } else {
                        callback(null);
                    }
                }
            }); //end ajax
        }; //end geocode
        
        Address.load_new_address = function(longitude, latitude){
            if(Address.options.mark) {
                Address.options.container.removeOverlay(Address.options.mark);
            }
            //update map
            var pointB = new GLatLng(latitude,longitude);
            Address.options.mark = new GMarker(pointB);
            Address.options.container.addOverlay(Address.options.mark);
            Address.options.container.setCenter(pointB, 14);
        }
        
        Address.add_result_to_page = function(longitude, latitude){
            var longitude_element = $('input#longitude');
            var latitude_element = $('input#latitude');
            if(longitude_element.length == 0) {
                $('body').append('<input type="hidden" id="longitude" value = ' + longitude + ' />');     
                $('body').append('<input type="hidden" id="latitude" value = ' + latitude + ' />');     
            }
            else{
                longitude_element.val(longitude);
                latitude_element.val(latitude);  
            }        
        }
        
        
        Address.options.address.keydown(Address.delay_on_change);
        
        $(".jquery-googlemaps-button").live("click", function(){
            var longitude = $(this).attr("data-longitude");
            var latitude = $(this).attr("data-latitude");
            var full_address = $(this).prev().text();
            
            Address.options.address.val(full_address);
            Address.add_result_to_page(longitude, latitude);
            Address.load_new_address(longitude, latitude);
        });
        
         
    } //end acts_as_address

})(jQuery);
    
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


