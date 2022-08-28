import { Point } from "@permadeath/game/dist/base/Point";
import BehavioralEntity from "@permadeath/game/dist/entities/BehavioralEntity";
import { randomInt } from "@permadeath/utils/dist";
import { worldHeight, worldWidth } from "@permadeath/game/dist/consts";
import Zone from "../Zone/Zone";
import Matter, { Engine } from "matter-js";
const { v1: uuidv1 } = require("uuid");

export default function fillZoneWithTestMobileEntities(numberOfEntities: number, zone: Zone, engine: Engine) {
  const { territory } = zone;
  const { origin } = territory;
  const bottomRightCorner = new Point(origin.x + territory.width, origin.y + territory.height);
  for (let i = numberOfEntities; i > 0; i--) {
    const id = uuidv1();
    const zoneMiddle = new Point((origin.x + bottomRightCorner.x) / 2, (origin.y + bottomRightCorner.y) / 2);
    const body: Matter.Body = new Matter.Bodies.circle(zoneMiddle.x, zoneMiddle.y, 4);
    // zone.entities.agents[id] = new BehavioralEntity(
    //   id,
    //   id,
    //   new Point(, ,
    //   randomInt(1, 2),
    //   MovementTypes.MoveTowardDestinationAndAssignNewIfReached,
    //   new Point(randomInt(0, worldWidth), randomInt(0, worldHeight))
    // );
  }
}
