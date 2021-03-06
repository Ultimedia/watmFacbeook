appData.views.FriendView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      // is this a friend?
      if(appData.models.userModel.attributes.myFriends.where({"user_id": this.model.attributes.user_id}).length > 0){
        this.model.attributes.myFriend = false;
      }else if(appData.views.FriendView.model.attributes.user_id == appData.models.userModel.attributes.user_id){
        this.model.attributes.myFriend = false;
      }else{
        this.model.attributes.myFriend = false;
      }
      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() { 
      this.$el.html(this.template({imagePath: appData.settings.imagePath, user_id: appData.models.userModel.attributes.user_id, user: this.model.toJSON()}));
      appData.settings.currentPageHTML = this.$el;

      Backbone.on('userMediaHandler', this.userMediaRecievedHandler);
      appData.services.phpService.getUserMedia(this.model.attributes.user_id);

      Backbone.on('getBadgesHandler', this.getBadgesHandler);
      appData.services.phpService.getBadges(this.model.attributes.user_id);


      // new avatar
      var avatarModel = appData.services.avatarService.generateAvatar(appData.views.FriendView.model);
      var avatarView = new appData.views.AvatarDisplayView({model: avatarModel});

      $('#avatar', appData.settings.currentPageHTML).append(avatarView.render().$el);

      return this; 
    }, 

    getBadgesHandler: function(badges){
      Backbone.off('getBadgesHandler');
      
      // generate badges list
      appData.views.FriendView.model.attributes.badges = new ChallengesCollection(badges);
     
      // badges grid
      var bwidth = $('#badgesOverview ul', appData.settings.currentPageHTML).width();
      var bdwidth = $('#badgesOverview ul li',appData.settings.currentPageHTML).first().width() + 12 + 2;
          bdwidth = parseInt(bdwidth);

      var howMany = appData.models.userModel.attributes.challengesCount;
      if(!isNaN(howMany)){
          $('#badgesOverview ul', appData.settings.currentPageHTML).empty();
          for (var i=0; i<howMany; i++){
              $('#badgesOverview ul', appData.settings.currentPageHTML).append('<li></li>');
          }          
      }
      $('#badgesOverview', appData.settings.currentPageHTML).slideDown(200);

      if(appData.views.FriendView.model.attributes.badges.length !== 0){
        var ind = 0;

        appData.views.FriendView.model.attributes.badges.each(function(badge){
        
          ind++;

          var bView = new appData.views.BadgeListView({model: badge});
          $('#badgesOverview ul li:eq(' + ind + ')', appData.settings.currentPageHTML).append(bView.render().$el).addClass('badger');
        });
      }
    }, 

    userMediaRecievedHandler: function(media){

      var mediaList = [];

      // generate media tiles

      if(media.length !== 0){
      media.each(function(mediaModel) {

          mediaModel.attributes.userModel = appData.views.FriendView.model.attributes;
          mediaModel.attributes.imagePath = appData.settings.imagePath;

          mediaList.push(new appData.views.ActivityMediaViewer({
            model : mediaModel
          }));
      });

      $('#mediaContainer', appData.settings.currentPageHTML).empty();
      _(mediaList).each(function(dv) {
          $('#mediaContainer', appData.settings.currentPageHTML).append(dv.render().$el);
      });
      }else{
        $('#mediaSection', appData.settings.currentPageHTML).hide();
      }
    },

    events: {
      "click #backButton": "backHandler",
      "click #addFriendButton": "addFriendHandler"
    },

    addFriendHandler: function(){
      Backbone.on('addedFriendHandler', this.addedAsFriendHandler);
      appData.services.phpService.addFriend(appData.views.FriendView.model.attributes.user_id, appData.models.userModel.attributes.user_id);
    },

    backHandler: function(){
      window.history.back();
    },

    addedAsFriendHandler: function(){
      Backbone.off('addedFriendHandler');
      $('#addFriendButton', appData.settings.currentPageHTML).remove();
    }
});

