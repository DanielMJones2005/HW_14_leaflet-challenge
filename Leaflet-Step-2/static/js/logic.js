var earthquakeMarkers = []


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"; 
console.log(queryUrl);

d3.json(queryUrl, function(d) {
  let data = d.features;
   console.log(data);
 
   for (var i = 0; i < data.length; i++) {

     let color = "";
     if (data[i].properties["mag"]<= 2.54) {
       color = "yellow";
       radius = data[i].properties["mag"] * 1;
       }
     else if (data[i].properties["mag"] <= 5.44) {
       color = "rgb(179, 255, 0)";
       radius = data[i].properties["mag"] * 2;
       }
     else if (data[i].properties["mag"] <= 6.04) {
       color = "green";
       radius = data[i].properties["mag"] * 3;
       }
     else if (data[i].properties["mag"] <= 6.94) {
       color = "orange";
       radius = data[i].properties["mag"] * 4;
       }
     else if (data[i].properties["mag"] <= 7.94) {
       color = "brown";
       radius = data[i].properties["mag"] * 5;
       }
     else {
       color = "red";
       radius = data[i].properties["mag"] * 6;
       }



     // Add circles to map
  earthquakeMarkers.push(
    L.circleMarker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], {
      fillOpacity: 0.50,
      color: color,
      fillColor: color,
      // Adjust radius
      radius: radius
      }).bindPopup("<h3>Place: " + data[i].properties["place"] + "</h3> <hr> <h3>Mag: " + data[i].properties["mag"] + "</h3>").addTo(myMap)
  )}
 });



var satmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.satellite",
   accessToken: API_KEY
});

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.light",
   accessToken: API_KEY
});

var outmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
   maxZoom: 18,
   id: "mapbox.outdoors",
   accessToken: API_KEY
});












function getColor(d) {

 	return d < 2.5 ? "yellow" :
         d < 5.4 ? "rgb(179, 255, 0)" :
         d < 6.0 ? "green" :
         d < 6.9 ? "orange" :
         d < 7.9 ? "brown" :
         d < 8.0 ? "red" :
                     "red";
};


// // Group layers as overlay pane


// Create two separate layer groups: one for cities and one for states
var quakes = L.layerGroup(earthquakeMarkers);

// Create a baseMaps object
var baseMaps = {
  "Satellite": satmap,
  "Grayscale": graymap,
  "Outdoors": outmap
};

// Create an overlay object
var overlayMaps = {
  "Earthquaks": quakes
};


// Define a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
  zoom: 2.5,
  layers: [satmap, quakes]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
 	var div = L.DomUtil.create('div', 'info legend'),
 		grades = [0, 2.5, 5.4, 6.0, 6.9, 7.9, 8],
 		labels = [];

// loop through our density intervals and generate a label with a colored square for each interval
 	for (var i = 0; i < grades.length; i++) {
 		div.innerHTML +=
 			'<i style="background:' + getColor(grades[i] + .5) + '"></i> ' +
 			grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

 	return div;
 };

 legend.addTo(myMap);


 