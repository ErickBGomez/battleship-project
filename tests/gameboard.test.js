import Coordinates from "../src/js/coordinates.js";
import Gameboard from "../src/js/gameboard.js";
import Ship from "../src/js/ship.js";

const gb = new Gameboard();

describe("Gameboard tests", () => {
  test("Place ship at any coordinates", () => {
    const ship = new Ship(2);
    gb.placeShip(ship, new Coordinates("A1"));

    const allCellsFree = gb.isCellAvailable(0, 0) && gb.isCellAvailable(0, 1);

    expect(allCellsFree).toBe(false);
  });
});
