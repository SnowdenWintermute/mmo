import Zone from "@permadeath/zone-node/dist/Zone/Zone";
import { Action } from "../../base/Action";
import { Point } from "../../base/Point";
import BTInverter from "../../behavior-trees/BTInverter";
import BTSelector from "../../behavior-trees/BTSelector";
import BTSequence from "../../behavior-trees/BTSequence";
import ChooseNewRandomDestination from "../../behavior-trees/movement/ChooseNewDirection";
import HasDestination from "../../behavior-trees/movement/HasDestination";
import MoveTowardDestination from "../../behavior-trees/movement/MoveTowardDestination";
import ReachedDestination from "../../behavior-trees/movement/ReachedDestination";
import BehavioralEntity from "../BehavioralEntity";

export default class DestinationSeeker extends BehavioralEntity {
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    destination: Point | null,
    accelerationInducement?: number | null,
    hp?: { max: number; current: number }
  ) {
    const constructBehaviorTree = (zone: Zone) => {
      const hasDestination = new HasDestination(this);
      const reachedDestination = new ReachedDestination(this, 5);
      const moveTowardDestination = new MoveTowardDestination(this, zone);
      const chooseNewRandomDestination = new ChooseNewRandomDestination(this, zone);
      const newDestinationSequence = new BTSequence([
        new BTInverter(hasDestination),
        new BTInverter(reachedDestination),
        chooseNewRandomDestination,
      ]);
      return new BTSelector([newDestinationSequence, moveTowardDestination]);
    };
    function updateBehavior(zone: Zone) {
      constructBehaviorTree(zone).evaluate();
    }
    super(id, name, body, constructBehaviorTree, updateBehavior, accelerationInducement, hp);
  }
}
