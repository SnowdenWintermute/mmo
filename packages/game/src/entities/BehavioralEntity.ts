import { Zone } from "../Zone/Zone";
import BTSelector from "../behavior-trees/BTSelector";
import { BTNodeState } from "../behavior-trees/BTNode";
import { Entity } from "./Entity";
import { Point } from "../base/Point";

export interface BehavioralEntity extends Entity {
  destination?: Point | null;
  accelerationInducement?: number | null;
  constructBehaviorTree: (zone: Zone) => BTSelector;
  updateBehavior: (zone: Zone) => void;
}
