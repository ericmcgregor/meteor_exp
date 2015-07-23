'use strict'

angular.module('angularApp')
.controller('FormController', function($scope) {
  $scope.updated = function(){
    alert('updated')
  }
  $scope.schema = {
      type: "object",
      properties: {
        name: { type: "string", minLength: 2, title: "Name", description: "Name or alias" },
        title: {
          type: "string",
          enum: ['dr','jr','sir','mrs','mr','NaN','dj']
        }
      }
    };

    $scope.form = [
  "*",
  {
    type: "submit",
    title: "Save",
    onClick: function(){
      alert('test')
    }
  }
];

$scope.model = {};
})
.controller('RestaurantsListCtrl', function($scope, $meteor) {
  $scope.page = 1;
  $scope.perPage = 50;
  $scope.sort = {score : 1};
  $scope.orderProperty = '1';

  $scope.api = function(){
    $meteor.call('getAPI').then(function(data){
      console.log(data);
    })
  }

  $scope.Restaurants = Restaurants;

  $scope.restaurants = $meteor.collection(Restaurants);
  $meteor.autorun($scope, function() {
    $meteor.subscribe('restaurants', {
      limit: parseInt($scope.getReactively('perPage')),
      skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
      sort: $scope.getReactively('sort')
    }, $scope.getReactively('search')).then(function() {
      $scope.restaurantsCount = $meteor.object(Counts, 'numberOfRestaurants', false);
    });

  });

  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.restaurants.save($scope.newRestaurant);
      $scope.newRestaurant = undefined;
    }
  };

  $scope.remove = function(restaurant) {
    $scope.restaurants.remove(restaurant);
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {score: parseInt($scope.orderProperty)};
    }
  });
});
