'use strict'

angular.module('angularApp')
.controller('ProductDetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.product = $meteor.object(Products, $stateParams.productId);
  $meteor.subscribe('products');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.product.save().then(
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
    $scope.product.reset();
  };
});