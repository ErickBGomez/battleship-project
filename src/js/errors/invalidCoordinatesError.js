class InvalidCoordinatesError extends Error {
  constructor(message) {
    super(message);
    this.name = "InvalidCoordinates";
  }
}

export default InvalidCoordinatesError;
