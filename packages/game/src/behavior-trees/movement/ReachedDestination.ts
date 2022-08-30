import BehavioralEntity from "../../entities/BehavioralEntity";
import BTNode, { BTNodeState } from "../BTNode";

export default class ReachedDestination extends BTNode {
  constructor(entity: BehavioralEntity, tolerance: number) {
    const evaluate = () => {
      if (!entity.destination) {
        this.nodeState = BTNodeState.FAILURE;
        return this.nodeState;
      }
      const entityReachedDestination =
        Math.abs(entity.body.position.x - entity.destination.x) <= tolerance ||
        Math.abs(entity.body.position.y - entity.destination.y) <= tolerance;
      entityReachedDestination ? (this.nodeState = BTNodeState.SUCCESS) : (this.nodeState = BTNodeState.RUNNING);
      return this.nodeState;
    };
    super(evaluate(), evaluate);
  }
}
