'use strict'

angular.module('angularApp')
.controller('PhotoDetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.photo = $meteor.object(Photos, $stateParams.photoId);
  $meteor.subscribe('photos');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.photo.save().then(
        function(numberOfDocs) {
          console.log('save successful, docs affected ', numberOfDocs);
        },
        function(error) {
          console.log('save error ', error);
        }
      )
    }
  };
        
  $scope.reset = function() {
    $scope.photo.reset();
  };
});