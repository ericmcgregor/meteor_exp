'use strict'

angular.module('angularApp')
.config(function($stateProvider) {
  $stateProvider
  .state('maps', {
    url: '/maps',
    templateUrl: 'client/maps/maps.view.ng.html',
    controller: 'MapsCtrl'
  });
});