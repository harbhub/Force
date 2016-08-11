var Game = function Game(settings) {
	this.onStart = function () {};
	this.onProgress = function () {};
	this.onComplete = function () {};
};

Game.prototype.cards = require('../ui/cards.js');

Game.prototype.play = function (name) {
	console.log('Play', name);
};

module.exports = Game;