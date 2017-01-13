'use strict';
angular.module('myApp.videogular1',
		[
			"ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster"
		]
	)
	.controller('HomeCtrl',
		["$sce", '$scope', '$timeout', function ($sce, $scope, $timeout) {
			console.log("Hello from HomeCtrl!");
			this.config = {
				sources: [		
					{src: $sce.trustAsResourceUrl("http://ak9.picdn.net/shutterstock/videos/3005179/preview/stock-footage-house-design-progress-architecture-drawing-and-visualization.webm"), type: "video/mp4"},					
					// {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.mp4"), type: "video/mp4"},
					// {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.webm"), type: "video/webm"},
					// {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
				],
				tracks: [
					{
						src: "http://www.videogular.com/assets/subs/pale-blue-dot.vtt",
						kind: "subtitles",
						srclang: "en",
						label: "English",
						default: ""
					}
				],
				theme: "bower_components/videogular-themes-default/videogular.css",
				plugins: {
					poster: "http://il8.picdn.net/shutterstock/videos/3005179/thumb/8.jpg"
					// poster: "http://www.videogular.com/assets/images/videogular.png"
				}
			};

	        $scope.tasks = [];	        
	        $scope.startedTracking = false;
	        $scope.timer = null;
	        $scope.endTime = 14000;

	        $scope.add = function() {
	        	if (!$scope.startedTracking) {
	        		controller.API.play();
	        		$timeout(function() {
	        			controller.API.pause();
	        		}, 1);
	        		$scope.startedTracking = true;
	        	}
	            $scope.tasks.push($scope.title);
	        }
	        $scope.delete = function() {

	            var timeLeft = controller.API.timeLeft - (controller.API.totalTime - $scope.endTime);

	            var timeIncrement = ( timeLeft / $scope.tasks.length) | 0;
	            var timeIncrementSeconds = parseInt(timeIncrement / 1000);
	            var newTime = controller.API.currentTime + timeIncrement;
	            var newTimeSeconds = parseInt(newTime / 1000);

	            if ($scope.timer !== null) {
		            $timeout.cancel($scope.timer); 
	            }
	            controller.API.play();
	            $scope.timer = $timeout(function(){
	            	controller.API.pause();
	            }, timeIncrement);


	            $scope.tasks.splice(this.$index, 1);	            
	        }

			var controller = this;
			controller.API = null;
			
			controller.onPlayerReady = function(API) {
				controller.API = API;			
			};



		}]
	);