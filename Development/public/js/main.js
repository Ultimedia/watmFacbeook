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
  garbage: {}
};

// settings
appData.settings.rootPath = "http://localhost/";
appData.settings.servicePath =  appData.settings.rootPath + "services/";
appData.settings.imagePath = appData.settings.rootPath + "common/img/";
appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
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

appData.settings.dataLoaded = false;
appData.settings.userLoggedIn = false;

// messages
appData.messages.passwordIncorrect = "Je paswoord is niet correct";
appData.messages.noUser = "Er werd geen gebruiker met dit email adres gevonden, je kan <a href='#createUser'>hier</a> een nieuwe gebruiker aanmaken.";

/* Jquery Document Read */
$(document).on("ready", function () {
  document.addEventListener("deviceready", onDeviceReady, false);

  // phonegap device ready
  function onDeviceReady() {
      // Now safe to use the PhoneGap API
      appData.settings.phonegapLoaded = true;
  }


  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardView", "PlannerView", "ProfileView", "ActivityDetailView", "CreateActivityView", "CreateUserView", "NavigationView", "SettingsView", "SportSelectorView", "DashboardActivityView", "LoadingView", "HelperView", "ChallengeListView", "ActivityMessageView", "ActivityMessageView", "ActivityInfoView", "ActivityMediaView", "ActivityMessagesView", "ActivityMediaViewer", "ActivityInfoView", "CreateActivityLocationView", "CreateActivityInfoView", "CreateActivityWieView", "ProfileAvatarView", "ProfileChallengeView", "ProfileFriendsView", "FriendsListView", "FriendView", "ActivityUserView", "PlannerMyActivitiesView", "GoogleMapView", "FavouriteSportListView"],

  // backbone loaded
  function () {

      appData.models.userModel = new User();

      appData.forms.sortOptions = [{"title": "Datum"},{"title": "Afstand"}];
      appData.collections.sortOptions = new SortOptionsCollection(appData.forms.sortOptions);

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
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
      appData.events.getLocationsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getLatLonEvent = _.extend({}, Backbone.Events);


      appData.services.facebookService = new appData.services.FacebookServices();
      appData.events.facebookLoginEvent = _.extend({}, Backbone.Events);
      appData.events.facebookLoginErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataErrorEvent = _.extend({}, Backbone.Events);


      appData.services.utilService = new appData.services.UtilServices();
      appData.events.locationHomeEvent = _.extend({}, Backbone.Events);
      appData.events.locationCreateActivityEvent = _.extend({}, Backbone.Events);



      // Create a new instance of the helperclass
      appData.helpers.phonegapHelper = new appData.views.HelperView();

      if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        appData.settings.rootPath = "http://172.30.39.12/";
        appData.settings.servicePath =  appData.settings.rootPath + "services/";
        appData.settings.imagePath = appData.settings.rootPath + "common/img/";
        appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";

        appData.settings.native = true;
        appData.settings.pictureSource = navigator.camera.PictureSourceType;
        appData.settings.destinationType = navigator.camera.DestinationType;

        // check to see if there is a working connection
        checkConnection();

      } else {
        appData.settings.native = false;
      }

      appData.services.facebookService.facebookConnect();

      // init backbone
      Backbone.history.start();
  });


  // check if there is a working internet / 3G / 4G / WIFI connection to enable the dynamic mode
  function checkConnection() {
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
		title: "",
		user_id: "",
		buurt_id: "4"
    },

	initialize: function(){
		
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
		"object_class": ""
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
	    facebook_data: {},
	    facebookUser: false,
	    friends: [],
	    avatar :'common/img/avatar.png',
	    current_location: "50.827404, 3.254647"
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
    }  ,


    sort_by_attribute: function(sort_key) {
        this.sort_key = sort_key;
        this.sort();
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

appData.views.ActivityDetailView = Backbone.View.extend({

    initialize: function () {
      console.log('----- In the initialize of ActivityDetailView -----');
      appData.views.ActivityDetailView.model = this.model;
    }, 


    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentPageHTML = this.$el;

      this.currentActivityPage = '#praktischContent';
      
      // add the default page
      var defaultView = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
      $('#activityContent', appData.settings.currentPageHTML).empty().append(defaultView.render().$el);

      // user is admin? (show edit options)
      if(appData.models.userModel.get("user_id") == this.model.get("user_id")){
        $('#editPanel', appData.settings.currentPageHTML).removeClass('hide');
      }

      this.addMap();

      return this; 
    }, 

    addMap: function(){
        appData.settings.mapAdded = true;
        
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var map = new google.maps.Map($('#activityMap',appData.settings.currentPageHTML)[0], mapOptions);
        var coordinates = this.model.attributes.coordinates.split(',');
        
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(coordinates[0], coordinates[1]),
          map:  map,
          title: 'Huidige locatie'
        });

        // resize and relocate map
        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

    },

    events: {
      "click #activityDetailTabs .cl-btn": "activeDetailTabsHandler",
      "click #navigateButton": "navigateClickHandler",
      "click #backButton": "backHandler"
    },

    backHandler: function(){
      window.history.back();
    },

    navigateClickHandler: function(){
      appData.router.navigate('navigater', true);
    },

    activeDetailTabsHandler: function(evt) { 
        // tab on activity detail
        $('#activityDetailTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#praktischContent":
            view = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
          break;

          case "#mediaContent":
            view = new appData.views.ActivityMediaView({model : appData.views.ActivityDetailView.model});
          break;

          case "#messagesContent":
            view = new appData.views.ActivityMessagesView({model : appData.views.ActivityDetailView.model});
          break;
        }

        
        $('#activityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    }

});



