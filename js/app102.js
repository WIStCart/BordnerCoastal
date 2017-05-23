//Global vars:
var desktopMode = true;
var level1Classes = {}
var cov1Classes = {}
var totalFeatures = 0
var map;
var sql = new cartodb.SQL({ user: 'sco-admin' });
var currentBasemap;
var bordner;
var classConfigs = {};
var level1Membership = {};
var levelEngaged = "1";
var level1Selected = "agriculture"
var sublayer1;
var sublayer2;
var layerOpacity = {polygons:0.65};

var infowindowVars = ['cov1','cov2', 'cov3', 'cov4', 'cov5',
					'den1', 'den2', 'den3', 'den4', 'den5',
					'pctcov1', 'pctcov2', 'pctcov3', 'pctcov4', 'pctcov5',
					'mindiam1','mindiam2','mindiam3','mindiam4','mindiam5',
					 'maxdiam1','maxdiam2','maxdiam3','maxdiam4','maxdiam5' ]

// Overlay definitions:
var overlay1 = L.tileLayer('http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png', {
	attribution: 'stamen toner labels'
});

var overlay2 = L.tileLayer('http://{s}.tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
	maxZoom: 15,
	opacity: 1,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});

var overlay3 = 	L.tileLayer('http://maps.sco.wisc.edu/V1/bordner/03_WHAI_Tiles/00_Demo_Kewaunee/{z}/{x}/{y}.png', {
	opacity: 0.4,
	attribution: 'WHAI Finder'
});

// Basemap definitions:
var basemapA = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
});

var basemapB =  L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

/*var basemapC = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});*/

var basemapC = L.tileLayer('https://tiles{s}.arcgis.com/tiles/n6uYoouQZW75n5WI/arcgis/rest/services/V2_RasterParcelOnly_2_20160929/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'V2 Statewide Parcels',
	subdomains: '123'
});

// Create CartoCSS
function getPolyStyle(level, level1Selected){
	classes = tempClasses2.classes;

	//Beginning part of the cartocss style
	style = "#layer{polygon-fill: #DDDDDD;polygon-opacity:1;";
	console.log()
	if (level =="level1"){
		for(var i = 0; i < classes.length; i++) {
			var thisStyle = "[cov1='"+classes[i].code+"']{polygon-fill: "+classes[i].color1+";}";
			style += thisStyle;
		}
	}else{
		style = "#layer{polygon-fill: #DDDDDD;polygon-opacity: 0;";
		for(var i = 0; i < classes.length; i++) {
			if (level1Selected == classes[i].level1var) {
				var thisStyle = "[cov1='"+classes[i].code+"']{polygon-fill: "+classes[i].color2+";polygon-opacity:1;}";
				style += thisStyle;
			}
		}
	}
	style += "}";
	return style;
};

// Create a hex dictionary for with cov1 as key (for easy access)
function createStyles(){
	classes = tempClasses2.classes;
	for(var i = 0; i < classes.length; i++) {
		classes[i].level1var = makeVariableFromString(classes[i].level1)
		classes[i].level2var = makeVariableFromString(classes[i].level2)
		classConfigs[classes[i].code] = classes[i]
	}
	level1Membership = _.groupBy(classes, function(classObj){
		return makeVariableFromString(classObj.level1);
	});
	console.log(level1Membership)
};

// Helper function to turn a title into a valid variable (i.e. "Lowland Coniferous Forest" to "lowland_coniferous_forest")
function makeVariableFromString(stringIn){
	var stringOut = stringIn.replace(/\s/g, "_").replace(/[(),.?]/g, "").toLowerCase(); // 1 replace whitespace with _ 2) replace (),.? with nothing 3) set to lowercase
	return stringOut
}

// Load the Carto map:
window.onload = function() {
	//Create the leaflet map
	map = L.map('map', {
		zoomControl: true,
		cartodb_logo: false,
		center: [43.7844,-88.7879],
		zoom: 7
	});
	createStyles()
	cartoCSSRules = getPolyStyle("level1");
	//console.log(cartoCSSRules)
	// Promise for the first layer
	bordner = cartodb.createLayer(map, {
      user_name: 'sco-admin',
      type: 'cartodb',
      sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_polygons',
			cartocss: cartoCSSRules,
			interactivity: ['cov1'],
			layerIndex:1
	}]
    })
	.addTo(map) // add cartodb layer and basemap to map object
	.done(function(layer) {
		layerOpacity.polygons = 0.65;
		layer.setOpacity(layerOpacity.polygons);
		setupInteraction(layer, levelEngaged);
		$('#rangeSlider').slider().on('slide', function (ev) {
			layerOpacity.polygons = this.value / 100;
			layer.setOpacity(layerOpacity.polygons);
		});		
	});
	setUpMap();
};


