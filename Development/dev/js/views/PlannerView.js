appData.views.PlannerView = Backbone.View.extend({

  initialize: function () {

    appData.views.PlannerView.updatePlanner = this.updatePlanner;
    appData.views.PlannerView.updatePlannerComplete = this.updatePlannerComplete;
    appData.views.PlannerView.getInvitationsHandler = this.getInvitationsHandler;
    appData.views.PlannerView.acceptedInvite = this.acceptInviteHandler;
    appData.views.PlannerView.firstRet = true;
    Backbone.on('acceptInviteHandler', this.acceptInviteHandler);

    // Update when a user accepts / declines an invitation
    appData.views.PlannerView.acceptedInvite = this.acceptedInvite;
  
    // update the activities if we have a network connection
    Backbone.on('dashboardUpdatedHandler', this.generateTimeLine);
    if(appData.settings.native){
        if(appData.services.utilService.getNetworkConnection()){
            appData.services.phpService.getActivities(false, null);
        }
    }else{
        appData.services.phpService.getActivities(false, null);
    }

    Backbone.on('networkFoundEvent', this.networkFoundHandler);
    Backbone.on('networkLostEvent', this.networkLostHandler);

    // image timer
    appData.settings.timer = setInterval(this.timerAction, 20000);
  }, 

  generateTimeLine: function(){

      appData.views.activityListView = [];
      appData.collections.activities.each(function(activity) {

        var add = false;

        // am I going to this activity? 
        if(activity.attributes.user_id == appData.models.userModel.attributes.user_id){

          // I am a creator
          add = true;
          activity.attributes.author_badge = true;
        }else{

          // I set the going to true
          $(activity.attributes.users).each(function(index, element){
              if(element.user_id == appData.models.userModel.attributes.user_id){
                activity.attributes.author_badge = false;
                add = true;
              }
          });
        }

        if(add){
          appData.views.activityListView.push(new appData.views.PlannerMyActivitiesView({
            model : activity
          }));
        }
      });

      $('#plannerMap', appData.settings.currentPageHTML).empty();
      
      var first = true;
      var lastDate;
      var savedDate;

      _(appData.views.activityListView).each(function(element, index) {


          // same date
          if(lastDate == element.model.attributes.savedDate){
              $('#plannerMap .planner-section .plan-list', appData.settings.currentPageHTML).last().append(element.render().$el);
          
          // andere datum (nieuwe tijdlijn)
          }else{
            var savedDate = "";
            var dateCheck = element.model.attributes.date.split(" ");

            switch(dateCheck[0]){
              case "Vandaag":
                savedDate = dateCheck[0];
              break;

              case "Morgen":
                savedDate = dateCheck[0];
              break;
            }

            // convert to readable date
            if(savedDate === ""){
              savedDate = element.model.attributes.date;
            }

            fr = new appData.views.PlannerTimelineWrap();
            $('#plannerMap',appData.settings.currentPageHTML).append(fr.render().$el);
            $('#plannerMap h3', appData.settings.currentPageHTML).last().text(savedDate);
            $('#plannerMap .planner-section .plan-list', appData.settings.currentPageHTML).last().append(element.render().$el).hide();

            if(appData.views.PlannerView.firstRet){
              appData.views.PlannerView.firstRet = false;
              $('.plan-list', appData.settings.currentPageHTML).show(600);
            }else{
              $('.plan-list', appData.settings.currentPageHTML).show();
            }
          }

          lastDate = element.model.attributes.savedDate;
        });

        // bind click handler
        $('.plan-list li', appData.settings.currentPageHTML).click(function(evt){
          
            var id = $('h2',evt.currentTarget).attr('data-id');
            if(id){
              
              if($(evt.target).hasClass('edit-badge-hitbox')){
                window.location.href = "#update/" + id;
              }else{
                window.location.href = "#activity/" + id;
              }
            }
        });

        appData.services.utilService.updateLocalStorage();
  },

  timerAction: function(){
    Backbone.on('dashboardUpdatedHandler', this.generateTimeLine);
    if(appData.settings.native){
        if(appData.services.utilService.getNetworkConnection()){
            appData.services.phpService.getActivities(false, null);
        }
    }else{
        appData.services.phpService.getActivities(false, null);
    }
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
      "click .inviteButtons a":"handleInviteHandler",
      "click #menuButton": "menuOpenHandler"
  },

  menuOpenHandler: function(){
        $("#mainMenu").trigger("open");
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
/*
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
    // show a message when no-once responds
    if(appData.views.PlannerView.myActivitiesView.length === 0 && appData.views.PlannerView.myInvitedActivitiesView.length === 0 && appData.views.PlannerView.myJoinedActivitiesView.length === 0){
      $('#profileMessage', appData.settings.currentPageHTML).removeClass('hide');
    }else{
      $('#profileMessage', appData.settings.currentPageHTML).addClass('hide');
    }

*/

    // update localstorage
    appData.services.utilService.updateLocalStorage();
  },

  render: function () {
    this.$el.html(this.template());
    appData.settings.currentPageHTML = this.$el;

    return this;
  }
});
