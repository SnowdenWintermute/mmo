import Zone from "../Zone/Zone";
import Matter from "matter-js";
import { Entity } from "..";
import { Action } from "../base/Action";
import BTSelector from "../behavior-trees/BTSelector";

export default class BehavioralEntity extends Entity {
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    constructBehaviorTree: (zone: Zone) => BTSelector,
    updateBehavior: (zone: Zone) => void,
    accelerationInducement?: number | null,
    hp?: { max: number; current: number }
  ) {
    super(id, name, body, constructBehaviorTree, updateBehavior);
    this.hp = hp || null;
    this.accelerationInducement = accelerationInducement || null;
    this.destination = null;
  }
}
