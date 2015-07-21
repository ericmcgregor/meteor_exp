'use strict';

angular.module('angularApp')
.directive('toggleImagePicker', function($compile) {
  return {
    bindToController:{
      collection:"=",
      itemId:"=",
      autoSave:"="
    },
    scope:true,
    controller:function($scope, $element, $rootScope){
      let open = false;
      let getButton = () => {
        return $element[0].getElementsByTagName("button");
      }
      let getPicker = () => {
        return $element[0].getElementsByTagName("thumbnail-picker");
      }
      // let buttonText = getButton()[0].innerHTML;

      this.togglePicker = () => {
        if(open === false) {
          let picker = '<thumbnail-picker collection="ctrl.collection" item-id="ctrl.itemId" selection="photoId" auto-save="ctrl.autoSave"></thumbnail-picker>'
          picker = $compile(picker)($scope);
          $element.append(picker);
          // getButton()[0].innerHTML = 'close image picker';
          $rootScope.$broadcast('close-pickers', $scope.$id);
        } else {
          $element[0].getElementsByTagName("thumbnail-picker")[0].remove();
          // getButton()[0].innerHTML = buttonText;
        }
        open = !open;
      }

      $scope.$on('close-pickers', (a, b) => {
        if($scope.$id !== b && open===true) {
          this.togglePicker();
        }
      });
    },
    controllerAs:'ctrl',
    template:'<button ng-click="ctrl.togglePicker()" class="btn">add image</button>',
    link:function(scope, element, attrs, ctrl){

    }
  }
});
