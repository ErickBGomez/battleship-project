import Coordinates from "../coordinates";
import Player from "./player";
import { randomDirection, randomRange } from "../utils";
import OutOfBoundsError from "../errors/outOfBoundsError";
import Gameboard from "../gameboard";

class ComputerPlayer extends Player {
  #difficulty;

  constructor(id, name, difficulty) {
    super(id, name);

    this.#difficulty = difficulty;
    this.shipFoundPosition = null;
  }

  get difficulty() {
    return this.#difficulty;
  }

  selectAttack() {
    let coords;
    let column;
    let row;
    let invalidCoordinates = false;

    do {
      if (this.shipFoundPosition && this.#difficulty === "hard") {
        column = this.shipFoundPosition.columnIndex;
        row = this.shipFoundPosition.rowIndex;

        switch (randomDirection()) {
          case "up":
            row--;
            break;

          case "right":
            column++;
            break;

          case "down":
            row++;
            break;

          case "left":
            column--;
            break;

          default:
        }
      } else {
        column = randomRange(0, 9);
        row = randomRange(0, 9);
      }

      try {
        coords = Coordinates.convert(column, row);

        if (!Gameboard.inBounds(column, row)) {
          throw new OutOfBoundsError("Attack is out of bounds");
        }

        invalidCoordinates = false;
      } catch {
        invalidCoordinates = true;
      }
    } while (invalidCoordinates);

    return coords;
  }
}

export default ComputerPlayer;
