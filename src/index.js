import "../public/css/style.css";
import "../public/css/material-symbols.css";
// import Game from "./js/game";
// import {
//   createBoard,
//   createBoardsContainer,
//   createButtons,
//   createLeftSidebar,
//   createRightSidebar,
// } from "./js/frontend";
import { createGameBoard } from "./js/new-frontend.js";

const boardsContainer = document.querySelector(".gameboards-container");

// createLeftSidebar();
// createBoardsContainer();
// createRightSidebar();
// createBoard();
// createBoard(true);
// createButtons();

// const game = new Game(confirm("vs Computer?"));

// game.setupGame();
boardsContainer.append(createGameBoard("Player 1"));
boardsContainer.append(createGameBoard("Player 2"));
