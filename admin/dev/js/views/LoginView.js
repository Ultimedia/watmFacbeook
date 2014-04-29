appData.views.LoginView = Backbone.View.extend({
    initialize: function () {
      appData.views.LoginView.loginSucces = this.loginSucces;
      appData.views.LoginView.loginError = this.loginError;
    },

    loginSucces: function(){
      Backbone.off('loginSucces');
      appData.settings.loggedIn = true;
      window.history.back();
    },

    loginError: function(){
      Backbone.off('loginError');
      $('#errorBox', appData.settings.currentPageHTML).removeClass('hide');
    },

    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      $('#loginForm', appData.settings.currentPageHTML).validate({
        submitHandler: function(){

          var loginModel = new User();
              loginModel.attributes.email = $('#email', appData.settings.currentPageHTML).val();
              loginModel.attributes.password = $('#pwd', appData.settings.currentPageHTML).val();

              Backbone.on('loginSucces',  appData.views.LoginView.loginSucces);
              Backbone.on('loginError',  appData.views.LoginView.loginError);
             
             appData.services.phpService.adminlogin(loginModel);
        }
      });

      return this;
    }
});