function lookupClassFromCode(code){
	//get the object metadata corresponding to the cover code
	theClass = _.where(tempClasses2.classes, {code: code})[0]
	return theClass
}


//utility function that handle errors for formating the infowindow content
function getNameFromCode(code){
	//get the name from a code
	try{
		covClass = lookupClassFromCode(code)
		return covClass.name
	}catch(err){
		//covClass might be undefined
		//if the code is null
		return undefined
	}
}

function getLevel1FromCode(code){
	//get the level one feature type from the cover code
	try{
		covClass = lookupClassFromCode(code);
		return covClass.level1
	}catch(err){
		return undefined
	}
}

function formatCoverageForInfowindow(content){
	//prepare the data for templating in the infowindow
	//not totally necessary but makes the template cleaner
	//essential --  get the name for the coverage type here
	infowindowContent = {
		 coverage1: {
			 code: content.data.cov1,
			 name: getNameFromCode(content.data.cov1),
			 density: content.data.den1,
			 minDiameter: content.data.mindiam1,
			 maxDiameter: content.data.maxdiam1,
			 percentCover: content.data.pctcov1
		 },
		 coverage2: {
			 code: content.data.cov2,
			 name: getNameFromCode(content.data.cov2),
			 density: content.data.den2,
			 minDiameter: content.data.mindiam2,
			 maxDiameter: content.data.maxdiam2,
			 percentCover: content.data.pctcov2
		 },
		 coverage3: {
			 code: content.data.cov3,
			 name: getNameFromCode(content.data.cov3),
			 density: content.data.den3,
			 minDiameter: content.data.mindiam3,
			 maxDiameter: content.data.maxdiam3,
			 percentCover: content.data.pctcov3
		 },
		 coverage4: {
			 code: content.data.cov3,
			 name: getNameFromCode(content.data.cov4),
			 density: content.data.den4,
			 minDiameter: content.data.mindiam4,
			 maxDiameter: content.data.maxdiam4,
			 percentCover: content.data.pctcov4
		 },
		 coverage5: {
			 code: content.data.cov5,
			 name: getNameFromCode(content.data.cov5),
			 density: content.data.den5,
			 minDiameter: content.data.mindiam5,
			 maxDiameter: content.data.maxdiam5,
			 percentCover: content.data.pctcov5
		 }
	}
	return infowindowContent
}


// set up interaction upon map load or when level1 level2 is toggled
function setupInteraction(layer, _levelEngaged){
		layer.setInteraction(true);
		window["sublayer" + _levelEngaged] = layer.getSubLayer(0);
		//sublayer1 = layer.getSubLayer(1);
		/* To print lat/long of mouseover
		layer.on('featureOver',function(e,latlng,pos,data){
		  console.log(latlng[0], latlng[1])
		});*




		/* To construct a rudimentary popup on click (check .html for #infowindow_template) */
		cdb.vis.Vis.addInfowindow(map, layer,infowindowVars,{
            'sanitizeTemplate':false
          }).model.set({
            'template' :  function(obj){
								//!! important
                //modify the object here before sending to templating engine
								//lookup the classname
								content = obj.content
								windowContent = formatCoverageForInfowindow(content)
                return _.template($('#infowindow_template').html())(windowContent);
              }
            });

		/* To display a tooltip upon mouseover of map
		var tooltip = layer.leafletMap.viz.addOverlay({
			type: 'tooltip',
			layer: layer,
			template: '<div class="cartodb-tooltip-content-wrapper"><p>{{cov1}}</p></div>',
			width: 200,
			position: 'bottom|right',
			fields: [{ cov1: 'cov1' }]
		});
		$('body').append(tooltip.render().el);
		 */

		//  console.log(layer.leafletmap)
		//
		/* To display an infobox within a leaflet control */
		var infoBox = layer.leafletMap.viz.addOverlay( {
		  type: 'infobox',
		  layer: layer,
			template: '<div class="cartodb-tooltip-content-wrapper"><p><span id="level1-set"></span></p></div>',
		  // width: 75,
		  position: 'top|right'
		});

		//render the box (no template features)
		$('body').append(infoBox.render().el);

		//manually change the popup text on mouseover
		//only way to actually manipulate the data in the mouse events
		layer.bind('featureOver', function(e, latln, pxPos, data, layer){
			level1 = getLevel1FromCode(data.cov1)
			$("#level1-set").html(level1)
		})
}

