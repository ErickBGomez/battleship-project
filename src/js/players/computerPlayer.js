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
    const column = randomRange(0, 9);
    const row = randomRange(0, 9);
    return Coordinates.convert(column, row);
  }
}

export default ComputerPlayer;
