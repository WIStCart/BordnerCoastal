# BordnerCoastal
Collaborative project between Forest Landscape and Ecology Lab (FLEL) and State Cartographer's Office (SCO). Web-based mapping application featuring point, line, and polygon data digitized from the Wisconsin Land Economic Inventory (a.k.a. "Bordner" survey maps) for Wisconsin's coastal counties.

### Data updates
Here are the general steps to updating the Bordner data in CARTO:
1) We have received updates from FLEL in the past - the data has been prepared for integration completely, so no processing needed on our end except anything mentioned here. Save the data to: Z:\PROJECTS\Bordner_Coastal_Grant\ this is where past data has been prepped. Use the naming syntax XX_Bordner_Update_MMDDYY. Follow along with the Folder numbers within the direcotry here for example purposes: Z:\PROJECTS\Bordner_Coastal_Grant\01_App_Data_Updates\01_Bordner_Update_040519.
2) Folder "01" export each of the 3 feature classes to .shp, titled:
- ```final_coastal_polygonsMMDDYY```
- ```final_coastal_linesMMDDYY```
- ```final_coastal_pointsMMDDYY```
3) Login to CARTO using the SCO account (see login instructions in keys). Ensure that the schemas of the new .shps match that of their matching tables in CARTO. When comparing schemas, note the following:
- CARTO tables will automatically set all fieldnames to lowercase (so no need to worry about case differences)
- There may be extra fields in the new data - it is ok to delete them or keep them.
4) Zip each of the shapefiles, and upload each to CARTO. 
5) ```final_coastal_points```, ```final_costal_polygons```, ```final_coastal_lines``` are the three live feature tables in CARTO. Archive the ones being updated by appending old + datestamp (e.g. "_old_040519"). NOTE THAT THIS WILL BREAKE THE APP FOR A SHORT WHILE WHILE YOU SWAP THINGS OUT.
6) In CARTO, rename these tables and make them public.
- ```final_coastal_polygonsMMDDYY```
- ```final_coastal_linesMMDDYY```
- ```final_coastal_pointsMMDDYY```

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
