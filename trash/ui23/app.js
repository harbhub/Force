'use strict';
var scene = new THREE.Scene();
var clock = new THREE.Clock();
clock.autoStart = true;
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 1000);
camera.lookAt(new THREE.Vector3(0, 0, 0));
camera.updateProjectionMatrix();
scene.add(camera);
var renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new THREE.Color('black'), 1);
renderer.setSize(window.innerWidth, window.innerHeight);
window.addEventListener('DOMContentLoaded', init);
function init() {
	document.body.appendChild(renderer.domElement);
}
window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
function resize(event) {
	event.preventDefault();
	camera.aspect =  window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}
var renderIdentifier;
function render() {
	var delta = clock.getDelta();
	renderIdentifier = requestAnimationFrame(render);
	renderer.render(scene, camera);
}
function stopRenderer() {
	cancelAnimationFrame(renderIdentifier);
};
render();
var ambient = new THREE.AmbientLight();
scene.add(ambient);
var box = new THREE.Mesh(new THREE.BoxGeometry(100, 100, 100), new THREE.MeshPhongMaterial({
	color: new THREE.Color('red')
}));
// var box = new THREE.Mesh(new THREE.BoxGeometry(window.innerWidth, window.innerHeight, 1), new THREE.MeshPhongMaterial({
// 	color: new THREE.Color('red')
// }));
scene.add(box);
box.updateMatrixWorld(true);
var position = box.matrixWorld.getPosition();
box.geometry.computeBoundingSphere();
var radius = box.geometry.boundingSphere.radius;
var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), new THREE.MeshPhongMaterial({
	color: new THREE.Color('green'),
	wireframe: true
}));
scene.add(sphere);
setInterval(function () {
	box.rotation.x += 0.05;
	box.rotation.y += 0.05;
}, 100);
var light = new THREE.PointLight(new THREE.Color('white'));
scene.add(light);
light.position.x = 100;
light.position.y = 0;
light.position.z = 0;
scene.remove(ambient);
var theta = 0;
var light2 = light.clone();
scene.add(light2);
var light3 = light.clone();
scene.add(light3);
var light4 = light.clone();
scene.add(light4);
var light5 = light.clone();
scene.add(light5);
var light6 = light.clone();
scene.add(light6);
setInterval(animateLight, 100);
Number.prototype.toRadians = function () {
	var degrees = this;
	var radians = degrees * Math.PI / 180;
	return radians;
}
function animateLight() {
	theta = normalizeTheta(theta);
	theta += 1;
	var a = Math.sin(theta.toRadians()) * radius;
	var b = Math.cos(theta.toRadians()) * radius;

	light.position.x = a;
	light.position.y = b;
	light.position.z = 0;

	light2.position.x = b;
	light2.position.y = a;
	light2.position.z = 0;

	light3.position.x = a;
	light3.position.y = 0;
	light3.position.z = b;

	light4.position.x = b;
	light4.position.y = 0;
	light4.position.z = a;

	light5.position.x = 0;
	light5.position.y = a;
	light5.position.z = b;

	light6.position.x = 0;
	light6.position.y = b;
	light6.position.z = a;

}
function normalizeTheta(theta) {
	if (theta < 0) {
		theta += 360;
		return normalizeTheta(theta);
	} else if (theta > 360) {
		theta -= 360;
		return normalizeTheta(theta);
	} else {
		return theta;
	}
}
var app = angular.module('app', []);
app.controller('app', ['$scope', '$window', function ($scope, $window) {
	$scope.title = 'My Title';
	$scope.socket = io(window.location.origin);
	$scope.socket.on('refresh', function (data) {
		$window.location.reload();
	});
	$scope.arrayFromObject = arrayFromObject;
	$scope.orderByCard = 'class';
	$scope.cards = [{
		name: 'Ball of Fire',
		class: 'fire',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: '50 damage to target creature'
	}, {
		name: 'Burn',
		class: 'effect',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Take 5 damage per second'
	}, {
		class: 'spirit',
		cost: 1,
		name: 'Mind Control',
		count: 1,
		image: 'assets/plus.png',
		description: 'Take control of target creature for 1 turn'
	}, {
		class: 'water',
		cost: 1,
		name: 'Mist',
		count: 1,
		image: 'assets/plus.png',
		description: 'Reduce Burn damage by X%'
	}, {
		class: 'water',
		cost: 1,
		name: 'Chill',
		count: 1,
		image: 'assets/plus.png',
		description: ''
	}, {
		class: 'water',
		cost: 1,
		name: 'Frost',
		count: 1,
		image: 'assets/plus.png',
		description: 'Freeze target creature for 5 seconds'
	}, {
		class: 'fire',
		cost: 1,
		name: 'Erruption',
		count: 1,
		image: 'assets/plus.png',
		description: 'Burns all creatures within a 10 meter radius'
	}, {
		class: 'effect',
		cost: 1,
		name: 'Freeze',
		count: 1,
		image: 'assets/plus.png',
		description: 'Cannot move or trigger abilities'
	}, {
		class: 'water',
		cost: 1,
		name: 'Glacial',
		count: 1,
		image: 'assets/plus.png',
		description: 'All creatures within a 10 meter radius become frozen'
	}, {
		name: 'Thaw',
		class: 'effect',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Target creature is no longer frozen'
	}, {
		name: 'Fist',
		class: 'force',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: '10 damage to target creature'
	}, {
		name: 'Shatter',
		class: 'effect',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Double damage',
		chain: ['Freeze', 'Fist']
	}, {
		name: 'Cloak',
		class: 'shadow',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Stealth for 10 seconds'
	}, {
		name: 'Flash',
		class: 'energy',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Reveal all creatures in a 20 meter radius'
	}, {
		name: 'Reveal',
		class: 'effect',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Target creature loses stealth',
		chain: ['']
	}, {
		name: 'Heal',
		class: 'life',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'Heal target creature'
	}, {
		name: 'Coin',
		class: 'treasure',
		cost: 1,
		count: 1,
		image: 'assets/coin.png',
		description: 'Worth $1'
	}, {
		name: 'Blank',
		class: 'blank',
		cost: 1,
		count: 1,
		image: 'assets/plus.png',
		description: 'This is a blank card description'
	}];
}]);
function arrayFromObject(object) {
	Object.keys(object).map(function (key) {
		return object[key];
	});
};
// function objectToArrayOfObjects(object) {
// 	var arrayOfObjects = []
// 	var keys = Object.keys(object);
// 	for (var i = 0; i < keys.length; ++i) {
// 		var key = keys[i];
// 		var value = object[key];
// 	}
// 	return arrayOfObjects;
// }