import { Point } from "../../base/Point";
import { randomInt } from "@permadeath/utils/dist";
import { worldHeight, worldWidth } from "../../consts";

export default function repeatedlyMoveTowardRandomDestinations(
  pos: Point,
  destination: Point,
  speed: number
) {
  if (
    pos.x <= 0 ||
    pos.y <= 0 ||
    pos.x >= 1000 ||
    pos.y >= 1000 ||
    (pos.x === destination.x && pos.y === destination.y)
  ) {
    destination.x = randomInt(0, worldWidth);
    destination.y = randomInt(0, worldHeight);
  }

  const elapsed = 33;
  const distance = Math.sqrt(
    Math.pow(destination.x - pos.x, 2) + Math.pow(destination.y - pos.y, 2)
  );
  const directionX = (destination.x - pos.x) / distance;
  const directionY = (destination.y - pos.y) / distance;

  const newX = pos.x + directionX * speed;
  const newY = pos.y + directionY * speed;
  if (
    Math.sqrt(Math.pow(newX - pos.x, 2) + Math.pow(newY - pos.y, 2)) >= distance
  ) {
    pos.x = destination.x;
    pos.y = destination.y;
  } else {
    pos.x = newX;
    pos.y = newY;
  }
}
