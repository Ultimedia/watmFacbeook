appData.views.FavouriteSportListView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
    	this.model.attributes.path = appData.settings.sportsPath;

    	// model to template
    	this.$el.html(this.template({ data: this.model.toJSON(), icon: this.model.attributes.icon, path: appData.settings.sportsPath }));
        return this; 
    }

});


