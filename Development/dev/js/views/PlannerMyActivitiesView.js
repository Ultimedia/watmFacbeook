appData.views.PlannerMyActivitiesView = Backbone.View.extend({
	tagName: 'li',
	className: 'plan',
    initialize: function () {

    },

    clickHandler: function(){

    },

    render: function () {
		var sportModel = appData.collections.sports.where({'sport_id': this.model.attributes.sport_id})[0];
        var model = this.model;

        this.$el.html(this.template({data: this.model.attributes, imagePath: appData.settings.sportsPath, sport: sportModel.attributes.icon}));

        if(model.attributes.author_badge){
          $('.edit-badge', this.$el).removeAttr('style');
        }

        return this; 
    }
});