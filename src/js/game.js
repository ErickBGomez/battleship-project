import Player from "./player";
import { createBoard, updateBoard } from "./frontend";
import Ship from "./ship";
import Coordinates from "./coordinates";

const players = [];
let currentPlayer;

function selectCell(cell, toPlayer) {
  const coords = new Coordinates(cell.dataset.coordinates);
  toPlayer.gameboard.receiveAttack(coords);
  updateBoard(toPlayer);
}

function placeShips() {
  players[0].setShips([
    {
      ship: new Ship(2),
      coordinates: new Coordinates("A1"),
      direction: "down",
    },
    {
      ship: new Ship(2),
      coordinates: new Coordinates("C3"),
      direction: "right",
    },
    {
      ship: new Ship(3),
      coordinates: new Coordinates("H2"),
      direction: "down",
    },
    {
      ship: new Ship(4),
      coordinates: new Coordinates("E6"),
      direction: "right",
    },
    {
      ship: new Ship(5),
      coordinates: new Coordinates("F10"),
      direction: "right",
    },
  ]);

  updateBoard(players[0]);

  players[1].setShips([
    {
      ship: new Ship(2),
      coordinates: new Coordinates("B5"),
      direction: "down",
    },
    {
      ship: new Ship(2),
      coordinates: new Coordinates("D3"),
      direction: "right",
    },
    {
      ship: new Ship(3),
      coordinates: new Coordinates("G4"),
      direction: "down",
    },
    {
      ship: new Ship(4),
      coordinates: new Coordinates("I6"),
      direction: "down",
    },
    {
      ship: new Ship(5),
      coordinates: new Coordinates("C8"),
      direction: "right",
    },
  ]);

  updateBoard(players[1]);
}

function setupGame() {
  players.push(new Player("Player 1", 1));
  players.push(new Player("Player 2", 2));

  players.forEach((player) => createBoard(player));

  placeShips();
}

export { setupGame, selectCell };
