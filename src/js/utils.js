function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomDirection() {
  const dir = randomRange(0, 3);
  let value;

  switch (dir) {
    case 0:
      value = "up";
      break;

    case 1:
      value = "right";
      break;

    case 2:
      value = "down";
      break;

    case 3:
      value = "left";
      break;

    default:
  }

  return value;
}

export { randomRange, randomDirection };
