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
        "noconnection":     "noconnection",
        "loading":          "loading",
        "friend/:id":       "friend",
        "update/:id":       "update",
        "forward/:id":      "forward"
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

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

    forward: function(id){
        console.log("forward enabled");

        // save the activity ID nog go to the login
        appData.settings.forwardAfterLoginID = id;
        appData.settings.forwardAfterLogin = true;

        window.location.hash = "#";
    },

    noconnection: function(){
        appData.slider.slidePage(new appData.views.NoConnectionView().render().$el);
    },

    home: function () {

        // are we on a device or a mobile webbrowser?
        if(appData.settings.native){

            if(appData.settings.network){
                // is this user already logged in? if so skip the login page and go straight to loading or the offline mode
                if(appData.settings.userLoggedIn){
                    window.location.hash = "loading";
                }else{
                    appData.slider.slidePage(new appData.views.HomeView().render().$el);
                }
            }else{

                 // check if we have local storage from an earlier login
                if(appData.settings.storageFound){

                    appData.services.utilService.localDataToCollection(appData.storage);
                    window.location.hash = "dashboard";
                }else{
                    window.location.hash = "noconnection";
                }
            }

        }else{

            appData.slider.slidePage(new appData.views.HomeView().render().$el);

        }
    },

    loading: function () {
        console.log(appData.models.userModel);

        if(!appData.settings.dataLoaded){
            appData.slider.slidePage(new appData.views.LoadingView({model: appData.models.userModel}).render().$el);
        }else{
            window.location.hash = "dashboard";
        }
    },
    
    dashboard: function () {
        appData.settings.created = false;
        clearInterval(appData.settings.timer);

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
        clearInterval(appData.settings.timer);

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
        if(appData.settings.userLoggedIn){

            var userModel = appData.collections.users.where({ "user_id": id });
                userModel = userModel[0];

            
            appData.slider.slidePage(new appData.views.FriendView({model: userModel}).render().$el); 
        }else{
            window.location.hash = ""
        }
    },

    activity: function (id) {
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.ActivityDetailView().render().$el); 
        }else{
            window.location.hash = "";
        }
    },

    update: function(id){
        if(appData.settings.userLoggedIn){

            if(appData.settings.dataLoaded){
                var activitiesCollection = appData.collections.activities;
                var selectedActivityModel = activitiesCollection.where({activity_id: id}); 
                    selectedActivityModel = selectedActivityModel[0];
                    selectedActivityModel.attributes.updateActivity = true;

                appData.slider.slidePage(new appData.views.CreateActivityView({model: selectedActivityModel}).render().$el);
            }else{
                window.location.hash = "loading";
            }
        
        }else{
            window.location.hash = "";
        }
    },

    createActivity: function () {
        if(appData.settings.userLoggedIn){

            if(appData.settings.created){
                window.location.hash = "#dashboard";
            }else{

                if(appData.settings.dataLoaded){
                    appData.slider.slidePage(new appData.views.CreateActivityView({model: appData.models.userTemplate}).render().$el);
                }else{
                    window.location.hash = "loading";
                }

            }
        }else{
            window.location.hash = "";
        }
    },

    createUser: function () {
        appData.slider.slidePage(new appData.views.CreateUserView({model: appData.models.userModel}).render().$el);
    },
    
    navigater: function (id) {
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.NavigationView().render().$el);
        }else{
            window.location.hash = ""
        }
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
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.SettingsView().render().$el);
        }else{
            window.location.hash = "";
        }
    },

    sportselector: function (id) {
        if(appData.settings.userLoggedIn){
            appData.slider.slidePage(new appData.views.SportSelectorView({ model: new Backbone.Model({"sport_id": ""})}).render().$el);
        }else{
            window.location.hash = "";
        }
    },

    checkLoggedIn: function(){

    }
});