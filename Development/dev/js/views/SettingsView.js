appData.views.SettingsView = Backbone.View.extend({

    initialize: function () {
    	appData.views.SettingsView.avatarUploadHandler = this.avatarUploadHandler;
    	appData.views.SettingsView.avatarUpdatedHandler = this.avatarUpdatedHandler;
      appData.views.SettingsView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.SettingsView.generateFavouriteSportList = this.generateFavouriteSportList;

      Backbone.on('networkFoundEvent', this.networkFoundHandler);
      Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function () {
      this.$el.html(this.template({imagePath: appData.settings.imagePath, user: appData.models.userModel.attributes}));
      appData.settings.currentPageHTML = this.$el;

      if(appData.settings.native){

      }else{
        $("#changeAvatar", appData.settings.currentPageHTML).click(function(){
           $("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
           return false;
        });
      }

      // get sports
      if(appData.settings.native == false || appData.settings.native && appData.services.utilService.getNetworkConnection()){
        Backbone.on('getMyFavouriteSportsHandler', this.getFavouriteSportsHandler)
        appData.services.phpService.getUserFavouriteSports();
      }

      return this;
    },

    getFavouriteSportsHandler: function(){
      Backbone.off('getMyFavouriteSportsHandler');
      appData.views.SettingsView.generateFavouriteSportList();
    },

    generateFavouriteSportList: function(){

      var sports = [];
      $('#favouriteSportList .rm', appData.settings.currentPageHTML).remove();

      _(appData.models.userModel.attributes.myFavouriteSports.models).each(function(sport){
        var sportView = new appData.views.FavouriteSportListView({model:sport});
        $('#favouriteSportList', appData.settings.currentPageHTML).prepend(sportView.render().$el);
      });
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.SettingsView.files, function(key, value)
      {
        data.append(key, value);
      });

      Backbone.on('fileUploadedEvent', appData.views.SettingsView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.SettingsView.uploadedPhotoUrl = filename;

      Backbone.on('updateUserAvatar', appData.views.SettingsView.avatarUpdatedHandler);
      appData.services.phpService.updateUserAvatar(filename);
    },

    nonNativeFileSelectedHandler: function(evt){
        // upload script
        var files = evt.target.files;
        appData.views.SettingsView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    events: {
    	"click #changeAvatar": "changeAvatarHandler",
      "click #signOutButton": "signOutHandler",
      "change #nonNativeFileField":"nonNativeFileSelectedHandler",
      "submit #mediaForm": "mediaFormSubmitHandler",
      "click #sportselector": "sportselectorClickHandler"
    },

    sportselectorClickHandler: function(){
      appData.settings.sportselector = true;
      window.location.hash = "sportselector";
    },

    signOutHandler: function(){
      // clear local storage
      window.localStorage.clear()

      // not signed in
      appData.settings.userLoggedIn = false;
      appData.settings.storageFound = false;
      appData.settings.dataLoaded = false;


      // back to the landing page
      location.reload(); 
    },   

    avatarUpdatedHandler: function(){
    	Backbone.off('updateUserAvatar');
      $('#userAvatar', appData.settings.currentPageHTML).delay(400).attr("style", "background: url('" + appData.settings.imagePath + appData.views.SettingsView.uploadedPhotoUrl + "') no-repeat; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;");
      appData.models.userModel.attributes.avatar = appData.views.SettingsView.uploadedPhotoUrl;
    
      if(appData.settings.native){
        appData.services.utilService.updateLocalStorage();
      }
    },

    changeAvatarHandler: function(){
  		navigator.camera.getPicture(this.uploadAvatar,
  			function(message) { 
  			},{ quality: 50, targetWidth: 640, targetHeight: 480, destinationType: navigator.camera.DestinationType.FILE_URI, sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
  		);
    },

    avatarUploadHandler: function(r){
    	Backbone.on('updateUserAvatar', appData.views.SettingsView.avatarUpdatedHandler);
    	appData.services.phpService.updateUserAvatar(appData.views.SettingsView.uploadedPhotoUrl);
    },

    uploadAvatar: function(imageURI) {
      function makeid()
      {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( var i=0; i < 5; i++ )
              text += possible.charAt(Math.floor(Math.random() * possible.length));
          return text;
      }

      var options = new FileUploadOptions();
      options.fileKey="file";
      options.fileName= makeid() + ".jpg";
      options.mimeType="image/jpeg";

      var params = new Object();
      params.value1 =  options.fileName;
      appData.views.SettingsView.uploadedPhotoUrl = options.fileName;

      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();  
      ft.upload(imageURI, appData.settings.servicePath + appData.settings.imageUploadService, appData.views.SettingsView.avatarUploadHandler, null, options);    
    }
});