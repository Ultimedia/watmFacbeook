appData.views.AvatarDisplayView = Backbone.View.extend({
    tagName: 'span',
    className: 'avatar-container',

    initialize: function () {
    
    }, 

    render: function() {     
    	this.$el.html(this.template({avatarPath: appData.settings.avatarPath, avatar: this.model.toJSON()}));
    	return this;
    }
});

