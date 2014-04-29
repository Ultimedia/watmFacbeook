appData.views.ActivityEditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
      appData.views.ActivityEditView.model = this.model;
      appData.views.ActivityEditView.markers = [];
      appData.views.ActivityEditView.clearMarkers = this.clearMarkers;
      appData.views.ActivityEditView.setMarkers = this.setMarkers;
      appData.views.ActivityEditView.addedLocationSuccesEvent = this.addedLocationSuccesEvent;
      appData.views.ActivityEditView.getLatLonSuccesHandler = this.getLatLonSuccesHandler;
      appData.views.ActivityEditView.addedSportHandler = this.addedSportHandler;
      appData.views.ActivityEditView.updateActivity = this.updateActivity;
      appData.views.ActivityEditView.activityUpdatedHandler = this.activityUpdatedHandler;
      appData.views.ActivityEditView.userRemovedHandler = this.userRemovedHandler;
    },

    userRemovedHandler: function(){
      Backbone.off('userRemoved');
    },

    activityUpdatedHandler: function(){
        Backbone.off('activityUpdatedHandler');
        window.location.hash = "#";
    },

    getLatLonSuccesHandler: function(data){
       Backbone.off('getLatLonSuccesHandler');

        if(data){
            if(data.geometry){
                appData.views.ActivityEditView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;
                appData.views.ActivityEditView.setMarkers(data.geometry.location.lat, data.geometry.location.lng, data.formatted_address);
            }
        }
    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.ActivityEditView.model.attributes.location_id = location_id;
        appData.views.ActivityEditView.locationAdded = true;
        appData.views.ActivityEditView.updateActivity();
    },

    updateActivity: function(){
      if(appData.views.ActivityEditView.locationAdded && appData.views.ActivityEditView.sportAdded && appData.views.ActivityEditView.dataAdded){
        Backbone.on('activityUpdatedHandler', appData.views.ActivityEditView.activityUpdatedHandler);
        appData.services.phpService.updateActivity(appData.views.ActivityEditView.model);
      }
    },

    locationChangeHandler: function(){

        // location from autocomplete
        if($('#locationInput',  appData.settings.currentPageHTML).val().length > 3){

            if(appData.views.ActivityEditView.model.attributes.location_id){

                var selectedLocationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityEditView.model.attributes.location_id });
                    if(selectedLocationModel){

                        selectedLocationModel = selectedLocationModel[0];

                        var coordinates = selectedLocationModel.attributes.coordinates.split(',');
                            appData.views.ActivityEditView.currentLocation = coordinates;
                            appData.views.ActivityEditView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    
                        if(selectedLocationModel.location == $('#locationInput',  appData.settings.currentPageHTML).val() || selectedLocationModel.attributes.location == $('#locationInput',  appData.settings.currentPageHTML).val()){
                        
                        }else{

                            appData.views.ActivityEditView.model.attributes.location_id = null;
                            Backbone.on('getLatLonSuccesHandler', appData.views.ActivityEditView.getLatLonSuccesHandler);
                            appData.services.utilService.getLatLon($('#locationInput').val());
                        }
                    }
            }else{
                Backbone.on('getLatLonSuccesHandler', appData.views.ActivityEditView.getLatLonSuccesHandler);
                appData.services.utilService.getLatLon($('#locationInput').val());
            }
        }
    },

    events:{
      "change #participantsSlider": "participantsSliderHandler",
      "keyup #locationInput": "locationChangeHandler",
      "click .friendBox": "removePartiHandler"
    },

    removePartiHandler: function(evt){
      var uid = $(evt.currentTarget).attr('friendid');
      $(evt.currentTarget).hide(400);
      
      Backbone.on('userRemoved', appData.views.ActivityEditView.userRemovedHandler);
      appData.services.phpService.removeUserFromActivity(uid, appData.views.ActivityEditView.model.attributes.activity_id);
    },

    participantsSliderHandler: function(){
        $('#participantsTotal', appData.settings.currentPageHTML).text($('#participantsSlider', appData.settings.currentPageHTML).val() + " deelnemers");
    },

    addedSportHandler: function(data){
      Backbone.off("addedSportHandler");
      appData.views.ActivityEditView.model.attributes.sport_id = data.sport_id;
      appData.views.ActivityEditView.sportAdded = true;
      appData.views.ActivityEditView.updateActivity();
    },

    render: function() {
    	this.$el.html(this.template({activity: this.model.toJSON(), imagePath: appData.settings.imagePath}));
    	appData.settings.currentPageHTML = this.$el;
      appData.views.ActivityEditView.locationAdded = appData.views.ActivityEditView.sportAdded = appData.views.ActivityEditView.dataAdded = false;

    	$('#editForm', appData.settings.currentPageHTML).validate({
      	submitHandler: function(){
            appData.views.ActivityEditView.model.attributes.participants = $('#participantsSlider', appData.settings.currentPageHTML).val();
            appData.views.ActivityEditView.model.attributes.title = $('#title', appData.settings.currentPageHTML).val();
            appData.views.ActivityEditView.model.attributes.date = $('#wanneerInput', appData.settings.currentPageHTML).val() + " " + $('#vanInput', appData.settings.currentPageHTML).val();
            appData.views.ActivityEditView.model.attributes.stopTime  = $('#totInput', appData.settings.currentPageHTML).val();
            appData.views.ActivityEditView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();

            var sport = new Sport();
                sport.attributes.sport_title = $('#sport', appData.settings.currentPageHTML).val();
                
            var selectedSport = appData.collections.sports.where({"sport_id": appData.views.ActivityEditView.model.attributes.sport_id});
            if(selectedSport.length > 0){
                selectedSport = selectedSport[0];

                if(selectedSport.attributes.sport_title == $('#sport', appData.settings.currentPageHTML).val()){
                  appData.views.ActivityEditView.sportAdded = true;
                }else{
                  Backbone.on("addedSportHandler",  appData.views.ActivityEditView.addedSportHandler); 
                  appData.services.phpService.addSport(sport); 
                }
            }else{
              Backbone.on("addedSportHandler",  appData.views.ActivityEditView.addedSportHandler);
              appData.services.phpService.addSport(sport); 
            }

           // Is this a custom locaiton or not?
          var found = appData.collections.locations.findWhere({'location': $('#locationInput', appData.settings.currentPageHTML).val()})
          if(!found){
              // Add location to database
              Backbone.on('addedLocationSuccesEvent', appData.views.ActivityEditView.addedLocationSuccesEvent);
              appData.services.phpService.addLocation($('#locationInput',appData.settings.currentPageHTML).val(), appData.views.ActivityEditView.currentMapLocation,"");
          }else{
            appData.views.ActivityEditView.locationAdded = true;
          }

          appData.views.ActivityEditView.dataAdded = true;
          appData.views.ActivityEditView.updateActivity();
      	}
    	});

      // autocomplete
      appData.views.ActivityEditView.sportAutoComplete = new AutoCompleteView({input: $("#sport", appData.settings.currentPageHTML), model: appData.collections.sports, wait: 100, updateModel: appData.views.ActivityEditView.model, updateID: "sport_id", onSelect: function(){
        var sportModel = appData.collections.sports.where({ "spprt_id": appData.views.ActivityEditView.model.attributes.sport_id})[0];
      }}).render();

      // autocomplete
      appData.views.ActivityEditView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentPageHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.ActivityEditView.model, updateID: "location_id", onSelect: function(){

        var locationModel = appData.collections.locations.where({ "location_id": appData.views.ActivityEditView.model.attributes.location_id})[0];
          var coordinates = locationModel.attributes.coordinates.split(',');
          var location = locationModel.attributes.location;

          appData.views.ActivityEditView.currentLocation = coordinates;
          appData.views.ActivityEditView.setMarkers(coordinates[0], coordinates[1], location);

      }}).render();


      var time = this.model.attributes.date.slice(-5);
      $('#vanInput', appData.settings.currentPageHTML).val(this.model.attributes.startTime);
      $('#totInput', appData.settings.currentPageHTML).val(this.model.attributes.stopTime);
    
      var dateObject = new Date(this.model.attributes.savedDate);
      $('#wanneerInput', appData.settings.currentPageHTML).val(dateObject.toDateInputValue());

      var locationObject = appData.collections.locations.where({"location_id": this.model.attributes.location_id});
          locationObject = locationObject[0].attributes.coordinates;
          locationObject = locationObject.split(',');

      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(locationObject[0], locationObject[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      var page = this.$el;
      appData.views.ActivityEditView.map = new google.maps.Map($('#map',page)[0], mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locationObject[0], locationObject[1]),
        map:  appData.views.ActivityEditView.map,
        title: 'Huidige locatie'
      });

      // resize and relocate map
      google.maps.event.addListenerOnce(appData.views.ActivityEditView.map, 'idle', function() {
        google.maps.event.trigger(appData.views.ActivityEditView.map, 'resize');
        appData.views.ActivityEditView.map.setCenter(new google.maps.LatLng(locationObject[0], locationObject[1]), 13);
      });

      this.participantsSliderHandler();


      return this;
    },

    setMarkers: function(lat, long, content){
        appData.views.ActivityEditView.clearMarkers();
        appData.views.ActivityEditView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, long),
          map:  appData.views.ActivityEditView.map
        });

        appData.views.ActivityEditView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        appData.views.ActivityEditView.markers.push(marker);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.ActivityEditView.markers.length; i++) {
          appData.views.ActivityEditView.markers[i].setVisible(false);
        }

        appData.views.ActivityEditView.markers = [];
    }
});
