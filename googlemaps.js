$(document).ready(function(){
    var api_key = 'ABQIAAAAg_OTIrIDOoYO1Y7fk1CppRSSf0CfqtNriAlWTbzT5zlBJBs6dxQSCsOE_TE1um7bZS2QhQKGx_rTJQ';
    var map = $('#map').acts_as_map_container();
    
    // params:
    // container is required
    // suggestion is the element which will contain the suggested address, default to #suggested
    // delay is the delay time for requesting google map api, default to 500ms
    var address = $('#address').acts_as_address({
        api_key: api_key,
        container: map,
        suggestion: '#suggestion', 
        delay : 500
    });
    
})