// Sets everything up after pageload and map creation are complete
function setUpMap(){
	$('input[name=featureType]').click(function(){ turnOnFeatureType(this.id) });
	$('input[name=basemapType]').click(function(){ turnOnBasemap(this.id) });
	$('input[name=overlayType]').click(function(){ turnOnOverlay(this.id) });

	// Hide point, line or poly legend as appropriate
	$("#polygonLegendHolder").addClass( "legend-holder-hidden" )
	$("#lineLegendHolder").addClass( "legend-holder-hidden" )
	$("#pointLegendHolder").addClass( "legend-holder-hidden" )

	// Explicitly set the feature type(will likely use a stateful URL parameter in the future to drive this)
	$( "#featurePolygons" ).trigger( "click" );
		// --> $("#featurePolygons").prop("checked", true);
		// --> $("#featurePoints").prop("checked", true);
		// --> $("#featureLines").prop("checked", true);

	// Explicitly set current basemap and click its radio button
	currentBasemap = basemapB;
	$( "#basemapB" ).trigger( "click" );

	// Fade-in the toc button and give it a click handler
	$("#tocButton").addClass( "toc-button-unfade" );
	$("#tocButton").click(function() { toggleTOC() });

	// Create a custom control in bottom left of map, then add html for the four buttons that will exist within this control
	map.addControl(new tabletCustomControl({position: "topleft"})); //Could also be: 'topleft', 'topright', 'bottomleft', 'bottomright'
	$(".tablet-custom-control")
		.attr("id", "tabletCustomControl")
		.html('<div data-toggle="tooltip" title="info" class="leaflet-bar leaflet-control leaflet-control-custom" id="infoButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="infoButtonIcon" class="button-icon-class glyphicon glyphicon-info-sign"></span></div></br>' +
			  '<div data-toggle="tooltip" title="share" class="leaflet-bar leaflet-control leaflet-control-custom" id="shareButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="shareButtonIcon" class="button-icon-class glyphicon glyphicon-share-alt"></span></div></br>' +
			  '<div data-toggle="tooltip" title="legend" class="leaflet-bar leaflet-control leaflet-control-custom" id="legendButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="legendButtonIcon" class="button-icon-class glyphicon glyphicon-option-horizontal"></span></div></br>' +
			  '<div data-toggle="tooltip" title="layers" class="leaflet-bar leaflet-control leaflet-control-custom" id="layerListButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="layerListButtonIcon" class="button-icon-class glyphicon glyphicon-menu-hamburger"></span></div></br>'
		)

	// Engage Bootstrap-style tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// Make a demonstration legend
	demoLegend();

	// call jsMediaQuery to handle tablet/mobile thresholds upon screen resize, then call it once to configure the initial view
	$(window).resize(jsMediaQuery);
	jsMediaQuery();

	// For dynamic legend queries (in progress)
	map.on('moveend', function() {
		drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected);
	});

	// Done, tell the console!
	console.log("setUpMap() complete. desktopMode = " + desktopMode)
}

// Media query for when the app traverses the tablet/desktop threshold
var jsMediaQuery = function() {
	if (window.matchMedia('(max-width: 768px)').matches){
		if (desktopMode){
			desktopMode = false;
			console.log("~~ tablet mode engaged")
			transformToTablet();
		}
	}else{
		if (desktopMode === false){
			desktopMode = true;
			console.log("~~ desktop mode engaged")
			transformToDesktop();
		}
	}
};

