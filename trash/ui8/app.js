'use strict';

var app = angular.module('app', []);

app.controller('controller', ['$scope', '$window', function ($scope, $window) {

	var s = $scope;

	s.title = 'My Title';

	s.headerItems = ['Home', 'Shop'];

	s.items = [{name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}, {name:'Item Name'}];

	s.socket = io(window.location.origin);

	s.socket.on('refresh', function (data) {refresh();});

	function refresh() {

		$window.location.reload()

	}
	
}]);