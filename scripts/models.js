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
            if (typeof(attrs.title) !== 'string') {
                return "title isn't text";
            }

            if (typeof(attrs.ingredients) !== 'string') {
                return "ingredients should be text";
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
