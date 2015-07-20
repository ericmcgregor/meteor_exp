'use strict'

Meteor.publish('products', function(options, searchString) {
  if(!searchString) {
    searchString = '';
  }
  Counts.publish(this, 'numberOfProducts', Products.find({
    'name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }), {noReady: true});
  return Products.find({
    'name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }, options);

//   Meteor.publishWithRelations({
//   handle: this,
//   collection: Products,
//   filter: '',
//   mappings: [{
//     key: 'photoId',
//     collection: Meteor.photos
//   }]
// });

});
