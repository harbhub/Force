Array.prototype.remove = function (str) {
	if (this.indexOf(str) !== -1) {
		this.splice(this.indexOf(str), 1);
	};
	return this;
};
var loader = {
	list: ['$window', 'font', 'socket', '$scope', '$rootScope', 'dom', 'last'],
	loaded: {},
	load: function(key, value) {
		var loader = this;
		loader.list.remove(key);
		loader.loaded[key] = value;
		console.log('Loaded', key, value);
		if (loader.list.length === 0) {
			loader.done();
		}
	},
	done: function() {
		console.log('Complete List', loader.loaded);
		requestAnimationFrame(render);
	}
};
var fontLoader = new THREE.FontLoader();
fontLoader.load('helvetiker-regular.typeface.json', function (font) {
	loader.load('font', font);
});
var app = angular.module('app', []);
app.controller('app', ['$rootScope', '$scope', '$window', function ($rootScope, $scope, $window) {
	loader.load('$rootScope', $rootScope);
	loader.load('$scope', $scope);
	$window.onload = function () {
		loader.load('$window', $window);
	};
	$scope.socket = io(window.location.origin, {
		secure: false
	});
	$scope.socket.on('connect', function () {
		loader.load('socket', $scope.socket);
	});
	$scope.socket.on('refresh', function () {
		$window.location.reload();
	});
}]);
// Scene
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
var scene = new THREE.Scene();
scene.add(camera);

var cameraTarget = new THREE.Vector3(0, 0, 0);
camera.position.set(500, 500, 500);
camera.lookAt(cameraTarget);
camera.updateProjectionMatrix();

var axisHelper = new THREE.AxisHelper(600);
scene.add(axisHelper);

var gridHelper = new THREE.GridHelper(1000, 100);
scene.add(gridHelper);

var originGeometry = new THREE.SphereGeometry(20, 32, 32);
var originMaterial = new THREE.MeshPhongMaterial({
	color: new THREE.Color('black'),
	emissive: new THREE.Color('black')
});
var origin = new THREE.Mesh(originGeometry, originMaterial);
scene.add(origin);

var ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);
scene.remove(ambientLight);

var spotLight = new THREE.SpotLight(new THREE.Color('white'), 1);
spotLight.position.set(0, 300, 0);
spotLight.castShadow = true;
spotLight.angle = Math.PI / 4;
spotLight.penumbra = 0.05;
spotLight.decay = 2;
spotLight.distance = 20000;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 2000;
scene.add(spotLight);

var spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

var fieldGeometry = new THREE.BoxGeometry(1000, 10, 1000, 32, 32, 32);
var fieldMaterial = new THREE.MeshPhongMaterial({
	color: new THREE.Color('green')
});
var fieldMesh = new THREE.Mesh(fieldGeometry, fieldMaterial);
fieldMesh.position.set(0, -10, 0);
fieldMesh.receiveShadow = true;
scene.add(fieldMesh);

var arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 50, 0), 200, new THREE.Color('red'));
scene.add(arrow);
scene.remove(arrow);

var box = new THREE.Mesh(new THREE.BoxGeometry(60, 20, 60, 32, 32, 32), new THREE.MeshPhongMaterial({
	color: new THREE.Color('blue')
}));
box.position.set(40, 20, 10);
box.castShadow = true;
scene.add(box);

// End Scene
var renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(new THREE.Color('white'), 0.5);
renderer.setSize(window.innerWidth, window.innerHeight);
var clock = new THREE.Clock(true);
var _render;
function render() {
	var delta = clock.getDelta();
	_render = requestAnimationFrame(render);
	renderer.render(scene, camera);
	spotLightHelper.update();
}
function stopRenderer() {
	cancelAnimationFrame(_render);
};
setScreenSize();
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
window.addEventListener('resize', setScreenSize);
window.addEventListener('orientationchange', setScreenSize);
function setScreenSize(event) {
	if (event) {
		event.preventDefault();
	}
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}
window.addEventListener('DOMContentLoaded', function (event) {
	document.body.appendChild(renderer.domElement);
	loader.load('dom', document);
});
loader.load('last');