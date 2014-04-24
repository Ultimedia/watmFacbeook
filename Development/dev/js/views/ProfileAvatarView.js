appData.views.ProfileAvatarView = Backbone.View.extend({
    className: 'avatar-page',
    initialize: function () {
    	Backbone.on('updateAvatarCompleteHandler', this.updateAvatarCompleteHandler)
    },
    
    render: function() { 
    	this.$el.html(this.template(appData.models.userModel.toJSON()));
        appData.settings.currentModuleHTML = this.$el;

        // new avatar
        var avatarModel = appData.services.avatarService.generateAvatar(appData.models.userModel);
        var avatarView = new appData.views.AvatarDisplayView({model: avatarModel});

        $('#avatar', appData.settings.currentModuleHTML).append(avatarView.render().$el);
        return this; 
    },

    events:{
    	"click #updateAvatar": "updateAvatarHandler"
    },

    updateAvatarHandler: function(){
    	appData.services.phpService.updateAvatar();
    },

    updateAvatarCompleteHandler: function(){
        
    }
});