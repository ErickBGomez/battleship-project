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

function createCellsContainer() {
  const container = document.createElement("div");
  container.classList.add("cells");

  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinates = String.fromCharCode(offset + j) + i;
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinates = coordinates;
      cell.addEventListener("click", (e) => selectCell(e.target));

      container.appendChild(cell);
    }
  }

  return container;
}

function createBoard() {
  const container = document.createElement("div");
  container.classList.add("board");

  const labelsOffset = document.createElement("div");
  container.appendChild(labelsOffset);

  container.appendChild(createCellsContainer());

  const labels = createBoardLabels();
  labels.forEach((label) => container.appendChild(label));

  document.body.appendChild(container);
}

export default createBoard;