appData.views.ActivityInfoView = Backbone.View.extend({

    initialize: function () {
        appData.events.goinToActivitySuccesEvent.bind("goingToActivitySuccesHandler", this.goingToActivitySuccesHandler)
        appData.models.activityModel = this.model;
        
        Backbone.on('activityUsersSuccesEvent', this.getActivityUsersSuccesHandler);
        appData.services.phpService.getActivityUsers(this.model); 
    },

    render: function() { 
    	this.$el.html(this.template(this.model.attributes));
    	appData.settings.currentModuleHTML = this.$el;

        $('#praktischContent .radio-list input[type="radio"]', this.$el).change(function() {
                    // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');

            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];

                appData.services.phpService.setGoingToActivity(appData.models.activityModel.attributes.activity_id, selectedData);
        });

        return this; 
    },



    getActivityUsersSuccesHandler: function(data){
        appData.models.activityModel.userData = new UsersCollection(data);

        // 1 set toggle switch for going
        var goingTo = appData.models.activityModel.userData.where({user_id:appData.models.userModel.attributes.user_id.toString()});
            goingTo = goingTo[0];

        if(goingTo){
            if(goingTo.length > 0){
                $('#praktischContent .radio-list label').removeClass('checked');
                $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).parent().addClass('checked');
                $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).prop('checked', true);
            }
        }

        // 2 show friends that are going
        $('#aanwezigContent').empty();
        appData.views.ActivityInfoView.userListView = [];
        appData.views.ActivityDetailView.model.attributes.users = data;
        $(appData.views.ActivityDetailView.model.attributes.users).each(function(index,userModel) {
          appData.views.ActivityInfoView.userListView.push(new appData.views.ActivityUserView({
            model : userModel
        }));

        $('#aanwezigContent', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityInfoView.userListView).each(function(dv) {

          $('#aanwezigContent', appData.settings.currentModuleHTML).append(dv.render().$el);
        });
      });

        Backbone.off('activityUsersSuccesEvent', appData.views.ActivityInfoView.getActivityUsersSuccesHandler);
    }
});



appData.views.ActivityMediaViewer = Backbone.View.extend({

    initialize: function () {

    },

    render: function() { 
    	this.$el.html(this.template(this.model.attributes));
      return this; 
    }
});



appData.views.ActivityMessageView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }

});


appData.views.ActivityMessagesView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    	appData.services.phpService.getMessages(this.model); 
    }, 

    render: function() { 
    	// model to template
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
      this.setValidators();

      return this; 
    },

    events: {
      "click #messageSubmit": "messageSubmitHandler"
    },

    postMessageSuccesHandler: function(){
      // update messages
      appData.services.phpService.getMessages(appData.views.ActivityDetailView.model);  
    },

    chatMessagesLoadSuccesHandler: function(messages){

        appData.views.ActivityDetailView.messagesListView = [];
        appData.views.ActivityDetailView.model.attributes.messages = messages;
        appData.views.ActivityDetailView.model.attributes.messages.each(function(message) {
          appData.views.ActivityDetailView.messagesListView.push(new appData.views.ActivityMessageView({
            model : message
          }));
      });

      $('#messagesContent ul', appData.settings.currentModuleHTML).empty();
      _(appData.views.ActivityDetailView.messagesListView).each(function(dv) {
          $('#messagesContent ul', appData.settings.currentModuleHTML).append(dv.render().$el);
      });
    },

    setValidators: function(){
      $("#messageForm",appData.settings.currentModuleHTML).validate({
          submitHandler: function(form) {
            var message = $('#messageInput', appData.settings.currentModuleHTML).val();
            appData.services.phpService.addMessage(message, appData.views.ActivityDetailView.model.attributes.activity_id);   
          }
      });
    },

    messageSubmitHandler: function(){
      $("#messageForm",appData.settings.currentModuleHTML).submit();
    }


});


appData.views.ActivityUserView = Backbone.View.extend({

    initialize: function () {
    
    }, 

    render: function() { 

    	// model to template
    	this.$el.html(this.template(this.model));
        return this; 
    }

});


appData.views.ActivityMediaView = Backbone.View.extend({

    initialize: function () {
      appData.events.getMediaSuccesEvent.bind("mediaLoadSuccesHandler", this.getMediaLoadSuccesHandler);
      appData.services.phpService.getMedia(this.model); 
    },

    events: {
      "click #addMediaButton": "capturePhotoEditHandler"
    },

    getMediaLoadSuccesHandler: function(media){
      console.log(media);

      appData.views.ActivityDetailView.mediaListView = [];
      appData.views.ActivityDetailView.model.attributes.media = media;
      appData.views.ActivityDetailView.model.attributes.media.each(function(mediaModel) {

          var mediaUser = appData.collections.users.where({user_id:mediaModel.attributes.user_id});
              mediaUser = mediaUser[0];
              mediaModel.attributes.userModel = mediaUser.attributes;
              mediaModel.attributes.url = mediaModel.attributes.url;
              mediaModel.attributes.imagePath = appData.settings.imagePath;

          appData.views.ActivityDetailView.mediaListView.push(new appData.views.ActivityMediaViewer({
            model : mediaModel
          }));
      });

      $('#mediaContenListt', appData.settings.currentModuleHTML).empty();
      _(appData.views.ActivityDetailView.mediaListView).each(function(dv) {
          $('#mediaContenListt', appData.settings.currentModuleHTML).append(dv.render().$el);
      });
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
        return this; 
    },

    capturePhotoEditHandler: function() {
      var page = this.$el;

    // Retrieve image file location from specified source
    navigator.camera.getPicture(this.uploadPhoto,
    function(message) { alert('get picture failed'); },
    { quality: 50, 
    destinationType: navigator.camera.DestinationType.FILE_URI,
    sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
    );

    },

    uploadPhoto: function(imageURI) {

      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.png';
      options.mimeType="text/plain";

      var params = new Object();
      options.params = params;



      var ft = new FileTransfer();
      console.log(ft);

      
      ft.upload(imageURI, encodeURI(appData.settings.rootPath + "services/uploadService.php"), this.win, this.fail, options);
    },

    win: function(r) {
        alert('succes');
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    },

    fail: function(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
});



appData.views.ChallengeListView = Backbone.View.extend({

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }

});




appData.views.CreateActivityInfoView = Backbone.View.extend({

    initialize: function () {

    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      
      // Sports autocomplete
      appData.views.CreateActivityInfoView.sportAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentModuleHTML), model: appData.collections.sports, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "sport_id"}).render();
      this.setValidator();

      return this; 
    },

    setValidator: function(){

        $('#wanneerInput', appData.settings.currentModuleHTML).val(new Date().toDateInputValue());

        $("#watForm",appData.settings.currentModuleHTML).validate({
          rules: {
            wanneerInput: {
              date: true
            }
          },
          submitHandler: function(form) {
              appData.views.ActivityDetailView.model.attributes.title = $('#titelInput', appData.settings.currentModuleHTML).val();
              appData.views.ActivityDetailView.model.attributes.date = $('#wanneerInput', appData.settings.currentModuleHTML).val() + " " + $('#timeInput', appData.settings.currentModuleHTML).val();
              appData.views.ActivityDetailView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentModuleHTML).val();

              var tabTarget = {};
                  tabTarget.location = "#waarContent";
                  tabTarget.tab = "#waarTab";

              appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', tabTarget);
         }
      });
    }
});

