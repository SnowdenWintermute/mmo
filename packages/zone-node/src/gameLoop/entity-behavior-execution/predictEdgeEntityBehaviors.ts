import Matter, { Body } from "matter-js";
import { BehavioralEntity, tickRate, Zone } from "../../../../game";

export default function predictEdgeEntityBehaviors(
  bt: any,
  blackboard: {
    entity: BehavioralEntity;
    zone: Zone;
  }
) {
  const { zone } = blackboard;
  for (const zoneId in zone.entities.edge)
    for (const entityId in zone.entities.edge) {
      const currEntity = zone.entities.edge[entityId].entity;
      if (currEntity instanceof BehavioralEntity) {
        blackboard.entity = currEntity;
        bt.step();
        Body.update(currEntity.body, Date.now() - zone.timeOfLastUpdate, 1, 1);
      }
    }
}
