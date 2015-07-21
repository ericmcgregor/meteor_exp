Restaurants = new Mongo.Collection('restaurants');

Restaurants.allow({
  insert: function(userId, restaurant) {
    return true;
  },
  update: function(userId, restaurant, fields, modifier) {
    return true;
  },
  remove: function(userId, restaurant) {
    return true;
  }
});