appData.views.CreateActivityLocationView = Backbone.View.extend({

    initialize: function () {
        appData.events.locationCreateActivityEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationCreateActivityEvent.bind('locationErrorHandler', this.locationErrorHandler);
    
        appData.events.getLatLonEvent.bind('getLatLonSuccesHandler', this.getLatLonSuccesHandler);
        Backbone.on('addedLocationSuccesEvent', this.addedLocationSuccesEvent);

        this.currentMapLocation ="";
        this.wait = false;

        appData.views.CreateActivityLocationView.tabTarget = {};
        appData.views.CreateActivityLocationView.tabTarget.location = "#wieContent";
        appData.views.CreateActivityLocationView.tabTarget.tab = "#wieTab";
    },

    events: {
        "keyup #locationInput": "locationChangeHandler"
    },

    getLatLonSuccesHandler: function(data){
        if(data.geometry){
           appData.views.CreateActivityLocationView.currentMapLocation = data.geometry.location.lat + "," + data.geometry.location.lng;

           var marker = new google.maps.Marker({
              position: new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng),
              map:  appData.views.CreateActivityLocationView.map,
              title: data.formatted_address
            });

            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(data.geometry.location.lat, data.geometry.location.lng), 13);
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
                            appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
                    }

            }else{
                appData.services.utilService.getLatLon($('#locationInput').val());
            }
        }

    },

    addedLocationSuccesEvent: function(location_id){
        appData.views.ActivityDetailView.model.attributes.location_id = location_id;

        console.log(appData.views.ActivityDetailView.model.attributes);

        appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
      appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#locationInput", appData.settings.currentModuleHTML), model: appData.collections.locations, wait: 100, updateModel: appData.views.ActivityDetailView.model, updateID: "location_id"}).render();

      this.setValidators();
      this.initMap();

      return this; 
    },

    initMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(51.20935, 3.22470),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        appData.views.CreateActivityLocationView.map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
    
        if(appData.settings.native){
            appData.services.utilService.getLocationService("createActivity");
        }

    },

    locationSuccesHandler: function(position){


        appData.views.CreateActivityLocationView.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 13);
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          map:  appData.views.CreateActivityLocationView.map,
          title: 'Huidige locatie'
        });

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
                    appData.events.createActivityTabsEvent.trigger('formStageCompleteEvent', appData.views.CreateActivityLocationView.tabTarget);
                }
            }
        });
    }
});

appData.views.CreateActivityView = Backbone.View.extend({

    initialize: function () {
        appData.views.ActivityDetailView.model = new Activity();
        appData.events.createActivityTabsEvent.bind("formStageCompleteEvent", this.formStageCompleteEvent);
    },

    render: function() { 
    	this.$el.html(this.template());
        this.currentActivityPage = '#watContent';

        appData.settings.currentPageHTML = this.$el;
        
        var view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);

        return this; 
    }, 

    formStageCompleteEvent: function(data){

        var location = data.location;
        var tab = data.tab;

        $('#createActivityTabs .cl-btn').removeClass('active');
        $(tab, appData.settings.currentPageHTML).addClass('active');

        // tab on activity detail
        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(location, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = location;

        var view;
        switch(location){
            case "#watContent":
                view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
            break;

            case "#waarContent":
                view = new appData.views.CreateActivityLocationView({ model:  appData.views.ActivityDetailView.model});
            break;

            case "#wieContent": 
                view = new appData.views.CreateActivityWieView({ model:  appData.views.ActivityDetailView.model});
            break;
        }

        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        
    }
});



appData.views.CreateActivityWieView = Backbone.View.extend({
    initialize: function () {

    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
      this.setValidator();
      return this; 
    },

    setValidator: function(){
    	var that = this;
        $("#wieForm",appData.settings.currentModuleHTML).validate({

            submitHandler: function(form){
                appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
            }
        });
    }

});

appData.views.CreateUserView = Backbone.View.extend({

	initialize: function () {
        appData.events.createUserEvent.bind("createUserHandler", this.createUserHandler);
        appData.events.createUserErrorEvent.bind("createUserErrorHandler", this.createUserErrorHandler);
        appData.events.locationHomeEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
    }, 

    render: function() { 
        this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();

    	if(this.model){
    		$('#passwordInput', appData.settings.currentPageHTML).val(this.model.attributes.password);
    		$('#emailInput', appData.settings.currentPageHTML).val(this.model.attributes.email);
    	}
        
        return this; 
    }, 

    createUserHandler: function(){
        appData.router.navigate('dashboard', true);
    },

    createUserErrorHandler: function(){
        alert('cannot create user');
    },

	setValidator: function(){
        $("#createUserForm",appData.settings.currentPageHTML).validate({

    		submitHandler: function(form) {

    			// CreateUser form logic
				var name = $('#nameInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();
				var email = $('#emailInput', appData.settings.currentPageHTML).val();

				appData.models.userModel = new User();
				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);

                if(appData.settings.native){
                    // First lets get the location
                    appData.services.utilService.getLocationService("login");
                }else{
                    appData.services.phpService.createUser();
                }
		  	}
    	});
    },

    locationSuccesHandler: function(location){
        appData.models.userModel.set('current_location', location);
        appData.services.phpService.createUser();
    },

    locationErrorHandler: function(){
         appData.services.phpService.createUser();
    }

});

