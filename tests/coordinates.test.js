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
