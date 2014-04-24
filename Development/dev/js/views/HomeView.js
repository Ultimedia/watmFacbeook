appData.views.HomeView = Backbone.View.extend({

    initialize: function () {
        appData.events.userLoggedInEvent.bind("userLoggedInHandler", this.userLoggedInHandler);
        appData.events.userLoggedInErrorEvent.bind("userLoggedInErrorHandler", this.userLoggedInErrorHandler);
        appData.events.userLoggedInPasswordErrorEvent.bind("userLoggedInPasswordErrorHandler", this.userLoggedInPasswordErrorHandler);
        appData.events.facebookLoginErrorEvent.bind("facebookLoginErrorHandler", this.facebookLoginErrorHandler);
        appData.events.facebookGetFriendsEvent.bind("facebookGetFriendsHandler", this.facebookGetFriendsHandler);
        appData.events.facebookGetFriendsErrorEvent.bind("userLoggedInPasswordErrorHandler", this.facebookGetFriendErrorHandler);
        appData.events.getUserFromFacebookIDEvent.bind("facebookGetIDHandler", this.facebookGetIDHandler)
        appData.events.facebookUserToSQLEvent.bind('facebookUserToSQLSuccesHandler', this.facebookUserToSQLSuccesHandler);
        appData.events.locationHomeEvent.bind('locationSuccesHandler', this.locationSuccesHandler);
        appData.events.locationHomeEvent.bind('locationErrorHandler', this.locationErrorHandler);
        
        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);

        appData.views.HomeView.facebookLoginHandler = this.facebookLoginHandler;
        appData.views.HomeView.facebookProfileDataHandler = this.facebookProfileDataHandler;


        appData.views.HomeView.locationErrorHandler = this.locationErrorHandler;
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){
        appData.router.navigate('noconnection', true);
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
		  	},invalidHandler: function(form, validator) {
            // not sure if this is the correct selector but I found it here: http://docs.jquery.com/Plugins/Validation/validate#toptions
        }
    	});
    },

    /**
    * Facebook login flow 
    */
    facebookUserToSQLSuccesHandler: function(){
        $('#facebookLoad').removeClass('hide');
        appData.router.navigate('loading', true);
    },

    facebookGetIDHandler: function(newUser){
        if(!newUser.facebook_user){
            
            appData.settings.newUser = true;

            if(navigator.geolocation){
                // First lets get the location
                Backbone.on('locationError', appData.views.HomeView.locationErrorHandler);
                appData.services.utilService.getLocationService("login");
            }else{
                appData.services.facebookService.facebookUserToSQL();
            }

        }else{
            appData.settings.newUser = false;
            appData.models.userModel.set('user_id', newUser.user_id);

            if(navigator.geolocation){
                Backbone.on('locationError', appData.views.HomeView.locationErrorHandler);

                appData.services.utilService.getLocationService("login");
            }else{
                appData.router.navigate('loading', true);
            }      
        }
    },

    locationSuccesHandler: function(location){
        var myLocation = location.coords.latitude + "," + location.coords.longitude;
        appData.models.userModel.set('current_location', myLocation);

        if(appData.settings.newUser){
            appData.services.facebookService.facebookUserToSQL();
        }else{
            appData.router.navigate('loading', true);
        }
    },

    locationErrorHandler: function(){
        Backbone.off('locationError');
        if(appData.settings.newUser){
            appData.services.facebookService.facebookUserToSQL();
        }else{
            appData.router.navigate('loading', true);
        }
    },

    facebookProfileDataHandler: function(){
        // get friends
        Backbone.off('facebookProfileDataHandler');
        appData.services.facebookService.getUserFromFacebookID();
    },

    facebookLoginHandler: function(){
        // fetch profile data
        Backbone.off("facebookLoginHandler");
        Backbone.on('facebookProfileDataHandler', appData.views.HomeView.facebookProfileDataHandler);

        appData.services.facebookService.getProfileData();
        $('#facebookLoad').removeClass('hide');
    },

    facebookClickHandler: function(){
        Backbone.on("facebookLoginHandler", appData.views.HomeView.facebookLoginHandler);
        if(!appData.settings.native){
            appData.services.facebookService.facebookConnect();
        }
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
        // get location
        if(navigator.geolocation){
            $('#facebookLoad').removeClass('hide');

            // First lets get the location
            Backbone.on('locationError', appData.views.HomeView.locationErrorHandler);
            appData.services.utilService.getLocationService("login");
        }else{
            $('#loginForm .error-box', appData.currentPageHTML).removeClass('show').addClass('hide');
            appData.router.navigate('loading', true);        
        }
    },

    userLoggedInPasswordErrorHandler: function(){
        $('#loginForm .error-box', appData.currentPageHTML).html(appData.messages.passwordIncorrect).removeClass('hide').addClass('show');
    },

    userLoggedInErrorHandler: function(){
        appData.router.navigate('createUser', true);
    }

});