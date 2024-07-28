function createCellsContainer() {
  const offset = 65;
  const container = document.createElement("div");
  container.classList.add("cells");

  for (let i = 1; i <= 10; i++) {
    for (let j = 0; j < 10; j++) {
      const coordinates = String.fromCharCode(offset + j) + i;
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.coordinates = coordinates;
      cell.addEventListener("click", () => console.log(coordinates));

      container.appendChild(cell);
    }
  }

  return container;
}

function createBoard() {
  const container = document.createElement("div");
  container.classList.add("board");

  container.appendChild(createCellsContainer());

  document.body.appendChild(container);
}

export default createBoard;
