import Player from "./player";
import { createBoard, getBoardCells, updateBoard } from "./frontend";
import Ship from "./ship";
import Coordinates from "./coordinates";
import InvalidCoordinatesError from "./errors/invalidCoordinatesError";

/* TODO:
1. For State Machine, should be 3 states: Placing ships, Performing attack and Receiving Attack
2. Drag and drop ship placement
3. Handle errors to avoid incorrect placements
4. Create Human and Computers players functions
  */

class Game {
  #players = [];

  #playerFlag = false;

  constructor() {
    this.#players.push(new Player("Player 1", 1));
    this.#players.push(new Player("Player 2", 2));
  }

  get players() {
    return this.#players;
  }

  get currentPlayer() {
    return this.#players[Number(this.#playerFlag)];
  }

  get nextPlayer() {
    return this.#players[Number(!this.#playerFlag)];
  }

  #swapNextPlayer() {
    this.#playerFlag = !this.#playerFlag;
  }

  #checkWin() {
    return this.nextPlayer.gameboard.allShipsSunk();
  }

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
  }

  #handleTurn(cell) {
    try {
      const coords = new Coordinates(cell.dataset.coordinates);
      this.nextPlayer.gameboard.receiveAttack(coords);

      updateBoard(this.nextPlayer);

      if (this.#checkWin()) {
        alert("Game over!");
        return;
      }

      if (!this.nextPlayer.gameboard.cellContainsShip(coords)) {
        this.#swapNextPlayer();
      }

      this.playTurn();
    } catch (error) {
      console.error(error.message);
    }
  }

  #setEvents(player) {
    const cells = getBoardCells(player);

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => this.#handleTurn(e.target));
    });
  }

  playTurn() {
    this.currentPlayer.state = "attacking";
    this.nextPlayer.state = "receiving";

    updateBoard(this.currentPlayer);
    updateBoard(this.nextPlayer);

    this.#setEvents(this.nextPlayer);
  }

  setupGame() {
    this.#players.forEach((player) => createBoard(player));

    // Set state to "Placing ships"
    this.placeShips();

    this.playTurn();
  }
}

export default Game;
