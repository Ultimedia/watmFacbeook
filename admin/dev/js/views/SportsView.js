appData.views.SportsView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getSportsHandler', this.getSportsHandler);
        appData.views.SportsView.sportRemovedHandler = this.sportRemovedHandler;
        appData.services.phpService.getSports();
    },

    sportRemovedHandler: function(){
      Backbone.off('removeSportHandler');
    },  

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getSportsHandler: function(){

      Backbone.off('getSportsHandler');

      // show activities
      $('#sports-table tbody').empty();
      appData.collections.sports.each(function(sport) {

        var aView = new appData.views.DashboardSportView({model : sport});
        $('#sports-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      $('#remove-modal').on('show.bs.modal', function (e) {
          appData.views.SportsView.sportID = $(e.relatedTarget).attr('data-id');
          appData.views.SportsView.selectedSport = $(e.relatedTarget).parent().parent();
          
          var mySport = appData.collections.sports.where({'sport_id': appData.views.SportsView.sportID})[0];
          $('#remove-modal h4 span').text(mySport.attributes.sport_title);
      });

      $('.modal-footer #remove').click(function(){
          Backbone.on('removeSportHandler', appData.views.SportsView.sportRemovedHandler);
          appData.services.phpService.removeSport(appData.views.SportsView.sportID);
          $(appData.views.SportsView.selectedSport).hide(400);
      });

    }
});
