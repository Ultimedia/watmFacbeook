appData.views.ActivityMediaView = Backbone.View.extend({

    initialize: function () {
      appData.events.getMediaSuccesEvent.bind("mediaLoadSuccesHandler", this.getMediaLoadSuccesHandler);
      appData.services.phpService.getMedia(this.model); 
      appData.views.ActivityMediaView.model = this.model;
      appData.views.ActivityMediaView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.ActivityMediaView.addPhotoToDatabaseHandler = this.addPhotoToDatabaseHandler;

      appData.views.ActivityMediaView.win = this.win;
    },

    events: {
      "click #addMediaButton": "capturePhotoEditHandler",
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler"
    },

    getMediaLoadSuccesHandler: function(media){

      appData.views.ActivityDetailView.mediaListView = [];
      appData.views.ActivityDetailView.model.attributes.media = media;
      appData.views.ActivityDetailView.model.attributes.media.each(function(mediaModel) {

          var mediaUser = appData.collections.users.where({user_id:mediaModel.attributes.user_id});
            if(mediaUser){

              mediaUser = mediaUser[0];
              
              mediaModel.attributes.userModel = mediaUser.attributes;
              mediaModel.attributes.url = mediaModel.attributes.url;
              mediaModel.attributes.imagePath = appData.settings.imagePath;

            appData.views.ActivityDetailView.mediaListView.push(new appData.views.ActivityMediaViewer({
              model : mediaModel
            }));
          }
      });

      $('#mediaContenList', appData.settings.currentModuleHTML).empty();
      _(appData.views.ActivityDetailView.mediaListView).each(function(dv) {
          $('#mediaContenList', appData.settings.currentModuleHTML).append(dv.render().$el);
      });
    },

    render: function() { 
      this.$el.html(this.template(this.model.attributes));
      appData.settings.currentModuleHTML = this.$el;

      // Hide the upload button if we're not on a native device
      if(appData.settings.native){

      }else{
        $("#addMediaButton", appData.settings.currentModuleHTML).click(function(){
           $("#nonNativeFileField", appData.settings.currentModuleHTML).trigger('click');
           return false;
        });
      }

      $('#messageBox', appData.settings.currentPageHTML).removeClass('hide').css('opacity', 0);

        return this; 
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.ActivityMediaView.files, function(key, value)
      {
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.ActivityMediaView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        // do some checks
        var files = evt.target.files;
        appData.views.ActivityMediaView.files = files;

        $('#mediaForm', appData.settings.currentModuleHTML).submit();
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');

      Backbone.on('addPhotoToDatabaseHandler', appData.views.ActivityMediaView.addPhotoToDatabaseHandler);
      appData.services.phpService.addPhotoToDatabase(filename, appData.views.ActivityMediaView.model.attributes.activity_id);
    },

    capturePhotoEditHandler: function() {

      var page = this.$el;

      // Retrieve image file location from specified source
      navigator.camera.getPicture(this.uploadPhoto,
        function(message) { 
        },{ quality: 50, targetWidth: 640, targetHeight: 480, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.CAMERA }
      );

        //appData.services.phpService.upploadMediaNonNative(); 
    },

    uploadPhoto: function(imageURI) {
      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType="image/jpeg";

      var params = new Object();
      params.value1 =  options.fileName;
      appData.views.ActivityMediaView.uploadedPhotoUrl = options.fileName;

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();  
      ft.upload(imageURI, appData.settings.servicePath + appData.settings.imageUploadService, appData.views.ActivityMediaView.win, null, options);    
    },

    win: function(r) {

      Backbone.on('addPhotoToDatabaseHandler', appData.views.ActivityMediaView.addPhotoToDatabaseHandler);
      appData.services.phpService.addPhotoToDatabase(appData.views.ActivityMediaView.uploadedPhotoUrl, appData.views.ActivityMediaView.model.attributes.activity_id);
    },

    addPhotoToDatabaseHandler: function(){

      // update
      appData.services.challengeService.checkChallenges(appData.models.userModel, false, false, true, false);

      // get images from database
      Backbone.off('addPhotoToDatabaseHandler');
      appData.services.phpService.getMedia(appData.views.ActivityMediaView.model); 
      appData.services.utilService.updateLocalStorage();
    }
});

