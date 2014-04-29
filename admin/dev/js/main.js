// data containers
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
appData.settings.rootPath = "http://localhost/admin/";
appData.settings.servicePath = "../services/";
appData.settings.imagePath = "../common/uploads/";
appData.settings.badgesPath = "../common/badges/";
appData.settings.iconPath = "public/css/assets/";
appData.settings.sportsPath = "../common/sports/";
appData.settings.promoPath = "../common/promo/";
appData.settings.sportsPathUpload =  "common/sports/";
appData.settings.serverPath = "http://ultimedia.biz/watm/common/uploads/";

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
appData.settings.getAllChallengesService = "getAllChallenges.php";
appData.settings.getOldActivitiesService = "getOldActivities.php";
appData.settings.getAllMediaService = "getAllMedia.php";
appData.settings.removeActivityService = "removeActivity.php";
appData.settings.removeUserService = "removeUser.php";
appData.settings.removeLocationService = "removeLocation.php";
appData.settings.removeSportService= "removeSport.php";
appData.settings.removeMediaService = "removeMedia.php";
appData.settings.removeChallengeService = "removeChallenge.php";
appData.settings.uploadSportAvatarService = "uploadSportNonNative.php";
appData.settings.uploadSportNonNative = "uploadSportAvatar.php";
appData.settings.updateSportService = "updateSport.php";
appData.settings.uploadChallengeNonNative = "uploadCallengeNonNative.php";
appData.settings.addChallengeService = "addChallenge.php";
appData.settings.updateChallengeService = "updateChallenge.php";
appData.settings.uploadMediaNonNativeAdminService = "uploadMediaNonNativeAdmin.php";
appData.settings.updateUserService = "updateUser.php";
appData.settings.removeUserFromActivityService = "removeUserFromActivity.php";
appData.settings.getAdminService = "getAdmin.php";


appData.settings.defaultLocation = [51.20935, 3.22470];


/* Jquery Document Read */
$(document).on("ready", function () {
  appData.router = new appData.routers.AppRouter();
  appData.utils.templates.load(["HomeView", "DashboardActivityView", "ActivityEditView", "UsersView", "DashboardUserView", "LoadingView", "ChallengesView", "DashboardChallengesView", "NewChallengeView", "DashboardSportView", "SportsView", "NewSportView", "MediaView", "DashboardMediaView", "LocationsView", "DashboardLocationView", "SportEditView", "UserEditView", "ChallengeEditView", "LocationEditView", "DashboardActivityArchiveView", "NewActivityView", "NewLocationView", "SettingsView", "LoginView"],

  // backbone loaded
  function () {

      // New services class
      appData.services.phpService = new appData.services.PhpServices();
      appData.services.utilService = new appData.services.UtilServices();
      appData.services.facebookService = new appData.services.FacebookServices();
      appData.services.facebookService.facebookConnect();

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

      appData.settings.dataLoaded = false;

      // init backbone
      Backbone.history.start();
  });

});
