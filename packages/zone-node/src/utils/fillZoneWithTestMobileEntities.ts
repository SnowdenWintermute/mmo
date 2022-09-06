import { Point, BehavioralEntity, Zone, BehaviorTypes } from "../../../game";
import Matter, { Engine } from "matter-js";
const { v1: uuidv1 } = require("uuid");

export default function fillZoneWithTestMobileEntities(numberOfEntities: number, zone: Zone, engine: Engine) {
  const { territory } = zone;
  const { origin } = territory;
  const bottomRightCorner = new Point(origin.x + territory.width, origin.y + territory.height);
  for (let i = numberOfEntities; i > 0; i--) {
    const id = uuidv1();
    const zoneMiddle = new Point((origin.x + bottomRightCorner.x) / 2, (origin.y + bottomRightCorner.y) / 2);
    const body: Matter.Body = Matter.Bodies.circle(zoneMiddle.x, zoneMiddle.y, 50);
    body.frictionAir = 1;
    Matter.Composite.add(engine.world, body);
    zone.entities.agents[id] = new BehavioralEntity(
      id,
      id,
      body,
      BehaviorTypes.MOVES_TOWARD_RANDOM_DESTINATIONS,
      undefined,
      undefined,
      1,
      { max: 10, current: 10 }
    );
  }
}
