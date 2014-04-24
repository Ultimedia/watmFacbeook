appData.views.CreateActivityWieView = Backbone.View.extend({
    initialize: function () {
        appData.views.friendsListView = [];
        appData.collections.selectedFriends = new UsersCollection();
        appData.views.CreateActivityWieView.activityCreatedHandler = this.activityCreatedHandler;
        appData.views.CreateActivityWieView.friendsInvitedHandler = this.friendsInvitedHandler;

        $(appData.models.userModel.attributes.myFriends.models).each(function(index, userModel) {
            appData.views.friendsListView.push(new appData.views.FriendInvitieView({
              model:userModel,
            }));
        });
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;
      
      _(appData.views.friendsListView).each(function(listView) {
          $('#friendsList', appData.settings.currentModuleHTML).append(listView.render().$el);
      });

      this.setValidator();
      return this; 
    },

    setValidator: function(){

    },

    activityCreatedHandler: function(activity_id){

      // now add friends
      Backbone.off('activityCreated');
      Backbone.off('activityUpdated');

      appData.views.CreateActivityView.updating = false;
      appData.views.CreateActivityView.isUpdating = false;

      appData.views.CreateActivityWieView.activity_id = activity_id;

      if(appData.collections.selectedFriends.length > 0){
        Backbone.on('friendsInvitedHandler', appData.views.CreateActivityWieView.friendsInvitedHandler);
        appData.services.phpService.inviteFriends(appData.collections.selectedFriends, activity_id);
      }else{
        appData.services.phpService.getActivities(false, appData.views.CreateActivityWieView.activity_id);
      }

      // set this boolean so we return to disable back functionality
      appData.settings.created = true;
      appData.services.utilService.updateLocalStorage();
    },

    friendsInvitedHandler: function(){
      Backbone.off('friendsInvitedHandler');      
      appData.services.phpService.getActivities(false, appData.views.CreateActivityWieView.activity_id);
    }

});