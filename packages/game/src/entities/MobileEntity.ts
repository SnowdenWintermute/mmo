import { Entity } from "..";
import { Point } from "../base/Point";

export class MobileEntity extends Entity {
  move: Function;
  destination: Point;
  constructor(
    id: string,
    name: string,
    pos: Point,
    speed: number,
    move: Function,
    destination: Point
  ) {
    super(id, name, pos, speed);
    this.destination = destination;
    this.move = () => move(this.pos, this.destination, this.speed);
  }
}
