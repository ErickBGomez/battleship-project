class ShipPlacementError extends Error {
  constructor(message) {
    super(message);
    this.name = "ShipPlacementError";
  }
}

export default ShipPlacementError;
