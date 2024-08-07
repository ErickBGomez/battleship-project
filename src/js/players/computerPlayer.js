import Coordinates from "../coordinates";
import Player from "./player";
import { randomRange } from "../utils";

class ComputerPlayer extends Player {
  #difficulty;

  constructor(id, name, difficulty) {
    super(id, name);

    this.#difficulty = difficulty;
  }

  get difficulty() {
    return this.#difficulty;
  }

  // eslint-disable-next-line class-methods-use-this
  selectAttack() {
    let column;
    let row;

    if (this.#difficulty === "easy") {
      column = randomRange(0, 9);
      row = randomRange(0, 9);
    }

    return new Coordinates(Coordinates.convert(column, row));
  }
}

export default ComputerPlayer;
