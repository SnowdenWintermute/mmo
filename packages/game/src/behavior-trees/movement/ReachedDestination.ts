import BehavioralEntity from "../../entities/BehavioralEntity";
import BTNode, { BTNodeState } from "../BTNode";

export default class ReachedDestination extends BTNode {
  entity: BehavioralEntity;
  tolerance: number;
  constructor(entity: BehavioralEntity, tolerance: number) {
    super();
    this.entity = entity;
    this.tolerance = tolerance;
  }
  evaluate() {
    if (!this.entity.destination) {
      this.nodeState = BTNodeState.FAILURE;
      return this.nodeState;
    }
    const entityReachedDestination =
      Math.abs(this.entity.body.position.x - this.entity.destination.x) <= this.tolerance ||
      Math.abs(this.entity.body.position.y - this.entity.destination.y) <= this.tolerance;
    entityReachedDestination ? (this.nodeState = BTNodeState.SUCCESS) : (this.nodeState = BTNodeState.RUNNING);
    return this.nodeState;
  }
}
