'use strict'
angular.module('angularApp')
.controller('SitesListCtrl', function($scope, $meteor) {

  // $scope.sites = $scope.$meteorCollection(function(){
  //     return Sites.find({},{
  //       transform:function(site){
  //         var photo = Photos.findOne(site.photoId);
  //         site.photo = photo;
  //         return site;
  //       }
  //     });
  //   });

    $scope.sites = $scope.$meteorCollection(function(){
        return Sites.find();
      });




  $scope.Sites = Sites;
  $scope.Photos = Photos;

  $scope.getPhoto = function(id, _scope) {
    _scope.photo = Photos.findOne(id);
  }

  $meteor.autorun($scope, () => {
    $scope.$meteorSubscribe('photos');
    $scope.$meteorSubscribe('sites').then(() => {
      $scope.sitesCount = $meteor.object(Counts, 'numberOfSites', false);
    });
    console.log($scope.sites)
  });


  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.sites.save($scope.newSite);
      $scope.newSite = undefined;
    }
  };

  $scope.remove = function(site) {
    $scope.sites.remove(site);
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });


});
