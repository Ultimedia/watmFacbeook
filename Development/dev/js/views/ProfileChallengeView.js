appData.views.ProfileChallengeView = Backbone.View.extend({

    initialize: function () {
        appData.views.ProfileChallengeView.updateChallenges = this.updateChallenges;
        appData.views.ProfileChallengeView.getChallengesCompleteHandler = this.getChallengesCompleteHandler;
        appData.views.ProfileChallengeView.getMyChallengesCompleteHandler = this.getMyChallengesCompleteHandler;
        appData.views.ProfileChallengeView.getMyBadgesCompleteHandler = this.getMyBadgesCompleteHandler;
        
        Backbone.on('joinedChallengeHandler', this.joinedChallengeSuccesHandler);
        Backbone.on('getChallengesHandler', appData.views.ProfileChallengeView.getChallengesCompleteHandler);
        
        if(appData.settings.native){
            if(appData.services.utilService.getNetworkConnection()){
                appData.services.phpService.getChallenges();
            }else{
                this.updateChallenges();
            }
        }else{
            appData.services.phpService.getChallenges();
        }

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device online
    networkFoundHandler: function(){
        appData.services.phpService.getChallenges();
    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() { 
    	this.$el.html(this.template());
        appData.settings.currentModuleHTML = this.$el;
        this.updateChallenges();

        return this; 
    },

    joinedChallengeSuccesHandler: function(){
        Backbone.on('getChallengesHandler', appData.views.ProfileChallengeView.getChallengesCompleteHandler);
        appData.services.phpService.getChallenges();
    },

    getChallengesCompleteHandler: function(){
        Backbone.off('getChallengesHandler');
        Backbone.on('getMyChallengesHandler', appData.views.ProfileChallengeView.getMyChallengesCompleteHandler);
        appData.services.phpService.getMyChallengesHandler();
    },

    getMyChallengesCompleteHandler: function(){
        Backbone.off('getMyChallengesHandler');
        Backbone.on('getMyBadgesHandler', appData.views.ProfileChallengeView.getMyBadgesCompleteHandler);
        appData.services.phpService.getMyBadges();
    },

    getMyBadgesCompleteHandler: function(){
        Backbone.off('getMyBadgesHandler');
        appData.views.ProfileChallengeView.updateChallenges();
    },

    updateChallenges: function(){
        appData.views.challengeListView = [];
        appData.collections.challenges.each(function(challenge) {
        appData.views.challengeListView.push(new appData.views.ChallengeListView({
            model : challenge
          }));
        });

        appData.views.myChallengesListView = [];
        appData.models.userModel.attributes.myChallenges.each(function(myChallenge){
        appData.views.myChallengesListView.push(new appData.views.ActiveChallengeListView({
            model: myChallenge
            }));
        });

        appData.views.myBadgesListView = [];
        appData.models.userModel.attributes.myBadges.each(function(myBadge){
        appData.views.myBadgesListView.push(new appData.views.BadgeListView({
            model: myBadge
            }));
        });

        $('#challengesOverview', appData.settings.currentModuleHTML).addClass('hide');
        $('#challengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.challengeListView.length > 0){
            $('#challengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.challengeListView).each(function(listView) {
                $('#challengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        $('#myChallengesOverview', appData.settings.currentModuleHTML).addClass('hide');
        $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.myChallengesListView.length > 0){
            $('#myChallengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.myChallengesListView).each(function(listView) {
                $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        $('#badgesOverview', appData.settings.currentModuleHTML).addClass('hide').empty();
        if(appData.views.myBadgesListView.length > 0){
            $('#badgesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.myBadgesListView).each(function(listView) {
                $('#badgesOverview', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        appData.services.utilService.updateLocalStorage();
    }
});