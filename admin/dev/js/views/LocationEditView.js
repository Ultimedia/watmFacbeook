appData.views.LocationEditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
    
    },

    render: function() {
	  this.$el.html(this.template({location: this.model.toJSON(), imagePath: appData.settings.imagePath}));
	  appData.settings.currentPageHTML = this.$el;

      var locationObject = this.model.attributes.coordinates;
          locationObject = locationObject.split(',');

      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(locationObject[0], locationObject[1]),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }

      var page = this.$el;
      var map = new google.maps.Map($('#map',page)[0], mapOptions);
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locationObject[0], locationObject[1]),
        map:  map,
        title: 'Huidige locatie'
      });

      // resize and relocate map
      google.maps.event.addListenerOnce(map, 'idle', function() {
        google.maps.event.trigger(map, 'resize');
        map.setCenter(new google.maps.LatLng(locationObject[0], locationObject[1]), 13);
      });

      return this;
    }
});
