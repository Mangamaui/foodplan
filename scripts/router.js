(function() {
    FoodPlanner.classes.Router = Backbone.Router.extend({

        routes: {
            ''                  : 'index',
            'shoppinglist'      : 'shoppinglist'
        },

        initialize: function() {
            FoodPlanner.parentView = new FoodPlanner.classes.views.ParentView();
        },

        index: function() {
            FoodPlanner.parentView.setChildView('index');
        },

        shoppinglist: function() {
            FoodPlanner.parentView.setChildView('shoppinglist');
        }
    });

})();
