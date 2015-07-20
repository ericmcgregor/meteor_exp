'use strict';

angular.module('angularApp')
.directive('photoEdit', function($meteor) {
  return {
    bindToController:{
      photoId:"="
    },
    controllerAs:"ctrl",
    scope:{},
    restrict: 'EA',
    templateUrl: 'client/components/photoEdit/photo-edit.view.ng.html',
    controller:function($scope, $element){
      let Modal = $element.find('.modal');
      Modal.modal('show');

      Modal.on('hidden.bs.modal', (e)=>{
        $scope.$destroy();
      });

      $scope.saveAndClose = () => {
        $scope.photo.save();
        Modal.modal('hide');
      }

      $meteor.autorun($scope, () => {
        $scope.photo = $meteor.object(Photos, this.photoId, false);
        $meteor.subscribe('photos');
      });

    },
    link: function(scope, element, attrs, ctrl) {


    }
  };
});
