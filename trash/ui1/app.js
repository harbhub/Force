'use strict';
function hide(id) {
	var elem = document.getElementById(id);
	if (elem) {
		elem.classList.add('hide');
	} else {
		console.log('Unable to hide #', id);
	}
}
function show(id) {
	var elem = document.getElementById(id);
	if (elem) {
		elem.classList.remove('hide');
	} else {
		console.log('Unable to show #', id);
	}
}
function toggle(id) {
	var elem = document.getElementById(id);
	if (elem) {
		elem.classList.toggle('hide');
	} else {
		console.log('Unable to show #', id);
	}
}
var state = {
	history: ['menu-auth'],
	previous: ''
};
function view(id) {
	console.log('view #', id);
	var elem = document.getElementById(id);
	if (elem) {
		console.log('elem', elem);
		state.previous = state.history[state.history.length];
		state.history.push(id);
		var previous = document.getElementById(state.previous);
		if (previous) {
			previous.classList.add('hide');
		}
		elem.classList.remove('hide');
	} else {
		console.log('Unable to view #', id);
	}
}
// Drag Objects
var finger = {
	x: window.innerWidth / 2,
	y: window.innerHeight / 2
};
function onResize(e) {
	console.log('Resize', e);
}
function onDown(e) {
	console.log('Down', e);
}
function onUp(e) {
	console.log('Up', e);
}
function onMove(e) {
	console.log('Move', e);
}