// To turn on the appropriate feature type (line, point, poly) in the TOC legend
function turnOnFeatureType(featureTypeCalled){
	switch(featureTypeCalled) {
		case "featurePolygons":
			console.log("feature polygons called")
			$("#polygonLegendHolder").removeClass( "legend-holder-hidden" )
			$("#lineLegendHolder").addClass( "legend-holder-hidden" )
			$("#pointLegendHolder").addClass( "legend-holder-hidden" )
			break;
		case "featureLines":
			console.log("feature lines called")
			$("#lineLegendHolder").removeClass( "legend-holder-hidden" )
			$("#polygonLegendHolder").addClass( "legend-holder-hidden" )
			$("#pointLegendHolder").addClass( "legend-holder-hidden" )
			break;
		case "featurePoints":
			console.log("feature points called")
			$("#pointLegendHolder").removeClass( "legend-holder-hidden" )
			$("#lineLegendHolder").addClass( "legend-holder-hidden" )
			$("#polygonLegendHolder").addClass( "legend-holder-hidden" )
			break;
		default:
			console.log("unidentified feature type called")
	}
}

// To turn on the appropriate basemap, note, the radio button's id must match the basemap's variable name
function turnOnBasemap(basemapCalled){
	map.removeLayer(currentBasemap)
	map.addLayer(window[basemapCalled]);
	window[basemapCalled].bringToBack();
	currentBasemap = window[basemapCalled]
}

// To turn on the appropriate basemap, note, the radio button's id must match the basemap's variable name
function turnOnOverlay(overlayCalled){
	if (map.hasLayer(window[overlayCalled])){
		map.removeLayer(window[overlayCalled]);
	}else{
		map.addLayer(window[overlayCalled]);
	}
}

// To dock/undock the table of contents from bottom
function toggleTOC(){
	if ($( "#toc" ).hasClass( "toc-view-open" )){ //is closed
		$( ".level-1-label-text").removeClass( "shade-level-1-label-text" );
		$( "#toc" ).removeClass( "toc-view-open" );
		$( "#toc" ).addClass( "toc-view-closed" );
		$( "#map" ).removeClass( "map-view-toc" );
		$( "#map" ).addClass( "map-view-full" );
		$( "#tocButton" ).removeClass( "toc-button-open" );
		$( "#tocButton" ).addClass( "toc-button-closed" );
		$( "#tocIcon" ).removeClass( "glyphicon-chevron-down" );
		$( "#tocIcon" ).addClass( "glyphicon-chevron-up" );
		if (desktopMode){
			$("#neatline").show();
		}
	}else{ //is open
		if (desktopMode){
			$( ".level-1-label-text").addClass( "shade-level-1-label-text" );
		}
					//the interface is open
		$( "#toc" ).addClass( "toc-view-open" );
		$( "#toc" ).removeClass( "toc-view-closed" );
		$( "#map" ).addClass( "map-view-toc" );
		$( "#map" ).removeClass( "map-view-full" );
		$( "#tocButton" ).addClass( "toc-button-open" );
		$( "#tocButton" ).removeClass( "toc-button-closed" );
		$( "#tocIcon" ).addClass( "glyphicon-chevron-down" );
		$( "#tocIcon" ).removeClass( "glyphicon-chevron-up" );
		$("#neatline").hide()
	}
}

// To configure desktop view (not called upon pageload - all HTML defaults to desktop styles)
function transformToDesktop(){
	$( "#toc" ).appendTo( $( "#tocParent" ) );
	$( ".feature-type-radio-group" ).prependTo( $( "#layerList" ) );
	$( "#legend" ).removeClass( "legend-off" );
	$( "#layerList" ).removeClass( "layer-list-off" );
    if ($( "#toc" ).hasClass( "toc-view-open" )){
		$( ".level-1-label-text").addClass( "shade-level-1-label-text" );
	}
	if ($('.modal.in').length > 0){
		$( "#tocModal" ).modal('hide');
		$("#map").append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
	}
}

// To configure tablet view (is called upon pageload)
function transformToTablet(){
	map.removeControl(map.zoomControl); //Remove the zoom
	$( "#toc" ).appendTo( $( "#tocModalDialogue" ) );
	$( ".feature-type-radio-group" ).appendTo( $( "#legend" ) );
	$( ".level-1-label-text").removeClass( "shade-level-1-label-text" );
	if ($('.modal.in').length > 0){
		$( "#tocModal" ).modal('hide');
	}
}

