'use strict'

angular.module('angularApp')
.controller('ProductsListCtrl', function($scope, $meteor) {
  $scope.page = 1
  $scope.perPage = 3
  $scope.sort = {name_sort : 1};
  $scope.orderProperty = '1'

  $scope.products = $meteor.collection(function() {
    return Products.find({});
  });

  $meteor.autorun($scope, function() {
    $meteor.subscribe('products').then(function() {
      $scope.productsCount = $meteor.object(Counts, 'numberOfProducts', false);
    });
  });
  $scope.Products = Products;
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.products.save($scope.newProduct);
      $scope.newProduct = undefined;
    }
  };

  $scope.remove = function(product) {
    $scope.products.remove(product);
  };

  $scope.pageChanged = function(newPage) {
    $scope.page = newPage;
  };

  $scope.invent = function(){
    $meteor.call('invent').then(function(data){
      console.log(data);
    });
  }

  $scope.$watch('orderProperty', function() {
    if($scope.orderProperty) {
      $scope.sort = {name_sort: parseInt($scope.orderProperty)};
    }
  });
});
