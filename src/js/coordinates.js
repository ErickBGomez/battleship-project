import InvalidCoordinatesError from "./errors/invalidCoordinatesError.js";

class Coordinates {
  #column;

  #row;

  // Values should be passed as "A1", "D3", etc...
  constructor(value) {
    if (!Coordinates.validate(value)) {
      throw new InvalidCoordinatesError(`${value} is not a valid format`);
    }

    this.value = value;
    this.#parse();
  }

  // Getters
  get columnIndex() {
    return this.#column;
  }

  get rowIndex() {
    return this.#row;
  }

  // Private methods
  #parse() {
    this.#column = this.value.charCodeAt(0) - 65;
    this.#row = Number(this.value.slice(1));
  }

  // Methods
  static validate(coordinates) {
    const pattern = /^[A-J](?:[1-9]|10)$/;
    return pattern.test(coordinates);
  }
}

export default Coordinates;
