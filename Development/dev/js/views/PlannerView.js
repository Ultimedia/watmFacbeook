appData.views.PlannerView = Backbone.View.extend({

  initialize: function () {

    appData.views.PlannerView.updatePlanner = this.updatePlanner;
    appData.views.PlannerView.updatePlannerComplete = this.updatePlannerComplete;
    appData.views.PlannerView.getInvitationsHandler = this.getInvitationsHandler;
    appData.views.PlannerView.acceptedInvite = this.acceptInviteHandler;
    Backbone.on('acceptInviteHandler', this.acceptInviteHandler);

    // Update when a user accepts / declines an invitation
    appData.views.PlannerView.acceptedInvite = this.acceptedInvite;
  
    // update the activities if we have a network connection
    if(appData.settings.native){
        if(appData.services.utilService.getNetworkConnection()){
          Backbone.on('myPlannedActivitiesLoadedHandler', this.updatePlanner);
          appData.services.phpService.getMyPlannedActivities();
        }else{
          this.getInvitationsHandler();
        }
    }else{
        Backbone.on('myPlannedActivitiesLoadedHandler', this.updatePlanner);
        appData.services.phpService.getMyPlannedActivities();
    }

    Backbone.on('networkFoundEvent', this.networkFoundHandler);
    Backbone.on('networkLostEvent', this.networkLostHandler);
  }, 

  // phonegap device offline
  networkFoundHandler: function(){
    Backbone.on('myPlannedActivitiesLoadedHandler', this.updatePlanner);
    appData.services.phpService.getMyPlannedActivities();
  },

  // phonegap device back online
  networkLostHandler: function(){

  },

  events:{
      "click .inviteButtons a":"handleInviteHandler"
  },

  handleInviteHandler: function(evt){

    var selectedStatus = $(evt.target).attr('data');
    var invitationID =  $(evt.target).parent().attr('data-invitation');
    var activityID = $(evt.target).parent().attr('data-activity-id');

    // Decline animation
    if(selectedStatus == 0){

    // Approve animation
    }else{

    }

    $(evt.target).parent().parent().hide(200);
    Backbone.on('acceptInviteHandler');
    appData.services.phpService.handleInvitations(invitationID, selectedStatus, activityID);
  },

  acceptInviteHandler: function(){
    console.log("invite updated");
    Backbone.on('myPlannedActivitiesLoadedHandler', appData.views.PlannerView.updatePlanner);
    appData.services.phpService.getMyPlannedActivities();
  },

  updatePlanner: function(){
    console.log('myPlannedActivitiesLoadedHandler');
    Backbone.on('myActivitiesLoadedHandler', appData.views.PlannerView.updatePlannerComplete);
    appData.services.phpService.getMyActivities();
  },

  updatePlannerComplete: function(){
    console.log('myActivitiesLoadedHandler');

    Backbone.on('getInvitationsHandler', appData.views.PlannerView.getInvitationsHandler)
    appData.services.phpService.getMyInvitations();
  },

  getInvitationsHandler: function(){
    Backbone.off('myPlannedActivitiesLoadedHandler');
    Backbone.off('myActivitiesLoadedHandler');
    Backbone.off('getInvitationsHandler');
    Backbone.off('acceptInviteHandler');

    appData.views.PlannerView.myActivitiesView = [];
    appData.views.PlannerView.myJoinedActivitiesView = [];
    appData.views.PlannerView.myInvitedActivitiesView = [];

    $("#myInvitationsPlanner", appData.settings.currentPageHTML).addClass('hide');
    $("#myActivitiesPlanner", appData.settings.currentPageHTML).addClass('hide');
    $('#myPlanner', appData.settings.currentPageHTML).addClass('hide');

    // get my activities
    
    if (appData.collections.myActivities instanceof Backbone.Collection) {
      appData.collections.myActivities.each(function(activity) {
        appData.views.PlannerView.myActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : activity}));
      });
    }

    // get the activities I'm going to
    if (appData.collections.myPlannedActivities instanceof Backbone.Collection) {
      appData.collections.myPlannedActivities.each(function(myActivity) {
        appData.views.PlannerView.myJoinedActivitiesView.push(new appData.views.PlannerMyActivitiesView({model : myActivity}));
      });
    }

    // get the activtities I'm inviited to
    if (appData.collections.myPlannedActivities instanceof Backbone.Collection) {
      appData.collections.myInvitations.each(function(invitedActivity) {
        appData.views.PlannerView.myInvitedActivitiesView.push(new appData.views.PlannerInvitedActivitiesView({model : invitedActivity}));
      });
    }
 
    if(appData.views.PlannerView.myActivitiesView.length > 0){
      $('#myActivitiesPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myActivitiesTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myActivitiesView).each(function(dv) {
        $('#myActivitiesTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    if(appData.views.PlannerView.myJoinedActivitiesView.length > 0){
      $('#myPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myPlanningTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myJoinedActivitiesView).each(function(dv) {
        $('#myPlanningTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    if(appData.views.PlannerView.myInvitedActivitiesView.length > 0){
      $('#myInvitationsPlanner', appData.settings.currentPageHTML).removeClass('hide');
      $('#myInvitationsTable', appData.settings.currentPageHTML).empty();

      _(appData.views.PlannerView.myInvitedActivitiesView).each(function(dv) {
        $('#myInvitationsTable', appData.settings.currentPageHTML).append(dv.render().$el);
      });
    }

    // update localstorage
    appData.services.utilService.updateLocalStorage();
  },

  render: function () {
    this.$el.html(this.template());
    appData.settings.currentPageHTML = this.$el;

    return this;
  }
});
