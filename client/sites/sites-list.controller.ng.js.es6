'use strict'

angular.module('angularApp')
.controller('SitesListCtrl', function($scope, $meteor) {

  $scope.sites = $meteor.collection(function() {
    return Sites.find({});
  });
  $scope.Sites = Sites;
  $meteor.autorun($scope, function() {
    $meteor.subscribe('sites').then(function() {
      $scope.sitesCount = $meteor.object(Counts, 'numberOfSites', false);
    });
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
