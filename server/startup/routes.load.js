Meteor.startup(function() {
  if(Routes.find().count() === 0) {
    var routes = [
      {
        'name': 'route 1'
      },
      {
        'name': 'route 2'
      }
    ];
    routes.forEach(function(route) {
      Routes.insert(route);
    });
  }
});