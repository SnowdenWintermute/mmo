import Matter from "matter-js";
import { Zone } from "../../../../game";
import { setBodyPropertiesFromAnother } from "../../../../utils";
const cloneDeep = require("lodash.clonedeep");

export default function applyEdgeEntitiesUpdate(zone: Zone, engine: Matter.Engine) {
  const entitiesUpdatedById: string[] = [];
  const numUpdates = zone.queues.incomingEdgeEntityUpdates.length;
  for (let i = 0; i < numUpdates; i++) {
    const update = zone.queues.incomingEdgeEntityUpdates.shift();
    if (!update) return;
    const { zoneFromId, entities } = update;
    if (!zone.entities.edge[zoneFromId]) zone.entities.edge[zoneFromId] = {};
    for (const entityId in entities) {
      if (zone.entities.agents[entityId]) continue; // we own this entity so it wouldn't be on the edge anymore
      const currUpdate = entities[entityId];
      entitiesUpdatedById.push(currUpdate.id); // use this list later to remove any entity which wasn't in this update

      // check if this entity is already saved to an edge from a different zone,
      // happens when entity travels between two neighbors so quickly that the update from the last neighbor is still applied
      // leading to a duplicate ghost of this entity, instead move the entity to the new edge neigbor zone
      for (const zoneId in zone.entities.edge)
        for (const entityId in zone.entities.edge[zoneId])
          if (entityId === currUpdate.id && parseInt(zoneId) !== zoneFromId) {
            zone.entities.edge[zoneFromId][currUpdate.id] = zone.entities.edge[zoneId][currUpdate.id];
            delete zone.entities.edge[zoneId][currUpdate.id];
          }

      if (!zone.entities.edge[zoneFromId][entityId]) {
        zone.entities.edge[zoneFromId][entityId] = currUpdate;
        Matter.Composite.add(engine.world, currUpdate.body);
      } else {
        const entityToUpdate = zone.entities.edge[zoneFromId][entityId];
        setBodyPropertiesFromAnother(entityToUpdate.body, currUpdate.body);
        let key: keyof typeof entityToUpdate;
        for (key in currUpdate)
          if (key !== "body") {
            entityToUpdate[key] = cloneDeep(currUpdate[key]);
          }
      }
    }
  }

  for (const zoneId in zone.entities.edge) {
    for (const entityId in zone.entities.edge[zoneId]) {
      if (!entitiesUpdatedById.includes(entityId)) {
        Matter.Composite.remove(engine.world, zone.entities.edge[zoneId][entityId].body);
        delete zone.entities.edge[zoneId][entityId];
      }
    }
  }
}
