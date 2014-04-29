appData.views.UserEditView = Backbone.View.extend({
    tagName: 'div',

    initialize: function () {
        appData.views.UserEditView.fileUploadedHandler = this.fileUploadedHandler;
        appData.views.UserEditView.fileErrorHandler = this.fileErrorHandler;   
        appData.views.UserEditView.model = this.model;
        appData.views.UserEditView.updateUserHandler = this.updateUserHandler;
    },

    events: {
        "change #ageSlider": "ageChangeHandler",
        "change #nonNativeFileField":"nonNativeFileSelectedHandler",
        "submit #mediaForm": "mediaFormSubmitHandler",
    },

    updateUserHandler: function(){
        Backbone.off('userUpdatedHandler');
        window.location.hash = "#users";
    },

    ageChangeHandler: function(){
        $('#ageTotal', appData.settings.currentPageHTML).text($('#ageSlider', appData.settings.currentPageHTML).val() + " jaar");
    },

    render: function() {
    	this.$el.html(this.template({user: this.model.toJSON(), imagePath: appData.settings.imagePath}));
    	appData.settings.currentPageHTML = this.$el;


        $('#userForm', appData.settings.currentPageHTML).validate({
            submitHandler: function(){
                appData.views.UserEditView.model.attributes.name = $('#nameInput', appData.settings.currentPageHTML).val();
                appData.views.UserEditView.model.attributes.gender = $("input[name='genderRadios']:checked", appData.settings.currentPageHTML).val();
                appData.views.UserEditView.model.attributes.age = $('#ageSlider', appData.settings.currentPageHTML).val();
                appData.views.UserEditView.model.attributes.admin = $("input[name='beheerderRadios']:checked", appData.settings.currentPageHTML).val();

                Backbone.on('userUpdatedHandler', appData.views.UserEditView.updateUserHandler)
                appData.services.phpService.updateUser(appData.views.UserEditView.model);
            }
        });


        if(appData.views.UserEditView.model.attributes.gender == "1"){
          $("#optionsRadios1", appData.settings.currentPageHTML).prop("checked", true);
        }else{
          $("#optionsRadios2", appData.settings.currentPageHTML).prop("checked", true);
        }

        if(appData.views.UserEditView.model.attributes.admin == "1"){
          $("#beheerderInput1", appData.settings.currentPageHTML).prop("checked", true);
        }else{
          $("#beheerderInput2", appData.settings.currentPageHTML).prop("checked", true);
        }

      Ladda.bind( 'input[type=submit]' );


      $('#ageSlider', appData.settings.currentPageHTML).val(appData.views.UserEditView.model.attributes.age);
      this.ageChangeHandler();


      return this;
    },

    fileErrorHandler: function(){
      Backbone.off('fileErrorEvent');
      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
    },

    fileUploadedHandler: function(data){

      Backbone.off('fileUploadedEvent');
      


      var filename = data.files[0].replace(/^.*[\\\/]/, '');

      appData.views.UserEditView.model.attributes.avatar = filename;


      $('#userAvatar').attr("style", "background: url('" + appData.settings.imagePath + appData.views.UserEditView.model.attributes.avatar + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');

      appData.views.UserEditView.model.attributes.avatar = filename;
      appData.views.UserEditView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){

        // upload script
        var files = evt.target.files;
        appData.views.ChallengeEditView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening



      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.ChallengeEditView.files, function(key, value){
        console.log(key);
        console.log(value);

        data.append(key, value);
      });
      Backbone.on('fileUploadedEvent', appData.views.UserEditView.fileUploadedHandler);
      appData.services.phpService.uploadMediaNonNative(data);
    }
});
