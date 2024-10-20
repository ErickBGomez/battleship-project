import "../public/css/style.css";
import "../public/css/material-symbols.css";
import Game from "./model/game";
import GameObserver from "./frontend/gameObserver";
import createGameBoard from "./frontend/gameboard";

const boardsContainer = document.querySelector(".gameboards-container");

const game = new Game(confirm("vs Computer?"));
const [player1, player2] = game.players;
const gameObserver = new GameObserver();
game.addObserver(gameObserver);

boardsContainer.append(createGameBoard(player1));
boardsContainer.append(createGameBoard(player2));
game.setupGame();
