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

Sites.attachSchema(new SimpleSchema({
  name: {
    type: String,
    label: 'name'
  },
  photoId: {
    type: String,
    label: 'photoId',
    optional: true
  },
}));
