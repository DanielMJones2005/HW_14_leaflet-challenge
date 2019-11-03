# HW14 Leaflet Challenge
## Leaflet Homework - Visualizing Data with Leaflet

![alt text](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/blob/master/img/1-Logo.png)

## Files
* [Leaflet-Step-1](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1)
    * [static](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1/static)
      *[css](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1/static/css)
        *style.css
      *[js](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-1/static/js)
        *logic.js
    * .gitignore
    * index.html
* [Leaflet-Step-2](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2)
     * [static](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2/static)
      *[css](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2/static/css)
        *style.css
      *[js](https://github.com/DanielMJones2005/HW_14_leaflet-challenge/tree/master/Leaflet-Step-2/static/js)
        *logic.js
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
useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!
- The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. 
They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. 
Their hope is that being able to visualize their data will allow them to better educate the public and other government 
organizations (and hopefully secure more funding..) on issues facing our planet.

# Task

## Level 1: Basic Visualization
- Visualize an earthquake data set
- Get data set
  - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the 
  USGS GeoJSON Feed page and pick a data set to visualize. When you click on a data set, for example 
  'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. 
  You will be using the URL of this JSON to pull in the data for our visualization.
- Import & Visualize the Data
  - Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
  - Your data markers should reflect the magnitude of the earthquake in their size and color. Earthquakes with higher magnitudes 
  should appear larger and darker in color
  - Include popups that provide additional information about the earthquake when a marker is clicked.
  - Create a legend that will provide context for your map data.

## Level 2: More Data (Optional)
- The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates 
and seismic activity. You will need to pull in a second data set and visualize it along side your original set of 
data. Data on tectonic plates can be found at https://github.com/fraxen/tectonicplates.
- In this step we are going to.
  - Plot a second data set on our map.
  - Add a number of base maps to choose from as well as separate out our two different data sets into overlays that 
  can be turned on and off independently.
  - Add layer controls to our map.

