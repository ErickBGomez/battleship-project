import "./css/style.css";
import "./css/material-icons.css";
import Game from "./js/game";
import {
  createBoard,
  createBoardsContainer,
  createButtons,
  createLeftSidebar,
  createRightSidebar,
} from "./js/frontend";

createLeftSidebar();
createBoardsContainer();
createRightSidebar();
createBoard();
createBoard(true);
createButtons();

const game = new Game(true);

game.setupGame();
