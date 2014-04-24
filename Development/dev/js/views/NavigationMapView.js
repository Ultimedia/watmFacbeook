appData.views.NavigationMapView = Backbone.View.extend({

    initialize: function () {

    }, 

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      this.setMap();

      return this;
    }, 

    setMap: function() { 
        appData.settings.mapAdded = true;

        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var page = this.$el;
        var map = new google.maps.Map($('#map_canvas',page)[0], mapOptions);
        var coordinates = appData.views.ActivityDetailView.model.attributes.coordinates.split(',');

        google.maps.event.addListenerOnce(map, 'idle', function() {
          google.maps.event.trigger(map, 'resize');
          map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer();
            directionsDisplay.setMap(map);
            directionsDisplay.setPanel($('#directions', page)[0]);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
            origin: appData.models.userModel.attributes.current_location,
            destination: appData.views.ActivityDetailView.model.attributes.coordinates,
            travelMode: google.maps.DirectionsTravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC
        };

        directionsService.route(
          directionsRequest,
          function(response, status)
          {
            if (status == google.maps.DirectionsStatus.OK)
            {
              new google.maps.DirectionsRenderer({
                map: map,
                directions: response
              });
                directionsDisplay.setDirections(response);
            }
            else
              $("#error").append("Unable to retrieve your route<br />");
          }
        );
    }
});


