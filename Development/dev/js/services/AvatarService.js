/**
* Updating a users avatar according to app usage
*/
appData.services.AvatarService = Backbone.Model.extend({

	initialize: function() {

	},

	addScore: function(paramter){
		var arr = [];
		var multiplier;

		switch(paramter){
			case "create":
				multiplier = 2.5;
			break;

			case "join":
				multiplier = 1.4;
			break;

			case "media":
				multiplier = 1.3
			break;

			case "chat":
				multiplier = 1.1;
			break;

			case "challenge":
				multiplier = 1.2;
			break;

			case "friend":
				multiplier = 1.3;
			break;
		}

		// score generator
		while(arr.length < 3){
		  var randomnumber=Math.ceil((Math.random()*3)*multiplier)
		  var found=false;
		  for(var i=0;i<arr.length;i++){
		    if(arr[i]==randomnumber){found=true;break}
		  }
		  if(!found)arr[arr.length]=randomnumber;
		}

		appData.models.userModel.attributes.equipment_score = parseInt(appData.models.userModel.attributes.equipment_score) + arr[0];
		appData.models.userModel.attributes.stamina_score = parseInt(appData.models.userModel.attributes.stamina_score) + arr[1];
		appData.models.userModel.attributes.strength_score = parseInt(appData.models.userModel.attributes.strength_score) + arr[2];
	
		// update avatar on the database
		Backbone.on('updateAvatarCompleteHandler', this.avatarCompleteHandler);
		appData.services.phpService.updateAvatar();
	},

	avatarCompleteHandler: function(){
		Backbone.off('updateAvatarCompleteHandler');
	},

	levelUp: function(){
		Backbone.trigger('levelUp');
	},

	generateAvatar: function(userModel){
		var avatarModel = new Avatar();
			avatarModel.attributes.strengthDisplay = "";
			avatarModel.attributes.equipmentDisplay = "";

		// which gender?
		switch(parseInt(userModel.attributes.gender)){
			case 0:
				// female
				console.log('female avatar');
				var eScore = parseInt(userModel.attributes.strength_score);

				if(eScore < 20){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[0];
				}else if(eScore < 40){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[1];
				}else if(eScore < 60){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[2];
				}else if(eScore < 80){
						avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[3];
				}else if(eScore < 100){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[4];
				}else if(eScore > 99){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.female.strength[5];
				}

				var sScore = parseInt(userModel.attributes.equipment_score);

				if(sScore < 20){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[0];
				}else if(sScore < 40){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[1];
				}else if(sScore < 60){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[2];
				}else if(sScore < 80){
						avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[3];
				}else if(sScore < 100){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[4];
				}else if(sScore > 99){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.female.equipment[5];
				}

			break;
			case 1:

				// male
				console.log('male avatar');
				var eScore = parseInt(userModel.attributes.strength_score);

				if(eScore < 20){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[0];
				}else if(eScore < 40){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[1];
				}else if(eScore < 60){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[2];
				}else if(eScore < 80){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[3];
				}else if(eScore < 100){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[4];
				}else if(eScore > 99){
					avatarModel.attributes.strengthDisplay = avatarModel.attributes.male.strength[5];
				}

				var sScore = parseInt(userModel.attributes.equipment_score);

				if(sScore < 20){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[0];
				}else if(sScore < 40){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[1];
				}else if(sScore < 60){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[2];
				}else if(sScore < 80){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[3];
				}else if(sScore < 100){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[4];
				}else if(sScore > 99){
					avatarModel.attributes.equipmentDisplay = avatarModel.attributes.male.equipment[5];
				}

			break;
		}

		return avatarModel;
	}

});
