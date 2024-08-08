import Coordinates from "./coordinates";

const offset = 65;

function getBoardCells(player) {
  return document.querySelectorAll(
    `.gameboard-container[data-player="${player.id}"] .cell`,
  );
}

function updateBoard(player) {
  const gameboardContainer = document.querySelector(
    `.gameboard-container[data-player="${player.id}"]`,
  );
  const board = gameboardContainer.querySelector(".board");

  updateCells(board, player, player.state);
  updateBoardInfo(gameboardContainer, player.gameboard);
}

function updateCells(board, player) {
  const cells = board.querySelectorAll(".cell");

  cells.forEach((cl) => {
    // Remove events
    const cell = cl.cloneNode(true);
    cl.parentNode.replaceChild(cell, cl);

    const gameCell = player.gameboard.getCellByCoordinates(
      new Coordinates(cell.dataset.coordinates),
    );

    // Reset class list
    cell.className = "cell";

    if (gameCell.ship) {
      if (
        player.state === "attacking" ||
        player.state === "placing" ||
        gameCell.hit
      ) {
        cell.classList.add("ship");
      }
      if (gameCell.ship.isSunk()) cell.classList.add("sunk");
    }

    if (gameCell.hit) cell.classList.add("hit");
  });
}

function setCells() {
  const container = document.createElement("div");
  container.classList.add("cells");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinates = String.fromCharCode(offset + j) + (i + 1);
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinates = coordinates;

      container.appendChild(cell);
    }
  }

  return container;
}

function createBoardInfoLabel(className, label, value) {
  const container = document.createElement("div");
  container.classList.add("info-container");
  container.classList.add(className);

  const labelElement = document.createElement("p");
  labelElement.classList.add("label");
  labelElement.textContent = `${label}: `;

  const valueElement = document.createElement("p");
  valueElement.classList.add("value");
  valueElement.textContent = value;

  container.appendChild(labelElement);
  container.appendChild(valueElement);

  return container;
}

function createBoardInfo(gameboard) {
  const container = document.createElement("div");
  container.classList.add("info");

  const availableShips = createBoardInfoLabel(
    "available-ships",
    "Available ships",
    gameboard.availableShips,
  );
  const failedHits = createBoardInfoLabel(
    "failed-hits",
    "Failed hits received",
    gameboard.failedHits,
  );

  container.appendChild(availableShips);
  container.appendChild(failedHits);

  return container;
}

function updateBoardInfo(container, gameboard) {
  const failedHits = container.querySelector(".failed-hits .value");
  const availableShips = container.querySelector(".available-ships .value");

  failedHits.textContent = gameboard.failedHits;
  availableShips.textContent = gameboard.availableShips;
}

function createBoardLabels() {
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

function createButtons() {
  const container = document.createElement("div");
  container.classList.add("buttons");

  const confirmPlacement = document.createElement("button");
  confirmPlacement.classList.add("placement");
  confirmPlacement.classList.add("hidden");
  confirmPlacement.textContent = "Confirm placement";

  const confirmAttack = document.createElement("button");
  confirmAttack.classList.add("attack");
  confirmAttack.classList.add("hidden");
  confirmAttack.textContent = "Next player";

  container.appendChild(confirmPlacement);
  container.appendChild(confirmAttack);

  document.body.appendChild(container);
}

function showButton(className) {
  const button = document.querySelector(`button.${className}`);
  button.classList.toggle("hidden");
}

function createBoard(player) {
  const boardsContainer = document.querySelector(".boards-container");
  const container = document.createElement("div");
  container.classList.add("gameboard-container");
  container.dataset.player = player.id;

  const playerName = document.createElement("h1");
  playerName.textContent = player.name;

  const board = document.createElement("div");
  board.classList.add("board");

  board.appendChild(setCells(player));

  const labelsOffset = document.createElement("div");
  board.appendChild(labelsOffset);

  const labels = createBoardLabels();
  labels.forEach((label) => board.appendChild(label));

  const info = createBoardInfo(player.gameboard);

  container.appendChild(playerName);
  container.appendChild(board);
  container.appendChild(info);

  boardsContainer.appendChild(container);
}

function createBoardsContainer() {
  const container = document.createElement("div");
  container.classList.add("boards-container");

  document.body.appendChild(container);
}

export {
  createBoardsContainer,
  createButtons,
  showButton,
  createBoard,
  updateBoard,
  getBoardCells,
};
