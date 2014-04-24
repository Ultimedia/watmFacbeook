appData.views.FriendInvitieView = Backbone.View.extend({

    initialize: function () {
      appData.views.FriendView.model = this.model;

      console.log(this.model.attributes.user_id);
    },

    render: function() { 
      this.$el.html(this.template({friend: this.model.toJSON(), imagePath: appData.settings.imagePath}));
      appData.settings.currentPageHTML = this.$el;
      return this; 
    }, 

    events: {
      "click .inviteButton": "friendInviteHandler"
    },

    friendInviteHandler: function(evt){
      $(evt.target).toggleClass('selected');
      if($(evt.target).hasClass('selected')){
        $(evt.target).text('Uitgenodigd');

        var selected = appData.models.userModel.attributes.myFriends.where({ "user_id": $(evt.target, appData.settings.currentPageHTML).attr('data-id')})[0];
        appData.collections.selectedFriends.push(selected)

      }else{
        $(evt.target).text('Niet uitgenodigd');
        var m = appData.collections.selectedFriends.where({ "user_id": $(evt.target, appData.settings.currentPageHTML).attr('data-id')})[0];
        appData.collections.selectedFriends.remove(m);
      }

      console.log(appData.collections.selectedFriends);
    }
});