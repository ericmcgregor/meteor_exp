Routes = new Mongo.Collection('routes');

Routes.allow({
  insert: function(userId, route) {
    return true;
  },
  update: function(userId, route, fields, modifier) {
    return true;
  },
  remove: function(userId, route) {
    return true;
  }
});