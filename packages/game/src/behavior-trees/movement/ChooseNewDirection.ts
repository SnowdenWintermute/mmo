import BTNode, { BTNodeState } from "../BTNode";
import assignRandomDestinationToSelf from "../../actions/assignRandomDestinationToSelf";
import BehavioralEntity from "../../entities/BehavioralEntity";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default class ChooseNewRandomDestination extends BTNode {
  constructor(entity: BehavioralEntity, zone: Zone) {
    const evaluate = () => {
      assignRandomDestinationToSelf(entity, zone);
      this.nodeState = BTNodeState.SUCCESS;
      return this.nodeState;
    };
    super(evaluate(), evaluate);
  }
}
