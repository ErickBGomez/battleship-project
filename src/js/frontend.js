import { selectCell } from "./game";

const offset = 65;

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

function updateBoard(player) {
  const gameboardContainer = document.querySelector(
    `.gameboard-container[data-player="${player.id}"]`,
  );
  const board = gameboardContainer.querySelector(".board");

  updateCells(board, player);
  updateBoardInfo(gameboardContainer, player.gameboard);
}

function updateCells(board, player) {
  const cells = board.querySelector(".cells");

  if (cells) board.removeChild(cells);
  board.appendChild(setCells(player));
}

function setCells(player) {
  const container = document.createElement("div");
  container.classList.add("cells");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinates = String.fromCharCode(offset + j) + (i + 1);
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinates = coordinates;

      const gameCell = player.gameboard.board[j][i];
      if (gameCell.ship) {
        cell.classList.add("ship");
        if (gameCell.ship.isSunk()) cell.classList.add("sunk");
      }

      if (gameCell.hit) cell.classList.add("hit");

      cell.addEventListener("click", (e) => selectCell(e.target, player));

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

function createBoard(player) {
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

  document.body.appendChild(container);
}

export { createBoard, updateBoard };
