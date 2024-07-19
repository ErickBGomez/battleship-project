class Ship {
  #length;

  #hitCount = 0;

  #sunk = false;

  constructor(length) {
    this.#length = length;
  }

  // Getters
  get hitCount() {
    return this.#hitCount;
  }

  // Methods
  hit() {
    this.#hitCount++;
  }

  isSunk() {
    return this.#hitCount >= this.#length;
  }
}

export default Ship;
