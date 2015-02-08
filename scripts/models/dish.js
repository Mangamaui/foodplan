(function() {
    FoodPlanner.classes.models.Dish = Backbone.Model.extend({

        defaults: {
            title:          'dish name',
            ingredients:    'ingredients',
            categories:     'dish categories'
        },

        // urlRoot: '/api/dishes',

        validate: function(attrs) {
            // if (typeof(attrs.title) !== 'string') {
            //     return "title isn't text";
            // }

            // if (typeof(attrs.ingredients) !== 'string') {
            //     return "ingredients should be text";
            // }

            // if (typeof(attrs.categories) !== 'string') {
            //     return "categories should be text";
            // }
        },

        sync: function(method, model, options) {
            options = $.extend({}, options);
            options.attrs = { dish: model.toJSON(options) };

            console.log(options.attrs);
        
            Backbone.sync.call(this, method, model, options);
        },

        parse: function(response) {
            response = response.dish ? response.dish : response;
            response.id = response._id;
            return response;
        }
    });

})();
