import Coordinates from "../src/js/coordinates.js";
import InvalidCoordinatesError from "../src/js/errors/invalidCoordinatesError.js";

describe("Coordinates tests", () => {
  test("Valid coordinates format", () => {
    expect(Coordinates.validate("A1")).toBe(true);
  });

  test("Valid coordinates format (2)", () => {
    expect(Coordinates.validate("J10")).toBe(true);
  });

  test("Valid coordinates format (3)", () => {
    expect(Coordinates.validate("K11")).toBe(true);
  });

  test("Parse valid column index (minimum)", () => {
    const coords = new Coordinates("A1");
    expect(coords.columnIndex).toBe(0);
  });

  test("Parse valid row index (minimum)", () => {
    const coords = new Coordinates("A1");
    expect(coords.rowIndex).toBe(0);
  });

  test("Parse valid column index (maximum based on board)", () => {
    const coords = new Coordinates("J10");
    expect(coords.columnIndex).toBe(9);
  });

  test("Parse valid row index (maximum based on board)", () => {
    const coords = new Coordinates("J10");
    expect(coords.rowIndex).toBe(9);
  });

  test("Invalid format (1)", () => {
    expect(() => new Coordinates("A0")).toThrow(InvalidCoordinatesError);
  });

  test("Invalid format (2)", () => {
    expect(() => new Coordinates("1A")).toThrow(InvalidCoordinatesError);
  });

  test("Invalid format (3)", () => {
    expect(() => new Coordinates("A10A")).toThrow(InvalidCoordinatesError);
  });
});

describe("Coordinates conversion tests", () => {
  test("column 0 and row 0 should return A1", () => {
    expect(Coordinates.convert(0, 0)).toBe("A1");
  });

  test("column 9 and row 9 should return J10", () => {
    expect(Coordinates.convert(9, 9)).toBe("J10");
  });

  test("Cannot convert negative values", () => {
    expect(() => Coordinates.convert(-1, -1)).toThrow(InvalidCoordinatesError);
  });

  test("Cannot convert string values", () => {
    expect(() => Coordinates.convert("A", "A")).toThrow(
      InvalidCoordinatesError,
    );
  });

  test("Cannot convert string values", () => {
    expect(() => Coordinates.convert("1", "1")).toThrow(
      InvalidCoordinatesError,
    );
  });
});

describe("Random coordinates tests", () => {
  test("Should return a valid coordinate (B2)", () => {
    expect(
      Coordinates.randomCoordinates({ min: 1, max: 1 }, { min: 1, max: 1 }),
    ).toEqual({ value: "B2" });
  });

  test("Return a random coordinate", () => {
    expect(
      Coordinates.randomCoordinates({ min: 0, max: 9 }, { min: 0, max: 9 }),
    ).toBeDefined();
  });
});
