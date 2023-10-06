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

    /*  Error handling where grid is already filled, hence player cannot select.
        Value of 1 will indicate that the grid is already occupied */
    if (selectedGrid.getValue() != 0) return 1;
    selectedGrid.addMark(playerID);
  };

  /* Cell object for each grid in tic tac toe */
  function Cell() {
    let value = 0;

    const addMark = (playerID) => {
      value = playerID;
    };

    const getValue = () => value;

    return {
      addMark,
      getValue,
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
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const playRound = (row, column) => {
    console.log(
      `${getActivePlayer().name} has selected grid ${row}, ${column}...`
    );

    /*  If grid is already occupied, value of 1 will be returned. 
          Otherwise, undefined is returned and the code will continue */
    if (gameBoard.playGrid(row, column, getActivePlayer().token) === 1) {
      console.log(
        `${
          getActivePlayer().name
        } has selected an already occupied grid. Please choose another grid.`
      );
    } else {
      // Check for winner and return a value if there is a winner so to skip the switchPlayerTurn and printPlayerTurn
      board = gameBoard.getBoard();

      // Horizontal row 1
      if (board[0][0] === 1 && board[0][1] === 1 && board[0][2] === 1) {
        return 1;
      } else if (board[0][0] === 2 && board[0][1] === 2 && board[0][2] === 2) {
        return 2;
      }

      // Horizontal row 2
      if (board[1][0] === 1 && board[1][1] === 1 && board[1][2] === 1) {
        return 1;
      } else if (board[1][0] === 2 && board[1][1] === 2 && board[1][2] === 2) {
        return 2;
      }

      // Horizontal row 3
      if (board[2][0] === 1 && board[2][1] === 1 && board[2][2] === 1) {
        return 1;
      } else if (board[2][0] === 2 && board[2][1] === 2 && board[2][2] === 2) {
        return 2;
      }

      // Vertical row 1
      if (board[0][0] === 1 && board[1][0] === 1 && board[2][0] === 1) {
        return 1;
      } else if (board[0][0] === 2 && board[1][0] === 2 && board[2][0] === 2) {
        return 2;
      }

      // Vertical row 2
      if (board[0][1] === 1 && board[1][1] === 1 && board[2][1] === 1) {
        return 1;
      } else if (board[0][1] === 2 && board[1][1] === 2 && board[2][1] === 2) {
        return 2;
      }

      // Vertical row 3
      if (board[0][2] === 1 && board[1][2] === 1 && board[2][2] === 1) {
        return 1;
      } else if (board[0][2] === 2 && board[1][2] === 2 && board[2][2] === 2) {
        return 2;
      }

      // Cross 1
      if (board[0][0] === 1 && board[1][1] === 1 && board[2][2] === 1) {
        return 1;
      } else if (board[0][0] === 2 && board[1][1] === 2 && board[2][2] === 2) {
        return 2;
      }

      // Cross 2
      if (board[0][2] === 1 && board[1][1] === 1 && board[2][0] === 1) {
        return 1;
      } else if (board[0][2] === 2 && board[1][1] === 2 && board[2][0] === 2) {
        return 2;
      }

      switchPlayerTurn();
      printPlayerTurn();
    }
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  // For console checking purpose
  const printPlayerTurn = () => {
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  return {
    playRound,
    getActivePlayer,
    getBoard: gameBoard.getBoard,
  };
})();

// Module for screenController
const screenController = ((condition = 0) => {
  const playerTurnDiv = document.querySelector(".turn");
  const playGrids = document.querySelector(".play-grids");

  const updateScreen = () => {
    // clear the board
    playGrids.textContent = "";

    // get the newest version of the board and player turn
    const board = gameController.getBoard();
    const activePlayer = gameController.getActivePlayer();

    // Display player's turn
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

    // Render board squares
    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        // Create a data attribute to identify the column
        // This makes it easier to pass into our `playRound` function
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        if (cell.getValue() === 1) {
          cellButton.textContent = "O";
        } else if (cell.getValue() === 2) {
          cellButton.textContent = "X";
        }
        playGrids.appendChild(cellButton);
      });
    });

    // TODO: Handle what appears on the screen when a winner is decided
    if (condition === 1) {
      // Winner is player 1
    } else if (condition === 2) {
      // Winner is player 2
    }
  };

  // Add event listener for the board
  function clickHandlerBoard(e) {
    console.log(e);

    // Use the event object to retrieved the clicked element's attributes
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    // Make sure I've clicked a column and not the gaps in between
    if (!selectedColumn || !selectedRow) return;

    // Runs playRound, checks if value 1 is returned (winner), run updateScreen() with winner condition?
    const roundValue = gameController.playRound(selectedRow, selectedColumn);
    if (roundValue === 1) {
      updateScreen(1);
    } else if (roundValue === 2) {
      updateScreen(2);
    } else {
      updateScreen();
    }
  }
  playGrids.addEventListener("click", clickHandlerBoard);

  // Initial render
  updateScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
})();

console.log(gameBoard.getBoard());
