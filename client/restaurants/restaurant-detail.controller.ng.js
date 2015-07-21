'use strict'

angular.module('angularApp')
.controller('RestaurantDetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.restaurant = $meteor.object(Restaurants, $stateParams.restaurantId);
  $meteor.subscribe('restaurants');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.restaurant.save().then(
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
    $scope.restaurant.reset();
  };
});