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
  const board = document.querySelector(`.board[data-player="${player.id}"]`);
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
      if (gameCell.ship) cell.classList.add("ship");
      if (gameCell.hit) cell.classList.add("hit");

      cell.addEventListener("click", (e) => selectCell(e.target, player));

      container.appendChild(cell);
    }
  }

  return container;
}

function createBoard(player) {
  const container = document.createElement("div");
  container.classList.add("gameboard-container");

  const playerName = document.createElement("h1");
  playerName.textContent = player.name;

  container.appendChild(playerName);

  const board = document.createElement("div");
  board.classList.add("board");
  board.dataset.player = player.id;

  board.appendChild(setCells(player));

  const labelsOffset = document.createElement("div");
  board.appendChild(labelsOffset);

  const labels = createBoardLabels();
  labels.forEach((label) => board.appendChild(label));

  container.appendChild(board);

  document.body.appendChild(container);
}

export { createBoard, updateBoard };
