(function(angular) {
	'use strict';

angular.module('ulv-camera-edit')
	.directive('ulvCamera', function() {
		return {
			restrict: 'AE',
			scope: {
				captureFunction: '=',
			},
			require: '^ulvCameraEdit',
			templateUrl: 'templates/camera.html',
			link: function(scope, element, attrs, ulvCameraEditCtrl) {
				scope.totalWidth = window.innerWidth;
				scope.totalHeight = window.innerHeight;

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
							///videoSelect.appendChild(option);
						} else {
							//console.log('Some other kind of source: ', sourceInfo);
						}
					}
					scope.$apply();
					scope.start(0);
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

				scope.start = function(key) {

					if (localStream) {
						console.log(localStream.getVideoTracks());
						//videoElement.pause();
						videoElement.src = null;
						console.log(localStream);
						localStream.getVideoTracks()[0].stop();
					}

					var videoSource = scope.videoSelect[key].id;

					var constraints = {
						video: {
							optional: [{
								sourceId: videoSource
							}]
						}
					};
					navigator.getUserMedia(constraints, successCallback, errorCallback);
				};

				scope.capture = function() {
					if (localStream) {
						scope.captureFunction(canvas, canvas.width, canvas.height);
						ulvCameraEditCtrl.changeView('edit');
						// "image/webp" works in Chrome.
						// Other browsers will fall back to image/png.
						//document.querySelector('img').src = canvas.toDataURL('image/webp');
					}
				};	

				

				function loop(){
					canvas.width = scope.totalWidth;
					canvas.height = scope.totalHeight;
					var wofSet = scope.totalWidth / 2;
					var wcentre = videoElement.videoWidth / 2;
					var wstart = wcentre - wofSet;
					var hofSet = scope.totalHeight / 2;
					var hcentre = videoElement.videoHeight / 2;
					var hstart = hcentre - hofSet;

					ctx.drawImage(videoElement, wstart, hstart, wcentre+wofSet, hcentre+hofSet, 0, 0, scope.totalWidth, scope.totalHeight);
					setTimeout(loop, 1000 / 30);
				}

				var canvas = document.getElementById('cropCvs');
				var ctx = canvas.getContext('2d');

				loop();

			}
		};
	});
})(angular);