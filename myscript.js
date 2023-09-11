// Factory Func for Players
const Player = () => {
  // add specific mark on the board → tag that space to the player → dont allow next player to click
};

// Module for gameBoard
const gameBoard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell());
    }
  }

  const selectGrid = (row, column, playerID) => {
    const selectedGrid = board[row][column];

    // Create error handling where grid is already filled, hence player cannot select

    selectedGrid.addMark(playerID);
  }

  return { selectGrid };
})();

// Cell object for each grid in tic tac toe
const cell = (() => {
  let value = 0;

  const addMark = (playerID) => {
    value = playerID;
  };

  const getValue = () => value;

  return {
    addMark,
    getValue
  };
})();