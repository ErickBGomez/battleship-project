import Player from "./player";
import { createBoard, updateBoard } from "./frontend";
import Ship from "./ship";
import Coordinates from "./coordinates";

/* TODO:
1. Create a turn based game (possible use State Machine and Chain of Responsibility design patterns)
2. failedHits has been being counted incorrectly. The current player doing the attack should
    be incrementing their value, not the one receiving the attack
3. For State Machine, should be 3 states: Placing ships, Performing attack and Receiving Attack
4. For Chain of Responsibility: Should check if all ships are sunk before doing the attack
5. Drag and drop ship placement
6. Handle errors to avoid incorrect placements
7. Create Human and Computers players functions
8. Display variable information in the frontend
  */

class Game {
  #players = [];

  #currentPlayer;

  #nextPlayer;

  #playerFlag = false;

  #state;

  placeShips() {
    this.#players[0].setShips([
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

    updateBoard(this.#players[0]);

    this.#players[1].setShips([
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

    updateBoard(this.#players[1]);
  }

  setupGame() {
    this.#players.push(new Player("Player 1", 1));
    this.#players.push(new Player("Player 2", 2));

    this.#players.forEach((player) => createBoard(player));

    // Set state to "Placing ships"
    this.placeShips();

    // Should be called when "Placing ships is finished"
    // Set state to "Attacking"
    this.startTurn();
  }
}

export default Game;
