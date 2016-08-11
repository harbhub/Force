// Scaffold
'use strict';
var socket = io(window.location.origin, {
	secure: false
});
var app = angular.module('base', []);
app.controller('baseController', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {
	
	// Scope Variables
	$scope.lists = {
		max: {},
		current: {},
		help: [],
		lobby: [],
		hand: [],
		players: [],
		activity: [],
		emporium: []
	};
	$scope.me = {
		username: '',
		password: '',
		showing: '',
		path: [],
		volume: false,
		menu: false
	};

	// Events
	socket.on('connect', function () {
		console.log('Socket Connected', socket);
	});
	socket.on('refresh', function () {
		$window.location.reload();
	});

	// Functions
	$scope.show = function (name) {
		if (name === 'previous') {
			if ($scope.me.path.length > 0) {
				$scope.me.path.pop();
				if ($scope.me.path.length > 0) {
					$scope.me.showing = $scope.me.path[$scope.me.path.length - 1];
				} else {
					$scope.me.showing = '';
				}
			} else {
				$scope.me.showing = '';
				$scope.me.path = [];
			}
		} else {
			$scope.me.path.push(name);
			$scope.me.showing = name;
		}
	};
	$scope.toggleMenu = function () {
		$scope.me.menu = !$scope.me.menu;
	};
	$scope.toggleVolume = function () {
		$scope.me.volume = !$scope.me.volume;
	};
	$scope.helpLeft = function () {
		$scope.helpCurrent -= 1;
	};
	$scope.helpRight = function () {
		$scope.helpCurrent += 1;
	};
	$scope.generateHelpItems = function () {
		// TODO Create help items
		// 'Win Condition'}, 'New Game', 'Action Phase', 'Buy Phase', 'Emporium', 'Treasure', 'Legion', 'Spell', 'Curse'
		$scope.helpItems = [];
		for (var i = 0; i < 9; ++i) {
			var item = {
				title: 'Title' + (i + 1),
				description: 'Description goes here'
			};
			$scope.helpItems.push(item);
		}
		$scope.helpMax = $scope.helpItems.length;
		$scope.helpCurrent = 1;
	};
	$scope.generateLobbyItems = function () {
		$scope.lobbyItems = [];
		for (var i = 0; i < 9; ++i) {
			var item = {
				title: 'Title' + (i + 1),
				description: 'Description goes here'
			};
			$scope.lobbyItems.push(item);
		}
		$scope.lobbyMax = $scope.lobbyItems.length;
		$scope.lobbyCurrent = 1;
	};
	$scope.init = function () {
		$scope.generateHelpItems();
		$scope.generateLobbyItems();
	};

	// Initialize
	$scope.init();

}]);

// Build
