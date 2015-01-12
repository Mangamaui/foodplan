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
        tagName: 'main',
        dish: '',
        popup: false,
        template: $('#mainTemplate').html(),

        events: {
           'click div.dish':            'selectDish',
           'click div.day':             'placeDish',
           'click button#addDishBtn':   'togglePopup',
           'click button#closePopup':   'togglePopup'
        },

        initialize: function() {
            this.menuview = new FoodPlanner.MenuView();
            // todo: cleanup
            this.menuview.collection.fetch({ reset: true });

            this.weekview = new FoodPlanner.WeekView();
            this.addDishview = new FoodPlanner.AddDishView();

            this.render();

        },

        render: function() {
            this.$el.html(this.template);
            var $wrapper  = this.$el.find('.wrapper');

            $wrapper.prepend(this.weekview.el);
            $wrapper.prepend(this.menuview.el);

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
        },

        togglePopup: function() {

            var $wrapper  = this.$el.find('.wrapper');

            if(this.popup) {
               var $popup = this.addDishview.$el;
                $popup.remove();
                this.popup = false;
            } else {
                $wrapper.append(this.addDishview.el);
                this.popup = true;
            }
        }

    });

    FoodPlanner.AddDishView = Backbone.View.extend({
        className: 'popupwrap',
        template: $('#addDishTemplate').html(),

        events: {
            'click button.submit': 'addDish'
        },

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            var $tagfields = this.$el.find('input.field.tags');

            $tagfields.selectize({
                delimiter: ',',
                hideSelected: true,
                persist: false,
                create: function(input) {
                    return {
                        value: input,
                        text: input
                    }
                }
            });
            return this;
        },

        addDish: function(e) {
            e.preventDefault();

            var dish = new FoodPlanner.Dish();
            
            this.$el.find('input.field').each(function(key, field) {
                var name = field.name;
                var val = field.value;

                dish.set(name, val);
            });

            var view = FoodPlanner.indexView.mainview;
            var collection = view.menuview.collection;
            console.log(collection);
            collection.add(dish);
        }
    });

    FoodPlanner.HeaderView = Backbone.View.extend({
        tagName:     'header',
        template:    $('#headerTemplate').html(),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
        }

    });

    FoodPlanner.FooterView = Backbone.View.extend({
        tagName:    'footer',
        template:   $('#footerTemplate').html(),

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template);
        }

    });

    FoodPlanner.IndexView = Backbone.View.extend({
        className: 'wrap',

        initialize: function() {
            this.header = new FoodPlanner.HeaderView();
            this.mainview = new FoodPlanner.MainView();
            this.footer = new FoodPlanner.FooterView();

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
