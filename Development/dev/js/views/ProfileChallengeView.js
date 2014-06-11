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

        $(window).resize(_.debounce(function(){
            appData.views.ProfileChallengeView.updateChallenges();
        }, 500));

         $('#badgesOverview', appData.settings.currentModuleHTML).hide();

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
        // badges grid
        var bwidth = $('#badgesOverview ul', appData.settings.currentModuleHTML).width();
        var bdwidth = $('#badgesOverview ul li',appData.settings.currentModuleHTML).first().width() + 12 + 2;
            bdwidth = parseInt(bdwidth);

        var howMany = appData.models.userModel.attributes.challengesCount;
        if(!isNaN(howMany)){
            $('#badgesOverview ul', appData.settings.currentModuleHTML).empty();
            for (var i=0; i<howMany; i++){
                $('#badgesOverview ul', appData.settings.currentModuleHTML).append('<li></li>');
            }          
        }
        $('#badgesOverview', appData.settings.currentModuleHTML).slideDown(200);

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

        // set equal grid height
        var t=0; // the height of the highest element (after the function runs)
        var t_elem;  // the highest element (after the function runs)
        $("#challengesOverview .challenge-item",appData.settings.currentModuleHTML).each(function () {
            $this = $(this);
            if ( $this.outerHeight() > t ) {
                t_elem=this;
                t=$this.outerHeight();
            }
        });
        $("#challengesOverview .challenge-item",appData.settings.currentModuleHTML).css({
            'min-height': t + 'px'
        });


        $('#myChallengesOverview', appData.settings.currentModuleHTML).addClass('hide');
        $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).empty();
        if(appData.views.myChallengesListView.length > 0){
            $('#myChallengesOverview', appData.settings.currentModuleHTML).removeClass('hide');
            _(appData.views.myChallengesListView).each(function(listView) {
                $('#myChallengesOverviewTable', appData.settings.currentModuleHTML).append(listView.render().$el);
            });
        }

        t=0; // the height of the highest element (after the function runs)
        t_elem;  // the highest element (after the function runs)
        $("#myChallengesOverview .challenge-item",appData.settings.currentModuleHTML).each(function () {
            $this = $(this);
            if ( $this.outerHeight() > t ) {
                t_elem=this;
                t=$this.outerHeight();
            }
        });
        $("#myChallengesOverview .challenge-item",appData.settings.currentModuleHTML).css({
            'min-height': t + 'px'
        });

        // bekijken
        if(appData.views.myBadgesListView.length > 0){
            var ind = 0;

            _(appData.views.myBadgesListView).each(function(listView) {
                $('#badgesOverview ul li:eq(' + ind + ')', appData.settings.currentModuleHTML).append(listView.render().$el).addClass('badger');
                ind++;
            });
        }

        // show a message when there are nog challenges availible
        if(appData.views.myChallengesListView.length === 0 && appData.views.challengeListView.length === 0){
            $('.no-found', appData.settings.currentModuleHTML).removeAttr('style');
        }else{
            $('.no-found', appData.settings.currentModuleHTML).css('display', 'none');
        }

        appData.services.utilService.updateLocalStorage();
    }
});