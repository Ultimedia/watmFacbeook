

var appData = {
  views: {},
  models: {},
  routers: {},
  utils: {},
  collections: {},
  adapters: {},
  settings: {},
  data: {},
  helpers: {},
  messages: {},
  services: {},
  events: {},
  forms: {},
  garbage: {},
  storage: {}
};


// settings
appData.settings.rootPath = "http://ultimedia.biz/watm/";
appData.settings.servicePath =  appData.settings.rootPath + "services/";
appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
appData.settings.promoPath = appData.settings.rootPath + "common/promo/";
appData.settings.avatarPath = "common/avatar/";

appData.settings.getUserService = "getUser.php";
appData.settings.getUsersService = "getUsers.php";
appData.settings.addUserService = "addUser.php";
appData.settings.getSportsService = "getSports.php";
appData.settings.getActivitiesService = "getActivities.php";
appData.settings.getMessagesService = "getMessages.php";
appData.settings.getChallengesService = "getChallenges.php";
appData.settings.createActivityService = "createActivityService.php";
appData.settings.getUserFromFacebookID = "getUserFromFacebookID.php";
appData.settings.facebookUserToSQL = "facebookUserToSQL.php";
appData.settings.addMessageService = "addMessage.php";
appData.settings.getMediaService = "getMedia.php";
appData.settings.createActivityService = "createActivity.php";
appData.settings.getActivityUserService = "getActivityUser.php";
appData.settings.setGoingToActivityService = "setGoingToActivity.php";
appData.settings.getBuurtenService = "getBuurten.php";
appData.settings.getLocationsService = "getLocations.php";
appData.settings.addLocationService = "addLocation.php";
appData.settings.getMyPlannedActivities = "getMyPlannedActivities.php";
appData.settings.getMyActivities = "getMyActivities.php";
appData.settings.getFavouriteSportsService = "getFavouriteSports.php";
appData.settings.addFavouriteSportsService = "addFavouriteSports.php";
appData.settings.getUserFavouriteSportsService = "getUserFavouriteSports.php";
appData.settings.imageUploadService = "uploadService.php";
appData.settings.addPhotoToDatabase = "addPhotoToDatabase.php";
appData.settings.getMyAvatarService = "getMyAvatar.php";
appData.settings.getUserChallengesService = "getUserChallengesService.php";
appData.settings.updateAvatarService = "updateAvatar.php";
appData.settings.getMyChallengesService = "getMyChallenges.php";
appData.settings.joinChallengeService = "joinChallenge.php";
appData.settings.getBadgesService = "getBadges.php";
appData.settings.updateChallengeService = "updateChallengeScore.php";
appData.settings.addSportService = "addSport.php";
appData.settings.getFriendsService = "getMyFriends.php";
appData.settings.addFriendService = "addFriend.php";
appData.settings.getMyInvitationsService = "getMyInvitations.php";
appData.settings.inviteFriendsService = "inviteFriends.php";
appData.settings.handleInvitationsService = "handleInvitation.php";
appData.settings.removeFriendService = "removeFriend.php";
appData.settings.updateUserAvatarService = "updateUserAvatar.php";
appData.settings.uploadMediaNonNativeService = "uploadMediaNonNative.php";
appData.settings.updateActivityService = "updateActivity.php";
appData.settings.getUserMediaService = "getUserMedia.php";

appData.settings.defaultLocation = [51.20935, 3.22470];
appData.settings.dataLoaded = false;
appData.settings.userLoggedIn = false;

// messages
appData.messages.passwordIncorrect = "Je paswoord is niet correct";
appData.messages.noUser = "Er werd geen gebruiker met dit email adres gevonden, je kan <a href='#createUser'>hier</a> een nieuwe gebruiker aanmaken.";

