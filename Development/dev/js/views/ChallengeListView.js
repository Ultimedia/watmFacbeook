appData.views.ChallengeListView = Backbone.View.extend({
    className: 'challenge-item',
    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        appData.views.ChallengeListView.my = this.$el;
        $(this.$el).hide().fadeIn(500);

        return this; 
    },

    events: {
    	"click .joinChallenge": "joinChallengeClickHandler"
    },

    joinChallengeClickHandler: function(evt){
    	appData.services.phpService.joinChallenge($(evt.target).attr('challenge-id'));
        $(appData.views.ChallengeListView.my).hide(300);
    }

});


