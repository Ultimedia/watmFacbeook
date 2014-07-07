appData.views.ProfileView = Backbone.View.extend({

    initialize: function () {
      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    deviceOfflineHandler: function(){

    },

    // phonegap device back online
    deviceOnlineHandler: function(){

    },
    
    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentPageHTML = this.$el;

        var view = new appData.views.ProfileAvatarView();
        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
     
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection() == false){
                $('#friendsButton', appData.settings.currentPageHTML).remove();
            }else if(appData.models.userModel.attributes.myFriends.models.length === 0){
                $('#friendsButton', appData.settings.currentPageHTML).remove();
            }
        }
        return this; 
    },

    events: {
        "click #profileTabs .cl-btn": "profileTabHandler",
        "click #menuButton": "menuOpenHandler"
    },

    menuOpenHandler: function(){
        $("#mainMenu").trigger("open");
    },

    profileTabHandler: function(evt){ 
    	var page = this.$el;
        var currentActivityPage = '#atleetContent';

        $('#profileTabs .cl-btn', appData.settings.currentPageHTML).removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        currentActivityPage = selectedPage;

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;

        switch(selectedPage){
          case "#atleetContent":
            view = new appData.views.ProfileAvatarView();
          break;

          case "#uitdagingenContent":
            view = new appData.views.ProfileChallengeView();
          break;

          case "#vriendenContent":
            view = new appData.views.ProfileFriendsView();
          break;
        }
        $('#profileContent', appData.settings.currentPageHTML).empty()
        $('#profileContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    } 
});