import Player from "./players/player";
import { createBoard, getBoardCells, updateBoard } from "./frontend";
import Ship from "./ship";
import Coordinates from "./coordinates";
import ComputerPlayer from "./players/computerPlayer";

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
      this.#players.push(new ComputerPlayer(2, "CPU", "hard"));
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

      const shipHit =
        this.nextPlayer.gameboard.getCellByCoordinates(coordinates).ship;

      updateBoard(this.nextPlayer);

      if (this.#checkWin()) {
        alert("Game over!");
        return;
      }

      if (shipHit) {
        if (this.#cpuCurrentPlayer()) {
          if (shipHit.isSunk()) {
            this.currentPlayer.shipFoundPosition = null;
          } else {
            this.currentPlayer.shipFoundPosition = coordinates;
          }
        }
      } else {
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

  #placeShips() {
    this.#players[0].setShips([
      {
        ship: new Ship(2),
        coordinates: new Coordinates("A1"),
        direction: "down",
      },
      {
        ship: new Ship(2),
        coordinates: new Coordinates("A3"),
        direction: "down",
      },
      {
        ship: new Ship(3),
        coordinates: new Coordinates("J1"),
        direction: "down",
      },
      {
        ship: new Ship(4),
        coordinates: new Coordinates("A10"),
        direction: "right",
      },
      {
        ship: new Ship(5),
        coordinates: new Coordinates("F10"),
        direction: "right",
      },
    ]);

    this.#players[1].setShips([
      {
        ship: new Ship(2),
        coordinates: new Coordinates("B5"),
        direction: "down",
      },
      {
        ship: new Ship(2),
        coordinates: new Coordinates("D3"),
        direction: "right",
      },
      {
        ship: new Ship(3),
        coordinates: new Coordinates("G4"),
        direction: "down",
      },
      {
        ship: new Ship(4),
        coordinates: new Coordinates("I6"),
        direction: "down",
      },
      {
        ship: new Ship(5),
        coordinates: new Coordinates("C8"),
        direction: "right",
      },
    ]);
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
    this.#placeShips();

    this.#playTurn();
  }
}

export default Game;