// Handles all click events from the 4 main UI buttons
function dispatchButtonClick(buttonClicked){
	// If modal is not already open, then open it
	if ($('.modal.in').length <= 0){
		$( "#tocModal" ).modal();
	}
	// If the table of contents is collapsed and we are in tablet mode, then open it by toggleTOC()
	if (($( "#toc" ).hasClass( "toc-view-closed" )) && (desktopMode == false)){
		toggleTOC();
	}

	modalAttachTOC();

	// Specific button events...
	switch(buttonClicked) {
		case "legendButton":
			console.log("Legend TOC")
			$( "#legend" ).removeClass( "legend-off" );
			$( "#layerList" ).addClass( "layer-list-off" );
			break;
		case "layerListButton":
			console.log("Layer List")
			$( "#legend" ).addClass( "legend-off" );
			$( "#layerList" ).removeClass( "layer-list-off" );
			break;
		case "infoButton":
			console.log("Info")
			configInfoShareModal();
			break;
		case "shareButton":
			console.log("Share")
			configInfoShareModal();
			break;
		default:
			console.log("unidentified button click")
	}
}

// ...
function modalAttachTOC(){
	if (desktopMode){
		// nothing, yet
	}else{
		$( "#toc" ).appendTo( $( "#tocModalDialogue" ) );
		$( "#toc" ).append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
	}
}

// ...
function configInfoShareModal(){
	if (desktopMode){
		$( "#legend" ).removeClass( "legend-off" );
		$( "#layerList" ).removeClass( "layer-list-off" );
	}else{
		$( "#legend" ).addClass( "legend-off" );
		$( "#layerList" ).addClass( "layer-list-off" );
	}
}

// Whenever the modal is closed...
$('.modal').on('hidden.bs.modal', function () {
	$("#map").append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
	$( "#legend" ).removeClass( "legend-off" );
})

// Handle toggle of the level 1/level 2 checkbox
function toggleCheckbox(checkObj){
	console.log(checkObj.checked) // true = level 2, false = level 1
}

// Extends the leaflet control for creating the buttons in the lower left of the map
var tabletCustomControl = L.Control.extend({
	options: {
		position: 'topleft'
	},
	onAdd: function (map) {
		var container = L.DomUtil.create('div', 'tablet-custom-control');
		return container;
	}
})

// Just a temp. function for demonstrating legend construction
function demoLegend(){
	var highestValue = 0;
	var highestValue2 = 0;
	var highestClass = "none";
	for (var key in tempClasses) {
		var value = tempClasses[key];
		if (value.level2frq > highestValue2){ highestValue2 = value.level2frq; highestClass = value.level2}
		if (!level1Classes.hasOwnProperty(value.level1)) {
			if (value.level1frq > highestValue){ highestValue = value.level1frq; }
			totalFeatures = totalFeatures + value.level1frq
			level1Classes[value.level1] = {"level1": value.level1 , "level1frq": value.level1frq , "hex1": value.hex1}
		}
	}
	level1Classes = _.indexBy(level1Classes, 'level1frq') // playing with http://underscorejs.org/
	var countKey = 0;
	for (var key in level1Classes) {
		var value = level1Classes[key];
		featurePct = (value.level1frq / highestValue) * 100
		$("#lineLegendHolder").append('<div class="histogram-div"; id=legend-'+level1Classes[key].level1+' style="height:' + String(featurePct) + '%; width:10%; left:' + (countKey * 10) + '%; background-color:' + value.hex1 + ';" >'
			+ '<div style="background-color:' + value.hex1 + ';" class="level-1-label-text rotate-text shade-level-1-label-text transition-class">' + level1Classes[key].level1 + '</div></div>')
		countKey++;
	}
}

//Gets the level 2 classes for a level 1 class and returns an array of objects
function getLegendSubclasses(levelClass){
	var subclasses = tempClasses2.classes.filter(function(e){
		return (e.level1 === levelClass);
	});

	var level2List = [];
	for(i = 0; i< subclasses.length; i++){
		if(level2List.indexOf(subclasses[i].level2) === -1){
			level2List.push(subclasses[i].level2);
		};
	};
	return level2List;
};

