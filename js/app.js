//Global vars:
var desktopMode = true;

// Load the Carto "Vis"
window.onload = function() {
	cartodb.createVis('map', 'https://codiesee.carto.com/api/v2/viz/4d26135a-cc79-11e6-b347-0ee66e2c9693/viz.json', {
		shareable: false,
		title: false,
		description: false,
		search: false,
		tiles_loader: false,
		//center_lat: 46.38,
		//center_lon: -91,
		//zoom: (isMobile ? 7 : 9),
		cartodb_logo: false
	}).done(function(vis, layers) {
		map = vis.getNativeMap();
		setUpMap();
	})
	
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
	$(window).resize(jsMediaQuery);
	jsMediaQuery(); 
	console.log("~~ desktopMode = " + desktopMode)
}

// Sets everything up after pageload and map creation are complete 
function setUpMap(){
	// Explicitly set the layer 1/layer 2 toggle (will likely use a stateful URL parameter in the future to drive this)
	$("#levelSliderCheckbox").attr("checked", true);
	
	// Fade-in the toc button and give it a click handler
	$("#tocButton").addClass( "toc-button-unfade");
	$("#tocButton").click(function() { toggleTOC() });
	
	// Create a custom control in bottom left of map, then add html for the four buttons that will exist within this control
	map.addControl(new tabletCustomControl({position: "bottomleft"})); //Could also be: 'topleft', 'topright', 'bottomleft', 'bottomright'
	$(".tablet-custom-control")
		.attr("id", "tabletCustomControl")
		.html('<div data-toggle="tooltip" title="legend" class="leaflet-bar leaflet-control leaflet-control-custom" id="legendButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="legendButtonIcon" class="button-icon-class glyphicon glyphicon-option-horizontal"></span></div></br>' +
			  '<div data-toggle="tooltip" title="info" class="leaflet-bar leaflet-control leaflet-control-custom" id="infoButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="infoButtonIcon" class="button-icon-class glyphicon glyphicon-info-sign"></span></div></br>' +
			  '<div data-toggle="tooltip" title="share" class="leaflet-bar leaflet-control leaflet-control-custom" id="aboutButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="shareButtonIcon" class="button-icon-class glyphicon glyphicon-share-alt"></span></div></br>' +
			  '<div data-toggle="tooltip" title="layers" class="leaflet-bar leaflet-control leaflet-control-custom" id="layerListButton" onClick="dispatchButtonClick(this.id)">' +
					'<span id="layerListButtonIcon" class="button-icon-class glyphicon glyphicon-menu-hamburger"></span></div></br>'
		)
	// Engage Bootstrap-style tooltips
	$('[data-toggle="tooltip"]').tooltip();
	
	// Add WHAI tile layer 
	map.addLayer(L.tileLayer('http://maps.sco.wisc.edu/V1/bordner/03_WHAI_Tiles/00_Demo_Kewaunee/{z}/{x}/{y}.png', {attribution: 'WHAI Finder'}))
	
	console.log("setUpMap() complete. desktopMode = " + desktopMode)
}

// To dock/undock the table of contents from bottom 
function toggleTOC(){
	if ($( "#toc" ).hasClass( "toc-view-open" )){
		$( "#toc" ).removeClass( "toc-view-open" );
		$( "#toc" ).addClass( "toc-view-closed" );
		$( "#map" ).removeClass( "map-view-toc" );
		$( "#map" ).addClass( "map-view-full" );
		$( "#tocButton" ).removeClass( "toc-button-open" );
		$( "#tocButton" ).addClass( "toc-button-closed" );
		$( "#tocIcon" ).removeClass( "glyphicon-chevron-down" );
		$( "#tocIcon" ).addClass( "glyphicon-chevron-up" );
	}else{
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

// To configure desktop view (not called upon pageload)
function transformToDesktop(){
	$( "#toc" ).appendTo( $( "#tocParent" ) );
}

// To configure tablet view (is called upon pageload)
function transformToTablet(){
	$( "#toc" ).appendTo( $( "#modalDialogue" ) );
}

// Handles all click events from lower lefthand corner
function dispatchButtonClick(buttonClicked){
	switch(buttonClicked) {
		case "legendButton":
			if ($( "#toc" ).hasClass( "toc-view-closed" )){ toggleTOC(); } 
			$("#tocModal").modal();
			break;
		case "aboutButton":
			$("#tocModal").modal();
			break;
		case "infoButton":
			$("#tocModal").modal();
			break;
		case "layerListButton":
			$("#tocModal").modal();
			break;
		default:
			console.log("unidentified")
	}
}

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
