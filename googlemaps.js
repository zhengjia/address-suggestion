var Address = {};
Address.geocode = function(address, callbackFunction) {
        apiKey = 'ABQIAAAAg_OTIrIDOoYO1Y7fk1CppRSSf0CfqtNriAlWTbzT5zlBJBs6dxQSCsOE_TE1um7bZS2QhQKGx_rTJQ';
        jQuery.ajax({
            dataType: 'jsonp',
            url: 'http://maps.google.com/maps/geo?output=json&oe=utf8&sensor=false' + '&key=' + apiKey + '&q=' + address,
            cache: false,
            success: function(data){
                if(data.Status.code==200) {
                    var result = [];
                    //does not work here. is it closure?
                    var resultElement={};
                    $.each(data.Placemark, function(intIndex,value) {
                      //console.log(value.address);
                        resultElement={};
                    	resultElement.address = value.address;
                    	resultElement.longitude = value.Point.coordinates[0];
                    	resultElement.latitude = value.Point.coordinates[1];
      					result[intIndex] = resultElement;
    				});	
                    callbackFunction(result);
                } else {
                    callbackFunction(null);
                }
            }
        }); //end ajax 
};

Address.createMap = function(){
    if (GBrowserIsCompatible()) {
        var m = $("#map")[0];
        if(m) {		
            var map = new GMap2(m);
            var start = new GLatLng(55,55);
            var zoomLevel = 10;
            map.setCenter(start, zoomLevel);
            map.addControl(new GSmallMapControl());
        }
    } 
    function getMap(){
       return map;
    }
    return getMap; 
};

$(document).ready(function() { 

    var getMap = Address.createMap();
    var map = getMap();
    var mark;
    var soc_id;
    
    function delayedOnChange(e) {
        var delay = e.delay || 500;
        window.clearTimeout( soc_id );
        soc_id = window.setTimeout( getAddressData, delay );
    } //end delayedOnChange

    function getAddressData(){
        var addr = jQuery('#address').val();
        Address.geocode(addr, function(data) {
            if(data) {	
                $("#address-suggestion").html("");
    	    	$.each(data,function(intIndex,value){
    	    		appendElement = "<tr><td>" + value.address + "</td><td><button class='addressSelection' data-longitude='" + value.longitude + "' data-latitude='" + value.latitude + "'>Select</button></td></tr>";
    	    		$("#address-suggestion").append(appendElement);
    	    	}); //end each
            } 
            else {
                alert('ERROR! Unable to geocode address');
            }
        }); //end geocode
    } //end of getAddressData
    

    function loadNewAddress(longitude, latitude){
        
        if(mark) {
            map.removeOverlay(mark);
        }
        //update map
        var pointB = new GLatLng(latitude,longitude);
        mark = new GMarker(pointB);
        map.addOverlay(mark);
        map.setCenter(pointB, 14); 
    }

    $("#address").keydown(delayedOnChange);  
    $("button").live("click", function(){
        var longitude = $(this).attr("data-longitude");
        var latitude = $(this).attr("data-latitude");
        var addr = $(this).prev().text();
        $("#address").val(addr);
        loadNewAddress(longitude, latitude);
    });

    GEvent.addListener(map, 'click', function(overlay, point){
        if(mark) {
            map.removeOverlay(mark);
        }
        if(point) {
            var pointA = new GPoint(point.x, point.y);
            mark = new GMarker(pointA);
            map.addOverlay(mark);
            map.getCenter(point);
            $('#lng').attr('value',point.x);
            $('#lat').attr('value',point.y);
        }
    }); //end GEvent   
}); 
