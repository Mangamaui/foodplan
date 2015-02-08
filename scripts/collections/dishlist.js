(function() {
    FoodPlanner.classes.collections.Dishlist = Backbone.Collection.extend({
        className: 'list',
        id:     'dishes',
        model:  FoodPlanner.classes.models.Dish ,
        url:    '/api/dishes',

        generateList: function(attributes) {
            var list  = _.flatten(
                this.map(function(dish) {
                    var ingredients = dish.get(attributes);
                    ingredients = APP.toArray(ingredients[0]);
                    trimmed = APP.trimString(ingredients);
                    return trimmed;
                })
            );

            return list; 
        },

        parse: function(response, options) {
            return response.dishes;
        }

    });

})();
