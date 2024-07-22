import Coordinates from "../src/js/coordinates.js";

describe("Coordinates tests", () => {
  test("Minimum valid coordinates", () => {
    expect(Coordinates.validate("A1")).toBe(true);
  });

  test("Maximum valid coordinates", () => {
    expect(Coordinates.validate("J10")).toBe(true);
  });

  test("Under minimum valid coordinates", () => {
    expect(Coordinates.validate("A0")).toBe(false);
  });

  test("Over maximum valid coordinates", () => {
    expect(Coordinates.validate("K11")).toBe(false);
  });

  test("Parse valid column index", () => {
    const coords = new Coordinates("A1");

    expect(coords.columnIndex).toBe(0);
  });
});