'use strict'

angular.module('angularApp')
.controller('SiteDetailCtrl', function($scope, $stateParams, $meteor) {
  $scope.site = $meteor.object(Sites, $stateParams.siteId);
  $meteor.subscribe('sites');
  
  $scope.save = function() {
    if($scope.form.$valid) {
      $scope.site.save().then(
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
    $scope.site.reset();
  };
});