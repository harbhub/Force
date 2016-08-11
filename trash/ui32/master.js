var master = {
	socket: null,
	app: null,
	scope: null,
	window: null,
	apply: null,
	user: null,
	scene: null,
	camera: null,
	renderer: null,
	card: null,
	spotlight: null,
	hand: null,
	deck: null,
	field: null,
	recycle: null,
	emporium: null,
	font: null,
	fontLoader: null,
	init: null,
	controls: null,
	tryInit: null,
	clock: null,
	setScreenSize: null
};

master.tryInit = function tryInit() {
	if (master.font && master.scope && master.socket && master.socket.connected && master.finishedLoading) {
		master.init();
	}
};

master.init = function init() {
	console.log('master', master);

	master.cardCostGeometry = new THREE.TextGeometry('$5', {
		font: master.font,
		weight: 'regular',
		size: 5,
		height: 1,
		curveSegments: 12,
		bevelEnabled: false,
		bevelThickness: 2,
		bevelSize: 2
	});
	master.cardCostGeometry.center();
	master.cardCostMaterial = new THREE.MeshPhongMaterial({
		color: 'gold'
	});
	master.cardCost = new THREE.Mesh(master.cardCostGeometry, master.cardCostMaterial);
	master.cardCost.position.set(-30, 50, 5);
	master.card.add(master.cardCost);

	master.cardNameGeometry = new THREE.TextGeometry('Pestilence', {
		font: master.font,
		weight: 'regular',
		size: 5,
		height: 1,
		curveSegments: 12,
		bevelEnabled: false,
		bevelThickness: 2,
		bevelSize: 2
	});
	master.cardNameGeometry.center();
	master.cardNameMaterial = new THREE.MeshPhongMaterial({
		color: 'gold'
	});
	master.cardName = new THREE.Mesh(master.cardNameGeometry, master.cardNameMaterial);
	master.cardName.position.set(0, 50, 5);
	master.card.add(master.cardName);
	// 'give each opponent an Infestation'
	master.cardDescriptionGeometry = new THREE.TextGeometry('Draw 2 Cards', {
		font: master.font,
		weight: 'regular',
		size: 5,
		height: 1,
		curveSegments: 12,
		bevelEnabled: false,
		bevelThickness: 2,
		bevelSize: 2
	});
	master.cardDescriptionGeometry.center();
	master.cardDescriptionMaterial = new THREE.MeshPhongMaterial({
		color: 'gold'
	});
	master.cardDescription = new THREE.Mesh(master.cardDescriptionGeometry, master.cardDescriptionMaterial);
	master.cardDescription.position.set(0, -20, 5);
	master.card.add(master.cardDescription);

	master.cardDescription2 = master.cardDescription.clone();
	master.cardDescription2.geometry = new THREE.TextGeometry('Infest', {
		font: master.font,
		weight: 'regular',
		size: 5,
		height: 1,
		curveSegments: 12,
		bevelEnabled: false,
		bevelThickness: 2,
		bevelSize: 2
	});
	master.cardDescription2.geometry.center();
	master.cardDescription2.position.set(0, -30, 5);
	master.card.add(master.cardDescription2);

	master.render();
};

master.clock = new THREE.Clock(true);

master.render = function () {
	var delta = master.clock.getDelta();
	master.renderer.render(master.scene, master.camera);
	requestAnimationFrame(master.render);
};

master.fontLoader = new THREE.FontLoader();

master.fontLoader.load('helvetiker-regular.typeface.json', function (font) {
	master.font = font;
	master.tryInit();
});

master.scene = new THREE.Scene();

master.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 10000);
master.camera.position.set(0, 0, 200);
master.cameraTarget = new THREE.Vector3(0, 0, 0);
master.camera.lookAt(master.cameraTarget);
master.scene.add(master.camera);

master.background = new THREE.Mesh(new THREE.BoxGeometry(1000, 1000, 2, 32, 32, 32), new THREE.MeshPhongMaterial({
	color: new THREE.Color('green')
}));
master.background.receiveShadow = true;
master.background.position.set(0, 0, -1);
master.scene.add(master.background);

master.spotlight = new THREE.SpotLight(new THREE.Color('white'), 1);
master.spotlight.position.set(100, -100, 100);
master.spotlight.castShadow = true;
master.spotlight.angle = Math.PI / 4;
master.spotlight.penumbra = 0.05;
master.spotlight.decay = 2;
master.spotlight.distance = 1000;
master.spotlight.shadow.mapSize.width = 1024;
master.spotlight.shadow.mapSize.height = 1024;
master.spotlight.shadow.camera.near = 0.01;
master.spotlight.shadow.camera.far = 10000;
master.scene.add(master.spotlight);
master.scene.remove(master.spotlight);

master.sunlight = new THREE.DirectionalLight(new THREE.Color('white'), 0.5);
master.sunlight.position.set(0, 0, 100);
master.sunlight.lookAt(new THREE.Vector3(0, 0, 0));
master.scene.add(master.sunlight);
// master.scene.remove(master.sunlight);

master.card = new THREE.Object3D();
master.card.position.set(0, 0, 20);

master.cardBaseGeometry = new THREE.BoxGeometry(80, 120, 10, 32, 32, 32);
master.cardBaseMaterial = new THREE.MeshPhongMaterial({
	color: new THREE.Color('blue')
});
master.cardBase = new THREE.Mesh(master.cardBaseGeometry, master.cardBaseMaterial);
master.cardBase.castShadow = true;
master.card.add(master.cardBase);

master.scene.add(master.card);

master.renderer = new THREE.WebGLRenderer({
	alpha: true,
	antialias: true
});
master.renderer.shadowMap.enabled = true;
master.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
master.renderer.setPixelRatio(window.devicePixelRatio);
master.renderer.setClearColor(new THREE.Color('white'), 0.5);
master.renderer.setSize(window.innerWidth, window.innerHeight);
master.renderer.domElement.id = 'canvas-interface';
document.getElementById('interface').appendChild(master.renderer.domElement);

master.controls = new THREE.OrbitControls(master.camera, master.renderer.domElement);
master.controls.enableDamping = true;
master.controls.dampingFactor = 0.25;
master.controls.enableZoom = true;

master.setScreenSize = function (event) {
	if (event) {
		event.preventDefault();
	}
	master.camera.aspect = window.innerWidth / window.innerHeight;
	master.camera.updateProjectionMatrix();
	master.renderer.setSize(window.innerWidth, window.innerHeight);
	master.renderer.render(master.scene, master.camera);
};
window.addEventListener('resize', master.setScreenSize);
window.addEventListener('orientationchange', master.setScreenSize);

master.socket = io(window.location.origin, {secure: false});

master.app = angular.module('app', []);

master.app.controller('app', ['$scope', '$window', function ($scope, $window) {
	master.scope = $scope;
	master.window = $window;
	master.apply = $scope.$apply;
}]);

master.socket.on('connect', function () {
	master.tryInit();
});

master.socket.on('refresh', function () {
	master.window.location.reload();
});

master.socket.on('user', function (data) {
	master.user = data.user ? data.user : {};
});

master.finishedLoading = true;
master.tryInit();