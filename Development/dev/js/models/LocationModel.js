Location = Backbone.Model.extend({
	defaults: {
		"description": "",
		"location": "",
		"coordinates": ""
	},

	initialize: function(){
		
	},

	label: function () {
        return this.get("location");
    }
});