'use strict';

Meteor.methods({
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
