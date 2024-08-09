import Coordinates from "../src/js/coordinates.js";
import InvalidCoordinatesError from "../src/js/errors/invalidCoordinatesError.js";
import OutOfBoundsError from "../src/js/errors/outOfBoundsError.js";

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
    expect(Coordinates.convertAsValue(0, 0)).toBe("A1");
  });

  test("column 9 and row 9 should return J10", () => {
    expect(Coordinates.convertAsValue(9, 9)).toBe("J10");
  });

  test("Cannot convert negative values", () => {
    expect(() => Coordinates.convertAsValue(-1, -1)).toThrow(
      InvalidCoordinatesError,
    );
  });

  test("Cannot convert string values", () => {
    expect(() => Coordinates.convertAsValue("A", "A")).toThrow(
      InvalidCoordinatesError,
    );
  });

  test("Cannot convert string values", () => {
    expect(() => Coordinates.convertAsValue("1", "1")).toThrow(
      InvalidCoordinatesError,
    );
  });

  test("Convert as a object instead of value A1", () => {
    expect(Coordinates.convert(0, 0)).toEqual({ value: "A1" });
  });

  test("Convert as a object instead of value J10", () => {
    expect(Coordinates.convert(9, 9)).toEqual({ value: "J10" });
  });

  test("Object conversion throws the same errors like just as value", () => {
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

describe("Moved coordinates tests", () => {
  test("Move one step down: A1 -> A2", () => {
    expect(Coordinates.getMoved(new Coordinates("A1"), "down", 1)).toEqual({
      value: "A2",
    });
  });

  test("Move two steps right: A1 -> C1", () => {
    expect(Coordinates.getMoved(new Coordinates("A1"), "right", 2)).toEqual({
      value: "C1",
    });
  });

  test("Move three steps up: J10 -> J7", () => {
    expect(Coordinates.getMoved(new Coordinates("J10"), "up", 3)).toEqual({
      value: "J7",
    });
  });

  test("Move four steps left: J10 -> F10", () => {
    expect(Coordinates.getMoved(new Coordinates("J10"), "left", 4)).toEqual({
      value: "F10",
    });
  });

  test("Invalid coordinates should throw an error, provoked by out of bounds coordinates", () => {
    expect(() =>
      Coordinates.getMoved(new Coordinates("A1"), "left", 1),
    ).toThrow(InvalidCoordinatesError);
  });
});
