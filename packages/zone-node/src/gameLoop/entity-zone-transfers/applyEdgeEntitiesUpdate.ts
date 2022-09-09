import Matter from "matter-js";
import { BehavioralEntity, Zone } from "../../../../game/src";
const cloneDeep = require("lodash.clonedeep");

export default function applyEdgeEntitiesUpdate(zone: Zone, engine: Matter.Engine) {
  const updatedEntityIds = [];
  for (const zoneId in zone.entities.unappliedEdgeUpdate) {
    if (!zone.entities.edge[zoneId]) zone.entities.edge[zoneId] = {};

    for (const entityId in zone.entities.unappliedEdgeUpdate[zoneId]) {
      const entityUpdate = zone.entities.unappliedEdgeUpdate[zoneId][entityId];

      const lastEntityRecord = zone.entities.edge[zoneId][entityUpdate.id];
      if (!lastEntityRecord) {
        zone.entities.edge[zoneId][entityUpdate.id] = cloneDeep(entityUpdate);
        const oldBody = cloneDeep(entityUpdate.body);
        const { x, y } = oldBody.position;
        const { circleRadius } = oldBody;
        zone.entities.edge[zoneId][entityUpdate.id].body = Matter.Bodies.circle(x, y, circleRadius || 10, {
          frictionAir: 1,
        });
        Matter.Composite.add(engine.world, zone.entities.edge[zoneId][entityUpdate.id].body);
      } else {
        let key: keyof typeof entityUpdate;
        for (key in entityUpdate) {
          if (key === "body") {
            lastEntityRecord.body.position.x = entityUpdate.body.position.x;
            lastEntityRecord.body.position.y = entityUpdate.body.position.y;
          } else if (typeof entityUpdate[key] === "object") lastEntityRecord[key] = cloneDeep(entityUpdate[key]);
          else lastEntityRecord[key] = cloneDeep(entityUpdate[key]);
        }
      }
      updatedEntityIds.push(entityUpdate.id);
    }
  }

  for (const zoneId in zone.entities.edge) {
    for (const entityId in zone.entities.edge[zoneId]) {
      const currEntity = zone.entities.edge[zoneId][entityId];
      if (!updatedEntityIds.includes(entityId)) {
        Matter.Composite.remove(engine.world, currEntity.body);
        delete zone.entities.edge[zoneId][entityId];
      }
    }
  }
}
