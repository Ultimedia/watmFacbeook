(function(){

// data containers
var appData = {
  views: {},
  models: {},
  routers: {},
  utils: {},
  collections: {},
  adapters: {},
  settings: {},
  data: {},
  helpers: {},
  messages: {},
  services: {},
  events: {},
  forms: {},
  garbage: {},
  storage: {}
};



// settings
appData.settings.rootPath = "http://localhost/admin/";
appData.settings.servicePath = "../services/";
appData.settings.imagePath = "../common/uploads/";
appData.settings.badgesPath = "../common/badges/";
appData.settings.iconPath = "public/css/assets/";
appData.settings.sportsPath = "../common/sports/";
appData.settings.promoPath = "../common/promo/";
appData.settings.sportsPathUpload =  "common/sports/";
appData.settings.serverPath = "http://ultimedia.biz/watm/common/uploads/";

appData.settings.getUserService = "getUser.php";
appData.settings.getUsersService = "getUsers.php";
appData.settings.addUserService = "addUser.php";
appData.settings.getSportsService = "getSports.php";
appData.settings.getActivitiesService = "getActivities.php";
appData.settings.getMessagesService = "getMessages.php";
appData.settings.getChallengesService = "getChallenges.php";
appData.settings.createActivityService = "createActivityService.php";
appData.settings.getUserFromFacebookID = "getUserFromFacebookID.php";
appData.settings.facebookUserToSQL = "facebookUserToSQL.php";
appData.settings.addMessageService = "addMessage.php";
appData.settings.getMediaService = "getMedia.php";
appData.settings.createActivityService = "createActivity.php";
appData.settings.getActivityUserService = "getActivityUser.php";
appData.settings.setGoingToActivityService = "setGoingToActivity.php";
appData.settings.getBuurtenService = "getBuurten.php";
appData.settings.getLocationsService = "getLocations.php";
appData.settings.addLocationService = "addLocation.php";
appData.settings.getMyPlannedActivities = "getMyPlannedActivities.php";
appData.settings.getMyActivities = "getMyActivities.php";
appData.settings.getFavouriteSportsService = "getFavouriteSports.php";
appData.settings.addFavouriteSportsService = "addFavouriteSports.php";
appData.settings.getUserFavouriteSportsService = "getUserFavouriteSports.php";
appData.settings.imageUploadService = "uploadService.php";
appData.settings.addPhotoToDatabase = "addPhotoToDatabase.php";
appData.settings.getMyAvatarService = "getMyAvatar.php";
appData.settings.getUserChallengesService = "getUserChallengesService.php";
appData.settings.updateAvatarService = "updateAvatar.php";
appData.settings.getMyChallengesService = "getMyChallenges.php";
appData.settings.joinChallengeService = "joinChallenge.php";
appData.settings.getBadgesService = "getBadges.php";
appData.settings.addSportService = "addSport.php";
appData.settings.getFriendsService = "getMyFriends.php";
appData.settings.addFriendService = "addFriend.php";
appData.settings.getMyInvitationsService = "getMyInvitations.php";
appData.settings.inviteFriendsService = "inviteFriends.php";
appData.settings.handleInvitationsService = "handleInvitation.php";
appData.settings.removeFriendService = "removeFriend.php";
appData.settings.updateUserAvatarService = "updateUserAvatar.php";
appData.settings.uploadMediaNonNativeService = "uploadMediaNonNative.php";
appData.settings.updateActivityService = "updateActivity.php";
appData.settings.getUserMediaService = "getUserMedia.php";
appData.settings.getAllChallengesService = "getAllChallenges.php";
appData.settings.getOldActivitiesService = "getOldActivities.php";
appData.settings.getAllMediaService = "getAllMedia.php";
appData.settings.removeActivityService = "removeActivity.php";
appData.settings.removeUserService = "removeUser.php";
appData.settings.removeLocationService = "removeLocation.php";
appData.settings.removeSportService= "removeSport.php";
appData.settings.removeMediaService = "removeMedia.php";
appData.settings.removeChallengeService = "removeChallenge.php";
appData.settings.uploadSportAvatarService = "uploadSportNonNative.php";
appData.settings.uploadSportNonNative = "uploadSportAvatar.php";
appData.settings.updateSportService = "updateSport.php";
appData.settings.uploadChallengeNonNative = "uploadCallengeNonNative.php";
appData.settings.addChallengeService = "addChallenge.php";
appData.settings.updateChallengeService = "updateChallenge.php";
appData.settings.uploadMediaNonNativeAdminService = "uploadMediaNonNativeAdmin.php";
appData.settings.updateUserService = "updateUser.php";
appData.settings.removeUserFromActivityService = "removeUserFromActivity.php";
appData.settings.getAdminService = "getAdmin.php";


appData.settings.defaultLocation = [51.20935, 3.22470];


/* Jquery Document Read */
$(document).on("ready", function () {
  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardActivityView", "ActivityEditView", "UsersView", "DashboardUserView", "LoadingView", "ChallengesView", "DashboardChallengesView", "NewChallengeView", "DashboardSportView", "SportsView", "NewSportView", "MediaView", "DashboardMediaView", "LocationsView", "DashboardLocationView", "SportEditView", "UserEditView", "ChallengeEditView", "LocationEditView", "DashboardActivityArchiveView", "NewActivityView", "NewLocationView", "SettingsView", "LoginView"],

  // backbone loaded
  function () {

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
      appData.services.utilService = new appData.services.UtilServices();
      appData.services.facebookService = new appData.services.FacebookServices();
      appData.services.facebookService.facebookConnect();

      appData.events.getMessagesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getSportsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getChallengesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMyActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInErrorEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInPasswordErrorEvent = _.extend({}, Backbone.Events);
      appData.events.createUserEvent = _.extend({}, Backbone.Events);
      appData.events.createUserErrorEvent = _.extend({}, Backbone.Events);
      appData.events.getUserFromFacebookIDEvent = _.extend({}, Backbone.Events);
      appData.events.getUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.facebookUserToSQLEvent = _.extend({}, Backbone.Events);
      appData.events.postMessageSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMediaSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.createActivityTabsEvent = _.extend({}, Backbone.Events);
      appData.events.activityUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.goinToActivitySuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getBuurtenEvent = _.extend({}, Backbone.Events);
      appData.events.updateActivitiesEvent = _.extend({}, Backbone.Events);

      appData.settings.dataLoaded = false;

      // init backbone
      Backbone.history.start();
  });

});


Activity = Backbone.Model.extend({
	
	defaults: {
		messages: [],
		activity_id: "",
		date: "",
		description: "",
		location_id: "",
		location: "",
		media: [],
		sport_id: "",
		time: "",
		stopTime: "",
		title: "",
		user_id: "",
		buurt_id: "4",
		participants: "0",
		going: "",
		users: [],
		full: false,
		updateActivity: false
    },

	initialize: function(){
		this.setGoing();
	}, 

	setGoing: function(){
		this.attributes.going = this.attributes.users.length;
		this.isFull();
	},

	isFull: function(){

		if(this.attributes.going >= this.attributes.participants){
			this.attributes.full = true;
		}else{
			this.attributes.full = false;
		}
	}
});



Buurten = Backbone.Model.extend({
	initialize: function(){

	}
});


Challenge = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Location = Backbone.Model.extend({
	defaults: {
		"description": "",
		"location": "",
		"coordinates": ""
	},

	initialize: function(){
		
	},

	label: function () {
        return this.get("location");
    }
});



Media = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Message = Backbone.Model.extend({
	initialize: function(){
		
	}
});



SortOption = Backbone.Model.extend({
	initialize: function(){
		
	}
});



Sport = Backbone.Model.extend({
	defaults: {
		"object_class": "",
		"icon": ""
	},

	initialize: function(){

	},

	label: function () {
		return this.get("sport_title");
	}
});


User = Backbone.Model.extend({
	defaults: {
	    user_id: '',
	    name: '',
	    email: '',
	    gender: '',
	    facebook_data: {},
	    facebookUser: false,
	    current_location: "50.827404, 3.254647",
		strength_score: 0,
		stamina_score: 0,
		equipment_score: 0,
    	avatar: "default.png",
    	myChallenges: [],
    	myBadges: [],
    	age: []
    },
	initialize: function(){
		
	}
});



ActivitiesCollection = Backbone.Collection.extend({
	model: Activity,
	sort_key: 'distance', // default sort key
	
	initialize: function (models,options) { 
     this.sort_key = 'distance';
	},

    comparator: function(a, b) {
        // Assuming that the sort_key values can be compared with '>' and '<',
        // modifying this to account for extra processing on the sort_key model
        // attributes is fairly straight forward.
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
        return a > b ?  1
             : a < b ? -1
             :          0;
    },

    sort_by_attribute: function(sort_key) {
        this.sort_key = sort_key;

        this.sort();
        console.log(this);
    }
});

BuurtenCollection = Backbone.Collection.extend({
	
	model: Buurten,
	initialize: function (models,options) { 

	}
});

ChallengesCollection = Backbone.Collection.extend({
	
	model: Challenge,
	initialize: function (models,options) { 

	}
});

LocationsCollection = Backbone.Collection.extend({
	
	model: Location,
	initialize: function (models,options) { 

	}
});

MediaCollection = Backbone.Collection.extend({

	model: Media,
	initialize: function (models,options) { 

	}
});

MessagesCollection = Backbone.Collection.extend({

	model: Message,
	initialize: function (models,options) { 

	}



});

SortOptionsCollection = Backbone.Collection.extend({
	
	model: SortOption,
	initialize: function (models,options) { 

	}
});

SportsCollection = Backbone.Collection.extend({
	
	model: Sport,
	initialize: function (models,options) { 

	}

});








UsersCollection = Backbone.Collection.extend({
	
	model: User,
	initialize: function (models,options) { 

	}
});

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


appData.views.AddChallengeView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
    	this.model = new Challenge();
    },

    render: function() {
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.imagePath}));
    	appData.settings.currentPageHTML = this.$el;

      return this;
    }
});


