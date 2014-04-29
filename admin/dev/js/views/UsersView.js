appData.views.UsersView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getUsersHandler', this.getUsersHandler);
        appData.services.phpService.getUsers();

        appData.views.UsersView.removeHandler = this.userRemovedHandler;
    },
      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
        
        $('#remove-modal').modal();
        return this;
    },

    userRemovedHandler: function(){
        Backbone.off('removeUserHandler');
    },

    getUsersHandler: function(){
        Backbone.off('getUsersHandler');

        // show users
         $('#user-table tbody').empty();
        appData.collections.users.each(function(user) {
            var aView = new appData.views.DashboardUserView({model : user});
            $('#user-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        $('#remove-modal').on('show.bs.modal', function (e) {
            appData.views.UsersView.userID = $(e.relatedTarget).attr('data-id');
            appData.views.UsersView.selectedUser = $(e.relatedTarget).parent().parent();
            
            var myUser = appData.collections.users.where({'user_id': appData.views.UsersView.userID})[0];
            $('#remove-modal h4 span').text(myUser.attributes.name);
        });

        $('#remove').click(function(){
            Backbone.on('removeUserHandler', appData.views.UsersView.userRemovedHandler);
            appData.services.phpService.removeUser(appData.views.UsersView.userID);
            $(appData.views.UsersView.selectedUser).hide(400);
        });
    }

});
