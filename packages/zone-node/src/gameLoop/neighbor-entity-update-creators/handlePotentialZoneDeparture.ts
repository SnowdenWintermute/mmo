import Matter from "matter-js";
import { BehavioralEntity, EntitiesByZoneId, Zone } from "../../../../game";
import determineZoneDepartingTo from "./determineZoneDepartingTo";

export default function handlePotentialZoneDeparture(
  currEntity: BehavioralEntity,
  zone: Zone,
  engine: Matter.Engine,
  departingEntities: EntitiesByZoneId
) {
  const zoneDepartingTo = determineZoneDepartingTo(currEntity, zone);
  if (typeof zoneDepartingTo === "string") {
    if (!departingEntities[zoneDepartingTo]) departingEntities[zoneDepartingTo] = {};
    departingEntities[zoneDepartingTo][currEntity.id] = currEntity;
    Matter.Composite.remove(engine.world, currEntity.body);
    if (!zone.entities.edge[zoneDepartingTo]) zone.entities.edge[zoneDepartingTo] = {};
    zone.entities.edge[zoneDepartingTo][currEntity.id] = currEntity;
    delete zone.entities.agents[currEntity.id];
  }
}
