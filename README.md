# BordnerCoastal
Collaborative project between Forest Landscape and Ecology Lab (FLEL) and State Cartographer's Office (SCO). Web-based mapping application featuring point, line, and polygon data digitized from the Wisconsin Land Economic Inventory (a.k.a. "Bordner" survey maps) for Wisconsin's coastal counties.

### Data updates
Here are the general steps to updating the polygon classification schema in JavaScript:
1) The classification of the polygons is configured within the *temp_classes.js* file within the ```tempclasses2``` variable that holds a JSON formatted data for each class' attribute/configuration:
  - code (pairs with GIS data), 
  - name (display name in popup that appears on click of map feature) 
  - level1 (display name in legend and legend page),
  - level2 (display name in legend and legend page), 
  - color1 (hex for class1), 
  - color2 (hex for class1), 
  - class (used for variablizing elements dynamically). 

  A change to this file will impact; 
  - 1) the map classification/style
  - 2) the legend (levels 1 and 2)
  - 3) the Bordner legend page (on page https://dev.sco.wisc.edu/bordnercoastal/codie/BordnerCoastal/about/)

2) To begin an update, examine what exists in the .xlsx that was used for the last update (file:///Z:\PROJECTS\Bordner_Coastal_Grant\01_App_Data_Updates\03_Schema_Update_040519\frequency_2019.xlsx)
3) Like was done within the above.xlsx on the V1_Schema_for_VLOOKUP tab, parse the tempClasses2 json into columns and then use the "code" attribut eto erform a VLOOKUP to the new data (we want to preserve the existing hex colors as best as possible)
4) recreate the contcatentation as seen in update tab, column L.
5) copy the concatenated data into the JSON within temp_classes.js
**** Make sure to keep the UNSURVEYED element!!****
```{"code":"UNSURVEYED","name":"Unsurveyed Area","level2":"Unsurveyed Area","level1":"Unsurveyed Area","class":"Unsurveyed Area","color1":"#e0d46b","color2":"#e0d46b"}```
*Note that level1 or level2 should never contain . or , (periods or commas). 
  
Here are the general steps to updating the Bordner data in CARTO:
1) Updates from FLEL in the past have been prepared for integration - no processing needed on our end except anything mentioned here.
- Save the data to: Z:\PROJECTS\Bordner_Coastal_Grant\ (this is where past data has been prepped). Use the naming syntax XX_Bordner_Update_MMDDYY. Follow along with the Folder numbers within the direcotry here for example purposes: Z:\PROJECTS\Bordner_Coastal_Grant\01_App_Data_Updates\01_Bordner_Update_040519.
2) Folder "01" export each of the 3 feature classes to .shp, titled in a similar manner to this:
- ```final_coastal_linesMMDDYY``` *The 040519 update to lines worked (size was not an issue)
- ```final_coastal_pointsMMDDYY``` *The 040519 update to points worked (size was not an issue)
- ```final_coastal_polygonsMMDDYY``` *The polygon layer will be too big for CARTO to handle. Thus, there are some other steps that need to be done to this layer as well. Read ahead to step 6 for a process for polys.
4) Login to CARTO using the SCO account (see login instructions in keys). Ensure that the schemas of the new .shps match that of their matching tables in CARTO. When comparing schemas, note the following:
- CARTO tables will automatically set all fieldnames to lowercase (so no need to worry about case differences)
- There may be extra fields in the new data - it is ok to delete them or keep them.
5) Zip each of the shapefiles, and upload each to CARTO. 
6) Perform/read these steps/notes for preparing polys:
- Note that the "area" field *WAS* need to but is no longer, no action needed on this item.
- You can test the schema by simply uploading a small chunk of data to CARTO before proceeding to the next steps of chunking the big dataset up.
- If the poly data's schema checks out then chunk the data into 100k segments (should be ok to use FID to query them), zip the file and load it to CARTO (use a good naming scheme. When you have a batch in CARTO, use a query like this one to merge it into an existing table (this SQL will write the new features into the "final_coastal_polygons_040819_0_100k" table). Your first upload could be 300k in size, but after that I have only had success merging 100k at a time:
  
  ```INSERT INTO final_coastal_polygons_040819_0_100k (the_geom, the_geom_webmercator, cov1, mindiam1, maxdiam1, den1, pctcov1, cov2, mindiam2, maxdiam2, den2, pctcov2, cov3, mindiam3, maxdiam3, den3, pctcov3, cov4, mindiam4, maxdiam4, den4, pctcov4, extradigit, judgementc, judgemen_1, notes, judgemen_2, judgemen_3, ha, cov5, mindiam5, maxdiam5, den5, pctcov5, shape_leng, shape_area, area)```

  ```SELECT the_geom, the_geom_webmercator, cov1, mindiam1, maxdiam1, den1, pctcov1, cov2, mindiam2, maxdiam2, den2, pctcov2, cov3, mindiam3, maxdiam3, den3, pctcov3, cov4, mindiam4, maxdiam4, den4, pctcov4, extradigit, judgementc, judgemen_1, notes, judgemen_2, judgemen_3, ha, cov5, mindiam5, maxdiam5, den5, pctcov5, shape_leng, shape_area, area FROM final_coastal_polygons_040819_100_200k```

