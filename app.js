var net = require('net');

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