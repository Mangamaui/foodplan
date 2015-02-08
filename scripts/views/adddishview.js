(function() {

    FoodPlanner.classes.views.AddDishView = Backbone.View.extend({
        className: 'popupwrap',
        template: $('#addDishTemplate').html(),

        events: {
            'click button.submit': 'addDish'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            var $tagfields = this.$el.find('input.field.tags');

            $tagfields.selectize({
                delimiter: ',',
                hideSelected: true,
                persist: false,
                create: function(input) {
                    return {
                        value: input,
                        text: input
                    }
                },
                load: function(query ,callback) {
                   callback(query);
                }
            });
            return this;
        },

        addDish: function(e) {
            e.preventDefault();

            var dish = new FoodPlanner.classes.models.Dish();
            
            var title          = $("#ip-title").val();
            var ingredients    = $("#ip-ingredients").val();
            var categories     = $("#ip-categories").val();

            ingredients =  ingredients.split(',');
            categories = categories.split(',');

            var attributes = {
                "title": title,
                "ingredients": ingredients,
                "categories": categories
                };

            var view = FoodPlanner.indexView.mainview;
            var collection = view.menuview.collection;
            dish.set(attributes);
            collection.add(dish);
            dish.save();
        }
    });
    
})();
