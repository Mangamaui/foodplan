(function() {
    FoodPlanner.classes.collections.Dishlist = Backbone.Collection.extend({
        className: 'list',
        id:     'dishes',
        model:  FoodPlanner.classes.models.Dish ,
        url:    '/api/dishes',

        initialize: function() {
            _.bindAll(this, "changeHandler");

            this.listenTo(this, "reset", this.changeHandler);
            this.fetch({ reset: true });
        },


        changeHandler: function() {
            FoodPlanner.IngredientList = this.generateList('ingredients');
            FoodPlanner.CategoryList = this.generateList('categories');

            // trigger event to listen to
            this.trigger("listsUpdated");
        },

        /**
         * GenerateList generates a list according to passed attribute
         * @param  String -  attribute - pass on an attribute that's part of the dish model
         * @return Array  -            - the array that has been created with the data of the passed attribute
         */
        generateList: function(attribute) {
            var list  = _.flatten(
                this.map(function(dish) {
                    var ingredients = dish.get(attribute);
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