appData.views.ChallengeEditView = Backbone.View.extend({
	tagName: 'div',

    initialize: function () {
    	appData.views.ChallengeEditView.model = this.model;
    	appData.views.ChallengeEditView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.ChallengeEditView.addedSportHandler = this.addedSportHandler;
      appData.views.ChallengeEditView.addedChallengeHandler = this.addedChallengeHandler;
      appData.views.ChallengeEditView.reqChangeHandler = this.reqChangeHandler;
      appData.views.ChallengeEditView.fileErrorHandler = this.fileErrorHandler;   
    },

    fileErrorHandler: function(){
      Backbone.off('fileErrorEvent');
      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
    },

    events: {
    	"change :checkbox": "reqChangeHandler",
    	"change #nonNativeFileField":"nonNativeFileSelectedHandler",
    	"submit #mediaForm": "mediaFormSubmitHandler",
    	"change #sportde": "sportDeChangeHandler",
    	"change #deelnames": "deelnamesChangeHandler",
    	"change #fotovideoRange": "fotovideoRangeHandler",
    	"change #participateRange": "participateChangeHandler"
    },

    sportDeChangeHandler: function(){
    	$('#sportDeelnamesSlider', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#sportde', appData.settings.currentPageHTML).val() + " keer deelnemen aan deze sport");
    },

    deelnamesChangeHandler: function(){
    	$('#activityTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#deelnames', appData.settings.currentPageHTML).val() + " activiteiten aanmaken");
    },

    fotovideoRangeHandler: function(){
    	$('#fotovideoTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#fotovideoRange', appData.settings.currentPageHTML).val() + " foto's uploaden");
    },

    participateChangeHandler: function(){
    	$('#participateTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#participateRange', appData.settings.currentPageHTML).val() + " keer deelnemen aan een activiteit");
    },

    addedChallengeHandler: function(){
   		Backbone.off('updateChallengeHandler');
   		window.location.hash = "challenges";
    },

    reqChangeHandler: function(){
    	$(':checkbox').each(function(index, element){
    		if($(element).prop('checked')){
    			$($(element).attr('group-target')).removeClass('hide');
    		}else{
    			$($(element).attr('group-target')).addClass('hide');
    		}
    	});
    },

    render: function() {
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.imagePath, sports: appData.collections.sports.toJSON()}));
    	appData.settings.currentPageHTML = this.$el;

      $('#badge', appData.settings.currentPageHTML).attr("style", "background: url('" + appData.settings.badgesPath + appData.views.ChallengeEditView.model.attributes.badge_url + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');

    	$('#challengeForm', appData.settings.currentPageHTML).validate({
    		ignore: ":hidden", 

    		rules: { 
            	"challenge[]": { 
                    required: true, 
                    minlength: 1
            	},
    		}, 

		    messages: { 
		            "challenge[]": "Kies minstens 1 type uitdaging"
		    },

		    errorPlacement: function(error, element) {

                if(element.attr("name") == "challenge[]" ){
                    error.insertAfter("#cb3");
                }else{
                    error.insertAfter(element);
                }
            },

    		submitHandler: function(){
    			appData.views.ChallengeEditView.model.attributes.title = $('#titleInput', appData.settings.currentPageHTML).val();
    			appData.views.ChallengeEditView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();
    			appData.views.ChallengeEditView.model.attributes.deadline = $('#deadline', appData.settings.currentPageHTML).val();
    			appData.views.ChallengeEditView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();


    			appData.views.ChallengeEditView.model.attributes.challengeData = {};

    			// check with settings are enabled
    			$('.challengeGroup:visible').each(function(index, element){
    				switch($(element).attr('id')){
    					case "sportPartGroup":
    						appData.views.ChallengeEditView.model.attributes.challengeData.sportsFilter = {
    							"sport_id":  $('#selectSport').find(":selected").attr('sport-id'),
    							"total": $('#sportde').val() 
    						}
    					break;

    					case "activityTotalGroup":
							appData.views.ChallengeEditView.model.attributes.challengeData.activityCreateFilter = {
    							"total": $('#deelnames').val() 
    						}
    					break;

    					case "fotoTotalGroup":
							appData.views.ChallengeEditView.model.attributes.challengeData.fotoCreateFilter = {
    							"total": $('#fotovideoRange').val() 
    						}
    					break;

    					case "participateGroup":
							appData.views.ChallengeEditView.model.attributes.challengeData.participateFilter = {
    							"total": $('#participateRange').val() 
    						}
    					break;
    				}
		    	});

		    	// uploaded
          
          
    				Backbone.on('updateChallengeHandler',appData.views.ChallengeEditView.addedChallengeHandler);
    				appData.services.phpService.updateChallenge(appData.views.ChallengeEditView.model);
    		
    		}
    	});

    	$("#changeBadge", appData.settings.currentPageHTML).click(function(){
        	$("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         	return false;
      	});

      if(this.model.attributes.challengeData){

        if(this.model.attributes.challengeData.sportsFilter){
          $('#checkboxes-0', appData.settings.currentPageHTML).attr('checked', true);
          $('#sportPartGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#sportde', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.sportsFilter.total);

         $("#selectSport", appData.settings.currentPageHTML).find("[sport-id='" + this.model.attributes.challengeData.sportsFilter.sport_id + "']").prop('selected', true);
        }
        if(this.model.attributes.challengeData.activityCreateFilter){
          $('#checkboxes-1', appData.settings.currentPageHTML).attr('checked', true);
          $('#activityTotalGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#deelnames', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.activityCreateFilter.total);
        }
        if(this.model.attributes.challengeData.fotoCreateFilter){
          $('#checkboxes-2', appData.settings.currentPageHTML).attr('checked', true);
          $('#fotoTotalGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#fotovideoRange', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.fotoCreateFilter.total);
        }
        if(this.model.attributes.challengeData.participateFilter){
          $('#checkboxes-3', appData.settings.currentPageHTML).attr('checked', true);
          $('#participateGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#participateRange', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.participateFilter.total);
        }
      }

      this.sportDeChangeHandler();
      this.deelnamesChangeHandler();
      this.fotovideoRangeHandler();
      this.participateChangeHandler();

      return this;

    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.ChallengeEditView.model.attributes.badge_url = filename;

      $('#badge', appData.settings.currentPageHTML).attr("style", "background: url('" + appData.settings.badgesPath + appData.views.ChallengeEditView.model.attributes.badge_url + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');
      appData.views.ChallengeEditView.model.attributes.badge = filename;
      appData.views.ChallengeEditView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){

        // upload script
        var files = evt.target.files;
        appData.views.ChallengeEditView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.ChallengeEditView.files, function(key, value){
      	console.log(key);
      	console.log(value);

        data.append(key, value);
      });

      console.log(data);

      Backbone.on('fileUploadedEvent', appData.views.ChallengeEditView.fileUploadedHandler);
      appData.services.phpService.uploadChallengeAvatar(data);
    }
});

