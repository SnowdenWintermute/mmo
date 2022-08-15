import { Point } from "@permadeath/game/dist/base/Point";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { randomInt } from "@permadeath/utils/dist";
import { worldHeight, worldWidth } from "@permadeath/game/dist/consts";
import Zone from "../Zone/Zone";
import repeatedlyMoveTowardRandomDestinations from "@permadeath/game/dist/entities/movements/repeatedlyMoveTowardRandomDestinations";
const { v1: uuidv1 } = require("uuid");

export default function fillZoneWithTestMobileEntities(
  numberOfEntities: number,
  zone: Zone
) {
  const { territory } = zone;
  const { origin } = territory.current;
  const bottomRightCorner = new Point(
    origin.x + territory.current.width,
    origin.y + territory.current.height
  );
  for (let i = numberOfEntities; i > 0; i--) {
    const id = uuidv1();
    zone.entities.mobile[i - 1] = new MobileEntity(
      id,
      id,
      new Point(
        (origin.x + bottomRightCorner.x) / 2,
        (origin.y + bottomRightCorner.y) / 2
      ),
      randomInt(1, 2),
      repeatedlyMoveTowardRandomDestinations,
      new Point(randomInt(0, worldWidth), randomInt(0, worldHeight))
    );
  }
}
