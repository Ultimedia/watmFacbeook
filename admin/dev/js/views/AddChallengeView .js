appData.views.AddChallengeView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
    	this.model = new Challenge();
    },

    render: function() {
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.imagePath}));
    	appData.settings.currentPageHTML = this.$el;

      return this;
    }
});
