import { BehavioralEntity, Zone } from "../../../../game";

export default function executeEntityBehaviors(
  entity: BehavioralEntity,
  bt: any,
  blackboard: {
    entity: BehavioralEntity;
    zone: Zone;
  }
) {
  blackboard.entity = entity;
  bt.step();
}
