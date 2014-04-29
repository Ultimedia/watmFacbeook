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
appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
appData.settings.promoPath = appData.settings.rootPath + "common/promo/";


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
appData.settings.updateChallengeService = "updateChallengeScore.php";
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


/* Jquery Document Read */
$(document).on("ready", function () {

  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardActivityView", "EditView"],

  // backbone loaded
  function () {

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


appData.views.EditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
    
    },

    render: function() {
    	this.$el.html(this.template({activity: this.model.toJSON()}));
    	appData.settings.currentPageHTML = this.$el;

      return this;
    }
});


appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
      appData.settings.getActivitiesHandler = this.getActivitiesHandler;
    },

    loadedDataHandler: function(payload){
        switch(payload){
          case "users":  
            Backbone.off('getUsersHandler'); 
            appData.settings.usersLoaded = true; 
          break;
          case "sports":  
            Backbone.off('getSportsHandler'); 
            appData.settings.sportsLoaded = true;
          break;
        }

        if(appData.settings.usersLoaded  && appData.settings.sportsLoaded){
          Backbone.off('getSportsHandler');
          Backbone.off('getUsersHandler');

          Backbone.on('getActivitiesHandler', appData.settings.getActivitiesHandler);
          appData.services.phpService.getActivities();
        }
    },
      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      var sportsLoaded, usersLoaded, challengesLoaded = false;

      Backbone.on('getSportsHandler', this.loadedDataHandler)
      appData.services.phpService.getSports();

      Backbone.on('getUsersHandler', this.loadedDataHandler)
      appData.services.phpService.getUsers();

      return this;
    },

    getActivitiesHandler: function(){
      Backbone.off('getActivitiesHandler');

      // show activities
      appData.collections.activities.each(function(activity) {
        console.log(activity)

        var aView = new appData.views.DashboardActivityView({model : activity});

        $('#activity-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });
  }
});


appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "edit/:id":          "edit" 
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;
        
        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    home: function () {
        $('#container').empty().append(new appData.views.HomeView().render().$el);
    },

    edit: function (id) {

      var selectedActivityModel = appData.collections.activities.where({activity_id: id}); 
        selectedActivityModel = selectedActivityModel[0];

        console.log(selectedActivityModel)

        $('#container').empty().append(new appData.views.EditView({model: selectedActivityModel}).render().$el);
    }
});

/**
* PHP Services
*/
appData.services.PhpServices = Backbone.Model.extend({

	initialize: function() {

	},

	updateActivity: function(activityModel){
		var that = this;

		$.ajax({
        url:appData.settings.servicePath + appData.settings.updateActivityService,
        type:'POST',
        dataType:'json',
        data: "location_id="+activityModel.attributes.location_id+"&activity_id="+activityModel.attributes.activity_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&stopTime="+activityModel.attributes.stopTime+"&user_id="+appData.models.userModel.attributes.user_id+"&participants="+activityModel.attributes.participants,
        timeout:60000,
	        success:function(data){
	        	console.log(data);
	        	if(data.value === true){
	        		Backbone.trigger('activityUpdated', data.activity_id);
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

	getActivities: function(){

  		$.ajax({
     		url:appData.settings.servicePath + appData.settings.getActivitiesService,
     		type:'GET',
     		dataType:'json',
     		success:function(data){
    			appData.collections.activities = new ActivitiesCollection(data);
					Backbone.trigger('getActivitiesHandler');
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
			url:appData.settings.servicePath + appData.settings.getChallengesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
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
				appData.events.getLocationsSuccesEvent.trigger("getLocationsSuccesHandler");

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
				alert('errro');
			}
		});
  	},

  	updateChallenge: function(challenge_id, status){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id+"&status="+status,
			success:function(data){
				Backbone.trigger('updateChallengeScore');
			}
  		});
  	},

  	addSport: function(sport_title, description, icon){

  		$.ajax({
			url:appData.settings.servicePath + appData.settings.addSportService,
			type:'POST',
			dataType:'json',
			data: "sport_title="+sport_title+"&description="+description+"&icon="+icon,
			success:function(data){
				Backbone.trigger('addedSportHandler', data);
			}
  		});
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