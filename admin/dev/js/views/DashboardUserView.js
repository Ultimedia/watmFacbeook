appData.views.DashboardUserView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));
        return this;
    }

});
