appData.views.DashboardChallengesView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	// model to template
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.badgesPath}));
        return this;
    }

});
