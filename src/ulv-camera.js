(function(angular) {
	'use strict';

	angular
		.module('ulv-camera-edit')
	.directive('ulvCamera', function() {
		return {
			restrict: 'AE',
			scope: {
				captureFunction: '=',
			},
			templateUrl: 'templates/camera.html',
			link: function(scope, element) {
				var videoElement = element[0].querySelector('video');
				var localStream;
				scope.selected;
				scope.videoSelect = [];
				
				navigator.getUserMedia = navigator.getUserMedia ||
				  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

				function gotSources(sourceInfos) {
					for (var i = 0; i !== sourceInfos.length; ++i) {
						var sourceInfo = sourceInfos[i];
						//option.value = sourceInfo.id;
						//var option = document.createElement('option');
						

						if (sourceInfo.kind === 'video') {
								var tempText = sourceInfo.label || 'camera ' + (scope.videoSelect.length + 1);
								scope.videoSelect.push(sourceInfo);
								//scope.videoSelect.push(sourceInfo);

								scope.selected = scope.videoSelect.length - 1;
							///videoSelect.appendChild(option);
						} else {
							//console.log('Some other kind of source: ', sourceInfo);
						}
					}
					scope.$apply();
					scope.start();
				}

				if (typeof MediaStreamTrack === 'undefined' ||
					typeof MediaStreamTrack.getSources === 'undefined') {
				  		alert('This browser does not support MediaStreamTrack.\n\nTry Chrome.');
				} else {
				  	MediaStreamTrack.getSources(gotSources);
				}

				function successCallback(stream) {
					localStream = stream; // make stream available to console
					videoElement.src = window.URL.createObjectURL(stream);
					videoElement.play();
				}

				function errorCallback(error) {
					console.log('navigator.getUserMedia error: ', error);
				}

				scope.start = function() {
					/*if (localStream) {
						//videoElement.pause();
						videoElement.src = null;
						console.log(localStream);
						localStream.getVideoTracks()[0].stop();
						localStream = null;
					}

					console.log(scope.videoSelect[scope.selected].id);
					var videoSource = scope.videoSelect[scope.selected].id;

					var constraints = {
						video: {
							optional: [{
								sourceId: videoSource
							}]
						}
					};
					navigator.getUserMedia(constraints, successCallback, errorCallback);*/

					navigator.getUserMedia({
						audio: false,
						video: true
					}, successCallback, errorCallback);
				};

				scope.capture = function() {
					if (localStream) {
						scope.captureFunction(videoElement, videoElement.videoWidth, videoElement.videoHeight);
					
						// "image/webp" works in Chrome.
						// Other browsers will fall back to image/png.
						//document.querySelector('img').src = canvas.toDataURL('image/webp');
					}
				};	
			}
		};
	});
})(angular);