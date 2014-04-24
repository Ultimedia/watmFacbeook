appData.views.GoogleMapView = Backbone.View.extend({

    initialize: function () {



    }, 

    render: function() { 
      this.$el.html(this.template());
      appData.settings.currentPageHTML = this.$el;

       var mapOptions = {
          zoom: 15,
          center: new google.maps.LatLng(14, 10),
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true
      }

        appData.settings.mapAdded = true;
        var map = new google.maps.Map($('#map',appData.settings.currentPageHTML)[0], mapOptions);      

      return this; 
    }
});

