appData.views.DashboardActivityArchiveView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({activity: this.model.toJSON(), imagePath: appData.settings.imagePath, friends: this.model.attributes.users}));
        return this;
    }

});
