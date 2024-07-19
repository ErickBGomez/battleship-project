import Ship from "../src/ship.js";

describe("Ship tests", () => {
  test("Should increase hit count to 1", () => {
    const ship = new Ship(2);
    ship.hit();

    expect(ship.hitCount).toBe(1);
  });
});
