import Gameboard from "./gameboard";

class Player {
  #gameboard;

  constructor() {
    this.#gameboard = new Gameboard();
  }
}

export default Player;
