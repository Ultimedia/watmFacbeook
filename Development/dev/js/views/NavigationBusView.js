appData.views.NavigationBusView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      return this;
    }

});


