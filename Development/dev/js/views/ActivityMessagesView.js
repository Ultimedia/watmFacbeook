appData.views.ActivityMessagesView = Backbone.View.extend({

    initialize: function () {
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);

      Backbone.on('getMessages', this.chatMessagesLoadSuccesHandler);
    	appData.services.phpService.getMessages(this.model); 

      appData.views.ActivityMessagesView.messagesLoaded = this.chatMessagesLoadSuccesHandler;
      appData.views.ActivityMessagesView.model = this.model;

      // chat timer
      appData.settings.timer = setInterval(this.timerAction, 2000);
       

    }, 

    timerAction: function(){
      Backbone.on('getMessages', appData.views.ActivityMessagesView.messagesLoaded);
      appData.services.phpService.getMessages(appData.views.ActivityMessagesView.model); 
    },

    render: function() { 
    	// model to template
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      return this; 
    },

    postMessageSuccesHandler: function(){
      $('#messageInput', appData.settings.currentModuleHTML).val('');

      // update messages
      appData.services.phpService.getMessages(appData.views.ActivityDetailView.model);  
      appData.services.utilService.updateLocalStorage();
    },

    chatMessagesLoadSuccesHandler: function(messages){
      Backbone.off('getMessages');

      appData.views.ActivityDetailView.model.attributes.messages = messages;
      if(appData.views.ActivityDetailView.model.attributes.messages.length > 0){

          appData.views.ActivityDetailView.messagesListView = [];
          appData.views.ActivityDetailView.model.attributes.messages.each(function(message) {
            appData.views.ActivityDetailView.messagesListView.push(new appData.views.ActivityMessageView({
              model : message
            }));
        });

        $('#messagesContent ul', appData.settings.currentModuleHTML).empty();
        _(appData.views.ActivityDetailView.messagesListView).each(function(dv) {
            $('#messagesContent ul', appData.settings.currentModuleHTML).append(dv.render().$el);
        });

      }else{

      }
    }
});