appData.views.LocationsView = Backbone.View.extend({
    initialize: function () {
		Backbone.on("getLocationsHandler", this.getLocationsSuccesHandler);
		appData.services.phpService.getLocations();
    
        appData.views.LocationsView.locationRemoveHandler = this.locationRemoveHandler;
    },

    locationRemoveHandler: function(){
        Backbone.off('removeLocationHandler');

    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getLocationsSuccesHandler: function(){

    	Backbone.off('getLocationsHandler');
        
        $('#location-table tbody').empty();
            appData.collections.locations.each(function(location) {
            var aView = new appData.views.DashboardLocationView({model : location});

            $('#location-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        // trigger remove modal events
        $('#remove-modal').on('show.bs.modal', function (e) {
            appData.views.LocationsView.locationID = $(e.relatedTarget).attr('data-id');
            appData.views.LocationsView.selectedLocation = $(e.relatedTarget).parent().parent();
            
            var myLocation = appData.collections.locations.where({'location_id': appData.views.LocationsView.locationID})[0];
            $('#remove-modal h4 span').text(myLocation.attributes.location);
        });

        $('.modal-footer #remove').click(function(){
            Backbone.on('removeLocationHandler', appData.views.LocationsView.locationRemoveHandler);
            appData.services.phpService.removeLocation(appData.views.LocationsView.locationID);
            $(appData.views.LocationsView.selectedLocation).hide(400);
        });
    }
});
