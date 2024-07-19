import Ship from "../src/ship.js";

const ship = new Ship(2);

describe("Ship tests", () => {
  test("Should increase hit count to 1", () => {
    ship.hit();
    expect(ship.hitCount).toBe(1);
  });

  test("Ship is not sunk yet", () => {
    expect(ship.isSunk()).toBe(false);
  });

  test("Ship is sunk after second hit", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test("Ship is sunk even though hitCount is greater than length", () => {
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
