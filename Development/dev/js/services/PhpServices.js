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
        data: "location_id="+activityModel.attributes.location_id+"&title="+activityModel.attributes.title+"&sport_id="+activityModel.attributes.sport_id+"&description="+activityModel.attributes.description+"&date="+activityModel.attributes.date+"&time="+activityModel.attributes.time+"&stopTime="+activityModel.attributes.stopTime+"&user_id="+appData.models.userModel.attributes.user_id+"&participants="+activityModel.attributes.participants,
        timeout:60000,
	        success:function(data){
	        	if(data.value === true){
	        		Backbone.trigger('activityCreated', data.activity_id);
	        		appData.services.avatarService.addScore("create");
        			appData.services.challengeService.checkChallenges(appData.models.userModel, false, true, false, false);
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
					appData.services.avatarService.addScore("chat");
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
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&password="+appData.models.userModel.attributes.password+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
			timeout:60000,
			success:function(data){
				if(data.value === true){
					// store the userID
					appData.settings.userLoggedIn = true;
					appData.models.userModel.attributes.user_id = data.id;

			    	Backbone.trigger('createUserHandler');
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
						appData.models.userModel.attributes.strength_score = data.strength_score;
						appData.models.userModel.attributes.stamina_score = data.stamina_score;
						appData.models.userModel.attributes.equipment_score = data.equipment_score;
						appData.models.userModel.attributes.avatar = data.avatar;
						appData.models.userModel.attributes.age = data.age;

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
				var messages = new MessagesCollection(data);
      			Backbone.trigger('getMessages', messages);
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
				Backbone.trigger("mediaLoadSuccesHandler", media);
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
        		}else if(forwardID){
        			// go to an activity after creating it
        			appData.router.navigate('activity/' + forwardID, true);
        		}else{
        			Backbone.trigger('dashboardUpdatedHandler');
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
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.challenges = new ChallengesCollection(data);
         		Backbone.trigger('getChallengesHandler');
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
				console.log(appData.collections.users);

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
				appData.models.userModel.attributes.myFavouriteSports = new SportsCollection(data);
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
  	},

  	addPhotoToDatabase: function(imageName, activity_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.addPhotoToDatabase,
			type:'POST',
			dataType:'json',
			data: "url="+imageName+"&user_id="+appData.models.userModel.attributes.user_id+"&type="+1+"&activity_id="+activity_id,
			success:function(data){
        		Backbone.trigger('addPhotoToDatabaseHandler');
				appData.services.avatarService.addScore("media");
			}
		}); 
  	},

  	getMyAvatar: function(){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getMyAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.attributes.avatar_data = data;
        		Backbone.trigger('getAvatarCompleteHandler');
			}
		}); 
  	},

  	getUserAvatar: function(user_id){
  		 $.ajax({
			url:appData.settings.servicePath + appData.settings.getMyAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
        		Backbone.trigger('getUserAvatarCompleteHandler');
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

  	updateSport: function(sportModel){
  	  	$.ajax({
			url:appData.settings.servicePath + appData.settings.updateSportService,
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

  	getMyBadges: function(){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getBadgesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myBadges = new ChallengesCollection(data);
				Backbone.trigger('getMyBadgesHandler');
			}
  		});
  	},

  	getBadges: function(user_id){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getBadgesService,
			type:'POST',
			dataType:'json',
			data: "user_id="+user_id,
			success:function(data){
				Backbone.trigger('getBadgesHandler', data);
			}
  		});
  	},

  	updateChallenge: function(challenge_id, status, completed){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateChallengeService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&challenge_id="+challenge_id+"&status="+JSON.stringify(status)+"&completed="+ completed,
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
  	},

  	getFriends: function(sport_title, description, icon){
  		$.ajax({
			url:appData.settings.servicePath + appData.settings.getFriendsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.models.userModel.attributes.myFriends = new UsersCollection(data);
				Backbone.trigger('getFriendsHandler');
			}, error:function(){
				alert('errr');
			}
  		});
  	},

	addFriend: function(friend_id, friend_from_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.addFriendService,
			type:'POST',
			dataType:'json',
			data: "friend_id="+friend_id+"&friend_from_id="+friend_from_id,
			success:function(data){
				Backbone.trigger('addedFriendHandler');
				appData.services.avatarService.addScore("friend");
			}
  		});
    },

    getMyInvitations: function(){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.getMyInvitationsService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				appData.collections.myInvitations = new ActivitiesCollection(data);
				Backbone.trigger('getInvitationsHandler');
			}
  		});
    },

    getUserMedia: function(userID){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.getUserMediaService,
			type:'POST',
			dataType:'json',
			data: "user_id="+userID,
			success:function(data){
				var media = new MediaCollection(data);
				Backbone.trigger('userMediaHandler', media);
			}
  		});
    },

    inviteFriends: function(friends, activity_id){

    	var counter = 0;
    	friends.each(function(friendModel){
    		$.ajax({
				url:appData.settings.servicePath + appData.settings.inviteFriendsService,
				type:'POST',
				dataType:'json',
				data: "user_id="+friendModel.attributes.user_id+"&activty_id="+activity_id,
				success:function(data){
					counter++;
					if(counter == friends.length){
						Backbone.trigger('friendsInvitedHandler');
					}
				}
  			});	
    	});
    },

	handleInvitations: function(invitation_id, accepted, activity_id){

		$.ajax({
			url:appData.settings.servicePath + appData.settings.handleInvitationsService,
			type:'POST',
			dataType:'json',
			data: "invitation_id="+invitation_id+"&accepted="+accepted+"&activity_id="+activity_id+"&user_id="+appData.models.userModel.attributes.user_id,
			success:function(data){
				console.log("dataaaaaa");
				Backbone.trigger('acceptInviteHandler');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    removeFriend: function(friend_id){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.removeFriendService,
			type:'POST',
			dataType:'json',
			data: "friend_id="+friend_id,
			success:function(data){
				Backbone.trigger('friendRemovedHandler');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    updateUserAvatar: function(avatar){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.updateUserAvatarService,
			type:'POST',
			dataType:'json',
			data: "user_id="+appData.models.userModel.attributes.user_id+"&avatar="+avatar,
			success:function(data){
				Backbone.trigger('updateUserAvatar');
			}, error: function(){
				console.log("error");
			}
		});	
    },

    uploadMediaNonNative: function(files){
		$.ajax({
			url:appData.settings.servicePath + appData.settings.uploadMediaNonNativeService + "?files",
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
		    		// Handle errors here
		    		console.log('ERRORS: ' + data.error);
		    	}
		    },
		    error: function(jqXHR, textStatus, errorThrown)
		    {
		    	// Handle errors here
		    	console.log('ERRORS: ' + textStatus);
		    	// STOP LOADING SPINNER
		    }
		});	
    }
});