// Function called upon change in map extent or upon click of legend item
function drawThisView(boundsIn, zoomIn, _levelEngaged, _level1Selected){
		// level1 = (Deciduous)
		// level2 = (Scrub Oak)
		//var _levelEngaged = "1"
		if (zoomIn >= 13){
			if (_levelEngaged == "1"){
				var cartoQuery = "SELECT * FROM final_coastal_polygons WHERE the_geom && ST_SetSRID(ST_MakeBox2D(ST_Point(" +
					String(boundsIn._northEast.lng)+","+String(boundsIn._northEast.lat)+"), ST_Point(" +
					String(boundsIn._southWest.lng)+","+String(boundsIn._southWest.lat)+")), 4326) ORDER BY cov1 DESC"
			}else{
				var classesSelected = "";
				var countClasses = 0;
				var operatorInclusion = ""
				jQuery.each(level1Membership[_level1Selected], function(i, val) {
					if (countClasses == 1){
						operatorInclusion = " OR "
					}
					classesSelected = classesSelected + operatorInclusion + "(cov1 = '" + val.code + "')"
					countClasses++;
				})
				var cartoQuery = "SELECT * FROM final_coastal_polygons WHERE (" + classesSelected +
					") AND the_geom && ST_SetSRID(ST_MakeBox2D(ST_Point(" +
					String(boundsIn._northEast.lng)+","+String(boundsIn._northEast.lat)+"), ST_Point(" +
					String(boundsIn._southWest.lng)+","+String(boundsIn._southWest.lat)+")), 4326) ORDER BY cov1 DESC"
			}
			//console.log(cartoQuery)
			sql.execute(cartoQuery)
				.done(function(data) {
					$("#polygonLegendHolder").empty();
					var cov1Classes = {}
					var grouped = _.groupBy(data.rows, function(num){ // http://underscorejs.org/
						return classConfigs[num.cov1]["level" + _levelEngaged + "var"];
					});
					jQuery.each(grouped, function(i, val) {
						var collectiveVal = 0;
						jQuery.each(val, function(j, val2) {
							collectiveVal += val2.shape_area;
						})
						var hexColor = "#f545e9" // default to hot pink
						if (classConfigs[val[0].cov1]){
							hexColor = classConfigs[val[0].cov1]["color" + _levelEngaged]
						}
						cov1Classes[i] = {"cov1": val[0].cov1, "groupSize": Math.round(collectiveVal) , "hex": hexColor }
					})
					var max = _.max(cov1Classes,  function(num){ return num.groupSize; })
					var cov1Classes = _.indexBy(cov1Classes, 'groupSize')
					var countKey = 0;
					var widthInPercent = (100 / Object.keys(cov1Classes).length)
					_.each(cov1Classes, function(value){
						featurePct = (value.groupSize / max.groupSize) * 100
						$("#polygonLegendHolder").append('<div class="histogram-div"; style="height:' + String(featurePct) + '%; width:'+ widthInPercent +'%; left:'
						+ (countKey * widthInPercent) + '%; background-color:' + value.hex + ';" id="div_'+ value.cov1 +'" onClick="dispatchLegendClick(this.id)">'
						+ '<div style="background-color:' + value.hex + ';" class="level-1-label-text rotate-text shade-level-1-label-text transition-class">' + classConfigs[value.cov1]["level" + _levelEngaged] + '</div></div>')
						countKey++;
					});
					createWordCloud("#pointLegendHolder", cov1Classes, _levelEngaged);
				})
				.error(function(errors) {
					console.log("errors:" + errors);
				})
		}
}

function dispatchLegendClick(classCode){
	level1Selected = classConfigs[classCode.replace("div_", "")].level1var;
	if (levelEngaged == "1"){
		levelEngaged = "2";
	}else{
		levelEngaged = "1";
	}
	switchLevel(levelEngaged, level1Selected);
	drawThisView(map.getBounds(), map.getZoom(), levelEngaged, level1Selected);
}

function switchLevel(_levelEngaged, _level1Selected){
	cartoCSSRules = getPolyStyle("level"+_levelEngaged, _level1Selected);
	if (_levelEngaged == "2"){
		sublayer1.toggle();
	}else{
		sublayer2.toggle();
	}
	bordner = cartodb.createLayer(map, {
		user_name: 'sco-admin',
		type: 'cartodb',
		sublayers: [{type: "cartodb",
			sql: 'SELECT * FROM final_coastal_polygons',
			cartocss: cartoCSSRules,
			interactivity: ['cov1','cov2']
		}]
	})
	.addTo(map)
	.done(function(layer) {
		layer.setOpacity(layerOpacity.polygons);
		setupInteraction(layer, levelEngaged);
		$('#rangeSlider').slider().on('slide', function (ev) {
			layerOpacity.polygons = this.value / 100;
			layer.setOpacity(layerOpacity.polygons);
		});
	});
}


