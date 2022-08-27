import Matter from "matter-js";
import { Entity } from "..";
import { Point } from "../base/Point";
import Action from "./actions/Action";
import Behavior from "./behaviors/Behavior";

export default class BehavioralEntity extends Entity {
  constructor(
    id: string,
    name: string,
    body: Matter.Body,
    behaviors: Behavior[],
    actionsCurrentlyExecuting: Action[],
    accelerationInducement?: number | null,
    hp?: { max: number; current: number }
  ) {
    super(id, name, body, hp);
    this.behaviors = behaviors;
    this.actionsCurrentlyExecuting = [];
    this.accelerationInducement = accelerationInducement || null;
  }
}
