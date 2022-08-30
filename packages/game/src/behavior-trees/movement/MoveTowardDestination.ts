import applyForceToSelf from "../../actions/applyForceToSelf";
import BTNode, { BTNodeState } from "../BTNode";
import { Action } from "../../base/Action";
import BehavioralEntity from "../../entities/BehavioralEntity";
import Zone from "@permadeath/zone-node/dist/Zone/Zone";

export default class MoveTowardDestination extends BTNode {
  constructor(entity: BehavioralEntity, zone: Zone) {
    const evaluate = () => {
      applyForceToSelf(entity, zone);
      this.nodeState = BTNodeState.RUNNING;
      return this.nodeState;
    };
    super(evaluate(), evaluate);
  }
}
