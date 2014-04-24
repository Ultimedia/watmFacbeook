appData.views.ActivityMessageView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    }, 

    render: function() { 
    	// model to template
    	this.$el.html(this.template({user: this.model.attributes, imagePath: appData.settings.imagePath}));
        return this; 
    }

});