appData.views.ChallengesView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getChallengesHandler', this.getChallengesHandler);
        Backbone.on('removeChallengeHandler', this.challengeRemovedHandler);

        appData.services.phpService.getChallenges();
        appData.views.ChallengesView.challengeRemovedHandler = this.challengeRemovedHandler;
    },

      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
      $('#remove-modal').modal();

      return this;
    },

    challengeRemovedHandler: function(){
      Backbone.off('removeChallengeHandler');
    },

    getChallengesHandler: function(){
      Backbone.off('getChallengesHandler');

      console.log(appData.collections);

      $('#challenges-table tbody').empty();
      appData.collections.challenges.each(function(user) {
        var aView = new appData.views.DashboardChallengesView({model : user});

        $('#challenges-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      $('#remove-modal').on('show.bs.modal', function (e) {
          appData.views.ChallengesView.challengeID = $(e.relatedTarget).attr('data-id');
          appData.views.ChallengesView.selectedChallenge = $(e.relatedTarget).parent().parent();
          
          var myChallenge = appData.collections.challenges.where({'challenge_id': appData.views.ChallengesView.challengeID})[0];
          $('#remove-modal h4 span').text(myChallenge.attributes.title);
      });

      $('.modal-footer #remove').click(function(){
          Backbone.on('removeChallengeHandler', appData.views.ChallengesView.challengeRemovedHandler);
          appData.services.phpService.removeChallenge(appData.views.ChallengesView.challengeID);
          $(appData.views.ChallengesView.selectedChallenge).hide(400);
      });
    }
});


appData.views.DashboardActivityArchiveView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({activity: this.model.toJSON(), imagePath: appData.settings.imagePath, friends: this.model.attributes.users}));
        return this;
    }

});


appData.views.DashboardActivityView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({activity: this.model.toJSON(), imagePath: appData.settings.imagePath, friends: this.model.attributes.users}));
        return this;
    }

});


appData.views.DashboardChallengesView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.badgesPath}));
        return this;
    }

});


appData.views.DashboardLocationView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	console.log(this.model);
    	// model to template
    	this.$el.html(this.template({location: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this;
    }

});



appData.views.DashboardMediaView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
    },

    render: function() {

    	var user = this.model.attributes.user_id;

    		user = appData.collections.users.where({"user_id": user})[0];
    		if(user){
    			this.model.attributes.user = user.attributes.name;
    		}else{
    			this.model.attributes.user = "";
    		}
    	// model to template
    	this.$el.html(this.template({media: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this;
    }

});



appData.views.DashboardSportView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	console.log(this.model);
    	// model to template
    	this.$el.html(this.template({sport: this.model.toJSON(), imagePath: appData.settings.sportsPath}));
        return this;
    }

});



appData.views.DashboardUserView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this;
    }

});


appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getActivitiesHandler', this.getActivitiesHandler);
        appData.services.phpService.getActivities();

        Backbone.on('getActivitiesArchiveHandler', this.getActivitiesArchiveHandler);
        appData.services.phpService.getAcitvitiesArchive();
    
        appData.views.HomeView.wireModal = this.wireModal;
        appData.views.HomeView.removeHandler = this.activityRemoveHandler;
    },

    activityRemoveHandler: function(){
      Backbone.off('removeActivityHandler');
    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getActivitiesHandler: function(){
      Backbone.off('loadComplete');

      // show activities
      $('#activity-table tbody').empty();
      $('#activityMessage').addClass('hide');

      if(appData.collections.activities.length > 0){
        appData.collections.activities.each(function(activity) {
          var aView = new appData.views.DashboardActivityView({model : activity});
          $('#activity-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });
      }else{
        $('#activityMessage').removeClass('hide');
      }

      // trigger remove modal events
      appData.views.HomeView.wireModal();
    },

    getActivitiesArchiveHandler: function(){
      console.log(appData.collections)

      $('#activity-archive-table tbody').empty();
      appData.collections.activitiesArchive.each(function(activity) {
        var aView = new appData.views.DashboardActivityArchiveView({model : activity});

        $('#activity-archive-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      // trigger remove modal events
      appData.views.HomeView.wireModal();
    },

    wireModal: function(){
      $('#remove-modal').on('show.bs.modal', function (e) {
          appData.views.HomeView.activityID = $(e.relatedTarget).attr('data-id');
          var myActivity;

          if($(e.relatedTarget).attr('archive') === "true"){
            myActivity = appData.collections.activitiesArchive.where({'activity_id': appData.views.HomeView.activityID})[0];
          }else{
            myActivity = appData.collections.activities.where({'activity_id': appData.views.HomeView.activityID})[0];
          }
          appData.views.HomeView.selectedActivity = $(e.relatedTarget).parent().parent();
          
          $('#remove-modal h4 span').text(myActivity.attributes.title);
      });

      $('#remove').click(function(){
          Backbone.on('removeActivityHandler', appData.views.HomeView.removeHandler);
          appData.services.phpService.removeActivity(appData.views.HomeView.activityID);
          $(appData.views.HomeView.selectedActivity).hide(400);
      });
    }
});


appData.views.LoadingView = Backbone.View.extend({
    initialize: function () {

      Backbone.on('getSportsHandler', this.loadedDataHandler)
      appData.services.phpService.getSports();

      Backbone.on('getUsersHandler', this.loadedDataHandler)
      appData.services.phpService.getUsers();    

      Backbone.on('getChallengesHandler', this.loadedDataHandler)
      appData.services.phpService.getChallenges(); 

      Backbone.on('getLocationsHandler', this.loadedDataHandler)
      appData.services.phpService.getLocations();       
    
      Backbone.on('getActivitiesHandler', this.loadedDataHandler);
      appData.services.phpService.getActivities();

      Backbone.on('getActivitiesArchiveHandler', this.loadedDataHandler);
      appData.services.phpService.getAcitvitiesArchive();
    },

    loadedDataHandler:function(payload){

      switch(payload){
        case "users":  
          Backbone.off('getUsersHandler'); 
          appData.settings.usersLoaded = true; 
        break;
        case "sports":  
          Backbone.off('getSportsHandler'); 
          appData.settings.sportsLoaded = true;
        break;
        case "challenges":
          Backbone.off('getChallengesHandler');
          appData.settings.challengesLoaded = true;
        break;
        case "locations":
          Backbone.off('getLocationsHandler');
          appData.settings.locationsLoaded = true;
        break;
        case "activities":
          Backbone.off('getActivitiesHandler');
          appData.settings.activitiesLoaded = true;
        break;
        case "activitiesArchive":
          Backbone.off('getActivitiesArchiveHandler');
          appData.settings.activitiesArchiveLoaded = true;
        break;
      }

      if(appData.settings.usersLoaded  && appData.settings.sportsLoaded  && appData.settings.challengesLoaded && appData.settings.locationsLoaded && appData.settings.activitiesLoaded && appData.settings.activitiesArchiveLoaded){
        appData.settings.dataLoaded = true;

        // send the user back once the loading has completed
        window.history.back();
      }
  },  

  render: function() {
  	this.$el.html(this.template());
  	appData.settings.currentPageHTML = this.$el;
    return this;
  }

});


appData.views.LocationEditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
    
    },

    render: function() {
	  this.$el.html(this.template({location: this.model.toJSON(), imagePath: appData.settings.imagePath}));
	  appData.settings.currentPageHTML = this.$el;

      var locationObject = this.model.attributes.coordinates;
          locationObject = locationObject.split(',');

      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(locationObject[0], locationObject[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      var page = this.$el;
      var map = new google.maps.Map($('#map',page)[0], mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locationObject[0], locationObject[1]),
        map:  map,
        title: 'Huidige locatie'
      });

      // resize and relocate map
      google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(new google.maps.LatLng(locationObject[0], locationObject[1]), 13);
      });

      return this;
    }
});


