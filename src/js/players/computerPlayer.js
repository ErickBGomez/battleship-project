import Coordinates from "../coordinates";
import Player from "./player";

class ComputerPlayer extends Player {
  #difficulty;

  constructor(name, id, difficulty) {
    super(name, id);

    this.#difficulty = difficulty;
  }

  get difficulty() {
    return this.#difficulty;
  }

  #randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectRandomCoordinates() {
    const column = this.#randomRange(0, 9);
    const row = this.#randomRange(0, 9);
    return Coordinates.convert(column, row);
  }
}

export default ComputerPlayer;
