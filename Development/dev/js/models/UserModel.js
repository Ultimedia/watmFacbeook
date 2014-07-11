User = Backbone.Model.extend({
	defaults: {
	    user_id: '',
	    name: '',
	    email: '',
	    gender: '1',
	    facebook_data: {},
	    facebookUser: false,
	    current_location: "51.208723, 3.223860",
		strength_score: 0,
		stamina_score: 0,
		equipment_score: 0,
    	avatar: "default.png",
    	myChallenges: [],
    	myBadges: [],
    	age: [],
    	myFavouriteSports: []
    },
	initialize: function(){
		
	}
});

