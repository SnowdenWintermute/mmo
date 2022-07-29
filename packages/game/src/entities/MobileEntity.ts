import { Entity } from "..";
import { Point } from "../base/Point";

export class MobileEntity extends Entity {
  move: Function;
  constructor(name: string, pos: Point, speed: number, move: Function) {
    super(name, pos, speed);
    this.move = () => move(this.pos, this.speed);
  }
}
