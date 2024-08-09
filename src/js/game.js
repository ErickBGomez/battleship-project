import Player from "./players/player";
import {
  createBoard,
  getBoardCells,
  showButton,
  updateBoard,
} from "./frontend";
import Ship from "./ship";
import Coordinates from "./coordinates";
import ComputerPlayer from "./players/computerPlayer";
import { randomDirection } from "./utils";

/* TODO:
1. Advanced computer behavior when hitting a ship
2. Better UI
3. Replace prompts, confirms and alerts to custom modal dialogs
4. Ask for vs 2P or CPU
5. Ask CPU Difficulty
6. Show next player board bigger than current player board
7. Add delays and animations
8. Drag and drop ship placement

9. In some conditions, there is another type of loop bug. Find a way to know the conditions and fix it
  */

class Game {
  #players = [];

  #playerFlag = false;

  #placeShipsTurns = 0;

  constructor(vsComputer) {
    if (vsComputer) {
      // this.#players.push(new Player(1, "Player"));
      this.#players.push(new ComputerPlayer(1, "CPU", "hard"));
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
  #bothPlayersHuman() {
    return this.#isHuman(this.currentPlayer) && this.#isHuman(this.nextPlayer);
  }

  #isHuman(player) {
    return !(player instanceof ComputerPlayer);
  }

  #isComputer(player) {
    return player instanceof ComputerPlayer;
  }

  #swapNextPlayer() {
    this.#playerFlag = !this.#playerFlag;
  }

  #checkWin() {
    return this.nextPlayer.gameboard.allShipsSunk();
  }

  #handleTurn(coordinates) {
    try {
      // Perform attack and show it in the next player's board
      this.nextPlayer.gameboard.receiveAttack(coordinates);
      updateBoard(this.nextPlayer);

      if (this.#checkWin()) {
        alert("Game over!");
        return;
      }

      if (this.nextPlayer.gameboard.cellContainsShip(coordinates)) {
        if (this.#bothPlayersHuman()) {
          // When current attack hits a ship and both players are human,
          // don't stop current player's turn when they hit consecutive cells with a ship
          this.#playTurn();
        } else if (this.#isComputer(this.currentPlayer)) {
          // this.currentPlayer.shipFoundPosition =
          //   this.nextPlayer.gameboard.adjacentCellsAvailable(
          //     this.currentPlayer.shipFoundPosition,
          //   ) &&
          //   !this.nextPlayer.gameboard
          //     .getCellByCoordinates(coordinates)
          //     .ship.isSunk()
          //     ? coordinates
          //     : null;

          // this.currentPlayer.shipFoundPosition =
          //   this.nextPlayer.gameboard
          //     .getCellByCoordinates(coordinates)
          //     .ship.isSunk() ||
          //   (this.currentPlayer.shipFoundPosition &&
          //     !this.nextPlayer.gameboard.adjacentCellsAvailable(
          //       this.currentPlayer.shipFoundPosition,
          //     ))
          //     ? null
          //     : coordinates;
          if (
            this.nextPlayer.gameboard
              .getCellByCoordinates(coordinates)
              .ship.isSunk()
          ) {
            this.currentPlayer.shipFoundPosition = null;
          } else {
            this.currentPlayer.shipFoundPosition = coordinates;

            if (
              !this.nextPlayer.gameboard.adjacentCellsAvailable(
                this.currentPlayer.shipFoundPosition,
              )
            ) {
              this.currentPlayer.shipFoundPosition = null;
            }
          }
        }
      } else {
        // Only show "Next player" button when both players are human
        if (this.#bothPlayersHuman()) showButton("attack");

        // Hide current player's ship when their turn ended
        this.currentPlayer.state = "waiting";
        updateBoard(this.currentPlayer);

        // Computers can get stuck in a loop when the adjacent cells to the last saved position of a
        // ship found are not available. So, that position is deleted and the computer can keep
        // launching random attacks again
        if (
          this.#isComputer(this.currentPlayer) &&
          this.currentPlayer.shipFoundPosition &&
          !this.nextPlayer.gameboard.adjacentCellsAvailable(
            this.currentPlayer.shipFoundPosition,
          )
        ) {
          this.currentPlayer.shipFoundPosition = null;
        }

        this.#swapNextPlayer();
      }

      // Only pause the round when both players are human
      if (!this.#bothPlayersHuman()) {
        this.#playTurn();
      }
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
    if (!this.#isComputer(this.currentPlayer)) return;

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
    this.currentPlayer.state = "placing";
    this.nextPlayer.state = "waiting";

    const ships = [
      new Ship(2, "Destroyer"),
      new Ship(3, "Submarine"),
      new Ship(3, "Cruiser"),
      new Ship(4, "Battleship"),
      new Ship(5, "Carrier"),
    ];

    let res;

    if (this.#isComputer(this.currentPlayer)) {
      res = false;
    } else {
      res = confirm(
        `Placing ships for ${this.currentPlayer.name}\nSelect placement? True: Manual. False: Random`,
      );
      showButton("placement");
    }

    while (ships.length) {
      try {
        const [ship] = ships;
        let coords;
        let direction;

        if (res) {
          coords = prompt(
            `[${this.currentPlayer.name}] Coordinates for ${ship.name} (Length: ${ship.length})`,
          );
          direction = prompt(
            `[${this.currentPlayer.name}] Direction for ${ship.name} (Length: ${ship.length})`,
            "down",
          );
        } else {
          coords = Coordinates.randomCoordinates(
            { min: 0, max: 9 },
            { min: 0, max: 9 },
          ).value;
          direction = randomDirection();
        }

        this.currentPlayer.gameboard.placeShip(
          ship,
          new Coordinates(coords),
          direction,
        );
        ships.shift();
      } catch (error) {
        // console.error(error);
      }
    }

    updateBoard(this.currentPlayer);

    if (this.#isComputer(this.currentPlayer)) this.#delegateShipPlacement();
  }

  #playTurn() {
    this.currentPlayer.state = "attacking";
    this.nextPlayer.state = "waiting";

    updateBoard(this.currentPlayer);
    updateBoard(this.nextPlayer);

    if (this.#isComputer(this.currentPlayer)) {
      // setTimeout(() => this.#tryComputerSelection(), 1);
      this.#tryComputerSelection();
    } else {
      this.#setEvents(this.nextPlayer);
    }
  }

  #delegateShipPlacement() {
    this.#swapNextPlayer();
    this.#placeShipsTurns++;
    this.#decideTurn();
  }

  #decideTurn() {
    if (this.#placeShipsTurns >= 2) {
      this.#playTurn();
    } else {
      this.#placeShips();
    }
  }

  #setActionButtons() {
    const placement = document.querySelector("button.placement");
    const attack = document.querySelector("button.attack");

    placement.addEventListener("click", (e) => {
      e.target.classList.toggle("hidden");

      this.#delegateShipPlacement();
    });

    attack.addEventListener("click", (e) => {
      e.target.classList.toggle("hidden");

      this.#playTurn();
    });
  }

  setupGame() {
    this.#players.forEach((player) => createBoard(player));

    this.#setActionButtons();

    // Start game with current player placement
    this.#placeShips();
  }
}

export default Game;
