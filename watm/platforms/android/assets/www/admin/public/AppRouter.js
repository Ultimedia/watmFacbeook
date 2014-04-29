appData.routers.AppRouter = Backbone.Router.extend({

    routes: {
        "":                 "home"
    },

    initialize: function () {
        appData.slider = new PageSlider($('#container'));

        this.routesHit = 0;

        //keep count of number of routes handled by your application
        Backbone.history.on('route', function() { this.routesHit++; }, this);
    },

    home: function () {
        appData.slider.slidePage(new appData.views.HomeView().render().$el);
    }
});
