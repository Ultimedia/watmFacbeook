appData.views.ProfileAvatarView = Backbone.View.extend({
    className: 'avatar-page',
    initialize: function () {

    },
    
    render: function() { 
    	this.$el.html(this.template(appData.models.userModel.toJSON()));
        appData.settings.currentModuleHTML = this.$el;

        // new avatar
        var avatarModel = appData.services.avatarService.generateAvatar(appData.models.userModel);
        var avatarView = new appData.views.AvatarDisplayView({model: avatarModel});

        $('#avatar', appData.settings.currentModuleHTML).append(avatarView.render().$el);

        $( "#strength_progress", appData.settings.currentModuleHTML).progressbar({
            value: parseInt(appData.models.userModel.attributes.strength_score)
        });
        
        $( "#stamina_progress", appData.settings.currentModuleHTML).progressbar({
            value: parseInt(appData.models.userModel.attributes.stamina_score)
        });

        return this; 
    }
});