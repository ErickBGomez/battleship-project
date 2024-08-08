import Player from "./players/player";
import { createBoard, getBoardCells, updateBoard } from "./frontend";
import Ship from "./ship";
import Coordinates from "./coordinates";
import ComputerPlayer from "./players/computerPlayer";
import { randomDirection } from "./utils";

/* TODO:
1. For State Machine, should be 3 states: Placing ships, Performing attack and Receiving Attack
2. Drag and drop ship placement
3. Handle errors to avoid incorrect placements
4. Create Human and Computers players functions
  */

class Game {
  #players = [];

  #playerFlag = false;

  constructor(vsComputer) {
    if (vsComputer) {
      this.#players.push(new Player(1, "Player"));
      this.#players.push(new ComputerPlayer(2, "CPU", "easy"));
    } else {
      this.#players.push(new Player(1, "Player 1"));
      this.#players.push(new Player(2, "Player 2"));
    }
  }

  get players() {
    return this.#players;
  }

  get currentPlayer() {
    return this.#players[Number(this.#playerFlag)];
  }

  get nextPlayer() {
    return this.#players[Number(!this.#playerFlag)];
  }

  // Private functions

  #cpuCurrentPlayer() {
    return this.currentPlayer instanceof ComputerPlayer;
  }

  #swapNextPlayer() {
    this.#playerFlag = !this.#playerFlag;
  }

  #checkWin() {
    return this.nextPlayer.gameboard.allShipsSunk();
  }

  #handleTurn(coordinates) {
    try {
      this.nextPlayer.gameboard.receiveAttack(coordinates);

      updateBoard(this.nextPlayer);

      if (this.#checkWin()) {
        alert("Game over!");
        return;
      }

      if (!this.nextPlayer.gameboard.cellContainsShip(coordinates)) {
        this.#swapNextPlayer();
      }

      this.#playTurn();
    } catch (error) {
      console.error(error.message);
    }
  }

  #setEvents(player) {
    const cells = getBoardCells(player);

    cells.forEach((cell) => {
      cell.addEventListener("click", (e) => {
        this.#handleTurn(new Coordinates(e.target.dataset.coordinates));
      });
    });
  }

  #tryComputerSelection() {
    if (!this.#cpuCurrentPlayer()) return;

    let cellHit;
    let coords;

    // Try getting a valid coordinate selection before handling the turn
    do {
      coords = this.currentPlayer.selectAttack();
      cellHit = this.nextPlayer.gameboard.getCellByCoordinates(coords).hit;
    } while (cellHit);

    this.#handleTurn(coords);
  }

  #placeShips(player) {
    const ships = [
      new Ship(2, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(3, "Cruiser"),
      new Ship(4, "Battleship"),
      new Ship(5, "Carrier"),
    ];

    const res = confirm(
      `Placing ships for ${player.name}\nSelect placement? True: Manual. False: Random`,
    );

    while (ships.length) {
      try {
        const ship = ships[0];
        let coords;
        let direction;

        if (res) {
          coords = prompt(
            `[${player.name}] Coordinates for ${ship.name} (Length: ${ship.length})`,
          );
          direction = prompt(
            `[${player.name}] Direction for ${ship.name} (Length: ${ship.length})`,
            "down",
          );
        } else {
          coords = Coordinates.randomCoordinates(
            { min: 0, max: 9 },
            { min: 0, max: 9 },
          ).value;
          direction = randomDirection();
        }

        player.gameboard.placeShip(ship, new Coordinates(coords), direction);
        ships.shift();
      } catch (error) {
        console.error(error);
      }
    }
  }

  #playTurn() {
    this.currentPlayer.state = "attacking";
    this.nextPlayer.state = "waiting";

    updateBoard(this.currentPlayer);
    updateBoard(this.nextPlayer);

    if (this.#cpuCurrentPlayer()) {
      this.#tryComputerSelection();
    } else {
      this.#setEvents(this.nextPlayer);
    }
  }

  setupGame() {
    this.#players.forEach((player) => createBoard(player));

    // Set state to "Placing ships"
    this.#placeShips(this.currentPlayer);
    this.#placeShips(this.nextPlayer);

    this.#playTurn();
  }
}

export default Game;
