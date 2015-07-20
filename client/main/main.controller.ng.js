'use strict'

angular.module('angularApp')
  .controller('MainCtrl', function($scope, $meteor) {
    // $scope.page = 1;
    // $scope.perPage = 10;
    // $scope.sort = {
    //   name_sort: 1
    // };
    $scope.orderProperty = '1';

    $scope.things = $meteor.collection(Things);
    $meteor.autorun($scope, function() {
      $meteor.subscribe('things', {
        // limit: parseInt($scope.getReactively('perPage')),
        // skip: parseInt(($scope.getReactively('page') - 1) * $scope.getReactively('perPage')),
        // sort: $scope.getReactively('sort')
      }).then(function() {
        $scope.thingsCount = $meteor.object(Counts, 'numberOfThings', false);
      });
    });
    $scope.Things = Things;
    $scope.addImage = function(id) {
      let photoId = 'tmZvz8iQ9HBk2v6wD';
      let thing = $meteor.object(Things, id);
      thing.photoId = photoId;
      console.log(thing.save());
      $scope.digest();
    }
    $scope.save = function(id) {
      console.log($scope.things)
    }
    $scope.save1 = function() {
      if ($scope.form.$valid) {
        $scope.things.save($scope.newThing);
        $scope.newThing = undefined;
      }
    };

    $scope.remove = function(thing) {
      $scope.things.remove(thing);
    };

    $scope.pageChanged = function(newPage) {
      $scope.page = newPage;
    };

    // $scope.$watch('orderProperty', function() {
    //   if ($scope.orderProperty) {
    //     $scope.sort = {
    //       name_sort: parseInt($scope.orderProperty)
    //     };
    //   }
    // });
  });
