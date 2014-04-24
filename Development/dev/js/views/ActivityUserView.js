appData.views.ActivityUserView = Backbone.View.extend({

    initialize: function () {
    
    }, 

    render: function() { 
    	this.model.imagePath = appData.settings.imagePath;

    	// model to template
    	this.$el.html(this.template(this.model));
        return this; 
    }

});
