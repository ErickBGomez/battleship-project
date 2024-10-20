function createTitle(playerName) {
  const title = document.createElement("h1");
  title.classList.add("title");

  const playerNameElement = document.createElement("span");
  playerNameElement.classList.add("player-name");
  playerNameElement.textContent = playerName;

  const titleContent = document.createElement("span");
  titleContent.classList.add("title-content");
  titleContent.textContent = "'s Board";

  title.append(playerNameElement, titleContent);

  return title;
}

function setCells(offset) {
  const cells = document.createElement("div");
  cells.classList.add("cells");

  const cellsArray = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinates = String.fromCharCode(offset + j) + (i + 1);
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinates = coordinates;

      cellsArray.push(cell);
    }
  }

  cells.append(...cellsArray);

  return cells;
}

function createBoardLabels(offset) {
  const labels = [];

  for (let i = 0; i < 10; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    column.textContent = String.fromCharCode(offset + i);
    labels.push(column);
  }

  for (let i = 1; i <= 10; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    row.textContent = i;
    labels.push(row);
  }

  return labels;
}

function createBoard() {
  const offset = 65;
  const board = document.createElement("div");
  board.classList.add("board");

  const labelsOffset = document.createElement("div");
  labelsOffset.classList.add("offset");

  const labels = createBoardLabels(offset);

  board.append(setCells(offset), labelsOffset, ...labels);

  return board;
}

const createGameBoard = (playerName) => {
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("gameboard");

  const actions = document.createElement("div");
  actions.classList.add("actions");

  gameBoard.append(createTitle(playerName), createBoard(), actions);

  return gameBoard;
};

export { createGameBoard };
