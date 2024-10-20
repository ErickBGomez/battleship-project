import Observer from "../model/observer";
import updateTime from "./timer";

class GameObserver extends Observer {
  update(event, data) {
    switch (event) {
      case "time":
        updateTime(data);
        break;

      default:
    }
  }
}

export default GameObserver;
