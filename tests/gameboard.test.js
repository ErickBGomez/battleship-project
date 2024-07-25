import Coordinates from "../src/js/coordinates.js";
import Gameboard from "../src/js/gameboard.js";
import Ship from "../src/js/ship.js";

const gb = new Gameboard();

describe("Gameboard tests", () => {
  test("Place ship at any coordinates", () => {
    const ship = new Ship(2);
    gb.placeShip(ship, new Coordinates("A1"));

    const shipInserted =
      !gb.isCellAvailable(new Coordinates("A1")) &&
      !gb.isCellAvailable(new Coordinates("A2"));

    expect(shipInserted).toBe(true);
  });

  test("Place ship at the given direction", () => {
    const ship = new Ship(2);
    gb.placeShip(ship, new Coordinates("B1"), "right");

    const shipInserted =
      !gb.isCellAvailable(new Coordinates("B1")) &&
      !gb.isCellAvailable(new Coordinates("C1"));

    expect(shipInserted).toBe(true);
  });

  test("Cannot place ship in a occupied cell", () => {
    const ship = new Ship(2);
    expect(() => gb.placeShip(ship, new Coordinates("A2"), "up")).toThrow(
      Error,
    );
  });

  test("Cannot place ship out of bounds", () => {
    const ship = new Ship(2);
    expect(() => gb.placeShip(ship, new Coordinates("A3"), "left")).toThrow(
      Error,
    );
  });
});
