// app dependencies
var net = require('net');
var path = require('path');
var express = require('express');
var io = require('socket.io');


// Express App right here

var app = express();
var http = require('http').createServer(app);

// end Express app variable things

// requiring socket.io
var io = require('socket.io').listen(http);  // listening to http
// End Socket.io stuff

// EventEmitter Stuff
var EventEmitter = require('events').EventEmitter;

var emitter = new EventEmitter();

emitter.on('hi ', function(data) {
	console.log('someone said hi!!! ' + data);
});

setInterval(function() {
	emitter.emit('hi', 'emitter is emitting!!!');
}, 1000);

// end Emitter

// listen to connections and data
io.sockets.on('connection', function(socket) {
	
	// emitting event(s)
	socket.emit('message', 'hi there client!!!');

	// receiving data from socket.io client
	socket.on('message', function(data) {
		console.log('Data from Socket.io client: ' + data);
	});
});

// Middleware hi perf plugins
// where the static files are located
app.use(express.static(path.join(__dirname, 'static')));

http.listen(1234); 
// End Express App

var server = net.Server();

server.listen(3366, 'localhost');

server.on('connection', function(socket) {
	socket.write('Hi client!!!');

	socket.on('data', function(data) {
		console.log('Data from client: ' + data);
	});
});

var connection = net.connect(3366, 'localhost', function() {
	connection.write('Hi there server!!!');

	setInterval(function() {
		connection.write('ping');
	}, 1000 * 2);

	connection.on('data', function(data) {
		console.log('Data from the server: ' + data);
	});
});