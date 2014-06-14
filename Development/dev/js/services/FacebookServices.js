/**
* Facebook Services
*/
appData.services.FacebookServices = Backbone.Model.extend({

	initialize: function() {

	},

	facebookConnect: function(){
		if(!appData.settings.native){

    		try {

	            FB.init({
	                appId: '595730207182331', // App ID
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
			data: "email="+appData.models.userModel.attributes.email+"&age="+appData.models.userModel.attributes.age+"&gender="+appData.models.userModel.attributes.gender+"&name="+appData.models.userModel.attributes.name+"&facebook_data="+JSON.stringify(appData.models.userModel.attributes.facebook_data)+"&facebook_id="+appData.models.userModel.attributes.facebook_id+"&avatar="+appData.models.userModel.attributes.facebook_avatar+"&current_location="+JSON.stringify(appData.models.userModel.attributes.current_location),
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

				appData.models.userModel.attributes.strength_score = data.strength_score;
				appData.models.userModel.attributes.stamina_score = data.stamina_score;
				appData.models.userModel.attributes.equipment_score = data.equipment_score;
				appData.models.userModel.attributes.gender = data.gender;
				appData.models.userModel.attributes.age = data.age;

				if(data.avatar !== ""){
					appData.models.userModel.attributes.avatar = data.avatar;
				}
				appData.events.getUserFromFacebookIDEvent.trigger("facebookGetIDHandler", data);
			}
		});
	},

	facebookLogin: function(){
    	
		if(appData.settings.native){
	    	var fbLoginSuccess = function (userData) {

	    		console.log(userData.authResponse + "maarten");

			   	if (userData.authResponse) {
			    	appData.settings.userLoggedIn = true;

					// store the data in the user profile
					appData.models.userModel.attributes.facebookUser = true;
					appData.models.userModel.attributes.name = userData.name;
					appData.models.userModel.attributes.email = userData.email;

					var gender;
					if(userData.gender == "male"){
						gender = 1;
					}else{
						gender = 0;
					}

					appData.models.userModel.attributes.gender = gender;
					appData.models.userModel.attributes.facebook_id =userData.id;

					facebookConnectPlugin.api("/me/picture", function(response) {
						appData.models.userModel.attributes.facebook_avatar = response.data.url;
					});

					Backbone.trigger("facebookLoginHandler");
				}else{
					alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
				}
			}

	    	facebookConnectPlugin.login(["basic_info"], 
	    	    fbLoginSuccess, 
	    	    function (error) { alert("" + error) }
	    	);
    	}else{
			FB.login(function(response) {
			   if (response.authResponse) {
			    appData.settings.userLoggedIn = true;
				Backbone.trigger("facebookLoginHandler");
			   } else {
				alert("Je kan nu niet inloggen met Facebook, probeer het later opnieuw");
			   }
		    },{ scope: "email" });
		}
	},

	facebookWallpost: function(activityModel){

		console.log(activityModel);

		var params = {
			method: 'feed',
			name: activityModel.attributes.title,
			link: appData.settings.forwardPath + '#forward/' + activityModel.attributes.activity_id,
			caption: 'We App To Move',
			description: activityModel.attributes.description
		};

		if(appData.settings.native){
		    facebookConnectPlugin.getLoginStatus( 
		        function (status) { 
		            facebookConnectPlugin.showDialog(params, 
		                function (result) {
          					Backbone.trigger('FacebookWallPostCompleteEvent');
		               	}, 
		            function (e) {
						Backbone.trigger('FacebookWallPostCompleteEvent');
		            });
		        }
		    );
		}else{
			FB.ui(params, function(response){ 
				if (response && response.post_id) {
			    } else {
			    }

				Backbone.trigger('FacebookWallPostCompleteEvent');
			});
		}
	},

	getProfileData:function(){
		
		if(!appData.settings.native){

			FB.api('/me', {fields:['id','name','email','username','age_range','gender','hometown','link','favorite_athletes','favorite_teams']}, function(response) {

				// store the date in the user profile
				appData.models.userModel.attributes.facebookUser = true;
				appData.models.userModel.attributes.name = response.name;
				appData.models.userModel.attributes.email = response.email;
				
				if(response.age_range.min){
				appData.models.userModel.attributes.age = response.age_range.min;
				}
				
				// out of scope
				//appData.models.userModel.attributes.facebook_data.favorite_athletes = response.favorite_athletes;
				//appData.models.userModel.attributes.facebook_data.favorite_teams = response.favorite_teams;
				//appData.models.userModel.attributes.facebook_data.hometown = response.hometown.name;
				//appData.models.userModel.attributes.facebook_data.username = response.name;
		
				var gender;
				if(response.gender == "male"){
					gender = 1;
				}else{
					gender = 0;
				}

				appData.models.userModel.attributes.gender = gender;
				appData.models.userModel.attributes.facebook_id = response.id;

				FB.api("/me/picture", function(response) {
					appData.models.userModel.attributes.facebook_avatar = response.data.url;
					Backbone.trigger("facebookProfileDataHandler");
				});

			});
		}else{
			Backbone.trigger("facebookProfileDataHandler");
		}
	},

	getFacebookFriends: function(){
		// out of scope
		/*
		FB.api('/me/friends', { fields: 'id, name, picture' },  function(response) {
	    	if (response.error) {
	        	appData.events.facebookGetFriendsErrorEvent.trigger("facebookGetFriendErrorHandler");

	    	} else {
				appData.models.userModel.attributes.friends= [];
				appData.models.userModel.attributes.friends = new UsersCollection(response.data);

				// succesfully signed in via Facebook
	    	}
		});*/
		appData.models.userModel.attributes.friends= [];
       	appData.events.facebookGetFriendsEvent.trigger("facebookGetFriendsHandler");
	}

});