(function() {

    FoodPlanner.classes.views.DishView = Backbone.View.extend({
        className:  'dish listitem',
        template:   $('#dishTemplate').html(),

        initialize: function() {
            this.el.view = this;
            this.model.on('change', this.render, this);
        },

        render: function () {
            var tmpl = _.template(this.template);
     
            this.$el.html(tmpl(this.model.attributes));
            this.$el.attr('cid', this.model.cid);
            return this;
        },
    });

})();
