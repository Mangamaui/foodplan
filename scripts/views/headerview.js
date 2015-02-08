(function() {

    FoodPlanner.classes.views.HeaderView = Backbone.View.extend({
        tagName:     'header',
        template:    $('#headerTemplate').html(),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
        }

    });
    
})();
