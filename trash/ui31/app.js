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
		render();
		// stopRenderer();
	}
};
var fontLoader = new THREE.FontLoader();
fontLoader.load('helvetiker-regular.typeface.json', function (font) {
	loader.load('font', font);
});
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
renderer.domElement.id = 'canvas-game';
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
	document.getElementById('game').appendChild(renderer.domElement);
	loader.load('dom', document);
});
loader.load('last', '');
var nameMesh;
function updateName(name) {
	console.log('Update Name', name);
	if (nameMesh) {
		scene.remove(nameMesh);
	}
	var textGeometry = new THREE.TextGeometry(name, {
		font: loader.loaded.font,
		weight: 'regular',
		size: 80,
		height: 6,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 2,
		bevelSize: 2
	});
	textGeometry.center();
	var textMaterial = new THREE.MeshPhongMaterial({
		color: 'blue'
	});
	textMesh = new THREE.Mesh(textGeometry, textMaterial);
	textMesh.position.set(0, 10, -200);
	textMesh.rotation.x = -Math.PI / 2;
	textMesh.castShadow = true;
	nameMesh = textMesh;
	scene.add(nameMesh);
};
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
	$scope.socket.on('update', function (data) {
		console.log('Update', data);
		if (!data.success) {
			console.log('Unsuccessful');
			return;
		}
		switch (data.type) {
			case 'join':
				console.log('Join', data);
				$scope.me.players = data.players;
				if ($scope.me.name === data.request.name) {
					$scope.me.inLobby = false;
					$scope.me.inRoom = true;
				}
				break;
			case 'leave':
				console.log('Leave', data);
				$scope.me.players.remove(data.request.name);
				$scope.me.room = '';
				if ($scope.me.name === data.request.name) {
					$scope.me.inLobby = true;
					$scope.me.inRoom = false;
				}
				break;
			default:
				console.log('Unknown Update', data);
				break;
		}
	});
	$scope.me = {
		name: '',
		room: '',
		focus: 'game',
		inLobby: true,
		inRoom: false,
		players: [],
		hand: [],
		play: [],
		recycle: 0,
		deck: 0,
		active: []
	};
	$scope.join = function () {
		$scope.socket.emit('action', {
			type: 'join',
			room: $scope.me.room,
			name: $scope.me.name
		});
	};
	$scope.leave = function () {
		console.log('Clicked');
		$scope.socket.emit('action', {
			type: 'leave',
			room: $scope.me.room,
			name: $scope.me.name
		});
	};
	$scope.input = function (model) {
		var inputElement = angular.element(document.querySelector('#input-' + model))[0];
		inputElement.focus();
		$scope.me.focus = model;
	};
	$scope.$watch('me.name', function (current, previous, scope) {
		console.log('Watcher', arguments);
		if (!current) {
			return;
		}
		updateName(current, $scope);
	});
	$scope.input('name');
	// $scope.game = {
	// 	hasStarted: false,
	// 	hasEnded: false,
	// 	room: '',
	// 	players: ['P1', 'P2', 'P3', 'P4'],
	// 	me: {
	// 		name: 'P1',
	// 		deck: 10,
	// 		recycle: 0,
	// 		hand: [],
	// 		play: [],
	// 		active: []
	// 	},
	// 	log: []
	// };
	// $scope.socket.emit('action', {
	// 	action: 'start',
	// 	start: {
	// 		players: ['P1', 'P2', 'P3', 'P4'],
	// 		room: 'R1'
	// 	}
	// });
	// $scope.socket.emit('action', {
	// 	action: 'play',
	// 	play: 'Bronze'
	// });
	// $scope.socket.emit('action', {
	// 	action: 'treasures'
	// });
	// $scope.socket.emit('action', {
	// 	action: 'buy',
	// 	buy: 'Swordsman'
	// });
}]);