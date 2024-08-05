class CellHitError extends Error {
  constructor(message) {
    super(message);
    this.name = "CellHitError";
  }
}

export default CellHitError;
