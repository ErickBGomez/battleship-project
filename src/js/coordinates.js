class Coordinates {
  #column;

  #row;

  // Values should be passed as "A1", "D3", etc...
  constructor(value) {
    this.value = value;
  }

  // Methods
  static validate(coordinates) {
    const pattern = /^[A-J](?:[1-9]|10)$/;
    return pattern.test(coordinates);
  }
}

export default Coordinates;
