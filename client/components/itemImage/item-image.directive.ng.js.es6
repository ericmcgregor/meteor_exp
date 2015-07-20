'use strict';

angular.module('angularApp')
.directive('itemImage', function($meteor, $compile) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/itemImage/item-image.view.ng.html',
    replace: true,
    bindToController:{
      photoId:"=",
    },
    controllerAs:"ctrl",
    scope:{},
    controller:ItemImageControllerClass,
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

class ItemImageControllerClass {
  constructor($scope, $meteor){
    // 'ngInject';

    $meteor.autorun($scope, ()=>{
      $scope.$meteorSubscribe('photos');
      this.photo = $meteor.object(Photos, $scope.getReactively('ctrl.photoId'));
    });

  }

}
