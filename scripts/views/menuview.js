(function() {

    FoodPlanner.classes.views.MenuView = Backbone.View.extend({
        id:         'dishes',
        className:  'list',
     
        initialize: function() {
            _.bindAll(this, 'render');

            this.collection = FoodPlanner.menu;
            this.render();

            this.listenTo(this.collection, 'reset add', this.render);
        },
     
        render: function(x) {
            var that = this;

            if (!x) {
                return;
            } else if (x.models) {
                // = collection
                this.$el.empty();

                _.each(this.collection.models, function (item) {
                    that.renderDish(item);
                });
            } else {
                // = model
                that.renderDish(x);
            }

            console.log("render");
        },
     
        renderDish: function(item) {
            var dishView = new FoodPlanner.classes.views.DishView({
                model: item
            });
            this.$el.append(dishView.render().el);
        }
    });
})();
