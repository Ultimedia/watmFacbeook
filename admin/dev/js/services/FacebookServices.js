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