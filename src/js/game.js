import Player from "./player";
import createBoard from "./frontend";

const players = [];
let currentPlayer;

function selectCell(cell) {
  cell.classList.add("selected");
}

function setupGame() {
  players.push(new Player("Player 1"));
  players.push(new Player("Player 2"));

  players.forEach((player) => createBoard(player));
}

export { setupGame, selectCell };
