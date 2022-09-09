import { BehavioralEntity, Zone } from "../../../../game";

export default function predictEdgeEntityBehaviors(
  bt: any,
  blackboard: {
    entity: BehavioralEntity;
    zone: Zone;
  }
) {
  const { zone } = blackboard;
  for (const zoneId in zone.entities.edge) {
    for (const entityId in zone.entities.edge[zoneId]) {
      const currEntity = zone.entities.edge[zoneId][entityId];
      if (currEntity instanceof BehavioralEntity) {
        blackboard.entity = currEntity;
        bt.step();
      }
    }
  }
}
