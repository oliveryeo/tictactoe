// Module for Game Board
const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  /* Cell object for each grid in tic tac toe */
  const cellFactory = () => {
    let value = 0;

    const addMark = (playerID) => {
      value = playerID;
    };

    const getValue = () => value;

    return {
      addMark,
      getValue,
    };
  };

  // Put a cell object in all array
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cellFactory());
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

  const refreshBoard = () => {
    board.length = 0;
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(cellFactory());
      }
    }
  };

  return { playGrid, getBoard, refreshBoard };
})();

// Module for Game Controller
const gameController = ((
  playerOneName = "Player O",
  playerTwoName = "Player X"
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

  let roundsElapsed = 0;
  let activePlayer = players[0];

  const updatePlayers = (playerOne, playerTwo) => {
    players[0].name = playerOne;
    players[1].name = playerTwo;
  };

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
      if (board[0][0].getValue() === 1 && board[0][1].getValue() === 1 && board[0][2].getValue() === 1) {
        return 1;
      } else if (board[0][0].getValue() === 2 && board[0][1].getValue() === 2 && board[0][2].getValue() === 2) {
        return 2;
      }

      // Horizontal row 2
      if (board[1][0].getValue() === 1 && board[1][1].getValue() === 1 && board[1][2].getValue() === 1) {
        return 1;
      } else if (board[1][0].getValue() === 2 && board[1][1].getValue() === 2 && board[1][2].getValue() === 2) {
        return 2;
      }

      // Horizontal row 3
      if (board[2][0].getValue() === 1 && board[2][1].getValue() === 1 && board[2][2].getValue() === 1) {
        return 1;
      } else if (board[2][0].getValue() === 2 && board[2][1].getValue() === 2 && board[2][2].getValue() === 2) {
        return 2;
      }

      // Vertical row 1
      if (board[0][0].getValue() === 1 && board[1][0].getValue() === 1 && board[2][0].getValue() === 1) {
        return 1;
      } else if (board[0][0].getValue() === 2 && board[1][0].getValue() === 2 && board[2][0].getValue() === 2) {
        return 2;
      }

      // Vertical row 2
      if (board[0][1].getValue() === 1 && board[1][1].getValue() === 1 && board[2][1].getValue() === 1) {
        return 1;
      } else if (board[0][1].getValue() === 2 && board[1][1].getValue() === 2 && board[2][1].getValue() === 2) {
        return 2;
      }

      // Vertical row 3
      if (board[0][2].getValue() === 1 && board[1][2].getValue() === 1 && board[2][2].getValue() === 1) {
        return 1;
      } else if (board[0][2].getValue() === 2 && board[1][2].getValue() === 2 && board[2][2].getValue() === 2) {
        return 2;
      }

      // Cross 1
      if (board[0][0].getValue() === 1 && board[1][1].getValue() === 1 && board[2][2].getValue() === 1) {
        return 1;
      } else if (board[0][0].getValue() === 2 && board[1][1].getValue() === 2 && board[2][2].getValue() === 2) {
        return 2;
      }

      // Cross 2
      if (board[0][2].getValue() === 1 && board[1][1].getValue() === 1 && board[2][0].getValue() === 1) {
        return 1;
      } else if (board[0][2].getValue() === 2 && board[1][1].getValue() === 2 && board[2][0].getValue() === 2) {
        return 2;
      }

      switchPlayerTurn();
      printPlayerTurn();
    }
  };

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
    roundsElapsed++;
  };

  const getActivePlayer = () => activePlayer;
  const getRoundsElapsed = () => roundsElapsed;
  const resetRoundsElapsed = () => roundsElapsed = 0;

  // For console checking purpose
  const printPlayerTurn = () => {
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  return {
    playRound,
    updatePlayers,
    getActivePlayer,
    getRoundsElapsed,
    resetRoundsElapsed,
    getBoard: gameBoard.getBoard,
    refreshBoard: gameBoard.refreshBoard
  };
})();

