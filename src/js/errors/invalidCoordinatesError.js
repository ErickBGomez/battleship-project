class InvalidCoordinatesError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCoordinatesError";
  }
}

export default InvalidCoordinatesError;
