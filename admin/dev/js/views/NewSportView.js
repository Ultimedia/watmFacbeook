appData.views.NewSportView = Backbone.View.extend({
    initialize: function () {
      appData.views.NewSportView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.NewSportView.addedSportHandler = this.addedSportHandler;
    },

    events: {
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },
      
    render: function() {
    	appData.views.NewSportView.model = this.model = new Sport();

    	this.$el.html(this.template({sport: this.model.toJSON(), imagePath: appData.settings.sportsPath}));
		  appData.settings.currentPageHTML = this.$el;

      $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
         $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         return false;
      });

      $('#sportForm',appData.settings.currentPageHTML).validate({
        submitHandler: function(){
          appData.views.NewSportView.model.attributes.sport_title = $('#sportInput', appData.settings.currentPageHTML).val();
          
          Backbone.on('addedSportHandler', appData.views.NewSportView.addedSportHandler);

          appData.views.NewSportView.model.attributes.upload = false;
          appData.services.phpService.addSport(appData.views.NewSportView.model);
        }
      });

      return this;
    },

    addedSportHandler: function(){
      Backbone.off('updateSportModel');

      if(!appData.views.NewSportView.model.attributes.upload){
        window.location.hash = "sports";
      }
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.NewSportView.uploadedPhotoUrl = filename;

      $('#sportAvatar').attr('src',appData.settings.sportsPath +  appData.views.NewSportView.uploadedPhotoUrl).removeClass('hide');
      appData.views.NewSportView.model.attributes.icon = filename;
      appData.views.NewSportView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        var files = evt.target.files;
        appData.views.NewSportView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.NewSportView.files, function(key, value){
        data.append(key, value);
      });
      console.log(data);


      Backbone.on('fileUploadedEvent', appData.views.NewSportView.fileUploadedHandler);
      appData.services.phpService.uploadSportAvatar(data);
    }
});
