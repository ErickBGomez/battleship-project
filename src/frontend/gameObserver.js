import Observer from "../model/observer";
import { updateBoard } from "./gameboard";
import updateTime from "./timer";

class GameObserver extends Observer {
  update(event, data) {
    switch (event) {
      case "update":
        updateBoard(data);
        break;

      case "time":
        updateTime(data);
        break;

      default:
    }
  }
}

export default GameObserver;
