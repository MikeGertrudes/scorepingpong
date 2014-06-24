var app = angular.module('ScorePingPong', [
		'OverlayDirective',
		'DotsDirective'
	]);

app.controller('langwijController', function ($scope, $document) {

		// game init
		$scope.game = {
			isOn: false,
			isOver: false
		};

		// player init
		$scope.players = {};
		$scope.players = {
			'player_1': {
				id: 1,
				name: 'Player 1',
				value: 'player_1',
				pts: 0
			},
			'player_2': {
				id: 2,
				name: 'Player 2',
				value: 'player_2',
				pts: 0
			}
		};

		$scope.servingPlayer = $scope.players.player_1;
		$scope.receivingPlayer = $scope.players.player_2;

		// notifications center
		$scope.notificationCenter = {};
		$scope.notificationCenter.notifications = [
			{message: 'This is notification 1'},
			{message: 'This is notification 2'}
		];
		$scope.notificationCenter.hasNotifications = false;
		$scope.notificationCenter.notificationCount = $scope.notificationCenter.notifications.length;
		$scope.notificationCenter.notificationCount = 0;

		$scope.scoreTypes = [
			{
				name: 'Game to 11',
				value: 11,
				icon: ''
			}, 
			{
				name: 'Game to 21',
				value: 21,
				icon: ''
			} 
		];

		// default starting language
		$scope.selectedScoreTypes = $scope.scoreTypes[0]; 


		$scope.addPoints = function (pts, player) {
			
			$scope.players[player].pts++;
			// if the score is below the max pts available
			// so we are now 
			if ($scope.players[player].pts < $scope.selectedScoreTypes.value) {
				// add pts
				//$scope.players[player].pts++;
				console.log('still going');
			} else {
				// if score is close, win by 2
				if ($scope.getDifferenceBetweenPlayersScore() < 2) {
					console.log('its win by two!');
					//$scope.players[player].pts++;
				} else {
					// game over!
					//$scope.players[player].pts++;
					$scope.$emit('GameOver', $scope.players[player]);
				}
			}
		};

		$scope.startGame = function () {
			$scope.game.isOn = true;
			$scope.resetGame();
			// on init
			$scope.resizePingPongTable();
		}
		$scope.resetGame = function () {
			$scope.players.player_1.pts = 0;
			$scope.players.player_2.pts = 0;
			$scope.game = {
				isOn: true,
				isOver: false
			}
		}

		$scope.getDifferenceBetweenPlayersScore = function () {
			return Math.abs($scope.players.player_1.pts - $scope.players.player_2.pts);
		};

		$scope.closeSlidePanel = function () {
			console.log('close slidepanel');
			//angular.element(document.getElementById('nav_primary_toggle')).checked = false;
			// doesn't work like that in angular
			document.getElementById('nav_primary_toggle').checked = false;
		};

		$scope.openSlidePanel = function () {
			console.log('open slidepanel');
			//angular.element(document.getElementById('nav_primary_toggle')).checked = true;
			// doesn't work like that in angular
			document.getElementById('nav_primary_toggle').checked = true;
		};

		// use javascript to resize the board for the device (BOO!!!)
		$scope.resizePingPongTable = function () {
			console.log(window.innerWidth);
			console.log(window.innerHeight);

			var footer_height = 44;
			var header_height = 44;

			var ping_pong_table_height = window.innerHeight - (header_height + footer_height);
			ping_pong_table_height = 420;
			document.getElementById('ping_pong_table_container').style.height = ping_pong_table_height;
		};


		// listen for GameOver messages
		$scope.$on('GameOver', function (event, args) {
			$scope.game.isOver = true;
		});

		// TODO: serving
		// TODO: game.isOver.
});

// app.directive('youTubeEmbed', function ($sce) {
// 	return {
// 		restrict: 'E',
// 		replace: true,
// 		template: '<iframe src="{{ url }}" frameborder="0" allowfullscreen id="video"></iframe>',
// 		link: function (scope, element, attrs) {
// 			scope.$watch('v', function (value) {
// 				scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + attrs.v + '?enablejsapi=1');
// 			});
// 		}
// 	};
// });

// app.factory('JsonService', function ($resource) {
// 	return $resource('playlist.json');
// });
//using $resource here is creating a problem
// the problem was due to not physically loading the add on "ng-resource", i guess $http comes out of the box

app.factory('JsonService', function ($http) {
	return {
		someFunc: function () {
			return $http.get('playlist.json');
		}
	};
});

app.factory('SearchVideos', function () {
	return { // After the API loads, call a function to enable the search box.			
		search: function (q) { // Search for a specified string.
			var request = gapi.client.youtube.search.list({
				q: q,
				part: 'snippet',
				type: 'video',
				regionCode: 'FR', // region code
				hl: 'fr_FR', // for text responses, what language should be used
				maxResults: 8
			});

			return request;
		}
	};
});

app.filter('getScoreNumberPosition', function () {
	return function (text, pos) {
		var tmp = ('0' + String(text)).slice(-2);
		console.log(tmp);

		return tmp.charAt(pos - 1);
	}
});
