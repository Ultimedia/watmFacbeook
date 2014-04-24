appData.views.CreateActivityView = Backbone.View.extend({

    initialize: function () {

        // check if we are updating or creating
        if(this.model){

            if(this.model.attributes.updateActivity){
                appData.views.CreateActivityView.updating = this.model.attributes.updateActivity;
                appData.views.ActivityDetailView.model = this.model;

                appData.views.CreateActivityView.isUpdating = true;
            }else{
                appData.views.ActivityDetailView.model = new Activity();
                appData.views.CreateActivityView.isUpdating = false;
            }
        }else{
            appData.views.ActivityDetailView.model = new Activity();
            appData.views.CreateActivityView.isUpdating = false;
        }

        appData.events.createActivityTabsEvent.bind("formStageCompleteEvent", this.formStageCompleteEvent);
        
        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){


    },

    // phonegap device back online
    networkLostHandler: function(){

    },
    
    render: function() { 
    	this.$el.html(this.template());
        this.currentActivityPage = '#watContent';

        appData.settings.currentPageHTML = this.$el;

        var view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);

        // if this user doesn't have friends, just hide the friends tab from the flow
        if(appData.models.userModel.attributes.myFriends.models.length === 0){
            $('#wieTab', appData.settings.currentPageHTML).addClass('hide');
        }

        if(appData.views.CreateActivityView.isUpdating){
            $('.cl-title', appData.settings.currentPageHTML).text('Wijzig activitiet');
        }

        return this; 
    }, 

    events: {
      "click #submitButton": "subHandler"
    },

    subHandler: function(){
        if($('form').is('#wieForm')){
            if(appData.views.CreateActivityView.updating){
                Backbone.on('activityUpdated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                appData.services.phpService.updateActivity(appData.views.ActivityDetailView.model);

            }else{
                Backbone.on('activityCreated', appData.views.CreateActivityLocationView.activityCreatedHandler);
                appData.services.phpService.createActivity(appData.views.ActivityDetailView.model);
            }
        }else{
            $('form',appData.settings.currentPageHTML).submit();
        }
    },

    formStageCompleteEvent: function(data){

        var location = data.location;
        var tab = data.tab;

        $('#createActivityTabs .cl-btn').removeClass('active');
        $(tab, appData.settings.currentPageHTML).addClass('active');

        // tab on activity detail
        $(this.currentActivityPage, appData.settings.currentPageHTML).removeClass('show').addClass('hide');
        $(location, appData.settings.currentPageHTML).removeClass('hide').addClass('show');

        this.currentActivityPage = location;

        var view;
        switch(location){
            case "#watContent":
                view = new appData.views.CreateActivityInfoView({ model:  appData.views.ActivityDetailView.model});
            break;

            case "#waarContent":
                view = new appData.views.CreateActivityLocationView({ model:  appData.views.ActivityDetailView.model});

                if(appData.models.userModel.attributes.myFriends.models.length === 0){

                    if(appData.views.CreateActivityView.isUpdating){
                        $('#submitButton').val('Activiteit bijwerken');
                    }else{
                        $('#submitButton').val('Activiteit aanmaken');
                    }
                }
            break;

            case "#wieContent": 
                view = new appData.views.CreateActivityWieView({ model:  appData.views.ActivityDetailView.model});
                
                if(appData.views.CreateActivityView.isUpdating){
                    $('#submitButton').val('Activiteit bijwerken');
                }else{
                    $('#submitButton').val('Activiteit aanmaken');
                }
            break;
        }

        $('#createActivityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        
    }
});

