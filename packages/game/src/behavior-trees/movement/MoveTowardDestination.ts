import applyForceToSelf from "../../actions/applyForceToSelf";
import BTNode, { BTNodeState } from "../BTNode";
import { BehavioralEntity } from "../../entities/BehavioralEntity";
import { Zone } from "../../Zone/Zone";

export default class MoveTowardDestination extends BTNode {
  entity: BehavioralEntity;
  zone: Zone;
  constructor(entity: BehavioralEntity, zone: Zone) {
    super();
    this.entity = entity;
    this.zone = zone;
  }
  evaluate() {
    applyForceToSelf(this.entity, this.zone);
    this.nodeState = BTNodeState.RUNNING;
    return this.nodeState;
  }
}
