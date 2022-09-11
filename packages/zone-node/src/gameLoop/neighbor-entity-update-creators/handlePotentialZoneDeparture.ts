import Matter from "matter-js";
import { BehavioralEntity, EntitiesByZoneId, Zone } from "../../../../game";
import determineZoneDepartingTo from "../entity-zone-transfers/determineZoneDepartingTo";
const cloneDeep = require("lodash.clonedeep");

export default function handlePotentialZoneDeparture(
  currEntity: BehavioralEntity,
  zone: Zone,
  engine: Matter.Engine,
  departingEntities: EntitiesByZoneId
) {
  const zoneDepartingTo = determineZoneDepartingTo(currEntity, zone);
  if (typeof zoneDepartingTo === "string") {
    if (!departingEntities[zoneDepartingTo]) departingEntities[zoneDepartingTo] = {};
    const entityToSend = cloneDeep(currEntity);
    departingEntities[zoneDepartingTo][currEntity.id] = entityToSend;
    Matter.Composite.remove(engine.world, currEntity.body);
    delete zone.entities.agents[currEntity.id];
    zone.entities.edge[zoneDepartingTo][entityToSend.id] = cloneDeep(currEntity);
  }
}
