class ShipOutOfBoundsError extends Error {
  constructor(message) {
    super(message);
    this.name = "ShipOutOfBoundsError";
  }
}

export default ShipOutOfBoundsError;
