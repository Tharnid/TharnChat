// app dependencies
var net = require('net');
var path = require('path');
var express = require('express');
var io = require('socket.io');

var chatty = require('chatty-server');
// Express App right here

var app = express();
var http = require('http').createServer(app);

// end Express app variable things

// requiring socket.io
var io = require('socket.io').listen(http);  // listening to http
// End Socket.io stuff

// args
var args = process.argv.slice(2);

console.log(args);

var server = chatty.createServer({
	httpServer: http,
	tcpHost: args[0],
	tcpPort: args[1]
});

server.start();

server.on('client connected', function(socket) {
	console.log('A client connected!!!');
});

// // where the static files are located
app.use(express.static(path.join(__dirname, 'static')));

http.listen(args[2]);


// // listen to connections and data
// io.sockets.on('connection', function(socket) {
	
// 	// emitting event(s)
// 	socket.emit('message', 'hi there client!!!');

// 	// receiving data from socket.io client
// 	socket.on('message', function(data) {
// 		console.log('Data from Socket.io client: ' + data);
// 	});
// });

// // Middleware hi perf plugins
// // where the static files are located
// app.use(express.static(path.join(__dirname, 'static')));

//  
// // End Express App

// var server = net.Server();

// server.listen(3366, 'localhost');

// server.on('connection', function(socket) {
// 	socket.write('Hi client!!!');

// 	socket.on('data', function(data) {
// 		console.log('Data from client: ' + data);
// 	});
// });

// var connection = net.connect(3366, 'localhost', function() {
// 	connection.write('Hi there server!!!');

// 	setInterval(function() {
// 		connection.write('ping');
// 	}, 1000 * 2);

// 	connection.on('data', function(data) {
// 		console.log('Data from the server: ' + data);
// 	});
// });

// client stuff

setTimeout(function() {
	var connection = net.connect(1234, 'localhost', function() {

	})
}, 1000 * 2);