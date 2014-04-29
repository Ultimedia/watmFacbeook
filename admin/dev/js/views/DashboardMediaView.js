appData.views.DashboardMediaView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {
    },

    render: function() {

    	var user = this.model.attributes.user_id;

    		user = appData.collections.users.where({"user_id": user})[0];
    		if(user){
    			this.model.attributes.user = user.attributes.name;
    		}else{
    			this.model.attributes.user = "";
    		}
    	// model to template
    	this.$el.html(this.template({media: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this;
    }

});

