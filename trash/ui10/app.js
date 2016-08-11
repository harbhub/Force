'use strict';

var app = angular.module('app', []);

app.controller('controller', ['$scope', '$window', function ($scope, $window) {

	var s = $scope;

	s.title = 'My Title';

	s.headerItems = ['Home', 'Shop'];

	s.shop = ['Bronze', 'Silver', 'Gold', 'Swordsman', 'Archer', 'Jouster', 'Shield', 'Brainstorm', 'Cycle', 'Demolition', 'Harvest', 'Swindle', 'Melting Pot', 'Bazaar', 'Laboratory', 'Mercenary'];
	
	s.hand = ['Bronze', 'Bronze', 'Bronze', 'Swordsman', 'Bronze'];

	s.socket = io(window.location.origin);

	s.socket.on('refresh', function (data) {refresh();});

	function refresh() {

		$window.location.reload()

	}
	
}]);