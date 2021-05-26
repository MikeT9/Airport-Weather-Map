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

    marker.on('click', buildMetadata);

    markers.push(marker)

  }
  createMap(markers);

});
