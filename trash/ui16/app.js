'use strict';
var app = angular.module('app', []);
app.controller('controller', ['$scope', '$window', function ($scope, $window) {
	$scope.title = 'My Title';
	$scope.socket = io(window.location.origin);
	$scope.socket.on('refresh', function (data) {refresh();});
	function refresh() {
		$window.location.reload()
	}
	$scope.menuItems = [{
		imageSource: 'assets/heart.png'
	}, {
		imageSource: 'assets/star.png'
	}, {
		imageSource: 'assets/pirate.png'
	}, {
		imageSource: 'assets/dice.png'
	}];
	$scope.calculateIconImageSize = calculateIconImageSize;
	function calculateIconImageSize(outer) {
		var inner = Math.floor( Math.SQRT2 * outer / 2 );
		if ( inner % 2 !== 0 ) { inner -= 1; }
		return inner;
	}
}]);