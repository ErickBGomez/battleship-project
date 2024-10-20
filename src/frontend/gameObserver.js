import Observer from "../model/observer.js";
import { updateTime } from "./timer.js";

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
