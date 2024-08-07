import Coordinates from "../coordinates";
import Player from "./player";
import { randomRange } from "../utils";

class ComputerPlayer extends Player {
  #difficulty;

  constructor(name, id, difficulty) {
    super(name, id);

    this.#difficulty = difficulty;
  }

  get difficulty() {
    return this.#difficulty;
  }

  selectRandomCoordinates() {
    const column = randomRange(0, 9);
    const row = randomRange(0, 9);
    return Coordinates.convert(column, row);
  }
}

export default ComputerPlayer;
