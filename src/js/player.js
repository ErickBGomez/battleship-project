import Gameboard from "./gameboard";

class Player {
  #gameboard;

  #name;

  #id;

  constructor(name, id) {
    this.#gameboard = new Gameboard();
    this.#name = name;
    this.#id = id;
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
