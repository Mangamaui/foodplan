(function() {

    FoodPlanner.classes.views.WeekView = Backbone.View.extend({
        id:         'week',
        className:  'list',

        initialize: function() {
            this.collection = FoodPlanner.week;
            this.render();
        },

        render: function() {
            var that = this;

            this.$el.empty();

            _.each(this.collection.models, function (day) {
                that.renderDay(day);
            });
        },

        renderDay: function(day) {
            var dayView = new FoodPlanner.classes.views.DayView({
                model: day
            });
            this.$el.append(dayView.render().el);
        }
    });

})();