appData.views.DashboardActivityView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }

});







appData.views.DashboardView = Backbone.View.extend({

    initialize: function () {
        var that = this;
        this.searching = false;
     
        appData.events.updateActivitiesEvent.bind("activitiesUpdateHandler", this.activitiesUpdateHandler);        
        appData.collections.activities.sort_by_attribute('sql_index');

        this.generateAcitvitiesCollection();
    },

    events: {
        "change #sortActivities": "sortActivitiesChangeHandler",
        "click #searchButton": "toggleSearchHandler",
        "keyup #searchInput": "searchHandler"
    },

    activitiesUpdateHandler: function(){
        this.generateAcitvitiesCollection();
    },

    generateAcitvitiesCollection: function(){
        appData.views.activityListView = [];

        var selectedCollection;
        if(this.searching){
            $(appData.collections.activitiesSearch).each(function(index, activity) {
              appData.views.activityListView.push(new appData.views.DashboardActivityView({
                model : activity
              }));
            });

        }else{
            appData.collections.activities.each(function(activity) {
              appData.views.activityListView.push(new appData.views.DashboardActivityView({
                model : activity
              }));
            });
        }

        $('#activityTable', appData.settings.currentPageHTML).empty();
        _(appData.views.activityListView).each(function(dv) {
            $('#activityTable', appData.settings.currentPageHTML).append(dv.render().$el);
        });
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
    sortActivitiesChangeHandler: function(){
        
        switch($("#sortActivities")[0].selectedIndex){
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
        }

        this.generateAcitvitiesCollection();
    },

    render: function () {

        var view = this;

        this.$el.html(this.template({sortForm: appData.collections.sortOptions.toJSON()}));
        appData.settings.currentPageHTML = this.$el;

        this.generateAcitvitiesCollection();
        return this;
    }
});



appData.views.FavouriteSportListView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.toJSON()));
        return this; 
    }

});




appData.views.FriendView = Backbone.View.extend({

    initialize: function () {
      console.log('----- In the initialize of FriendView -----');
      appData.views.FriendView.model = this.model;
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentPageHTML = this.$el;
      return this; 
    }, 

    events: {
      "click #backButton": "backHandler"
    },

    backHandler: function(){
      window.history.back();
    },

});



appData.views.FriendsListView = Backbone.View.extend({

    initialize: function () {
 	
    },

    render: function () {
    	// model to template
    	console.log(this.model.attributes);
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    }
});

appData.views.GoogleMapView = Backbone.View.extend({

    initialize: function () {



    }, 

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentPageHTML = this.$el;

       var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(14, 10),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      }

        appData.settings.mapAdded = true;
        var map = new google.maps.Map($('#map',appData.settings.currentPageHTML)[0], mapOptions);      

      return this; 
    }
});



appData.views.HelperView = Backbone.View.extend({

    initialize: function () {
    }, 

    getLocation: function(){

    }
});


appData.views.HomeView = Backbone.View.extend({

    initialize: function () {
        appData.events.userLoggedInEvent.bind("userLoggedInHandler", this.userLoggedInHandler);
        appData.events.userLoggedInErrorEvent.bind("userLoggedInErrorHandler", this.userLoggedInErrorHandler);
        appData.events.userLoggedInPasswordErrorEvent.bind("userLoggedInPasswordErrorHandler", this.userLoggedInPasswordErrorHandler);
        appData.events.facebookLoginEvent.bind("facebookLoginHandler", this.facebookLoginHandler);
        appData.events.facebookLoginErrorEvent.bind("facebookLoginErrorHandler", this.facebookLoginErrorHandler);
        appData.events.facebookGetFriendsEvent.bind("facebookGetFriendsHandler", this.facebookGetFriendsHandler);
        appData.events.facebookGetFriendsErrorEvent.bind("userLoggedInPasswordErrorHandler", this.facebookGetFriendErrorHandler);
        appData.events.facebookGetProfileDataEvent.bind("facebookProfileDataHandler", this.facebookProfileDataHandler);
        appData.events.getUserFromFacebookIDEvent.bind("facebookGetIDHandler", this.facebookGetIDHandler)
        appData.events.facebookUserToSQLEvent.bind('facebookUserToSQLSuccesHandler', this.facebookUserToSQLSuccesHandler);
        appData.events.locationHomeEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
    },

    render: function() { 
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();
        return this; 
    },

    events: {
        "click #FBloginButton": "facebookClickHandler",
        "submit #loginForm": "loginFormSubmitHandler"
    },

	setValidator: function(){
    	$("#loginForm",appData.settings.currentPageHTML).validate({
    		submitHandler: function(form) {
			 	// Store page
				var email = $('#emailInput', appData.settings.currentPageHTML).val();
				var password = $('#passwordInput', appData.settings.currentPageHTML).val();

				appData.models.userModel.set('email', email);
				appData.models.userModel.set('password', password);

                appData.services.phpService.userLogin();
		  	}
    	});
    },

    /**
    * Facebook login flow 
    */
    facebookUserToSQLSuccesHandler: function(){
        appData.router.navigate('loading', true);
    },

    facebookGetIDHandler: function(newUser){
        if(!newUser.facebook_user){
            console.log("nieuwe gebruiker");

            if(appData.settings.native){
                // First lets get the location
                appData.services.utilService.getLocationService("login");
            }else{
                appData.services.facebookService.facebookUserToSQL();
            }

        }else{
            appData.models.userModel.set('user_id', newUser.user_id);

            if(appData.settings.native){
                appData.services.utilService.getLocationService("login");
            }else{
                appData.router.navigate('loading', true);
            }

            // Excisting user, do nothing for now
            appData.router.navigate('loading', true);          
        }
    },

    locationSuccesHandler: function(location){
        var myLocation = location.coords.coordinates.latitude + "," + location.coords.coordinates.longitude;

        appData.models.userModel.set('current_location', myLocation);
        appData.services.facebookService.facebookUserToSQL();
    },

    locationErrorHandler: function(){
        appData.services.facebookService.facebookUserToSQL();
    },

    facebookProfileDataHandler: function(){
        // get friends
        appData.services.facebookService.getFacebookFriends();
    },

    facebookLoginHandler: function(){
        // fetch profile data
        appData.services.facebookService.getProfileData();
    },

    facebookGetFriendsHandler: function(){
        // finished loading facebook data, forward to login screen
        appData.services.facebookService.getUserFromFacebookID();
    },

    facebookClickHandler: function(){
        appData.services.facebookService.facebookLogin();
    },

    facebookLoginErrorHandler: function(){
        alert('error loggin on to facebook')
    },

    facebookGetFriendErrorHandler: function(){
        alert('error getting friends from facebook');
    },

    /**
    * Normal Login flow
    */
    userLoggedInHandler: function(){
        $('#loginForm .error-box', appData.currentPageHTML).removeClass('show').addClass('hide');
        appData.router.navigate('loading', true);
    },

    userLoggedInPasswordErrorHandler: function(){
        $('#loginForm .error-box', appData.currentPageHTML).html(appData.messages.passwordIncorrect).removeClass('hide').addClass('show');
    },

    userLoggedInErrorHandler: function(){
        appData.router.navigate('createUser', true);
    }

});

