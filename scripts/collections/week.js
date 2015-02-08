(function() {
    FoodPlanner.classes.collections.Week = Backbone.Collection.extend({
        className: 'list',
        id:     'week',
        model: FoodPlanner.classes.models.Day,

        initialize: function() {
            var dayModels = _.map(FoodPlanner.DaysArr, function(day, id) {
                return new FoodPlanner.classes.models.Day({id: id+1, name: day});
            });

            this.set(dayModels);
        },

    });
})();
