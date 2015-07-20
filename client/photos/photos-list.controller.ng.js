'use strict'

angular.module('angularApp')
.controller('PhotosListCtrl', function($scope, $meteor) {
  $scope.page = 1
  // $scope.perPage = 4
  // $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'

  $scope.page = 1;

  $scope.morePhotos = function() {
    $scope.page++;
    $meteor.call('getPhotos', $scope.page);
  }

  $scope.photos = $meteor.collection(function() {
    return Photos.find({}, {sort:$scope.getReactively('sort')});
  });

  $meteor.autorun($scope, function() {
    $meteor.subscribe('photos').then(function() {
      $scope.photosCount = $meteor.object(Counts, 'numberOfPhotos', false);
      // $scope.photosCount = $scope.images.length;
    });
  });

  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.photos.save($scope.newPhoto);
      $scope.newPhoto = undefined;
    }
  };

  $scope.remove = function(photo) {
    $scope.photos.remove(photo);
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
