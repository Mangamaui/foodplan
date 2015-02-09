(function() {

    FoodPlanner.classes.views.MenuView = Backbone.View.extend({
        id:         'dishes',
        className:  'list',
     
        initialize: function() {
            _.bindAll(this, 'render');

            this.collection = new FoodPlanner.classes.collections.Dishlist();
            this.render();

            this.listenTo(this.collection, 'reset add destroy', this.render);
        },
     
        render: function() {
            var that = this;

            this.$el.empty();

            _.each(this.collection.models, function (item) {
                that.renderDish(item);
            });

            FoodPlanner.IngredientList = this.collection.generateList('ingredients');
            FoodPlanner.CategoryList = this.collection.generateList('categories');

             // console.log(FoodPlanner.IngredientList);
             // console.log(FoodPlanner.CategoryList);

        },
     
        renderDish: function(item) {
            var dishView = new FoodPlanner.classes.views.DishView({
                model: item
            });
            this.$el.append(dishView.render().el);
        }
    });
})();
