var pubnub = require("pubnub")({
    ssl           : true,  // <- enable TLS Tunneling over TCP
    publish_key   : "pub-c-0e75fdb6-796c-4365-86e3-93e9fa4d4797",
    subscribe_key : "sub-c-1e21f940-73d7-11e4-ac4b-02ee2ddab7fe"
});



// tictactoe game class
function Game () {
  this.player1Mark = 'X',
  this.player2Mark = 'O',
  this.whoseTurn = 'X',
  this.gameState = [2,2,2,2,2,2,2,2,2];
}

Game.prototype.getGameState = function () {
  var str = '';
  for (var i = 0; i < this.gameState.length; i++) {
    str += this.gameState[i];
  }
  return str;
};

Game.prototype.setGameState = function (str) { 
  if (str.length != this.gameState.length) { return;}
  for (var i = 0; i < this.gameState.length; i++) {
    this.gameState[i] = parseInt(str.charAt(i), 10);
  }
};


var getIndexFromField = function(s) {
  switch(s) {
    case 'one':
        return 0;
    case 'two':
        return 1;
    case 'three':
        return 2;
    case 'four':
        return 3;
    case 'five':
        return 4;
    case 'six':
        return 5;
    case 'seven':
        return 6;
    case 'eight':
        return 7;
    default:
        return 8;
  }
};

module.exports = function (server) {
  var game;
  var players = [];

  pubnub.subscribe({
    channel  : "connection",
    callback : function(message) {
    console.log(message, ' connected');

    var player;

    if (players.length === 0) {
      game = new Game();
      player = game.player1Mark;
    }
    else if (players.length == 1) {
      player = game.player2Mark;
    }

    players.push(player);

    console.log(players);
    //socket.emit('playerMark', player);

    pubnub.subscribe({
    channel  : "turn",
    callback : function(data) {
      console.log(data);

      if (game.whoseTurn === data.pMark) {
        game.gameState[getIndexFromField(data.fieldName)] = data.pMark === game.player1Mark ? 1:0;
        game.whoseTurn = game.whoseTurn === game.player1Mark ? game.player2Mark : game.player1Mark;

        //sockets.emit('status', game.getGameState());
        console.log(game.getGameState());
      }

    }});

    pubnub.subscribe({
    channel  : "loadGame",
    callback : function(data) {
      game.setGameState(data);
      //sockets.emit('status', game.getGameState());
    }});


    pubnub.subscribe({
    channel  : "disconnect",
    callback : function() { 
      console.log(player + ' disconnected');
    }});
  }});
};