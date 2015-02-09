(function() {
    FoodPlanner.classes.views.ParentView = Backbone.View.extend({
        className: 'wrap',
        contentView: null,
        viewSet: null,

        initialize: function() {
            this.header = new FoodPlanner.classes.views.HeaderView();
            this.footer = new FoodPlanner.classes.views.FooterView();
        },

        render: function() {
            this.$el.append(this.header.el);
            this.$el.append(this.contentView.el);
            this.$el.append(this.footer.el);

            $('body').prepend(this.$el);
        },

        setChildView: function(childview) {
            this.removeContentView();

            switch(childview) {

                case 'index':
                    this.contentView = new FoodPlanner.classes.views.IndexView();
                break;

                case 'shoppinglist':
                    this.contentView =  new FoodPlanner.classes.views.IngredientView();
                break;

                default:
                    this.contentView = new FoodPlanner.classes.views.IndexView();
                break;
            }

            this.render();
        },

        removeContentView: function() {

            if (this.contentView !== null) {
                this.contentView.remove();
            }
        }
    }); 
})();
