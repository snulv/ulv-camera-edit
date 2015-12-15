'use strict';

angular.module('ulv-camera-edit')
  .directive('pwColorSelector', function () {
    return {
      restrict: 'AE',
      scope: {
        colorList: '=pwColorSelector',
        selectedColor: '=color'
      },
      templateUrl: 'templates/color-selector.html',
      link: function(scope){
        scope.setColor = function(col){
          scope.selectedColor = col;
        };
      }
    };
  });
