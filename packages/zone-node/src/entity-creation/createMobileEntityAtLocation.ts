import { Point } from "@permadeath/game/dist/base/Point";
import { worldHeight, worldWidth } from "@permadeath/game/dist/consts";
import { MobileEntity } from "@permadeath/game/dist/entities/MobileEntity";
import repeatedlyMoveTowardRandomDestinations from "@permadeath/game/dist/entities/movements/repeatedlyMoveTowardRandomDestinations";
import { randomInt } from "@permadeath/utils/dist";
import Zone from "../Zone/Zone";
const { v1: uuidv1 } = require("uuid");

export default function createMobileEntityAtLocation(
  zone: Zone,
  data: { location: Point }
) {
  const { location } = data;
  const id = uuidv1();
  zone.entities.mobile[id] = new MobileEntity(
    id,
    id,
    location,
    randomInt(1, 3),
    repeatedlyMoveTowardRandomDestinations,
    new Point(randomInt(0, worldWidth), randomInt(0, worldHeight))
  );
}
