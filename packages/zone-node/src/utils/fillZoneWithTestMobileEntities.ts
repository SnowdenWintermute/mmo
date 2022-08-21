import { Point } from "@permadeath/game/dist/base/Point";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import { randomInt } from "@permadeath/utils/dist";
import { worldHeight, worldWidth } from "@permadeath/game/dist/consts";
import Zone from "../Zone/Zone";
import { MovementTypes } from "@permadeath/game/dist/entities/movements/MovementTypes";
const { v1: uuidv1 } = require("uuid");

export default function fillZoneWithTestMobileEntities(numberOfEntities: number, zone: Zone) {
  const { territory } = zone;
  const { origin } = territory;
  const bottomRightCorner = new Point(origin.x + territory.width, origin.y + territory.height);
  for (let i = numberOfEntities; i > 0; i--) {
    const id = uuidv1();
    zone.entities.mobile[id] = new MobileEntity(
      id,
      id,
      new Point((origin.x + bottomRightCorner.x) / 2, (origin.y + bottomRightCorner.y) / 2),
      randomInt(1, 2),
      MovementTypes.MoveTowardDestinationAndAssignNewIfReached,
      new Point(randomInt(0, worldWidth), randomInt(0, worldHeight))
    );
  }
}