appData.views.LocationsView = Backbone.View.extend({
    initialize: function () {
		Backbone.on("getLocationsHandler", this.getLocationsSuccesHandler);
		appData.services.phpService.getLocations();
    
        appData.views.LocationsView.locationRemoveHandler = this.locationRemoveHandler;
    },

    locationRemoveHandler: function(){
        Backbone.off('removeLocationHandler');

    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getLocationsSuccesHandler: function(){

    	Backbone.off('getLocationsHandler');
        
        $('#location-table tbody').empty();
            appData.collections.locations.each(function(location) {
            var aView = new appData.views.DashboardLocationView({model : location});

            $('#location-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        // trigger remove modal events
        $('#remove-modal').on('show.bs.modal', function (e) {
            appData.views.LocationsView.locationID = $(e.relatedTarget).attr('data-id');
            appData.views.LocationsView.selectedLocation = $(e.relatedTarget).parent().parent();
            
            var myLocation = appData.collections.locations.where({'location_id': appData.views.LocationsView.locationID})[0];
            $('#remove-modal h4 span').text(myLocation.attributes.location);
        });

        $('.modal-footer #remove').click(function(){
            Backbone.on('removeLocationHandler', appData.views.LocationsView.locationRemoveHandler);
            appData.services.phpService.removeLocation(appData.views.LocationsView.locationID);
            $(appData.views.LocationsView.selectedLocation).hide(400);
        });
    }
});


appData.views.LoginView = Backbone.View.extend({
    initialize: function () {
      appData.views.LoginView.loginSucces = this.loginSucces;
      appData.views.LoginView.loginError = this.loginError;
    },

    loginSucces: function(){
      Backbone.off('loginSucces');
      appData.settings.loggedIn = true;
      window.history.back();
    },

    loginError: function(){
      Backbone.off('loginError');
      $('#errorBox', appData.settings.currentPageHTML).removeClass('hide');
    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      $('#loginForm', appData.settings.currentPageHTML).validate({
        submitHandler: function(){

          var loginModel = new User();
              loginModel.attributes.email = $('#email', appData.settings.currentPageHTML).val();
              loginModel.attributes.password = $('#pwd', appData.settings.currentPageHTML).val();

              Backbone.on('loginSucces',  appData.views.LoginView.loginSucces);
              Backbone.on('loginError',  appData.views.LoginView.loginError);
             
             appData.services.phpService.adminlogin(loginModel);
        }
      });

      return this;
    }
});


appData.views.MediaView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('mediaLoadSuccesHandler', this.mediaLoadedHandler);
        appData.views.MediaView.mediaRemovedHandler = this.mediaRemovedHandler;
        appData.services.phpService.getAllMedia();
        appData.views.MediaView.facebookWallPostCompleteEvent = this.facebookWallPostCompleteHandler;
    },
 
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      return this;
    },

    mediaRemovedHandler: function(){
        Backbone.off('removeMediaHandler');
    },

    facebookWallPostCompleteHandler: function(){
        Backbone.off('FacebookWallPostCompleteEvent');
    },

    mediaLoadedHandler: function(){
        Backbone.off('mediaLoadSuccesHandler');
        
        $('#media-table tbody').empty();
            appData.collections.mediaCollection.each(function(media) {
            var aView = new appData.views.DashboardMediaView({model : media});

            $('#media-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        $('#remove-modal').on('show.bs.modal', function (e) {
            appData.views.MediaView.mediaID = $(e.relatedTarget).attr('data-id');
            appData.views.MediaView.selectedMedia = $(e.relatedTarget).parent().parent();
            var myMedia = appData.collections.mediaCollection.where({'media_id': appData.views.MediaView.mediaID})[0];
        });

        $('#remove').click(function(){
            Backbone.on('removeMediaHandler', appData.views.MediaView.mediaRemovedHandler);
            appData.services.phpService.removeMedia(appData.views.MediaView.mediaID);
            $(appData.views.MediaView.selectedMedia).hide(400);
        });

        $('#media-modal').on('show.bs.modal', function (e) {
            appData.views.MediaView.mediaID = $(e.relatedTarget).attr('data-id');
            appData.views.MediaView.myMedia = appData.collections.mediaCollection.where({'media_id': appData.views.MediaView.mediaID})[0];
        });

        $('#shareFacebook').click(function(){
            appData.views.MediaView.myMedia.attributes.omschrijving = $('#omschrijving').val();

            Backbone.on('FacebookWallPostCompleteEvent', appData.views.MediaView.facebookWallPostCompleteEvent);
            appData.services.facebookService.facebookWallpost(appData.views.MediaView.myMedia);
        });
    }
});


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


appData.views.NewChallengeView = Backbone.View.extend({
 	 tagName: 'div',

    initialize: function () {
    	this.model = new Challenge();
    	appData.views.NewChallengeView.model = this.model;
    	appData.views.NewChallengeView.fileUploadedHandler = this.fileUploadedHandler;
      	appData.views.NewChallengeView.addedSportHandler = this.addedSportHandler;
      	appData.views.NewChallengeView.addedChallengeHandler = this.addedChallengeHandler;
    },

    events: {
    	"change :checkbox": "reqChangeHandler",
    	"change #nonNativeFileField":"nonNativeFileSelectedHandler",
      	"submit #mediaForm": "mediaFormSubmitHandler",
      	"change #sportde": "sportDeChangeHandler",
      	"change #deelnames": "deelnamesChangeHandler",
      	"change #fotovideoRange": "fotovideoRangeHandler",
      	"change #participateRange": "participateChangeHandler"
    },

    sportDeChangeHandler: function(){
    	$('#sportDeelnamesSlider', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#sportde', appData.settings.currentPageHTML).val() + " keer deelnemen aan deze sport");
    },

    deelnamesChangeHandler: function(){
    	$('#activityTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#deelnames', appData.settings.currentPageHTML).val() + " activiteiten aanmaken");
    },

    fotovideoRangeHandler: function(){
    	$('#fotovideoTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#fotovideoRange', appData.settings.currentPageHTML).val() + " foto's uploaden");
    },

    participateChangeHandler: function(){
    	$('#participateTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#participateRange', appData.settings.currentPageHTML).val() + " keer deelnemen aan een activiteit");
    },

    addedChallengeHandler: function(){
   		Backbone.off('addedChallengeHandler');
   		window.location.hash = "challenges";
    },

    reqChangeHandler: function(evt){
    	$(':checkbox').each(function(index, element){
    		if($(element).prop('checked')){
    			$($(element).attr('group-target')).removeClass('hide');
    		}else{
    			$($(element).attr('group-target')).addClass('hide');
    		}
    	});
    },

    render: function() {
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.imagePath, sports: appData.collections.sports.toJSON()}));
    	appData.settings.currentPageHTML = this.$el;

    	this.sportDeChangeHandler();
    	this.deelnamesChangeHandler();
    	this.fotovideoRangeHandler();
    	this.participateChangeHandler();

    	$('#challengeForm', appData.settings.currentPageHTML).validate({
    		ignore: ":hidden", 

    		rules: { 
            	"challenge[]": { 
                    required: true, 
                    minlength: 1
            	},
    		}, 

		    messages: { 
		            "challenge[]": "Kies minstens 1 type uitdaging"
		    },

		    errorPlacement: function(error, element) {

                if(element.attr("name") == "challenge[]" ){
                    error.insertAfter("#cb3");
                }else{
                    error.insertAfter(element);
                }
            },

    		submitHandler: function(){
    			appData.views.NewChallengeView.model.attributes.title = $('#titleInput', appData.settings.currentPageHTML).val();
    			appData.views.NewChallengeView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();
    			appData.views.NewChallengeView.model.attributes.deadline = $('#deadline', appData.settings.currentPageHTML).val();
    			appData.views.NewChallengeView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();


    			appData.views.NewChallengeView.model.attributes.challengeData = {};

    			// check with settings are enabled
    			$('.challengeGroup:visible').each(function(index, element){
    				switch($(element).attr('id')){
    					case "sportPartGroup":
    						appData.views.NewChallengeView.model.attributes.challengeData.sportsFilter = {
    							"sport_id":  $('#selectSport').find(":selected").attr('sport-id'),
    							"total": $('#sportde').val() 
    						}
    					break;

    					case "activityTotalGroup":
							appData.views.NewChallengeView.model.attributes.challengeData.activityCreateFilter = {
    							"total": $('#deelnames').val() 
    						}
    					break;

    					case "fotoTotalGroup":
							appData.views.NewChallengeView.model.attributes.challengeData.fotoCreateFilter = {
    							"total": $('#fotovideoRange').val() 
    						}
    					break;

    					case "participateGroup":
							appData.views.NewChallengeView.model.attributes.challengeData.participateFilter = {
    							"total": $('#participateRange').val() 
    						}
    					break;
    				}
		    	});

		    	// uploaded
    			if(appData.views.NewChallengeView.model.attributes.upload){
    				Backbone.on('addedChallengeHandler',appData.views.NewChallengeView.addedChallengeHandler);
    				appData.services.phpService.addChallenge(appData.views.NewChallengeView.model);
    			}else{
    				alert('Kies een afbeelding');
    			}
    		}
    	});

    	$("#changeBadge", appData.settings.currentPageHTML).click(function(){
        	$("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         	return false;
      	});

      return this;
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.NewChallengeView.model.attributes.badge_url = filename;

      $('#badge').attr('src',appData.settings.badgesPath +  appData.views.NewChallengeView.model.attributes.badge_url).removeClass('hide');
      appData.views.NewChallengeView.model.attributes.badge = filename;
      appData.views.NewChallengeView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){

        // upload script
        var files = evt.target.files;
        appData.views.NewChallengeView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.NewChallengeView.files, function(key, value){
      	console.log(key);
      	console.log(value);

        data.append(key, value);
      });

      console.log(data);

      Backbone.on('fileUploadedEvent', appData.views.NewChallengeView.fileUploadedHandler);
      appData.services.phpService.uploadChallengeAvatar(data);
    }
});

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


