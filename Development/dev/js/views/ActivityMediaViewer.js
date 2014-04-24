appData.views.ActivityMediaViewer = Backbone.View.extend({

    initialize: function () {

    },

    render: function() { 

    	this.$el.html(this.template(this.model.toJSON()));
      return this; 
    }
});

