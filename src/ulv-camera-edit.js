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
				//$scope.selection = 1;
				//$scope.selecter = function(int) {
				//	$scope.selection = int;
				//};
				
				

				$scope.currentView = 'capture';

				this.changeView = function(view) {
					console.log(view);
					$scope.currentView = view;
				};
			},
			link: function(scope, element) {

				scope.background;
				scope.capture = {};
				scope.capture.func = function(videoElement, width, height) {
					if (videoElement) {
						scope.background = {
							videoElement: videoElement,
							width: width,
							height: height
						};
						//scope.draw.background(videoElement, width, height);
					
						/*canvas.width = width;
						canvas.height = height;
						ctx.drawImage(videoElement, 0, 0);	*/
					}
				};
			}
		};
	});
})(angular);