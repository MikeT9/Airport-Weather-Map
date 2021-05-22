// Define streetmap and darkmap layers
function createMap(markers) {

  // Add all the cityMarkers to a new layer group.
// Now we can handle them as one group instead of referencing each individually
  var airportLayer = L.layerGroup(markers);

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
  });

  var precip = L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    // z: 10,
    // x:41,
    // y:-87,
    layer : "precipitation_new",
    // area : worldwide,
    accessToken: wx_key
  });

  var clouds = L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    // z: 10,
    // x:41,
    // y:-87,
    layer : "clouds_new",
    // area : worldwide,
    accessToken: wx_key
  });

  var temp = L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    // z: 10,
    // x:41,
    // y:-87,
    layer : "temp_new",
    // area : worldwide,
    accessToken: wx_key
  });

  var winds = L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    // z: 10,
    // x:41,
    // y:-87,
    layer : "wind_new",
    // area : worldwide,
    accessToken: wx_key
  });

  var pres = L.tileLayer("https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid={accessToken}", {
    // attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    // z: 10,
    // x:41,
    // y:-87,
    layer : "pressure_new",
    // area : worldwide,
    accessToken: wx_key
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap,
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Airports: airportLayer,
    Precipitation: precip,
    Clouds: clouds,
    Temperature: temp,
    Wind: winds,
    Pressure: pres
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, airportLayer]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}

function buildMetadata(e) {
  // console.log(e)

  // console.log(e.latlng)

  //ajax request
  $.ajax({
    type: 'GET',
    url: `/currentweather/${e.latlng.lat}/${e.latlng.lng}`,
    dataType: "text",
    success: function (data) {
      //  on success build panels
      console.log(data);
      
    }
  });
  $.ajax({
    type: 'GET',
    url: `/forecastweather/${e.latlng.lat}/${e.latlng.lng}`,
    dataType: "text",
    success: function (data) {
      //  on success build panels
      console.log(data);
      
    }
  });
    
}

d3.csv("static/data/airports.csv").then(function (response) {
  // Create a new marker cluster group
  var markers = [];

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    marker = L.circleMarker([response[i].LATITUDE, response[i].LONGITUDE])
    marker.bindPopup(response[i].AIRPORT); //Add weather here

    // markers.on('mouseover', function (e) {
    //   d3.csv("static/data/airports.csv").then(function (response) {
    //     console.log(e)
    //     var popup = L.popup(e)
    //       .setLatLng(e.latlng)
    //       .setContent(e.layer)
    //       .openOn(myMap);
    //   });
    // });

    marker.on('click', buildMetadata);

    markers.push(marker)

    // Add a new marker to the cluster group and bind a pop-up
    //markers.addLayer(L.marker([response[i].LATITUDE, response[i].LONGITUDE]),
    // Binding a pop-up to our marker
  }
  createMap(markers);
  // Add our marker cluster layer to the map




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
