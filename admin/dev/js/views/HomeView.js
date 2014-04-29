appData.views.HomeView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getActivitiesHandler', this.getActivitiesHandler);
        appData.services.phpService.getActivities();

        Backbone.on('getActivitiesArchiveHandler', this.getActivitiesArchiveHandler);
        appData.services.phpService.getAcitvitiesArchive();
    
        appData.views.HomeView.wireModal = this.wireModal;
        appData.views.HomeView.removeHandler = this.activityRemoveHandler;
    },

    activityRemoveHandler: function(){
      Backbone.off('removeActivityHandler');
    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      // initialise modal
      $('#remove-modal').modal();

      return this;
    },

    getActivitiesHandler: function(){
      Backbone.off('loadComplete');

      // show activities
      $('#activity-table tbody').empty();
      $('#activityMessage').addClass('hide');

      if(appData.collections.activities.length > 0){
        appData.collections.activities.each(function(activity) {
          var aView = new appData.views.DashboardActivityView({model : activity});
          $('#activity-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });
      }else{
        $('#activityMessage').removeClass('hide');
      }

      // trigger remove modal events
      appData.views.HomeView.wireModal();
    },

    getActivitiesArchiveHandler: function(){
      console.log(appData.collections)

      $('#activity-archive-table tbody').empty();
      appData.collections.activitiesArchive.each(function(activity) {
        var aView = new appData.views.DashboardActivityArchiveView({model : activity});

        $('#activity-archive-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      // trigger remove modal events
      appData.views.HomeView.wireModal();
    },

    wireModal: function(){
      $('#remove-modal').on('show.bs.modal', function (e) {
          appData.views.HomeView.activityID = $(e.relatedTarget).attr('data-id');
          var myActivity;

          if($(e.relatedTarget).attr('archive') === "true"){
            myActivity = appData.collections.activitiesArchive.where({'activity_id': appData.views.HomeView.activityID})[0];
          }else{
            myActivity = appData.collections.activities.where({'activity_id': appData.views.HomeView.activityID})[0];
          }
          appData.views.HomeView.selectedActivity = $(e.relatedTarget).parent().parent();
          
          $('#remove-modal h4 span').text(myActivity.attributes.title);
      });

      $('#remove').click(function(){
          Backbone.on('removeActivityHandler', appData.views.HomeView.removeHandler);
          appData.services.phpService.removeActivity(appData.views.HomeView.activityID);
          $(appData.views.HomeView.selectedActivity).hide(400);
      });
    }
});
