/*================================*/
/*             models             */
/*================================*/

(function() {
	FoodPlanner.Dish = Backbone.Model.extend({

	    defaults: {
	        title:          'dish name',
	        ingredients:    'ingredients',
	        categories:     'dish categories'
	    },

        validate: function(attrs) {
            if(typeof(attrs.title) == 'string') {
                console.log("valid");
            }
        }
	});

	FoodPlanner.Day = Backbone.Model.extend({

	    defaults: {
	        id:     0,
	        name:   'day',
	        dish:   'fill in dish'
	    }
	});

})();
