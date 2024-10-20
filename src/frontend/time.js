import { parseTime } from "../model/utils";

function updateTime(time) {
  const timeValue = document.querySelector(".timer .value");
  timeValue.textContent = parseTime(time);
}

export { updateTime };
