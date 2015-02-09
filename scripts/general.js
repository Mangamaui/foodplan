(function() {

    window.APP = {

        initialize: function() {
            FoodPlanner.router = new FoodPlanner.classes.Router();
            Backbone.history.start(); 
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
