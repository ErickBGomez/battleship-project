class Ship {
  #length;

  #name;

  #hitCount = 0;

  #sunk = false;

  constructor(length, name) {
    this.#length = length;
    this.#name = name;
  }

  // Getters
  get hitCount() {
    return this.#hitCount;
  }

  get name() {
    return this.#name;
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
