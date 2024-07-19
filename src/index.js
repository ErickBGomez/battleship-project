import "./style.css";
import iconSvg from "./img/erick-notepad.svg";

const icon = document.createElement("span");
icon.className = "icon";
icon.innerHTML = iconSvg;

document.body.appendChild(icon);

console.log("Welcome to your new project!");
