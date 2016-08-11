'use strict';
var util = require('util');
var Game = require('./game.js');
var game = new Game(['P1', 'P2']);
game.current.playCoins();
game.current.buy('Bronze');
console.log(util.inspect(game.current), {depth: 2});