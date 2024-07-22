import Ship from "./ship";
import Coordinates from "./coordinates";

class Gameboard {
  #board;

  #failedHits = 0;

  #availableShips = 5;

  constructor() {
    this.#board = new Array(10)
      .fill()
      .map(() => new Array({ ship: null, hit: false }));
  }

  // Methods
  placeShip(
    ship = new Ship(2),
    coordinates = new Coordinates("A1"),
    direction = "down",
  ) {
    let currentColumn = coordinates.columnIndex;
    let currentRow = coordinates.rowIndex;

    for (let i = 0; i < ship.length; i++) {
      // Error: Cannot override ship information
      this.#board[currentColumn][currentRow].ship = ship;

      // Error: Ship out of bounds
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
        // Error: Invalid direction;
      }
    }
  }
}
