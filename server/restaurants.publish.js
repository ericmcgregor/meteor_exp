'use strict'

Meteor.publish('restaurants', function(options, searchString) {
  if(!searchString) {
    searchString = '';
  }
  console.log(options)
  Counts.publish(this, 'numberOfRestaurants', Restaurants.find({
    'restaurant_name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }), {noReady: true});
  return Restaurants.find({
    'restaurant_name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }, options);
});