appData.views.LoadingView = Backbone.View.extend({

    initialize: function () {
        appData.events.getActivitiesSuccesEvent.bind("activitiesLoadedHandler", this.activitiesLoadedHandler);
        appData.events.getSportsSuccesEvent.bind("sportsLoadedHandler", this.sportsLoadedHandlers);
        appData.events.getChallengesSuccesEvent.bind("challengesLoadedHandler", this.challengesLoadedHandler);
        appData.events.getUsersSuccesEvent.bind("usersLoadedHandler", this.usersLoadedHandler)
        appData.events.getBuurtenEvent.bind("buurtenLoadedHandler", this.buurtenLoadedHandler);
        appData.events.getLocationsSuccesEvent.bind("getLocationsSuccesHandler", this.getLocationsSuccesHandler);
        Backbone.on('myPlannedActivitiesLoadedHandler', this.getMyPlannedActivitiesLoadedHandler);
        Backbone.on('myActivitiesLoadedHandler', this.getMyActivitiesLoadedHandler);
        Backbone.on('getFavouriteSportsHandler', this.getFavouriteSportsHandler)
        Backbone.on('getMyFavouriteSportsHandler', this.getMyFavouriteSportsHandler)

    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
    	appData.settings.currentPageHTML = this.$el;

        // load the data
        appData.services.phpService.getActivities(true);
        return this;
    },
    activitiesLoadedHandler: function(){
        appData.services.phpService.getSports();
    },

    sportsLoadedHandlers: function(){
        appData.services.phpService.getChallenges();
    },

    challengesLoadedHandler: function(){
        appData.services.phpService.getUsers();
    },

    usersLoadedHandler: function(){
        appData.services.phpService.getBuurten();
    },

    buurtenLoadedHandler: function(){
        appData.services.phpService.getLocations();
    },

    getLocationsSuccesHandler: function(){
        appData.services.phpService.getMyPlannedActivities();
    },

    getMyPlannedActivitiesLoadedHandler: function(){
      Backbone.off('myPlannedActivitiesLoadedHandler');
      appData.services.phpService.getMyActivities();
    },

    getMyActivitiesLoadedHandler: function(){
      Backbone.off('myActivitiesLoadedHandler');
      appData.services.phpService.getFavouriteSports();
    },

    getFavouriteSportsHandler: function(){
        appData.services.phpService.getUserFavouriteSports();
        Backbone.off('getFavouriteSportsHandler');
    },

    getMyFavouriteSportsHandler: function(){
        Backbone.off('getMyFavouriteSportsHandler');
        appData.settings.dataLoaded = true;

        console.log(appData.collections);

        if(appData.collections.myFavouriteSports.length > 0){
            appData.router.navigate('sportselector', true);
        }else{
            appData.router.navigate('sportselector', true);
        }

    }
});


appData.views.NavigationBusView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      return this;
    }

});




appData.views.NavigationMapView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      this.setMap();

      return this;
    }, 

    setMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.views.ActivityDetailView.model.attributes.coordinates,
            destination: appData.models.userModel.attributes.current_location,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    }

});




appData.views.NavigationView = Backbone.View.extend({

    initialize: function () {
        _.bindAll(this, 'beforeRender', 'render', 'afterRender'); 
        var _this = this; 
        this.render = _.wrap(this.render, function(render) { 
            _this.beforeRender(); 
            render(); 
            _this.afterRender(); 
            return _this; 
        }); 
    }, 

    beforeRender: function() { 
    }, 

    render: function() { 
        this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;
        this.currentActivityPage = '#googleMap';
        return this; 
    }, 

    events: {
        "click #navigationTabs .cl-btn": "navigationTabsHandler",
        "click .back-button": "back"
    },

    navigationTabsHandler: function(evt){
        // tab on activity detail
        $('#navigationTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');

        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(selectedPage, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = selectedPage;
    },

    afterRender: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.views.ActivityDetailView.model.attributes.coordinates,
            destination: appData.models.userModel.attributes.current_location,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    },

    back: function(event) {
        window.history.back();
        return false;
    }


});




