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

  test("Update availableShips value after insertion", () => {
    expect(gb.availableShips).toBe(2);
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

  test("Send attack to a empty cell", () => {
    const coords = new Coordinates("C3");
    gb.receiveAttack(coords);

    expect(gb.board[coords.columnIndex][coords.rowIndex].hit).toBe(true);
  });

  test("Update failedHits after sending a attack to a empty cell", () => {
    expect(gb.failedHits).toBe(1);
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

  test("Update availableShips value after a ship is sunk", () => {
    expect(gb.availableShips).toBe(1);
  });

  test("Check if all ships are sunk", () => {
    gb.receiveAttack(new Coordinates("B1"));
    gb.receiveAttack(new Coordinates("C1"));

    expect(gb.allShipsSunk()).toBe(true);
  });
});

describe("Gameboard: Adjacent values", () => {
  const gba = new Gameboard();

  test("All adjacent cells are available", () => {
    expect(gba.adjacentCellsAvailable(new Coordinates("B2"))).toBe(true);
  });

  test("Returns true at corners (Out of bounds up and left, but in bounds down and right)", () => {
    expect(gba.adjacentCellsAvailable(new Coordinates("A1"))).toBe(true);
  });

  test("Returns true even when it has a hit cell near (down)", () => {
    gba.receiveAttack(new Coordinates("B3"));

    expect(gba.adjacentCellsAvailable(new Coordinates("B2"))).toBe(true);
  });

  test("Returns false when all adjacent cells are hit", () => {
    gba.receiveAttack(new Coordinates("B1"));
    gba.receiveAttack(new Coordinates("A2"));
    gba.receiveAttack(new Coordinates("C2"));

    expect(gba.adjacentCellsAvailable(new Coordinates("B2"))).toBe(false);
  });

  test("Returns false when adjacent cells are hit (down and right) and at a corner (up and left)", () => {
    expect(gba.adjacentCellsAvailable(new Coordinates("A1"))).toBe(false);
  });
});
