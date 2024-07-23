import Ship from "./ship";
import Coordinates from "./coordinates";

class Gameboard {
  #board;

  #failedHits = 0;

  #availableShips;

  #ships;

  constructor(ships) {
    this.#board = new Array(10)
      .fill()
      .map(() => new Array({ ship: null, hit: false }));

    this.#ships = ships;
    this.#autoPlaceShips();
  }

  // Private methods
  // Only for testing: Place ships automatically
  #autoPlaceShips() {
    this.placeShip(this.#ships[0], new Coordinates("A1"));
    this.placeShip(this.#ships[1], new Coordinates("B1"));
    this.placeShip(this.#ships[2], new Coordinates("C1"));
    this.placeShip(this.#ships[3], new Coordinates("D1"));
    this.placeShip(this.#ships[4], new Coordinates("E1"));
  }

  static #inBounds(column, row) {
    return column >= 0 && column <= 9 && row >= 0 && row <= 9;
  }

  #isCellAvailable(column, row) {
    return this.#board[column][row] === null;
  }

  // Methods
  placeShip(ship, coordinates = new Coordinates("A1"), direction = "down") {
    let currentColumn = coordinates.columnIndex;
    let currentRow = coordinates.rowIndex;

    for (let i = 0; i < ship.length; i++) {
      // Error: Ship out of bounds
      if (!Gameboard.#inBounds(currentColumn, currentRow)) {
        throw new Error("Ship out of bounds");
      }

      if (!this.#isCellAvailable(currentColumn, currentRow)) {
        // Error: Cannot override ship information
        throw new Error("Cannot override ship information");
      }

      // Place ship
      this.#board[currentColumn][currentRow].ship = ship;

      // Move next insertion based on specified direction
      switch (direction) {
        case "up":
          currentRow--;
          break;

        case "down":
          currentRow++;
          break;

        case "right":
          currentColumn++;
          break;

        case "left":
          currentColumn--;
          break;

        default:
          // Error: Invalid direction
          throw new Error("Invalid direction");
      }
    }
  }
}

export default Gameboard;