appData.views.PlannerMyActivitiesView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        return this; 
    }
});

appData.views.PlannerView = Backbone.View.extend({

  initialize: function () {
    Backbone.on('myPlannedActivitiesLoadedHandler', this.updatePlanner);
    Backbone.on('myActivitiesLoadedHandler', this.updatePlannerComplete);

    appData.services.phpService.getMyPlannedActivities();
  },

  updatePlanner: function(){
    appData.services.phpService.getMyActivities();
  },

  updatePlannerComplete: function(){
    Backbone.off('myPlannedActivitiesLoadedHandler', this.updatePlanner);
    Backbone.off('myActivitiesLoadedHandler', this.updatePlannerComplete);

    appData.views.PlannerView.myActivitiesView = [];
    appData.views.PlannerView.myJoinedActivitiesView = [];

    // get my activities
    appData.collections.myActivities.each(function(activity) {
      appData.views.PlannerView.myActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : activity}));
    });

    // get the activities I'm going to
    appData.collections.myPlannedActivities.each(function(myActivity) {
      appData.views.PlannerView.myJoinedActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : myActivity}));
    });


    if(appData.views.PlannerView.myActivitiesView.length > 0){
      $('#myActivitiesPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myActivitiesTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myActivitiesView).each(function(dv) {
        $('#myActivitiesTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    if(appData.views.PlannerView.myJoinedActivitiesView.length > 0){
      $('#myPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myPlanningTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myJoinedActivitiesView).each(function(dv) {
        $('#myPlanningTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }
  },

  render: function () {
    this.$el.html(this.template());
    appData.settings.currentPageHTML = this.$el;


    return this;
  }
});


appData.views.ProfileAvatarView = Backbone.View.extend({

    initialize: function () {

    },
    
    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;
        return this; 
    }
});

appData.views.ProfileChallengeView = Backbone.View.extend({

    initialize: function () {
        appData.views.challengeListView = [];
        appData.collections.challenges.each(function(challenge) {
        appData.views.challengeListView.push(new appData.views.ChallengeListView({
            model : challenge
          }));
        });
    },

    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;

        _(appData.views.challengeListView).each(function(listView) {
            $('#challengesList', appData.settings.currentModuleHTML).append(listView.render().$el);
        });

        return this; 
    }
});

appData.views.ProfileFriendsView = Backbone.View.extend({
    initialize: function () {
    	appData.views.friendsListView = [];
        $(appData.models.userModel.attributes.friends.models).each(function(index, userModel) {
        	console.log(userModel);

       	appData.views.friendsListView.push(new appData.views.FriendsListView({
            model:userModel
          }));
        });
    },
    
    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;

        console.log(appData.views.friendsListView);

        _(appData.views.friendsListView).each(function(listView) {
            $('#friendsListView', appData.settings.currentModuleHTML).append(listView.render().$el);
        });

        return this; 
    },
});

appData.views.ProfileView = Backbone.View.extend({

    initialize: function () {

    },
    
    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;
        return this; 
    },

    events: {
        "click #profileTabs .cl-btn": "profileTabHandler"
    },

    profileTabHandler: function(evt){ 
    	var page = this.$el;
        var currentActivityPage = '#atleetContent';


        $('#profileTabs .cl-btn', appData.settings.currentPageHTML).removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        currentActivityPage = selectedPage;

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#atleetContent":
            view = new appData.views.ProfileAvatarView();
          break;

          case "#uitdagingenContent":
            view = new appData.views.ProfileChallengeView();
          break;

          case "#vriendenContent":
            view = new appData.views.ProfileFriendsView();
          break;
        }

        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    } 
});

appData.views.SettingsView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
    	console.log(appData.models.userModel.attributes);

        this.$el.html(this.template({user: appData.models.userModel.attributes}));
        appData.settings.currentPageHTML = this.$el;
        return this;
    }
});

appData.views.SportSelectorView = Backbone.View.extend({

    initialize: function () {
        appData.views.SportSelectorView.selectedSports = [];
        Backbone.on('addFavouriteSportsHandler', this.addFavouriteSportsHandler)
    
        appData.views.SportSelectorView.model = this.model;
    },

    render: function() {
    	this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;


        appData.views.SportSelectorView.favouriteSportsViewList = [];

        appData.collections.favouriteSports.each(function(sport){
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));
        });

        var generateGri = this.generateGrid();

        appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentPageHTML), model: appData.collections.sports, wait: 100, updateModel: this.model, updateID: "sport_id", onSelect: function(sport){
            sport.attributes.object_class = "selected";
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));

            $('#favouriteSportList', appData.settings.currentPageHTML).empty();
            _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView) {
                $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);
            });

        }}).render();

        return this;

    },

    generateGrid: function(){
        $('#favouriteSportList', appData.settings.currentPageHTML).empty();
        _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView) {
            $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);
        });
    },

    events: {
      "click #confirm": "confirmSportsHandler",
      "click #favouriteSportList a": "favouriteSportClickHandler"
    },

    favouriteSportClickHandler: function(evt){
        $(evt.target).toggleClass('selected');
    },

    confirmSportsHandler: function(){
        var selectedSports = [];

        $('#favouriteSportList .selected', appData.settings.currentPageHTML).each(function(index, element){
            var sportID = $(element).attr('data-id');
            var model = appData.collections.sports.where({'sport_id': sportID.toString()})
        
            selectedSports.push(model[0]);
        });

        appData.services.phpService.addFavouriteSportsService(selectedSports);
    },

    addFavouriteSportsHandler: function(){
        appData.router.navigate('dashboard', true);
    }
});


appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "dashboard":        "dashboard",
        "planner":          "planner",
        "profile": 			"profile",
        "activity/:id":     "activity",
        "navigater":        "navigater", 
        "createActivity":   "createActivity",
        "createUser":       "createUser",
        "settings":         "settings",
        "sportselector":    "sportselector",
        "loading":          "loading",
        "friend/:id":        "friend"
    },



    initialize: function () {
        appData.slider = new PageSlider($('body'));

        this.routesHit = 0;
        
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    back: function() {
        if(this.routesHit > 1) {
          //more than one route hit -> user did not land to current page directly
          window.history.back();
        } else {
          //otherwise go to the home page. Use replaceState if available so
          //the navigation doesn't create an extra history entry
          this.navigate('/', {trigger:true, replace:true});
        }
    },

    home: function () {
        appData.slider.slidePage(new appData.views.HomeView().render().$el);
    },

    loading: function () {
        appData.slider.slidePage(new appData.views.LoadingView({model: appData.models.userModel}).render().$el);
        
    },
    
    dashboard: function () {

        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){                
                appData.slider.slidePage(new appData.views.DashboardView().render().$el);
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }
    },

    planner: function () {
        if(appData.settings.userLoggedIn){

            appData.slider.slidePage(new appData.views.PlannerView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    profile: function () {
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.ProfileView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    friend: function(id){
        var userModel = appData.collections.users.where({ "user_id": id });
            userModel = userModel[0];

            console.log(userModel);
        
        appData.slider.slidePage(new appData.views.FriendView({model: userModel}).render().$el); 
    },

    activity: function (id) {
        appData.slider.slidePage(new appData.views.ActivityDetailView().render().$el); 
    },

    createActivity: function () {
        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){
                appData.slider.slidePage(new appData.views.CreateActivityView({model: appData.models.userTemplate}).render().$el);
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }

    },

    createUser: function () {
        appData.slider.slidePage(new appData.views.CreateUserView({model: appData.models.userModel}).render().$el);
    },
    
    navigater: function (id) {
        appData.slider.slidePage(new appData.views.NavigationView().render().$el);
    },

    activity: function (id) {
        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){
                var activitiesCollection = appData.collections.activities;
                var selectedActivityModel = activitiesCollection.where({activity_id: id}); 
                    selectedActivityModel = selectedActivityModel[0];

                var view = new appData.views.ActivityDetailView({model: selectedActivityModel});
                    appData.slider.slidePage(view.render().$el);

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "";
        }
    },

    settings: function (id) {
        appData.slider.slidePage(new appData.views.SettingsView().render().$el);
    },

    sportselector: function (id) {
        appData.slider.slidePage(new appData.views.SportSelectorView({ model: new Backbone.Model({"sport_id": ""})}).render().$el);
    },

    checkLoggedIn: function(){

    }
});

/**
* Facebook Services
*/
appData.services.FacebookServices = Backbone.Model.extend({

	initialize: function() {

	},

	facebookConnect: function(){
		if(appData.settings.native){
			// connect facebook API for mobile apps
	        try {
	        	FB.init({ 
	        		appId: "595730207182331", 
	        		nativeInterface: CDV.FB 
	        	});
	        } catch (e) {
	        	alert(e);
	        }
    	}else{
    		try {

	            FB.init({
	                appId: '293375630813769', // App ID
	                status: false // check login status
	            });

			} catch (e) {
				alert(e);
			}
    	}
	},

	facebookUserToSQL: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.facebookUserToSQL,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&name="+appData.models.userModel.attributes.name+"&facebook_data="+JSON.stringify(appData.models.userModel.attributes.facebook_data)+"&facebook_id="+appData.models.userModel.attributes.facebook_id+"&avatar="+appData.models.userModel.attributes.avatar+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.set('user_id', data.user_id);
					appData.events.facebookUserToSQLEvent.trigger("facebookUserToSQLSuccesHandler");

				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

	getUserFromFacebookID: function(){
	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFromFacebookID,
			type:'GET',
			dataType:'json',
			data: "facebook_id="+appData.models.userModel.attributes.facebook_id,
			timeout:60000,
			success:function(data){
				appData.events.getUserFromFacebookIDEvent.trigger("facebookGetIDHandler", data);
			}
		});
	},

	facebookLogin: function(){
		FB.login(function(response) {
			appData.settings.userLoggedIn = true;
			appData.events.facebookLoginEvent.trigger("facebookLoginHandler");
	    },{ scope: "email" });
	},

	getProfileData:function(){
		
		FB.api('/me', {fields:['name','email','username','age_range','gender','hometown','link','favorite_athletes','favorite_teams']}, function(response) {

			// store the date in the user profile
			appData.models.userModel.attributes.facebookUser = true;
			appData.models.userModel.attributes.name = response.name;
			appData.models.userModel.attributes.email = response.email;
			appData.models.userModel.attributes.facebook_data.age_range = response.age_range.min;
			appData.models.userModel.attributes.facebook_data.favorite_athletes = response.favorite_athletes;
			appData.models.userModel.attributes.facebook_data.favorite_teams = response.favorite_teams;
			appData.models.userModel.attributes.facebook_data.gender = response.gender;
			appData.models.userModel.attributes.facebook_data.hometown = response.hometown.name;
			appData.models.userModel.attributes.facebook_data.username = response.name;
			appData.models.userModel.attributes.facebook_id = response.id;
			
			FB.api("/me/picture", function(response) {
				appData.models.userModel.attributes.avatar = response.data.url;
				appData.events.facebookGetProfileDataEvent.trigger("facebookProfileDataHandler");
			});

		});
	},

	getFacebookFriends: function(){
		FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
	    	if (response.error) {
	        	appData.events.facebookGetFriendsErrorEvent.trigger("facebookGetFriendErrorHandler");

	    	} else {

				appData.models.userModel.attributes.friends = new UsersCollection(response.data);

				// succesfully signed in via Facebook
	        	appData.events.facebookGetFriendsEvent.trigger("facebookGetFriendsHandler");
	    	}
		});
	}

});

