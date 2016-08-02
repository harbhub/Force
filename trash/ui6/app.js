'use strict';
var app = angular.module('app', []);
app.controller('controller', ['$scope', '$window', function ($scope, $window) {
	var s = $scope;
	s.title = 'My Title';
	s.socket = io(window.location.origin);
	s.socket.on('refresh', function (data) {
		$window.location.reload();
	});
	s.width = window.innerWidth;
	s.height = window.innerHeight;
	s.aspectRatio = s.width / s.height;
	s.game = {
		log: [],
		shop: ['Bronze', 'Silver', 'Gold', 'Swordsman', 'Archer', 'Jouster', 'Shield', 'Brainstorm', 'Cycle', 'Demolition', 'Harvest', 'Swindle', 'Melting Pot', 'Bazaar', 'Laboratory', 'Mercenary']
	};
	s.me = {
		name: 'harb',
		coins: 0,
		energy: 1,
		vouchers: 1,
		hand: ['Bronze', 'Bronze', 'Bronze', 'Swordsman', 'Swordsman'],
		deck: ['Bronze', 'Bronze', 'Bronze', 'Bronze', 'Swordsman'],
		discard: [],
		field: []
	};
	console.log('app scope', $scope);
}]);