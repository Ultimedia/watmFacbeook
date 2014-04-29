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
