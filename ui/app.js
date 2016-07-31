'use strict';
var socket = io(window.location.origin);
var app = angular.module('app', []);
app.controller('GameController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.user = {
		name: 'P2'
	};
	$scope.data = {

	};
	$scope.cards = cards;
	$scope.game = new Game({
		players: ['P1', 'P2']
	});
	$scope.me = $scope.game.player[$scope.user.name];
	$scope.buy = function(name) {
		console.log('angular buy', name);
	}
	console.log('scope', $scope);
}]);