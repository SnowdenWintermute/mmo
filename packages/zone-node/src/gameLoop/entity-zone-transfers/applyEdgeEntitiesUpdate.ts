import Matter from "matter-js";
import { Zone } from "../../../../game";
import { setBodyPropertiesFromAnother } from "../../../../utils";
const cloneDeep = require("lodash.clonedeep");

export default function applyEdgeEntitiesUpdate(zone: Zone, engine: Matter.Engine) {
  const numUpdates = zone.queues.incomingEdgeEntityUpdates.length;
  for (let i = 0; i < numUpdates; i++) {
    const update = zone.queues.incomingEdgeEntityUpdates.shift();
    if (!update) return;
    const { zoneFromId } = update;
    const updatedEntities = update.entities;

    // update entities that are already being tracked
    // remove entities that are no longer in the edge
    for (const zoneId in zone.entities.edge) {
      for (const entityId in zone.entities.edge[zoneId]) {
        const currEntity = zone.entities.edge[entityId].entity;
        const entityUpdate = updatedEntities[entityId];
        if (entityUpdate) {
          setBodyPropertiesFromAnother(currEntity.body, entityUpdate.body);
          let key: keyof typeof currEntity;
          for (key in entityUpdate) if (key !== "body") currEntity[key] = cloneDeep(entityUpdate[key]);
          zone.entities.edge[entityId].zoneId = zoneFromId;
          delete updatedEntities[entityId]; // delete it so we know whatever remains are newly added
        } else {
          // if an entity we have didn't get an update it should be removed
          Matter.Composite.remove(engine.world, currEntity.body);
          delete zone.entities.edge[entityId];
        }
      }

      // whatever is left is a new entity and should be added to the physics engine
      for (const entityId in updatedEntities) {
        zone.entities.edge[entityId] = { entity: updatedEntities[entityId], zoneId: zoneFromId };
        Matter.Composite.add(engine.world, updatedEntities[entityId].body);
      }
    }
  }
}
