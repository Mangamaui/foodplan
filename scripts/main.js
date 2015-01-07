$(function() {

    var mainview = new MainView();

});

var Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

/*================================*/
/*             models             */
/*================================*/

var Dish = Backbone.Model.extend({

    defaults: {
        title:          'dish name',
        ingredients:    'ingredients',
        categories:     'dish categories'
    }
});

var Day = Backbone.Model.extend({

    defaults: {
        id:     0,
        name:   'day',
        dish:   'fill in dish'
    }
});

/*================================*/
/*           collections          */
/*================================*/

var Dishlist = Backbone.Collection.extend({
    className: 'list',
    id:     'dishes',
    model:  Dish ,
    url:    'scripts/dishes.json'
});

var Week = Backbone.Collection.extend({
    className: 'list',
    id:     'week',
    model: Day,

    initialize: function() {
        var dayModels = _.map(Days, function(day, id) {
            return new Day({id: id+1, name: day});
        });

        this.set(dayModels);
    },

});

/*================================*/
/*             views              */
/*================================*/

var DishView = Backbone.View.extend({
    className: 'dish',
    template: $('#dishTemplate').html(),

    render: function () {
        var tmpl = _.template(this.template);
 
        this.$el.html(tmpl(this.model.attributes));
        this.$el.attr('cid', this.model.cid);
        return this;
    },
});

var MenuView = Backbone.View.extend({
    el: $("#dishes"),
 
    initialize: function() {
        _.bindAll(this, 'render');

        this.collection = new Dishlist();
        this.render();

        this.listenTo(this.collection, 'reset', this.render);
    },
 
    render: function() {
        var that = this;

        this.$el.empty();

        _.each(this.collection.models, function (item) {
            that.renderDish(item);
        });
    },
 
    renderDish: function(item) {
        var dishView = new DishView({
            model: item
        });
        this.$el.append(dishView.render().el);
    }
});

var DayView = Backbone.View.extend({
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


var WeekView = Backbone.View.extend({
    el: $("#week"),

    initialize: function() {
        this.collection = new Week();
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
        var dayView = new DayView({
            model: day
        });
        this.$el.append(dayView.render().el);
    }
});

var MainView = Backbone.View.extend({
    el: $('.main'),
    dish: '',

    events: {
       'click div.dish': 'selectDish',
       'click div.day': 'placeDish'
    },

    initialize: function() {
        this.menuview = new MenuView();
        $(".wrapper").append(this.menuview.$el);

        // todo: cleanup
        this.menuview.collection.fetch({ reset: true });

        this.weekview = new WeekView();
        $(".wrapper").append(this.weekview.$el);
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

})
