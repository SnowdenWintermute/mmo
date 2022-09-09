import Matter from "matter-js";
import { Zone } from "../../../../game";

export default function addArrivingEntitiesToZone(zone: Zone, engine: Matter.Engine) {
  zone.entities.arriving.forEach((arrivingEntity, i) => {
    zone.entities.agents[arrivingEntity.id] = arrivingEntity;
    for (const zoneId in zone.entities.edge)
      for (const entityId in zone.entities.edge[zoneId])
        if (entityId === arrivingEntity.id) {
          console.log("removed body " + zone.entities.edge[zoneId][arrivingEntity.id].body.id);
          Matter.Composite.remove(engine.world, zone.entities.edge[zoneId][arrivingEntity.id].body);
        }
    Matter.Composite.add(engine.world, zone.entities.agents[arrivingEntity.id].body);
  });
  zone.entities.arriving = [];
}
