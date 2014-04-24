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
      this.setValidators();

      $('#messageBox', appData.settings.currentPageHTML).removeClass('hide');

      return this; 
    },

    events: {
      "click #messageSubmit": "messageSubmitHandler"
    },

    postMessageSuccesHandler: function(){

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
    },

    setValidators: function(){
      $("#messageForm",appData.settings.currentModuleHTML).validate({
          submitHandler: function(form) {
            var message = $('#messageInput', appData.settings.currentModuleHTML).val();
            $('#messageInput', appData.settings.currentModuleHTML).empty();
            
            appData.services.phpService.addMessage(message, appData.views.ActivityDetailView.model.attributes.activity_id);   
          }
      });
    },

    messageSubmitHandler: function(){
      $("#messageForm",appData.settings.currentModuleHTML).submit();
    }


});
