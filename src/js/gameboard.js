class Gameboard {
  #board;

  #failedHits = 0;

  #availableShips = 5;

  constructor() {
    this.#board = new Array(10)
      .fill()
      .map(() => new Array({ ship: null, hit: false }));
  }

  // Methods
  placeShip(ship, coordinates) {}
}
