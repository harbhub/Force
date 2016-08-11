var app, server, express, io, socketio, path, fs, Game;

Game = require('./game.js');

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

var rooms = {};

io.on('connection', function (socket) {
	console.log('Socket ' + socket.id + ' connected');
	fs.watch(path.join(__dirname, '../ui'), {}, function (event, name) {
		console.log('Watch UI directory', event, name);
		socket.emit('refresh', {});
	});
	socket.on('action', function (data) {
		var update = {
			request: data,
			type: data.type
		};
		switch (data.type) {
			case 'join':
				console.log('Join', data);
				socket.join(data.room);
				update.success = true;
				if (rooms[data.room]) {
					rooms[data.room].players.push({
						socket: socket.id,
						name: data.name
					});
				} else {
					rooms[data.room] = {
						players: [{
							socket: socket.id,
							name: data.name
						}]
					};
				}
				update.players = rooms[data.room].players;
				break;
			case 'leave':
				console.log('Leave', data);
				socket.leave(data.room);
				update.success = true;
				break;
			case 'start':
				console.log('Start', data);
				var game = new Game(data.start);
				update.success = true;
				break;
			case 'play':
				console.log('Play', data);
				update.success = true;
				break;
			case 'treasures':
				console.log('Play Treasures');
				update.success = true;
				break;
			case 'buy':
				console.log('Buy', data);
				update.success = true;
				break;
			default:
				console.log('Unknown action', data);
				update.success = false;
				break;
		}
		if (data.room && data.type !== 'leave') {
			io.to(data.room).emit('update', update);
		} else {
			socket.emit('update', update);
		}
	});
});

module.exports = server;