- Note, you'll want to explicitly handle the field names, as done in the sample above (there may be a more precise way) trying to write the cartodb_id into another table will throw an error so that is the reason the "\*" astirix/wildcard isnt used above.

- Also, 100,000 record chunks may be too big - if you get an error when doing the merge, split the 100,000 chunk in two and try in 2 pieces.

- This query will return the number of records in a table:
  ```SELECT count(*) AS exact_count FROM final_coastal_polygons```
  
- It may be desireable to do it this way - to do the merge on segments using larger .zip data uploads (but be careful!! .shp may become corrupted even before the 2gb limitation is reached - this has happened in the past):

  ```INSERT INTO final_coastal_polygons_040819_0_100k (the_geom, the_geom_webmercator, cov1, mindiam1, maxdiam1, den1, pctcov1, cov2, mindiam2, maxdiam2, den2, pctcov2, cov3, mindiam3, maxdiam3, den3, pctcov3, cov4, mindiam4, maxdiam4, den4, pctcov4, extradigit, judgementc, judgemen_1, notes, judgemen_2, judgemen_3, ha, cov5, mindiam5, maxdiam5, den5, pctcov5, shape_leng, shape_area, area)  ```
  
  ```SELECT the_geom, the_geom_webmercator, cov1, mindiam1, maxdiam1, den1, pctcov1, cov2, mindiam2, maxdiam2, den2, pctcov2, cov3, mindiam3, maxdiam3, den3, pctcov3, cov4, mindiam4, maxdiam4, den4, pctcov4, extradigit, judgementc, judgemen_1, notes, judgemen_2, judgemen_3, ha, cov5, mindiam5, maxdiam5, den5, pctcov5, shape_leng, shape_area, area FROM final_coastal_polygons_040819_300_350k WHERE (cartodb_id >= 20000) AND (cartodb_id < 40000)```

- Menominee and Milwaukee (no survey performed) will likely contain a gap in the new data. We'll add menominee PLSS section polygons to the poly data as a placeholder. A formula like this one can be used to grab the sections from an older table and push them into the new table:
```INSERT INTO final_coastal_polygons (the_geom, the_geom_webmercator, cov1, mindiam1, maxdiam1, den1, pctcov1, cov2, mindiam2, maxdiam2, den2, pctcov2, cov3, mindiam3, maxdiam3, den3, pctcov3, cov4, mindiam4, maxdiam4, den4, pctcov4, judgementc, judgemen_1, notes, judgemen_2, judgemen_3, cov5, mindiam5, maxdiam5, den5, pctcov5, shape_leng, shape_area)```

SELECT the_geom, the_geom_webmercator, cov1, mindiam1, maxdiam1, den1, pctcov1, cov2, mindiam2, maxdiam2, den2, pctcov2, cov3, mindiam3, maxdiam3, den3, pctcov3, cov4, mindiam4, maxdiam4, den4, pctcov4, judgementc, judgemen_1, notes, judgemen_2, judgemen_3, cov5, mindiam5, maxdiam5, den5, pctcov5, shape_leng, shape_area FROM final_coastal_polygons_old_2019 WHERE cov1 = 'UNSURVEYED'


7) ```final_coastal_points```, ```final_costal_polygons```, ```final_coastal_lines``` are the three live feature tables in CARTO. Archive the ones being updated by appending old + datestamp (e.g. "_old_040519"). NOTE THAT THIS WILL BREAKE THE APP FOR A SHORT WHILE WHILE YOU SWAP THINGS OUT.
8) In CARTO, rename these tables and make them public.
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
