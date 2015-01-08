/*================================*/
/*           collections          */
/*================================*/

(function() {
    FoodPlanner.Dishlist = Backbone.Collection.extend({
        className: 'list',
        id:     'dishes',
        model:  FoodPlanner.Dish ,
        url:    'scripts/dishes.json'
    });

    FoodPlanner.Week = Backbone.Collection.extend({
        className: 'list',
        id:     'week',
        model: FoodPlanner.Day,

        initialize: function() {
            var dayModels = _.map(FoodPlanner.DaysArr, function(day, id) {
                return new FoodPlanner.Day({id: id+1, name: day});
            });

            this.set(dayModels);
        },

    });
})();
