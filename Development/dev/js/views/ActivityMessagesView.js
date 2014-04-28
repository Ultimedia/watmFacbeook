appData.views.ActivityMessagesView = Backbone.View.extend({

    initialize: function () {
    	appData.events.getMessagesSuccesEvent.bind("chatMessagesLoadSuccesHandler", this.chatMessagesLoadSuccesHandler);
    	appData.events.postMessageSuccesEvent.bind("postMessageSuccesHandler", this.postMessageSuccesHandler);
    	appData.services.phpService.getMessages(this.model); 
    }, 

    render: function() { 
    	// model to template
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      setTimeout(function(){
        appData.services.phpService.getMessages(this.model); 
      }, 5000);

      return this; 
    },

    postMessageSuccesHandler: function(){
      $('#messageInput', appData.settings.currentModuleHTML).val('');

      // update messages
      appData.services.phpService.getMessages(appData.views.ActivityDetailView.model);  
      appData.services.utilService.updateLocalStorage();
    },

    chatMessagesLoadSuccesHandler: function(messages){
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