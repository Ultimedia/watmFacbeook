appData.views.SettingsView = Backbone.View.extend({
    initialize: function () {

    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;


      return this;
    }
});

