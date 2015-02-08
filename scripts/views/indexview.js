(function() {
    FoodPlanner.classes.views.IndexView = Backbone.View.extend({
        className: 'wrap',

        initialize: function() {
            this.header = new FoodPlanner.classes.views.HeaderView();
            this.mainview = new FoodPlanner.classes.views.MainView();
            this.footer = new FoodPlanner.classes.views.FooterView();

            this.render();
        },

        render: function() {
            this.$el.append(this.header.el);
            this.$el.append(this.mainview.el);
            this.$el.append(this.footer.el);

            $('body').prepend(this.$el);
        }
    }); 
})();
