Meteor.startup(function() {
  if(Maps.find().count() === 0) {
    var maps = [
      {
        'name': 'map 1'
      },
      {
        'name': 'map 2'
      }
    ];
    maps.forEach(function(map) {
      Maps.insert(map);
    });
  }
});