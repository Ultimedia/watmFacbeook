appData.views.CreateActivityLocationView = Backbone.View.extend({

    initialize: function () {
        appData.events.locationCreateActivityEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationCreateActivityEvent.bind('locationErrorHandler', this.locationErrorHandler);
    
        appData.events.getLatLonEvent.bind('getLatLonSuccesHandler', this.getLatLonSuccesHandler);
        Backbone.on('addedLocationSuccesEvent', this.addedLocationSuccesEvent);

        this.currentMapLocation ="";
        this.wait = false;

        appData.views.CreateActivityLocationView.setMarkers = this.setMarkers; 
        appData.views.CreateActivityLocationView.tabTarget = {};
        appData.views.CreateActivityLocationView.tabTarget.location = "#wieContent";
        appData.views.CreateActivityLocationView.tabTarget.tab = "#wieTab";
        appData.views.CreateActivityLocationView.markers = [];
        appData.views.CreateActivityLocationView.clearMarkers = this.clearMarkers;

        appData.views.CreateActivityLocationView.activityCreatedHandler = this.activityCreatedHandler;
    },

    events: {
        "keyup #locationInput": "locationChangeHandler"
    },


    getLatLonSuccesHandler: function(data){

        if(data){
            if(data.geometry){
                appData.views.CreateActivityLocationView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;
                appData.views.CreateActivityLocationView.setMarkers(data.geometry.location.lat, data.geometry.location.lng, data.formatted_address);
            }
        }
    },

    locationChangeHandler: function(){

        // location from autocomplete
        if($('#locationInput',  appData.settings.currentModuleHTML).val().length > 3){

            if(appData.views.ActivityDetailView.model.attributes.location_id){

                var selectedLocationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityDetailView.model.attributes.location_id });
                    if(selectedLocationModel){

                        selectedLocationModel = selectedLocationModel[0];

                        var coordinates = selectedLocationModel.attributes.coordinates.split(',');
                            appData.views.CreateActivityLocationView.currentLocation = coordinates;
                            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    
                            console.log(selectedLocationModel);

                        if(selectedLocationModel.location == $('#locationInput',  appData.settings.currentModuleHTML).val() || selectedLocationModel.attributes.location == $('#locationInput',  appData.settings.currentModuleHTML).val()){
                        }else{

                            appData.views.ActivityDetailView.model.attributes.location_id = null;
                            appData.services.utilService.getLatLon($('#locationInput').val());
                        }
                    }
            }else{
                appData.services.utilService.getLatLon($('#locationInput').val());
            }
        }

    },

    setMarkers: function(lat, long, content){
        appData.views.CreateActivityLocationView.clearMarkers();
        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, long),
          map:  appData.views.CreateActivityLocationView.map,
          title: content
        });

        if(content){
            appData.views.CreateActivityLocationView.infowindow.setContent('ddddddddd');
        }

        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(lat, long), 13);

        google.maps.event.addListener(marker, 'click', function() {
            appData.views.CreateActivityLocationView.infowindow.open(appData.views.CreateActivityLocationView.map,marker);
        });

        appData.views.CreateActivityLocationView.markers.push(marker);
        appData.views.CreateActivityLocationView.infowindow.setContent(content);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.CreateActivityLocationView.markers.length; i++) {
          appData.views.CreateActivityLocationView.markers[i].setVisible(false);
        }

        appData.views.CreateActivityLocationView.markers = [];
    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.ActivityDetailView.model.attributes.location_id = location_id;
        appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      

      // autocomplete selector
      appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentModuleHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "location_id", onSelect: function(){

        var locationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityDetailView.model.attributes.location_id})[0];
            var coordinates = locationModel.attributes.coordinates.split(',');
            var location = locationModel.attributes.location;

            appData.views.CreateActivityLocationView.currentLocation = coordinates;
            appData.views.CreateActivityLocationView.setMarkers(coordinates[0], coordinates[1], location);

      }}).render();

      this.setValidators();
      this.initMap();

     if(appData.views.CreateActivityView.updating){
        $('#locationInput', appData.settings.currentModuleHTML).val(appData.views.ActivityDetailView.model.attributes.location);
        this.locationChangeHandler();
      }

      return this; 
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        appData.views.CreateActivityLocationView.map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        appData.views.CreateActivityLocationView.infowindow = new google.maps.InfoWindow();

        appData.views.CreateActivityLocationView.currentLocation = [];
        appData.views.CreateActivityLocationView.currentLocation.push(51.20935);
        appData.views.CreateActivityLocationView.currentLocation.push(3.22470);

        // resize and relocate map
        google.maps.event.addListenerOnce(appData.views.CreateActivityLocationView.map, 'idle', function() {
            google.maps.event.trigger(appData.views.CreateActivityLocationView.map, 'resize');
            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(appData.views.CreateActivityLocationView.currentLocation[0], appData.views.CreateActivityLocationView.currentLocation[1]), 13);
        });

        if(appData.settings.native){
            appData.services.utilService.getLocationService("createActivity");
        }

    },

    locationSuccesHandler: function(position){
        appData.views.CreateActivityLocationView.setMarkers(position.coords.latitude, position.coords.longitude);
    },

    locationErrorHandler: function(location_id){

    },

    setValidators: function(){
    	var that = this;
    	$("#waarForm",appData.settings.currentModuleHTML).validate({
            submitHandler: function(form){                
                appData.views.ActivityDetailView.model.attributes.location = $('#locationInput', appData.settings.currentModuleHTML).val();

                // Is this a custom locaiton or not?
                var found = appData.collections.locations.findWhere({'location': $('#locationInput', appData.settings.currentModuleHTML).val()})
                if(!found){
                    // Add location to database
                    appData.services.phpService.addLocation($('#locationInput',appData.settings.currentModuleHTML).val(), appData.views.CreateActivityLocationView.currentMapLocation,"");
                }else{

                    // if we don't have friends just create the activity, else go to the friends invite page
                    if(appData.models.userModel.attributes.myFriends.models.length !== 0){
                        appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
                    }else{

                        if(appData.views.CreateActivityView.updating){
                            Backbone.on('activityUpdated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                            appData.services.phpService.updateActivity(appData.views.ActivityDetailView.model);

                            console.log(appData.views.ActivityDetailView.model);
                        }else{
                            Backbone.on('activityCreated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                            appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
                        }
                    }
                }
            }
        });
    },

    activityCreatedHandler: function(activity_id){

      // now add friends
      Backbone.off('activityCreated');
      Backbone.off('activityUpdated');
      
      appData.views.CreateActivityView.updating = false;
      appData.views.CreateActivityView.isUpdating = false;
      appData.views.CreateActivityLocationView.activity_id = activity_id;
      appData.services.phpService.getActivities(false, appData.views.CreateActivityLocationView.activity_id);
      
      // set this boolean so we return to disable back functionality
      appData.settings.created = true;
      appData.services.utilService.updateLocalStorage();
    }
});