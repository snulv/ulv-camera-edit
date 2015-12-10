/**
@toc

@param {Object} scope (attrs that must be defined on the scope (i.e. in the controller) - they can't just be defined in the partial html). REMEMBER: use snake-case when setting these on the partial!
TODO

@param {Object} attrs REMEMBER: use snake-case when setting these on the partial! i.e. my-attr='1' NOT myAttr='1'
TODO

@dependencies
TODO

@usage
partial / html:
TODO

controller / js:
TODO

//end: usage
*/

'use strict';

// Gets all current scripts, this file will always be the last one
var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length-1].src;

angular.module('snulvin.ulv-vertical-scroll', []).directive('ulvVerticalScroll', ['$window', '$log', function ($window, $log) {
	return {
		restrict: 'E',
		scope: {
			minWidth: '='
		},
		transclude: true,
		templateUrl: currentScriptPath.replace('ulv-vertical-scroll.js', 'ulv-vertical-scroll.html'),
		controller: function($scope) {
			if (!$scope.minWidth) { $scope.minWidth = 600; }
			/*
			* Checks if the current innerwidth is too small
			*/
			$scope.isTooSmall = function(size) {
				var small = false;
				if (size < $scope.minWidth) {
					small = true;
				}
				return small;
			};
		},
		link: function (scope, element, iAttrs, ctrl) {
			scope.tooSmall = scope.isTooSmall($window.innerWidth);
			/*
			* Checks if updates when ever the window size changes
			*/
			angular.element($window).bind('resize', function() {
				scope.tooSmall = scope.isTooSmall(element.parent().width());
				scope.$apply();
			});
		}
  	};
}]);
