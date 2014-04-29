appData.views.DashboardSportView = Backbone.View.extend({
    tagName: 'tr',

    initialize: function () {

    },

    render: function() {

    	console.log(this.model);
    	// model to template
    	this.$el.html(this.template({sport: this.model.toJSON(), imagePath: appData.settings.sportsPath}));
        return this;
    }

});

