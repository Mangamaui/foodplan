(function() {
    FoodPlanner.classes.views.IngredientView = Backbone.View.extend({
        tagName:    'main',

        initialize: function() {
            this.generateShoppingList();
        },

        generateShoppingList: function() {
            var result = _.countBy(FoodPlanner.IngredientList);
            var $list = $('<ul />');
            $list.addClass('shoppinglist');
            var html = "";
            
            for(key in result) {
                var item = '<li><span class="name">' + key + '</span><span class="quantity">' + result[key] + '</span></li>';
                html += item;
            }
            $list.html(html);
            this.$el.append($list);
        
        },

    });
    
})();
