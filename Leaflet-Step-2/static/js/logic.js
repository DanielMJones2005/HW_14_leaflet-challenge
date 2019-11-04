//Links/api================================================================================================
// Store our API endpoint inside queryUrl
var queryEqUrl_Mo = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"; 
var queryEqUrl_7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
var queryEqUrl_1day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
var queryEqUrl_1hr = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

var queryUrlGeo = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
 

//Base Maps ===============================================================================================
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

var baseMaps = {
    "Satellite": satmap,
    "Grayscale": graymap,
    "Outdoors": outmap
};



//OverlayMaps===============================================================================================

//Set Up empty L.LayerGroups=========================================================================================

let faultLines = new L.LayerGroup();

let eqPastMo = new L.LayerGroup();
let eq7Days = new L.LayerGroup();
let eq1Day = new L.LayerGroup();
let eq1Hr = new L.LayerGroup();


//Create Overlay Maps==================================================================================================
// Create an overlay object
var overlayMaps = {
  "Fault Lines": faultLines,
  "Earthquakes: Past Month": eqPastMo,
  "Earthquakes: Past 7 Days": eq7Days,
  "Earthquakes: Past Day": eq1Day,
  "Earthquakes: Past Hour": eq1Hr
};


// Define a map object
var myMap = L.map("map", {
  center: [15.5994, -28.6731],
   zoom: 2.5,
   layers: [satmap, eqPastMo, faultLines] 
});


// Pass our map layers into our layer control
 // Add the layer control to the map
 L.control.layers(baseMaps, overlayMaps, ({
   collapsed: false
})).addTo(myMap);



//==========================Earthquake: Past Month ==========================================================
d3.json(queryEqUrl_Mo, function (eqMoData){
  let EqUrl_MoData = eqMoData.features;
  
  // Give each feature a popup describing the place and time of the earthquake
     function onEachFeature(feature, layer) {
       layer.bindPopup("<h3>" + feature.properties.place +
         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
         +"<p>"+ "Mag: " + (feature.properties.mag) + "</p>"
         );
     }
  

  L.geoJson(eqMoData, {
    style: function(feature) {
      let mag = feature.properties.mag;
      let color = "";
      if (mag <= 2.54) {
        color = "yellow";
        radius = mag * 1;
        }
      else if (mag <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = mag * 2;
        }
      else if (mag <= 6.04) {
        color = "green";
        radius = mag * 3;
        }
      else if (mag <= 6.94) {
        color = "orange";
        radius = mag * 4;
        }
      else if (mag <= 7.94) {
        color = "brown";
        radius = mag * 5;
        }
      else {
        color = "red";
        radius = mag * 6;
        }  

      return {
        color: color,
        radius: radius
      };
    },
    
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
        fillOpacity: 0.5
        } 
      );
    },
    onEachFeature: onEachFeature,
  }).addTo(eqPastMo);
})




//==========================Earthquake: Past 7 Days ==========================================================
d3.json(queryEqUrl_7days, function (d7){
  let Eq7DaysData = d7.features;
  
  // Give each feature a popup describing the place and time of the earthquake
     function onEachFeature(feature, layer) {
       layer.bindPopup("<h3>" + feature.properties.place +
         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
         +"<p>"+ "Mag: " + (feature.properties.mag) + "</p>"
         );
     }
  
  L.geoJson(d7, {
    style: function(feature) {
      let mag = feature.properties.mag;
      let color = "";
      if (mag <= 2.54) {
        color = "yellow";
        radius = mag * 1;
        }
      else if (mag <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = mag * 2;
        }
      else if (mag <= 6.04) {
        color = "green";
        radius = mag * 3;
        }
      else if (mag <= 6.94) {
        color = "orange";
        radius = mag * 4;
        }
      else if (mag <= 7.94) {
        color = "brown";
        radius = mag * 5;
        }
      else {
        color = "red";
         radius = mag * 6;
        }  

      return {
       color: color,
       radius: radius
      };
    },
  
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        fillOpacity: 0.5
        } 
    );
    },
    onEachFeature: onEachFeature,
  }).addTo(eq7Days);

})

//==========================Earthquake: Past Day ==========================================================
d3.json(queryEqUrl_1day, function (d1){
  let EqDayData = d1.features;
  
  // Give each feature a popup describing the place and time of the earthquake
     function onEachFeature(feature, layer) {
       layer.bindPopup("<h3>" + feature.properties.place +
         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
         +"<p>"+ "Mag: " + (feature.properties.mag) + "</p>"
         );
     }
  
  L.geoJson(d1, {
   style: function(feature) {
      let mag = feature.properties.mag;
      let color = "";
      if (mag <= 2.54) {
        color = "yellow";
        radius = mag * 1;
        }
      else if (mag <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = mag * 2;
        }
      else if (mag <= 6.04) {
        color = "green";
        radius = mag * 3;
        }
      else if (mag <= 6.94) {
        color = "orange";
        radius = mag * 4;
        }
     else if (mag <= 7.94) {
        color = "brown";
        radius = mag * 5;
        }
     else {
        color = "red";
        radius = mag * 6;
       }  

     return {
       color: color,
       radius: radius
     };
   },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        fillOpacity: 0.5
        } 
      );
    },
    onEachFeature: onEachFeature,
  }).addTo(eq1Day);
})
//==========================Earthquake: Past Hour ==========================================================
d3.json(queryEqUrl_1hr, function (dHr){
  let EqHrData = dHr.features;
  
  // Give each feature a popup describing the place and time of the earthquake
     function onEachFeature(feature, layer) {
       layer.bindPopup("<h3>" + feature.properties.place +
         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
         +"<p>"+ "Mag: " + (feature.properties.mag) + "</p>"
         );
     }

  L.geoJson(dHr, {
    style: function(feature) {
      let mag = feature.properties.mag;
      let color = "";
      if (mag <= 2.54) {
        color = "yellow";
         radius = mag * 1;
         }
       else if (mag <= 5.44) {
         color = "rgb(179, 255, 0)";
         radius = mag * 2;
         }
       else if (mag <= 6.04) {
         color = "green";
         radius = mag * 3;
         }
       else if (mag <= 6.94) {
         color = "orange";
         radius = mag * 4;
         }
      else if (mag <= 7.94) {
         color = "brown";
         radius = mag * 5;
         }
      else {
         color = "red";
         radius = mag * 6;
       }  

     return {
        color: color,
        radius: radius
      };
   },

    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        fillOpacity: 0.5
        } 
      );
    },
    onEachFeature: onEachFeature,
  }).addTo(eq1Hr);

})

//==========================Faultlines==========================================================
d3.json(queryUrlGeo, function (faultData){
  L.geoJSON(faultData, {
    style: function () {
      return {color: "red", weight: 5, opacity: .45
             }
    }
  }).addTo(faultLines)});

// Legend ==================================================================================================
function getColor(d) {

 return d < 2.5 ? "yellow" :
        d < 5.4 ? "rgb(179, 255, 0)" :
        d < 6.0 ? "green" :
        d < 6.9 ? "orange" :
        d < 7.9 ? "brown" :
        d < 8.0 ? "red" :
                     "red";
};


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



//================================================================================================================
//============================================The End=============================================================
//================================================================================================================


