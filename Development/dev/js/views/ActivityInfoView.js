appData.views.ActivityInfoView = Backbone.View.extend({

    initialize: function () {
        appData.events.goinToActivitySuccesEvent.bind("goingToActivitySuccesHandler", this.goingToActivitySuccesHandler)
        appData.models.activityModel = this.model;
        
        Backbone.on('activityUsersSuccesEvent', this.getActivityUsersSuccesHandler);
        Backbone.on('goinToActivitySuccesEvent', this.setGoingToActivityCompleteHandler);

        appData.views.ActivityInfoView.model = this.model;

        // update the activities if we have a network connection
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getActivityUsers(this.model); 
            }else{
                $('#createActivityButton').hide();
            }
        }else{
            appData.services.phpService.getActivityUsers(this.model); 
        }

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);

    }, 

    // phonegap device online
    networkFoundHandler: function(){
        appData.services.phpService.getActivityUsers(this.model); 
    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    render: function() { 
    	this.$el.html(this.template(this.model.attributes));
    	appData.settings.currentModuleHTML = this.$el;

        $('#praktischContent .radio-list input[type="radio"]', this.$el).change(function() {
                    // Remove all checked
            $(this).parents('.radio-list').find('label').removeClass('checked');
            $(this).parent().addClass('checked');

            var selectedData = $(this).attr('id');
                selectedData = selectedData.split('-');
                selectedData = selectedData[1];
                
                appData.services.phpService.setGoingToActivity(appData.models.activityModel.attributes.activity_id, selectedData);
                
                if(selectedData == 1){
                    appData.services.challengeService.checkChallenges(appData.models.userModel, true, false, false, true, appData.models.activityModel);
                }
        });

      $('#messageBox', appData.settings.currentPageHTML).addClass('hide');

        return this; 
    },

    setGoingToActivityCompleteHandler: function(){
        appData.services.phpService.getActivityUsers(appData.views.ActivityInfoView.model); 
    },

    getActivityUsersSuccesHandler: function(data){

        appData.models.activityModel.userData = new UsersCollection(data);

        // 1 set toggle switch for going
        var goingTo = appData.models.activityModel.userData.where({user_id:appData.models.userModel.attributes.user_id.toString()});
            goingTo = goingTo[0];

        if(goingTo){
            $('#praktischContent .radio-list label').removeClass('checked');
            $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).parent().addClass('checked');
            $("#going-" + goingTo.attributes.going, appData.settings.currentModuleHTML).prop('checked', true);
        }else{
            $('#praktischContent .radio-list label').removeClass('checked');
            $("#going-0", appData.settings.currentModuleHTML).parent().addClass('checked');
            $("#going-0", appData.settings.currentModuleHTML).prop('checked', true);
        }

        // 2 show friends that are going
        $('#aanwezigContent').empty();
        appData.views.ActivityInfoView.userListView = [];
        appData.views.ActivityDetailView.model.attributes.users = data;


        var filteredUsers = _(appData.views.ActivityDetailView.model.attributes.users).where({"going": "1"});
        $(filteredUsers).each(function(index,userModel) {
          appData.views.ActivityInfoView.userListView.push(new appData.views.ActivityUserView({
            model : userModel
        }));

        appData.views.ActivityDetailView.model.attributes.going = filteredUsers.length;
        appData.views.ActivityDetailView.model.isFull();

        $('#aanwezigContent', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityInfoView.userListView).each(function(dv) {
          $('#aanwezigContent', appData.settings.currentModuleHTML).append(dv.render().$el);
        });
        $('#participantStat').text(appData.views.ActivityInfoView.userListView.length + " / " + appData.views.ActivityDetailView.model.attributes.participants);    
      });



     // disable options if the activity is full
     var goingCheck = false;
     if(goingTo){
        if(goingTo.attributes.going == 0){
            goingCheck = false;
        }else{
            goingCheck = true;
        }
     }

     if(appData.views.ActivityInfoView.userListView.length >= parseInt(appData.views.ActivityDetailView.model.attributes.participants) && !goingCheck){
        $('#goingList', appData.settings.currentModuleHTML).hide();
        $('#goingFullMessage', appData.settings.currentModuleHTML).show();
     }else if(goingTo){
        $('#goingList', appData.settings.currentModuleHTML).show();
        $('#goingFullMessage', appData.settings.currentModuleHTML).hide();
     }else{
        $('#goingFullMessage', appData.settings.currentModuleHTML).hide();
        $('#goingList', appData.settings.currentModuleHTML).show();
     }
    }
});

