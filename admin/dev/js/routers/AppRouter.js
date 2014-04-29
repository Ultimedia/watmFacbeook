appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home",
        "activity-edit/:id":"activityedit",
        "users":            "users",
        "loading":          "loading",
        "challenges":       "challenges",
        "new-challenge":    "newchallenge",
        "sports":           "sports",
        "new-sport":        "newsport",
        "media":            "media",
        "locations":        "locations",
        "sport-edit/:id":   "sportedit",
        "user-edit/:id":    "useredit",
        "challenge-edit/:id": "challengeedit",
        "location-edit/:id": "locationedit",
        "activity-archive-edit/:id":"activityarchiveedit",
        "new-activity": "newactivity",
        "new-location": "newlocation",
        "settings": "settings",
        "login": "login"
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;


        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    login: function(){
        $('#mainNav li').removeClass('active');
        $('#container').empty().append(new appData.views.LoginView().render().$el);
    },

    home: function () {
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.HomeView().render().$el);
                $('#acBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    challenges: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.ChallengesView().render().$el);
                $('#chBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            } 
        }else{
            window.location.hash = "login";
        }     
    },

    newchallenge: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewChallengeView().render().$el);
                $('#chBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }       
    },

    locations: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
             if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.LocationsView().render().$el);
                $('#lcBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }       
        }else{
            window.location.hash = "login";
        }
    },

    users: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.UsersView().render().$el);
                $('#usBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    settings: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.SettingsView().render().$el);
                $('#setBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    sports: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.SportsView().render().$el);
                $('#spBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    newsport: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewSportView().render().$el);
                $('#spBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    newactivity: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewActivityView().render().$el);
                $('#acBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    newlocation: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.NewLocationView().render().$el);                    $('#lcBtn').addClass('active');
                $('#lcBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    media: function(){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                $('#container').empty().append(new appData.views.MediaView().render().$el);
                $('#mdBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    loading: function(){
        $('#container').empty().append(new appData.views.LoadingView().render().$el);
    },

    sportedit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.sports.where({sport_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.SportEditView({model: selectedActivityModel}).render().$el);
                $('#spBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    useredit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.users.where({user_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.UserEditView({model: selectedActivityModel}).render().$el);
                $('#usBtn').addClass('active');
            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    challengeedit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.challenges.where({challenge_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.ChallengeEditView({model: selectedActivityModel}).render().$el);
                $('#chBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    locationedit: function(id){
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.locations.where({location_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.LocationEditView({model: selectedActivityModel}).render().$el);
                $('#lcBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    activityedit: function (id) {
        $('#mainNav li').removeClass('active');
        if(appData.settings.loggedIn){
            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.activities.where({activity_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.ActivityEditView({model: selectedActivityModel}).render().$el);
                $('#acBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            }
        }else{
            window.location.hash = "login";
        }
    },

    activityarchiveedit: function(id){
        $('#mainNav li').removeClass('active');
        
        if(appData.settings.loggedIn){

            if(appData.settings.dataLoaded){
                var selectedActivityModel = appData.collections.activitiesArchive.where({activity_id: id}); 
                selectedActivityModel = selectedActivityModel[0];
                $('#container').empty().append(new appData.views.ActivityEditView({model: selectedActivityModel}).render().$el);
                $('#acBtn').addClass('active');

            }else{
                window.location.hash = "loading";
            } 
        }else{
            window.location.hash = "login";
        }
    }
});



