import { Rectangle } from "@permadeath/game/dist/base/Rectangle";
import { between } from "@permadeath/utils/dist";

export enum BorderDirection {
  north = "north",
  south = "south",
  east = "east",
  west = "west",
  northEast = "northEast",
  northWest = "northWest",
  southEast = "southEast",
  southWest = "southWest",
}

export default function rectangleBorderingDirection(a: Rectangle, b: Rectangle) {
  if (
    a.origin.y - 1 === b.bottomY &&
    (between(a.origin.x, b.bottomLeftCorner.x, b.bottomRightCorner.x) ||
      between(a.topRightCorner.x, b.bottomLeftCorner.x, b.bottomRightCorner.x))
  )
    return BorderDirection.north;
  else if (
    a.bottomY + 1 === b.topY &&
    (between(a.bottomLeftCorner.x, b.origin.x, b.topRightCorner.x) ||
      between(a.bottomRightCorner.x, b.origin.x, b.topRightCorner.x))
  )
    return BorderDirection.south;
  else if (
    a.rightX + 1 === b.leftX &&
    (between(a.topRightCorner.y, b.origin.y, b.bottomLeftCorner.y) ||
      between(a.bottomRightCorner.y, b.origin.y, b.bottomLeftCorner.y))
  )
    return BorderDirection.east;
  else if (
    a.leftX - 1 === b.rightX &&
    (between(a.origin.y, b.topRightCorner.y, b.bottomRightCorner.y) ||
      between(a.bottomLeftCorner.y, b.topRightCorner.y, b.bottomRightCorner.y))
  )
    return BorderDirection.west;
  else if (a.topRightCorner.x + 1 === b.bottomLeftCorner.x && a.topRightCorner.y - 1 === b.bottomLeftCorner.y)
    return BorderDirection.northEast;
  else if (a.origin.x - 1 === b.bottomRightCorner.x && a.origin.y - 1 === b.bottomRightCorner.y)
    return BorderDirection.northWest;
  else if (a.bottomRightCorner.x + 1 === b.origin.x && a.bottomRightCorner.y + 1 === b.origin.y)
    return BorderDirection.southEast;
  else if (a.bottomLeftCorner.x - 1 === b.topRightCorner.x && a.bottomLeftCorner.y + 1 === b.topRightCorner.y)
    return BorderDirection.southWest;
  else return null;
}
