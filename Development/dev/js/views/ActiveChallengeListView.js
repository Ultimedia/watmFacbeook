appData.views.ActiveChallengeListView = Backbone.View.extend({
    className: 'challenge-item',

    initialize: function () {
    	this.model.attributes.badges_path = appData.settings.badgesPath;

    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template(this.model.attributes));
        $(this.$el).hide().fadeIn(500);

    	var percentage = 0;
    	var total;
    	var count;
    	var totalfilters = 0;

        if(this.model.attributes.status){
            if(this.model.attributes.status.sportsFilter){
            	total = this.model.attributes.challengeData.sportsFilter.total;
            	count = this.model.attributes.status.sportsFilter.count;
            	percentage += (count / total)*100;
            
            	totalfilters++;
            }

            if(this.model.attributes.status.activityCreateFilter){
          		total = this.model.attributes.challengeData.activityCreateFilter.total;
            	count = this.model.attributes.status.activityCreateFilter.count;

            	percentage += (count / total)*100;

            	totalfilters++;
            }

            if(this.model.attributes.status.fotoCreateFilter){
            	total = this.model.attributes.challengeData.fotoCreateFilter.total;
            	count = this.model.attributes.status.fotoCreateFilter.count;
            	percentage += (count / total)*100;

            	totalfilters++;
            }

            if(this.model.attributes.status.participateFilter){
            	total = this.model.attributes.challengeData.participateFilter.total;
            	count = this.model.attributes.status.participateFilter.count;
            	percentage += (count / total)*100;

            	totalfilters++;
            }
        }
        var finalePercentage = percentage / totalfilters;


        $( ".progress", this.$el).progressbar({
            value: finalePercentage
        });

        return this; 

    }

});


