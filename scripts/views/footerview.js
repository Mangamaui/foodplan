(function() {
    FoodPlanner.classes.views.FooterView = Backbone.View.extend({
        tagName:    'footer',
        template:   $('#footerTemplate').html(),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
        }

    });
})();
