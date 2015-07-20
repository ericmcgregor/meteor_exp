'use strict'

angular.module('angularApp')
.config(function($stateProvider) {
  $stateProvider
  .state('photos-list', {
    url: '/photos',
    templateUrl: 'client/photos/photos-list.view.ng.html',
    controller: 'PhotosListCtrl'
  })
  .state('photo-detail', {
    url: '/photos/:photoId',
    templateUrl: 'client/photos/photo-detail.view.ng.html',
    controller: 'PhotoDetailCtrl'
  });
});