// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 10,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 4,

});

streetmap.addTo(myMap);

d3.csv("static/data/airports.csv").then (function(response) {
    // Create a new marker cluster group
  var markers ;
  
  // Loop through data
  for (var i = 0; i < response.length; i++) {
    markers = L.circleMarker([response[i].LATITUDE, response[i].LONGITUDE])
    markers.bindPopup(response[i].AIRPORT);
    L.geoJson(response, {
      // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          "Magnitude: "
            + feature.AIRPORT
            
        );
      }
    }).addTo(myMap);
    markers.on('mouseover', function(e) { 
      d3.csv("static/data/airports.csv").then (function(response){
        console.log(e)
        var popup = L.popup()
      .setLatLng(e.latlng) 
      .setContent(e.layer)
      .openOn(myMap);
    });
      });
    
    markers.on('mouseout', function() { markers.closePopup(); 
    });
    
      // Add a new marker to the cluster group and bind a pop-up
      //markers.addLayer(L.marker([response[i].LATITUDE, response[i].LONGITUDE]),
       // Binding a pop-up to our marker
     
      myMap.addLayer(markers);
  }
  // Add our marker cluster layer to the map
  



// //draggable: true,
// //
// //.addTo(myMap)
// // Initialize all of the LayerGroups we'll be using
// var layers = {
//   COMING_SOON: new L.LayerGroup(),
//   EMPTY: new L.LayerGroup(),
//   LOW: new L.LayerGroup(),
//   NORMAL: new L.LayerGroup(),
//   OUT_OF_ORDER: new L.LayerGroup()
// };

// // Create the map with our layers
// var map = L.map("map-id", {
//   center: [40.73, -74.0059],
//   zoom: 12,
//   layers: [
//     layers.COMING_SOON,
//     layers.EMPTY,
//     layers.LOW,
//     layers.NORMAL,
//     layers.OUT_OF_ORDER
//   ]
// });

// // Add our 'lightmap' tile layer to the map
// lightmap.addTo(myMap);

// // Create an overlays object to add to the layer control
// var overlays = {
//   "Coming Soon": layers.COMING_SOON,
//   "Empty Stations": layers.EMPTY,
//   "Low Stations": layers.LOW,
//   "Healthy Stations": layers.NORMAL,
//   "Out of Order": layers.OUT_OF_ORDER
// };

// // Create a control for our layers, add our overlay layers to it
// L.control.layers(null, overlays).addTo(myMap);

// // Create a legend to display information about our map
// var info = L.control({
//   position: "bottomright"
// });

// // When the layer control is added, insert a div with the class of "legend"
// info.onAdd = function() {
//   var div = L.DomUtil.create("div", "legend");
//   return div;
// };
// // Add the info legend to the map
// info.addTo(myMap)});
});