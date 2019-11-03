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
  

    for (var i = 0; i < EqUrl_MoData.length; i++) {
      let color = "";
       if (EqUrl_MoData[i].properties["mag"]<= 2.54) {
        color = "yellow";
        radius = EqUrl_MoData[i].properties["mag"] * 1;
        }
       else if (EqUrl_MoData[i].properties["mag"] <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = EqUrl_MoData[i].properties["mag"] * 2;
        }
       else if (EqUrl_MoData[i].properties["mag"] <= 6.04) {
        color = "green";
        radius = EqUrl_MoData[i].properties["mag"] * 3;
        }
       else if (EqUrl_MoData[i].properties["mag"] <= 6.94) {
        color = "orange";
        radius = EqUrl_MoData[i].properties["mag"] * 4;
        }
       else if (EqUrl_MoData[i].properties["mag"] <= 7.94) {
        color = "brown";
        radius = EqUrl_MoData[i].properties["mag"] * 5;
        }
       else {
        color = "red";
        radius = EqUrl_MoData[i].properties["mag"] * 6;
        }  


  var geojsonMoDataOptions = {
    radius: radius,
    fillColor: color,
    color: color,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  };}


  L.geoJson(eqMoData, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonMoDataOptions);
    },
    onEachFeature: onEachFeature
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
  

    for (var i = 0; i < Eq7DaysData.length; i++) {
      let color = "";
       if (Eq7DaysData[i].properties["mag"]<= 2.54) {
        color = "yellow";
        radius = Eq7DaysData[i].properties["mag"] * 1;
        }
       else if (Eq7DaysData[i].properties["mag"] <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = Eq7DaysData[i].properties["mag"] * 2;
        }
       else if (Eq7DaysData[i].properties["mag"] <= 6.04) {
        color = "green";
        radius = Eq7DaysData[i].properties["mag"] * 3;
        }
       else if (Eq7DaysData[i].properties["mag"] <= 6.94) {
        color = "orange";
        radius = Eq7DaysData[i].properties["mag"] * 4;
        }
       else if (Eq7DaysData[i].properties["mag"] <= 7.94) {
        color = "brown";
        radius = Eq7DaysData[i].properties["mag"] * 5;
        }
       else {
        color = "red";
        radius = Eq7DaysData[i].properties["mag"] * 6;
        }  


  var geojson7DaysDataOptions = {
    radius: radius,
    fillColor: color,
    color: color,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  };}


  L.geoJson(d7, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojson7DaysDataOptions);
    },
    onEachFeature: onEachFeature
  }).addTo(eq7Days);

})



//==========================Earthquake: Past Day ==========================================================
 
//queryEqUrl_1hr


//eq1Hr


d3.json(queryEqUrl_1day, function (d1){
  let EqDayData = d1.features;
  
  // Give each feature a popup describing the place and time of the earthquake
     function onEachFeature(feature, layer) {
       layer.bindPopup("<h3>" + feature.properties.place +
         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>"
         +"<p>"+ "Mag: " + (feature.properties.mag) + "</p>"
         );
     }
  

    for (var i = 0; i < EqDayData.length; i++) {
      let color = "";
       if (EqDayData[i].properties["mag"]<= 2.54) {
        color = "yellow";
        radius = EqDayData[i].properties["mag"] * 1;
        }
       else if (EqDayData[i].properties["mag"] <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = EqDayData[i].properties["mag"] * 2;
        }
       else if (EqDayData[i].properties["mag"] <= 6.04) {
        color = "green";
        radius = EqDayData[i].properties["mag"] * 3;
        }
       else if (EqDayData[i].properties["mag"] <= 6.94) {
        color = "orange";
        radius = EqDayData[i].properties["mag"] * 4;
        }
       else if (EqDayData[i].properties["mag"] <= 7.94) {
        color = "brown";
        radius = EqDayData[i].properties["mag"] * 5;
        }
       else {
        color = "red";
        radius = EqDayData[i].properties["mag"] * 6;
        }  


  var geojson1DayDataOptions = {
    radius: radius,
    fillColor: color,
    color: color,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  };}


  L.geoJson(d1, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojson1DayDataOptions);
    },
    onEachFeature: onEachFeature
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
  

    for (var i = 0; i < EqHrData.length; i++) {
      let color = "";
       if (EqHrData[i].properties["mag"]<= 2.54) {
        color = "yellow";
        radius = EqHrData[i].properties["mag"] * 1;
        }
       else if (EqHrData[i].properties["mag"] <= 5.44) {
        color = "rgb(179, 255, 0)";
        radius = EqHrData[i].properties["mag"] * 2;
        }
       else if (EqHrData[i].properties["mag"] <= 6.04) {
        color = "green";
        radius = EqHrData[i].properties["mag"] * 3;
        }
       else if (EqHrData[i].properties["mag"] <= 6.94) {
        color = "orange";
        radius = EqHrData[i].properties["mag"] * 4;
        }
       else if (EqHrData[i].properties["mag"] <= 7.94) {
        color = "brown";
        radius = EqHrData[i].properties["mag"] * 5;
        }
       else {
        color = "red";
        radius = EqHrData[i].properties["mag"] * 6;
        }  


  var geojsonHrDataOptions = {
    radius: radius,
    fillColor: color,
    color: color,
    weight: 1,
    opacity: 1,
    fillOpacity: 0.5
  };}


  L.geoJson(dHr, {
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, geojsonHrDataOptions);
    },
    onEachFeature: onEachFeature
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


