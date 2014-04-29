appData.views.NewLocationView = Backbone.View.extend({
    initialize: function () {
		appData.views.NewLocationView.markers = [];
    	appData.views.NewLocationView.clearMarkers = this.clearMarkers;
    	appData.views.NewLocationView.setMarkers = this.setMarkers;
        appData.views.NewLocationView.addedLocationSuccesEvent = this.addedLocationSuccesEvent;

        Backbone.on('getLatLonSuccesHandler', this.getLatLonSuccesHandler);
    },

    getLatLonSuccesHandler: function(data){
        if(data){
            if(data.geometry){
                appData.views.NewLocationView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;
                appData.views.NewLocationView.setMarkers(data.geometry.location.lat, data.geometry.location.lng, data.formatted_address);
            }
        }
    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.NewLocationView.model.attributes.location_id = location_id;
        window.location.hash = "locations";
    },

    events: {
        "keyup #locationInput": "locationChangeHandler"
    },
     
    locationChangeHandler: function(){

        // location from autocomplete
        if($('#locationInput',  appData.settings.currentPageHTML).val().length > 3){

            if(appData.views.NewLocationView.model.attributes.location_id){

                var selectedLocationModel = appData.collections.locations.where({ "location_id": appData.views.NewLocationView.model.attributes.location_id });
                    if(selectedLocationModel){

                        selectedLocationModel = selectedLocationModel[0];

                        var coordinates = selectedLocationModel.attributes.coordinates.split(',');
                            appData.views.NewLocationView.currentLocation = coordinates;
                            appData.views.NewLocationView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    
                        if(selectedLocationModel.location == $('#locationInput',  appData.settings.currentPageHTML).val() || selectedLocationModel.attributes.location == $('#locationInput',  appData.settings.currentPageHTML).val()){
                        
                        }else{

                            appData.views.NewLocationView.model.attributes.location_id = null;
                            appData.services.utilService.getLatLon($('#locationInput').val());
                        }
                    }
            }else{
                appData.services.utilService.getLatLon($('#locationInput').val());
            }
        }

    },

    render: function() {
		this.model = new Location();
		appData.views.NewLocationView.model = this.model;

		this.$el.html(this.template({ location: this.model }));
		appData.settings.currentPageHTML = this.$el;

		// validation
		$('#newLocationForm', appData.settings.currentPageHTML).validate({
    		submitHandler: function(){
                appData.views.NewLocationView.model.attributes.location = $('#locationInput', appData.settings.currentPageHTML).val();

                // Is this a custom locaiton or not?
                var found = appData.collections.locations.findWhere({'location': $('#locationInput', appData.settings.currentPageHTML).val()})
                if(!found){
                    // Add location to database
                    Backbone.on('addedLocationSuccesEvent', appData.views.NewLocationView.addedLocationSuccesEvent);
                    appData.services.phpService.addLocation($('#locationInput',appData.settings.currentPageHTML).val(), appData.views.NewLocationView.currentMapLocation,"");
                }else{

                    alert('Deze locatie bestaa tal, voeg een unieke locatie toe');

                }
    		}
    	});

    	// autocomplete
		appData.views.NewLocationView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentPageHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.NewLocationView.model, updateID: "location_id", onSelect: function(){

			var locationModel = appData.collections.locations.where({ "location_id": appData.views.NewLocationView.model.attributes.location_id})[0];
		    var coordinates = locationModel.attributes.coordinates.split(',');
		    var location = locationModel.attributes.location;

		    appData.views.NewLocationView.currentLocation = coordinates;
            appData.views.NewLocationView.setMarkers(coordinates[0], coordinates[1], location);

		}}).render();


		// new map
		var mapOptions = {
			zoom: 15,
			center: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		}

		var page = this.$el;
		var map = new google.maps.Map($('#map',page)[0], mapOptions);

		// resize and relocate map
		google.maps.event.addListenerOnce(map, 'idle', function() {
		google.maps.event.trigger(map, 'resize');
			map.setCenter(new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]), 13);
		});

		appData.views.NewLocationView.map = map;

      	return this;
    },

    setMarkers: function(lat, long, content){
        appData.views.NewLocationView.clearMarkers();
        appData.views.NewLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, long),
          map:  appData.views.NewLocationView.map
        });

        appData.views.NewLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        appData.views.NewLocationView.markers.push(marker);

    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.NewLocationView.markers.length; i++) {
          appData.views.NewLocationView.markers[i].setVisible(false);
        }

        appData.views.NewLocationView.markers = [];
    }
});
