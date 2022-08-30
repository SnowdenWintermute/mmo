import { Point } from "@permadeath/game/dist/base/Point";
import DestinationSeeker from "@permadeath/game/dist/entities/test-entities/DestinationSeeker";
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
    const body: Matter.Body = Matter.Bodies.circle(zoneMiddle.x, zoneMiddle.y, 4);
    Matter.Composite.add(engine.world, body);
    zone.entities.agents[id] = new DestinationSeeker(id, id, body, 1, { max: 10, current: 10 });
  }
}
