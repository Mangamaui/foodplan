(function() {

    window.APP = {

        initialize: function() {
            APP.createAPPData();
            FoodPlanner.router = new FoodPlanner.classes.Router();
            Backbone.history.start(); 
        },

        createAPPData: function() {
            FoodPlanner.menu = new FoodPlanner.classes.collections.Dishlist();
            FoodPlanner.week = new FoodPlanner.classes.collections.Week();

            FoodPlanner.menu.on("reset", this.addExamples);
        },

        addExamples: function() {
            var storage_key = "foodplanner_added_examples";

            if (localStorage.getItem(storage_key) == "1") return;
            else if (APP.added_examples) return;
            else if (FoodPlanner.menu.length !== 0) return;
            
            localStorage.setItem(storage_key, "1");
            APP.added_examples = true;
                
            Backbone.ajax({
                dataType: "json",
                type: "GET",
                url: "scripts/dishes.json"
            
            }).done(function(obj) {
                var dishes = [];

                for (val in obj) {
                    console.log(val);
                    var dish = new FoodPlanner.classes.models.Dish();
                    dish.set(obj[val]);
                    dishes.push(dish);
                    dish.save();
                }

                FoodPlanner.menu.add(dishes);

            });
        },

        trimString: function(arr) {
            var trimmed = _.map(arr, function(item) {
              return item.trim();
            });

            return trimmed;
        },

        toArray: function(str) {
           var arr = str.split(',');
           return arr;
        },
    }

})();
