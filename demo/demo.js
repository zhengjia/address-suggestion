$(document).ready(function(){
    var map = $('#map').acts_as_map_container();
    // params:
    // container is required
    // suggestion is the element which will contain the suggested address, default to #suggested
    // delay is the delay time for requesting google map api, default to 500ms
    var address = $('#address').acts_as_address({
        container: map,
        suggestion: '#suggestion',
        delay : 500
    });

})
