# HW14 Leaflet Challenge
## Leaflet Homework - Visualizing Data with Leaflet

![alt text](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/blob/master/img/1-Logo.png)

## Files
* [Leaflet-Step-1](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1)
    * [static](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1/static)
      * [css](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1/static/css)
        * style.css
      * [js](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1/static/js)
        * logic.js
    * .gitignore
    * index.html
* [Leaflet-Step-2](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2)
     * [static](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2/static)
       * [css](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2/static/css)
         * style.css
       * [js](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2/static/js)
         * logic.js
    * .gitignore
    * index.html
* [img](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/img)
    * 1-Logo.png
    * 2-BasicMap.png
    * 3-Data.png
    * 4-JSON.png
    * 5-Advanced.png
    * 6-Time_Keeps_On_Ticking.gif
    * Cluster.png
    * Heat.png
   
## Background
- Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing 
scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of 
climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and 
useful information about the Earth and its processes. 
- The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. 
They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. 
Their hope is that being able to visualize their data will allow them to better educate the public and other government 
organizations (and hopefully secure more funding..) on issues facing our planet.

# Task

## Level 1: Basic Visualization
- Visualize an earthquake data set
- Get data set
  - The USGS provides earthquake data in a number of different formats, updated every 5 minutes 
    - Used the past 30 days data/URL
- Import & Visualize the Data
  - Created a map using Leaflet that plots all of the earthquakes from the data set based on their longitude and latitude
  - Data markers reflect the magnitude of the earthquake in their size and color
    - Earthquakes with higher magnitudes appear larger and used different colors for different magnitudes
  - Included popups that provide additional information about the earthquake when a marker is clicked
    - Popup report place and magnitude of earthquake
  - Created a legend that will provides context for map data related to each earthquake's magnitude

## Level 2: More Data (Optional)
- The USGS wants to plot a second data set on a map to illustrate the relationship between tectonic plates 
and seismic activity. 
- Pulled in data on tectonic plates
  - Source: https://github.com/fraxen/tectonicplates
- Import & Visualize the Data
  - Same information as in Level 1 in addition to 
  - Visualization of data on tectonic plates
  - Added base maps to choose from
  - Added layer controls to the map
    - Separated out earthquakes data sets and fault lines into overlays that can be turned on and off independently
      - Base Layers
        - Mapbox Satellite
        - Mapbox Light
        - Mapbox Outdoors
      - Overlay Maps
        - Fault lines
        - Past Month
        - Past 7 Days 
        - Past Day
        - Past Hour
        
        - 

