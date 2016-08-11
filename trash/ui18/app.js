'use strict';
var scene = new THREE.Scene();
var clock = new THREE.Clock();
clock.autoStart = true;
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
camera.position.set(0, 0, 20);
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
var geometry = new THREE.BoxGeometry(2, 3, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
var card = new THREE.Mesh(geometry, material);
scene.add(card);
var raycaster = new THREE.Raycaster();
var mouse = {
	down: false,
	up: true,
	drag: null,
	x: 0,
	y: 0,
	ref: new THREE.Vector2(),
	cursor: card.clone()
};
scene.add(mouse.cursor);
window.addEventListener('mousedown', mouseDown);
function mouseDown(event) {
	event.preventDefault();
	mouse.down = true;
	mouse.up = false;
	var object = getIntersect(event);
	if (object) {
		// console.log('Mouse Down - Intersects Object', object);
		mouse.drag = object;
	}
}
window.addEventListener('mouseup', mouseUp);
function mouseUp(event) {
	event.preventDefault();
	mouse.down = false;
	mouse.up = true;
	mouse.drag = false;
	var object = getIntersect(event);
	if (object) {
		// console.log('Mouse Up - Intersects Object', object);
		mouse.drag = null;
	}
}
window.addEventListener('mousemove', mouseMove);
function mouseMove(event) {
	event.preventDefault();
	var object = getIntersect(event);
	if (object && mouse.drag) {
		// console.log('Mouse Move - Intersects Object', object);
		var vector = new THREE.Vector3();
		vector.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0);
		vector.unproject(camera);
		var dir = vector.sub(camera.position).normalize();
		var targetZ = 2;
		var distance = (targetZ - camera.position.z) / dir.z
		var pos = camera.position.clone().add(dir.multiplyScalar(distance));
		console.log(object);
		object.object.position.set(pos.x, pos.y, pos.z);
	}
}
function getIntersect(event) {
	mouse.x = event.pageX || event.clientX;
	mouse.y = event.pageY || event.clientY;
	mouse.ref.x = (mouse.x / window.innerWidth) * 2 - 1;
	mouse.ref.y = - (mouse.y / window.innerHeight) * 2 + 1;
	raycaster.setFromCamera(mouse.ref, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
		var object = intersects[0];
		return object;
	}
}
var app = angular.module('app', []);
app.controller('app', ['$scope', '$window', function ($scope, $window) {
	$scope.title = 'My Title';
	$scope.socket = io(window.location.origin);
	$scope.socket.on('refresh', function (data) {
		$window.location.reload();
	});
}]);
// var referencePoint = new THREE.Vector2();
// var lastClickedObject;
// window.addEventListener('click', mouseClick);
// function mouseClick(event) {
// 	event.preventDefault();
// 	return;
// 	var x = event.pageX || event.clientX;
// 	var y = event.pageY || event.clientY;
// 	referencePoint.x = (x / window.innerWidth) * 2 - 1;
// 	referencePoint.y = - (y / window.innerHeight) * 2 + 1;
// 	raycaster.setFromCamera(referencePoint, camera);
// 	var intersects = raycaster.intersectObjects(scene.children);
// 	if (intersects.length > 0) {
// 		var object = intersects[0].object;
// 		clickedObject(object);
// 	} else {
// 		var _material = new THREE.MeshBasicMaterial({color: 'yellow'});
// 		lastClickedObject.material = _material;
// 	}
// }
// function clickedObject(object) {
// 	console.log('clickedObject', object);
// 	lastClickedObject = object;
// 	var _material = new THREE.MeshBasicMaterial({color: 'red'});
// 	object.material = _material;
// }
// window.addEventListener('mousemove', mouseMove);
// function mouseMove(event) {
// 	event.preventDefault();
// 	return;
// 	var x = event.pageX || event.clientX;
// 	var y = event.pageY || event.clientY;
// 	referencePoint.x = (x / window.innerWidth) * 2 - 1;
// 	referencePoint.y = - (y / window.innerHeight) * 2 + 1;
// 	raycaster.setFromCamera(referencePoint, camera);
// 	var intersects = raycaster.intersectObjects(scene.children);
// 	for (var i = 0; i < intersects.length; ++i) {
// 		var object = intersects[i].object;
// 		intersectObject(object, intersects, i);
// 	};
// 	if (intersects.length === 0) {
// 		noIntersects();
// 	}
// }
// var intersectedObject = null;
// function noIntersects() {
// 	intersectedObject.color = new THREE.MeshBasicMaterial(new THREE.Color('blue'));
// }
// function getIntersects() {
// 	raycaster.setFromCamera(pointer, camera);
// 	return raycaster.intersectObjects(scene.children);
// }
// function intersectObject(object, intersects, index) {
// 	intersectedObject = object.clone();
// 	object.material = new THREE.MeshBasicMaterial(new THREE.Color('red'));
// }