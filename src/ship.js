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
}

export default Ship;
