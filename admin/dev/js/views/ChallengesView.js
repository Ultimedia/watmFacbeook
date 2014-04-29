appData.views.ChallengesView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('getChallengesHandler', this.getChallengesHandler);
        Backbone.on('removeChallengeHandler', this.challengeRemovedHandler);

        appData.services.phpService.getChallenges();
        appData.views.ChallengesView.challengeRemovedHandler = this.challengeRemovedHandler;
    },

      
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;
      $('#remove-modal').modal();

      return this;
    },

    challengeRemovedHandler: function(){
      Backbone.off('removeChallengeHandler');
    },

    getChallengesHandler: function(){
      Backbone.off('getChallengesHandler');

      console.log(appData.collections);

      $('#challenges-table tbody').empty();
      appData.collections.challenges.each(function(user) {
        var aView = new appData.views.DashboardChallengesView({model : user});

        $('#challenges-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
      });

      $('#remove-modal').on('show.bs.modal', function (e) {
          appData.views.ChallengesView.challengeID = $(e.relatedTarget).attr('data-id');
          appData.views.ChallengesView.selectedChallenge = $(e.relatedTarget).parent().parent();
          
          var myChallenge = appData.collections.challenges.where({'challenge_id': appData.views.ChallengesView.challengeID})[0];
          $('#remove-modal h4 span').text(myChallenge.attributes.title);
      });

      $('.modal-footer #remove').click(function(){
          Backbone.on('removeChallengeHandler', appData.views.ChallengesView.challengeRemovedHandler);
          appData.services.phpService.removeChallenge(appData.views.ChallengesView.challengeID);
          $(appData.views.ChallengesView.selectedChallenge).hide(400);
      });
    }
});
