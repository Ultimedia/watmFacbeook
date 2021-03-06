

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
appData.settings.rootPath = "http://localhost/";
appData.settings.forwardPath = "http://localhost/";
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
appData.settings.getChallengesCount = "getChallengesCount.php";

appData.settings.defaultLocation = [51.208723, 3.223860];
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
    
    // back to the landing page
    window.localStorage.clear()

    // not signed in
    appData.settings.userLoggedIn = false;
    appData.settings.storageFound = false;
    appData.settings.dataLoaded = false;

    // back to the landing page
    location.reload(); 
  }

  // phonegap device back online
  function deviceOfflineHandler(){
    $('#container').removeClass('online').addClass('offline');

    appData.settings.network = false;
    Backbone.trigger('networkLostEvent');
  }


  $( document ).ready(function() {

  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardView", "PlannerView", "ProfileView", "ActivityDetailView", "CreateActivityView", "CreateUserView", "NavigationView", "SettingsView", "SportSelectorView", "DashboardActivityView", "LoadingView", "HelperView", "ChallengeListView", "ActivityMessageView", "ActivityMessageView", "ActivityInfoView", "ActivityMediaView", "ActivityMessagesView", "ActivityMediaViewer", "ActivityInfoView", "CreateActivityLocationView", "CreateActivityInfoView", "CreateActivityWieView", "ProfileAvatarView", "ProfileChallengeView", "ProfileFriendsView", "FriendsListView", "FriendView", "ActivityUserView", "PlannerMyActivitiesView", "GoogleMapView", "FavouriteSportListView", "ActiveChallengeListView", "BadgeListView", "FriendInvitieView", "PlannerInvitedActivitiesView", "NoConnectionView", "AvatarDisplayView", "PlannerTimelineWrap", "FavouriteSportListSettingView"],

  // backbone loaded
  function () {

      appData.models.userModel = new User();

      appData.forms.sortOptions = [{"title": "Datum"},{"title": "Afstand"}, {"title": "Mijn Favoriete Sporten"}];
      appData.collections.sortOptions = new SortOptionsCollection(appData.forms.sortOptions);

      // menu
      $("#mainMenu").mmenu({
        // options object
        dragOpen: false
      });

      $('#menuAvatarSection').click(function(){
        window.location.hash = "#profile";
      });

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
        

        /*
          var pushNotification;
            function onDeviceReady() {
                $("#app-status-ul").append('<li>deviceready event received</li>');
                
        document.addEventListener("backbutton", function(e)
        {
                  $("#app-status-ul").append('<li>backbutton event received</li>');
            
              if( $("#home").length > 0)
          {
            // call this to get a new token each time. don't call it to reuse existing token.
            //pushNotification.unregister(successHandler, errorHandler);
            e.preventDefault();
            navigator.app.exitApp();
          }
          else
          {
            navigator.app.backHistory();
          }
        }, false);
      
        try 
        { 
                  pushNotification = window.plugins.pushNotification;
          $("#app-status-ul").append('<li>registering ' + device.platform + '</li>');
                  if (device.platform == 'android' || device.platform == 'Android' ||
                            device.platform == 'amazon-fireos' ) {
      pushNotification.register(successHandler, errorHandler, {"senderID":"661780372179","ecb":"onNotification"});    // required!
          } else {
                      pushNotification.register(tokenHandler, errorHandler, {"badge":"true","sound":"true","alert":"true","ecb":"onNotificationAPN"});  // required!
                  }
                }
        catch(err) 
        { 
          txt="There was an error on this page.\n\n"; 
          txt+="Error description: " + err.message + "\n\n"; 
          alert(txt); 
        } 
            }
            
            // handle APNS notifications for iOS
            function onNotificationAPN(e) {
                if (e.alert) {
                     $("#app-status-ul").append('<li>push-notification: ' + e.alert + '</li>');
                     navigator.notification.alert(e.alert);
                }
                    
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            
            // handle GCM notifications for Android
            function onNotification(e) {
                $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
                
                switch( e.event )
                {
                    case 'registered':
          if ( e.regid.length > 0 )
          {
            $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
            // Your GCM push server needs to know the regID before it can push to this device
            // here is where you might want to send it the regID for later use.
            console.log("regID = " + e.regid);
          }
                    break;
                    
                    case 'message':
                      // if this flag is set, this notification happened while we were in the foreground.
                      // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                      if (e.foreground)
                      {
              $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');
                  
                    // on Android soundname is outside the payload. 
                          // On Amazon FireOS all custom attributes are contained within payload
                          var soundfile = e.soundname || e.payload.sound;
                          // if the notification contains a soundname, play it.
                          var my_media = new Media("/android_asset/www/"+ soundfile);

              my_media.play();
            }
            else
            { // otherwise we were launched because the user touched a notification in the notification tray.
              if (e.coldstart)
                $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
              else
              $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
            }
              
            $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                        //android only
            $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
                        //amazon-fireos only
                        $("#app-status-ul").append('<li>MESSAGE -> TIMESTAMP: ' + e.payload.timeStamp + '</li>');
                    break;
                    
                    case 'error':
            $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
                    break;
                    
                    default:
            $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
                    break;
                }
            }
            
            function tokenHandler (result) {
                $("#app-status-ul").append('<li>token: '+ result +'</li>');
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }
      
            function successHandler (result) {
                $("#app-status-ul").append('<li>success:'+ result +'</li>');
            }
            
            function errorHandler (error) {
                $("#app-status-ul").append('<li>error:'+ error +'</li>');
            }
            

            */


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
          appData.settings.avatarPath = "common/avatar/";

        } else {
          appData.settings.native = false;
          appData.services.facebookService.facebookConnect();
        }

        // init backbone
        Backbone.history.start();
    });
  });
}
