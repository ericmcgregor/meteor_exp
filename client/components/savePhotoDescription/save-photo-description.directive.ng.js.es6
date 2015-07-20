'use strict';

angular.module('angularApp')
.directive('savePhotoDescription', function($meteor) {
  return {
    restrict: 'EA',
    bindToController:{
      'photoid':"@",
      'show':"="
    },
    templateUrl:"client/components/savePhotoDescription/save-photo-description.ng.html",
    controllerAs:"ctrl",
    scope:{},
    replace:true,
    controller:function($scope, $element, $attrs){
      this.description = "";

      this.updatePhoto = () => {
        let photo = $meteor.object(Photos, {_id:this.photoid}, false);
        photo.description = this.description;
        photo.save();
        this.description = "";
      }

      $meteor.session(this.photoid).bind($scope, 'state');

    },
    link: function(scope, element, attrs, ctrl) {
      scope.$watch('state', function(val){
        if(val.show===true){
          element.removeClass('hidden')
        } else {
          element.addClass('hidden')
        }
      });
    }
  }
});
