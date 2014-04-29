appData.views.ChallengeEditView = Backbone.View.extend({
	tagName: 'div',

    initialize: function () {
    	appData.views.ChallengeEditView.model = this.model;
    	appData.views.ChallengeEditView.fileUploadedHandler = this.fileUploadedHandler;
      appData.views.ChallengeEditView.addedSportHandler = this.addedSportHandler;
      appData.views.ChallengeEditView.addedChallengeHandler = this.addedChallengeHandler;
      appData.views.ChallengeEditView.reqChangeHandler = this.reqChangeHandler;
      appData.views.ChallengeEditView.fileErrorHandler = this.fileErrorHandler;   
    },

    fileErrorHandler: function(){
      Backbone.off('fileErrorEvent');
      alert('Het bestand dat je hebt gekozen is te groot, verklein het bestand en probeer opnieuw');
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
   		Backbone.off('updateChallengeHandler');
   		window.location.hash = "challenges";
    },

    reqChangeHandler: function(){
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

      $('#badge', appData.settings.currentPageHTML).attr("style", "background: url('" + appData.settings.badgesPath + appData.views.ChallengeEditView.model.attributes.badge_url + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');

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
    			appData.views.ChallengeEditView.model.attributes.title = $('#titleInput', appData.settings.currentPageHTML).val();
    			appData.views.ChallengeEditView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();
    			appData.views.ChallengeEditView.model.attributes.deadline = $('#deadline', appData.settings.currentPageHTML).val();
    			appData.views.ChallengeEditView.model.attributes.description = $('#omschrijvingInput', appData.settings.currentPageHTML).val();


    			appData.views.ChallengeEditView.model.attributes.challengeData = {};

    			// check with settings are enabled
    			$('.challengeGroup:visible').each(function(index, element){
    				switch($(element).attr('id')){
    					case "sportPartGroup":
    						appData.views.ChallengeEditView.model.attributes.challengeData.sportsFilter = {
    							"sport_id":  $('#selectSport').find(":selected").attr('sport-id'),
    							"total": $('#sportde').val() 
    						}
    					break;

    					case "activityTotalGroup":
							appData.views.ChallengeEditView.model.attributes.challengeData.activityCreateFilter = {
    							"total": $('#deelnames').val() 
    						}
    					break;

    					case "fotoTotalGroup":
							appData.views.ChallengeEditView.model.attributes.challengeData.fotoCreateFilter = {
    							"total": $('#fotovideoRange').val() 
    						}
    					break;

    					case "participateGroup":
							appData.views.ChallengeEditView.model.attributes.challengeData.participateFilter = {
    							"total": $('#participateRange').val() 
    						}
    					break;
    				}
		    	});

		    	// uploaded
          
          
    				Backbone.on('updateChallengeHandler',appData.views.ChallengeEditView.addedChallengeHandler);
    				appData.services.phpService.updateChallenge(appData.views.ChallengeEditView.model);
    		
    		}
    	});

    	$("#changeBadge", appData.settings.currentPageHTML).click(function(){
        	$("#nonNativeFileField", appData.settings.currentPageHTML).trigger('click');
         	return false;
      	});

      if(this.model.attributes.challengeData){

        if(this.model.attributes.challengeData.sportsFilter){
          $('#checkboxes-0', appData.settings.currentPageHTML).attr('checked', true);
          $('#sportPartGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#sportde', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.sportsFilter.total);

         $("#selectSport", appData.settings.currentPageHTML).find("[sport-id='" + this.model.attributes.challengeData.sportsFilter.sport_id + "']").prop('selected', true);
        }
        if(this.model.attributes.challengeData.activityCreateFilter){
          $('#checkboxes-1', appData.settings.currentPageHTML).attr('checked', true);
          $('#activityTotalGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#deelnames', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.activityCreateFilter.total);
        }
        if(this.model.attributes.challengeData.fotoCreateFilter){
          $('#checkboxes-2', appData.settings.currentPageHTML).attr('checked', true);
          $('#fotoTotalGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#fotovideoRange', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.fotoCreateFilter.total);
        }
        if(this.model.attributes.challengeData.participateFilter){
          $('#checkboxes-3', appData.settings.currentPageHTML).attr('checked', true);
          $('#participateGroup', appData.settings.currentPageHTML).removeClass('hide');
          $('#participateRange', appData.settings.currentPageHTML).val(this.model.attributes.challengeData.participateFilter.total);
        }
      }

      this.sportDeChangeHandler();
      this.deelnamesChangeHandler();
      this.fotovideoRangeHandler();
      this.participateChangeHandler();

      return this;

    },

    fileUploadedHandler: function(data){
      Backbone.off('fileUploadedEvent');
      
      var filename = data.files[0].replace(/^.*[\\\/]/, '');
      appData.views.ChallengeEditView.model.attributes.badge_url = filename;

      $('#badge', appData.settings.currentPageHTML).attr("style", "background: url('" + appData.settings.badgesPath + appData.views.ChallengeEditView.model.attributes.badge_url + "') no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;").removeClass('hide');
      appData.views.ChallengeEditView.model.attributes.badge = filename;
      appData.views.ChallengeEditView.model.attributes.upload = true;
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

      console.log(data);

      Backbone.on('fileUploadedEvent', appData.views.ChallengeEditView.fileUploadedHandler);
      appData.services.phpService.uploadChallengeAvatar(data);
    }
});