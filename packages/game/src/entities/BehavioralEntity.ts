import { Entity } from "./Entity";
import { Point } from "../base/Point";
import { BehaviorTypes } from "../behavior-trees/BehaviorTypes";

export class BehavioralEntity extends Entity {
  behaviorType: BehaviorTypes;
  currentAction: string | null;
  destination?: Point | null;
  accelerationInducement?: number | null;
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    behaviorType: BehaviorTypes,
    currentAction?: string,
    destination?: Point,
    accelerationInducement?: number,
    hp?: {
      max: number;
      current: number;
    }
  ) {
    super(id, name, body, hp || null);
    this.behaviorType = behaviorType;
    this.currentAction = currentAction || null;
    this.destination = destination || null;
    this.accelerationInducement = accelerationInducement || null;
    this.currentAction = currentAction || null;
  }
}