appData.views.NewSportView = Backbone.View.extend({
    initialize: function () {
      appData.views.NewSportView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.NewSportView.addedSportHandler = this.addedSportHandler;
    },

    events: {
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },
      
    render: function() {
    	appData.views.NewSportView.model = this.model = new Sport();

    	this.$el.html(this.template({sport: this.model.toJSON(), imagePath: appData.settings.sportsPath}));
		  appData.settings.currentPageHTML = this.$el;

      $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
         $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         return false;
      });

      $('#sportForm',appData.settings.currentPageHTML).validate({
        submitHandler: function(){
          appData.views.NewSportView.model.attributes.sport_title = $('#sportInput', appData.settings.currentPageHTML).val();
          
          Backbone.on('addedSportHandler', appData.views.NewSportView.addedSportHandler);

          appData.views.NewSportView.model.attributes.upload = false;
          appData.services.phpService.addSport(appData.views.NewSportView.model);
        }
      });

      return this;
    },

    addedSportHandler: function(){
      Backbone.off('updateSportModel');

      if(!appData.views.NewSportView.model.attributes.upload){
        window.location.hash = "sports";
      }
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.NewSportView.uploadedPhotoUrl = filename;

      $('#sportAvatar').attr('src',appData.settings.sportsPath +  appData.views.NewSportView.uploadedPhotoUrl).removeClass('hide');
      appData.views.NewSportView.model.attributes.icon = filename;
      appData.views.NewSportView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        var files = evt.target.files;
        appData.views.NewSportView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.NewSportView.files, function(key, value){
        data.append(key, value);
      });
      console.log(data);


      Backbone.on('fileUploadedEvent', appData.views.NewSportView.fileUploadedHandler);
      appData.services.phpService.uploadSportAvatar(data);
    }
});


appData.views.SettingsView = Backbone.View.extend({
    initialize: function () {

    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;


      return this;
    }
});



appData.views.SportEditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
    	appData.views.SportEditView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.SportEditView.updateSportHandler = this.updateSportHandler;
      appData.views.SportEditView.fileErrorHandler = this.fileErrorHandler;   
    },

    events: {
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },

    fileErrorHandler: function(){
      Backbone.off('fileErrorEvent');
      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
    },

    render: function() {
   		this.$el.html(this.template({sport: this.model.toJSON(), imagePath: appData.settings.sportsPath}));
    	appData.settings.currentPageHTML = this.$el;

      appData.views.SportEditView.model = this.model;

      $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
         $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         return false;
      });

      $('#sportForm',appData.settings.currentPageHTML).validate({
        submitHandler: function(){
          appData.views.SportEditView.model.attributes.sport_title = $('#sportInput', appData.settings.currentPageHTML).val();
          
          Backbone.on('updateSportModel', appData.views.SportEditView.updateSportHandler);

          appData.views.SportEditView.model.attributes.upload = false;
          appData.services.phpService.updateSport(appData.views.SportEditView.model);
        }
      });

      return this;
    },

    updateSportHandler: function(){
      Backbone.off('updateSportModel');

      if(!appData.views.SportEditView.model.attributes.upload){
        window.location.hash = "sports";
      }
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.SportEditView.uploadedPhotoUrl = filename;

      $('#sportAvatar').attr("style", "background: url('" + appData.settings.sportsPath + appData.views.SportEditView.uploadedPhotoUrl + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');

      appData.views.SportEditView.model.attributes.icon = filename;
      appData.views.SportEditView.model.attributes.upload = true;

      Backbone.on('updateSportModel', appData.views.SportEditView.updateSportHandler);
      appData.services.phpService.updateSport(appData.views.SportEditView.model);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        var files = evt.target.files;
        appData.views.SportEditView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.SportEditView.files, function(key, value){
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.SportEditView.fileUploadedHandler);
      appData.services.phpService.uploadSportAvatar(data);
    },

});


