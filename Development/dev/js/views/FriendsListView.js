appData.views.FriendsListView = Backbone.View.extend({

    initialize: function () {
 	
    },

    render: function () {
    	// model to template
    	console.log(this.model.attributes);
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this; 
    }
});