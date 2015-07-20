'use strict'

angular.module('angularApp')
.config(function($stateProvider) {
  $stateProvider
  .state('sites-list', {
    url: '/sites',
    templateUrl: 'client/sites/sites-list.view.ng.html',
    controller: 'SitesListCtrl'
  })
  .state('site-detail', {
    url: '/sites/:siteId',
    templateUrl: 'client/sites/site-detail.view.ng.html',
    controller: 'SiteDetailCtrl'
  });
});