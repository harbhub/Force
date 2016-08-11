// Scaffold
'use strict';
var socket = io(window.location.origin, {
	secure: false
});
var app = angular.module('base', []);
app.controller('baseController', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {
	
	// Scope Variables
	$scope.lists = {
		help: [],
		lobby: [{
			name: 'Quick Play',
			target: 'quickPlay'
		}],
		hand: [],
		players: [],
		activity: [],
		emporium: []
	};

	$scope.me = {
		username: {
			value: '',
			min: 3,
			max: 16
		},
		password: {
			value: '',
			min: 3,
			max: 255
		},
		showing: '',
		path: [],
		volume: false,
		menu: false,
		invalidForm: '',
		invalidFormToken: null,
		processing: false
	};

	// Events
	socket.on('connect', function () {
		console.log('Socket Connected', socket);
	});

	socket.on('refresh', function () {
		$window.location.reload();
	});

	socket.on('auth', function (data) {
		console.log('Authentication', data);
		if (data.success) {

		} else {

		}
		$scope.show('lobby');
		$scope.me.processing = false;
		$scope.$apply();
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

	$scope.validateForm = function () {
		var username = $scope.me.username.value;
		var password = $scope.me.password.value;
		if (!username || !password) {
			$scope.me.invalidForm = 'Missing Fields';
		} else if (username.length < $scope.me.username.min) {
			console.log('here');
			$scope.me.invalidForm = 'Username is too short';
		} else if (username.length > $scope.me.username.max) {
			$scope.me.invalidForm = 'Username is too long';
		} else if (password.length < $scope.me.password.min) {
			$scope.me.invalidForm = 'Password is too short';
		} else if (password.length > $scope.me.password.max) {
			$scope.me.invalidForm = 'Password is too long';
		} else {
			$scope.me.invalidForm = '';
		}
		if ($scope.me.invalidForm) {
			return false;
		} else {
			return true;
		}
	};

	$scope.auth = function () {
		if ($scope.me.processing) {
			return;
		}
		var isValid = $scope.validateForm();
		console.log('auth', isValid, $scope);
		if (isValid) {
			$scope.me.processing = true;
			socket.emit('auth', {
				username: $scope.me.username.value,
				password: $scope.me.password.value
			});
		} else {
			if ($scope.me.invalidFormToken) {
				clearTimeout($scope.me.invalidFormToken);
			}
			$scope.me.invalidFormToken = setTimeout(function () {
				$scope.me.invalidForm = '';
				$scope.$apply();
			}, 3000);
		}
	};

	$scope.click = function (target) {
		$scope[target]();
	};

	$scope.quickPlay = function () {
		console.log('Quick Play');
	};

	$scope.register = function () {
		
	};

	$scope.init = function () {
		
	};

	// Initialize
	$scope.init();

}]);

// Build
