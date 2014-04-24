/**
* Facebook Services
*/
appData.services.UtilServices = Backbone.Model.extend({

	initialize: function() {

	},

	getNetworkConnection: function(){
		if(appData.settings.native){

			// check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
			var networkState = navigator.connection.type;

			var states = {};
			states[Connection.UNKNOWN]  = false;
			states[Connection.ETHERNET] = true;
			states[Connection.WIFI]     = true;
			states[Connection.CELL_2G]  = true;
			states[Connection.CELL_3G]  = true;
			states[Connection.CELL_4G]  = true;
			states[Connection.CELL]     = true;
			states[Connection.NONE]     = false;

			appData.settings.network = states[networkState];
		}else{
			appData.settings.network = true;
		}
		return appData.settings.network;
	},

	getLatLon: function(keywords){
		$.ajax({
			url:"http://maps.google.com/maps/api/geocode/json?address="+ keywords +"&sensor=false&region=be",
			type:'GET',
			dataType:'json',
			success:function(data){
				console.log(data);

				var location = data.results[0];
				appData.events.getLatLonEvent.trigger('getLatLonSuccesHandler', location);

			},error: function(){

			}
		});
	},

	getLocationService: function(target){
		// geolocate
		if(navigator.geolocation){

				navigator.geolocation.getCurrentPosition(onSuccess, onError);
				var location = [];


				function onSuccess(position) {

					switch(target){
					case "login":
						appData.events.locationHomeEvent.trigger('locationSuccesHandler', position);
						break;
					case "createActivity":
						appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', position);
						break;
					case "dashboard":
						Backbone.trigger('getMyLocationHandler', position);
						break;
					case "create":
						Backbone.trigger('createUserLocationHandler', position);
						break;
					}
				}

				// onError Callback receives a PositionError object
				function onError(error) {

					switch(target){
					case "login":
						Backbone.trigger('locationError');
						break;
					case "createActivity":
						appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', location);
						break;
					}
				}
		}else{

			appData.events.locationEvent.trigger('locationErrorHandler', location);
		}
	},

	localDataToCollection: function(dataObject){


		// this function converts localstorage object to backbone collections
		appData.collections.activities = new ActivitiesCollection(dataObject.activities);
		appData.collections.buurten = new BuurtenCollection(dataObject.buurten);
		appData.collections.challenges = new ChallengesCollection(dataObject.challenges);
		appData.collections.favouriteSports = new SportsCollection(dataObject.favouriteSports);
		appData.collections.locations = new LocationsCollection(dataObject.locations);
		appData.collections.myActivities = new ActivitiesCollection(dataObject.myActivities);
		appData.collections.myPlannedActivities = new ActivitiesCollection(dataObject.myPlannedActivities);
		appData.collections.myInvitations = new ActivitiesCollection(dataObject.myInvitations);
		appData.collections.myJoinedActivitiesView = new ActivitiesCollection(dataObject.myJoinedActivitiesView);

		appData.collections.sortOptions = new SortOptionsCollection(dataObject.sortOptions);
		appData.collections.sports = new SportsCollection(dataObject.sports);
		appData.collections.users = new UsersCollection(dataObject.users);


		appData.settings.dataLoaded = true;

	},

	updateLocalStorage: function(){
		// detect localstorage
		var hasStorage = (function() {
	      try {
	        localStorage.setItem(mod, mod);
	        localStorage.removeItem(mod);
	        return true;
	      } catch(e) {
	        return false;
	      }
	    }());

		if(hasStorage){
        	window.localStorage.setItem("collections", JSON.stringify(appData.collections));
        	window.localStorage.setItem("userModel", JSON.stringify(appData.models.userModel));
		}
	},

  // check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
  checkConnection: function() {
    var networkState = navigator.connection.type;

    var states = {};
        states[Connection.UNKNOWN]  = false;
        states[Connection.ETHERNET] = true;
        states[Connection.WIFI]     = true;
        states[Connection.CELL_2G]  = true;
        states[Connection.CELL_3G]  = true;
        states[Connection.CELL_4G]  = true;
        states[Connection.CELL]     = false;
        states[Connection.NONE]     = false;

        appData.settings.network = states[networkState];
  }

});
