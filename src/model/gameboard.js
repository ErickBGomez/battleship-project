import Coordinates from "./coordinates";
import ShipPlacementError from "./errors/shipPlacementError";
import OutOfBoundsError from "./errors/outOfBoundsError";
import CellHitError from "./errors/cellHitError";

class Gameboard {
  #board;

  #availableShips = 0;

  #failedHits = 0;

  constructor() {
    this.#initializeBoard();
  }

  // Getters
  get board() {
    return this.#board;
  }

  get availableShips() {
    return this.#availableShips;
  }

  get failedHits() {
    return this.#failedHits;
  }

  // Private functions
  #initializeBoard() {
    this.#board = Array(10)
      .fill()
      .map(() =>
        // eslint-disable-next-line implicit-arrow-linebreak
        Array(10)
          .fill()
          .map(() => ({
            ship: null,
            hit: false,
          })),
      ); // eslint-disable-line function-paren-newline
  }

  #getCell(column, row) {
    return this.#board[column][row];
  }

  getCellByCoordinates(coordinates) {
    return this.#board[coordinates.columnIndex][coordinates.rowIndex];
  }

  #isCellAvailable(column, row) {
    return this.#board[column][row].ship === null;
  }

  #validatePlacement(ship, coordinates, direction) {
    let [currentColumn, currentRow] = coordinates.valueAsArray;

    for (let i = 0; i < ship.length; i++) {
      // Error: Ship out of bounds
      if (!Gameboard.inBounds(currentColumn, currentRow)) {
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

  // Public functions
  static inBounds(column, row) {
    return column >= 0 && column <= 9 && row >= 0 && row <= 9;
  }

  // Returns true when at least one cell is still available
  // "Available" means that is not hit yet and it's in bounds
  adjacentCellsAvailable(coordinates) {
    const directions = ["up", "right", "down", "left"];
    const results = [];

    directions.forEach((direction) => {
      try {
        const movedCoords = Coordinates.getMoved(coordinates, direction, 1);
        const cell = this.getCellByCoordinates(movedCoords);
        results.push(!cell.hit);
      } catch {
        results.push(false);
      }
    });

    return results.includes(true);
  }

  isCellAvailable(coordinates) {
    return this.#isCellAvailable(...coordinates.valueAsArray);
  }

  placeShip(ship, coordinates = new Coordinates("A1"), direction = "down") {
    // Throw error and avoid placing the ship
    this.#validatePlacement(ship, coordinates, direction);

    let [currentColumn, currentRow] = coordinates.valueAsArray;

    for (let i = 0; i < ship.length; i++) {
      // Place ship
      const currentCell = this.#getCell(currentColumn, currentRow);
      currentCell.ship = ship;

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
    if (!Gameboard.inBounds(...coordinates.valueAsArray)) {
      throw new OutOfBoundsError("Attack coordinates is out of bounds");
    }

    const currentCell = this.getCellByCoordinates(coordinates);

    if (currentCell.hit) {
      throw new CellHitError("Cell has been hit before");
    }

    if (!this.isCellAvailable(coordinates)) {
      const { ship: shipFound } = currentCell;

      shipFound.hit();

      if (shipFound.isSunk()) this.#availableShips--;
    } else {
      this.#failedHits++;
    }

    currentCell.hit = true;
  }

  allShipsSunk() {
    return this.#availableShips === 0;
  }

  cellContainsShip(coords) {
    return this.getCellByCoordinates(coords).ship !== null;
  }
}

export default Gameboard;
