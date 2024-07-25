import Coordinates from "../src/js/coordinates.js";
import Gameboard from "../src/js/gameboard.js";
import Ship from "../src/js/ship.js";
import ShipPlacementError from "../src/js/errors/shipPlacementError.js";
import OutOfBoundsError from "../src/js/errors/outOfBoundsError.js";

const gb = new Gameboard();

describe("Gameboard: Ship placement", () => {
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
      ShipPlacementError,
    );
  });

  test("Cannot place ship out of bounds", () => {
    const ship = new Ship(3);
    expect(() => gb.placeShip(ship, new Coordinates("A3"), "left")).toThrow(
      OutOfBoundsError,
    );
  });

  test("Cannot accept incorrect direction values", () => {
    const ship = new Ship(2);
    expect(() => gb.placeShip(ship, new Coordinates("A4"), "a")).toThrow(Error);
  });
});

describe("Gameboard: Receive attacks", () => {
  test("Cannot receive a out of bounds attack", () => {
    expect(() => gb.receiveAttack(new Coordinates("K11"))).toThrow(
      OutOfBoundsError,
    );
  });

  test("Send attack to a empty space", () => {
    const coords = new Coordinates("C3");
    gb.receiveAttack(coords);

    expect(gb.board[coords.columnIndex][coords.rowIndex].hit).toBe(true);
  });

  test("Cannot hit same cell twice", () => {
    expect(() => gb.receiveAttack(new Coordinates("C3"))).toThrow(Error);
  });

  test("Send attack to a ship", () => {
    const coords = new Coordinates("A1");
    gb.receiveAttack(coords);

    expect(gb.board[coords.columnIndex][coords.rowIndex].ship.hitCount).toBe(1);
  });

  test("Sink a ship", () => {
    const coords = new Coordinates("A2");
    gb.receiveAttack(coords);

    expect(gb.board[coords.columnIndex][coords.rowIndex].ship.isSunk()).toBe(
      true,
    );
  });
});
