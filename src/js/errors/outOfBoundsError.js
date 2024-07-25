class OutOfBoundsError extends Error {
  constructor(message) {
    super(message);
    this.name = "OutOfBoundsError";
  }
}

export default OutOfBoundsError;