appData.start = function(nativeApp){
  appData.settings.native = nativeApp;

  function doOnOrientationChange()
  {
    switch(window.orientation) 
    {  
      case -90:
      case 90:
        $('#container').addClass('landscape').removeClass('portrait');
        break; 
      default:
        $('#container').addClass('portrait').removeClass('landscape');
        break; 
    }
  }

  // show the keyboard
  function showKeyboardHandler(){
    $('#container').addClass('keyboard');
  }

  // hide keyboard
  function hideKeyboardHandler(){
    $('#container').removeClass('keyboard');
  }

  // phonegap device ready
  function onDeviceReadyHandler() {
      // Now safe to use the PhoneGap API
      appData.settings.phonegapLoaded = true;
  }

  // phonegap when the user returns to the app after minimizing it
  function onResumeHandler(){

  }

  // phonegap device offline
  function deviceOnlineHandler(){
    $('#container').addClass('online').removeClass('offline');

    appData.settings.network = true;
    Backbone.trigger('networkFoundEvent');
  }

  // phonegap device back online
  function deviceOfflineHandler(){
    $('#container').removeClass('online').addClass('offline');

    appData.settings.network = false;
    Backbone.trigger('networkLostEvent');
  }


  $( document ).ready(function() {

  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardView", "PlannerView", "ProfileView", "ActivityDetailView", "CreateActivityView", "CreateUserView", "NavigationView", "SettingsView", "SportSelectorView", "DashboardActivityView", "LoadingView", "HelperView", "ChallengeListView", "ActivityMessageView", "ActivityMessageView", "ActivityInfoView", "ActivityMediaView", "ActivityMessagesView", "ActivityMediaViewer", "ActivityInfoView", "CreateActivityLocationView", "CreateActivityInfoView", "CreateActivityWieView", "ProfileAvatarView", "ProfileChallengeView", "ProfileFriendsView", "FriendsListView", "FriendView", "ActivityUserView", "PlannerMyActivitiesView", "GoogleMapView", "FavouriteSportListView", "ActiveChallengeListView", "BadgeListView", "FriendInvitieView", "PlannerInvitedActivitiesView", "NoConnectionView", "AvatarDisplayView"],

  // backbone loaded
  function () {

      appData.models.userModel = new User();

      appData.forms.sortOptions = [{"title": "Datum"},{"title": "Afstand"}, {"title": "Mijn Favoriete Sporten"}];
      appData.collections.sortOptions = new SortOptionsCollection(appData.forms.sortOptions);

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
      appData.events.getMessagesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getSportsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getChallengesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMyActivitiesSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInErrorEvent = _.extend({}, Backbone.Events);
      appData.events.userLoggedInPasswordErrorEvent = _.extend({}, Backbone.Events);
      appData.events.createUserEvent = _.extend({}, Backbone.Events);
      appData.events.createUserErrorEvent = _.extend({}, Backbone.Events);
      appData.events.getUserFromFacebookIDEvent = _.extend({}, Backbone.Events);
      appData.events.getUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.facebookUserToSQLEvent = _.extend({}, Backbone.Events);
      appData.events.postMessageSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getMediaSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.createActivityTabsEvent = _.extend({}, Backbone.Events);
      appData.events.activityUsersSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.goinToActivitySuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getBuurtenEvent = _.extend({}, Backbone.Events);
      appData.events.updateActivitiesEvent = _.extend({}, Backbone.Events);
      appData.events.getLocationsSuccesEvent = _.extend({}, Backbone.Events);
      appData.events.getLatLonEvent = _.extend({}, Backbone.Events);
      appData.services.facebookService = new appData.services.FacebookServices();
      appData.events.facebookLoginEvent = _.extend({}, Backbone.Events);
      appData.events.facebookLoginErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetFriendsErrorEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataEvent = _.extend({}, Backbone.Events);
      appData.events.facebookGetProfileDataErrorEvent = _.extend({}, Backbone.Events);
      appData.services.utilService = new appData.services.UtilServices();
      appData.events.locationHomeEvent = _.extend({}, Backbone.Events);
      appData.events.locationCreateActivityEvent = _.extend({}, Backbone.Events);
      appData.services.avatarService = new appData.services.AvatarService();
      appData.services.challengeService = new appData.services.CHallengeService();

      // Create a new instance of the helperclass
      appData.helpers.phonegapHelper = new appData.views.HelperView();

      if(appData.settings.native){
          appData.settings.pictureSource = navigator.camera.PictureSourceType;
          appData.settings.destinationType = navigator.camera.DestinationType;
          
          document.addEventListener("resume", onResumeHandler, false);
          document.addEventListener("offline", deviceOfflineHandler, false);
          document.addEventListener("online", deviceOnlineHandler, false);
          document.addEventListener("showkeyboard", showKeyboardHandler, false);
          document.addEventListener("hidekeyboard", hideKeyboardHandler, false);
          window.addEventListener('orientationchange', doOnOrientationChange);

          // check to see if there is a working connection
          if(appData.services.utilService.getNetworkConnection()){
            appData.services.facebookService.facebookConnect();
          }else{
            if(window.localStorage.getItem("userModel")){

            }else{
              window.location.hash = "noconnection";
            }
          }

          // see if we have a user in our localstorage
          if(window.localStorage.getItem("userModel")){

            var localUser = JSON.parse(window.localStorage.getItem("userModel"));
            appData.models.userModel = new User(localUser);
            appData.settings.userLoggedIn = true;

            // save the old data (so wen can retrieve if in case we don't have a working connection)
            appData.settings.storageFound = true;
            appData.storage = JSON.parse(window.localStorage.getItem("collections"));
          }

          appData.settings.rootPath = "http://ultimedia.biz/watm/";
          appData.settings.servicePath =  appData.settings.rootPath + "services/";
          appData.settings.imagePath = appData.settings.rootPath + "common/uploads/";
          appData.settings.badgesPath = appData.settings.rootPath + "common/badges/";
          appData.settings.iconPath = appData.settings.rootPath + "public/css/assets/";
          appData.settings.sportsPath = appData.settings.rootPath + "common/sports/";
          appData.settings.promoPath = appData.settings.rootPath + "common/promo/";
          appData.settings.avatarPath = appData.settings.rootPath + "/common/avatar/";

        } else {
          appData.settings.native = false;
          appData.services.facebookService.facebookConnect();
        }

        // init backbone
        Backbone.history.start();
    });
  });
}
