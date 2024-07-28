import Player from "./player";

const players = [];
let currentPlayer;

function selectCell(cell) {
  cell.classList.add("selected");
}

function setupGame() {
  players.push(new Player());
}

export { selectCell };
