import Coordinates from "../model/coordinates";

function getGameboard(playerId) {
  return document.querySelector(`.gameboard[data-player-id="${playerId}"]`);
}

function getGameboards() {
  return document.querySelectorAll(".gameboard");
}

function createCurrentPlayerIndicator() {
  const indicator = document.createElement("div");
  indicator.classList.add("indicator");

  const iconElement = document.createElement("i");
  iconElement.classList.add("icon");
  iconElement.classList.add("material-symbols-outlined");
  iconElement.textContent = "flag";

  indicator.append(iconElement);

  return indicator;
}

function showCurrentPlayerIndicator(playerId) {
  const gameboards = getGameboards();
  const currentPlayerGameboard = getGameboard(playerId);
  const currentPlayerIndicator =
    currentPlayerGameboard.querySelector(".indicator");

  gameboards.forEach((gameboard) => {
    const indicator = gameboard.querySelector(".indicator");
    indicator.classList.add("hidden");
  });

  currentPlayerIndicator.classList.remove("hidden");
}

function createTitle(playerName) {
  const title = document.createElement("h1");
  title.classList.add("title");

  const playerNameElement = document.createElement("span");
  playerNameElement.classList.add("player-name");
  playerNameElement.textContent = playerName;

  title.append(createCurrentPlayerIndicator(), playerNameElement);

  return title;
}

function setCells(offset) {
  const cells = document.createElement("div");
  cells.classList.add("cells");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinates = String.fromCharCode(offset + j) + (i + 1);
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinates = coordinates;

      cells.append(cell);
    }
  }

  return cells;
}

function updateCells(cells, gameboard) {
  cells.forEach((cell) => {
    const gameboardCell = gameboard.getCellByCoordinates(
      new Coordinates(cell.dataset.coordinates),
    );

    // Reset classes
    cell.className = "cell";

    if (gameboardCell.ship) {
      cell.classList.add("ship");
    }

    if (gameboardCell.hit) {
      cell.classList.add("hit");
    }
  });
}

function setCellsEvents({ playerId, gameboard }) {
  const cells = getGameboard(playerId).querySelectorAll(".cell");

  cells.forEach((cell) => {
    const currentCell = gameboard.getCellByCoordinates(
      new Coordinates(cell.dataset.coordinates),
    );

    if (!currentCell.hit) {
      cell.addEventListener("click", () => {
        console.log("myEvent");
        resetCellsEvents(cells);
      });
    }
  });
}

function resetCellsEvents(cells) {
  cells.forEach((cell) => {
    const newNode = cell.cloneNode(true);
    cell.parentNode.replaceChild(newNode, cell);
  });
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

function updateBoard(player) {
  const gameboard = getGameboard(player.id);
  const cells = gameboard.querySelectorAll(".cell");
  const shipsCounter = gameboard.querySelector(".ships .value");

  updateCells(cells, player.gameboard);
  updateShipCounter(shipsCounter, player.gameboard.availableShips);
}

function createShipsCounter() {
  const ships = document.createElement("div");
  ships.classList.add("ships");

  const iconElement = document.createElement("i");
  iconElement.classList.add("icon");
  iconElement.classList.add("material-symbols-outlined");
  iconElement.textContent = "sailing";

  const separator = document.createElement("span");
  separator.classList.add("separator");
  separator.textContent = "x";

  const counter = document.createElement("span");
  counter.classList.add("value");
  counter.textContent = 0;

  ships.append(iconElement, separator, counter);

  return ships;
}

function updateShipCounter(counter, value) {
  counter.textContent = value;
}

function createConfirmButton() {
  const button = document.createElement("button");
  button.classList.add("confirm");
  button.classList.add("hidden");
  button.textContent = "Confirm";

  return button;
}

function showConfirmButton(playerId, event) {
  const gameboard = getGameboard(playerId);
  const button = gameboard.querySelector(".confirm");

  switch (event) {
    case "placement":
      button.addEventListener("click", () => {
        const newEvent = new CustomEvent("confirmPlacement");
        document.dispatchEvent(newEvent);
        button.classList.add("hidden");
      });
      break;

    case "attack":
      break;

    default:
  }

  button.classList.remove("hidden");
}

function createGameBoard(player) {
  const gameBoard = document.createElement("div");
  gameBoard.classList.add("gameboard");
  gameBoard.dataset.playerId = player.id;

  const actions = document.createElement("div");
  actions.classList.add("actions");

  gameBoard.append(
    createTitle(player.name),
    createBoard(),
    actions,
    createShipsCounter(),
    createConfirmButton(),
  );

  return gameBoard;
}

export {
  createGameBoard,
  updateBoard,
  showConfirmButton,
  setCellsEvents,
  showCurrentPlayerIndicator,
};
