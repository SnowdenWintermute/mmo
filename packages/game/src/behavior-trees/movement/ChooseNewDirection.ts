import BTNode, { BTNodeState } from "../BTNode";
import assignRandomDestinationToSelf from "../../actions/assignRandomDestinationToSelf";
import BehavioralEntity from "../../entities/BehavioralEntity";
import Zone from "../../Zone/Zone";

export default class ChooseNewRandomDestination extends BTNode {
  entity: BehavioralEntity;
  zone: Zone;
  constructor(entity: BehavioralEntity, zone: Zone) {
    super();
    this.entity = entity;
    this.zone = zone;
  }
  evaluate() {
    assignRandomDestinationToSelf(this.entity, this.zone);
    this.nodeState = BTNodeState.SUCCESS;
    return this.nodeState;
  }
}
