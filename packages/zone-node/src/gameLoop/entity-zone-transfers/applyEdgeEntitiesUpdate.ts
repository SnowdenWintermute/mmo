import Matter from "matter-js";
import { Zone } from "../../../../game/src";
import { setBodyPropertiesFromAnother } from "../../../../utils";
const cloneDeep = require("lodash.clonedeep");

export default function applyEdgeEntitiesUpdate(zone: Zone, engine: Matter.Engine) {
  const entitiesUpdatedById: string[] = [];

  for (const zoneId in zone.entities.unappliedEdgeUpdate) {
    if (!zone.entities.edge[zoneId]) zone.entities.edge[zoneId] = {};
    for (const entityId in zone.entities.unappliedEdgeUpdate[zoneId]) {
      if (zone.entities.agents[entityId]) return;
      const currUpdate = zone.entities.unappliedEdgeUpdate[zoneId][entityId];
      entitiesUpdatedById.push(currUpdate.id);
      if (!zone.entities.edge[zoneId][entityId]) {
        zone.entities.edge[zoneId][entityId] = cloneDeep(currUpdate);
        Matter.Composite.add(engine.world, zone.entities.edge[zoneId][entityId].body);
      } else {
        const entityToUpdate = zone.entities.edge[zoneId][entityId];
        setBodyPropertiesFromAnother(entityToUpdate.body, currUpdate.body);
        for (const key in currUpdate) {
          if (key !== "body") {
            // @ts-ignore
            entityToUpdate[key] = cloneDeep(currUpdate[key]);
          }
        }
      }
    }
    zone.entities.unappliedEdgeUpdate[zoneId] = {};
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
