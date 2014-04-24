appData.views.ChallengeListView = Backbone.View.extend({

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        return this; 
    },

    events: {
    	"click .joinChallenge": "joinChallengeClickHandler"
    },

    joinChallengeClickHandler: function(evt){
    	appData.services.phpService.joinChallenge($(evt.target).attr('challenge-id'));
    }

});


