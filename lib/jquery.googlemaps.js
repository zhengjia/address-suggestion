/*
 * jQuery address suggestion
 * Author: Zheng Jia
 * http://github.com/zhengjia/address-suggestion
 * Licensed under the MIT license.
 */

(function($){
    var Address = {
        timeout_id : 0,
        get_address_data : function(){
            var address_value = Address.options.address.val();
            Address.geocode(address_value, function(data) {
                if(data) {
                    Address.options.suggestion.html("");
                    $.each(data,function(int_index,value){
                        append_element = "<tr><td class='jquery-googlemaps-button' data-longitude='" + value.longitude + "' data-latitude='" + value.latitude + "'>" + value.address + "</td></tr>";
                        Address.options.suggestion.append(append_element);
                    }); //end each
                }
                else {
                		Address.options.suggestion.html("");
                }
            }); //end geocode
        }, //end of getAddressData
        delay_on_change : function (e) {
            window.clearTimeout( Address.timeout_id );
            Address.timeout_id = window.setTimeout(Address.get_address_data, Address.options.delay );
        },
        geocode : function(address, callback) {
            jQuery.ajax({
                dataType: 'jsonp',
                url: 'http://maps.google.com/maps/geo?output=json&oe=utf8&sensor=false' + '&q=' + address,
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
        }, //end geocode
        load_new_address : function(longitude, latitude, full_address){
            var pointB = new google.maps.LatLng(latitude,longitude);
            Address.options.marker = new google.maps.Marker({ position: pointB,
																															map     : Address.options.container });
            Address.options.container.setCenter(pointB, 14);
        },
        add_result_to_page : function(longitude, latitude, full_address){
            var longitude_element = $('input#longitude');
            var latitude_element = $('input#latitude');
            Address.options.address.val(full_address);
            if(longitude_element.length == 0) {
                //get the longitude and latitude with $(#longitude).val() and $(latitude).val()
                $('body').append('<input type="hidden" id="longitude" value = ' + longitude + ' />').append('<input type="hidden" id="latitude" value = ' + latitude + ' />');
            }
            else{
                longitude_element.val(longitude);
                latitude_element.val(latitude);
            }
        }

    }
    $.fn.acts_as_address = function(user_defined_options){
        Address.options = $.extend({
            suggestion: '#suggestion',
            delay: 500,
            address: $(this)
        },user_defined_options||{});

        Address.options.suggestion = $(Address.options.suggestion);
        Address.options.marker = null;
        Address.options.address.keydown(Address.delay_on_change);

        $(".jquery-googlemaps-button").live("click", function(){
            var longitude = $(this).attr("data-longitude");
            var latitude = $(this).attr("data-latitude");
            var full_address = $(this).parent().prev().text();

						Address.options.suggestion.html("");
            Address.options.address.val(full_address);
            Address.add_result_to_page(longitude, latitude, full_address);
            Address.load_new_address(longitude, latitude);
        })
        return this;
    } //end acts_as_address
})(jQuery);