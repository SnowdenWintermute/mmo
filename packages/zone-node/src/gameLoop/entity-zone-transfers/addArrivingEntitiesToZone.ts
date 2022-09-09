import Matter from "matter-js";
import { Zone } from "../../../../game";

export default function addArrivingEntitiesToZone(zone: Zone, engine: Matter.Engine) {
  zone.entities.arriving.forEach((entity, i) => {
    zone.entities.agents[entity.id] = entity;
    Matter.Composite.add(engine.world, entity.body);
    zone.entities.arriving.pop();
  });
}