//////////////////// Stock code for enabling map queries against CARTO server
var Map = cdb.core.View.extend({
	initialize: function() {
	  console.log("Map.initialize")
	  _.bindAll(this, '_initMap');
	  this.filters = this.options.filters;
	  this._getVizJson();
	  this._bindEvents();
	},

	_getVizJson: function() {
	  $.ajax({
		url: 'data.json',
		success: this._initMap,
		error: function() {
		  cdb.log.info('problems getting vizjson info, check tools.json url please')
		}
	  })
	},

	_initMap: function(data) {
	  var self = this;
	  cartodb.createVis(this.$el, data.vizjson)
		.done(function(vis, layers) {
		  self.layers = layers[1];
		  self.map = vis.getNativeMap();
		});
	},

	_bindEvents: function() {
	  this.filters.bind('change', this._changeLayerGroup, this);
	},

	_changeLayerGroup: function(layers) {
	  var self = this;

	  _.each(layers, function(opts, i) {
		var pos = i.split('-')[1];
		var sublayer = self.layers.getSubLayer(pos);

		if (sublayer) {
		  sublayer.set(opts);
		}
	  });
	}

})
//////////////////// More stock code
var Filters = cdb.core.View.extend({

	initialize: function() {
	  console.log("Filters.initialize")
	  _.bindAll(this, 'render');
	  this._getActions();
	},

	render: function(data) {
	  this.clearSubViews();

	  var self = this;

	  if (!data.interactions) return false;
	  var buttons = data.interactions;

	  for (var i = 0, l = buttons.length; i < l; i++) {
		var a = new FiltersItem({ data: buttons[i] });
		a.bind('change', this._triggerChange, this)
		self.addView(a);
		self.$('ul').append(a.render().el);
	  }

	  return this;
	},

	_triggerChange: function(d) {
	  this._setSelectedFilter(d);
	  this.trigger('change', d.layers, this);
	},

	_setSelectedFilter: function(d) {
	  this.$('ul li a').removeClass('selected');
	  this.$('ul li a').each(function(i,a) {
		if ($(a).text() == d.text && $(a).attr('class') == d.className) {
		  $(a).addClass('selected')
		}
	  })
	},

	_getActions: function() {
	  $.ajax({
		url: 'data.json',
		success: this.render,
		error: function() {
		  cdb.log.info('oh no!, check your json location or if you are using a web server (Apache?)')
		}
	  })
	}
})
/////////////////////////////////////////
// create a word cloud just for fun...
var word_count = {};
function createWordCloud(hashedDivID, tempC, _drawLevel){
	//console.log(tempC)
	$(hashedDivID).empty();
	for (var key in tempC) {
		var value = tempC[key];
		word_count[classConfigs[value.cov1]["level" + _drawLevel]] = value.groupSize;
	}
	var svg_location = hashedDivID
	var width = ($(document).width()) * 0.9
	var height = ($(document).height()) * 0.18

	var fill = d3.scale.category20();

	var word_entries = d3.entries(word_count);

	var xScale = d3.scale.linear()
	   .domain([0, d3.max(word_entries, function(d) {
		  return d.value;
		})
	   ])
	   .range([6,30]);

	d3.layout.cloud().size([width, height])
	  .timeInterval(20)
	  .words(word_entries)
	  .fontSize(function(d) { return xScale(+d.value); })
	  .text(function(d) { return d.key; })
	  .rotate(function() { return ~~(Math.random() * 2) * 45; })
	  .font("Impact")
	  .on("end", draw)
	  .start();

	function draw(words) {
	  d3.select(svg_location).append("svg")
		  .attr("preserveAspectRatio", "xMinYMin meet")
		  .attr("viewBox", "0 0 "+ String(width) +" "+ String(height))
		  //.attr("width", width)
		  //.attr("height", height)
		.append("g")
		  .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")
		.selectAll("text")
		  .data(words)
		.enter().append("text")
		  .style("font-size", function(d) { return xScale(d.value) + "px"; })
		  .style("font-family", "Impact")
		  .style("fill", function(d, i) { return fill(i); })
		  .attr("text-anchor", "middle")
		  .attr("transform", function(d) {
			return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
		  })
		  .text(function(d) { return d.key; });
	}
	d3.layout.cloud().stop();
}
