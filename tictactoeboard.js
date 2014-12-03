/**************************************************
** TICTACTOE BOARD CLASS
**************************************************/
var Board = function Game (player1Id, player2Id, boardId) {
  var p1Id = player1Id,
  p2Id = player2Id,
  whoseTurn = player1Id,
  gameState = [2,2,2,2,2,2,2,2,2],
  id = boardId;

  // Getters and setters
  var getGameState = function() {
    var str = '';
    for (var i = 0; i < gameState.length; i++) {
      str += gameState[i];
    }
    return str;
  };

  var getWhoseTurn = function() {
    return whoseTurn;
  };

  var setGameState = function(str) {
    if (str.length != gameState.length) { return;}
    for (var i = 0; i < gameState.length; i++) {
      gameState[i] = parseInt(str.charAt(i), 10);
    }
  };

	var setTurn = function(playerId, index) {
		if(playerId === whoseTurn)
		{
			gameState[getIndexFromField(index)] = whoseTurn === p1Id ? 0 : 1;
			whoseTurn = playerId === p1Id ? p2Id : p1Id;
		}
	};

	// Define which variables and methods can be accessed
	return {
		getGameState: getGameState,
		getWhoseTurn: getWhoseTurn,
		setGameState: setGameState,
		setTurn: setTurn,
		id: id
	};
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

//require("Board").Board
exports.Board = Board;