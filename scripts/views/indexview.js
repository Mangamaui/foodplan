(function() {

    FoodPlanner.classes.views.IndexView = Backbone.View.extend({
        tagName:    'main',
        dish:       '',
        mode:       'normal',
        popup:      false,
        template:   $('#mainTemplate').html(),

        events: {
           'click div.dish':            'selectDish',
           'click div.day':             'placeDish',
           'click button#addDishBtn':   'togglePopup',
           'click button#closePopup':   'togglePopup',
           'click button#editDishBtn':  'toggleEditableMode',
           'click button#saveDishBtn':  'saveDishes',
           'click button#deleteDishBtn':'toggleDeleteMode',
           'click button#showShoppingListBtn': 'generateShoppingList'
        },

        initialize: function() {
            this.menuview = new FoodPlanner.classes.views.MenuView();
            // todo: cleanup
            this.menuview.collection.fetch({ reset: true });

            this.weekview = new FoodPlanner.classes.views.WeekView();
            this.addDishview = new FoodPlanner.classes.views.AddDishView();

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

            if (this.mode == 'normal') {
                $('.dish').removeClass('selected');

                var cid = $target.attr('cid');
                var dish = this.menuview.collection.get(cid);
                var title = dish.get('title');
                this.dish = title;

            } else if (this.mode == 'delete') {
                $target.toggleClass('selected');
            }
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
        },

        saveDishes: function() {
            this.toggleEditableMode();

            var $parent = $('.dish');
            var collection = this.menuview.collection;

            _.each( $parent, function(dish){
                var $dish = $(dish);

                var cid = $dish.attr('cid');

                var title           = $dish.find('.title').text();
                var ingredients     = $dish.find('.ingredients').text();
                var categories      = $dish.find('.categories').text();
                var selectedDish    = collection.get(cid);

                selectedDish.set({
                    'title':        title,
                    'ingredients':  ingredients,
                    'categories':   categories
                });
                selectedDish.save();
            });
        },

        toggleEditableMode: function() {
            //show/hide elements
            $('div.icon').toggleClass('show');
            $('#saveDishBtn').toggle();
            $('#editDishBtn').toggle();

            //get editable items
            var $parent = $('.dish');
            var $children = $parent.children().not("div.icon");
            var contenteditable = $children.attr('contenteditable');
            
            //toggle editable on/off
            if (contenteditable == true) {
                $children.attr('contenteditable', false);
            } else {
                $children.attr('contenteditable', true);
            }
            
        },

        toggleDeleteMode: function() {

            if(this.mode != "delete") {
                this.mode = 'delete';
            } else {
                this.mode = 'normal';
                this.deleteSelectedDishes();
            }
        },

        setSelected: function(e) {
            var $selected = $(e.currentTarget);
            $selected.toggleClass('selected');
        },

        deleteSelectedDishes: function() {
            var selection = $('.dish.selected').length;
            
            if(selection > 0) {
                var $parent = $('.dish.selected');
                var collection = this.menuview.collection;

                _.each( $parent, function(dish){
                    var $dish = $(dish);
                    var cid = $dish.attr('cid');
                    var selectedDish = collection.get(cid);
                    selectedDish.destroy();
                });
            }
        },

        generateShoppingList: function() {
            FoodPlanner.router.navigate("shoppinglist", {
              trigger: true
            });
        }

    });


    FoodPlanner.classes.views.CategoryView = Backbone.View.extend({
        
        initialize: function() {
            console.log(_.uniq(FoodPlanner.CategoryList));
        }
    });
    
})();
