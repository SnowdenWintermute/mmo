import Zone from "../../Zone/Zone";
import { Point } from "../../base/Point";
import BTInverter from "../../behavior-trees/BTInverter";
import BTSelector from "../../behavior-trees/BTSelector";
import BTSequence from "../../behavior-trees/BTSequence";
import ChooseNewRandomDestination from "../../behavior-trees/movement/ChooseNewDirection";
import HasDestination from "../../behavior-trees/movement/HasDestination";
import MoveTowardDestination from "../../behavior-trees/movement/MoveTowardDestination";
import ReachedDestination from "../../behavior-trees/movement/ReachedDestination";
import BehavioralEntity from "../BehavioralEntity";

export default class DestinationSeeker implements BehavioralEntity {
  id: string;
  name: string;
  body: Matter.Body;
  destination: Point | null;
  accelerationInducement?: number | null;
  hp?: { max: number; current: number } | null;
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    destination?: Point | null,
    accelerationInducement?: number | null,
    hp?: { max: number; current: number } | null
  ) {
    this.id = id;
    this.name = name;
    this.body = body;
    this.destination = destination || null;
    this.accelerationInducement = accelerationInducement || null;
    this.hp = hp || null;
  }
  constructBehaviorTree: (zone: Zone) => BTSelector = (zone) => {
    console.log("ayyyyyyyyyyyyyyyyyyyyyyyyyyyyy", this);
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
  updateBehavior(zone: Zone) {
    this.constructBehaviorTree(zone).evaluate();
  }
}
