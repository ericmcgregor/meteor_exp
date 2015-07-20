Meteor.startup(function() {
  if(Photos.find().count() === 0) {
    var photos = [];
    photos.forEach(function(photo) {
      Photos.insert(photo);
    });
  }
});
