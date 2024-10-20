import InvalidCoordinatesError from "./errors/invalidCoordinatesError";
import { randomRange } from "./utils";

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

  get valueAsArray() {
    return [this.#column, this.#row];
  }

  // Private functions
  #parse() {
    this.#column = this.value.charCodeAt(0) - 65;
    this.#row = Number(this.value.slice(1)) - 1;
  }

  // Public functions
  static randomCoordinates(
    column = { min: 0, max: 1 },
    row = { min: 0, max: 1 },
  ) {
    const randomColumn = randomRange(column.min, column.max);
    const randomRow = randomRange(row.min, row.max);

    return Coordinates.convert(randomColumn, randomRow);
  }

  static validate(coordinates) {
    const pattern = /^[A-Z][1-9]\d*$/;
    return pattern.test(coordinates);
  }

  static convert(column, row) {
    return new Coordinates(Coordinates.convertAsValue(column, row));
  }

  static convertAsValue(column, row) {
    if (column < 0 || row < 0) {
      throw new InvalidCoordinatesError(
        "Cannot convert negative values for columns or rows",
      );
    } else if (typeof column === "string" || typeof row === "string") {
      throw new InvalidCoordinatesError(
        "Cannot convert string values for columns or rows",
      );
    }

    const columnChar = String.fromCharCode(column + 65);
    return columnChar + (row + 1);
  }

  static getMoved(origin, direction, steps) {
    let [column, row] = origin.valueAsArray;

    switch (direction) {
      case "up":
        row -= steps;
        break;

      case "right":
        column += steps;
        break;

      case "down":
        row += steps;
        break;

      case "left":
        column -= steps;
        break;

      default:
    }

    return Coordinates.convert(column, row);
  }
}

export default Coordinates;
