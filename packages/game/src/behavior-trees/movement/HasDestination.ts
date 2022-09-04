import { BehavioralEntity } from "../../entities/BehavioralEntity";
import BTNode, { BTNodeState } from "../BTNode";

export default class HasDestination extends BTNode {
  entity: BehavioralEntity;
  constructor(entity: BehavioralEntity) {
    super();
    this.entity = entity;
  }
  evaluate() {
    console.log("lmaoooooooooooooooo", this.entity);
    this.nodeState = this.entity.destination ? BTNodeState.SUCCESS : BTNodeState.FAILURE;
    return this.nodeState;
  }
}
