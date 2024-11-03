import Observer from "../model/observer";
import {
  setCellsEvents,
  showConfirmButton,
  showCurrentPlayerIndicator,
  updateBoard,
} from "./gameboard";
import updateTime from "./timer";

class GameObserver extends Observer {
  update(event, data) {
    switch (event) {
      case "update":
        updateBoard(data);
        break;

      case "confirm placement":
        showConfirmButton(data, "placement");
        break;

      case "set cells events":
        setCellsEvents(data);
        break;

      case "show current player":
        showCurrentPlayerIndicator(data);
        break;

      case "time":
        updateTime(data);
        break;

      default:
    }
  }
}

export default GameObserver;
