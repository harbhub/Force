'use strict';
var cards = {
	// Base Coins
	'Bronze': {
		base: true,
		cost: 0,
		type: 'coin',
		act: [{
			coins: 1
		}, {
			phase: 'shop'
		}]
	},
	'Silver': {
		base: true,
		cost: 3,
		type: 'coin',
		act: [{
			coins: 2
		}]
	},
	'Gold': {
		base: true,
		cost: 6,
		type: 'coin',
		act: [{
			coins: 3
		}]
	},
	// Base Army
	'Swordsman': {
		base: true,
		description: 'Swordsman fights for you at the end of the game',
		cost: 2,
		type: 'army',
		army: 1
	},
	'Archer': {
		base: true,
		description: 'Archer fights for you at the end of the game',
		cost: 5,
		type: 'army',
		army: 3
	},
	'Jouster': {
		base: true,
		description: 'Jouster fights for you at the end of the game',
		cost: 8,
		type: 'army',
		army: 6
	},
	// Hex
	'Assassin': {
		cost: 0,
		type: 'hex'
	},
	// Powers
	'Shield': {
		description: 'Immune from attacks while holding the shield\n+2 cards',
		cost: 2,
		type: 'action',
		act: [{
			draw: 2
		}]
	},
	'Brainstorm': {
		description: '+3 cards\nPut a card from your hand on top of your deck',
		cost: 2,
		type: 'action',
		act: [{
			draw: 3
		}, {
			handToTopDeck: 1
		}]
	},
	'Cycle': {
		description: '+1 card\n+2 Energy',
		cost: 3,
		type: 'action',
		act: [{
			draw: 1
		}, {
			energy: 2
		}]
	},
	'Demolition': {
		description: 'Destroy up to 4 cards from your hand',
		cost: 3,
		type: 'action',
		act: [{
			destroyFromHand: 0
		}]
	},
	'Harvest': {
		description: '+3 cards',
		cost: 4,
		type: 'action',
		act: [{
			draw: 3
		}]
	},
	'Swindle': {
		description: 'Gain a Silver from the Shop and put it on top of your deck\nOpponents put an Army card from their hand on top of their deck',
		cost: 4,
		type: 'action',
		act: [{
			gain: 'Silver'
		}, {
			attack: 'armyFromHandToTopDeck'
		}]
	},
	'Melting Pot': {
		description: 'Destroy a Bronze from your hand\n+3 coins',
		cost: 4,
		type: 'action',
		act: [{
			destroyFromHand: 'Bronze'
		}, {
			coins: 3
		}]
	},
	'Bazaar': {
		description: '+1 card\n+1 energy\n+1 coin\n+1 voucher',
		cost: 5,
		type: 'action',
		act: [{
			draw: 1
		}, {
			energy: 1
		}, {
			coins: 1
		}, {
			vouchers: 1
		}]
	},
	'Laboratory': {
		description: '+2 cards\n+1 energy',
		cost: 5,
		type: 'action',
		act: [{
			draw: 2
		}, {
			energy: 1
		}]
	},
	'Mercenary': {
		description: '+2 coins\nMercenary fights for you at the end of the game',
		cost: 6,
		type: 'mixed',
		army: 2,
		isArmy: true,
		isCoin: true,
		act: [{
			coins: 2
		}]
	}
};

if (typeof module !== 'undefined') {
	module.exports = cards;
}