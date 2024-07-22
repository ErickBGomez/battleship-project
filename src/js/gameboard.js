class Gameboard {
  #board;

  #failedHits = 0;

  constructor() {
    this.#board = new Array(10)
      .fill()
      .map(() => new Array({ ship: null, hit: false }));
  }
}
