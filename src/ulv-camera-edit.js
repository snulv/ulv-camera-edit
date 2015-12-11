(function(angular) {
	'use strict';

	angular
		.module('ulv-camera-edit')
	.directive('ulvCameraEdit', function() {
		return {
			restrict: 'AE',
			scope: {
			},
			templateUrl: 'templates/camera-edit.html',
			controller: function($scope) {
				$scope.draw = {};
				$scope.selected = {};
				$scope.selection = 1;
				$scope.selecter = function(int) {
					$scope.selection = int;
				};
				
				$scope.vm = {};
				$scope.options = {undo: true, width: 400, height: 300, color: $scope.selected.color, lineWidth: $scope.selected.lineWidth};
			},
			link: function(scope, element) {


				scope.capture = {};
				scope.capture.func = function(videoElement, width, height) {
					if (videoElement) {
						console.log(scope.draw.background);
						scope.draw.background(videoElement, width, height);
					
						/*canvas.width = width;
						canvas.height = height;
						ctx.drawImage(videoElement, 0, 0);	*/
					}
				};
			}
		};
	});
})(angular);