import Matter from "matter-js";
import { Zone } from "../../../../game";
import { setBodyPropertiesFromAnother } from "../../../../utils";

export default function addArrivingEntitiesToZone(zone: Zone, engine: Matter.Engine) {
  const numUpdates = zone.queues.arrivingEntities.length;
  if (numUpdates === 0) return;
  for (let i = 0; i < numUpdates; i++) {
    const arrivingEntity = zone.queues.arrivingEntities.shift();
    if (!arrivingEntity) return;
    // @ts-ignore
    if (typeof arrivingEntity.behaviorType !== "undefined") zone.entities.agents[arrivingEntity.id] = arrivingEntity;
    else zone.entities.static[arrivingEntity.id] = arrivingEntity;
    Matter.Composite.add(engine.world, arrivingEntity.body);
  }
}
