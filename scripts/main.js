$(function() {

    var mainview = new FoodPlanner.MainView();

    var dish = new FoodPlanner.Dish();
    dish.set('title', 'paprika soep');
    console.log(typeof(dish.get('title')));

});
