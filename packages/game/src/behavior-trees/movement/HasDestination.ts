import BehavioralEntity from "../../entities/BehavioralEntity";
import BTNode, { BTNodeState } from "../BTNode";

export default class HasDestination extends BTNode {
  constructor(entity: BehavioralEntity) {
    const evaluate = () => {
      this.nodeState = entity.destination ? BTNodeState.SUCCESS : BTNodeState.FAILURE;
      return this.nodeState;
    };
    super(evaluate(), evaluate);
  }
}