appData.views.SportsView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getSportsHandler', this.getSportsHandler);
        appData.views.SportsView.sportRemovedHandler = this.sportRemovedHandler;
        appData.services.phpService.getSports();
    },

    sportRemovedHandler: function(){
      Backbone.off('removeSportHandler');
    },  

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getSportsHandler: function(){

      Backbone.off('getSportsHandler');

      // show activities
      $('#sports-table tbody').empty();
      appData.collections.sports.each(function(sport) {

        var aView = new appData.views.DashboardSportView({model : sport});
        $('#sports-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      $('#remove-modal').on('show.bs.modal', function (e) {
          appData.views.SportsView.sportID = $(e.relatedTarget).attr('data-id');
          appData.views.SportsView.selectedSport = $(e.relatedTarget).parent().parent();
          
          var mySport = appData.collections.sports.where({'sport_id': appData.views.SportsView.sportID})[0];
          $('#remove-modal h4 span').text(mySport.attributes.sport_title);
      });

      $('.modal-footer #remove').click(function(){
          Backbone.on('removeSportHandler', appData.views.SportsView.sportRemovedHandler);
          appData.services.phpService.removeSport(appData.views.SportsView.sportID);
          $(appData.views.SportsView.selectedSport).hide(400);
      });

    }
});


appData.views.UserEditView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
        appData.views.UserEditView.fileUploadedHandler = this.fileUploadedHandler;
        appData.views.UserEditView.fileErrorHandler = this.fileErrorHandler;   
        appData.views.UserEditView.model = this.model;
        appData.views.UserEditView.updateUserHandler = this.updateUserHandler;
    },

    events: {
        "change #ageSlider": "ageChangeHandler",
        "change #nonNativeFileField":"nonNativeFileSelectedHandler",
        "submit #mediaForm": "mediaFormSubmitHandler",
    },

    updateUserHandler: function(){
        Backbone.off('userUpdatedHandler');
        window.location.hash = "#users";
    },

    ageChangeHandler: function(){
        $('#ageTotal', appData.settings.currentPageHTML).text($('#ageSlider', appData.settings.currentPageHTML).val() + " jaar");
    },

    render: function() {
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));
    	appData.settings.currentPageHTML = this.$el;


        $('#userForm', appData.settings.currentPageHTML).validate({
            submitHandler: function(){
                appData.views.UserEditView.model.attributes.name = $('#nameInput', appData.settings.currentPageHTML).val();
                appData.views.UserEditView.model.attributes.gender = $("input[name='genderRadios']:checked", appData.settings.currentPageHTML).val();
                appData.views.UserEditView.model.attributes.age = $('#ageSlider', appData.settings.currentPageHTML).val();
                appData.views.UserEditView.model.attributes.admin = $("input[name='beheerderRadios']:checked", appData.settings.currentPageHTML).val();

                Backbone.on('userUpdatedHandler', appData.views.UserEditView.updateUserHandler)
                appData.services.phpService.updateUser(appData.views.UserEditView.model);
            }
        });


        if(appData.views.UserEditView.model.attributes.gender == "1"){
          $("#optionsRadios1", appData.settings.currentPageHTML).prop("checked", true);
        }else{
          $("#optionsRadios2", appData.settings.currentPageHTML).prop("checked", true);
        }

        if(appData.views.UserEditView.model.attributes.admin == "1"){
          $("#beheerderInput1", appData.settings.currentPageHTML).prop("checked", true);
        }else{
          $("#beheerderInput2", appData.settings.currentPageHTML).prop("checked", true);
        }

      Ladda.bind( 'input[type=submit]' );


      $('#ageSlider', appData.settings.currentPageHTML).val(appData.views.UserEditView.model.attributes.age);
      this.ageChangeHandler();


      return this;
    },

    fileErrorHandler: function(){
      Backbone.off('fileErrorEvent');
      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
    },

    fileUploadedHandler: function(data){

      Backbone.off('fileUploadedEvent');
      


      var filename = data.files[0].replace(/^.*[\\\/]/, '');

      appData.views.UserEditView.model.attributes.avatar = filename;


      $('#userAvatar').attr("style", "background: url('" + appData.settings.imagePath + appData.views.UserEditView.model.attributes.avatar + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');

      appData.views.UserEditView.model.attributes.avatar = filename;
      appData.views.UserEditView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){

        // upload script
        var files = evt.target.files;
        appData.views.ChallengeEditView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening



      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.ChallengeEditView.files, function(key, value){
        console.log(key);
        console.log(value);

        data.append(key, value);
      });
      Backbone.on('fileUploadedEvent', appData.views.UserEditView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    }
});


appData.views.UsersView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getUsersHandler', this.getUsersHandler);
        appData.services.phpService.getUsers();

        appData.views.UsersView.removeHandler = this.userRemovedHandler;
    },
      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
        
        $('#remove-modal').modal();
        return this;
    },

    userRemovedHandler: function(){
        Backbone.off('removeUserHandler');
    },

    getUsersHandler: function(){
        Backbone.off('getUsersHandler');

        // show users
         $('#user-table tbody').empty();
        appData.collections.users.each(function(user) {
            var aView = new appData.views.DashboardUserView({model : user});
            $('#user-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        $('#remove-modal').on('show.bs.modal', function (e) {
            appData.views.UsersView.userID = $(e.relatedTarget).attr('data-id');
            appData.views.UsersView.selectedUser = $(e.relatedTarget).parent().parent();
            
            var myUser = appData.collections.users.where({'user_id': appData.views.UsersView.userID})[0];
            $('#remove-modal h4 span').text(myUser.attributes.name);
        });

        $('#remove').click(function(){
            Backbone.on('removeUserHandler', appData.views.UsersView.userRemovedHandler);
            appData.services.phpService.removeUser(appData.views.UsersView.userID);
            $(appData.views.UsersView.selectedUser).hide(400);
        });
    }

});


appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "activity-edit/:id":"activityedit",
        "users":            "users",
        "loading":          "loading",
        "challenges":       "challenges",
        "new-challenge":    "newchallenge",
        "sports":           "sports",
        "new-sport":        "newsport",
        "media":            "media",
        "locations":        "locations",
        "sport-edit/:id":   "sportedit",
        "user-edit/:id":    "useredit",
        "challenge-edit/:id": "challengeedit",
        "location-edit/:id": "locationedit",
        "activity-archive-edit/:id":"activityarchiveedit",
        "new-activity": "newactivity",
        "new-location": "newlocation",
        "settings": "settings",
        "login": "login"
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;


        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    login: function(){
        $('#mainNav li').removeClass('active');
        $('#container').empty().append(new appData.views.LoginView().render().$el);
    },

    home: function () {
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.HomeView().render().$el);
                $('#acBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    challenges: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.ChallengesView().render().$el);
                $('#chBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            } 
        }else{
            window.location.hash = "login";
        }     
    },

    newchallenge: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewChallengeView().render().$el);
                $('#chBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }       
    },

    locations: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
             if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.LocationsView().render().$el);
                $('#lcBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }       
        }else{
            window.location.hash = "login";
        }
    },

    users: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.UsersView().render().$el);
                $('#usBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    settings: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.SettingsView().render().$el);
                $('#setBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    sports: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.SportsView().render().$el);
                $('#spBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    newsport: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewSportView().render().$el);
                $('#spBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    newactivity: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewActivityView().render().$el);
                $('#acBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    newlocation: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewLocationView().render().$el);                    $('#lcBtn').addClass('active');
                $('#lcBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    media: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.MediaView().render().$el);
                $('#mdBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    loading: function(){
        $('#container').empty().append(new appData.views.LoadingView().render().$el);
    },

    sportedit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.sports.where({sport_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.SportEditView({model: selectedActivityModel}).render().$el);
                $('#spBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    useredit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.users.where({user_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.UserEditView({model: selectedActivityModel}).render().$el);
                $('#usBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    challengeedit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.challenges.where({challenge_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.ChallengeEditView({model: selectedActivityModel}).render().$el);
                $('#chBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    locationedit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.locations.where({location_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.LocationEditView({model: selectedActivityModel}).render().$el);
                $('#lcBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    activityedit: function (id) {
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.activities.where({activity_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.ActivityEditView({model: selectedActivityModel}).render().$el);
                $('#acBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    activityarchiveedit: function(id){
        $('#mainNav li').removeClass('active');
        
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.activitiesArchive.where({activity_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.ActivityEditView({model: selectedActivityModel}).render().$el);
                $('#acBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            } 
        }else{
            window.location.hash = "login";
        }
    }
});





/**
* Facebook Services
*/
appData.services.FacebookServices = Backbone.Model.extend({

	initialize: function() {

	},

	facebookConnect: function(){
		try {

            FB.init({
                appId: '595730207182331', // App ID
                status: false // check login status
            });

		} catch (e) {
			alert(e);
		}
	},

	facebookLogin: function(){
		FB.login(function(response) {
			console.log(response);

		   if (response.authResponse) {
		    appData.settings.userLoggedIn = true;
			appData.events.facebookLoginEvent.trigger("facebookLoginHandler");
		   } else {
			alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
		   }
	    },{ scope: "email" });
	},

	facebookWallpost: function(activityModel){

		FB.login(function(response) {
		   if (response.authResponse) {
		   	var token = response.authResponse.accessToken;
			var imgURL= appData.settings.serverPath + activityModel.attributes.url;//change with your external photo ur
	      
			// change after submission 	        FB.api('/100002407717407/photos', 'post', {

	        FB.api('/photos', 'post', {
	            message: activityModel.attributes.omschrijving,
	            access_token: token, 
	            url: imgURL
	        }, function (response) {

	            if (!response || response.error) {
	            	console.log(response);

	                alert('Error occured:' + response);
	            } else {
	            	alert('De foto is op de facebookwall geplaatst');
	            }

	        });

		   } else {
			alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
		   }
	    },{ scope: "email" });
	}
});

/**
* PHP Services
*/
appData.services.PhpServices = Backbone.Model.extend({

	initialize: function() {

	},

	adminlogin: function(user){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.getAdminService,
			type:'POST',
			dataType:'json',
			data: "email="+user.attributes.email+"&password="+user.attributes.password,
			timeout:60000,
			success:function(data){

				if(data.status === true){
					Backbone.trigger('loginSucces');
				}else{
					Backbone.trigger('loginError');
				}
			},
			error: function(){
			}
		});
  	},

	createActivity: function(activityModel){
		var that = this;

		$.ajax({
        url:appData.settings.servicePath + appData.settings.createActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&stopTime="+activityModel.attributes.stopTime+"&user_id="+0+"&participants="+activityModel.attributes.participants,
        timeout:60000,
	        success:function(data){
	        	if(data.value === true){
	        		Backbone.trigger('activityCreated', data.activity_id);
	        		appData.services.avatarService.addScore("create");
	        	}else{

	        	}
	        },
	        error: function(){
	        	alert('errr');
	        }
    	});
	},

	updateActivity: function(activityModel){
		var that = this;

		console.log(activityModel.attributes);

		$.ajax({
        url:appData.settings.servicePath + appData.settings.updateActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+
        "&activity_id="+activityModel.attributes.activity_id+
        "&title="+activityModel.attributes.title+
        "&sport_id="+activityModel.attributes.sport_id+
        "&description="+activityModel.attributes.description+
        "&date="+activityModel.attributes.date+
        "&time="+activityModel.attributes.time+
        "&stopTime="+activityModel.attributes.stopTime+
        "&user_id="+activityModel.attributes.user_id+
        "&participants="+activityModel.attributes.participants,
	        success:function(data){
	        	console.log(data);
	        	if(data.value === true){
	        		Backbone.trigger('activityUpdatedHandler', data.activity_id);
	        	}else{

	        	}
	        },
	        error: function(){
	        	alert('errr');
	        }
    	});
	},

  	getMedia: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMediaService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){

				var media = new MediaCollection(data);
				appData.events.getMediaSuccesEvent.trigger("mediaLoadSuccesHandler", media);
			}
		});
  	},

  	getAllMedia: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getAllMediaService,
			type:'POST',
			dataType:'json',
			success:function(data){

				appData.collections.mediaCollection = new MediaCollection(data);
				Backbone.trigger("mediaLoadSuccesHandler", "media");
			}
		});
  	},

	getActivities: function(){

  		$.ajax({
     		url:appData.settings.servicePath + appData.settings.getActivitiesService,
     		type:'GET',
     		dataType:'json',
     		success:function(data){
    			appData.collections.activities = new ActivitiesCollection(data);
					Backbone.trigger('getActivitiesHandler', 'activities');
        	}
    	});
  	},

	getAcitvitiesArchive: function(){

  		$.ajax({
     		url:appData.settings.servicePath + appData.settings.getOldActivitiesService,
     		type:'GET',
     		dataType:'json',
     		success:function(data){
    			appData.collections.activitiesArchive = new ActivitiesCollection(data);
				Backbone.trigger('getActivitiesArchiveHandler', 'activitiesArchive');
        	}
    	});
  	},



  	getSports: function(){
        $.ajax({
        	url:appData.settings.servicePath + appData.settings.getSportsService,
            type:'GET',
            dataType:'json',
            success:function(data){
                appData.collections.sports = new SportsCollection(data);
      			Backbone.trigger('getSportsHandler', "sports");
         	}
    	});
  	},

  	getBuurten: function(){
        $.ajax({
        	url:appData.settings.servicePath + appData.settings.getBuurtenService,
            type:'GET',
            dataType:'json',
            success:function(data){
                appData.collections.buurten = new BuurtenCollection(data);
         		appData.events.getBuurtenEvent.trigger("buurtenLoadedHandler");
         	}
    	});
  	},

  	getChallenges: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getAllChallengesService,
			type:'POST',
			dataType:'json',
			success:function(data){
				appData.collections.challenges = new ChallengesCollection(data);
         		Backbone.trigger('getChallengesHandler', "challenges");
			}
		});
  	},

  	getUsers: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUsersService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.users = new UsersCollection(data);
      			Backbone.trigger('getUsersHandler', "users");
			}
		});
  	},

  	getActivityUsers: function(activityModel){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getActivityUserService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){
				Backbone.trigger('activityUsersSuccesEvent', data);
			},error: function(){
			}
		});
  	},

  	getLocations: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getLocationsService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.locations = new LocationsCollection(data);
				Backbone.trigger("getLocationsHandler", "locations");

			}
		});
  	},

  	addFavouriteSportsService: function(selectedSports){
  		  $.ajax({
			url:appData.settings.servicePath + appData.settings.addFavouriteSportsService,
			type:'POST',
			dataType:'json',
			data: "favourite_sports="+JSON.stringify(selectedSports)+"&user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
      			Backbone.trigger('addFavouriteSportsHandler');

			}, error: function(error){
				console.log(error);
			}
		});
  	},

  	addLocation: function(location, coordinates, description){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addLocationService,
			type:'POST',
			dataType:'json',
			data: "location="+location+"&coordinates="+coordinates+"&description="+description,
			timeout:60000,
			success:function(data){
				if(data.value === true){
					Backbone.trigger('addedLocationSuccesEvent', data.location_id);
				}else{

				}
			}
		});
  	},

  	getUserChallenges: function(user_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getUserChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
        		Backbone.trigger('getUserChallengesCompleteHandler');
			}
		});
  	},

  	updateAvatar: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.updateAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&strength_score="+appData.models.userModel.attributes.strength_score+"&stamina_score="+appData.models.userModel.attributes.stamina_score+"&equipment_score="+appData.models.userModel.attributes.equipment_score,
			success:function(data){
				Backbone.trigger('updateAvatarCompleteHandler');
			}
		});
  	},

  	getMyChallengesHandler: function(){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myChallenges = new ChallengesCollection(data);
				Backbone.trigger('getMyChallengesHandler');
			}
		});
  	},

  	joinChallenge: function(challenge_id){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.joinChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id,
			success:function(data){
				Backbone.trigger('joinedChallengeHandler');
				appData.services.avatarService.addScore("challenge");
			}, error: function(){
				alert('error');
			}
		});
  	},

  	addSport: function(sportModel){

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.addSportService,
			type:'POST',
			dataType:'json',
			data: "icon="+sportModel.attributes.icon+"&sport_title="+sportModel.attributes.sport_title+"&description="+"",
			success:function(data){
				console.log(data);
				Backbone.trigger('addedSportHandler', data);
			}
  		});
  	},

  	addChallenge: function(challengeModel){

  		console.log(challengeModel);

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.addChallengeService,
			type:'POST',
			dataType:'json',
			data: "title="+challengeModel.attributes.title+"&deadline="+challengeModel.attributes.deadline+"&badge_url="+challengeModel.attributes.badge_url+"&challengeData="+JSON.stringify(challengeModel.attributes.challengeData)+"&description="+challengeModel.attributes.description,
			success:function(data){
				console.log(data);
				Backbone.trigger('addedChallengeHandler');
			}
  		});
  	},

  	updateChallenge: function(challengeModel){


  		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateChallengeService,
			type:'POST',
			dataType:'json',
			data: "challenge_id=" + challengeModel.attributes.challenge_id +"&title="+challengeModel.attributes.title+"&deadline="+challengeModel.attributes.deadline+"&badge_url="+challengeModel.attributes.badge_url+"&challengeData="+JSON.stringify(challengeModel.attributes.challengeData)+"&description="+challengeModel.attributes.description,
			success:function(data){
				console.log(data);
				Backbone.trigger('updateChallengeHandler');
			}
  		});
  	},


  	updateUser: function(userModel){


  		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateUserService,
			type:'POST',
			dataType:'json',
			data: "user_id=" + userModel.attributes.user_id +"&name="+userModel.attributes.name+"&gender="+userModel.attributes.gender+"&avatar="+userModel.attributes.avatar+"&age="+userModel.attributes.age+"&admin="+userModel.attributes.admin,
			success:function(data){

				console.log(data);
				Backbone.trigger('userUpdatedHandler');
			}
  		});
  	},


  	removeActivity: function(activity_id){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeActivityService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activity_id,
			success:function(data){
				Backbone.trigger('removeActivityHandler');
			}
  		});
  	},

  	removeUser: function(user_id){

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeUserService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
				Backbone.trigger('removeUserHandler');
			}
  		});
  	},

  	removeLocation: function(location_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeLocationService,
			type:'POST',
			dataType:'json',
			data: "location_id="+location_id,
			success:function(data){
				Backbone.trigger('removeLocationHandler');
			}
		});
  	},

  	removeSport: function(sport_id){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeSportService,
			type:'POST',
			dataType:'json',
			data: "sport_id="+sport_id,
			success:function(data){
				Backbone.trigger('removeSportHandler');
			}
		});
  	},

  	removeMedia: function(media_id){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeMediaService,
			type:'POST',
			dataType:'json',
			data: "media_id="+media_id,
			success:function(data){
				Backbone.trigger('removeMediaHandler');
			}
		});
  	},

  	removeChallenge: function(challenge_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeChallengeService,
			type:'POST',
			dataType:'json',
			data: "challenge_id="+challenge_id,
			success:function(data){
				Backbone.trigger('removeChallengeHandler');
			}
		});
  	},

  	uploadSportAvatar: function(files){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.uploadSportNonNative + "?files",
			type:'POST',
			cache: false,
			dataType:'json',
			data: files,
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		    success: function(data, textStatus, jqXHR)
		    {
		    	if(typeof data.error === 'undefined')
		    	{
		    		// Success so call function to process the form
		    		console.log(data);
		    		Backbone.trigger('fileUploadedEvent', data);
		    	}
		    	else
		    	{
	    			Backbone.trigger('fileErrorEvent');		    		
		    		// Handle errors here
		    		console.log('ERRORS: ' + data.error);
		    	}
		    },
		    error: function(jqXHR, textStatus, errorThrown)
		    {
	    		Backbone.trigger('fileErrorEvent');
		    	console.log('ERRORS: ' + textStatus);
		    	// STOP LOADING SPINNER

                alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
	
		    }
		});	
    },

  	uploadChallengeAvatar: function(files){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.uploadChallengeNonNative + "?files",
			type:'POST',
			cache: false,
			dataType:'json',
			data: files,
			processData: false, // Don't process the files
			contentType: false, // Set content type to false as jQuery will tell the server its a query string request
		    success: function(data, textStatus, jqXHR){

		    	if(typeof data.error === 'undefined')
		    	{

		    		// Success so call function to process the form
		    		console.log(data);
		    		Backbone.trigger('fileUploadedEvent', data);
		    	}
		    	else
		    	{
	    			Backbone.trigger('fileErrorEvent');
		    		console.log('ERRORS: ' + data.error);
					
					alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
		    	}
		    },
		    error: function(jqXHR, textStatus, errorThrown)
		    {

	           alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
	
	    		Backbone.trigger('fileErrorEvent');		    	
		    	// Handle errors here
		    	console.log('ERRORS: ' + textStatus);
		    	// STOP LOADING SPINNER
		    }
		});	
    },

    updateSport: function(sportsModel){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateSportService,
			type:'POST',
			dataType:'json',
			data: "sport_id="+sportsModel.attributes.sport_id+"&icon="+sportsModel.attributes.icon+"&sport_title="+sportsModel.attributes.sport_title,
			success:function(data){
				Backbone.trigger('updateSportModel');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    removeUserFromActivity: function(user_id, activity_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeUserFromActivityService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id+"&activity_id="+activity_id,
			success:function(data){
				Backbone.trigger('userRemoved');
			}, error: function(){
				console.log("error");

			}
		});	
    },

    uploadMediaNonNative: function(files){
	$.ajax({
		url:appData.settings.servicePath + appData.settings.uploadMediaNonNativeAdminService + "?files",
		type:'POST',
		cache: false,
		dataType:'json',
		data: files,
		processData: false, // Don't process the files
		contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	    success: function(data, textStatus, jqXHR)
	    {
	    	if(typeof data.error === 'undefined')
	    	{
	    		// Success so call function to process the form
	    		Backbone.trigger('fileUploadedEvent', data);
	    	}
	    	else
	    	{
	    		// Handle errors here
	    		Backbone.trigger('fileErrorEvent');
	    		console.log('ERRORS: ' + data.error);
    		      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');

	    	}
	    },
	    error: function(jqXHR, textStatus, errorThrown)
	    {
	   		Backbone.trigger('fileErrorEvent');
  			alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');

  			console.log(jqXHR);
  			console.log(errorThrown);

	    	// Handle errors here
	    	console.log('ERRORS: ' + textStatus);
	    	// STOP LOADING SPINNER
	    }
	});	
}

});


/**
* Facebook Services
*/
appData.services.UtilServices = Backbone.Model.extend({

	initialize: function() {

	},

	getNetworkConnection: function(){
		// check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
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
				Backbone.trigger('getLatLonSuccesHandler', location);

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
			alert('update');

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


appData.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (appData.views[view]) {
                deferreds.push($.get('public/templates/' + view + '.html', function(data) {
                    appData.views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });


        $.when.apply(null, deferreds).done(callback);
    }



    // The public API
    return {
        load: load
    };


}());

})();