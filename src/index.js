import "./style.css";
import Game from "./js/game";
import {
  createBoard,
  createBoardsContainer,
  createButtons,
} from "./js/frontend";

createBoardsContainer();
createBoard();
createBoard(true);
createButtons();

const game = new Game(true);

game.setupGame();
