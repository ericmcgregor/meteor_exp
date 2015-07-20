Sites = new Mongo.Collection('sites');

Sites.allow({
  insert: function(userId, site) {
    return true;
  },
  update: function(userId, site, fields, modifier) {
    return true;
  },
  remove: function(userId, site) {
    return true;
  }
});