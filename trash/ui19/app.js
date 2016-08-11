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
var sphere = new THREE.Mesh(new THREE.SphereGeometry(box.geometry.boundingSphere.radius, 16, 16), new THREE.MeshPhongMaterial({
	color: new THREE.Color('green'),
	wireframe: true
}));
// TODO: Set Sphere Position
scene.add(sphere);
setInterval(function () {
	box.rotation.x += 0.05;
	box.rotation.y += 0.05;
}, 100);
// sphere.position = position;
// var geometry = new THREE.SphereGeometry(50, 32, 32);
// var material = new THREE.MeshPhongMaterial({
// 	color: 0x00ff00,
// 	wireframe: true
// });
// var sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);
// var ambient = new THREE.AmbientLight();
// scene.add(ambient);
// var box = new THREE.BoundingBoxHelper(sphere);
// box.update();
// scene.add(box);
// sphere.geometry.computeBoundingSphere();

// var geometry = new THREE.BoxGeometry(2, 3, 1);
// var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// var card = new THREE.Mesh(geometry, material);
// scene.add(card);
var app = angular.module('app', []);
app.controller('app', ['$scope', '$window', function ($scope, $window) {
	$scope.title = 'My Title';
	$scope.socket = io(window.location.origin);
	$scope.socket.on('refresh', function (data) {
		$window.location.reload();
	});
}]);