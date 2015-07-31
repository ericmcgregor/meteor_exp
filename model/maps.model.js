Maps = new Mongo.Collection('maps');

Maps.allow({
  insert: function(userId, map) {
    return true;
  },
  update: function(userId, map, fields, modifier) {
    return true;
  },
  remove: function(userId, map) {
    return true;
  }
});