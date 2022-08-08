import { Entity } from "..";
import { Point } from "../base/Point";

export class MobileEntity extends Entity {
  move: Function;
  destination: Point;
  constructor(
    name: string,
    pos: Point,
    speed: number,
    move: Function,
    destination: Point
  ) {
    super(name, pos, speed);
    this.destination = destination;
    this.move = () => move(this.pos, this.destination, this.speed);
  }
}
