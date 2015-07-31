angular.module('angularApp', [
  'angular-meteor',
  'ui.router',
  'ui.bootstrap',
  'angularUtils.directives.dirPagination',
  'schemaForm',
  'uiGmapgoogle-maps'
]);


onReady = function() {
  angular.bootstrap(document, ['angularApp']);
};

if(Meteor.isCordova) {
  angular.element(document).on('deviceready', onReady);
} else {
  angular.element(document).ready(onReady);
}
