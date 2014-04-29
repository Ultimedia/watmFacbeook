appData.views.MediaView = Backbone.View.extend({
    initialize: function () {
        Backbone.on('mediaLoadSuccesHandler', this.mediaLoadedHandler);
        appData.views.MediaView.mediaRemovedHandler = this.mediaRemovedHandler;
        appData.services.phpService.getAllMedia();
        appData.views.MediaView.facebookWallPostCompleteEvent = this.facebookWallPostCompleteHandler;
    },
 
    render: function() {
    	this.$el.html(this.template());
    	appData.settings.currentPageHTML = this.$el;

      return this;
    },

    mediaRemovedHandler: function(){
        Backbone.off('removeMediaHandler');
    },

    facebookWallPostCompleteHandler: function(){
        Backbone.off('FacebookWallPostCompleteEvent');
    },

    mediaLoadedHandler: function(){
        Backbone.off('mediaLoadSuccesHandler');
        
        $('#media-table tbody').empty();
            appData.collections.mediaCollection.each(function(media) {
            var aView = new appData.views.DashboardMediaView({model : media});

            $('#media-table tbody', appData.settings.currentPageHTML).append(aView.render().$el);
        });

        $('#remove-modal').on('show.bs.modal', function (e) {
            appData.views.MediaView.mediaID = $(e.relatedTarget).attr('data-id');
            appData.views.MediaView.selectedMedia = $(e.relatedTarget).parent().parent();
            var myMedia = appData.collections.mediaCollection.where({'media_id': appData.views.MediaView.mediaID})[0];
        });

        $('#remove').click(function(){
            Backbone.on('removeMediaHandler', appData.views.MediaView.mediaRemovedHandler);
            appData.services.phpService.removeMedia(appData.views.MediaView.mediaID);
            $(appData.views.MediaView.selectedMedia).hide(400);
        });

        $('#media-modal').on('show.bs.modal', function (e) {
            appData.views.MediaView.mediaID = $(e.relatedTarget).attr('data-id');
            appData.views.MediaView.myMedia = appData.collections.mediaCollection.where({'media_id': appData.views.MediaView.mediaID})[0];
        });

        $('#shareFacebook').click(function(){
            appData.views.MediaView.myMedia.attributes.omschrijving = $('#omschrijving').val();

            Backbone.on('FacebookWallPostCompleteEvent', appData.views.MediaView.facebookWallPostCompleteEvent);
            appData.services.facebookService.facebookWallpost(appData.views.MediaView.myMedia);
        });
    }
});
