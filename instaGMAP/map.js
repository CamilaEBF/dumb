var map;

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

function placeMarker(location){
  var info = new google.maps.InfoWindow({
    content: location.lat().toFixed(4)+", "+location.lng().toFixed(4),
    position: location,
    maxWidth: 100
  });
  info.open(map);
}
