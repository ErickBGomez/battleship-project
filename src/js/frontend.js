import Coordinates from "./coordinates";
import { parseTime } from "./utils";

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
  updateBoardTitle(gameboardContainer, player.name);
  updateShipCount(player.id, player.gameboard.availableShips);
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

function updateBoardTitle(container, name) {
  const playerName = container.querySelector(".player-name");
  playerName.textContent = name;
}

function updateShipCount(playerId, availableShips) {
  const availableShipsElement = document.querySelector(
    `.ships[data-player-id="${playerId}"] .value`,
  );
  availableShipsElement.textContent = availableShips;
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

  return container;
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

  container.appendChild(boardTitle);
  container.appendChild(board);

  boardsContainer.appendChild(container);
}

function createBoardsContainer() {
  const container = document.createElement("div");
  container.classList.add("boards-container");

  document.body.appendChild(container);
}

function createShipsCounter(playerId, icon = "sailing") {
  const container = document.createElement("div");
  container.classList.add("ships");
  container.dataset.playerId = playerId;

  const iconElement = document.createElement("i");
  iconElement.classList.add("icon");
  iconElement.classList.add("material-symbols-outlined");
  iconElement.textContent = icon;

  const xMark = document.createElement("span");
  xMark.classList.add("x-mark");
  xMark.textContent = `P${playerId} X`;

  const counter = document.createElement("span");
  counter.classList.add("value");
  counter.textContent = 0;

  container.appendChild(iconElement);
  container.appendChild(xMark);
  container.appendChild(counter);

  return container;
}

function createTimer() {
  const container = document.createElement("div");
  container.classList.add("timer");

  const icon = document.createElement("i");
  icon.classList.add("icon");
  icon.classList.add("material-symbols-outlined");
  icon.textContent = "timer";

  const value = document.createElement("span");
  value.classList.add("value");
  value.textContent = "00:00";

  container.appendChild(icon);
  container.appendChild(value);

  return container;
}

function updateTimer(seconds) {
  const timer = document.querySelector(".timer .value");
  timer.textContent = parseTime(seconds);
}

function createLeftSidebar() {
  const container = document.createElement("div");
  container.classList.add("left");

  container.appendChild(createShipsCounter(1));
  container.appendChild(createShipsCounter(2));

  document.body.appendChild(container);
}

function createRightSidebar() {
  const container = document.createElement("div");
  container.classList.add("right");

  container.appendChild(createTimer());
  container.appendChild(createButtons());

  document.body.appendChild(container);
}

export {
  createBoardsContainer,
  createLeftSidebar,
  createRightSidebar,
  createButtons,
  showButton,
  createBoard,
  updateBoard,
  updateTimer,
  getBoardCells,
};
