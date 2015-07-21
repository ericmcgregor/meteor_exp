'use strict'

angular.module('angularApp')
.config(function($stateProvider) {
  $stateProvider
  .state('restaurants-list', {
    url: '/restaurants',
    templateUrl: 'client/restaurants/restaurants-list.view.ng.html',
    controller: 'RestaurantsListCtrl'
  })
  .state('restaurant-detail', {
    url: '/restaurants/:restaurantId',
    templateUrl: 'client/restaurants/restaurant-detail.view.ng.html',
    controller: 'RestaurantDetailCtrl'
  });
});