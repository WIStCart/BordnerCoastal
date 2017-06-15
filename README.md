# BordnerCoastal
Collaborative project between Forest Landscape and Ecology Lab (FLEL) and State Cartographer's Office (SCO). Web-based mapping application featuring point, line, and polygon data digitized from the Wisconsin Land Economic Inventory (a.k.a. "Bordner" survey maps) for Wisconsin's coastal counties.


### Browser API
The application has a number of URL parameters that allow users to programmatically create map configurations. At the current time, the options include:

**Basemap Configuration**
- ```basemap```: Change the basemap on the map. Available options are ```streets```, ```satellite```, ```historic```. Defaults to ```streets```.

**Overlay Configuration**
- ```showLabels```: Show place name labels on the map. Accepts Boolean values. Default to ```False```.
- ```showCounties```: Show county boundaries and labels on the map. Accepts Boolean values. Defaults to ```False```.
- ```showPLSS```: Show township and section boundaries and labels on the map. Accepts Boolean value. Defaults to ```False```.
- ```showDensity```: Show an overlay of the density of the Class 1 land cover values. Accepts Boolean value. Defaults to ```False```.

**Feature Configuration**
- ```featureType```: Change the feature type displayed on the map. Available options are ```points```, ```polygons```, ```lines```. Defaults to ```polygons```.
- ```lineFilter```:  Filter to a specific line type. Only applies if the ```featureType``` has been supplied and set to ```lines```. Available values are the complete set of line codes in the Bordner dataset.
- ```pointFilter```: Filter to a specific point type. Only applies if the ```featureType``` has been supplied and set to ```points```. Available values are the complete set of point codes in the Bordner dataset.
- ```polygonFilter```: Filter to a specific land cover type. Only applies if the ```featureType``` has been supplied and set to ```polygons```. Available values are the complete set of *Level 1* codes in the Bordner dataset, with underscores substituted for spaces. Specifically:
```
  ["agriculture", "barren", "developed", "forest_disturbance", "lowland_coniferous_forest", "lowland_deciduous_forest", "open", "other", "unknown_forest", "upland_coniferous_forest", "upland_deciduous_forest", "upland_mixed_forest", "water", "wetlands"]
```

**Map View Configuration**
- ```latitude```: Set the latitude of the center of the map. Accepts floating point values. Defaults to ```43.7844```.
- ```longitude```: Set the longitude of the center of the map. Accepts floating point values. Defaults to ```-88.7879```.
- ```zoom```: Set the zoom level of the map. Accepts integer numeric values between 6 and 21. Defaults to ```7```.

**Misc. Configuration**:
- ```showInfo```: Show an information box when hovering over features. Accepts Boolean values. Defaults to ```True```.
- ```histogramScale```: Specify the type of axis on which to plot the relative frequency of the area values in the current map view at high zoom levels. Accepts values ```log``` and ```linear```. ```log``` plots the values on a logarithmic (base 10) scale. ```linear``` plots the values against a linear scale. Defaults to ```linear```.
- ```overlayOpacity```: Specify the opacity of the Bordner (points, lines, and polygons) layers. Accepts integer values between zero and 100. Defaults to ```65```. 
