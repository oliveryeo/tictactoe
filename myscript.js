// Factory Func for Players
const Player = () => {
  // add specific mark on the board → tag that space to the player → dont allow next player to click
};

// Module for Game Board
const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const playGrid = (row, column, playerID) => {
    const selectedGrid = board[row][column];

    // Create error handling where grid is already filled, hence player cannot select

    selectedGrid.addMark(playerID);
  }

  // Cell object for each grid in tic tac toe
  function Cell() {
    let value = 0;

    const addMark = (playerID) => {
      value = playerID;
    };

    const getValue = () => value;

    return {
      addMark,
      getValue
    };
  }

  return { playGrid, getBoard };
})();

// Module for Game Controller
const gameController = ((
  playerOneName = "Player One",
  playerTwoName = "Player Two"
) => {
  const players = [
    {
      name: playerOneName,
      token: 1
    },
    {
      name: playerTwoName,
      token: 2
    }
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  const printPlayerTurn = () => {
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const playRound = (row, column) => {
    console.log(
      `${getActivePlayer().name} has selected grid ${row}, ${column}...`
    );
    gameBoard.playGrid(row, column, getActivePlayer().token);
    
    /*  This is where we would check for a winner and handle that logic,
    such as a win message. */

    switchPlayerTurn();
    printPlayerTurn();
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: gameBoard.getBoard
  };

})();

// Module for screenController
const screenController = () => ({
  const playerTurnDiv = document.querySelector(".turn");
  const boardDiv = document.querySelector(".board");

  const updateScreen = () => {
    // clear the board
    boardDiv.textContent = "";

    // get the newest version of the board and player turn
    const board = gameController.getBoard();
    const activePlayer = gameController.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        // TODO -- tracked 16/09/2023
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function 
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    })
  }
  
  // Add event listener for the board
  function clickHandlerBoard(e) {
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn) return;
    
    game.playRound(selectedColumn);
    updateScreen();
  }
  boardDiv.addEventListener("click", clickHandlerBoard);

    // Initial render
    updateScreen();

    // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
})();

console.log(gameBoard.getBoard());