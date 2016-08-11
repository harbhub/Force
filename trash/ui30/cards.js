'use strict';
var cards = {

	// Base Treasure Cards
	'Bronze': {
		type: 'treasure',
		cost: 1,
		coins: 1,
		description: '+1 Coin'
	},
	'Silver': {
		type: 'treasure',
		cost: 3,
		coins: 2,
		description: '+2 Coins'
	},
	'Gold': {
		type: 'treasure',
		cost: 6,
		coins: 3,
		description: '+3 Coins'
	},
	'Platinum': {
		type: 'treasure',
		cost: 9,
		coins: 5,
		description: '+5 Coins'
	},

	// Base Treasure Cards
	'Swordsman': {
		type: 'legion',
		cost: 2,
		legion: 1,
		description: '+1 Legion'
	},
	'Archer': {
		type: 'legion',
		cost: 5,
		legion: 3,
		description: '+3 Legion'
	},
	'Cavalry': {
		type: 'legion',
		cost: 8,
		legion: 6,
		description: '+6 Legion'
	},
	'Trebuchet': {
		type: 'legion',
		cost: 11,
		legion: 10,
		description: '+10 Legion'
	},

	// Special Cards
	'Infestation': {
		type: 'hex',
		cost: 0,
		legion: -1,
		description: '-1 Legion'
	},

	// Emporium Raid Cards
	'Pestilence': {
		type: 'raid',
		cost: 5,
		cards: 2,
		description: 'Draw 2 cards and give each opponent an Infestation'
	},

	// Emporium Protection Cards
	'Lantern': {
		type: 'protection',
		cost: 2,
		stamina: 1,
		coins: 1,
		description: '+1 Stamina, +1 Coin, Immune to Raids while Lantern is in play, and +1 Coin when Lantern leaves play'
	},
	'Shield': {
		type: 'protection',
		cost: 2,
		cards: 2,
		description: 'Draw 2 cards and Immune to Raids while Shield is in your hand'
	},

	// Emporium Command Cards
	'Eradicate': {
		type: 'command',
		cost: 3,
		description: 'Destroy up to 4 cards from your hand'
	},
	'Cycle': {
		type: 'command',
		cost: 3,
		cards: 1,
		stamina: 2,
		description: 'Draw 1 card and +2 Stamina'
	},
	'Tinker': {
		type: 'command',
		cost: 3,
		cards: 1,
		stamina: 1,
		description: '+1 Stamina. If your hand has no duplicate cards, then Draw 2 cards. If not, then Draw 1 card.'
	},
	'Bounty': {
		type: 'command',
		cost: 4,
		cards: 4,
		description: 'Draw 3 cards'
	},
	'Scrap': {
		type: 'command',
		cost: 4,
		coins: 3,
		description: 'Destroy a Bronze in your hand for +3 Coins'
	},
	'Dig': {
		type: 'command',
		cost: 5,
		cards: 2,
		stamina: 1,
		description: 'Draw 2 cards and +1 Stamina'
	},
	'Opulence': {
		type: 'command',
		cost: 6,
		cards: 1,
		stamina: 1,
		coins: 2,
		bells: 1,
		description: 'Draw 1 card, +1 Stamina, +2 Coins, and +1 Buy. You cannot purchase Opulence if you have a Bronze in play.'
	}

};

if (typeof module !== 'undefined') {
	module.exports = cards;
}