TODO:
1) Create overlays of townships, counties (and perhaps include the year of survey commencement on the counties somehow?)
	- We may want to do this through CARTO instead of having to tile up a whole custom layer? 
2) Search: for now we can target a conventional geocoder search (addresses, places). This was voiced to be a low priority for now.
3) Include a transparency slider that allows the user to control the opacity of the bordner layer (it was not determined where this should go or what it should look like, so feel free to brainstorm)
4) Include descriptive attribute names for all attributes within the popup window (this will require a scrollbar). We want to use user friendly field names (i.e. "Density of Coverage 1" instead of "den1")
5) CS: *DONE* Remove tooltips
6) Make the upper right infobox be dockable (undeterined if this should only display "cov1" or more attributes). We could consider removing it also. 
7) Create a neatline at the bottom of the legend (to make it look like the legend doesnt sprout from your taskbar)
8) Remove the gray transparent ribbon behind the legend labels, it distorts the legend colors.
9) Make the legend selector be a leaflet control button that pops out upon click. This will free the entire bottom up for the legend. **I think we might need to keep the point, line, poly toggle within the legend though.   
10) Include "density1" as another layer that is mutually exclusive of the "cov1" layer. I'm not sure that this is expected/is low priority at this point.
11) Implement an accordion effect for legend transition from level1 to level2 and vice versa. Do not ever remove the level1 bars, instead, squish them down to make room for the level2 classes of the selected level1.  

BUGS:
1) CS: Troubleshoot issues with level1/level2 toggle via legend (the legend occasionally gets stuck on one or the other). 
2) Any latency should be considered - refactoring may be required - we also will need to think about what to do when user is viewing below level 13.
3) ...