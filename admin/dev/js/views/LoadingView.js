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
