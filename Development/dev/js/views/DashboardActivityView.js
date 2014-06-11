appData.views.DashboardActivityView = Backbone.View.extend({

    initialize: function () {


    }, 

    events: {
    	"click .activityContainer": "clickHandler"
    },

    clickHandler: function(){
    	window.location.hash = "#activity/" + this.model.attributes.activity_id
    },

    render: function() { 
		var hasUser = this.model.attributes.user_id;
		var userName = "";
		var userID = "";

		if(hasUser){
			var userModel = appData.collections.users.where({"user_id": this.model.attributes.user_id})[0];
				userName = userModel.attributes.name;
				userID = userModel.attributes.user_id;
		}

    	// model to template
    	this.$el.html(this.template({username: userName, userid: userID, activity: this.model.toJSON(), imagePath: appData.settings.imagePath, users: this.model.attributes.users, userModel: appData.models.userModel.toJSON()}));
        return this; 
    }

});





