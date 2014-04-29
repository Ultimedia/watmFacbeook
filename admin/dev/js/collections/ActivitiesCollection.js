ActivitiesCollection = Backbone.Collection.extend({
	model: Activity,
	sort_key: 'distance', // default sort key
	
	initialize: function (models,options) { 
     this.sort_key = 'distance';
	},

    comparator: function(a, b) {
        // Assuming that the sort_key values can be compared with '>' and '<',
        // modifying this to account for extra processing on the sort_key model
        // attributes is fairly straight forward.
        a = a.get(this.sort_key);
        b = b.get(this.sort_key);
        return a > b ?  1
             : a < b ? -1
             :          0;
    },

    sort_by_attribute: function(sort_key) {
        this.sort_key = sort_key;

        this.sort();
        console.log(this);
    }
});