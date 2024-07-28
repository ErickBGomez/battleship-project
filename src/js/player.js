import Gameboard from "./gameboard";

class Player {
  #gameboard;

  #name;

  constructor(name) {
    this.#gameboard = new Gameboard();
    this.#name = name;
  }

  get name() {
    return this.#name;
  }
}

export default Player;
