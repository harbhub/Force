'use strict';
var cards = cards || {};
if (typeof module !== 'undefined') {
	require('./helpers.js');
	var cards = require('./cards.js');
}
var Game = function Game(config) {
	// Pre-Build
	var game = this;
	game.shop = ['Bronze', 'Silver', 'Gold', 'Swordsman', 'Archer', 'Jouster', 'Shield', 'Brainstorm', 'Cycle', 'Demolition', 'Harvest', 'Swindle', 'Melting Pot', 'Bazaar', 'Laboratory', 'Mercenary'];
	game.players = config.players || ['P1', 'P2'];
	game.players.shuffle();
	game.destroyed = [];
	game.player = {};
	game.phase = 'act';
	game.stock = {};
	game.log = [];
	game.log.push('Turn Order');
	// Build
	buildPlayers();
	buildStock();
	// Post-Build
	game.current = game.player[game.players[0]];
	// Helper Functions
	function buildPlayers() {
		for (var i = 0; i < game.players.length; ++i) {
			var name = game.players[i];
			game.log.push(name);
			game.player[name] = {
				name: name,
				deck: ['Bronze', 'Bronze', 'Bronze', 'Bronze', 'Bronze', 'Bronze', 'Bronze', 'Swordsman', 'Swordsman', 'Swordsman'].shuffle(),
				hand: [],
				discard: [],
				field: [],
				selectedFromHand: [],
				selectedFromShop: [],
				coins: 0,
				energy: 1,
				vouchers: 1
			};
			var player = game.player[name];
			player.draw = draw;
			player.draw(5);
			player.endTurn = endTurn;
			player.play = play;
			player.playCoins = playCoins;
			player.buy = buy;
		}
	}
	function buildStock() {
		for (var i = 0; i < game.shop.length; ++i) {
			var name = game.shop[i];
			var card = cards[name];
			if (name === 'Bronze') {
				game.stock[name] = 60 - game.players.length * 7;
				continue;
			} else if (name === 'Silver') {
				game.stock[name] = 40;
				continue;
			} else if (name === 'Gold') {
				game.stock[name] = 30;
				continue;
			} else if (card.type === 'army') {
				game.stock[name] = game.players.length > 2 ? 12 : 8;
				continue;
			} else if (card.type === 'mixed') {
				if (card.isArmy) {
					game.stock[name] = game.players.length > 2 ? 12 : 8;
				} else {
					game.stock[name] = 10;
				}
				continue;
			} else {
				game.stock[name] = 10;
				continue;
			}
		}
	}
	function draw(count) {
		var player = this;
		for (var i = 0; i < count; ++i) {
			if (player.deck.length >= 1) {
				var name = player.deck.splice(0, 1)[0];
				player.hand.push(name);
			} else {
				player.deck = player.discard.clone();
				player.discard = [];
				if (player.deck.length >= 1) {
					var name = player.deck.splice(0, 1)[0];
					player.hand.push(name);
				} else {
					break;
				}
			}
		}
	}
	function play(name) {
		var player = this;
		game.log.push(player.name + ' playing ' + name);
		player.hand.remove(name);
		player.field.push(name);
		var card = cards[name];
		for (var i = 0; i < card.act.length; ++i) {
			handleAction(card.act[i], player);
		}
	}
	function playCoins() {
		var player = this;
		for (var i = player.hand.length - 1; i >= 0; --i) {
			var name = player.hand[i];
			var card = cards[name];
			if (card.type === 'coin' || card.isCoin)  {
				player.play(name);
			}
		}
	}
	function handleAction(action, player) {
		if (action.draw) {
			player.draw(action.draw);
		} else if (action.coins) {
			player.coins += action.coins;
		} else if (action.energy) {
			player.energy += action.energy;
		} else if (action.vouchers) {
			player.vouchers += action.vouchers;
		} else if (action.phase === 'shop') {
			game.phase = 'shop';
			player.energy = 0;
		} else {
			console.log('Unknown Action', action);
		}
	}
	function buy(name) {
		console.log('buy', name);
		var player = this;
		var card = cards[name];
		if (player.coins >= card.cost && player.vouchers >= 1) {
			if (game.stock[name] >= 1) {
				game.log.push(player.name + ' buying ' + name);
				game.stock[name] -= 1;
				player.discard.push(name);
				player.vouchers -= 1;
				player.coins -= card.cost;
			} else {
				console.log('Cannot buy card because Shop is out of stock', name);
			}
		} else {
			console.log('Cannot buy card because player does not have sufficient coins and/or vouchers', name);
		}
	}
	function endTurn() {
		var player = this;
		game.log.push(player.name + ' ending turn');
		game.phase = 'end';
		player.coins = 0;
		player.energy = 1;
		player.vouchers = 1;
		player.discard = player.discard.concat(player.hand);
		player.discard = player.discard.concat(player.field);
		player.hand = [];
		player.field = [];
		player.draw(5);
		nextPlayer();
		game.phase = 'act';
	}
	function nextPlayer() {
		var index = game.players.indexOf(game.current.name);
		if (index === game.players.length - 1) {
			index = 0;
		} else {
			index += 1;
		}
		game.current = game.player[game.players[index]];
	}
	function removePlayer(name) {
		// Incomplete
		var index = game.player[name].index;
		for (var i = 0; i < game.players.length; ++i) {
			var _name = game.players[i];
			var _player = game.player[_name];
			if (_player.index > index) {
				_player.index -= 1;
			}
		}
		game.players.remove(name);
		game.player[name].inactive = true;
		if (index === game.turnIndex) {
			game.player[name].endTurn();
		}
	}
	// Export
	return game;
};
if (typeof module !== 'undefined') {
	module.exports = Game;
}