// Module for screenController
const screenController = (() => {
  const playerTurnDiv = document.querySelector(".turn");
  const playGrids = document.querySelector(".play-grids");
  const restartDiv = document.querySelector(".restart");

  const restartButton = document.createElement("button");
  restartButton.textContent = "Restart?";
  restartButton.addEventListener("click", () => {
    // Refresh the board and remove the restart button
    gameController.refreshBoard();
    gameController.resetRoundsElapsed();
    restartDiv.removeChild(restartButton);
    playGrids.addEventListener("click", clickHandlerBoard);
    updateScreen();
  })

  const updateScreen = (condition = 0) => {
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
        
        /* Create a data attribute to identify the column
           This makes it easier to pass into our `playRound` function
        */
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

    // Handle what happens when a winner is decided
    if (condition === 1 || condition === 2) {
      // Display winner's name
      playerTurnDiv.textContent = `${activePlayer.name} is the winner!`;
      restartDiv.appendChild(restartButton);
      playGrids.removeEventListener("click", clickHandlerBoard); // stops the game
    } else if (condition === 3) {
      playerTurnDiv.textContent = `It is a draw!`;
      restartDiv.appendChild(restartButton);
      playGrids.removeEventListener("click", clickHandlerBoard); // stops the game
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
    const totalRounds = gameController.getRoundsElapsed();
    if (roundValue === 1) {
      console.log("Player 1 is winner!");
      updateScreen(1);
    } else if (roundValue === 2) {
      console.log("Player 2 is winner!");
      updateScreen(2);
    } else if (totalRounds === 9){
      updateScreen(3);
    } else {
      updateScreen();
    };
  }
  playGrids.addEventListener("click", clickHandlerBoard);

  const playerNameScreen = () => {
    /* TODO: Create a UI for players to key in their names for Player 1 and 2.
       After submission, remove that UI and start rendering the game.
    */

    // Add nameInput class for styling
    const nameInputDiv = document.createElement("div");
    nameInputDiv.classList.add("nameInput");

    // Create two input text fields
    const playerOneName = document.createElement("input");
    playerOneName.setAttribute("type", "text");
    playerOneName.setAttribute("required", "");
    const playerOneSpan = document.createElement("span");
    playerOneSpan.textContent = "Player One: ";

    const playerTwoName = document.createElement("input");
    playerTwoName.setAttribute("type", "text");
    playerTwoName.setAttribute("required", "");
    const playerTwoSpan = document.createElement("span");
    playerTwoSpan.textContent = "Player Two: ";

    /* Create a submit button → upon clicking, submit whatever is in the text field as player1 and player2 into
       gameController object (gameController.updatePlayers(player1, player2))
    */
    
    // Set type to "button" to prevent form submission
    const submitPlayerNames = document.createElement("button");
    submitPlayerNames.setAttribute("type", "button");
    submitPlayerNames.textContent = "Submit Names"

    // Listen for click, and updatePlayers if textContent fields are not empty
    submitPlayerNames.addEventListener("click", () => {
      if (playerOneName.value != "" && playerTwoName.value != "") {
        // Update player names, remove the inputs, update the play area for game time
        gameController.updatePlayers(playerOneName.value, playerTwoName.value);
        playerTurnDiv.removeChild(nameInputDiv);
        updateScreen();
      } else {
        playerTurnDiv.removeChild(nameInputDiv);
        updateScreen();
      }
    })

    nameInputDiv.appendChild(playerOneSpan);
    nameInputDiv.appendChild(playerOneName);
    nameInputDiv.appendChild(playerTwoSpan);
    nameInputDiv.appendChild(playerTwoName);
    nameInputDiv.appendChild(submitPlayerNames);

    playerTurnDiv.appendChild(nameInputDiv);
    

    // Remove player name screen

    // Render the playarea by updateScreen()
  };

  // Initial render → To change to playerNameScreen() once function is established
  playerNameScreen();

  // We don't need to return anything from this module because everything is encapsulated inside this screen controller.
})();


console.log(gameBoard.getBoard());
