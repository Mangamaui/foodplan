(function() {

    FoodPlanner.classes.views.DayView = Backbone.View.extend({
        className: 'day listitem',
        template: $('#dayTemplate').html(),

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function () {
            var tmpl = _.template(this.template);
     
            this.$el.html(tmpl(this.model.attributes));
            this.$el.attr('cid', this.model.cid);
            return this;
        }
    });
})();
