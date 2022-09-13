import Matter from "matter-js";
import { BehavioralEntity, Zone } from "../../../../game";

export default function addArrivingEntitiesToZone(zone: Zone, engine: Matter.Engine) {
  const numUpdates = zone.queues.arrivingEntities.length;
  if (numUpdates === 0) return;
  for (let i = 0; i < numUpdates; i++) {
    const arrivingEntity = zone.queues.arrivingEntities.shift();
    if (!arrivingEntity) return;
    // @ts-ignore
    if (typeof arrivingEntity.behaviorType === "number") {
      // @ts-ignore
      zone.entities.agents[arrivingEntity.id] = arrivingEntity;
    } else {
      zone.entities.static[arrivingEntity.id] = arrivingEntity;
    }

    // if they just arrived we know they are no longer on the edge and can remove them
    for (const zoneId in zone.entities.edge)
      for (const entityId in zone.entities.edge[zoneId]) {
        if (entityId === arrivingEntity.id) {
          Matter.Composite.remove(engine.world, zone.entities.edge[entityId].entity.body);
          delete zone.entities.edge[entityId];
        }
      }

    Matter.Composite.add(engine.world, zone.entities.agents[arrivingEntity.id].body);
  }
}
