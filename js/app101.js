//Global vars:
var desktopMode = true;
var level1Classes = {}
var totalFeatures = 0
var map;
var sql = new cartodb.SQL({ user: 'sco-admin' });

// Load the Carto map:
window.onload = function() {
  //Create the leaflet map
  map = L.map('map', {
	  zoomControl: false,
	  cartodb_logo: false,
	  center: [43.7844,-88.7879],
	  zoom: 7
  });
  var basemap = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
	  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
  }).addTo(map);
  // Promise for the first layer
  var bordner = cartodb.createLayer(map, {user_name: 'sco-admin',
	type: 'cartodb',
	sublayers: [
	{
	  sql: 'SELECT * FROM coastal_bordner_counties',
	  cartocss: '#layer{polygon-fill: #DDDDDD;polygon-opacity: 0.65;[cov1="A1"]{polygon-fill: #A6CEE3;}[cov1="A3"]{polygon-fill: #1F78B4;}[cov1="A4"]{polygon-fill: #B2DF8A;}[cov1="B1"]{polygon-fill: #33A02C;}[cov1="B3"]{polygon-fill: #FB9A99;}[cov1="C"]{polygon-fill: #E31A1C;}[cov1="C1"]{polygon-fill: #FDBF6F;}[cov1="D3"]{polygon-fill: #FF7F00;}[cov1="P"]{polygon-fill: #CAB2D6;}[cov1="SP"]{polygon-fill: #6A3D9A;}}'
	}
	]
  }).addTo(map);
  setUpMap();
};

// Sets everything up after pageload and map creation are complete 
function setUpMap(){
	// Explicitly set the layer 1/layer 2 toggle (will likely use a stateful URL parameter in the future to drive this)
	$("#levelSliderCheckbox").attr("checked", true);
	$("#featurePolygons").prop("checked", true);
	$("#baseB").prop("checked", true);
	// Fade-in the toc button and give it a click handler
	$("#tocButton").addClass( "toc-button-unfade");
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
	
	// Add WHAI tile layer 
	// map.addLayer(L.tileLayer('http://maps.sco.wisc.edu/V1/bordner/03_WHAI_Tiles/00_Demo_Kewaunee/{z}/{x}/{y}.png', {attribution: 'WHAI Finder'}))
	
	// Make a demonstration legend
	demoLegend();
	$(window).resize(jsMediaQuery);
	jsMediaQuery();
	map.on('moveend', function() { 
		grabSomeData(map.getBounds(),map.getZoom());
	});
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
    if ($( "#toc" ).hasClass( "toc-view-open" )){
		$( ".level-1-label-text").addClass( "shade-level-1-label-text" );
	}
	$( "#legend" ).removeClass( "legend-off" );	
}

// To configure tablet view (is called upon pageload)
function transformToTablet(){
	$( "#toc" ).appendTo( $( "#tocModalDialogue" ) );
	$( ".level-1-label-text").removeClass( "shade-level-1-label-text" );
	$( "#legend" ).addClass( "legend-off" );
}

// Handles all click events from 4 main buttons 
function dispatchButtonClick(buttonClicked){
	if ($('.modal.in').length <= 0){ $( "#tocModal" ).modal(); }
	if ($( "#toc" ).hasClass( "toc-view-closed" )){ toggleTOC(); }
	switch(buttonClicked) {
		case "legendButton":
			console.log("Legend TOC")
			$( "#toc" ).appendTo( $( "#tocModalDialogue" ) );
			$( "#toc" ).append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
			$( "#legend" ).removeClass( "legend-off" );
			break;
		case "layerListButton":
			console.log("Layer List")
			//$( "#legend" ).addClass( "legend-off" );
			break;
		case "infoButton":
			console.log("Info")
			//$( "#legend" ).addClass( "legend-off" );
			break;
		case "shareButton":
			console.log("Share")
			//$( "#legend" ).addClass( "legend-off" );
			break;
		default:
			console.log("unidentified")
	}
}

$('.modal').on('hidden.bs.modal', function () {
	$("#map").append($(".leaflet-control-container").addClass( "leaflet-control-container-tablet-custom" ));
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

function demoLegend(){
	var highestValue = 0;
	for (var key in tempClasses) {
		var value = tempClasses[key];
		if (!level1Classes.hasOwnProperty(value.level1)) {
			if (value.level1frq > highestValue){ highestValue = value.level1frq }
			totalFeatures = totalFeatures + value.level1frq 
			level1Classes[value.level1] = {"level1": value.level1 , "level1frq": value.level1frq , "hex1": value.hex1}
		}
	} 
	// console.log(_.size(level1Classes)) playing with http://underscorejs.org/
	level1Classes = _.indexBy(level1Classes, 'level1frq') // playing with http://underscorejs.org/
	var countKey = 0;
	for (var key in level1Classes) {
		var value = level1Classes[key];
		//featurePct = (value.level1frq / totalFeatures) * 100
		featurePct = (value.level1frq / highestValue) * 100
		//if (featurePct < 2){ featurePct = 2 }
		$("#legendHolder").append('<div class="histogram-div"; style="height:' + String(featurePct) + '%; width:10%; left:' + (countKey * 10) + '%; background-color:' + value.hex1 + ';" >'
			+ '<div style="background-color:' + value.hex1 + ';" class="level-1-label-text rotate-text shade-level-1-label-text transition-class">' + level1Classes[key].level1 + '</div></div>')
		countKey++; 
	}
}

function grabSomeData(boundsIn,zoomIn){
		//drawFilter(["dataIn","test"], "filter")
		console.log(zoomIn)
		if (zoomIn >= 13){
			//sql.execute("SELECT * FROM coastal_bordner_counties WHERE cov1 = 'C1' ORDER BY den1 ASC") // Gets all 'C1' values and orders them ascendantly 
			sql.execute("SELECT * FROM coastal_bordner_counties WHERE the_geom && ST_SetSRID(ST_MakeBox2D(ST_Point("+String(boundsIn._northEast.lng)+","+String(boundsIn._northEast.lat)+"), ST_Point("+String(boundsIn._southWest.lng)+","+String(boundsIn._southWest.lat)+")), 4326) ORDER BY den1 DESC") // Gets ...
				.done(function(data) {
					//var f = data.rows.length;
					
					console.log(data)
					/*if (f > 0){
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
				})
				.error(function(errors) {
					console.log("errors:" + errors);
				})
		}
}

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