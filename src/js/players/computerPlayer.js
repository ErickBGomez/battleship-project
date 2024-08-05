import Player from "./player";

class ComputerPlayer extends Player {
  #randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomCoordinates() {
    const column = this.#randomRange(0, 9);
  }
}

export default ComputerPlayer;
