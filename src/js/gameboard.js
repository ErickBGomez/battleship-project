import Ship from "./ship";
import Coordinates from "./coordinates";
import ShipPlacementError from "./errors/shipPlacementError";
import OutOfBoundsError from "./errors/outOfBoundsError";

class Gameboard {
  #board;

  #failedHits = 0;

  #availableShips = 0;

  #ships;

  constructor(ships) {
    this.#initializeBoard();

    if (ships) {
      this.#ships = ships;
      this.#autoPlaceShips();
    }
  }

  // Getters
  get board() {
    return this.#board;
  }

  get availableShips() {
    return this.#availableShips;
  }

  // Private methods
  #initializeBoard() {
    this.#board = Array(10)
      .fill()
      .map(() =>
        Array(10)
          .fill()
          .map(() => ({
            ship: null,
            hit: false,
          })),
      );
  }

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

  isCellAvailable(coordinates) {
    return this.#isCellAvailable(coordinates.columnIndex, coordinates.rowIndex);
  }

  #isCellAvailable(column, row) {
    return this.#board[column][row].ship === null;
  }

  #validatePlacement(ship, coordinates, direction) {
    let currentColumn = coordinates.columnIndex;
    let currentRow = coordinates.rowIndex;

    for (let i = 0; i < ship.length; i++) {
      // Error: Ship out of bounds
      if (!Gameboard.#inBounds(currentColumn, currentRow)) {
        throw new OutOfBoundsError("Ship out of bounds");
      }

      if (!this.#isCellAvailable(currentColumn, currentRow)) {
        // Error: Cannot override ship information
        throw new ShipPlacementError("Cannot place over another ship");
      }

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

  // Methods
  placeShip(ship, coordinates = new Coordinates("A1"), direction = "down") {
    // Throw error and avoid placing the ship
    this.#validatePlacement(ship, coordinates, direction);

    let currentColumn = coordinates.columnIndex;
    let currentRow = coordinates.rowIndex;

    for (let i = 0; i < ship.length; i++) {
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

        default: // Invalid direction value has been validated before
      }
    }

    this.#availableShips++;
  }

  receiveAttack(coordinates) {
    if (!Gameboard.#inBounds(coordinates.columnIndex, coordinates.rowIndex)) {
      throw new OutOfBoundsError("Attack coordinates is out of bounds");
    }

    const currentCell =
      this.#board[coordinates.columnIndex][coordinates.rowIndex];

    if (currentCell.hit) {
      throw new Error("Cell has been hit before");
    }

    if (!this.isCellAvailable(coordinates)) {
      const { ship } = currentCell;

      ship.hit();

      if (ship.isSunk()) this.#availableShips--;
    } else {
      this.#failedHits++;
    }

    currentCell.hit = true;
  }
}

export default Gameboard;
