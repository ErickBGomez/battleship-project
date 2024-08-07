import Coordinates from "../coordinates";
import Player from "./player";
import { randomRange } from "../utils";
import OutOfBoundsError from "../errors/outOfBoundsError";

class ComputerPlayer extends Player {
  #difficulty;

  #shipFoundPosition;

  constructor(id, name, difficulty) {
    super(id, name);

    this.#difficulty = difficulty;
  }

  get difficulty() {
    return this.#difficulty;
  }

  set shipFoundPosition(value) {
    this.#shipFoundPosition = value;
  }

  // eslint-disable-next-line class-methods-use-this
  selectAttack() {
    let column;
    let row;

    if (this.#shipFoundPosition && this.#difficulty === "hard") {
      let positionFlag = true;

      do {
        try {
          column = this.#shipFoundPosition.columnIndex;
          row = this.#shipFoundPosition.rowIndex;

          const direction = randomRange(0, 3);

          switch (direction) {
            case 0: // Up
              row++;
              break;

            case 1: // Right
              column++;
              break;

            case 2: // Down
              row--;
              break;

            case 3: // Left
              column--;
              break;

            default:
          }

          if ((column < 0 || column > 9) && (row < 0 || row > 9)) {
            throw new OutOfBoundsError("Out of bounds");
          }
          positionFlag = false;
        } catch {
          positionFlag = true;
        }
      } while (positionFlag);
    } else {
      column = randomRange(0, 9);
      row = randomRange(0, 9);
    }

    return new Coordinates(Coordinates.convert(column, row));
  }
}

export default ComputerPlayer;
