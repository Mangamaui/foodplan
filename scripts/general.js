(function() {

    window.APP = {

        /**
         * here all the basics needs of the app get initialized/loaded
         * 
         */
        initialize: function() {
            APP.createAPPData();
            FoodPlanner.router = new FoodPlanner.classes.Router();
            Backbone.history.start(); 
        },

        /**
         * An instance of every collection type get's made
         * 
         */
        createAPPData: function() {
            FoodPlanner.menu = new FoodPlanner.classes.collections.Dishlist();
            FoodPlanner.week = new FoodPlanner.classes.collections.Week();

            FoodPlanner.menu.on("reset", this.addExamples);
        },

        /**
         * On first startup the database will be empty, this function
         * adds example data to the app.
         */
        addExamples: function() {
            var storage_key = "foodplanner_added_examples";
            console.log(localStorage.getItem(storage_key));
            //localStorage.setItem(storage_key, "0");

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

        /**
         * trimString removes whitespace from strings
         * @param  Array - arr - an array with strings
         * @return Array         an new array filled with the trimmed strings
         */
        trimString: function(arr) {
            var trimmed = _.map(arr, function(item) {
              return item.trim();
            });

            return trimmed;
        },

        /**
         * toArray turns a String into an Array
         * @param  String - str - a string that contains a list
         * @return Array          the converted String 
         */
        toArray: function(str) {
           var arr = str.split(',');
           return arr;
        },
    }

})();
