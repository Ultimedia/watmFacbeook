appData.views.SportSelectorView = Backbone.View.extend({

    initialize: function () {
        appData.views.SportSelectorView.selectedSports = [];
        Backbone.on('addFavouriteSportsHandler', this.addFavouriteSportsHandler)
    
        appData.views.SportSelectorView.model = this.model;
        appData.views.SportSelectorView.align = this.align;

        Backbone.on('networkFoundEvent', this.networkFoundHandler);
        Backbone.on('networkLostEvent', this.networkLostHandler);
    }, 

    // phonegap device offline
    networkFoundHandler: function(){

    },

    // phonegap device back online
    networkLostHandler: function(){

    },

    render: function() {
    	this.$el.html(this.template({user: appData.models.userModel.toJSON()}));
        appData.settings.currentPageHTML = this.$el;
        appData.views.SportSelectorView.favouriteSportsViewList = [];

        appData.collections.sports.each(function(sport){
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));
        });

        var generateGri = this.generateGrid();
        appData.views.CreateActivityLocationView.locationAutComplete = new AutoCompleteView({input: $("#sportInput", appData.settings.currentPageHTML), model: appData.collections.sports, wait: 100, updateModel: this.model, updateID: "sport_id", onSelect: function(sport){
            sport.attributes.object_class = "selected";
            appData.views.SportSelectorView.favouriteSportsViewList.push(new appData.views.FavouriteSportListView({
                model : sport
            }));

            $('#favouriteSportList', appData.settings.currentPageHTML).empty();
            _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView) {
                $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);
            });

        }}).render();

        $('#favouriteSportList', appData.settings.currentPageHTML).hide();
        $('#favouriteSportList', appData.settings.currentPageHTML).delay(1000).queue(function() {
            appData.views.SportSelectorView.align();
        });

        $(window).resize(_.debounce(function(){
           appData.views.SportSelectorView.align();
        }, 500));

        return this;
    },

    align: function(){
        $('#favouriteSportList').hide();

        var totalWidth = $('.cl-content').width();
        var widthD = 74;

        var space = parseInt(totalWidth) / parseInt(widthD);
        var rounded = Math.floor(space);
        
        var xspace = rounded * widthD;
        var yspace = totalWidth - xspace;
        var margin = yspace/2;
            
        $('#favouriteSportList').css({
                    'margin-left':margin + 'px',
                    'margin-right':margin + 'px',
                    'width': xspace + 'px',
                    'display': 'block'
        });

        $('#favouriteSportList').show(500);
    },

    generateGrid: function(){
        $('#favouriteSportList', appData.settings.currentPageHTML).empty();
        _(appData.views.SportSelectorView.favouriteSportsViewList).each(function(listView, index) {
            $('#favouriteSportList', appData.settings.currentPageHTML).append(listView.render().$el);

            if(index == (appData.views.SportSelectorView.favouriteSportsViewList.length -1)){
            }
        });    

        if(appData.models.userModel.attributes.myFavouriteSports.models.length > 0){
            $('#backButton', appData.settings.currentPageHTML).removeClass('hide');
        }

        // set selected items
        $.each(appData.models.userModel.attributes.myFavouriteSports.models, function(index, element){
            $('#sp' + element.attributes.sport_id, appData.settings.currentPageHTML).addClass('selected');
        });
    },

    events: {
      "click #confirm": "confirmSportsHandler",
      "click #favouriteSportList a": "favouriteSportClickHandler"
    },

    favouriteSportClickHandler: function(evt){
        $(evt.target).toggleClass('selected');
    },

    confirmSportsHandler: function(){
        var selectedSports = [];

        $('#favouriteSportList .selected .layer', appData.settings.currentPageHTML).each(function(index, element){
            var sportID = $(element).attr('data-id');
            var model = appData.collections.sports.where({'sport_id': sportID.toString()})
        
            selectedSports.push(model[0]);
        });

        appData.services.phpService.addFavouriteSportsService(selectedSports);
    },

    addFavouriteSportsHandler: function(){
        appData.services.utilService.updateLocalStorage();

        if(appData.settings.forwardAfterLogin){
            appData.settings.forwardAfterLogin = false;
            window.location.hash = "#activity/" + appData.settings.forwardAfterLoginID;    
        }else{
           if(!appData.settings.sportselector){
             appData.router.navigate('dashboard', true);
           }else{
             appData.router.navigate('settings', true);
           }
        }
    }
});
