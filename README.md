address-suggestion
==================

address-suggestion is a jQuery plugin which suggests and autocomplete the accurate address based on the partial address given by users.*

Usage
=====
googlemaps.html shows how to use the plugin.

* include the javascript files

```
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js"></script>
<script src="lib/jquery.googlemaps.js"></script> <!-- this is the plugin -->
<script src="googlemaps.js"></script> <!-- this is your javascript file -->
<script src="http://maps.google.com/maps?file=api&amp;v=2" type="text/javascript"></script><!-- embed google maps -->
```

* On the html page, place three placeholder elements. For example

```
<input id="address" type="text" />
<div id="suggestion"></div>
<div id="map"></div>
```

* In your javascript file, initialize the plugin as

```
//initialize the map element
var map = $('#map').acts_as_map_container();@
// params:
// container is required, which is the map element you just assigned to
// suggestion is the element which will contain the suggested address, defaults to #suggested
// delay is the delay time for requesting google map api, default to 500ms
var address = $('#address').acts_as_address({
    container: map,
    suggestion: '#suggestion',
    delay : 500
});

```

* The latitude and longitude are stored as hidden field with #latitude and #longitude

* Customize your css according to your needs. It only has the most basic styling applied.