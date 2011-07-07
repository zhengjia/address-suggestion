address-suggestion
==================

address-suggestion is a jQuery plugin which suggests and autocomplete the accurate address based on the partial address given by users.

Usage
=====

demo/index.html shows an example
--------------------------------

Detailed Steps
--------------

* include required javascript files

```
<script src="http://maps.google.com/maps/api/js?sensor=false" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script src="lib/jquery.googlemaps.js"></script> <!-- this is the plugin -->
<script src="lib/jquery.mapcontainer.js"></script>
```

* On the html page, place three placeholder elements. For example

```
<input id="address" type="text" />
<div id="suggestion"></div>
<div id="map"></div>
```

* In your javascript file, initialize the plugin

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

* The latitude and longitude are stored in hidden fields if you need to grab them again.

* Customize your css according to your needs. It only has the most basic styling applied.

Contribute
==========

* Fork the project
* Start a feature/bugfix branch
* Send pull request on github