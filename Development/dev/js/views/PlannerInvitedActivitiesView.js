appData.views.PlannerInvitedActivitiesView = Backbone.View.extend({

    initialize: function () {
    	appData.views.PlannerInvitedActivitiesView.model = this.model;
    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));
        return this; 
    }
});