//Global vars:
var desktopMode = true;
var level1Classes = {}
var cov1Classes = {}
var totalFeatures = 0
var map;
var sql = new cartodb.SQL({ user: 'sco-admin' });
var currentBasemap;
var bordner;

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

var basemapC = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 18,
	ext: 'png'
});

// Load the Carto map:
window.onload = function() {
	//Create the leaflet map
	map = L.map('map', {
		zoomControl: false,
		cartodb_logo: false,
		center: [43.7844,-88.7879],
		zoom: 7
	});

	// Promise for the first layer
	bordner = cartodb.createLayer(map, {user_name: 'sco-admin',
		type: 'cartodb',
		sublayers: [{
			sql: 'SELECT * FROM coastal_bordner_counties',
			cartocss: '#layer{polygon-fill: #DDDDDD;polygon-opacity: 0.65;[cov1="A1"]{polygon-fill: #A6CEE3;}[cov1="A3"]{polygon-fill: #1F78B4;}[cov1="A4"]{polygon-fill: #B2DF8A;}[cov1="B1"]{polygon-fill: #33A02C;}[cov1="B3"]{polygon-fill: #FB9A99;}[cov1="C"]{polygon-fill: #E31A1C;}[cov1="C1"]{polygon-fill: #FDBF6F;}[cov1="D3"]{polygon-fill: #FF7F00;}[cov1="P"]{polygon-fill: #CAB2D6;}[cov1="SP"]{polygon-fill: #6A3D9A;}}'
		}]
	}).addTo(map);
	setUpMap();
};

// Sets everything up after pageload and map creation are complete 
function setUpMap(){
	// Explicitly set the feature type(will likely use a stateful URL parameter in the future to drive this)
		// --> $("#featurePolygons").prop("checked", true);
	$("#featurePoints").prop("checked", true);
		// --> $("#featureLines").prop("checked", true);
	
	$('input[name=featureType]').click(function(){ turnOnFeatureType(this.id) });
	$('input[name=basemapType]').click(function(){ turnOnBasemap(this.id) });
	$('input[name=overlayType]').click(function(){ turnOnOverlay(this.id) });
	
	// Hide point, line or poly legend as appropriate
	$("#polygonLegendHolder").addClass( "legend-holder-hidden" )
	$("#lineLegendHolder").addClass( "legend-holder-hidden" )
		// --> $("#pointLegendHolder").addClass( "legend-holder-hidden" )
	
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
		grabSomeData(map.getBounds(),map.getZoom());
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
	if ($( "#toc" ).hasClass( "toc-view-open" )){
		$( ".level-1-label-text").removeClass( "shade-level-1-label-text" );
		$( "#toc" ).removeClass( "toc-view-open" );
		$( "#toc" ).addClass( "toc-view-closed" );
		$( "#map" ).removeClass( "map-view-toc" );
		$( "#map" ).addClass( "map-view-full" );
		$( "#tocButton" ).removeClass( "toc-button-open" );
		$( "#tocButton" ).addClass( "toc-button-closed" );
		$( "#tocIcon" ).removeClass( "glyphicon-chevron-down" );
		$( "#tocIcon" ).addClass( "glyphicon-chevron-up" );
	}else{
		if (desktopMode){ 
			$( ".level-1-label-text").addClass( "shade-level-1-label-text" );
		}
		$( "#toc" ).addClass( "toc-view-open" );
		$( "#toc" ).removeClass( "toc-view-closed" );
		$( "#map" ).addClass( "map-view-toc" );
		$( "#map" ).removeClass( "map-view-full" );
		$( "#tocButton" ).addClass( "toc-button-open" );
		$( "#tocButton" ).removeClass( "toc-button-closed" );
		$( "#tocIcon" ).addClass( "glyphicon-chevron-down" );
		$( "#tocIcon" ).removeClass( "glyphicon-chevron-up" );
	}
}

