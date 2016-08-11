// Array.remove

Array.prototype.remove = function (str) {

	if (this.indexOf(str) !== -1) {

		this.splice(this.indexOf(str), 1);

	};

	return this;

};

// Loader by Michael Harbach

var loader = {

	list: ['$window', 'font', 'socket', '$scope', '$rootScope', 'dom'],

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

// Font Loader

var fontLoader = new THREE.FontLoader();

fontLoader.load('helvetiker-regular.typeface.json', function (font) {

	loader.load('font', font);

});

// App by Michael Harbach

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

// Universe by Michael Harbach

var u = universe = {};

u.pixelWidth = window.innerWidth;
u.pixelHeight = window.innerHeight;
u.devicePixelRatio = window.devicePixelRatio;

u.origin = new THREE.Vector3(0, 0, 0);

u.colors = {};
u.colors.black = new THREE.Color('black');
u.colors.green = new THREE.Color('green');

u.sun = new THREE.Object3D();
u.sunlightColor = new THREE.Color('white');
u.sunlightIntensity = 0.5;
u.sunlight = new THREE.DirectionalLight(u.sunlightColor, u.sunlightIntensity);

u.earth = new THREE.Object3D();
u.earthRadius = 6378 * 10E3;
u.earthRadiusUnits = 'meters';
u.earthGeometry = new THREE.SphereGeometry(u.earthRadius, 32, 32);
u.earthGravity = 9.82;
u.earthGravityUnits = 'meters / seconds^2';
u.earthMaterial = new THREE.MeshPhongMaterial({
	color: u.colors.green,
	emissive: u.colors.green,
});
u.earthMesh = new THREE.Mesh(u.earthGeometry, u.earthMaterial);
u.earth.add(u.earthMesh);
var sphere = new THREE.Mesh(new THREE.SphereGeometry(14, 16, 16), new THREE.MeshPhongMaterial({
	color: new THREE.Color('green'),
	emissive: new THREE.Color('green'),
	wireframe: true
}));

u.cameraVFOV = 45;
u.cameraAspect = u.pixelWidth / u.pixelHeight;
u.cameraNear = 0;
u.cameraFar = 1000;
u.camera = new THREE.PerspectiveCamera(u.cameraVFOV, u.cameraAspect, u.cameraNear, u.cameraFar);
u.cameraX = 0;
u.cameraY = 0;
u.cameraZ = 100;
u.camera.position.set(u.cameraX, u.cameraY, u.cameraZ);
u.camera.lookAt(u.origin);
u.camera.updateProjectionMatrix();

u.scene = new THREE.Scene();
u.scene.add(u.sun);
u.scene.add(u.earth);
u.scene.add(u.camera);
u.scene.add(sphere);

u.clock = new THREE.Clock();
u.clock.autoStart = true;

u.rendererAlpha = true;
u.rendererAntialias = true;
u.renderer = new THREE.WebGLRenderer({
	alpha: u.rendererAlpha,
	antialias: u.rendererAntialias
});
u.renderer.setPixelRatio(u.devicePixelRatio);
u.rendererClearColorAlpha = 1;
u.renderer.setClearColor(u.colors.black, u.rendererClearColorAlpha);
u.renderer.setSize(u.pixelWidth, u.pixelHeight);

document.body.appendChild(u.renderer.domElement);

function render() {
	var delta = u.clock.getDelta();
	u.rendererId = requestAnimationFrame(render);
	u.renderer.render(u.scene, u.camera);
}

function stopRenderer() {
	cancelAnimationFrame(u.rendererId);
};

window.addEventListener('resize', resize);
window.addEventListener('orientationchange', resize);
function resize(event) {
	event.preventDefault();
	u.pixelWidth = window.innerWidth;
	u.pixelHeight = window.innerHeight;
	u.cameraAspect = u.pixelWidth / u.pixelHeight;
	u.camera.aspect =  u.cameraAspect;
	u.camera.updateProjectionMatrix();
	u.renderer.setSize(u.pixelWidth, u.pixelHeight);
	u.renderer.render(u.scene, u.camera);
}

window.addEventListener('DOMContentLoaded', function (event) {
	loader.load('dom', document);
});

loader.load('universe');