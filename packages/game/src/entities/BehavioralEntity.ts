import Matter from "matter-js";
import { Entity } from "..";
import { Point } from "../base/Point";
import Action from "../action-creators/Action";
import Behavior from "../behaviors/Behavior";

export default class BehavioralEntity extends Entity {
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    behaviorIds: number[],
    accelerationInducement?: number | null,
    hp?: { max: number; current: number }
  ) {
    super(id, name, body, hp);
    this.behaviorIds = behaviorIds;
    this.actionsCurrentlyExecuting = [];
    this.accelerationInducement = accelerationInducement || null;
    this.destination = null;
  }
}
