appData.views.ActivityDetailView = Backbone.View.extend({

    initialize: function () {
      console.log('----- In the initialize of ActivityDetailView -----');
      appData.views.ActivityDetailView.model = this.model;
      appData.views.ActivityDetailView.wallPostCompleteHandler = this.wallPostCompleteHandler;
      appData.views.ActivityDetailView.addMap = this.addMap;

      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device online
    networkFoundHandler: function(){
      if(!appData.settings.mapAdded && appData.services.utilService.getNetworkConnection()){
        appData.views.ActivityDetailView.addMap();
      }
    },

    // phonegap device back online
    networkLostHandler: function(){
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentPageHTML = this.$el;

      this.currentActivityPage = '#praktischContent';
      
      // add the default page
      var defaultView = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
      $('#activityContent', appData.settings.currentPageHTML).empty().append(defaultView.render().$el);

      // user is admin? (show edit options)
      /*
      if(appData.models.userModel.get("user_id") == this.model.get("user_id")){
        $('#editPanel', appData.settings.currentPageHTML).removeClass('hide');
      }*/

      var elementPosition = $('#activityDetailTabs', appData.settings.currentPageHTML).offset();

      appData.settings.mapAdded = false;
      if(appData.services.utilService.getNetworkConnection() && appData.settings.native){
         this.addMap();
      }else if(!appData.settings.native){
         this.addMap();
      }

      this.setValidators();
      $('#ee', appData.settings.currentPageHTML).delay(800).queue(function() {
          $(this).hide().css('display', 'block').textfill({max: 22}).show();
      });

      $(window).resize(_.debounce(function(){
          $('#ee', appData.settings.currentPageHTML).textfill();
      }, 500));
            
      return this; 
    }, 

    shareButtonHandler: function(){

    },

    setValidators: function(){
      $("#messageForm",appData.settings.currentPageHTML).validate({
          submitHandler: function(form) {

            var message = $('#messageInput', appData.settings.currentPageHTML).val();
            $('#messageInput', appData.settings.currentPageHTML).val('');
            
            appData.services.phpService.addMessage(message, appData.views.ActivityDetailView.model.attributes.activity_id);   
          }
      });
    },

    messageSubmitHandler: function(){
      $("#messageForm",appData.settings.currentPageHTML).submit();
    },

    addMap: function(){
        appData.settings.mapAdded = true;
        
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(14, 10),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        }
        var map = new google.maps.Map($('#activityMap',appData.settings.currentPageHTML)[0], mapOptions);
        
        var coordinates;
        if(this.model.attributes.coordinates){
           coordinates =  this.model.attributes.coordinates.split(',');

          var activityImage = new google.maps.MarkerImage(appData.settings.iconPath + "open-icon@x2.png", null, null, null, new google.maps.Size(26,30)); // Create a variable for our marker image.
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(coordinates[0], coordinates[1]),
            map:  map,
            title: 'Huidige locatie',
            icon: activityImage,
            optimized: false
          });

          // resize and relocate map
          google.maps.event.addListenerOnce(map, 'idle', function() {
            google.maps.event.trigger(map, 'resize');
            map.setCenter(new google.maps.LatLng(coordinates[0], coordinates[1]), 13);
          });
        }
    },

    events: {
      "click #activityDetailTabs .cl-btn": "activeDetailTabsHandler",
      "click #navigateButton": "navigateClickHandler",
      "click #backButton": "backHandler",
      "click #shareButton": "sharePopopverClickHandler",
      "click #popover-close": "sharePopopverClickHandler",
      "click #updateButton": "updateButtonClickHandler",
      "click #facebookShareButton": "facebookShareButtonClickHandler",
      "click #messageSubmit": "messageSubmitHandler",
      "click .cl-modal-backdrop": "modalDrop"
    },

    modalDrop: function(){
      $('#popover', appData.settings.currentPageHTML).addClass('hide');
    },

    facebookShareButtonClickHandler: function(){
      Backbone.on('FacebookWallPostCompleteEvent', appData.views.ActivityDetailView.wallPostCompleteHandler);
      
      // share doesn't work on the device at the moment
      appData.services.facebookService.facebookWallpost(appData.views.ActivityDetailView.model);
    },

    wallPostCompleteHandler: function(){
      Backbone.off('FacebookWallPostCompleteEvent');
      $('#popover', appData.settings.currentPageHTML).addClass('hide');
    },

    updateButtonClickHandler: function(){
      window.location.hash = "#update/" + appData.views.ActivityDetailView.model.attributes.activity_id;
    },

    sharePopopverClickHandler: function(e){
      if($('#popover', appData.settings.currentPageHTML).hasClass('hide')){
        $('#popover', appData.settings.currentPageHTML).removeClass('hide');
        $('#bd', appData.settings.currentPageHTML).hide().show(300);
      }else{
        $('#bd', appData.settings.currentPageHTML).hide(300, function(){
          $('#popover', appData.settings.currentPageHTML).addClass('hide');
        });

      }

      toggleClass('hide').slideUp();
    },

    backHandler: function(){
      window.history.back();
    },

    navigateClickHandler: function(){
      appData.router.navigate('navigater', true);
    },

    activeDetailTabsHandler: function(evt) { 
        // tab on activity detail
        $('#activityDetailTabs .cl-btn').removeClass('active');
        $(evt.target, appData.settings.currentPageHTML).addClass('active');

        var selectedPage = $(evt.target, appData.settings.currentPageHTML).attr('data');
        var view;
        clearInterval(appData.settings.timer);


        $('#messageBox', appData.settings.currentPageHTML).removeClass('open');


        switch(selectedPage){
          case "#praktischContent":
            view = new appData.views.ActivityInfoView({model : appData.views.ActivityDetailView.model});
          break;

          case "#mediaContent":
            view = new appData.views.ActivityMediaView({model : appData.views.ActivityDetailView.model});
          break;

          case "#messagesContent":
            view = new appData.views.ActivityMessagesView({model : appData.views.ActivityDetailView.model});
            $('#messageBox', appData.settings.currentPageHTML).addClass('open');
          break;
        }

        
        $('#activityContent', appData.settings.currentPageHTML).empty().append(view.render().$el);
        this.currentActivityPage = selectedPage;
    }

});

