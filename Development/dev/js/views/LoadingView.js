appData.views.LoadingView = Backbone.View.extend({

    initialize: function () {
        appData.views.LoadingView = this;

        appData.events.getActivitiesSuccesEvent.bind("activitiesLoadedHandler", this.activitiesLoadedHandler);
        appData.events.getSportsSuccesEvent.bind("sportsLoadedHandler", this.sportsLoadedHandlers);
        appData.events.getUsersSuccesEvent.bind("usersLoadedHandler", this.usersLoadedHandler)
        appData.events.getBuurtenEvent.bind("buurtenLoadedHandler", this.buurtenLoadedHandler);
        appData.events.getLocationsSuccesEvent.bind("getLocationsSuccesHandler", this.getLocationsSuccesHandler);
        Backbone.on('getChallengesHandler', this.getChallengesHandler)
        Backbone.on('myPlannedActivitiesLoadedHandler', this.getMyPlannedActivitiesLoadedHandler);
        Backbone.on('myActivitiesLoadedHandler', this.getMyActivitiesLoadedHandler);
        Backbone.on('getFavouriteSportsHandler', this.getFavouriteSportsHandler)
        Backbone.on('getMyFavouriteSportsHandler', this.getMyFavouriteSportsHandler)
        Backbone.on('getMyChallengesHandler', this.getMyChallengesHandler);
        Backbone.on('getMyBadgesHandler', this.getMyBadgesHandler);
        Backbone.on('getFriendsHandler', this.loadingCompleteHandler);
        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
        Backbone.on('getChallengesCount', this.getChallengesCount)
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));

        appData.settings.currentPageHTML = this.$el;
        
        if(appData.settings.userLoggedIn){

            // load the data
            appData.services.phpService.getChallengesCount();
        }else{
            window.location.hash = "";
        }
        return this;
    },

    getChallengesCount: function(){
        appData.services.phpService.getActivities(true);
    },

    activitiesLoadedHandler: function(){
        appData.services.phpService.getSports();
    },

    sportsLoadedHandlers: function(){
        
        appData.services.phpService.getChallenges();
    },

    getChallengesHandler: function(){
        Backbone.off('getChallengesHandler');
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
        appData.services.phpService.getMyChallengesHandler();
        Backbone.off('getMyFavouriteSportsHandler');
    },

    getMyChallengesHandler: function(){
        Backbone.off('getMyChallengesHandler');
        appData.services.phpService.getMyBadges();
    },

    getMyBadgesHandler: function(){
        Backbone.off('getMyBadgesHandler');
        appData.services.phpService.getFriends();
    },

    loadingCompleteHandler: function(){
        Backbone.off('getFriendsHandler');

        // set localstorage, so the user has data stored in case the connection drops
        // set collections
        window.localStorage.setItem("collections", JSON.stringify(appData.collections));
        window.localStorage.setItem("userModel", JSON.stringify(appData.models.userModel));

        appData.settings.dataLoaded = true;
         $('#mainMenu #userAvatar').removeAttr('style');
        $('#mainMenu #userAvatar').css({
            "background": "url("+  appData.settings.imagePath + appData.models.userModel.attributes.avatar + ") repeat center center",
            "background-size": "cover"
        });
        $('#mainMenu #userName').text(appData.models.userModel.attributes.name);
        $('#mainMenu #userAvatar').css({
            'background-repeat': 'no-repeat'
        });


        if(appData.models.userModel.attributes.myFavouriteSports.length > 0){
            if(appData.settings.forwardAfterLogin === true){
                appData.settings.forwardAfterLogin = false;
                window.location.hash = "#activity/" + appData.settings.forwardAfterLoginID;
                
            }else{
                appData.router.navigate('dashboard', true);
            }
        }else{
            appData.router.navigate('sportselector', true);
        }
    },


    destroy_view: function() {


    }

});
