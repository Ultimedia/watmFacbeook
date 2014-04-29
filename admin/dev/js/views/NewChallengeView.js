appData.views.NewChallengeView = Backbone.View.extend({
 	 tagName: 'div',

    initialize: function () {
    	this.model = new Challenge();
    	appData.views.NewChallengeView.model = this.model;
    	appData.views.NewChallengeView.fileUploadedHandler = this.fileUploadedHandler;
      	appData.views.NewChallengeView.addedSportHandler = this.addedSportHandler;
      	appData.views.NewChallengeView.addedChallengeHandler = this.addedChallengeHandler;
    },

    events: {
    	"change :checkbox": "reqChangeHandler",
    	"change #nonNativeFileField":"nonNativeFileSelectedHandler",
      	"submit #mediaForm": "mediaFormSubmitHandler",
      	"change #sportde": "sportDeChangeHandler",
      	"change #deelnames": "deelnamesChangeHandler",
      	"change #fotovideoRange": "fotovideoRangeHandler",
      	"change #participateRange": "participateChangeHandler"
    },

    sportDeChangeHandler: function(){
    	$('#sportDeelnamesSlider', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#sportde', appData.settings.currentPageHTML).val() + " keer deelnemen aan deze sport");
    },

    deelnamesChangeHandler: function(){
    	$('#activityTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#deelnames', appData.settings.currentPageHTML).val() + " activiteiten aanmaken");
    },

    fotovideoRangeHandler: function(){
    	$('#fotovideoTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#fotovideoRange', appData.settings.currentPageHTML).val() + " foto's uploaden");
    },

    participateChangeHandler: function(){
    	$('#participateTotal', appData.settings.currentPageHTML).text("De gebruiker moet " + $('#participateRange', appData.settings.currentPageHTML).val() + " keer deelnemen aan een activiteit");
    },

    addedChallengeHandler: function(){
   		Backbone.off('addedChallengeHandler');
   		window.location.hash = "challenges";
    },

    reqChangeHandler: function(evt){
    	$(':checkbox').each(function(index, element){
    		if($(element).prop('checked')){
    			$($(element).attr('group-target')).removeClass('hide');
    		}else{
    			$($(element).attr('group-target')).addClass('hide');
    		}
    	});
    },

    render: function() {
    	this.$el.html(this.template({challenge: this.model.toJSON(), imagePath: appData.settings.imagePath, sports: appData.collections.sports.toJSON()}));
    	appData.settings.currentPageHTML = this.$el;

    	this.sportDeChangeHandler();
    	this.deelnamesChangeHandler();
    	this.fotovideoRangeHandler();
    	this.participateChangeHandler();

    	$('#challengeForm', appData.settings.currentPageHTML).validate({
    		ignore: ":hidden", 

    		rules: { 
            	"challenge[]": { 
                    required: true, 
                    minlength: 1
            	},
    		}, 

		    messages: { 
		            "challenge[]": "Kies minstens 1 type uitdaging"
		    },

		    errorPlacement: function(error, element) {

                if(element.attr("name") == "challenge[]" ){
                    error.insertAfter("#cb3");
                }else{
                    error.insertAfter(element);
                }
            },

    		submitHandler: function(){
    			appData.views.NewChallengeView.model.attributes.title = $('#titleInput', appData.settings.currentPageHTML).val();
    			appData.views.NewChallengeView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();
    			appData.views.NewChallengeView.model.attributes.deadline = $('#deadline', appData.settings.currentPageHTML).val();
    			appData.views.NewChallengeView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();


    			appData.views.NewChallengeView.model.attributes.challengeData = {};

    			// check with settings are enabled
    			$('.challengeGroup:visible').each(function(index, element){
    				switch($(element).attr('id')){
    					case "sportPartGroup":
    						appData.views.NewChallengeView.model.attributes.challengeData.sportsFilter = {
    							"sport_id":  $('#selectSport').find(":selected").attr('sport-id'),
    							"total": $('#sportde').val() 
    						}
    					break;

    					case "activityTotalGroup":
							appData.views.NewChallengeView.model.attributes.challengeData.activityCreateFilter = {
    							"total": $('#deelnames').val() 
    						}
    					break;

    					case "fotoTotalGroup":
							appData.views.NewChallengeView.model.attributes.challengeData.fotoCreateFilter = {
    							"total": $('#fotovideoRange').val() 
    						}
    					break;

    					case "participateGroup":
							appData.views.NewChallengeView.model.attributes.challengeData.participateFilter = {
    							"total": $('#participateRange').val() 
    						}
    					break;
    				}
		    	});

		    	// uploaded
    			if(appData.views.NewChallengeView.model.attributes.upload){
    				Backbone.on('addedChallengeHandler',appData.views.NewChallengeView.addedChallengeHandler);
    				appData.services.phpService.addChallenge(appData.views.NewChallengeView.model);
    			}else{
    				alert('Kies een afbeelding');
    			}
    		}
    	});

    	$("#changeBadge", appData.settings.currentPageHTML).click(function(){
        	$("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         	return false;
      	});

      return this;
    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.NewChallengeView.model.attributes.badge_url = filename;

      $('#badge').attr('src',appData.settings.badgesPath +  appData.views.NewChallengeView.model.attributes.badge_url).removeClass('hide');
      appData.views.NewChallengeView.model.attributes.badge = filename;
      appData.views.NewChallengeView.model.attributes.upload = true;
    },

    nonNativeFileSelectedHandler: function(evt){

        // upload script
        var files = evt.target.files;
        appData.views.NewChallengeView.files = files;

        $('#mediaForm', appData.settings.currentPageHTML).submit();
    },

    mediaFormSubmitHandler: function(event){
      event.stopPropagation(); // Stop stuff happening
      event.preventDefault(); // Totally stop stuff happening

      // Create a formdata object and add the files
      var data = new FormData();
      $.each(appData.views.NewChallengeView.files, function(key, value){
      	console.log(key);
      	console.log(value);

        data.append(key, value);
      });

      console.log(data);

      Backbone.on('fileUploadedEvent', appData.views.NewChallengeView.fileUploadedHandler);
      appData.services.phpService.uploadChallengeAvatar(data);
    }
});