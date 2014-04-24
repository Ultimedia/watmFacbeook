Avatar = Backbone.Model.extend({
	
	defaults: {
		female:{
			strength: ["avatar_female_default.png", "avatar_female_20.png", "avatar_female_40.png", "avatar_female_60.png", "avatar_female_80.png", "avatar_female_100.png"],
			equipment: ["equipment_female_default.png", "equipment_female_20.png", "equipment_female_40.png", "equipment_female_60.png", "equipment_female_80.png", "equipment_female_100.png"]
		},
		male: {
			strength: ["avatar_male_default.png", "avatar_male_20.png", "avatar_male_40.png", "avatar_male_60.png", "avatar_male_80.png", "avatar_male_100.png"],
			equipment: ["equipment_male_default.png", "equipment_male_20.png", "equipment_male_40.png", "equipment_male_60.png", "equipment_male_80.png", "equipment_male_100.png"]
		},
		strengthDisplay: "",
		equipmentDisplay: ""
    },

	initialize: function(){
	}
});
