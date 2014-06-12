appData.views.DashboardView = Backbone.View.extend({

    initialize: function () {

        var that = this;
        this.searching = false;
        this.favouriteSportsFilter = false;
     
        appData.events.updateActivitiesEvent.bind("activitiesUpdateHandler", this.activitiesUpdateHandler);        
        appData.collections.activities.sort_by_attribute('sql_index');
        Backbone.on('dashboardUpdatedHandler', this.generateAcitvitiesCollection);

        // update activities collection
        appData.views.DashboardView.markers = [];
        appData.views.DashboardView.clearMarkers = this.clearMarkers;
        appData.views.DashboardView.setMarkers = this.setMarkers;
        appData.views.DashboardView.initMap = this.initMap;
        appData.views.DashboardView.generateAcitvitiesCollection = this.generateAcitvitiesCollection;
        appData.views.DashboardView.firstRet = true;
        appData.views.DashboardView.filterEnabled = false;
        appData.views.DashboardView.sortActivitiesChangeHandler = this.sortActivitiesChangeHandler;

        // update the activities if we have a network connection
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getActivities(false, null);
            }
        }else{
            appData.services.phpService.getActivities(false, null);
        }

        // image timer
        appData.settings.timer = setInterval(this.timerAction, 4000);

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    timerAction: function(){
        Backbone.on('dashboardUpdatedHandler', appData.views.DashboardView.generateAcitvitiesCollection);

        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getActivities(false, null);
            }
        }else{
            appData.services.phpService.getActivities(false, null);
        }
    },

    // phonegap device online
    networkFoundHandler: function(){
        if(!appData.settings.mapAdded && appData.services.utilService.getNetworkConnection()){
            appData.views.DashboardView.initMap();
        }

        appData.services.phpService.getActivities(false, null);
    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    events: {
        "click #sortSelector a": "sortActivitiesChangeHandler",
        "click #searchButton": "toggleSearchHandler",
        "click #favs": "favsHandler",
        "keyup #searchInput": "searchHandler",
        "click #fullScreenButton": "fullscreenToggleHandler",
        "click #menuButton": "menuOpenHandler",
        "click #mapBtn": "fullscreenToggleHandler",
        "click #downButton": "downButtonHandler"
    },

    downButtonHandler: function(){
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    },

    fullscreenToggleHandler: function(){        
        $('#dashboard',appData.settings.currentPageHTML).toggleClass('mapOpen');
        google.maps.event.trigger(appData.views.DashboardView.map, 'resize');
    },

    activitiesUpdateHandler: function(){
        appData.collections.activities.each(function(activity) {
            activity.setGoing();
        });

        this.generateAcitvitiesCollection();
    },

    generateAcitvitiesCollection: function(){
        Backbone.off('dashboardUpdatedHandler');

        if(appData.views.DashboardView.filterEnabled){
            // GET OUR FILTER 
            appData.views.DashboardView.sortActivitiesChangeHandler();
        }else{
            $('#activityTable', appData.settings.currentPageHTML).empty();

            // show message that no activities have been found
            if(appData.collections.activities.length === 0){
                $('.no-found', appData.settings.currentPageHTML).removeAttr('style');

            }else if(this.favouriteSportsFilter === true && $(appData.collections.filteredActivitiesCollection.models).length === 0){
                $('.no-found', appData.settings.currentPageHTML).removeAttr('style');
            
            }else{

                $('.no-found', appData.settings.currentPageHTML).css({
                    'display':'none'
                });

                appData.views.activityListView = [];
                appData.views.locationList = [];

                var selectedCollection;
                if(this.searching){
                    $(appData.collections.activitiesSearch).each(function(index, activity) {
                      appData.views.locationList.push(activity);
                      appData.views.activityListView.push(new appData.views.DashboardActivityView({
                        model : activity
                      }));
                    });

                }else if(this.favouriteSportsFilter){

                    $(appData.collections.filteredActivitiesCollection.models).each(function(index, activity) {

                      appData.views.locationList.push(activity);
                      appData.views.activityListView.push(new appData.views.DashboardActivityView({
                        model : activity
                      }));
                    });


                }else{
                    appData.collections.activities.each(function(activity) {
                      appData.views.locationList.push(activity);
                      appData.views.activityListView.push(new appData.views.DashboardActivityView({
                        model : activity
                      }));
                    });
                }

                _(appData.views.activityListView).each(function(dv) {
                    $('#activityTable', appData.settings.currentPageHTML).append(dv.render().$el);
                });

                if(appData.services.utilService.getNetworkConnection() && appData.settings.native){
                    appData.views.DashboardView.setMarkers(appData.views.locationList);
                }else if(!appData.settings.native){

                    appData.views.DashboardView.setMarkers(appData.views.locationList);
                }
            }
        }
    },

    searchHandler: function(evt){

     var search = $(evt.target).val().toLowerCase();
      if(search.length > 0){
      appData.collections.activitiesSearch = appData.collections.activities.filter(function(model) {
          return _.some(
            [ model.get('title') ], 
            function(value) {
              return value.toLowerCase().indexOf(search) != -1;
            });
         }); 
            this.searching = true;

      }else{
        this.searching = false;
      }

      this.generateAcitvitiesCollection();
    },

    // toggle search
    toggleSearchHandler: function(){
        $('#searchBar').toggleClass('hide');
        if($('#searchBar', appData.settings.currentPageHTML).hasClass('hide')){
            this.searching = false;
        }else{
            this.searching = true;
        }
    },

    // sort the activities table
    sortActivitiesChangeHandler: function(evt){
        appData.views.DashboardView.filterEnabled = false;

        if(evt){
            $('#sortSelector a', appData.settings.currentPageHTML).removeClass('active');
            $(evt.target).addClass('active');
        }
        
        var index = $('#sortSelector .active', appData.settings.currentPageHTML).index();
        this.favouriteSportsFilter = false;

        switch(index){
            case 0:
                appData.collections.activities.sort_by_attribute('sql_index');
            break;

            case 1:
                appData.collections.activities.each(function(activity) {
                    
                    // calculate the distance between my current location and the location of the event
                    // using the Haversine formula:
                    var current_location = appData.models.userModel.get('current_location').split(',');
                    var point1 = {};
                        point1.lat = current_location[0];
                        point1.lng = current_location[1];

                    var activity_location = activity.attributes.coordinates.split(',');
                    var point2 = {};
                        point2.lat = activity_location[0];
                        point2.lng = activity_location[1];

                    var rad = function(x) {
                        return x*Math.PI/180;
                    }

                    var R = 6371; // earth's mean radius in km
                    var dLat  = rad(point2.lat - point1.lat);
                    var dLong = rad(point2.lng - point1.lng);

                    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                          Math.cos(rad(point1.lat)) * Math.cos(rad(point2.lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
                    var d = R * c;
                    var resultaat = d.toFixed(2);

                    activity.attributes.distance = parseInt(resultaat);
                });

                // now order the collection by the distance
                appData.collections.activities.sort_by_attribute('distance');
            break;

            case 2:
                var filters = [];
                appData.models.userModel.attributes.myFavouriteSports.each(function(model){
                    var filterCollection = new ActivitiesCollection();
                        filterCollection = appData.collections.activities.where({"sport_id": model.attributes.sport_id})[0];
                        filters.push(filterCollection);
                });

                var allActivities = new ActivitiesCollection();
                var extractedModels = new ActivitiesCollection();
                _.each(filters,function(collection, index){
                    $(collection).each(function(ind, collectionEl){
                        extractedModels.push(collectionEl);
                    });
                });

                appData.collections.filteredActivitiesCollection = extractedModels;
                this.favouriteSportsFilter = true;
            break;

        }
        this.generateAcitvitiesCollection();
        appData.views.DashboardView.filterEnabled = true;

    },

    favsHandler: function(){
     
    },

    render: function () {
        var view = this;

        this.$el.html(this.template({sortForm: appData.collections.sortOptions.toJSON()}));
        appData.settings.currentPageHTML = this.$el;

        if(appData.settings.native){
            if(!appData.services.utilService.getNetworkConnection()){
                $('#createActivityButton', appData.settings.currentPageHTML).hide();
            }else{
                this.initMap();
            }
        }else if(!appData.settings.native){
           this.initMap();
        }
        this.generateAcitvitiesCollection();

        return this;
    },

    menuOpenHandler: function(){
        $("#mainMenu").trigger("open");
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var myLocation = appData.models.userModel.attributes.current_location;

        if(myLocation !== "" || myLocation !== null){
            myLocation = appData.models.userModel.attributes.current_location.split(',');
        }else{
            myLocation = appData.settings.defaultLocation;
        }

        appData.views.DashboardView.locations = myLocation;

        var mapOptions = {
            backgroundColor: '#dacab4',
            zoom: 15,
            center: new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            keyboardShortcuts: false
        }
        appData.views.DashboardView.map = new google.maps.Map($('#map_canvas',appData.settings.currentPageHTML)[0], mapOptions);

        // resize and relocate map
        google.maps.event.addListenerOnce(appData.views.DashboardView.map, 'idle', function() {
            google.maps.event.trigger(appData.views.DashboardView.map, 'resize');
            appData.views.DashboardView.map.setCenter(new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]), 13);
        });

        var image = new google.maps.MarkerImage(appData.settings.iconPath + "my-map-icon@x2.png", null, null, null, new google.maps.Size(23,23)); // Create a variable for our marker image.             
        var userMarker = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]),
            icon: image, //use our image as the marker
            map:  appData.views.DashboardView.map,
            title: '',
            animation: google.maps.Animation.DROP,
            optimized: false
        });
        appData.views.DashboardView.markers.push(userMarker);

        var set = google.maps.InfoWindow.prototype.set;
        google.maps.InfoWindow.prototype.set = function (key, val) {
            if (key === 'map') {
                if (!this.get('noSupress')) {
                    console.log('This InfoWindow is supressed. To enable it, set "noSupress" option to true');
                    return;
                }
            }
            set.apply(this, arguments);
        }
        if(navigator.geolocation && appData.settings.native){

            Backbone.on('getMyLocationHandler', this.getMyLocationHandler);
            appData.services.utilService.getLocationService("dashboard");
        }
    },

    getMyLocationHandler: function(position){
        Backbone.off('getMyLocationHandler');
        if(position){
            var myLocation = position.coords.latitude + "," + position.coords.longitude;
            appData.models.userModel.attributes.current_location = myLocation;
            appData.views.DashboardView.locations = myLocation.split(',');

            if(appData.settings.native && appData.services.utilService.getNetworkConnection()){
                appData.views.DashboardView.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 13);
                appData.views.DashboardView.setMarkers(appData.views.locationList);
            }else if(!appData.settings.native){
                appData.views.DashboardView.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 13);
                appData.views.DashboardView.setMarkers(appData.views.locationList);                
            }
        }
    },

    setMarkers: function(models){
        appData.views.DashboardView.clearMarkers();

        var going = false;
        $(models).each(function(index, model){
            if(model.attributes.users.length > 0){
               $(model.attributes.users).each(function(index, element){

                    if(parseInt(element.user_id) === parseInt(appData.models.userModel.attributes.user_id)){
                        going = true;
                    }
                });
            }
            var activityImage;
            if(going){
                activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "goingMarker@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.             
            }else{
                activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "open-icon@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.             
            }

            if(model.attributes.coordinates){
            var coordinates = model.attributes.coordinates.split(",");
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(coordinates[0], coordinates[1]),
              map:  appData.views.DashboardView.map,
              title: "",
              icon: activityImage,
              optimized: false
            });

            marker.activityModel = model;

            google.maps.event.addListener(marker, "click", function(evt) {
                window.location = "#activity/" + this.activityModel.attributes.activity_id;
            });
            appData.views.DashboardView.markers.push(marker);
            }
        });


        var image = new google.maps.MarkerImage(appData.settings.iconPath + "my-map-icon@x2.png", null, null, null, new google.maps.Size(23,23)); // Create a variable for our marker image.             
        var userMarker = new google.maps.Marker({ // Set the marker
            position: new google.maps.LatLng(appData.views.DashboardView.locations[0], appData.views.DashboardView.locations[1]),
            icon: image, //use our image as the marker
            map:  appData.views.DashboardView.map,
            title: '',
            optimized: false
        });
        appData.views.DashboardView.markers.push(userMarker);
    },

    clearMarkers: function(){
        for (var i=0; i<appData.views.DashboardView.markers.length; i++) {
          appData.views.DashboardView.markers[i].setVisible(false);
        }
        appData.views.DashboardView.markers = [];
    },
});

