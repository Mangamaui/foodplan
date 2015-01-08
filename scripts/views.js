/*================================*/
/*             views              */
/*================================*/
(function() {
    var Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    FoodPlanner.DishView = Backbone.View.extend({
        className: 'dish',
        template: $('#dishTemplate').html(),

        initialize: function() {
            this.model.on('change', this.render, this);
        },

        render: function () {
            var tmpl = _.template(this.template);
     
            this.$el.html(tmpl(this.model.attributes));
            this.$el.attr('cid', this.model.cid);
            return this;
        },
    });

    FoodPlanner.MenuView = Backbone.View.extend({
        id:         'dishes',
        className:  'list',
     
        initialize: function() {
            _.bindAll(this, 'render');

            this.collection = new FoodPlanner.Dishlist();
            this.render();

            this.listenTo(this.collection, 'reset', this.render);
            this.listenTo(this.collection, 'add', this.render);
        },
     
        render: function() {
            var that = this;

            this.$el.empty();

            _.each(this.collection.models, function (item) {
                that.renderDish(item);
            });
        },
     
        renderDish: function(item) {
            var dishView = new FoodPlanner.DishView({
                model: item
            });
            this.$el.append(dishView.render().el);
        }
    });

    FoodPlanner.DayView = Backbone.View.extend({
        className: 'day',
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


    FoodPlanner.WeekView = Backbone.View.extend({
        id:         'week',
        className:  'list',

        initialize: function() {
            this.collection = new FoodPlanner.Week();
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
            var dayView = new FoodPlanner.DayView({
                model: day
            });
            this.$el.append(dayView.render().el);
        }
    });

    FoodPlanner.MainView = Backbone.View.extend({
        el: $('.main'),
        dish: '',

        events: {
           'click div.dish': 'selectDish',
           'click div.day': 'placeDish'
        },

        initialize: function() {
            this.menuview = new FoodPlanner.MenuView();
            $(".wrapper").append(this.menuview.$el);

            // todo: cleanup
            this.menuview.collection.fetch({ reset: true });

            this.weekview = new FoodPlanner.WeekView();
            $(".wrapper").append(this.weekview.$el);

            this.addDishview = new FoodPlanner.AddDishView();
            $(".wrapper").append(this.addDishview.$el);
        },

        selectDish: function(e) {
            var $target = $(e.currentTarget);
            var cid = $target.attr('cid');
            var dish = this.menuview.collection.get(cid);
            var title = dish.get('title');
            this.dish = title;
        },

        placeDish: function(e) {

            if(this.dish.length > 0) {
                var $target = $(e.currentTarget);
                var cid = $target.attr('cid');
                var day = this.weekview.collection.get(cid);

                day.set('dish', this.dish);
            } else {
                alert('No dish chosen');
            }

            this.dish = '';
        }

    });

    FoodPlanner.AddDishView = Backbone.View.extend({
        className: 'addDish',
        template: $('#addDishTemplate').html(),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            return this;
        }
    });
    
})();
