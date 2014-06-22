var io = require('socket.io');

var player1Mark = 'X';
var player2Mark = 'O';

var whoseTurn = player1Mark;

var players = [];

module.exports = function (server) {
	var sockets = io.listen(server).sockets;
	console.log('sockets initiated');	

	sockets.on('connection', function (socket) {
		console.log('someone connected');

		var player;

		if (players.length === 0) {
			player = player1Mark;
		}
		else if (players.length == 1) {
			player = player2Mark;
		}

		players.push(player);

		console.log(players);
		socket.emit('playerMark', player);

		socket.on('turn', function(data) {
			console.log(data);

			if (whoseTurn === data.pMark) {
				sockets.emit('status', data);
				whoseTurn = whoseTurn === player1Mark ? player2Mark : player1Mark;
			}
			
		});
		

		socket.on('disconnect', function () { 
			console.log(player + ' disconnected');
		});
	});
};