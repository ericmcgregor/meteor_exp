'use strict';

Meteor.methods({
  addLotsOfSites:function(){
    let i = 0;
    let photos = Photos.find().fetch();
    while (i < 200) {
      Sites.insert({
        name:'test',
        photoId:photos[Math.floor((Math.random() * photos.length))]._id
      });
      i++;
    }
  },
  removeAllSites:function(){
    return Sites.remove({});

  },
  removeAllRestaurants: function() {
        return Restaurants.remove({});
  },
  getRestaurantsAPI:function(){
      let results = HTTP.get('https://data.austintexas.gov/resource/ecmv-9xxi.json');
      let num = Restaurants.find().count() + 30;
      results = results.data.splice(num, 30);

      for(let item of results) {
        Restaurants.insert(item);
      }

      return results;

  },
  getPhotoData:function(url, id) {
    HTTP.get(url, {
      npmRequestOptions:{encoding: 'binary'}
    }, function(err, result){

      let data_uri_prefix = "data:image/jpg;base64,";
      let image = new Buffer(result.content.toString(), 'binary').toString('base64');
      image = data_uri_prefix + image;
      Photos.update(id, {
        $set:{
          image:image
        }
      });

    });
  },
  getPhotos: function(page=1) {
    //return a value
    try {
      var result = HTTP.get("https://unsplash.com?page="+page);
      var srcs = result.content.match(/<img[^>]+src="http([^">]+)/g)

      for (let src of srcs) {
        if(src.match('ununsplash.imgix.net')) {
          let url = src.split('src="')[1];
          let thumb = url.split('?')[0]+'?dpr=2&fit=crop&fm=jpg&h=100&q=75';

          if( !Photos.findOne({thumb:thumb}) ){
            console.log('Adding photo '+url);
            let photo = Photos.insert({
              "thumb":thumb,
              "url":url
              });

            Meteor.call('getPhotoData', thumb, photo);
          }

        }
      }

      return true;
    } catch (e) {
      // Got a network error, time-out or HTTP error in the 400 or 500 range.
      return false;
    }
  }
});
