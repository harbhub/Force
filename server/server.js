var app, server, express, io, socketio, path;

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

app.get('*', function (req, res, next) {
	console.log(req.method, req.url);
	res.sendFile(path.join(__dirname, '../ui', req.url));
});

module.exports = server;