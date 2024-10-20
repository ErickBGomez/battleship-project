import "../public/css/style.css";
import "../public/css/material-symbols.css";
// import Game from "./js/game";
import { createGameBoard } from "./frontend/gameboard.js";

const boardsContainer = document.querySelector(".gameboards-container");

// const game = new Game(confirm("vs Computer?"));

// game.setupGame();
boardsContainer.append(createGameBoard("Player 1"));
boardsContainer.append(createGameBoard("Player 2"));