/**
* PHP Services
*/
appData.services.PhpServices = Backbone.Model.extend({

	initialize: function() {

	},

	createActivity: function(activityModel){
		var that = this;

		$.ajax({
        url:appData.settings.servicePath + appData.settings.createActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&user_id="+appData.models.userModel.attributes.user_id,
        timeout:60000,
        success:function(data){
        	console.log(data);
        	if(data.value === true){
        		that.getActivities(false, data.activity_id)
        	}else{

        	}
        }
    });
	},

	addMessage: function(message, activity_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addMessageService,
			type:'POST',
			dataType:'json',
			data: "message="+message+"&activity_id="+activity_id+"&user_id="+appData.models.userModel.attributes.user_id,
			timeout:60000,
			success:function(data){
				if(data.value === true){
					appData.events.postMessageSuccesEvent.trigger("postMessageSuccesHandler");
				}else{

				}
			}
		});
	},

	createUser: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addUserService,
			type:'POST',
			dataType:'json',
			data: "email="+appData.models.userModel.attributes.email+"&name="+appData.models.userModel.attributes.name+"&password="+appData.models.userModel.attributes.password+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.attributes.user_id = data.id;

					appData.events.createUserEvent.trigger("createUserHandler");
				}else{
					appData.events.createUserErrorEvent.trigger("createUserErrorHandler");
				}
			}
		});
	},

  userLogin: function(){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserService,
			type:'POST',
			dataType:'json',
			data: "name="+appData.models.userModel.attributes.email+"&password="+appData.models.userModel.attributes.password,
			timeout:60000,
			success:function(data){
				if(data.status === true){
					if(data.password){
						// store the userID
						appData.models.userModel.set('name', data.name);
						appData.models.userModel.set('avatar', data.avatar);
						appData.models.userModel.set('user_id', data.value);
						appData.settings.userLoggedIn = true;
						appData.events.userLoggedInEvent.trigger("userLoggedInHandler");
					}else{
						appData.events.userLoggedInPasswordErrorEvent.trigger("userLoggedInPasswordErrorHandler");
					}
				}else{
					appData.events.userLoggedInErrorEvent.trigger("userLoggedInErrorHandler");
				}
			}
		});
  	},

	getMessages: function(activityModel){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMessagesService,
			type:'POST',
			dataType:'json',
			data: "activity_id="+activityModel.attributes.activity_id,
			success:function(data){
				console.log(data);

				var messages = new MessagesCollection(data);
				appData.events.getMessagesSuccesEvent.trigger("chatMessagesLoadSuccesHandler", messages);
			}
		});
  	},

  	getMyPlannedActivities: function(){
  		console.log(appData.models.userModel.attributes.user_id);

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyPlannedActivities,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
    		appData.collections.myPlannedActivities = new ActivitiesCollection(data);
				Backbone.trigger('myPlannedActivitiesLoadedHandler');
			}
		});
  	},

		getMyActivities: function(){
			$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyActivities,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				console.log(data);

				appData.collections.myActivities = new ActivitiesCollection(data);
				Backbone.trigger('myActivitiesLoadedHandler');
			}
		});
		},

		getMyCreatedActivities: function(){
			$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyActivitiesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.myActivities = new ActivitiesCollection(data);
				Backbone.trigger('myActivitiesLoadedHandler');
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

	getActivities: function(initialLoad, forwardID){
  		$.ajax({
     		url:appData.settings.servicePath + appData.settings.getActivitiesService,
     		type:'GET',
     		dataType:'json',
     		success:function(data){
    			appData.collections.activities = new ActivitiesCollection(data);

    			// initialLoad is when the app starts up
    			if(initialLoad){
    				appData.events.getActivitiesSuccesEvent.trigger("activitiesLoadedHandler");
        		}else{
        			// go to an activity after creating it
        			appData.router.navigate('activity/' + forwardID, true);
        		}
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
         		appData.events.getSportsSuccesEvent.trigger("sportsLoadedHandler");
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
			url:appData.settings.servicePath + appData.settings.getChallengesService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.challenges = new ChallengesCollection(data);
         		appData.events.getChallengesSuccesEvent.trigger("challengesLoadedHandler");
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
         		appData.events.getUsersSuccesEvent.trigger("usersLoadedHandler");
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

  	setGoingToActivity: function(activity_id, going){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.setGoingToActivityService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&going="+going+"&activity_id="+activity_id,
			success:function(data){
				Backbone.trigger('goinToActivitySuccesEvent');
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
				appData.events.getLocationsSuccesEvent.trigger("getLocationsSuccesHandler");

			}
		});
  	},

  	getFavouriteSports: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getFavouriteSportsService,
			type:'GET',
			dataType:'json',
			success:function(data){
				appData.collections.favouriteSports = new SportsCollection(data);
      			Backbone.trigger('getFavouriteSportsHandler');
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

  	getUserFavouriteSports: function(){
  		  $.ajax({
			url:appData.settings.servicePath + appData.settings.getUserFavouriteSportsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.myFavouriteSports = new SportsCollection(data);
				console.log(appData.collections.myFavouriteSports);
        		Backbone.trigger('getMyFavouriteSportsHandler');
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
				appData.events.getLatLonEvent.trigger('getLatLonSuccesHandler', location);

			},error: function(){

			}
		});
	},

	getLocationService: function(target){
		// geolocate
		if(appData.settings.native){
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
				}
			}

			// onError Callback receives a PositionError object
			function onError(error) {

				switch(target){
				case "login":
					appData.events.locationHomeEvent.trigger('locationErrorHandler', location);
					break;
				case "createActivity":
					appData.events.locationCreateActivityEvent.trigger('locationSuccesHandler', location);
					break;
				}
			}
		}else{
			appData.events.locationEvent.trigger('locationErrorHandler', location);
		}
	}

});


appData.utils.templates = (function() {

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (appData.views[view]) {
                deferreds.push($.get('dev/templates/' + view + '.html', function(data) {
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