appData.views.NoConnectionView = Backbone.View.extend({

    initialize: function () {

      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){
        window.history.back();
    },

    // phonegap device back online
    networkLostHandler: function(){
        window.location = "#";
    },

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentModuleHTML = this.$el;
    
      return this; 
    },
    events: {
        "click #refreshButton": "checkConnectionHandler"
    },

    checkConnectionHandler: function(){
        var result = appData.services.utilService.checkConnection();
        alert(appData.settings.network);

        if(appData.settings.network){
            window.location = "#";
        }
    }
});