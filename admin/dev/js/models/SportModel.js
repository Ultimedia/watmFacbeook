Sport = Backbone.Model.extend({
	defaults: {
		"object_class": "",
		"icon": ""
	},

	initialize: function(){

	},

	label: function () {
		return this.get("sport_title");
	}
});
