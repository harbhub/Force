var app, server, express, io, socketio, path, fs;

fs = require('fs');

path = require('path');

socketio = require('socket.io');

express = require('express');

app = express();

server = require('http').createServer(app);

io = socketio.listen(server);

server.listen(8888, function () {
	console.log('Listening on Port', server.address().port);
});

app.get('/', function (req, res, next) {
	console.log(req.method, req.url);
	res.sendFile(path.join(__dirname, '../ui/app.html'));
});

app.get('/favicon.ico', function (req, res, next) {
	res.sendFile(path.join(__dirname, '../ui/favicon.ico'));
});

app.get('*', function (req, res, next) {
	console.log(req.method, req.url);
	res.sendFile(path.join(__dirname, '../ui', req.url));
});

io.on('connection', function (socket) {
	console.log('Socket ' + socket.id + ' connected');
	fs.watch(path.join(__dirname, '../ui'), {}, function (event, name) {
		console.log('Watch UI directory', event, name);
		socket.emit('refresh', {});
	});
});

module.exports = server;