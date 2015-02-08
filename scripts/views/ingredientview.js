(function() {
    FoodPlanner.classes.views.IngredientView = Backbone.View.extend({

        initialize: function() {
            this.generateShoppingList();
        },

        generateShoppingList: function() {
            var res = _.countBy(FoodPlanner.IngredientList);
            console.log(res);
        
        }

    });
    
})();
