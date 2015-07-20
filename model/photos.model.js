Photos = new Mongo.Collection('photos');

Photos.allow({
  insert: function(userId, photo) {
    return true;
  },
  update: function(userId, photo, fields, modifier) {
    return true;
  },
  remove: function(userId, photo) {
    return true;
  }
});