// To configure desktop view (not called upon pageload - all HTML defaults to desktop styles)
function transformToDesktop(){
	$( "#toc" ).appendTo( $( "#tocParent" ) );
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
	$( "#toc" ).appendTo( $( "#tocModalDialogue" ) );
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
		$("#lineLegendHolder").append('<div class="histogram-div"; style="height:' + String(featurePct) + '%; width:10%; left:' + (countKey * 10) + '%; background-color:' + value.hex1 + ';" >'
			+ '<div style="background-color:' + value.hex1 + ';" class="level-1-label-text rotate-text shade-level-1-label-text transition-class">' + level1Classes[key].level1 + '</div></div>')
		countKey++; 
	}
}

// Called upon map extent change
function grabSomeData(boundsIn,zoomIn){
		//drawFilter(["dataIn","test"], "filter")
		if (zoomIn >= 13){
			//sql.execute("SELECT * FROM coastal_bordner_counties WHERE cov1 = 'C1' ORDER BY den1 ASC") // Gets all 'C1' values and orders them ascendantly 
			sql.execute("SELECT * FROM coastal_bordner_counties WHERE the_geom && ST_SetSRID(ST_MakeBox2D(ST_Point(" +
			String(boundsIn._northEast.lng)+","+String(boundsIn._northEast.lat)+"), ST_Point(" +
			String(boundsIn._southWest.lng)+","+String(boundsIn._southWest.lat)+")), 4326) ORDER BY cov1 DESC") // Gets ...
				.done(function(data) {
					$("#polygonLegendHolder").empty();
					cov1Classes = {}
					var highestValue = 0;
					var lengthValue = 0;
					var countCov1 = 0
					var lastCov1 = ""
					jQuery.each(data.rows, function(i, val) {
						if (val.cov1 == lastCov1){
							countCov1++;
							lastCov1 = val.cov1
						}else{
							if (i == 0){
								countCov1++;
								lastCov1 = val.cov1								
							}else{
								if (countCov1 > highestValue){ highestValue = countCov1; }
								cov1Classes[val.cov1] = {"level1": val.cov1 , "level1frq": countCov1 , "hex1": "#ffffff"}
								lastCov1 = val.cov1
								lengthValue++;
							}
						}
					})
					
					cov1Classes = _.indexBy(cov1Classes, 'level1frq') // playing with http://underscorejs.org/
					var countKey = 0;
					for (var key in cov1Classes) {
						var value = cov1Classes[key];
						featurePct = (value.level1frq / highestValue) * 100
						$("#polygonLegendHolder").append('<div class="histogram-div"; style="height:' + String(featurePct) + '%; width:'+ 100 / lengthValue +'%; left:' + (countKey * (100 / lengthValue)) + '%; background-color:' + value.hex1 + ';" >'
							+ '<div style="background-color:' + value.hex1 + ';" class="level-1-label-text rotate-text shade-level-1-label-text transition-class">' + cov1Classes[key].level1 + '</div></div>')
						countKey++; 
					}
					/* // From original, histogram and pie chart demo
					var f = data.rows.length;
					if (f > 0){
						var histogramFields = {};
						var pieFields = {};
						jQuery.each(data.fields, function(i, val) {
							if (isInArray(histogramFieldNames,i)){
								window[i] = []
								histogramFields[i] = val
							}
							if (isInArray(pieFieldNames,i)){
								window[i] = []
								pieFields[i] = val
							}
						})
						for (var x = 0; x < f; x++) {
							jQuery.each(histogramFields, function(i, val) {
								window[i].push([data.rows[x][i], data.rows[x]["cov1"]])
							});
							jQuery.each(pieFields, function(i, val) {
								window[i].push(data.rows[x][i])
							});
						}
						jQuery.each(histogramFields, function(i, val) {
							window[i].sort(function(a, b){return b[0]-a[0]});
							drawHistogram(window[i], i) 
						})
						jQuery.each(pieFields, function(i, val) {
							window[i].sort();
							drawPie(window[i], i) 
						})
					}*/
					//createWordCloud("#pointLegendHolder", tempClasses);
					createWordCloud("#pointLegendHolder", cov1Classes);
				})
				.error(function(errors) {
					console.log("errors:" + errors);
				})
		}
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

// create a word cloud just for fun...
var word_count = {};
function createWordCloud(hashedDivID, tempC){
	//console.log(tempC)
	$(hashedDivID).empty();
	for (var key in tempC) {
		var value = tempC[key];
		word_count[tempC[key].level1] = value.level1frq;
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