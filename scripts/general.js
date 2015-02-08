(function() {

    window.APP = {

        initialize: function() {
            FoodPlanner.indexView = new FoodPlanner.classes.views.IndexView();
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
