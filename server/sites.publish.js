'use strict'

Meteor.publish('sites', function(options, searchString) {
  if(!searchString) {
    searchString = '';
  }
  // options.transform = function(site){
  //   site.photo = Photos.findOne(site.photoId);
  //   return site;
  // }

  Counts.publish(this, 'numberOfSites', Sites.find({
    'name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }), {noReady: true});
  var _sites = Sites.find({
    'name': {
      '$regex': '.*' + searchString || '' + '.*',
      '$options': 'i'
    }
  }, options);

  return _sites;
});

// Meteor.publish('testcase', function(){
//   var RestCursor = Restaurants.find({zip_code: '78702'});
//   Mongo.Collection._publishCursor(RestCursor, this, 'myrestaurants');
// })

Meteor.publishComposite("sitesandphotos", {
        find: function() {
            return Sites.find({}, {
              sort: { score: -1 },
              limit: 10
              });
        },
        children: [
            {
              collectionName:"Photos",
                // Here we specify the client-side collection name we would
                // like to publish these records to.
                find: function(site) {

                    return Photos.find(site.photoId, { limit: 1 });
                }
            }
        ]
    });
