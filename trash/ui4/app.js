'use strict';
var app = angular.module('app', []);
app.controller('controller', ['$scope', function ($scope) {
	var a = $scope;
	a.title = 'My Title';
	a.socket = io(window.location.origin);
	a.width = window.innerWidth;
	a.height = window.innerHeight;
	a.aspectRatio = $scope.width / $scope.height;
	console.log('app scope', $scope);
}]);