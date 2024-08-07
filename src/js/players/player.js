import Gameboard from "../gameboard";

class Player {
  #gameboard;

  #id;

  #name;

  constructor(id, name) {
    this.#gameboard = new Gameboard();
    this.#id = id;
    this.#name = name;
    this.state = "waiting";
  }

  get name() {
    return this.#name;
  }

  get id() {
    return this.#id;
  }

  get gameboard() {
    return this.#gameboard;
  }

  setShips(sets = [{ ship: null, coordinates: null, direction: "" }]) {
    sets.forEach((set) => {
      const { ship, coordinates, direction } = set;
      this.#gameboard.placeShip(ship, coordinates, direction);
    });
  }
}

export default Player;
