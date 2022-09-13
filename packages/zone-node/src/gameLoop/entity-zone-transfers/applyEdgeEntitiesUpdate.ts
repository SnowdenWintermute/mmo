import Matter from "matter-js";
import { Zone } from "../../../../game";
import applyUpdateToEntity from "./applyUpdateToEntity";

export default function applyEdgeEntitiesUpdate(zone: Zone, engine: Matter.Engine) {
  const numUpdates = zone.queues.incomingEdgeEntityUpdates.length;
  const updatedEntityIds: string[] = [];
  const updatedZoneIds: number[] = [];
  for (let i = 0; i < numUpdates; i++) {
    const update = zone.queues.incomingEdgeEntityUpdates.shift();
    if (!update) return;
    const { zoneFromId } = update;
    const updatedEntities = update.entities;
    for (const entityId in updatedEntities) {
      const currUpdate = updatedEntities[entityId];
      if ((zone.entities.agents[entityId] || zone.entities.static[entityId]) && zone.entities.edge[entityId]) {
        Matter.Composite.remove(engine.world, zone.entities.edge[entityId].entity.body);
        delete zone.entities.edge[entityId];
      } else if (zone.entities.edge[entityId]) {
        applyUpdateToEntity(zone.entities.edge[entityId].entity, currUpdate);
        zone.entities.edge[entityId].zoneId = zoneFromId;
      } else {
        zone.entities.edge[entityId] = { entity: updatedEntities[entityId], zoneId: zoneFromId };
        Matter.Composite.add(engine.world, updatedEntities[entityId].body);
      }
      updatedEntityIds.push(entityId);
    }
    updatedZoneIds.push(zoneFromId);
  }

  for (const entityId in zone.entities.edge) {
    if (!updatedEntityIds.includes(entityId) && updatedZoneIds.includes(zone.entities.edge[entityId].zoneId)) {
      Matter.Composite.remove(engine.world, zone.entities.edge[entityId].entity.body);
      delete zone.entities.edge[entityId];
    }
  }
}
