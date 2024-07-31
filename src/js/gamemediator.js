import Game from "./game";
import { createBoard, updateBoard } from "./frontend";

const game = new Game();

function startGame() {
  game.players.forEach((player) => createBoard(player));
  game.placeShips();

  updateBoard(game.currentPlayer, "placing");
  updateBoard(game.nextPlayer, "placing");

  game.playTurn();
}

export { startGame };
