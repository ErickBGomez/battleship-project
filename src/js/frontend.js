import Coordinates from "./coordinates";

const offset = 65;

function getGameboardContainer(state) {
  return document.querySelector(
    `.gameboard-container${state === "waiting" ? ".small" : ""}`,
  );
}

function getBoardCells(player) {
  return getGameboardContainer(player.state).querySelectorAll(".cell");
}

function updateBoard(player) {
  const gameboardContainer = getGameboardContainer(player.state);
  const board = gameboardContainer.querySelector(".board");

  updateCells(board, player, player.state);
  updateBoardInfo(gameboardContainer, player.name, player.gameboard);
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

function updateBoardInfo(container, name, gameboard) {
  const playerName = container.querySelector(".player-name");
  const failedHits = container.querySelector(".failed-hits .value");
  const availableShips = container.querySelector(".available-ships .value");

  playerName.textContent = name;
  failedHits.textContent = gameboard.failedHits;
  availableShips.textContent = gameboard.availableShips;
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

function createBoardInfo() {
  const container = document.createElement("div");
  container.classList.add("info");

  const availableShips = createBoardInfoLabel(
    "available-ships",
    "Available ships",
    0,
  );
  const failedHits = createBoardInfoLabel(
    "failed-hits",
    "Failed hits received",
    0,
  );

  container.appendChild(availableShips);
  container.appendChild(failedHits);

  return container;
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

function createBoard(smallBoard = false) {
  const boardsContainer = document.querySelector(".boards-container");
  const container = document.createElement("div");
  container.classList.add("gameboard-container");
  if (smallBoard) container.classList.add("small");

  const boardTitle = document.createElement(smallBoard ? "h2" : "h1");
  boardTitle.classList.add("title");

  const playerName = document.createElement("span");
  playerName.classList.add("player-name");

  const titleContent = document.createElement("span");
  titleContent.classList.add("title-content");
  titleContent.textContent = "'s Board";

  boardTitle.appendChild(playerName);
  boardTitle.appendChild(titleContent);

  const board = document.createElement("div");
  board.classList.add("board");

  board.appendChild(setCells());

  const labelsOffset = document.createElement("div");
  labelsOffset.classList.add("offset");
  board.appendChild(labelsOffset);

  const labels = createBoardLabels();
  labels.forEach((label) => board.appendChild(label));

  const info = createBoardInfo();

  container.appendChild(boardTitle);
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
