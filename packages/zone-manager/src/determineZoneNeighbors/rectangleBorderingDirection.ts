import { Rectangle } from "@permadeath/game/dist/base/Rectangle";
import { between } from "@permadeath/utils/dist/index";
import { CardinalOrdinalDirection } from "@permadeath/game/dist/enums/CardinalOrdinalDirection";

export default function rectangleBorderingDirection(a: Rectangle, b: Rectangle) {
  // @todo: add return null case up top
  if (
    a.origin.y - 1 === b.bottomY &&
    (between(a.origin.x, b.bottomLeftCorner.x, b.bottomRightCorner.x) ||
      between(a.topRightCorner.x, b.bottomLeftCorner.x, b.bottomRightCorner.x))
  )
    return CardinalOrdinalDirection.north;
  else if (
    a.bottomY + 1 === b.topY &&
    (between(a.bottomLeftCorner.x, b.origin.x, b.topRightCorner.x) ||
      between(a.bottomRightCorner.x, b.origin.x, b.topRightCorner.x))
  )
    return CardinalOrdinalDirection.south;
  else if (
    a.rightX + 1 === b.leftX &&
    (between(a.topRightCorner.y, b.origin.y, b.bottomLeftCorner.y) ||
      between(a.bottomRightCorner.y, b.origin.y, b.bottomLeftCorner.y))
  )
    return CardinalOrdinalDirection.east;
  else if (
    a.leftX - 1 === b.rightX &&
    (between(a.origin.y, b.topRightCorner.y, b.bottomRightCorner.y) ||
      between(a.bottomLeftCorner.y, b.topRightCorner.y, b.bottomRightCorner.y))
  )
    return CardinalOrdinalDirection.west;
  else if (a.topRightCorner.x + 1 === b.bottomLeftCorner.x && a.topRightCorner.y - 1 === b.bottomLeftCorner.y)
    return CardinalOrdinalDirection.northEast;
  else if (a.origin.x - 1 === b.bottomRightCorner.x && a.origin.y - 1 === b.bottomRightCorner.y)
    return CardinalOrdinalDirection.northWest;
  else if (a.bottomRightCorner.x + 1 === b.origin.x && a.bottomRightCorner.y + 1 === b.origin.y)
    return CardinalOrdinalDirection.southEast;
  else if (a.bottomLeftCorner.x - 1 === b.topRightCorner.x && a.bottomLeftCorner.y + 1 === b.topRightCorner.y)
    return CardinalOrdinalDirection.southWest;
  else return null;
}
