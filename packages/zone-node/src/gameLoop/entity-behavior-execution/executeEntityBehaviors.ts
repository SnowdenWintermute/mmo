import { BehavioralEntity, Zone } from "../../../../game";

export default function executeEntityBehaviors(
  entity: BehavioralEntity,
  bt: any,
  blackboard: {
    entity: BehavioralEntity;
    zone: Zone;
  }
) {
  if (!entity) return;
  blackboard.entity = entity;
  bt.step();
}
