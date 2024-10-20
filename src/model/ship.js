class Ship {
  #length;

  #name;

  #hitCount = 0;

  #sunk = false;

  constructor(length, name = "Ship") {
    this.#length = length;
    this.#name = name;
  }

  // Getters
  get length() {
    return this.#length;
  }

  get name() {
    return this.#name;
  }

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
