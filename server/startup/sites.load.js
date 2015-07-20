Meteor.startup(function() {
  if(Sites.find().count() === 0) {
    var sites = [
      {
        'name': 'site 1'
      },
      {
        'name': 'site 2'
      }
    ];
    sites.forEach(function(site) {
      Sites.insert(site);
    });
  }
});