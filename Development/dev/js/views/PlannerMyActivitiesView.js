appData.views.PlannerMyActivitiesView = Backbone.View.extend({

    initialize: function () {

    },

    render: function () {
        this.$el.html(this.template(this.model.attributes));

        return this; 
    }
});