'use strict';

angular.module('angularApp')
.directive('photoItem', function($meteor, $compile,$document) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/photoItem/photo-item.view.ng.html',
    replace: true,
    bindToController:{
      photo:"="
    },
    controllerAs:"ctrl",
    scope:{},
    controller:function(){
      // Session.set(this.photo._id, {show:false});
    },
    link: function(scope, element, attrs, ctrl) {

      element.find('a').click(function(e){
        e.preventDefault();
        let picker = '<photo-edit photo-id="ctrl.photo._id"></photo-edit>'
        picker = $compile(picker)(scope);
        element.append(picker)
      });

    }
  };
});
