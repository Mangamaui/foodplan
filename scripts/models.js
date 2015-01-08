/*================================*/
/*             models             */
/*================================*/

(function() {
	FoodPlanner.Dish = Backbone.Model.extend({

	    defaults: {
	        title:          'dish name',
	        ingredients:    'ingredients',
	        categories:     'dish categories'
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
