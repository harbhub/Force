// Scaffold
'use strict';
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	generatePath = require('path').join,
	basePath = generatePath(__dirname, 'base.html'),
	fs = require('fs');
app.all('*', function (request, response, next) {
	console.log('Incoming Request', request.method.toUpperCase(), request.url);
	next();
});
io.on('connection', function (socket) {
	console.log('Socket ' + socket.id + ' connected');
	fs.watch(generatePath(__dirname), {}, function (event, name) {
		console.log('Watch UI directory', event, name);
		socket.emit('refresh', {});
	});
});
server.listen(8888, function () {
	console.log('Server Port', server.address().port);
});

// Build
app.get('/', function (request, response, next) {
	console.log('Serving Base File');
	response.sendFile(basePath)
});
app.get('/base.*', function (request, response, next) {
	console.log('Serving File', request.url);
	response.sendFile(generatePath(__dirname, request.url));
});
app.get('/bin/public/*', function (request, response, next) {
	console.log('Serving File', request.url);
	response.sendFile(generatePath(__dirname, request.url));
});