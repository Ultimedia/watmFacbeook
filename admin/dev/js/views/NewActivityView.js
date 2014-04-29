appData.views.NewActivityView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
      appData.views.NewActivityView.model = new Activity();
      appData.views.NewActivityView.markers = [];
      appData.views.NewActivityView.clearMarkers = this.clearMarkers;
      appData.views.NewActivityView.setMarkers = this.setMarkers;
      appData.views.NewActivityView.addedLocationSuccesEvent = this.addedLocationSuccesEvent;
      appData.views.NewActivityView.getLatLonSuccesHandler = this.getLatLonSuccesHandler;
      appData.views.NewActivityView.addedSportHandler = this.addedSportHandler;
      appData.views.NewActivityView.updateActivity = this.updateActivity;
      appData.views.NewActivityView.activityUpdatedHandler = this.activityUpdatedHandler;
      appData.views.NewActivityView.userRemovedHandler = this.userRemovedHandler;
    },

    userRemovedHandler: function(){
      Backbone.off('userRemoved');
    },

    activityUpdatedHandler: function(){
        Backbone.off('activityCreated');
        window.location.hash = "#";
    },

    getLatLonSuccesHandler: function(data){
       Backbone.off('getLatLonSuccesHandler');

        if(data){
            if(data.geometry){
                appData.views.NewActivityView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;
                appData.views.NewActivityView.setMarkers(data.geometry.location.lat, data.geometry.location.lng, data.formatted_address);
            }
        }
    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.NewActivityView.model.attributes.location_id = location_id;
        appData.views.NewActivityView.locationAdded = true;
        appData.views.NewActivityView.updateActivity();
    },

    updateActivity: function(){
      if(appData.views.NewActivityView.locationAdded && appData.views.NewActivityView.sportAdded && appData.views.NewActivityView.dataAdded){
        Backbone.on('activityCreated', appData.views.NewActivityView.activityUpdatedHandler);
        appData.services.phpService.createActivity(appData.views.NewActivityView.model);
      }
    },

    locationChangeHandler: function(){

        // location from autocomplete
        if($('#locationInput',  appData.settings.currentPageHTML).val().length > 3){

            if(appData.views.NewActivityView.model.attributes.location_id){

                var selectedLocationModel = appData.collections.locations.where({ "location_id": appData.views.NewActivityView.model.attributes.location_id });
                    if(selectedLocationModel){

                        selectedLocationModel = selectedLocationModel[0];

                        var coordinates = selectedLocationModel.attributes.coordinates.split(',');
                            appData.views.NewActivityView.currentLocation = coordinates;
                            appData.views.NewActivityView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    
                        if(selectedLocationModel.location == $('#locationInput',  appData.settings.currentPageHTML).val() || selectedLocationModel.attributes.location == $('#locationInput',  appData.settings.currentPageHTML).val()){
                        
                        }else{

                            appData.views.NewActivityView.model.attributes.location_id = null;
                            Backbone.on('getLatLonSuccesHandler', appData.views.NewActivityView.getLatLonSuccesHandler);
                            appData.services.utilService.getLatLon($('#locationInput').val());
                        }
                    }
            }else{
                Backbone.on('getLatLonSuccesHandler', appData.views.NewActivityView.getLatLonSuccesHandler);
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
      
      Backbone.on('userRemoved', appData.views.NewActivityView.userRemovedHandler);
      appData.services.phpService.removeUserFromActivity(uid, appData.views.NewActivityView.model.attributes.activity_id);
    },

    participantsSliderHandler: function(){
        $('#participantsTotal', appData.settings.currentPageHTML).text($('#participantsSlider', appData.settings.currentPageHTML).val() + " deelnemers");
    },

    addedSportHandler: function(data){
      Backbone.off("addedSportHandler");
      appData.views.NewActivityView.model.attributes.sport_id = data.sport_id;
      appData.views.NewActivityView.sportAdded = true;
      appData.views.NewActivityView.updateActivity();
    },

    render: function() {
    
        this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;
        appData.views.NewActivityView.locationAdded = appData.views.NewActivityView.sportAdded = appData.views.NewActivityView.dataAdded = false;

        $('#editForm', appData.settings.currentPageHTML).validate({
            submitHandler: function(){
                appData.views.NewActivityView.model.attributes.participants = $('#participantsSlider', appData.settings.currentPageHTML).val();
                appData.views.NewActivityView.model.attributes.title = $('#title', appData.settings.currentPageHTML).val();
                appData.views.NewActivityView.model.attributes.date = $('#wanneerInput', appData.settings.currentPageHTML).val() + " " + $('#vanInput', appData.settings.currentPageHTML).val();
                appData.views.NewActivityView.model.attributes.stopTime  = $('#totInput', appData.settings.currentPageHTML).val();
                appData.views.NewActivityView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();

                var sport = new Sport();
                    sport.attributes.sport_title = $('#sport', appData.settings.currentPageHTML).val();
                    
                var selectedSport = appData.collections.sports.where({"sport_id": appData.views.NewActivityView.model.attributes.sport_id});
                if(selectedSport.length > 0){
                    selectedSport = selectedSport[0];

                    if(selectedSport.attributes.sport_title == $('#sport', appData.settings.currentPageHTML).val()){
                      appData.views.NewActivityView.sportAdded = true;
                    }else{
                      Backbone.on("addedSportHandler",  appData.views.NewActivityView.addedSportHandler); 
                      appData.services.phpService.addSport(sport); 
                    }
                }else{
                  Backbone.on("addedSportHandler",  appData.views.NewActivityView.addedSportHandler);
                  appData.services.phpService.addSport(sport); 
                }

               // Is this a custom locaiton or not?
              var found = appData.collections.locations.findWhere({'location': $('#locationInput', appData.settings.currentPageHTML).val()})
              if(!found){
                  // Add location to database
                  Backbone.on('addedLocationSuccesEvent', appData.views.NewActivityView.addedLocationSuccesEvent);
                  appData.services.phpService.addLocation($('#locationInput',appData.settings.currentPageHTML).val(), appData.views.NewActivityView.currentMapLocation,"");
              }else{
                appData.views.NewActivityView.locationAdded = true;
              }

              appData.views.NewActivityView.dataAdded = true;
              appData.views.NewActivityView.updateActivity();
            }
        });

      // autocomplete
      appData.views.NewActivityView.sportAutoComplete = new AutoCompleteView({input: $("#sport", appData.settings.currentPageHTML), model: appData.collections.sports, wait: 100, updateModel: appData.views.NewActivityView.model, updateID: "sport_id", onSelect: function(){
        var sportModel = appData.collections.sports.where({ "spprt_id": appData.views.NewActivityView.model.attributes.sport_id})[0];
      }}).render();

      // autocomplete
      appData.views.NewActivityView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentPageHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.NewActivityView.model, updateID: "location_id", onSelect: function(){

        var locationModel = appData.collections.locations.where({ "location_id": appData.views.NewActivityView.model.attributes.location_id})[0];
          var coordinates = locationModel.attributes.coordinates.split(',');
          var location = locationModel.attributes.location;

          appData.views.NewActivityView.currentLocation = coordinates;
          appData.views.NewActivityView.setMarkers(coordinates[0], coordinates[1], location);

      }}).render();

      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      var page = this.$el;
      appData.views.NewActivityView.map = new google.maps.Map($('#map',page)[0], mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(appData.settings.defaultLocation[0], appData.settings.defaultLocation[1]),
        map:  appData.views.NewActivityView.map,
        title: 'Huidige locatie'
      });

      // resize and relocate map
      google.maps.event.addListenerOnce(appData.views.NewActivityView.map, 'idle', function() {
        google.maps.event.trigger(appData.views.NewActivityView.map, 'resize');
        appData.views.NewActivityView.map.setCenter(new google.maps.LatLng(locationObject[0], locationObject[1]), 13);
      });

      this.participantsSliderHandler();


      return this;
    },

    setMarkers: function(lat, long, content){
        appData.views.NewActivityView.clearMarkers();
        appData.views.NewActivityView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(lat, long),
          map:  appData.views.NewActivityView.map
        });

        appData.views.NewActivityView.map.setCenter(new google.maps.LatLng(lat, long), 13);
        appData.views.NewActivityView.markers.push(marker);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.NewActivityView.markers.length; i++) {
          appData.views.NewActivityView.markers[i].setVisible(false);
        }

        appData.views.NewActivityView.markers = [];
    }
});
