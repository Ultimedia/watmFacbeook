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
        appData.views.HomeView.nextSlide = this.nextSlide;
        appData.views.HomeView.prevSlide = this.prevSlide;
        appData.views.HomeView.gotoSlide = this.gotoSlide;
        appData.views.HomeView.currentSlide = 0;
        appData.views.HomeView.slides = 2;
    }, 

    gotoSlide: function(index){
        if(index > appData.views.HomeView.slides){
            index = 0;
        }
        if(index < 0){
            index =  appData.views.HomeView.slides;
        }

        $('#carouselNav li a', appData.settings.currentPageHTML).removeClass('active');
        $('#carouselNav li a:eq(' + index + ')').addClass('active');
        $('#car' + appData.views.HomeView.currentSlide).fadeOut(200,function(){
            $('#car' + index).fadeIn(200, function(){
                appData.views.HomeView.currentSlide = index;
            }).css( 'display', 'table').addClass('active');
        });
    },

    prevSlide: function(){

    },

    nextSlide: function(){

    },

    // phonegap device offline
    networkFoundHandler: function(){

    },

    updateCSS: function() {
        var containerHeight =  $('.cl-content ', appData.settings.currentPageHTML).height() - $('#loginForm', appData.settings.currentPageHTML).height() - 60;

        $('#carouselContent li', appData.settings.currentPageHTML).css({
            'height':containerHeight + 'px'
        });
    },

    // phonegap device back online
    networkLostHandler: function(){
        appData.router.navigate('noconnection', true);
    },

    render: function() { 
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
    	this.setValidator();
        this.$el.hammer();

        $('#carousel', appData.settings.currentPageHTML).delay(100).fadeOut(function(){
            var containerHeight =  $('.cl-content ', appData.settings.currentPageHTML).height() - $('#loginForm', appData.settings.currentPageHTML).height() - 60;

            $('#carouselContent li', appData.settings.currentPageHTML).css({
                'height':containerHeight + 'px'
            });

            $('#carousel', appData.settings.currentPageHTML).fadeIn(200);
        });

        $(window).on("resize", this.updateCSS);

        return this;         
    },

    events: {
        "click #FBloginButton": "facebookClickHandler",
        "click #loginFormSubmit": "loginFormSubmitHandler",
        "click #carouselNav a": "carouselClickHandler",
        "swipe #carouselContent": 'onSwipe',
        "click #carouselContent": 'onClick'
    },

    /*
*/

    onClick: function(){
        appData.views.HomeView.gotoSlide(appData.views.HomeView.currentSlide + 1);
    },

    loginFormSubmitHandler: function(){
        $("#loginForm",appData.settings.currentPageHTML).submit();
    },

    onSwipe: function(e){
        if(e.gesture.direction !== "up" || e.gesture.direction !== "down"){
            var target = 0;
            switch(e.gesture.direction){
                case "right":
                    target = -1;
                break;

                case "left":
                    target = 1;
                break;
            }
            var myTarget = appData.views.HomeView.currentSlide + target;
            appData.views.HomeView.gotoSlide(myTarget);
        }
    },

    carouselClickHandler: function(evt){
        var myIndex = $(evt.target).parent().index();
        appData.views.HomeView.gotoSlide(myIndex);

        $('#carouselNav li a', appData.settings.currentPageHTML).removeClass('active');
        $(evt.target).addClass('active');
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