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
    controller:class ItemImageControllerClass {
      constructor($scope, $meteor){
        // 'ngInject';

        $meteor.autorun($scope, ()=>{
          $scope.$meteorSubscribe('photos');
          this.photo = $meteor.object(Photos, $scope.getReactively('ctrl.photoId'));
        });

      }

    },
    link: function(scope, element, attrs, ctrl) {

      scope.$watch('ctrl.photoId', function(value){
        console.log(value)
        if(value !== '' && value) {
          element.show();
        } else {
          element.hide();
        }
      });
      element.find('a').click(function(e){
        e.preventDefault();
        let picker = '<photo-edit photo-id="ctrl.photo._id"></photo-edit>'
        picker = $compile(picker)(scope);
        element.append(picker)
      });
    }
  };
});
