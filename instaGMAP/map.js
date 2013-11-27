var map;
var instagramClient = "de775615dc8e45de8290ea0f8c9b6e29";

function makeMap(){
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(40.745721,-73.89871),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  google.maps.event.addListener(map, 'click', function(event) {
    placeMarker(event.latLng);
  });
}

//puts an info window on the map
//with a photo
function placeMarker(location){
  var info = new google.maps.InfoWindow({
    content: location.lat().toFixed(4)+", "+location.lng().toFixed(4),
    position: location,
    maxWidth: 100
  });
  info.open(map);
}
