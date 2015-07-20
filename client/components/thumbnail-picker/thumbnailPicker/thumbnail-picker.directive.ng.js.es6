'use strict';

angular.module('angularApp')
.directive('thumbnailPicker', function($meteor) {
  return {
    restrict: 'EA',
    templateUrl: 'client/components/thumbnail-picker/thumbnailPicker/thumbnail-picker.view.ng.html',
    bindToController:{
      selection:"@",
      collection:"=",
      itemId:"=",
      autoSave:"="
    },
    controllerAs:"ctrl",
    scope:{},
    controller:class ThumbnailPickerController{

      constructor($scope, $element) {
        //AUTOSAVE
        if(this.autoSave===undefined) {
          this.autoSave = true;
        }

        //PHOTOS
        $meteor.autorun($scope, function() {
          $scope.photos = $meteor.collection(Photos);
          $scope.$meteorSubscribe('photos');
        });

        //THE OBJECT
        this.obj = $meteor.object(this.collection, this.itemId, this.autoSave);
        this.photoId = this.obj.photoId;

        //SET ID FUNCTION
        let setPhotoId = (photoId) => {
          this.obj[this.selection] = photoId;
          this.photoId = this.obj.photoId;
        }




        //MODAL
        let Modal = $element.find('.modal');
        Modal.modal('show');
        Modal.on('hidden.bs.modal', (e)=>{
          $scope.$emit('close-pickers');
        });



        $scope.select = (photoId) => {
          if(this.obj[this.selection] === photoId) {
            setPhotoId('');
            return;
          }
          setPhotoId(photoId);
        }

        $scope.saveAndClose = () => {
          this.obj.save();
          Modal.modal('hide');
        }
      }


    },
    // controller:function($scope, $element){
    //   //AUTOSAVE
    //   if(this.autoSave===undefined) {
    //     this.autoSave = true;
    //   }
    //
    //   //PHOTOS
    //   $meteor.autorun($scope, function() {
    //     $scope.photos = $meteor.collection(Photos);
    //     $scope.$meteorSubscribe('photos');
    //   });
    //
    //   //THE OBJECT
    //   this.obj = $meteor.object(this.collection, this.itemId, this.autoSave);
    //   this.photoId = this.obj.photoId;
    //
    //   //SET ID FUNCTION
    //   let setPhotoId = (photoId) => {
    //     this.obj[this.selection] = photoId;
    //     this.photoId = this.obj.photoId;
    //   }
    //
    //
    //
    //
    //   //MODAL
    //   let Modal = $element.find('.modal');
    //   Modal.modal('show');
    //   Modal.on('hidden.bs.modal', (e)=>{
    //     $scope.$emit('close-pickers');
    //   });
    //
    //
    //
    //   $scope.select = (photoId) => {
    //     if(this.obj[this.selection] === photoId) {
    //       setPhotoId('');
    //       return;
    //     }
    //     setPhotoId(photoId);
    //   }
    //
    //   $scope.saveAndClose = () => {
    //     this.obj.save();
    //     Modal.modal('hide');
    //   }
    //
    // },
    link: function(scope, elem, attrs) {
      scope.$on('$destroy', function(){
        console.log(scope)
      });
    }
  };
});
