import "./style.css";
import Game from "./js/game";
import { createBoardsContainer, createButtons } from "./js/frontend";

createBoardsContainer();
createButtons();

const game = new Game(true);

game.setupGame();
