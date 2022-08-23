import { Entity } from "..";
import { Point } from "../base/Point";
import Action from "./actions/Action";
import Behavior from "./behaviors/Behavior";

export default class BehavioralEntity extends Entity {
  behaviors: Behavior[];
  constructor(
    id: string,
    name: string,
    pos: Point,
    behaviors: Behavior[],
    actionsCurrentlyExecuting: Action[],
    hp?: { max: number; current: number },
    mass?: number
  ) {
    super(id, name, pos, hp, mass);
    this.behaviors = behaviors;
    this.actionsCurrentlyExecuting = [];
  }
}
