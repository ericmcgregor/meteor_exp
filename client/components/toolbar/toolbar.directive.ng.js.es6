'use strict'

angular.module('angularApp')
.directive('toolbar', function($meteor, $state) {
  return {
    restrict: 'AE',
    templateUrl: 'client/components/toolbar/toolbar.view.ng.html',
    replace: true,
    bindToController:true,
    controllerAs:"ctrl",
    controller:function(){
      var routes = $state.get();
      this.routes = [];

      for (let route of routes) {
        let num = route.url.split("/").length - 1;
        if(num === 1 && !route.abstract) {
          route.label = route.name.charAt(0).toUpperCase() + route.name.substring(1);
          this.routes.push(route);
        }
      }

      this.routes.reverse();

    },
    link:function(scope, element, attrs, ctrl){

    }
  };
});
