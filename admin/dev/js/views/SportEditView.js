appData.views.SportEditView = Backbone.View.extend({
    tagName: 'div',


    initialize: function () {
    	appData.views.SportEditView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.SportEditView.updateSportHandler = this.updateSportHandler;
      appData.views.SportEditView.fileErrorHandler = this.fileErrorHandler;   
    },

    events: {
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },

    fileErrorHandler: function(){
      Backbone.off('fileErrorEvent');
      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
    },

    render: function() {
   		this.$el.html(this.template({sport: this.model.toJSON(), imagePath: appData.settings.sportsPath}));
    	appData.settings.currentPageHTML = this.$el;

      appData.views.SportEditView.model = this.model;

      $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
         $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         return false;
      });

      $('#sportForm',appData.settings.currentPageHTML).validate({
        submitHandler: function(){
          appData.views.SportEditView.model.attributes.sport_title = $('#sportInput', appData.settings.currentPageHTML).val();
          
          Backbone.on('updateSportModel', appData.views.SportEditView.updateSportHandler);

          appData.views.SportEditView.model.attributes.upload = false;
          appData.services.phpService.updateSport(appData.views.SportEditView.model);
        }
      });

      return this;
    },

    updateSportHandler: function(){
      Backbone.off('updateSportModel');

      if(!appData.views.SportEditView.model.attributes.upload){
        window.location.hash = "sports";
      }
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.SportEditView.uploadedPhotoUrl = filename;

      $('#sportAvatar').attr("style", "background: url('" + appData.settings.sportsPath + appData.views.SportEditView.uploadedPhotoUrl + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');

      appData.views.SportEditView.model.attributes.icon = filename;
      appData.views.SportEditView.model.attributes.upload = true;

      Backbone.on('updateSportModel', appData.views.SportEditView.updateSportHandler);
      appData.services.phpService.updateSport(appData.views.SportEditView.model);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        var files = evt.target.files;
        appData.views.SportEditView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.SportEditView.files, function(key, value){
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.SportEditView.fileUploadedHandler);
      appData.services.phpService.uploadSportAvatar(data);
    },

});
