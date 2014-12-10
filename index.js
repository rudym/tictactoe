var io = require("socket.io");
io.listen(3000);

/**************************************************
** INITI & RUN THE GAME
**************************************************/
var game = require('./tictactoe/game.js');	// TicacToe game
game(io);
